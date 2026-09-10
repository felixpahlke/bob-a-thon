# Sources

- Workshop concept: [Bob-On-Tour](https://github.com/d-schreiter/Bob-On-Tour). The participant guides and database MCP here are newly written.
- Contoso: [SQLBI Contoso Data Generator V2 data](https://github.com/sql-bi/Contoso-Data-Generator-V2-Data/releases). Data is hosted separately by the instructor; no dataset is redistributed here.
- Weather: [Open-Meteo](https://open-meteo.com/). Free hosted API for non-commercial use; data attribution is required under CC BY 4.0. Include “Weather data by Open-Meteo” in generated weather interfaces.
- ACE lab inspired by the [IBM Developer tutorial](https://developer.ibm.com/tutorials/accelerate-integration-development-app-connect-ibm-bob/). We use Open-Meteo and a smaller coordinate-based endpoint.
- Bundled ACE skills/reference files: [ot4i/ace-bob](https://github.com/ot4i/ace-bob), commit `f357f9950d897594e5f9e2bc0e3e9ab6d282294f`, MIT. License: [ACE-LICENSE.txt](optional-ace/.bob/skills/ACE-LICENSE.txt). Only the project, flow, ESQL, subflow skills and supporting general references/examples are included. Links to omitted skills/connectors point to that pinned upstream revision; trailing whitespace is normalized. The workshop's concise ACE mode is newly written.
- Node dependencies retain their own licenses; exact versions are recorded in `package-lock.json`.
