# Technical spec

Starter, not an approved specification. Record decisions, not a catalogue of possible technologies.

## Design

- Choose a simple frontend and Node.js backend; explain the choice briefly. Keep generated code in `app/`.
- Describe the browser → backend → Open-Meteo request flow. No MCP or ACE dependency is needed.
- Define backend endpoint inputs, example success/error responses, and HTTP status codes. Include validation, upstream timeouts, and safe rendering of external text.
- Choose Open-Meteo fields, units, and timezone handling using its [weather](https://open-meteo.com/en/docs) and [geocoding](https://open-meteo.com/en/docs/geocoding-api) documentation. Include attribution; never put secrets in browser code.

## Verification and running

- Map each functional criterion ID to an automated test or an explicit manual check. Separate repeatable tests with sample API responses from the live-weather smoke check.
- Define commands to install, run, and test from `app/`, usable on Windows without WSL. Do not assume scripts exist before creating them.
- Record actual results in `TEST_RESULTS.md`: criterion ID, check/command, expected versus observed result, and passed/failed/not run.

## Open questions and changes

Resolve blocking technical choices before coding. Record any later decision that changes the agreed behavior or test approach.
