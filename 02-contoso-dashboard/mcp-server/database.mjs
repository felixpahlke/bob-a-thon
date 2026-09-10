import { readFileSync, existsSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import dotenv from 'dotenv';
import pg from 'pg';

const localEnv = fileURLToPath(new URL('.env', import.meta.url));
export const ROW_LIMIT = 500;

export function loadConfig(envFile = process.env.WORKSHOP_ENV_FILE || localEnv) {
  const env = { ...(existsSync(envFile) ? dotenv.parse(readFileSync(envFile)) : {}), ...process.env };
  for (const key of ['DATABASE_HOST', 'DATABASE_PORT', 'DATABASE_NAME', 'DATABASE_USER', 'DATABASE_PASSWORD']) {
    if (!env[key] || /^(your-|replace-with-)/.test(env[key])) throw new Error(`Set ${key} in mcp-server/.env using the instructor credentials.`);
  }
  const port = Number(env.DATABASE_PORT);
  if (!Number.isInteger(port) || port < 1 || port > 65535) throw new Error('DATABASE_PORT must be a valid port number.');
  let ssl = false;
  if (env.DATABASE_SSL !== 'false') {
    ssl = { rejectUnauthorized: true };
    if (env.DATABASE_CA_FILE) {
      const caFile = resolve(dirname(envFile), env.DATABASE_CA_FILE);
      if (!existsSync(caFile)) throw new Error('DATABASE_CA_FILE was set but its PEM file is missing beside .env.');
      ssl.ca = readFileSync(caFile, 'utf8');
    }
  }
  return {
    host: env.DATABASE_HOST, port, database: env.DATABASE_NAME,
    user: env.DATABASE_USER, password: env.DATABASE_PASSWORD, ssl,
    max: 3, connectionTimeoutMillis: 10000, idleTimeoutMillis: 10000,
    application_name: 'bob-a-thon',
  };
}

export function selectStatement(sql) {
  const query = sql.trim().replace(/;\s*$/, '');
  if (!/^(SELECT|WITH)\b/i.test(query)) throw new Error('Use a SELECT query (optionally with WITH).');
  // The subquery plus extended protocol admits a single query, not transaction commands.
  return `SELECT * FROM (\n${query}\n) AS workshop_result LIMIT ${ROW_LIMIT + 1}`;
}

export function createDatabase(getPool = () => new pg.Pool(loadConfig())) {
  let pool;
  async function query(sql, values = []) {
    const text = selectStatement(sql);
    if (!pool) {
      pool = getPool();
      pool.on('error', (error) => console.error('Database pool error:', error.message));
    }
    const client = await pool.connect();
    let failed;
    try {
      await client.query('BEGIN READ ONLY');
      await client.query("SET LOCAL statement_timeout = '8s'");
      await client.query("SET LOCAL lock_timeout = '2s'");
      const result = await client.query({ text, values, queryMode: 'extended' });
      return { rows: result.rows.slice(0, ROW_LIMIT), truncated: result.rows.length > ROW_LIMIT, limit: ROW_LIMIT };
    } finally {
      try { await client.query('ROLLBACK'); }
      catch (error) { failed = error; }
      client.release(failed);
    }
  }
  return { query, close: async () => { if (pool) await pool.end(); } };
}
