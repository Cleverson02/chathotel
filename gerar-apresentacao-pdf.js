#!/usr/bin/env node

/**
 * Gerador de Apresentação PDF - ChatHotel
 *
 * Uso:
 *   node gerar-apresentacao-pdf.js
 *
 * Gera PDF a partir do HTML e salva em ./apresentacao-chathotel.pdf
 */

import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function gerarPDF() {
  console.log('🎨 Gerando apresentação PDF do ChatHotel...');

  try {
    const browser = await puppeteer.launch({
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const page = await browser.newPage();

    // Usar o arquivo HTML local
    const htmlPath = path.join(__dirname, 'apresentacao-chathotel.html');
    const htmlContent = fs.readFileSync(htmlPath, 'utf-8');

    // Carregar HTML
    await page.setContent(htmlContent, { waitUntil: 'networkidle2' });

    // Configurar PDF
    const pdfPath = path.join(__dirname, 'apresentacao-chathotel.pdf');

    await page.pdf({
      path: pdfPath,
      format: 'A4',
      margin: {
        top: '20mm',
        right: '15mm',
        bottom: '20mm',
        left: '15mm'
      },
      displayHeaderFooter: true,
      headerTemplate: '<div style="width: 100%; font-size: 10px; color: #999; text-align: right; padding-right: 20px;">ChatHotel — Agente de IA para Hotelaria</div>',
      footerTemplate: '<div style="width: 100%; font-size: 10px; color: #999; padding: 0 20px; display: flex; justify-content: space-between;"><span>Maio 2026</span><span><span class="pageNumber"></span> / <span class="totalPages"></span></span></div>',
      scale: 1,
      printBackground: true,
      preferCSSPageSize: true
    });

    await browser.close();

    const stats = fs.statSync(pdfPath);
    const sizeInMB = (stats.size / (1024 * 1024)).toFixed(2);

    console.log(`✅ PDF gerado com sucesso!`);
    console.log(`📄 Arquivo: ${pdfPath}`);
    console.log(`📊 Tamanho: ${sizeInMB} MB`);
    console.log(`📱 Pronto para visualizar offline no celular!\n`);

    return true;
  } catch (error) {
    console.error('❌ Erro ao gerar PDF:', error.message);
    process.exit(1);
  }
}

gerarPDF();
