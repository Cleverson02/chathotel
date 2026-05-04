# 🚀 Guia de Deploy — Chat Hotel na Hostinger + Node.js

Este guia passo-a-passo explica como fazer deploy do Chat Hotel na Hostinger Business Web Hosting com Node.js Manager, para o domínio `chathotel.elevare.tur.br`.

---

## 📋 Pré-requisitos

- ✅ Conta Hostinger com Business Web Hosting (ou superior)
- ✅ Node.js Manager ativado no hPanel
- ✅ Acesso ao hPanel (painel de controle)
- ✅ Cloudflare gerenciando `elevare.tur.br`
- ✅ SendGrid (opcional, para envio de emails funcionar)

---

## 🔑 Passo 1: Preparar os Arquivos Localmente

Todos os arquivos já estão prontos! Verifique:

```
chathotel/
├── Chat Hotel.html          ✅ LP principal
├── styles.css              ✅ Estilos
├── server.js               ✅ Servidor Node.js
├── api/
│   └── send-proposal.js    ✅ Função serverless de email
├── assets/                 ✅ Imagens/logos
├── imagens/                ✅ Imagens adicionais
├── package.json            ✅ Com nodemailer
├── .env.example            ✅ Variáveis de ambiente
└── vercel.json             (Não precisa para Hostinger)
```

---

## 📁 Passo 2: Fazer Upload na Hostinger

### 2.1 — Acessar hPanel

1. Vá para **hpanel.hostinger.com**
2. Login com suas credenciais
3. Selecione seu domínio `elevare.tur.br`

### 2.2 — Fazer Upload dos Arquivos

**Opção A — File Manager (mais fácil)**

1. No hPanel, clique em **"File Manager"**
2. Navegue até **`public_html/`**
3. Clique em **"+ Create New Folder"** e crie pasta `chathotel`
4. Entre na pasta `chathotel`
5. Clique em **"Upload"** e selecione:
   - Todos os arquivos `.html`, `.css`, `.js`, `.jsx`
   - Pasta `assets/`
   - Pasta `imagens/`
   - Pasta `api/` (com `send-proposal.js`)
   - Arquivo `package.json`
   - Arquivo `server.js`

**Opção B — FTP/SFTP (para arquivos grandes)**

1. No hPanel, procure **"FTP Accounts"** ou **"SFTP"**
2. Use seu cliente FTP favorito (FileZilla, WinSCP, etc)
3. Conecte e faça upload para `/home/seuuser/chathotel/`

### 2.3 — Estrutura esperada na Hostinger

```
/home/seu-username/chathotel/
├── Chat Hotel.html
├── styles.css
├── server.js
├── package.json
├── api/
│   └── send-proposal.js
├── assets/
│   ├── logo-chathotel.png
│   └── ...
└── imagens/
    └── hotel luxo ia.png
```

---

## ⚙️ Passo 3: Criar Node.js App no hPanel

### 3.1 — Acessar Node.js Manager

1. No hPanel, procure por **"Node.js Apps"** (menu lateral ou seção "Applications")
2. Clique em **"Create Application"** ou **"+ New App"**

### 3.2 — Configurar a Aplicação

Preencha os campos:

| Campo | Valor |
|-------|-------|
| **App Name** | `ChatHotel` |
| **Node.js Version** | `18.x` ou `20.x` |
| **Application Path** | `/home/seu-username/chathotel/` |
| **Entry Point** | `server.js` |
| **Port** | Deixar Hostinger atribuir (default: 3000) |

Clique em **"Create Application"**

### 3.3 — Aguardar Deploy

A Hostinger fará:
1. Install de dependências (`npm install`)
2. Start da aplicação
3. Direcionamento do subdomínio para a app

Você verá status **"Running"** quando pronto.

---

## 🔐 Passo 4: Configurar Variáveis de Ambiente

### 4.1 — Acessar Variáveis

Na página do Node.js App que criou:
1. Procure seção **"Environment Variables"** ou **"Config"**
2. Clique em **"Edit Environment Variables"**

### 4.2 — Adicionar Variáveis

Adicione as seguintes variáveis:

#### Obrigatória:
```
SENDER_EMAIL = noreply@chathotel.elevare.tur.br
```

#### Opcional (para emails funcionarem):
```
SENDGRID_API_KEY = SG.sua_chave_aqui
```

#### (Se tiver):
```
DESTINATION_EMAIL = cleverson.s.silva@gmail.com
```

Clique em **"Save"** ou **"Update"**

A aplicação fará redeploy automático.

---

## 🔗 Passo 5: Configurar DNS no Cloudflare

### 5.1 — Obter IP do Servidor Hostinger

1. No hPanel, procure **"Server Information"** ou **"Nameservers"**
2. Copie o **IP principal** (exemplo: `123.45.67.89`)

