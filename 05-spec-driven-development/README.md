# 5 · Build from a spec

Build a small weather app with a frontend and backend. The challenge is to agree what “correct” means before Bob writes code.

## What is spec-driven development?

In Lab 1, you planned in a conversation. Here, you keep that agreement in files and use it to guide implementation, tests, and later changes.

- The [functional spec](FUNCTIONAL_SPEC.md) describes user-visible behavior: **what** the app should do.
- The [technical spec](TECHNICAL_SPEC.md) records **how** it will work: components, API contracts, and technical choices.
- **Acceptance criteria** make requirements checkable. “Handle errors well” is vague; “When city lookup finds no match, show ‘No matching city’ and no weather values” can be tested.

A spec is an agreement you can revise, not a guarantee that generated code is correct. Keep it short and review Bob's assumptions yourself.

## Agree before building

- Open this folder in Bob and select **Plan** mode. No ACE, MCP, account, or additional required tooling is needed; use the workshop's Node.js installation and Open-Meteo.
- Start with:

  > Help me specify a small weather app with a browser frontend and a Node.js backend using Open-Meteo. Ask about the user experience and unclear requirements first. Use FUNCTIONAL_SPEC.md and TECHNICAL_SPEC.md as starters. Agree a small scope, 3–5 acceptance criteria with IDs, and simple technology choices with me. Do not implement yet.

- Decide what happens for an unknown or ambiguous city and when the weather service fails. Keep accounts, deployment, and extra features out of the first version.
- Have Bob save the agreed specs. If Plan mode cannot edit these files, switch to **Agent** and ask it to save only the specs. Read both files and resolve open questions before authorizing code.

## Build and check the agreement

- In **Agent** mode, ask:

  > Implement the two agreed specs in app/. Keep changes inside this lab. Create and run automated tests named with the acceptance-criterion IDs, then run the app and tell me how to open it. Ask before changing an agreed requirement. Record each criterion's result and test evidence in TEST_RESULTS.md; mark anything not checked as not run.

- Try the app yourself: check real weather and one error case. Ask Bob to show which code and test implement one criterion. A passing test can still miss a misunderstood requirement.
- Use fixed sample responses for repeatable automated tests, including upstream failures; separately check a real Open-Meteo request. Never present test fixtures as live weather. The repository's root `npm test` does not test your generated app.

## Change the spec, then the app

- Request one change, such as switching temperature units. Ask Bob to propose the spec changes and affected tests **before** editing the implementation.
- Review the new criterion, approve it, then have Bob update the app and rerun tests. Record the reason for the spec change; don't weaken a criterion just to make a failing test pass.

**Done when:** the app meets your agreed criteria, results distinguish passed/failed/not run, and one requested change is reflected in the specs, code, and tests.

**Discuss:** What ambiguity did you catch before coding? Where would a quick prompt have been enough, and where did the written agreement help?

[Weather API](https://open-meteo.com/en/docs) · [City lookup API](https://open-meteo.com/en/docs/geocoding-api). Include “Weather data by Open-Meteo” in the app with a link to the provider.

Inspired by [Bob-On-Tour Lab 5](https://github.com/d-schreiter/Bob-On-Tour/tree/main/lab5). [Workshop guide](../README.md).
