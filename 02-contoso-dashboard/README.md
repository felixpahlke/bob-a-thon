# 2 · Data to dashboard

Ask questions of a real database, then visualize it.

New to MCP? Read the short [MCP and Bob modes explanation](../README.md#what-is-an-mcp-server) first.

- Open this folder in Bob. Put the instructor's `.env` and, if supplied, `database-ca.pem` in `mcp-server/`.
- Run `npm run setup` in this folder. It creates `.bob/mcp.json` with the correct paths for your machine.
- Open Bob's MCP settings and restart **contoso**. Run `npm run check` to verify the connection. You should see three tools and eight Contoso tables.
- Ask Bob:

  > Use the Contoso MCP to explore the database. What is this data about? Show me something interesting.

- Select **Contoso Analyst** in the mode selector. This mode includes useful knowledge about the data and dashboard conventions. Ask:

  > Create a dashboard using the real data from this database so I can understand it. Run it and check that it works.

- Play with the result: ask for a filter, another chart, or an answer to your own business question.

**Done when:** Bob has called the database tools and your dashboard shows real Contoso results.

If the mode is missing, reload Bob's window. If the MCP fails, `npm run check` reports the connection error. The `.env` belongs in `mcp-server/`; don't move it into `.bob/`.
