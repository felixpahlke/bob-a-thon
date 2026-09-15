import assert from 'node:assert/strict';
import { test } from 'node:test';
import { EventEmitter } from 'node:events';
import { createHash } from 'node:crypto';
import { mkdtemp, mkdir, readFile, writeFile, rm } from 'node:fs/promises';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import { parse } from 'yaml';
import { setup } from '../scripts/setup-mcp.mjs';
import { withMcp } from '../scripts/check-mcp.mjs';
import { createDatabase, loadConfig, selectStatement } from '../02-contoso-dashboard/mcp-server/database.mjs';
import { createServer } from 'node:http';
import { checkApi } from '../04-ace/test-api.mjs';

test('TLS verifies by default and only an explicit demo flag skips verification', async () => {
  const base = await mkdtemp(join(tmpdir(), 'bob TLS config '));
  const envFile = join(base, '.env');
  const credentials = 'DATABASE_HOST=example.test\nDATABASE_PORT=5432\nDATABASE_NAME=contoso\nDATABASE_USER=reader\nDATABASE_PASSWORD=test-only\n';
  try {
    await writeFile(envFile, credentials);
    assert.deepEqual(loadConfig(envFile, {}).ssl, { rejectUnauthorized: true });
    await writeFile(envFile, credentials + 'DATABASE_SSL=true\nDATABASE_CA_FILE=database-ca.pem\n');
    assert.throws(() => loadConfig(envFile, {}), /PEM file is missing/);
    await writeFile(join(base, 'database-ca.pem'), 'test certificate contents');
    assert.deepEqual(loadConfig(envFile, {}).ssl, { rejectUnauthorized: true, ca: 'test certificate contents' });
    await writeFile(envFile, credentials + 'DATABASE_SSL=true\nDATABASE_SSL_REJECT_UNAUTHORIZED=false\nDATABASE_CA_FILE=missing.pem\n');
    assert.deepEqual(loadConfig(envFile, {}).ssl, { rejectUnauthorized: false });
    await writeFile(envFile, credentials + 'DATABASE_SSL=true\nDATABASE_SSL_REJECT_UNAUTHORIZED=false\n');
    assert.deepEqual(loadConfig(envFile, {}).ssl, { rejectUnauthorized: false });
    assert.deepEqual(loadConfig(envFile, { DATABASE_SSL_REJECT_UNAUTHORIZED: 'true' }).ssl, { rejectUnauthorized: true });
    assert.equal(loadConfig(envFile, { DATABASE_SSL: 'false' }).ssl, false);
    for (const key of ['DATABASE_SSL', 'DATABASE_SSL_REJECT_UNAUTHORIZED']) {
      assert.throws(() => loadConfig(envFile, { [key]: 'flase' }), /must be true or false/);
    }
  } finally { await rm(base, { recursive: true, force: true }); }
});

test('setup handles spaces, preserves credentials and unrelated MCP settings, and is repeatable', async () => {
  const base = await mkdtemp(join(tmpdir(), 'bob-a-thon path with spaces '));
  try {
    const folder = join(base, '02-contoso-dashboard');
    await mkdir(join(folder, '.bob'), { recursive: true });
    await mkdir(join(folder, 'mcp-server'));
    await writeFile(join(folder, 'mcp-server/.env.example'), 'DATABASE_NAME=example\n');
    await writeFile(join(folder, 'mcp-server/.env'), 'DATABASE_NAME=keep_me\n');
    await writeFile(join(folder, '.bob/mcp.json'), JSON.stringify({ mcpServers: { other: { command: 'other' }, contoso: { timeout: 50 } } }));
    const first = await setup('database', base);
    const before = await readFile(first.configPath, 'utf8');
    await setup('database', base);
    assert.equal(await readFile(first.configPath, 'utf8'), before);
    const config = JSON.parse(before);
    assert.equal(config.mcpServers.other.command, 'other');
    assert.equal(config.mcpServers.contoso.timeout, 50);
    assert.equal(config.mcpServers.contoso.command, process.execPath);
    assert.deepEqual(config.mcpServers.contoso.args, [join(folder, 'mcp-server/server.mjs')]);
    assert.equal(config.mcpServers.contoso.cwd, join(folder, 'mcp-server'));
    assert.equal(await readFile(join(folder, 'mcp-server/.env'), 'utf8'), 'DATABASE_NAME=keep_me\n');
    await writeFile(first.configPath, '{broken');
    await assert.rejects(setup('database', base), SyntaxError);
    assert.equal(await readFile(first.configPath, 'utf8'), '{broken');
  } finally { await rm(base, { recursive: true, force: true }); }
});

