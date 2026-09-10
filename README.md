# Bob-a-thon

Build an app, connect Bob to real data, then give it a new tool. About **2 hours**, plus an optional App Connect lab.

Follow this page from top to bottom. The prompts are starting points—make the results your own.

## Start here

- Install and sign in to **IBM Bob**. Install **Node.js 22 or 24 LTS** and Git.
- Clone or download this repository. In the repository's root folder, run **`npm ci`** once.
- Get the Contoso connection files from your instructor for Lab 2.
- For each lab below, use **File → Open Folder** in Bob to open that lab's folder. Run its commands in Bob's terminal. This is how Bob finds that lab's MCPs and modes.

## 1 · Build an app — 25 minutes

Open **`01-build-an-app`** and select Agent mode.

- Ask Bob:

  > Build me a good-looking to-do app. I want to add, complete, and delete tasks, and keep them after refreshing the page. Keep it simple and tell me how to run it.

- Open the app and try it. Refresh the page to check that tasks are saved.
- Ask for something personal: categories, search, a new design, or your own feature.
- If something breaks, describe the problem and let Bob fix it.

**Checkpoint:** a working app with one improvement you requested.

## 2 · Turn real data into a dashboard — 45 minutes

Open **`02-contoso-dashboard`**. The supplied MCP gives Bob three database tools; the mode adds knowledge about Contoso and useful dashboard conventions.

- Put the instructor's **`.env`** and, if supplied, **`database-ca.pem`** in **`mcp-server/`**. The database name is `contoso`.
- Run **`npm run setup`**. Open Bob's MCP settings and restart **contoso**. Run **`npm run check`**; expect three tools and eight tables.
- Ask Bob:

  > Use the Contoso MCP to explore the database. What is this data about? Show me something interesting.

- Check that Bob actually calls the database tools. Select **Contoso Analyst** in the mode selector, then ask:

  > Create a dashboard using the real data from this database so I can understand it. Run it and check that it works.

- Explore: add a filter, request another chart, or ask your own business question.

**Checkpoint:** a dashboard based on actual Contoso query results. [Connection help](02-contoso-dashboard/README.md).

## 3 · Have Bob build a weather MCP — 35 minutes

Open **`03-weather-mcp`** and use Agent mode. This time Bob builds the tools itself; the folder contains a minimal starter and API notes.

- Ask Bob:

  > Build a weather MCP using Open-Meteo. Let me search for a city and get its current weather. Use the starter and the API notes. Test it, then help me connect it to Bob.

- Run **`npm run setup`**, then restart **weather** in Bob's MCP settings.
- Run **`npm run check`** after Bob implements the tools.
- Ask: “Use the weather MCP to compare the weather in Berlin and London.” Watch the tool calls.
- Try your own city or ask Bob to add a forecast tool.

**Checkpoint:** Bob answers with live weather from the MCP you built. No API key is needed for this non-commercial demo. [Weather data by Open-Meteo](https://open-meteo.com/).

## Optional · Build an App Connect integration — 45 minutes after installation

This uses **IBM App Connect Enterprise (ACE) 13 Evaluation Edition**, including Toolkit and runtime. Install it before this section; the core labs above do not need it.

- Follow the short [ACE setup steps](optional-ace/README.md) to start a local integration server. No remote VM or cloud control plane is needed.
- Open **`optional-ace`** in Bob and select **ACE Developer**. The mode and ACE skills are already included.
- Ask Bob:

  > Create an ACE 13 weather integration using LAB.md. Build it, deploy it to my local integration server, and test it. First verify that the ACE commands are available; tell me if installation or environment setup is still missing.

- Open the generated project in ACE Toolkit. Ask Bob to explain the flow, then run **`node test-api.mjs`** in the lab folder.
- Ask for one change, rebuild, and test again.

**Checkpoint:** the deployed ACE endpoint returns live weather and handles invalid input. This step needs a real ACE installation; generating source files alone is not a completed integration.

## Coming soon · Operational Decision Manager

An [ODM lab](coming-soon-odm/README.md) is being prepared by a colleague. Skip it for now; no additional setup is needed.

## Finish

Show one thing you built and one change you asked Bob to make. You have used Bob to create an app, work with existing tools, and build a new integration.

[Facilitator notes](facilitator/README.md) · [Sources and licenses](THIRD_PARTY.md)
