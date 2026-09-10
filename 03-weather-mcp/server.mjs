import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';

const server = new McpServer({ name: 'weather', version: '1.0.0' });

server.registerTool('ping', {
  description: 'Check that the weather MCP starter is connected.',
  inputSchema: {},
}, async () => ({ content: [{ type: 'text', text: 'Connected. Add the weather tools from API.md.' }] }));

// Bob: add search_city and get_current_weather here; see API.md.
// Return MCP text content containing JSON. Log only to stderr.

await server.connect(new StdioServerTransport());
