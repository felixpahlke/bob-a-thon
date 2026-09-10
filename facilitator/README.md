# Facilitator notes

## Before the room arrives

- Rehearse from a fresh checkout: `npm ci`, then `npm test`.
- Supply a Contoso `.env` and its CA certificate privately. Use a dedicated SELECT-only database login, not the administrator that created the database. Participants need access to the database hostname/port from the workshop network.
- In Lab 2, run `npm run setup` and `npm run check`. Each participant opens the lab folder itself; the generated MCP config uses absolute paths. Rerun setup after moving the repository.
- Rehearse Lab 3 by having Bob complete its starter and running `npm run check`. Its weather check intentionally fails until the two tools exist. There is no API key to distribute.
- ACE is optional and requires installation before the session. Its mode and focused upstream skills are bundled. Rehearse a real build/deploy/test on your installed version before offering it as a participant lab.

## Keep the session moving

- Lab 1: a working app and one personal change.
- Lab 2: a visible MCP call, an interesting answer, then a dashboard. Let people choose the questions and look.
- Lab 3: working weather tools and one improvement. Empty city results are fine; fabricated weather isn't.
- ACE: show the generated flow in the Toolkit and a successful HTTP response. Keep cloud governance for a different session.

## What is deliberately small

- One dependency install for the repository; no Python, Docker, or local database for the core labs.
- No finished to-do app or dashboard: participants create them with Bob.
- The database MCP uses TLS verification, read-only transactions, a statement timeout, and a 500-row result cap. Those do not replace a SELECT-only database role.
- The shared Contoso database is instructor-provided, not provisioned by this repository. Its eight tables are customer, product, store, date, orders, orderrows, sales, and currencyexchange. Don't use the old lab's users/products connection test.
- `.env`, certificates, local MCP config, ACE runtime data, and dependencies are ignored by Git. The public repository contains no connection credentials.

## Publishing

Review `git status` and `git diff --cached` before pushing. Publish the repository files and lockfile, not your local credentials or ACE installer. Retain the notices in THIRD_PARTY.md and the bundled ACE license.
