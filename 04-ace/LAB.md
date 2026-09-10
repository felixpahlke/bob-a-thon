# Weather integration brief

Build an ordinary ACE 13 **Application** named `WeatherAPI`, not a specialized REST API project. Use the bundled ACE skills for project files, flows, and ESQL.

- Expose `GET /weather/current?latitude=52.52&longitude=13.41`.
- Call Open-Meteo over HTTPS using the same coordinates, `current=temperature_2m,wind_speed_10m`, and `timezone=auto`.
- Return JSON with `latitude`, `longitude`, `current`, `current_units`, and `timezone` from the upstream response. Preserve units and observation time. No key is needed.
- Missing or invalid coordinates return HTTP 400 with a JSON `error`. Upstream failures return a useful JSON error and an appropriate non-2xx status. Use a finite backend timeout.
- Use `HTTPInput → Compute → HTTPRequest → Compute → HTTPReply` for the successful request, with validation and error paths. Include the Application's `.project` and `application.descriptor`; no REST API descriptor or generated REST routing is needed.
- Keep the `.msgflow` and `.esql` files at the Application root. Use the default broker schema: omit `BROKER SCHEMA` and reference each Compute module as `esql://routine/#ModuleName.Main`.
- Keep the project self-contained: no MQ, database, JavaCompute, API gateway, or external shared library is needed.
- Put generated projects in `projects/` and the BAR in `output/`. The local ACE work directory is `.workdir/`; don't overwrite an existing server configuration.
- Check the running server's ports. The tests default to HTTP `7800`; administration commonly uses `7600`. Build with installed ACE tools, deploy to the local server, and run `node test-api.mjs`. Use `--base-url http://localhost:PORT` for a different HTTP port.
- If ACE isn't installed or commands aren't available, prepare the source and explain what is unverified. Never substitute a Node/Java mock and call it an ACE deployment.

Extension: add city-name lookup through Open-Meteo's geocoding API.

[Open-Meteo](https://open-meteo.com/en/docs) · [Original IBM tutorial](https://developer.ibm.com/tutorials/accelerate-integration-development-app-connect-ibm-bob/)
