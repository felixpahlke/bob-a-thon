# Bob-a-thon

Build apps, connect Bob to real data, and learn to guide and verify its work.

Use this page as your workshop guide. Each lab has its own short background, steps, and starting prompts—make the results your own.

Jump to a lab:

- [1 · Build an app](01-build-an-app/README.md)
- [2 · Data to dashboard](02-contoso-dashboard/README.md)
- [3 · Build a weather MCP](03-weather-mcp/README.md)
- Step 4 — choose [App Connect](04-ace/README.md) or [Operational Decision Manager](04-odm-mode/README.md).
- [5 · Spec-driven development](05-spec-driven-development/README.md)
- [6 · ACE Toolkit and IBM Bob](06-ace-early-experience-prg/README.md)

## Start here

- Install and sign in to **IBM Bob**. Install **Node.js 22 or 24 LTS** and Git.
- Clone or download this repository. In the repository's root folder, run **`npm ci`** once.

  ```bash
  git clone https://github.com/felixpahlke/bob-a-thon.git
  cd bob-a-thon
  npm ci
  ```

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

## 4 · Choose your integration lab

Choose one of these labs based on your interests or your instructor's guidance. Open its folder in Bob.

- **[App Connect — `04-ace`](04-ace/README.md):** use the ACE Developer mode and skills to prepare a weather API integration. With ACE installed, also build, deploy, and test it locally; otherwise review the source and clearly list unverified checks.
- **[Operational Decision Manager — `04-odm`](04-odm-mode/README.md):** use the custom **ODM Rule Designer** Bob mode to generate a complete, importable ODM Decision Service for geolocation-based fraud detection — XOM Java model, BOM vocabulary, BAL business rules, ruleflow, and deployment configuration — from a single natural-language prompt. Import the result into ODM Rule Designer and explore or improve it.

**Checkpoint:** complete the chosen lab's exercise and explain what you created and verified.

## 5 · Build from a spec

Open **`05-spec-driven-development`** in Bob and follow [Lab 5](05-spec-driven-development/README.md). It also works independently of the integration labs.

- Agree short functional and technical specs for a weather app, then have Bob build and test against them.
- Request one change: update the spec first, then the code and tests.

**Checkpoint:** acceptance criteria traced to actual checks, with one change reflected in the specs and app.

## 6 · ACE Toolkit and IBM Bob

Open **`06-ace-early-experience-prg`** in Bob and follow [Lab 6](06-ace-early-experience-prg/README.md).

- Install IBM Bob Shell and configure it as a terminal inside the ACE Toolkit.
- Use the ace-bob skill to generate a complete ACE application with all required Eclipse metadata.
- Analyse an existing ESQL transformation flow and create, deploy, and test a file-processing flow.

**Checkpoint:** three exercises completed — HTTP echo flow generated, existing flow summarised, file flow deployed and tested end-to-end.

## Finish

Show one thing you built and one change you asked Bob to make. Explain how you checked the result against what you wanted.

[Facilitator notes](facilitator/README.md) · [Sources and licenses](THIRD_PARTY.md)
