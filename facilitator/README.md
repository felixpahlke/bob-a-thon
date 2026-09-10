# Facilitator notes

## Before the room arrives

- Rehearse from a fresh checkout: `npm ci`, then `npm test`.
- Rehearse on a participant-style **Windows machine** too. The GitHub workflow includes Windows, but a configured CI job is not evidence that it has run. Confirm Bob sees Node after installation, `.env` keeps its exact filename, and the workshop network allows PostgreSQL and Open-Meteo connections.
- Supply a Contoso `.env` and its CA certificate privately. Use a dedicated SELECT-only database login, not the administrator that created the database. Participants need access to the database hostname/port from the workshop network.
- In Lab 2, run `npm run setup` and `npm run check`. Each participant opens the lab folder itself; the generated MCP config uses absolute paths. Rerun setup after moving the repository.
- Rehearse Lab 3 by having Bob complete its starter and running `npm run check`. Its weather check intentionally fails until the two tools exist. There is no API key to distribute.
- Lab 4 (ACE) includes a mode and focused upstream skills. Preparing source files needs no ACE installation; building and running them does. Rehearse a real build/deploy/test on your installed version before offering that part to participants.
- Step 4 is a choice between ACE and ODM. Coordinate the ODM exercise, prerequisites, and completion check with its instructor; the repository currently contains only the handoff page.

## Keep the session moving

- Lab 1: discuss features and technology in Plan mode, then build in Agent mode. Finish with a working app and one personal change.
- Lab 2: a visible MCP call, an interesting answer, then a dashboard. Ask people to trace one chart value back to its query and inspect one useful custom-mode instruction.
- Lab 3: working weather tools and one improvement. Ask what happens for an unknown city or invalid coordinates. Empty results are fine; fabricated weather isn't.
- Step 4, ACE: ask what validation and error handling the integration adds beyond calling the weather API directly. Review the source without ACE, or show a successful build and HTTP response with ACE installed. Keep cloud governance for a different session.
- Step 4, ODM: use the exercise and completion check supplied by its instructor.

## What is deliberately small

- One dependency install for the repository; no Python, Docker, or local database for the core labs.
- No finished to-do app or dashboard: participants create them with Bob.
- The database MCP uses TLS verification, read-only transactions, a statement timeout, and a 500-row result cap. Those do not replace a SELECT-only database role.
- The shared Contoso database is instructor-provided, not provisioned by this repository. Its eight tables are customer, product, store, date, orders, orderrows, sales, and currencyexchange. Don't use the old lab's users/products connection test.
- `.env`, certificates, local MCP config, ACE runtime data, and dependencies are ignored by Git. The public repository contains no connection credentials.

## Publishing

Review `git status` and `git diff --cached` before pushing. Publish the repository files and lockfile, not your local credentials or ACE installer. Retain the notices in THIRD_PARTY.md and the bundled ACE license.