test('queries use read-only transactions, parameters, row caps, and rollback', async () => {
  const queries = [];
  const releases = [];
  const client = {
    query: async (query) => {
      queries.push(query);
      if (typeof query === 'object') return { rows: Array.from({ length: 501 }, (_, n) => ({ n })) };
      return { rows: [] };
    },
    release: (error) => releases.push(error),
  };
  const pool = Object.assign(new EventEmitter(), { connect: async () => client, end: async () => {} });
  const db = createDatabase(() => pool);
  const response = await db.query('SELECT $1 AS value;', [42]);
  assert.equal(queries[0], 'BEGIN READ ONLY');
  assert.match(queries[1], /statement_timeout/);
  assert.match(queries[2], /lock_timeout/);
  assert.equal(queries[3].queryMode, 'extended');
  assert.deepEqual(queries[3].values, [42]);
  assert.equal(queries.at(-1), 'ROLLBACK');
  assert.equal(response.rows.length, 500);
  assert.equal(response.truncated, true);
  assert.equal(releases.length, 1);
  await db.close();
});

test('query failures roll back and release the connection', async () => {
  const calls = [];
  const client = {
    query: async (query) => { calls.push(query); if (typeof query === 'object') throw new Error('query failed'); },
    release: () => calls.push('release'),
  };
  const pool = Object.assign(new EventEmitter(), { connect: async () => client, end: async () => {} });
  const db = createDatabase(() => pool);
  await assert.rejects(db.query('SELECT 1'), /query failed/);
  assert.deepEqual(calls.slice(-2), ['ROLLBACK', 'release']);
});

test('SQL guard accepts normal words but rejects non-query commands', () => {
  assert.match(selectStatement("SELECT 'drop shipping' AS description;"), /drop shipping/);
  assert.match(selectStatement('WITH x AS (SELECT 1) SELECT * FROM x'), /WITH x/);
  for (const sql of ['DELETE FROM sales', 'BEGIN', 'COMMIT', 'SET transaction_read_only = off']) assert.throws(() => selectStatement(sql), /SELECT/);
});

test('database MCP initializes and lists three tools from an unrelated working directory', async () => {
  await withMcp('database', async (client) => {
    const { tools } = await client.listTools();
    assert.deepEqual(tools.map((tool) => tool.name).sort(), ['get_table_schema', 'list_tables', 'query_database']);
    assert(tools.every((tool) => tool.annotations.readOnlyHint));
  });
});

test('weather MCP initializes without calling an external weather service', async () => {
  await withMcp('weather', async (client) => {
    const { tools } = await client.listTools();
    if (tools.some((tool) => tool.name === 'ping')) {
      const result = await client.callTool({ name: 'ping', arguments: {} });
      assert.match(result.content[0].text, /Connected/);
    } else {
      for (const name of ['search_city', 'get_current_weather']) assert(tools.some((tool) => tool.name === name));
    }
  });
});

test('Bob modes parse and include the tools their workflows require', async () => {
  for (const [folder, slug, required] of [
    ['02-contoso-dashboard', 'contoso-analyst', ['read', 'edit', 'execute', 'mcp']],
    ['04-ace', 'ace-developer', ['read', 'edit', 'execute', 'mcp', 'skill']],
  ]) {
    const value = parse(await readFile(new URL(`../${folder}/.bob/custom_modes.yaml`, import.meta.url), 'utf8'));
    const mode = value.customModes.find((item) => item.slug === slug);
    assert(mode?.roleDefinition && mode?.customInstructions);
    for (const group of required) assert(mode.groups.includes(group));
  }
});

