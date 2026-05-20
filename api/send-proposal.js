import nodemailer from 'nodemailer';

const RECIPIENT_EMAIL = 'giu.debona@gmail.com';
const SENDER_EMAIL = process.env.EMAIL_USER || 'noreply@chathotel.elevare.tur.br';

// Gmail SMTP configuration
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, phone, hotel, message, type = 'proposal' } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Missing required fields: name, email, message' });
  }

  try {
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email) || !emailRegex.test(RECIPIENT_EMAIL)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }

    // Prepare email content
    const htmlContent = `
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
            .badge { display: inline-block; background: #D4B36A; color: white; padding: 4px 12px; border-radius: 20px; font-size: 12px; font-weight: 600; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1 style="margin: 0; font-size: 24px;">🎯 Nova ${type === 'proposal' ? 'Proposta' : 'Mensagem'}</h1>
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

              ${phone ? `
              <div class="field">
                <div class="label">📱 Telefone</div>
                <div class="value">${escapeHtml(phone)}</div>
              </div>
              ` : ''}

              ${hotel ? `
              <div class="field">
                <div class="label">🏨 Hotel</div>
                <div class="value">${escapeHtml(hotel)}</div>
              </div>
              ` : ''}

              <div class="field">
                <div class="label">💬 Mensagem</div>
                <div class="value" style="white-space: pre-wrap; line-height: 1.6;">${escapeHtml(message)}</div>
              </div>

              <div class="field">
                <span class="badge">${type === 'proposal' ? '✨ Proposta' : '📬 Contato'}</span>
                <span style="color: #999; font-size: 12px; margin-left: 8px;">Recebida em ${new Date().toLocaleString('pt-BR')}</span>
              </div>

              <div class="footer">
                <p>Esta mensagem foi enviada através do formulário de contato em chathotel.elevare.tur.br</p>
                <p>Responda diretamente para <strong>${escapeHtml(email)}</strong></p>
              </div>
            </div>
          </div>
        </body>
      </html>
    `;

    // Send email
    await transporter.sendMail({
      from: SENDER_EMAIL,
      to: RECIPIENT_EMAIL,
      replyTo: email,
      subject: `Chat Hotel - ${type === 'proposal' ? 'Proposta de' : 'Mensagem de'} ${name}`,
      html: htmlContent,
      text: `
Novo ${type === 'proposal' ? 'Proposta' : 'Contato'}

Nome: ${name}
Email: ${email}
${phone ? `Telefone: ${phone}` : ''}
${hotel ? `Hotel: ${hotel}` : ''}

Mensagem:
${message}
      `,
    });

    // Send confirmation to user
    await transporter.sendMail({
      from: SENDER_EMAIL,
      to: email,
      subject: 'Recebemos sua mensagem! 🎯 - Chat Hotel',
      html: `
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
              <h1 style="margin: 0; color: #0A1726;">✅ Mensagem Recebida!</h1>
            </div>

            <div class="content">
              <p>Olá <strong>${escapeHtml(name)}</strong>,</p>

              <p>Obrigado por entrar em contato conosco! 🙏</p>

              <p>Recebemos sua mensagem com sucesso e nossa equipe será notificada imediatamente. Você receberá um retorno em breve.</p>

              <p><strong>Detalhes da sua mensagem:</strong></p>
              <ul>
                <li>Email: ${escapeHtml(email)}</li>
                <li>Tipo: ${type === 'proposal' ? 'Proposta' : 'Contato Geral'}</li>
                <li>Data: ${new Date().toLocaleString('pt-BR')}</li>
              </ul>

              <p>Se tiver dúvidas urgentes, você também pode nos contatar diretamente através do WhatsApp.</p>

              <p>Abraços,<br><strong>Time Chat Hotel</strong> 🚀</p>
            </div>

            <div class="footer">
              <p>© 2026 Chat Hotel - Concierge IA para Hotelaria | www.chathotel.elevare.tur.br</p>
              <p>Esta é uma resposta automática. Por favor, não responda este email.</p>
            </div>
          </div>
        </body>
      </html>
      `,
    });

    return res.status(200).json({
      success: true,
      message: 'Proposta enviada com sucesso! Você receberá uma confirmação por email.',
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Email send error:', error);

    return res.status(500).json({
      success: false,
      error: 'Erro ao enviar mensagem. Tente novamente mais tarde.',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
}

// Helper function to escape HTML special characters
function escapeHtml(text) {
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  };
  return text.replace(/[&<>"']/g, (m) => map[m]);
}
