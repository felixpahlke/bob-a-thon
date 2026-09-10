# Bob-a-thon

Build an app, connect Bob to real data, then give it a new tool.

Use this page as your workshop guide. Each lab has its own short background, steps, and starting prompts—make the results your own.

Jump to a lab:

- [1 · Build an app](01-build-an-app/README.md)
- [2 · Data to dashboard](02-contoso-dashboard/README.md)
- [3 · Build a weather MCP](03-weather-mcp/README.md)
- [Optional · App Connect](optional-ace/README.md)
- [Coming soon · ODM](coming-soon-odm/README.md)

## Start here

- Install and sign in to **IBM Bob**. Install **Node.js 22 or 24 LTS** and Git.
- Clone or download this repository. In the repository's root folder, run **`npm ci`** once.
- Get the Contoso connection files from your instructor for Lab 2.
- For each lab below, use **File → Open Folder** in Bob to open that lab's folder. Run its commands in Bob's terminal. This is how Bob finds that lab's MCPs and modes.

**On Windows:** restart Bob after installing Node.js so it sees the new commands. Use Command Prompt or PowerShell. If PowerShell blocks `npm.ps1`, use `npm.cmd` instead of `npm` throughout the workshop. No WSL or Git Bash is required. Enable file-name extensions in Explorer so `.env` doesn't accidentally become `.env.txt`.

## 1 · Build an app

Open **`01-build-an-app`** in Bob and follow [Lab 1](01-build-an-app/README.md).

- Discuss features and simple technology choices in **Plan** mode, then switch to **Agent** to build the agreed app. Try it and ask for a change of your own.

**Checkpoint:** a working app with one improvement you requested.

## 2 · Turn real data into a dashboard

Open **`02-contoso-dashboard`** in Bob and follow [Lab 2](02-contoso-dashboard/README.md).

- Connect the supplied MCP server to the workshop database and to Bob.
- Explore the data, try the **Contoso Analyst** mode, and ask for a dashboard.

**Checkpoint:** a dashboard based on actual Contoso query results.

## 3 · Have Bob build a weather MCP

Open **`03-weather-mcp`** in Bob and follow [Lab 3](03-weather-mcp/README.md).

- Have Bob build weather tools, connect them, and answer questions with live weather.
- Try your own city or add a forecast tool.

**Checkpoint:** Bob answers with live weather from the MCP you built.

## Optional · Build an App Connect integration

Open **`optional-ace`** in Bob and follow the [App Connect lab](optional-ace/README.md).

- Use **ACE Developer** and the included skills to build a weather integration.
- Running it requires **IBM App Connect Enterprise 13 Evaluation Edition** locally; the core labs do not need it. You can prepare the source while it downloads.
- Deploy, test, and improve the integration. No cloud runtime is needed.

**Checkpoint:** the deployed ACE endpoint returns live weather and handles invalid input. This step needs a real ACE installation; generating source files alone is not a completed integration.

## Coming soon · Operational Decision Manager

An [ODM lab](coming-soon-odm/README.md) is being prepared by a colleague. Skip it for now; no additional setup is needed.

## Finish

Show one thing you built and one change you asked Bob to make. You have used Bob to create an app, work with existing tools, and build a new integration.

[Facilitator notes](facilitator/README.md) · [Sources and licenses](THIRD_PARTY.md)
