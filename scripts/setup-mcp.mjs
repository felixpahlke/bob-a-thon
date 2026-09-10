import { copyFile, mkdir, readFile, writeFile } from 'node:fs/promises';
import { constants } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
export const labs = {
  database: { folder: '02-contoso-dashboard', server: 'mcp-server/server.mjs', name: 'contoso' },
  weather: { folder: '03-weather-mcp', server: 'server.mjs', name: 'weather' },
};

export async function setup(kind, base = root) {
  const lab = labs[kind];
  if (!lab) throw new Error('Choose database or weather.');
  const folder = join(base, lab.folder);
  const configPath = join(folder, '.bob', 'mcp.json');
  let config = {};
  try { config = JSON.parse(await readFile(configPath, 'utf8')); }
  catch (error) { if (error.code !== 'ENOENT') throw error; }
  if (config === null || Array.isArray(config) || typeof config !== 'object') throw new Error('MCP config must be a JSON object.');
  if (config.mcpServers && (typeof config.mcpServers !== 'object' || Array.isArray(config.mcpServers))) throw new Error('mcpServers must be an object.');
  const entry = { command: process.execPath, args: [join(folder, lab.server)], cwd: dirname(join(folder, lab.server)) };
  // Keep unrelated MCPs and per-server preferences (timeouts, approval settings).
  config.mcpServers = { ...config.mcpServers, [lab.name]: { ...config.mcpServers?.[lab.name], ...entry } };
  await mkdir(dirname(configPath), { recursive: true });
  await writeFile(configPath, JSON.stringify(config, null, 2) + '\n');
  if (kind === 'database') {
    try { await copyFile(join(folder, 'mcp-server/.env.example'), join(folder, 'mcp-server/.env'), constants.COPYFILE_EXCL); }
    catch (error) { if (error.code !== 'EEXIST') throw error; }
  }
  return { configPath, name: lab.name };
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try {
    const result = await setup(process.argv[2]);
    console.log(`Configured ${result.name} in ${result.configPath}`);
    if (process.argv[2] === 'database') console.log('Check mcp-server/.env contains the instructor credentials and the CA file exists if configured.');
    console.log(`Open this lab folder in Bob, then restart ${result.name} in MCP settings.`);
  } catch (error) { console.error(error.message); process.exitCode = 1; }
}
