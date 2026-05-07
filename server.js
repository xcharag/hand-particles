#!/usr/bin/env node
// Servidor local para hand-particles — PromoUPSA 2026

const http = require('http');
const fs   = require('fs');
const path = require('path');

const PORT = 8080;
const DIR  = __dirname;

const MIME = {
  '.html': 'text/html',
  '.js':   'application/javascript',
  '.css':  'text/css',
  '.png':  'image/png',
  '.jpg':  'image/jpeg',
  '.svg':  'image/svg+xml',
  '.ico':  'image/x-icon',
};

const server = http.createServer((req, res) => {
  let filePath = path.join(DIR, req.url === '/' ? 'index.html' : req.url);
  const ext    = path.extname(filePath).toLowerCase();

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404);
      res.end('Not found');
      return;
    }
    res.writeHead(200, {
      'Content-Type':                MIME[ext] || 'application/octet-stream',
      'Cross-Origin-Opener-Policy':  'same-origin',
      'Cross-Origin-Embedder-Policy':'require-corp',
      'Access-Control-Allow-Origin': '*',
    });
    res.end(data);
    console.log(`  ${req.socket.remoteAddress}  ${req.method} ${req.url}`);
  });
});

const url = `http://localhost:${PORT}`;

server.listen(PORT, () => {
  console.log();
  console.log('  ╔══════════════════════════════╗');
  console.log('  ║   hand-particles             ║');
  console.log('  ║   PromoUPSA 2026             ║');
  console.log('  ╚══════════════════════════════╝');
  console.log(`\n  Servidor → ${url}`);
  console.log('  Detener  → Ctrl+C\n');

  // Open browser
  const { exec } = require('child_process');
  exec(`start ${url}`);
});