### 5.2 — Adicionar Record no Cloudflare

1. Vá para **cloudflare.com** → selecione `elevare.tur.br`
2. Clique em **"DNS"** (menu lateral)
3. Se houver um CNAME antigo para Vercel, clique em **"Edit"** e remova
4. Clique em **"+ Add record"**:
   ```
   Type:        A
   Name:        chathotel
   Content:     123.45.67.89 (IP do seu servidor Hostinger)
   TTL:         Auto
   Proxy:       DNS only (nuvem cinza ☁️, NÃO laranja)
   ```
5. Clique **"Save"**

**Resultado esperado:**
```
Name: chathotel.elevare.tur.br
Type: A
Content: 123.45.67.89
```

---

## ✅ Passo 6: Teste de Acesso

### 6.1 — Aguardar Propagação

DNS leva 5-15 minutos para propagar. Aguarde um pouco.

### 6.2 — Testar No Navegador

1. Abra `https://chathotel.elevare.tur.br`
2. Você deve ver a LP do Chat Hotel carregando
3. Verifique se:
   - ✅ Layout aparece corretamente
   - ✅ Logo e imagens carregam
   - ✅ Responsividade funciona (mobile/tablet/desktop)
   - ✅ Animações e efeitos funcionam

### 6.3 — Testar Formulário (opcional)

Se tiver SendGrid configurado:

1. Role até seção **"FALE COM A GENTE"**
2. Preencha:
   - Nome: `Seu Nome`
   - Email: `seu@email.com`
   - Hotel: `Seu Hotel`
   - WhatsApp: `+55 11 99999-0000`
3. Clique **"Agendar demonstração"**
4. Você deve receber email de confirmação

---

## 🔧 Solução de Problemas

### Erro: "Application not running" ou erro 502

**Solução:**
1. No hPanel, clique **"Restart Application"**
2. Verifique se `server.js` e `package.json` estão no caminho correto
3. Verifique logs (geralmente há botão **"Logs"** ou **"View Logs"**)

### Erro: "Cannot find module 'nodemailer'"

**Solução:**
1. Verifique se `package.json` contém `"nodemailer": "^6.9.0"`
2. No hPanel, clique **"Reinstall Dependencies"** ou **"Redeploy"**

### Domínio mostra "Not Found" ou erro 404

**Solução:**
1. Aguardar 15-30 minutos para propagação DNS
2. Limpar cache do navegador (Ctrl+Shift+Delete)
3. Verificar DNS propagou: `nslookup chathotel.elevare.tur.br`
4. No Cloudflare, confirmar que A record aponta para IP correto

### Emails não estão enviando

**Solução:**
1. Verificar se `SENDGRID_API_KEY` está correto em Environment Variables
2. Verifique pasta SPAM/Lixo do seu email
3. Confirmar que `SENDER_EMAIL` está configurado
4. Ver logs da aplicação (hPanel → Node.js App → Logs)

---

## 📊 Monitoramento

### Logs em Tempo Real

1. No hPanel, vá para Node.js App
2. Clique em **"Logs"** ou **"View Logs"**
3. Você verá saída do `server.js` em tempo real

### Métricas

A Hostinger pode mostrar:
- CPU usage
- Memory usage
- Requests por segundo
- Erros

---

## 🚀 Próximos Passos

### Para Emails Funcionarem Completos

1. Crie conta em **sendgrid.com** (gratuito)
2. Gere API Key em: Settings → API Keys
3. Copie a chave (formato: `SG.ABC123...`)
4. No hPanel, Environment Variables → adicione `SENDGRID_API_KEY`
5. Salve e aguarde redeploy

### Para Melhorias Futuras

- Integrar com CRM (HubSpot, Pipedrive)
- Adicionar Google Analytics
- Adicionar WhatsApp Business API
- Customizar emails com templates HTML

---

## 📞 Suporte

Se tiver problemas:

1. **Verificar Logs:** hPanel → Node.js Apps → Logs
2. **Consultar Docs:** 
   - Hostinger Help: support.hostinger.com
   - Nodemailer: nodemailer.com
   - SendGrid: sendgrid.com/docs

---

## 🎉 Conclusão

Parabéns! Seu Chat Hotel está agora ao vivo em:

**`https://chathotel.elevare.tur.br`** 🚀

**O que você tem:**
- ✅ LP profissional no seu servidor Hostinger
- ✅ Painel de customização em tempo real
- ✅ Formulário funcional com envio de emails (se SendGrid configurado)
- ✅ Deploy automático ao fazer push no GitHub (se configurar webhook)
- ✅ Domínio customizado próprio
- ✅ HTTPS/SSL automático

**Última atualização:** Maio de 2026
