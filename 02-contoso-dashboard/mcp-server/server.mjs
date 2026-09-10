import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { z } from 'zod';
import { createDatabase } from './database.mjs';

const db = createDatabase();
const server = new McpServer({ name: 'contoso', version: '1.0.0' });
const annotations = { readOnlyHint: true, destructiveHint: false, idempotentHint: true, openWorldHint: false };
const result = (value) => ({ content: [{ type: 'text', text: JSON.stringify(value) }] });
const handle = (fn) => async (args) => {
  try { return result(await fn(args)); }
  catch (error) { return { ...result({ error: error.message }), isError: true }; }
};

server.registerTool('list_tables', {
  description: 'List tables and views available in the public schema of the connected database.',
  inputSchema: {}, annotations,
}, handle(() => db.query("SELECT table_name, table_type FROM information_schema.tables WHERE table_schema = 'public' ORDER BY table_name")));

server.registerTool('get_table_schema', {
  description: 'Inspect columns, keys, and indexes of a public-schema table.',
  inputSchema: { table_name: z.string().min(1).max(63) }, annotations,
}, handle(async ({ table_name }) => ({
  table: table_name,
  columns: (await db.query(`SELECT column_name, data_type, is_nullable, column_default
    FROM information_schema.columns WHERE table_schema = 'public' AND table_name = $1 ORDER BY ordinal_position`, [table_name])).rows,
  constraints: (await db.query(`SELECT con.conname AS name, pg_get_constraintdef(con.oid) AS definition
    FROM pg_constraint con JOIN pg_class rel ON rel.oid = con.conrelid
    JOIN pg_namespace ns ON ns.oid = rel.relnamespace
    WHERE ns.nspname = 'public' AND rel.relname = $1 ORDER BY con.conname`, [table_name])).rows,
  indexes: (await db.query("SELECT indexname, indexdef FROM pg_indexes WHERE schemaname = 'public' AND tablename = $1", [table_name])).rows,
})));

server.registerTool('query_database', {
  description: 'Run one read-only SELECT/WITH query against Contoso. Up to 500 rows; 8-second statement timeout. Aggregate large results in SQL.',
  inputSchema: { query: z.string().min(1).max(20000) }, annotations,
}, handle(({ query }) => db.query(query)));

let closing = false;
async function close() {
  if (closing) return;
  closing = true;
  await db.close();
}
server.server.onclose = close;
for (const signal of ['SIGINT', 'SIGTERM']) process.on(signal, async () => { await server.close(); await close(); });
await server.connect(new StdioServerTransport());
