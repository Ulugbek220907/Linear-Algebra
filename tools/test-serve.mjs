import http from 'node:http';
import { spawn } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const testPort = 3333;

const child = spawn(process.execPath, [path.join(__dirname, 'serve.mjs')], {
  env: { ...process.env, PORT: String(testPort) },
  stdio: ['ignore', 'pipe', 'pipe'],
});

child.stdout.on('data', (d) => process.stdout.write(`[server stdout] ${d}`));
child.stderr.on('data', (d) => process.stderr.write(`[server stderr] ${d}`));

function request(pathStr) {
  return new Promise((resolve, reject) => {
    const req = http.request(
      {
        host: '127.0.0.1',
        port: testPort,
        path: pathStr,
        method: 'GET',
      },
      (res) => {
        let data = '';
        res.on('data', (c) => (data += c));
        res.on('end', () => resolve({ status: res.statusCode, headers: res.headers, body: data }));
      }
    );
    req.on('error', reject);
    req.end();
  });
}

async function run() {
  // Wait 1s for server to start
  await new Promise((r) => setTimeout(r, 1000));

  try {
    // 1. Root
    const rootRes = await request('/');
    if (rootRes.status !== 200 || !rootRes.body.includes('Linear Algebra')) {
      throw new Error(`Root test failed: status=${rootRes.status}`);
    }
    console.log('✓ Root route returns 200 with index.html');

    // 2. SPA Fallback
    const spaRes = await request('/lesson/lay-1-1');
    if (spaRes.status !== 200 || !spaRes.body.includes('<!doctype html>')) {
      throw new Error(`SPA fallback failed: status=${spaRes.status}`);
    }
    console.log('✓ SPA route /lesson/lay-1-1 returns 200 fallback to index.html');

    // 3. Static asset
    const imgRes = await request('/board/photo_2026-10-21_21-27-46.jpg');
    if (imgRes.status !== 200 || imgRes.headers['content-type'] !== 'image/jpeg') {
      throw new Error(`Asset test failed: status=${imgRes.status}, type=${imgRes.headers['content-type']}`);
    }
    console.log('✓ Asset /board/photo_2026-10-21_21-27-46.jpg returns 200 image/jpeg');

    // 4. Missing static asset returns 404 (does NOT falsely fallback to index.html)
    const missingAssetRes = await request('/board/nonexistent-file.jpg');
    if (missingAssetRes.status !== 404) {
      throw new Error(`Missing asset test failed: expected 404, got status=${missingAssetRes.status}`);
    }
    console.log('✓ Missing asset /board/nonexistent-file.jpg returns 404');

    // 5. Nested SPA Route Fallback
    const nestedSpaRes = await request('/chapter/2');
    if (nestedSpaRes.status !== 200 || !nestedSpaRes.body.includes('<!doctype html>')) {
      throw new Error(`Nested SPA route failed: status=${nestedSpaRes.status}`);
    }
    console.log('✓ Nested SPA route /chapter/2 returns 200 fallback to index.html');

    // 6. Path Traversal Guard returns 403
    const traversalRes = await request('/%2e%2e/package.json');
    if (traversalRes.status !== 403) {
      throw new Error(`Path traversal guard failed: expected 403, got status=${traversalRes.status}`);
    }
    console.log('✓ Path traversal guard returns 403 Forbidden');

    console.log('ALL SERVE TESTS PASSED!');
  } finally {
    child.kill('SIGTERM');
  }
}

run().catch((e) => {
  console.error(e);
  child.kill('SIGTERM');
  process.exit(1);
});
