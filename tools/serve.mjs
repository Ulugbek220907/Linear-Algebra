import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.resolve(__dirname, '../dist');
const port = parseInt(process.env.PORT || '3000', 10);
const host = '0.0.0.0';

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.mjs': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.txt': 'text/plain; charset=utf-8',
};

const server = http.createServer((req, res) => {
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    res.writeHead(405, { 'Content-Type': 'text/plain' });
    res.end('Method Not Allowed');
    return;
  }

  const parsedUrl = new URL(req.url || '/', `http://${req.headers.host || 'localhost'}`);
  let pathname = decodeURIComponent(parsedUrl.pathname);

  if (pathname === '/' || pathname === '') {
    pathname = '/index.html';
  }

  const requestedPath = path.normalize(path.join(distDir, pathname));

  // Guard against path traversal
  if (!requestedPath.startsWith(distDir)) {
    res.writeHead(403, { 'Content-Type': 'text/plain' });
    res.end('Forbidden');
    return;
  }

  fs.stat(requestedPath, (err, stats) => {
    let filePath = requestedPath;
    let isFallback = false;

    if (err || !stats.isFile()) {
      // Fallback to index.html for SPA client-side routing
      filePath = path.join(distDir, 'index.html');
      isFallback = true;
    }

    fs.stat(filePath, (fallbackErr, fileStats) => {
      if (fallbackErr || !fileStats.isFile()) {
        res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end('404 Not Found: dist/index.html is missing. Run `npm run build` first.');
        return;
      }

      const ext = path.extname(filePath).toLowerCase();
      const contentType = MIME_TYPES[ext] || 'application/octet-stream';
      const cacheControl = ext === '.html' || isFallback
        ? 'no-cache'
        : 'public, max-age=31536000, immutable';

      res.writeHead(200, {
        'Content-Type': contentType,
        'Content-Length': fileStats.size,
        'Cache-Control': cacheControl,
        'X-Content-Type-Options': 'nosniff',
      });

      if (req.method === 'HEAD') {
        res.end();
        return;
      }

      fs.createReadStream(filePath).pipe(res);
    });
  });
});

server.listen(port, host, () => {
  console.log(`[Linear Algebra Companion] Production server listening on http://${host}:${port}`);
});

process.on('SIGINT', () => {
  server.close(() => process.exit(0));
});
process.on('SIGTERM', () => {
  server.close(() => process.exit(0));
});
