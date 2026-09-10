# 2 · Data to dashboard

Ask questions of a real database, then visualize it.

## What is an MCP server?

**MCP (Model Context Protocol)** is a standard way for AI assistants to use external tools and data. An **MCP server** is a program that makes those tools available to Bob.

Here, Bob starts the server on your laptop; it connects to the remote workshop database. Bob can call three tools: `list_tables` to discover tables, `get_table_schema` to inspect columns, and `query_database` to read data. Watch those calls: a description of the source code is not proof of a working database connection.

## What does the mode add?

The MCP provides **access**; a Bob mode provides **instructions and tool permissions**. Our [Contoso Analyst mode](.bob/custom_modes.yaml) explains how to avoid counting sales twice, handle currencies, and build readable dashboards. You can inspect it and reuse the idea for your own team's conventions.

Contoso is fictional retail sample data in a real database. This lab's query tool uses read-only transactions. Keep the connection credentials private: a dashboard does not automatically inherit Bob's MCP access, and a live-refresh dashboard needs a server-side connection—not database credentials in browser code.

## Try it

- Open this folder in Bob. Put the instructor's `.env` and, if supplied, `database-ca.pem` in `mcp-server/`.
- Run `npm run setup` in this folder. This repository's helper creates `.bob/mcp.json` with the correct paths for your machine; Bob uses it to start the server.
- Open Bob's MCP settings and restart **contoso**. Run `npm run check` to verify the connection. You should see three tools and eight Contoso tables.
- Ask Bob:

  > Use the Contoso MCP to explore the database. What is this data about? Show me something interesting.

- Select **Contoso Analyst** in the mode selector. This mode includes useful knowledge about the data and dashboard conventions. Ask:

  > Create a dashboard using the real data from this database so I can understand it. Run it and check that it works.

- Play with the result: ask for a filter, another chart, or an answer to your own business question.

**Done when:** Bob has called the database tools and your dashboard shows real Contoso results.

If the mode is missing, reload Bob's window. If the MCP fails, `npm run check` reports the connection error. The `.env` belongs in `mcp-server/`; don't move it into `.bob/`.

[Next: Build a weather MCP](../03-weather-mcp/README.md) · [Workshop guide](../README.md)
