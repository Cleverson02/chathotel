import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PORT = process.env.PORT || 3000;

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css',
  '.js': 'application/javascript',
  '.jsx': 'application/javascript',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
};

const server = http.createServer((req, res) => {
  // Rota raiz
  if (req.url === '/' || req.url === '/Chat Hotel.html') {
    req.url = '/index.html';
  }

  // Caminho do arquivo
  let filePath = path.join(__dirname, req.url);

  // Sanitizar path
  if (!filePath.startsWith(__dirname)) {
    res.writeHead(403, { 'Content-Type': 'text/plain' });
    res.end('Forbidden');
    return;
  }

  // Se for um diretório, servir index.html
  if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
    filePath = path.join(filePath, 'index.html');
  }

  // Adicionar extensão .html se não houver extensão
  if (!path.extname(filePath)) {
    filePath += '.html';
  }

  // Ler arquivo
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('404 - Arquivo não encontrado\n' + req.url);
      return;
    }

    // Detectar mime type
    const ext = path.extname(filePath).toLowerCase();
    const mimeType = MIME_TYPES[ext] || 'application/octet-stream';

    // Adicionar headers de cache
    const isStatic = ['.png', '.jpg', '.jpeg', '.gif', '.svg', '.webp'].includes(ext);

    res.writeHead(200, {
      'Content-Type': mimeType,
      'Cache-Control': isStatic ? 'public, max-age=86400' : 'no-cache',
      'Access-Control-Allow-Origin': '*',
    });
    res.end(data);
  });
});

server.listen(PORT, () => {
  console.log(`
╔════════════════════════════════════════════════════════════╗
║                 Chat Hotel Development Server              ║
╚════════════════════════════════════════════════════════════╝

🎯 Servidor rodando em http://localhost:${PORT}
📱 Versão do projeto: 1.0.0

Componentes carregados:
  ✓ Hero Section
  ✓ Omnichannel
  ✓ Features & Upsell
  ✓ Platform Preview
  ✓ ROI Calculator
  ✓ Launch Offer
  ✓ CTA & Footer
  ✓ Design Tweaks Panel

Tipografia:
  Display: Fraunces, Cormorant Garamond, Instrument Serif
  Body: Inter
  Mono: Chakra Petch, JetBrains Mono

Paletas (5 variações):
  • Midnight Gold (padrão)
  • Obsidian Copper
  • Emerald Sand
  • Bordeaux Cream
  • Electric ELEVARE

Modo escuro: Ativado
Modo light: Disponível via tweaks panel

Pressione Ctrl+C para parar o servidor.
  `);
});
