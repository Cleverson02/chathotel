# 🔧 Chat Hotel — Formulário Fixed

## ✅ Problema Resolvido

**Erro anterior:** "unexpected token doctype is not valid json"
- **Causa:** Endpoint `/api/send-proposal` não existia
- **Solução:** Criado servidor Express com Nodemailer

---

## 📋 O Que Foi Implementado

### 1. Servidor Backend (`server.js`)
- Express server escutando na porta 3000
- Endpoint POST `/api/send-proposal`
- Envia 2 emails:
  - **Admin** (giu.debona@gmail.com): Dados do lead
  - **Cliente**: Confirmação de recebimento

### 2. Atualização do Formulário (`offer-cta-footer.jsx`)
- Detecta automaticamente environment (local vs produção)
- USA URL relativa em produção
- Melhor tratamento de erros

### 3. Configuração (`.env`)
```
EMAIL_USER=n8nchiara@gmail.com
EMAIL_PASS=ma302520
PORT=3000
```

---

## 🚀 DEPLOY EM PRODUÇÃO

### Opção A: Hostinger (VPS)
```bash
# 1. SSH no servidor
ssh user@chathotel.elevare.tur.br

# 2. Clone o projeto
cd /var/www/chathotel
git pull origin master

# 3. Instale dependências
npm install

# 4. Use PM2 para manter servidor rodando
npm install -g pm2
pm2 start server.js --name "chathotel-api"
pm2 startup
pm2 save
```

### Opção B: Vercel (Serverless)
```bash
# 1. Instale Vercel CLI
npm install -g vercel

# 2. Deploy
vercel --prod

# 3. Configure variáveis de ambiente em Settings → Environment Variables
EMAIL_USER=n8nchiara@gmail.com
EMAIL_PASS=ma302520
```

### Opção C: Vercel + API Route (mais simples)
Crie `api/send-proposal.js`:
```javascript
import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Apenas POST permitido' });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    const { name, email, phone, hotel, message } = req.body;

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: 'giu.debona@gmail.com',
      subject: `Novo Lead - Chat Hotel: ${hotel}`,
      html: `<h2>Nova Submissão</h2>
        <p><strong>Nome:</strong> ${name}</p>
        <p><strong>Hotel:</strong> ${hotel}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>WhatsApp:</strong> ${phone}</p>`
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Recebemos sua solicitação - Chat Hotel 🎉',
      html: `<h2>Obrigado!</h2><p>Entraremos em contato em até 1 hora.</p>`
    });

    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao enviar' });
  }
}
```

---

## 📊 Próximos Passos

- [ ] Testar em produção
- [ ] Confirmar recebimento de emails em giu.debona@gmail.com
- [ ] Migrar para Supabase quando tiver credenciais (cria tabela `chathotel_submissions`)
- [ ] Configurar alias de email profissional

---

## 🔗 Referências

- **Email usado:** n8nchiara@gmail.com (senha armazenada em .env)
- **Destinatário:** giu.debona@gmail.com
- **Domínio:** www.chathotel.elevare.tur.br
- **Porta:** 3000 (ou Vercel serverless)
