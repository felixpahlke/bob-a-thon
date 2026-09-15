# 3 · Build your own MCP

Give Bob a new tool, built by Bob.

## From an API to a Bob tool

In Lab 2, you used a supplied MCP server. Here you build one. The **weather API** supplies data over HTTP; your **MCP server** gives Bob named tools with defined inputs and results, and calls that API when Bob uses them.

City lookup turns a name into coordinates; the weather tool uses those coordinates to fetch current conditions. The short [API notes](API.md) are the tool contract: what each tool accepts and returns. The checks test that contract, including invalid input—not just whether the server starts.

## Try it

- Open this folder in Bob and select Agent mode. The starter has MCP wiring and a `ping` tool; Bob will implement the weather tools.
- Ask:

  > Build a weather MCP using Open-Meteo. Let me search for a city and get its current weather. Use the starter and the API notes. Test it, then help me connect it to Bob.

- Run `npm run setup`, then restart **weather** in Bob's MCP settings.
- Run `npm run check`. It checks city lookup, current weather, and invalid coordinates against the tool contract in `API.md`.
- Ask: “Use the weather MCP to compare the weather in Berlin and London.” Check that Bob calls the tools.
- Ask Bob to walk through one tool: its inputs, the HTTP request it sends to Open-Meteo, and the result it returns to Bob.
- Add something: a forecast, a clearer weather description, or support for choosing between cities with the same name.

**Done when:** Bob answers with live weather from your MCP and you have tried one improvement.

Open-Meteo needs no API key for this non-commercial demo. [Weather data by Open-Meteo](https://open-meteo.com/).

Next, choose [App Connect](../04-ace/README.md) or [Operational Decision Manager](../04-odm-mode/README.md) for Step 4. [Workshop guide](../README.md).
