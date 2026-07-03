import express from 'express';
import nodemailer from 'nodemailer';
import cors from 'cors';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('.'));

// Servir index.html na raiz
app.get('/', (req, res) => {
  res.sendFile(`${__dirname}/index.html`);
});

// Configuração de email via Gmail
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER || 'seu-email@gmail.com',
    pass: process.env.EMAIL_PASS || 'sua-senha-app'
  }
});

// Helper para escapar HTML
function escapeHtml(text) {
  if (!text) return '';
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  return text.replace(/[&<>"']/g, (m) => map[m]);
}

// Endpoint para receber submissões do formulário
app.post('/api/send-proposal', async (req, res) => {
  try {
    const { name, email, phone, hotel, message } = req.body;

    // Validação básica
    if (!name || !email || !hotel) {
      return res.status(400).json({
        success: false,
        error: 'Campos obrigatórios faltando: name, email, hotel'
      });
    }

    // Validar formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        error: 'Email inválido'
      });
    }

    const RECIPIENT_EMAIL = process.env.EMAIL_TO || 'giu.debona@gmail.com';
    const SENDER_EMAIL = process.env.EMAIL_USER || 'seu-email@gmail.com';

    // Template HTML para email do admin
    const adminHtmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <title>Nova Proposta - Chat Hotel</title>
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #0A1726; color: #F4EFE2; padding: 20px; border-radius: 8px 8px 0 0; text-align: center; }
            .content { background: #f5f5f5; padding: 20px; border-radius: 0 0 8px 8px; }
            .field { margin-bottom: 16px; }
            .label { font-weight: 600; color: #0A1726; margin-bottom: 4px; }
            .value { color: #555; padding: 8px; background: white; border-left: 3px solid #D4B36A; padding-left: 12px; }
            .footer { margin-top: 20px; font-size: 12px; color: #999; border-top: 1px solid #ddd; padding-top: 10px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1 style="margin: 0; font-size: 24px;">🎯 Nova Proposta</h1>
              <p style="margin: 8px 0 0; opacity: 0.9;">Chat Hotel - Concierge IA para Hotelaria</p>
            </div>
            <div class="content">
              <div class="field">
                <div class="label">📧 Email</div>
                <div class="value">${escapeHtml(email)}</div>
              </div>
              <div class="field">
                <div class="label">👤 Nome</div>
                <div class="value">${escapeHtml(name)}</div>
              </div>
              ${hotel ? `
              <div class="field">
                <div class="label">🏨 Hotel</div>
                <div class="value">${escapeHtml(hotel)}</div>
              </div>
              ` : ''}
              ${phone ? `
              <div class="field">
                <div class="label">📱 WhatsApp</div>
                <div class="value">${escapeHtml(phone)}</div>
              </div>
              ` : ''}
              <div class="field">
                <div class="label">💬 Mensagem</div>
                <div class="value" style="white-space: pre-wrap; line-height: 1.6;">${escapeHtml(message)}</div>
              </div>
              <div class="footer">
                <p>Recebida em ${new Date().toLocaleString('pt-BR')}</p>
                <p>Responder para: ${escapeHtml(email)}</p>
              </div>
            </div>
          </div>
        </body>
      </html>
    `;

    // Template HTML para confirmação ao cliente
    const clientHtmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #D4B36A; color: #0A1726; padding: 20px; border-radius: 8px; text-align: center; margin-bottom: 20px; }
            .content { line-height: 1.6; color: #555; }
            .footer { margin-top: 20px; padding-top: 20px; border-top: 1px solid #ddd; font-size: 12px; color: #999; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1 style="margin: 0; color: #0A1726;">✅ Recebemos sua mensagem!</h1>
            </div>
            <div class="content">
              <p>Olá <strong>${escapeHtml(name)}</strong>,</p>
              <p>Obrigado por seu interesse no Chat Hotel! 🙏</p>
              <p>Recebemos sua proposta com sucesso e nossa equipe será notificada imediatamente. Você receberá um retorno em breve pelo WhatsApp ou email.</p>
              <p><strong>Detalhes da sua solicitação:</strong></p>
              <ul>
                <li>Email: ${escapeHtml(email)}</li>
                <li>Hotel: ${escapeHtml(hotel)}</li>
                ${phone ? `<li>WhatsApp: ${escapeHtml(phone)}</li>` : ''}
                <li>Data: ${new Date().toLocaleString('pt-BR')}</li>
              </ul>
              <p>Até breve! 🚀</p>
              <p><strong>Time Chat Hotel</strong></p>
            </div>
            <div class="footer">
              <p>© 2026 Chat Hotel - Concierge IA para Hotelaria</p>
            </div>
          </div>
        </body>
      </html>
    `;

    // Enviar email para o administrador
    await transporter.sendMail({
      from: SENDER_EMAIL,
      to: RECIPIENT_EMAIL,
      replyTo: email,
      subject: `Chat Hotel - Proposta de ${escapeHtml(name)}`,
      html: adminHtmlContent,
      text: `Nova Proposta\n\nNome: ${name}\nEmail: ${email}\nHotel: ${hotel}\n${phone ? `WhatsApp: ${phone}\n` : ''}Mensagem: ${message}`
    });

    // Enviar confirmação para o cliente
    await transporter.sendMail({
      from: SENDER_EMAIL,
      to: email,
      subject: 'Recebemos sua mensagem! 🎯 - Chat Hotel',
      html: clientHtmlContent,
      text: `Olá ${name},\n\nObrigado por seu interesse no Chat Hotel!\n\nRecebemos sua proposta com sucesso.`
    });

    res.json({
      success: true,
      message: 'Proposta enviada com sucesso! Você receberá uma confirmação por email.'
    });
  } catch (error) {
    console.error('Erro ao enviar email:', error);
    res.status(500).json({
      success: false,
      error: 'Erro ao processar sua solicitação. Tente novamente mais tarde.',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`
╔════════════════════════════════════════════════════════════╗
║                 Chat Hotel API Server                      ║
╚════════════════════════════════════════════════════════════╝

🎯 Servidor rodando em http://localhost:${PORT}
📧 Email via SendGrid
🔌 CORS habilitado

Aguardando requisições...
  `);
});
