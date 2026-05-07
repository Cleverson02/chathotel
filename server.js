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

// Configuração de email
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER || 'seu-email@gmail.com',
    pass: process.env.EMAIL_PASS || 'sua-senha-app'
  }
});

// Endpoint para receber submissões do formulário
app.post('/api/send-proposal', async (req, res) => {
  try {
    const { name, email, phone, hotel, message } = req.body;

    // Validação básica
    if (!name || !email || !phone || !hotel) {
      return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
    }

    // Enviar email para o administrador
    const adminMailOptions = {
      from: process.env.EMAIL_USER || 'seu-email@gmail.com',
      to: 'giu.debona@gmail.com',
      subject: `Novo Lead - Chat Hotel: ${hotel}`,
      html: `
        <h2>Nova Submissão do Formulário</h2>
        <p><strong>Nome:</strong> ${name}</p>
        <p><strong>Hotel:</strong> ${hotel}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>WhatsApp:</strong> ${phone}</p>
        <p><strong>Mensagem:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
        <hr>
        <p style="font-size: 12px; color: #999;">Enviado em ${new Date().toLocaleString('pt-BR')}</p>
      `
    };

    // Enviar confirmação para o cliente
    const clientMailOptions = {
      from: process.env.EMAIL_USER || 'seu-email@gmail.com',
      to: email,
      subject: 'Recebemos sua solicitação - Chat Hotel 🎉',
      html: `
        <h2>Obrigado pelo seu interesse!</h2>
        <p>Olá ${name},</p>
        <p>Recebemos sua solicitação de demonstração do Chat Hotel para <strong>${hotel}</strong>.</p>
        <p>Nosso time entrará em contato em até 1 hora útil pelo WhatsApp <strong>${phone}</strong> ou por email para agendar sua demonstração.</p>
        <hr>
        <p style="font-size: 12px; color: #999;">Se tiver dúvidas, entre em contato: chathotel@elevare.tur.br</p>
      `
    };

    // Enviar ambos os emails
    await transporter.sendMail(adminMailOptions);
    await transporter.sendMail(clientMailOptions);

    res.json({ success: true, message: 'Formulário recebido com sucesso!' });
  } catch (error) {
    console.error('Erro ao enviar email:', error);
    res.status(500).json({ error: 'Erro ao processar sua solicitação' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Servidor rodando em http://localhost:${PORT}`);
  console.log(`📧 Emails serão enviados para: giu.debona@gmail.com`);
});
