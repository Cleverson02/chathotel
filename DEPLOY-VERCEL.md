# 🚀 Guia de Deploy — Chat Hotel na Vercel + Cloudflare DNS

Este guia passo a passo explica como fazer deploy do Chat Hotel na Vercel com subdomain `chathotel.elevare.tur.br`, integrando com o Cloudflare que já gerencia `elevare.tur.br`.

---

## 📋 Pré-requisitos

- ✅ Conta na Vercel (gratuita em [vercel.com](https://vercel.com))
- ✅ Conta SendGrid (para enviar emails)
- ✅ Acesso ao Cloudflare (já gerencia `elevare.tur.br`)
- ✅ Repositório GitHub com o projeto Chat Hotel
- ✅ Variáveis de ambiente configuradas

---

## 🔑 Passo 1: Obter Chave de API do SendGrid

O formulário de contato usa SendGrid para enviar emails.

### 1.1 Criar Conta SendGrid (se não tiver)

1. Acesse [sendgrid.com](https://sendgrid.com)
2. Clique em **"Try for Free"** ou faça login
3. Complete o cadastro

### 1.2 Gerar API Key

1. No painel SendGrid, vá para **Settings → API Keys**
2. Clique em **"Create API Key"**
3. Nome: `Chat Hotel Vercel`
4. Selecione **"Full Access"** ou escopo limitado
5. Copie a chave (salve em lugar seguro!)

**Exemplo:**
```
SG.ABC123XYZ...
```

---

## 📁 Passo 2: Preparar Repositório Git

O projeto precisa estar em um repositório GitHub para deploy na Vercel.

### 2.1 Inicializar Git (se não estiver)

```bash
cd C:\Users\Cleverson\projetos\chathotel

# Inicializar repositório
git init

# Adicionar todos os arquivos
git add .

# Criar primeiro commit
git commit -m "Initial commit: Chat Hotel landing page with Vercel serverless functions"

# Criar repositório no GitHub em github.com/novo-repo
# Conectar ao remote
git remote add origin https://github.com/SEU_USER/chathotel.git

# Fazer push
git branch -M main
git push -u origin main
```

### 2.2 Estrutura de Arquivos (verificar)

```
chathotel/
├── Chat Hotel.html
├── styles.css
├── *.jsx (componentes)
├── assets/
│   ├── hotel-background.png  ← NOVO
│   └── logo-*.png
├── api/
│   └── send-proposal.js      ← NOVO (serverless function)
├── vercel.json               ← NOVO
├── package.json
└── README.md
```

---

## 🎯 Passo 3: Configurar Variáveis de Ambiente na Vercel

Você precisa adicionar a chave do SendGrid como variável de ambiente.

### 3.1 Login na Vercel

1. Acesse [vercel.com](https://vercel.com)
2. Clique em **"Sign In"** ou crie conta
3. Conecte com GitHub

### 3.2 Importar Projeto

1. Clique em **"Add New..."** → **"Project"**
2. Selecione repositório `chathotel` do GitHub
3. Clique em **"Import"**

### 3.3 Configurar Variáveis de Ambiente

Antes de fazer deploy:

1. Na página de import, clique em **"Environment Variables"**
2. Adicione:
   - **Name:** `SENDGRID_API_KEY`
   - **Value:** (Cole a chave que você copiou do SendGrid)
   - **Scope:** Production, Preview, Development

3. (Opcional) Adicione também:
   - **Name:** `SENDER_EMAIL`
   - **Value:** `noreply@chathotel.elevare.tur.br`

4. Clique em **"Deploy"**

### 3.4 Aguardar Deploy

A Vercel fará:
1. Build do projeto
2. Deploy de arquivos estáticos
3. Deploy de funções serverless (`api/send-proposal.js`)

Quando terminar, você receberá um **URL de deploy**.

**Exemplo:** `https://chathotel-xyz.vercel.app`

---

## 🔗 Passo 4: Configurar DNS no Cloudflare

Seu domínio `elevare.tur.br` é gerenciado pelo Cloudflare. Precisamos apontar `chathotel.elevare.tur.br` para a Vercel.

### 4.1 Acessar Cloudflare

1. Vá para [cloudflare.com](https://cloudflare.com)
2. Faça login
3. Selecione domínio `elevare.tur.br`

### 4.2 Adicionar DNS Record (CNAME)

No painel Cloudflare:

1. Vá para **DNS** (no menu lateral)
2. Clique em **"+ Add record"**
3. Configure:
   - **Type:** CNAME
   - **Name:** `chathotel` (será `chathotel.elevare.tur.br`)
   - **Target:** `cname.vercel.com` (redireciona para Vercel)
   - **TTL:** Auto
   - **Proxy status:** DNS only (não fazer proxy, deixar gray cloud)
   - **Comment:** Chat Hotel Vercel Deployment

4. Clique em **"Save"**

**Resultado esperado:**

```
Name: chathotel.elevare.tur.br
Type: CNAME
Target: cname.vercel.com
Status: DNS only
```

### 4.3 Conectar Domínio na Vercel

Agora conecte o domínio na Vercel:

1. Na Vercel, vá para **Settings** → **Domains**
2. Clique em **"Add Domain"**
3. Digite: `chathotel.elevare.tur.br`
4. Selecione **"Use nameserver from registrar"** ou **"Use Cloudflare"** (já está lá)
5. Clique em **"Add"**

Vercel verificará o CNAME. Quando verificado (geralmente em 5-10 minutos), você verá:

```
✅ chathotel.elevare.tur.br
```

---

## 📧 Passo 5: Testar Envio de Email

Seu formulário agora está pronto para enviar emails!

### 5.1 Teste Manual

1. Acesse `https://chathotel.elevare.tur.br`
2. Role até "FALE COM A GENTE"
3. Preencha o formulário:
   - Nome: `Seu Nome`
   - Email: `seu@email.com` (use seu email real)
   - Hotel: `Seu Hotel`
   - WhatsApp: `+55 11 99999-0000`
4. Clique em **"Agendar demonstração"**
5. Aguarde a mensagem de sucesso

### 5.2 Verificar Emails

✅ **Você deve receber dois emails:**

1. **Email para seu endereço (confirmação)**
   - De: `noreply@chathotel.elevare.tur.br`
   - Assunto: Recebemos sua mensagem!
   - Confirma recebimento

2. **Email para Cleverson (proposta)**
   - Para: `cleverson.s.silva@gmail.com`
   - Assunto: Chat Hotel - Proposta de [Seu Nome]
   - Contém todos os detalhes do formulário

Se não receber, verifique:
- Spam/Lixo do seu email
- Variável de ambiente `SENDGRID_API_KEY` está correta
- Logs na Vercel (Settings → Functions)

---

## 🔒 Segurança & Melhores Práticas

### Variáveis de Ambiente

**NUNCA** coloque a chave do SendGrid no código. Sempre use variáveis de ambiente:

```javascript
// ❌ ERRADO
const apiKey = 'SG.ABC123...';

// ✅ CORRETO
const apiKey = process.env.SENDGRID_API_KEY;
```

### Rate Limiting

Para evitar spam, você pode adicionar rate limiting:

```javascript
// Adicionar em api/send-proposal.js
const MAX_REQUESTS_PER_HOUR = 10;
// Implementar com Redis ou similar
```

### Validação

O endpoint já valida:
- ✅ Email format
- ✅ Required fields
- ✅ HTML escaping (previne XSS)
- ✅ CORS habilitado

---

## 📊 Monitoramento

### Logs da Vercel

Para ver logs de função serverless:

1. Na Vercel, vá para **Settings** → **Functions**
2. Clique em **"Logs"**
3. Selecione função `send-proposal`

### Analytics

Para rastrear acessos:

1. Vercel mostra **Visits**, **Bandwidth** em tempo real
2. Integre com Google Analytics adicionando em `Chat Hotel.html`:

```html
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_ID');
</script>
```

---

## 🎯 Checklist de Deploy

Antes de considerar pronto:

- [ ] Repositório GitHub criado e sincronizado
- [ ] Conta Vercel criada e projeto importado
- [ ] Variáveis de ambiente configuradas (SENDGRID_API_KEY)
- [ ] Deploy na Vercel completado com sucesso
- [ ] DNS CNAME adicionado no Cloudflare
- [ ] Domínio conectado na Vercel (✅ verificado)
- [ ] Teste de formulário funcionando
- [ ] Email de confirmação recebido
- [ ] Email de proposta chegando em cleverson.s.silva@gmail.com
- [ ] Imagem de hotel aparecendo com transparência no hero
- [ ] Animações e efeitos de luz funcionando
- [ ] Painel de tweaks (customizador de tema) funcional
- [ ] Responsividade testada (mobile, tablet, desktop)

---

## 🚨 Troubleshooting

### Erro: "Function timeout"

A função está demorando mais de 30 segundos. Solução:
```javascript
// Em api/send-proposal.js, aumentar timeout em vercel.json
"maxDuration": 60
```

### Erro: "SENDGRID_API_KEY is undefined"

A variável de ambiente não foi configurada. Solução:
1. Na Vercel, Settings → Environment Variables
2. Verificar se `SENDGRID_API_KEY` está presente
3. Re-deploy do projeto

### Domínio mostra "Not Found"

O DNS ainda está propagando. Solução:
1. Aguardar 15-30 minutos
2. Limpar cache do navegador (Ctrl+Shift+Delete)
3. Testar em outro navegador incógnito
4. Verificar DNS: `nslookup chathotel.elevare.tur.br`

### Emails não chegando

Solução:
1. Verificar pasta de SPAM
2. Confirmar email do remetente no SendGrid
3. Testar com email diferente (não @gmail.com se não permitido)
4. Verificar logs da função na Vercel

---

## 📞 Suporte

### Recursos Úteis

- [Documentação Vercel](https://vercel.com/docs)
- [Documentação SendGrid](https://docs.sendgrid.com/)
- [Documentação Cloudflare DNS](https://developers.cloudflare.com/dns/)
- [Nodemailer (em api/send-proposal.js)](https://nodemailer.com/)

### Contato

Para dúvidas:
- Email: cleverson.s.silva@gmail.com
- GitHub Issues: (do repositório do projeto)

---

## 🎉 Parabéns!

Seu Chat Hotel está ao vivo em `chathotel.elevare.tur.br`! 🚀

**O que você tem agora:**

✅ Website profissional com 7 seções  
✅ Painel de customização em tempo real (5 paletas + 3 tipografias)  
✅ Imagem de hotel como background (com transparência)  
✅ Animações suaves e efeitos de luz  
✅ Formulário funcional com envio de emails  
✅ Confirmação por email automatizada  
✅ Deploy em produção na Vercel  
✅ Domínio customizado (chathotel.elevare.tur.br)  
✅ Responsividade total (mobile, tablet, desktop)  

**Próximos passos:**

1. Integrar com seu backend real (reservas, CRM)
2. Adicionar autenticação para admin panel
3. Configurar WhatsApp Business API
4. Adicionar Google Analytics
5. Configurar SSL/HTTPS (Vercel faz automaticamente)

---

**Chat Hotel v1.0 — Deploy em Produção** ✨  
Última atualização: Maio de 2026
