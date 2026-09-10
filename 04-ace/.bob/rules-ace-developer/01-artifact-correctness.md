# ACE artifact correctness

Read this before generating or reviewing this lab's ACE files. These rules adapt the original ACE mode's HTTP/ESQL guidance; they are not a substitute for the ACE compiler or runtime. Follow [LAB.md](../../LAB.md) for the required behavior. If a reference conflicts with installed ACE schemas or current IBM documentation, verify the discrepancy instead of guessing.

## Project and API contract

- Use [ace-projects.md](../skills/shared/ace-projects.md) and the bundled [REST API example](../skills/shared/ExampleAPI/restapi.descriptor) for project metadata. Do not mix an ordinary Application descriptor with REST API project conventions.
- For a REST API project, keep the OpenAPI definition, `restapi.descriptor`, operation IDs, implementation subflows, and generated dispatcher consistent. Each implemented operation must be mapped to its subflow; an empty operations list is not a completed implementation.
- The externally callable path must be exactly `/weather/current`. Account for the OpenAPI server/base path plus the operation path; do not silently introduce `/weatherapi/v1` or change the tests to accommodate it.
- Read the [node references](../skills/shared/node-types.md) before choosing node types. Do not assume an XML file is ACE-compatible merely because an XML parser accepts it.

## Flow XML and wiring

- Follow the ecore/XMI structure in [message-flow rules](../skills/shared/message-flow-rules.md) and [subflow rules](../skills/shared/subflow-rules.md). Nodes and connections belong inside the composite's `composition`, not directly under `ecore:EPackage`.
- Declare a namespace for each node or referenced subflow. HTTP Input, HTTP Request, HTTP Reply, and Compute use `ComIbmWSInput.msgnode`, `ComIbmWSRequest.msgnode`, `ComIbmWSReply.msgnode`, and `ComIbmCompute.msgnode` respectively, with `:FCMComposite_1` for their `xmi:type`. Subflow boundary nodes use `eflow:FCMSource` and `eflow:FCMSink`.
- Keep `nsURI` consistent with the file's project-relative path; use the corresponding underscore-separated path for `nsPrefix`. Give nodes and connections unique IDs and readable labels/layout positions.
- Every connection must reference existing node IDs and terminals supported by those node types. For a referenced subflow, match its actual boundary terminal IDs; do not invent `in`/`out` names for its external interface.
- Connect each Compute node to its actual ESQL entry point. For a root-level module, use `computeExpression="esql://routine/#ModuleName.Main"`; for a module in broker schema `example`, use `esql://routine/example#ModuleName.Main`. Do not use `computeExpression="esql"` plus an invented `esqlModuleName` attribute. See the [Compute example](../skills/shared/ExampleApplication/Example.msgflow).
- Keep module names unambiguous within their broker schema and make references match exactly. A root-level ESQL file may use the default broker schema; do not add a mismatched schema just to satisfy a template.

## Compute nodes and ESQL trees

Compute ESQL uses `InputRoot`/`OutputRoot` and `InputLocalEnvironment`/`OutputLocalEnvironment`. Do not use bare `LocalEnvironment` in a Compute module. Preserve the request context when writing local-environment overrides:

```esql
SET OutputLocalEnvironment = InputLocalEnvironment;
SET OutputLocalEnvironment.Destination.HTTP.RequestURL = upstreamURL;
SET OutputLocalEnvironment.Destination.HTTP.RequestLine.Method = 'GET';
```

Set the Compute node to **LocalEnvironment and Message** (`computeMode="destinationAndMessage"`) when forwarding these changes with the message. The default is **Message**, which forwards the input local environment, not your modified output version. Preserve the incoming HTTP reply identifier and other context needed by downstream nodes; do not replace the entire local environment with only the new URL.

Sources: [Compute node](https://www.ibm.com/docs/en/app-connect/13.0.x?topic=nodes-compute-node), [correlation names](https://www.ibm.com/docs/en/app-connect/13.0.x?topic=tree-correlation-names).

## Input validation and routing

- Read parameters from the tree populated by the chosen input architecture: REST API operation parameters use `InputLocalEnvironment.REST.Input.Parameters`; a plain HTTPInput flow with `parseQueryString="true"` uses `InputLocalEnvironment.HTTP.Input.QueryString`. Do not interchange them. Verify against [REST API parameter handling](https://www.ibm.com/docs/en/app-connect/13.0.x?topic=apis-implementing-operations-in-rest-api) and [HTTPInput](https://www.ibm.com/docs/en/app-connect/13.0.x?topic=nodes-httpinput-node).
- Check missing/empty values, failed numeric conversion, and latitude/longitude bounds. An invalid numeric `CAST` can throw; use the documented `DEFAULT` form or a scoped exception handler to produce the required HTTP 400. A comment saying CAST returns NULL does not handle conversion errors. See [CAST](https://www.ibm.com/docs/en/app-connect/13.0.x?topic=functions-cast-function).
- In ESQL, use logical terminal names such as `PROPAGATE TO TERMINAL 'out1';`, then `RETURN FALSE;` to avoid a second default propagation. `OutTerminal.out1` is the XML connection name, not the ESQL terminal string. Route validation errors directly to the reply path, not through the weather request. See [PROPAGATE](https://www.ibm.com/docs/en/app-connect/13.0.x?topic=statements-propagate-statement).
- Create a JSON response tree explicitly. Set the actual HTTP response status, not merely a `status` field in the JSON. One documented reply mechanism is `OutputRoot.HTTPResponseHeader."X-Original-HTTP-Status-Code"`; create the HTTPResponseHeader domain before the body and do not copy upstream Content-Length or unrelated headers into a newly constructed response. See [HTTPReply](https://www.ibm.com/docs/en/app-connect/13.0.x?topic=nodes-httpreply-node).

## Calling Open-Meteo and handling failures

- Configure HTTPRequest with a nonempty HTTPS `URLSpecifier`, a finite `timeoutForServer`, and GET explicitly. Do not use the invalid `requestTimeout` attribute or assume the default method is GET. Build query parameters from validated values, safely encoding them; include both requested weather fields and `timezone=auto`.
- Configure response parsing using supported node properties. Check the property name in a verified example or installed node schema rather than adding both `messageDomain` and `messageDomainProperty` speculatively.
- Wire HTTPRequest **Out** for success, **Error** for non-success HTTP responses, and **Failure** for transport errors/timeouts. Its XML names are `OutTerminal.out`, `OutTerminal.error`, and `OutTerminal.failure`. Do not invent a Request `timeout` terminal.
- An HTTP error can carry a BLOB body; a connection failure may have no HTTP status or response body. Inspect the appropriate response headers or exception tree. Do not assume `LocalEnvironment.HTTP.ResponseStatusCode` exists or that every failure contains JSON.
- Give both error paths a finite, useful JSON error response and non-2xx client status. Validate expected fields before treating an upstream JSON object as successful weather data. Preserve units, observation time, and timezone on success. Do not leak internal exception details or fabricate weather values.

Source: [HTTPRequest node](https://www.ibm.com/docs/en/app-connect/13.0.x?topic=nodes-httprequest-node).

Adapted from [original ACE mode rules](https://github.com/ibm-self-serve-assets/ibm-ace-bob-mode/blob/ccb56e7ade9f98ce11eae9f9c577d18739137718/rules-ace-developer/7_msgflow_xml_and_esql_schema.xml), with workshop-specific corrections and checks. [MIT license](../skills/ACE-LICENSE.txt).
