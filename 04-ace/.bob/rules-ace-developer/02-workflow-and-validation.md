# ACE workflow and validation

Use this with [artifact correctness](01-artifact-correctness.md), the relevant bundled skills, and [LAB.md](../../LAB.md). Adapted from the original ACE mode's [workflow](https://github.com/ibm-self-serve-assets/ibm-ace-bob-mode/blob/ccb56e7ade9f98ce11eae9f9c577d18739137718/rules-ace-developer/1_workflow.xml) and [testing guidance](https://github.com/ibm-self-serve-assets/ibm-ace-bob-mode/blob/ccb56e7ade9f98ce11eae9f9c577d18739137718/rules-ace-developer/6_testing_guidance.xml). [MIT license](../skills/ACE-LICENSE.txt).

## Understand, design, implement

1. Inspect existing files before generating anything. Preserve participant changes and do not replace an existing project or server configuration without permission.
2. Read the endpoint contract and choose the simplest matching ACE project architecture. Briefly identify the input, validation, upstream request, success response, and error paths. Clarify genuinely missing requirements, not decisions already made in LAB.md.
3. Determine whether the task is source-only or includes execution. No ACE installation is required for source preparation; do not install it or introduce a substitute server when unavailable.
4. Activate the relevant project, flow, ESQL, and subflow skills and read their references before creating those artifacts. Verify unfamiliar attributes and syntax rather than extrapolating names.
5. Generate projects under `projects/`. Keep BAR outputs in `output/`, runtime data in `.workdir/`, and secrets out of source. No MQ, SOAP, database, JavaCompute, shared audit framework, or four-environment property set is required for this lab.
6. Review the generated artifacts against the checks below and fix identified source problems before handing them back. Instructions guide generation; they do not guarantee valid output.

## Static review — possible without ACE

- Parse XML/JSON with available tools. Resolve referenced files, XML node IDs, namespaces, subflow boundary terminals, and ESQL module names. Explicitly distinguish well-formed XML from validation against ACE's node model.
- Check OpenAPI base paths, operation paths, IDs, and REST operation mappings against the exact URL in LAB.md and `test-api.mjs`.
- Review every Compute entry point, broker schema, input/output tree reference, local-environment propagation setting, and ESQL terminal name.
- Trace valid input through the upstream GET and JSON response. Trace missing, empty, nonnumeric, and out-of-range coordinates to a JSON HTTP 400 without an upstream call.
- Trace HTTPRequest Error and Failure separately to non-2xx JSON responses. Check the actual timeout property and the response-field validation. Account for exceptions during parsing or conversion, not just explicit IF branches.
- Prepare reproducible test commands/cases, including upstream errors and timeouts. A direct call to Open-Meteo proves only that the upstream API is reachable, not that the ACE project works.
- Report issues you fixed and remaining uncertainty. No ACE compiler means compilation, import compatibility, deployment, and runtime behavior remain unverified.

## Build and run — only with ACE available and execution requested

- Verify the installed version and command help. On Windows, run `call "<actual-install-path>\server\bin\mqsiprofile.cmd"` and the ACE command within the same `cmd.exe` process. Use actual quoted paths, not an assumed installation directory. Do not require WSL, change execution policies, or persist machine-wide environment changes.
- Use the installed ACE build/deployment commands and inspect their diagnostics. Do not count a ZIP assembled by a generic archiver as a successful ACE build. Keep generated REST dispatch metadata consistent with the API definition.
- Check `.workdir/server.conf.yaml` and the server's actual listeners before connecting. Application HTTP and administration use different ports; the test default is application HTTP 7800. Do not assume TLS is enabled on the admin listener or disable certificate verification to make a command succeed.
- For a laptop demo, keep management access local; do not expose an unauthenticated admin interface to the workshop network. Do not overwrite another running server's applications or change firewall rules.
- Deploy the built BAR, confirm deployment diagnostics, then run `node test-api.mjs` from the lab folder. Use `--base-url http://localhost:PORT` only to match the actual application listener; do not alter the required endpoint path to hide a mismatch.
- The supplied checker covers the success response plus missing coordinates, invalid latitude, and nonnumeric latitude. Also exercise invalid longitude, empty values, upstream HTTP errors, transport failures, and timeouts using controlled test inputs/backends without disrupting the public API. Never weaken tests merely to pass generated code.
- Import into Toolkit if available to check visual/editing compatibility. Toolkit inspection is useful, but it does not replace running the deployed endpoint.

## Handoff evidence

Summarize these separately, marking anything not performed as **not run** with a reason:

- **Generated:** project and implementation files created.
- **Statically checked:** list the parsers and reference/logic checks actually performed.
- **Built:** actual ACE command result and BAR path, if run.
- **Deployed:** actual target and deployment result, if run.
- **Runtime-tested:** cases executed and observed HTTP statuses/data, if run.

Do not present `npm test` as a validation of a participant's generated ACE project: it checks this repository's helpers, mode configuration, and the HTTP checker using a test double. An AI review is also not an ACE compilation or a runtime test.
