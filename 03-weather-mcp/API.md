# Weather tool notes

Use the installed MCP SDK v1 (`@modelcontextprotocol/sdk`) and Zod; Node already provides `fetch`.

- `search_city({ name: string })`: use `https://geocoding-api.open-meteo.com/v1/search?name=Berlin&count=5&language=en&format=json`. Return candidate names, countries, latitude, and longitude. No results means an empty list; don't silently choose a different city.
- `get_current_weather({ latitude: number, longitude: number })`: use `https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m&timezone=auto`. Return `current`, `current_units`, and timezone information.
- Validate latitude (-90 to 90), longitude (-180 to 180), and a nonempty search name. Encode parameters with `URLSearchParams`, check HTTP errors, and use a timeout.
- Return JSON inside MCP text content. Report failures with `isError: true`; stdout is only for MCP messages.

[Forecast documentation](https://open-meteo.com/en/docs) · [City lookup](https://open-meteo.com/en/docs/geocoding-api) · [SDK v1 documentation](https://ts.sdk.modelcontextprotocol.io/)
