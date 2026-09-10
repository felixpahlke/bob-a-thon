import assert from 'node:assert/strict';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

export async function checkApi(base = 'http://localhost:7800') {
  const endpoint = new URL('/weather/current', base);
  endpoint.search = new URLSearchParams({ latitude: '52.52', longitude: '13.41' });
  const response = await fetch(endpoint, { signal: AbortSignal.timeout(20000) });
  assert.equal(response.status, 200, `Weather request returned ${response.status}`);
  const data = await response.json();
  assert.equal(typeof data.current?.temperature_2m, 'number', 'Missing temperature');
  assert.equal(typeof data.current?.wind_speed_10m, 'number', 'Missing wind speed');
  assert(data.current?.time && data.current_units?.temperature_2m && data.current_units?.wind_speed_10m && data.timezone, 'Missing units, time, or timezone');
  assert.equal(typeof data.latitude, 'number');
  assert.equal(typeof data.longitude, 'number');
  for (const query of ['', '?latitude=100&longitude=13.41', '?latitude=abc&longitude=13.41']) {
    const invalid = await fetch(new URL('/weather/current' + query, base), { signal: AbortSignal.timeout(20000) });
    assert.equal(invalid.status, 400, `Invalid coordinates should return HTTP 400 (${query || 'missing'})`);
    assert((await invalid.json()).error, 'Error response should contain a JSON error');
  }
  return data;
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try {
    const index = process.argv.indexOf('--base-url');
    if (index !== -1 && !process.argv[index + 1]) throw new Error('Provide a URL after --base-url.');
    const data = await checkApi(index === -1 ? undefined : process.argv[index + 1]);
    console.log(JSON.stringify(data, null, 2));
    console.log('PASS: deployed weather endpoint and input validation.');
  } catch (error) { console.error(`ACE API check failed: ${error.message}. Start/deploy the ACE integration first and verify its HTTP port.`); process.exitCode = 1; }
}