test('workshop navigation and ACE technical guidance resolve to local files', async () => {
  const root = new URL('../', import.meta.url);
  const docs = [
    'README.md', '01-build-an-app/README.md', '02-contoso-dashboard/README.md',
    '03-weather-mcp/README.md', '04-ace/README.md', '04-odm-mode/README.md', 'THIRD_PARTY.md',
    '05-spec-driven-development/README.md', '05-spec-driven-development/FUNCTIONAL_SPEC.md',
    '05-spec-driven-development/TECHNICAL_SPEC.md', 'facilitator/README.md',
    '04-ace/.bob/rules-ace-developer/8_workshop-adjustments.md',
  ];
  for (const file of docs) {
    const url = new URL(file, root);
    const text = await readFile(url, 'utf8');
    for (const [, target] of text.matchAll(/\[[^\]]*\]\(([^)]+)\)/g)) {
      if (/^(?:https?:|mailto:|#)/.test(target)) continue;
      await assert.doesNotReject(readFile(new URL(target, url)), `${file}: missing ${target}`);
    }
  }
  const guide = await readFile(new URL('README.md', root), 'utf8');
  assert.match(guide, /Choose your integration lab/);
  for (const folder of ['04-ace', '04-odm-mode', '05-spec-driven-development']) assert(guide.includes(`${folder}/README.md`));
  const mode = parse(await readFile(new URL('04-ace/.bob/custom_modes.yaml', root), 'utf8')).customModes[0];
  for (const name of ['1_workflow.xml', '7_msgflow_xml_and_esql_schema.xml', '8_workshop-adjustments.md']) {
    assert(mode.customInstructions.includes(name), `ACE mode must direct Bob to ${name}`);
  }
});

test('ACE mode preserves upstream fields and all seven original rule files', async () => {
  const root = new URL('../04-ace/.bob/', import.meta.url);
  const upstream = JSON.parse(await readFile(new URL('ace-mode-upstream.json', root), 'utf8'));
  const sha = (text) => createHash('sha256').update(text).digest('hex');
  assert.equal(Object.keys(upstream.rulesSha256).length, 7);
  for (const [file, hash] of Object.entries(upstream.rulesSha256)) {
    const text = await readFile(new URL(file, root), 'utf8');
    // Git may use CRLF on Windows; check original contents apart from checkout line endings.
    assert.equal(sha(text.replace(/\r\n/g, '\n')), hash, `${file} differs from the pinned original`);
  }
  const mode = parse(await readFile(new URL('custom_modes.yaml', root), 'utf8')).customModes[0];
  const { customInstructions, ...original } = mode;
  assert(customInstructions.includes('8_workshop-adjustments.md'));
  original.groups = original.groups.filter((group) => group !== 'skill');
  assert.equal(sha(JSON.stringify(original)), upstream.originalModeFieldsSha256, 'Original mode fields changed');
});

test('ACE HTTP checker validates success and error contracts (test double, not an ACE runtime)', async () => {
  const server = createServer((req, res) => {
    const params = new URL(req.url, 'http://localhost').searchParams;
    const latitude = params.get('latitude');
    const invalid = latitude === null || !Number.isFinite(Number(latitude)) || Math.abs(Number(latitude)) > 90;
    res.writeHead(invalid ? 400 : 200, { 'content-type': 'application/json' });
    res.end(JSON.stringify(invalid ? { error: 'Invalid coordinates' } : {
      latitude: 52.52, longitude: 13.41, timezone: 'Europe/Berlin',
      current: { time: '2026-09-10T12:00', temperature_2m: 20, wind_speed_10m: 5 },
      current_units: { temperature_2m: '°C', wind_speed_10m: 'km/h' },
    }));
  });
  await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
  try { await checkApi(`http://127.0.0.1:${server.address().port}`); }
  finally { await new Promise((resolve) => server.close(resolve)); }
});
