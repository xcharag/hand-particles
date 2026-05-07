#!/usr/bin/env node
// Servidor local para hand-particles — PromoUPSA 2026

const http = require('http');
const fs   = require('fs');
const path = require('path');

const PORT = 8080;
const DIR  = __dirname;

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js':   'application/javascript',
  '.css':  'text/css',
  '.wasm': 'application/wasm',
  '.bin':  'application/octet-stream',
  '.png':  'image/png',
  '.jpg':  'image/jpeg',
  '.svg':  'image/svg+xml',
  '.ico':  'image/x-icon',
};

const server = http.createServer((req, res) => {
  const filePath = path.join(DIR, req.url === '/' ? 'index.html' : req.url);
  const ext      = path.extname(filePath).toLowerCase();

  fs.readFile(filePath, (err, data) => {
    if (err) { res.writeHead(404); res.end('Not found'); return; }
    res.writeHead(200, {
      'Content-Type':                MIME[ext] || 'application/octet-stream',
      'Access-Control-Allow-Origin': '*',
      'Cache-Control':               'no-cache',
    });
    res.end(data);
    console.log(`  ${req.method} ${req.url}`);
  });
});

server.listen(PORT, () => {
  const url = `http://localhost:${PORT}`;
  console.log('\n  ╔══════════════════════════════╗');
  console.log('  ║   hand-particles             ║');
  console.log('  ║   PromoUPSA 2026             ║');
  console.log('  ╚══════════════════════════════╝');
  console.log(`\n  → ${url}`);
  console.log('  Ctrl+C para detener\n');
  require('child_process').exec(`start ${url}`);
});
