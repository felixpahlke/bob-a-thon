# 3 · Build your own MCP

**35 minutes · Give Bob a new tool, built by Bob.**

- Open this folder in Bob. The starter has MCP wiring and a `ping` tool; Bob will implement the weather tools.
- Ask:

  > Build a weather MCP using Open-Meteo. Let me search for a city and get its current weather. Use the starter and the API notes. Test it, then help me connect it to Bob.

- Run `npm run setup`, then restart **weather** in Bob's MCP settings.
- Run `npm run check`. It checks city lookup, current weather, and invalid coordinates against the tool contract in `API.md`.
- Ask: “Use the weather MCP to compare the weather in Berlin and London.” Check that Bob calls the tools.
- Add something: a forecast, a clearer weather description, or support for choosing between cities with the same name.

**Done when:** Bob answers with live weather from your MCP and you have tried one improvement.

Open-Meteo needs no API key for this non-commercial demo. [Weather data by Open-Meteo](https://open-meteo.com/).
