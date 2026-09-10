import assert from 'node:assert/strict';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { StdioClientTransport } from '@modelcontextprotocol/sdk/client/stdio.js';
import { labs } from './setup-mcp.mjs';

const root = fileURLToPath(new URL('../', import.meta.url));
export async function withMcp(kind, action) {
  const lab = labs[kind];
  if (!lab) throw new Error('Choose database or weather.');
  const transport = new StdioClientTransport({
    command: process.execPath, args: [join(root, lab.folder, lab.server)],
    cwd: tmpdir(), stderr: 'pipe',
    env: Object.fromEntries(Object.entries(process.env).filter(([, value]) => value !== undefined)),
  });
  const client = new Client({ name: 'bob-a-thon-check', version: '1.0.0' });
  client.onerror = (error) => console.error('MCP protocol:', error.message);
  try {
    await client.connect(transport, { timeout: 20000 });
    return await action(client);
  } finally { await client.close(); }
}

export async function call(client, name, args = {}) {
  const response = await client.callTool({ name, arguments: args }, undefined, { timeout: 20000 });
  const text = response.content.filter((item) => item.type === 'text').map((item) => item.text).join('\n');
  if (response.isError) throw new Error(`${name}: ${text}`);
  return JSON.parse(text);
}

export async function checkDatabase(client) {
  const { tools } = await client.listTools();
  for (const name of ['list_tables', 'get_table_schema', 'query_database']) assert(tools.some((tool) => tool.name === name), `Missing tool: ${name}`);
  const tables = await call(client, 'list_tables');
  const expected = ['currencyexchange', 'customer', 'date', 'orderrows', 'orders', 'product', 'sales', 'store'];
  for (const table of expected) assert(tables.rows.some((row) => row.table_name === table), `Contoso table missing: ${table}`);
  const schema = await call(client, 'get_table_schema', { table_name: 'sales' });
  assert(schema.columns.some((column) => column.column_name === 'net_price'));
  const state = await call(client, 'query_database', { query: "SELECT current_database() AS database, current_setting('transaction_read_only') AS read_only, (SELECT count(*) FROM public.sales) AS sales_rows" });
  assert.equal(state.rows[0].read_only, 'on');
  assert(Number(state.rows[0].sales_rows) > 0, 'sales is empty');
  return { tools: tools.map((tool) => tool.name), tables: tables.rows.map((row) => row.table_name), ...state.rows[0] };
}

export async function checkWeather(client) {
  const { tools } = await client.listTools();
  for (const name of ['search_city', 'get_current_weather']) assert(tools.some((tool) => tool.name === name), `Bob still needs to implement ${name}; see API.md.`);
  const cities = await call(client, 'search_city', { name: 'Berlin' });
  assert(JSON.stringify(cities).includes('Berlin'), 'City lookup did not return Berlin.');
  const weather = await call(client, 'get_current_weather', { latitude: 52.52, longitude: 13.41 });
  assert.equal(typeof weather.current?.temperature_2m, 'number', 'Missing current.temperature_2m');
  assert(weather.current?.time && weather.current_units?.temperature_2m, 'Missing observation time or temperature unit.');
  const invalid = await client.callTool({ name: 'get_current_weather', arguments: { latitude: 100, longitude: 13.41 } });
  assert(invalid.isError, 'Invalid latitude should return an MCP error.');
  return { tools: tools.map((tool) => tool.name), current: weather.current, units: weather.current_units };
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try {
    const kind = process.argv[2];
    if (!labs[kind]) throw new Error('Choose database or weather.');
    const value = await withMcp(kind, kind === 'database' ? checkDatabase : checkWeather);
    console.log(JSON.stringify(value, null, 2));
    console.log('PASS: MCP handshake and tool calls completed.');
  } catch (error) { console.error(error.message); process.exitCode = 1; }
}
