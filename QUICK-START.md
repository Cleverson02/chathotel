# ⚡ QUICK START — Chat Hotel v1.0

**5 minutos para rodar localmente. 30 minutos para deploy.**

---

## 🚀 Passo 1: Rodar Localmente (5 min)

```bash
# 1. Abra terminal/PowerShell
cd C:\Users\Cleverson\projetos\chathotel

# 2. Inicie servidor
npm run dev

# 3. Abra navegador
http://localhost:3000
```

✅ **Pronto!** Você vê:
- Homepage com imagem hotel ao fundo
- Conversa animada no hero
- Painel de tweaks no canto inferior direito
- Formulário na seção "FALE COM A GENTE"

---

## 🎨 Passo 2: Customizar Design (1 min)

**Canto inferior direito**, clique em **"Tweaks · Chat Hotel"**:

```
Paleta:      Escolha entre 5 cores ↓
  ☉ Midnight Gold    (ouro + azul — padrão)
  ○ Obsidian Copper  (cobre + preto)
  ○ Emerald Sand     (areia + verde)
  ○ Bordeaux Cream   (crème + vinho)
  ○ Electric ELEVARE (neon + preto)

Tipografia:  3 combinações ↓
  ⚪ Editorial        (Fraunces + Inter)
  ○ Tech Luxury      (Cormorant + Inter)
  ○ Modern Tech      (Instrument + Inter)

Modo:        ☑ Modo escuro / ☐ Modo claro
```

As alterações salvam automaticamente!

---

## 📧 Passo 3: Testar Formulário (2 min)

**Localmente (sem email real):**

1. Role até "FALE COM A GENTE"
2. Preencha:
   - Nome: `Seu Nome`
   - Hotel: `Hotel Teste`
   - Email: `seu@email.com`
   - WhatsApp: `+55 11 99999-0000`
3. Clique "Agendar demonstração"
4. Veja confirmação: ✅ "Recebemos!"

**Nota:** Email real só funciona com SendGrid em produção.

---

## 🌐 Passo 4: Deploy (30 min)

### 4.1 Conta Vercel

1. Vá para [vercel.com](https://vercel.com)
2. Clique "Sign Up" → Conectar com GitHub
3. Crie repositório `chathotel` no GitHub

### 4.2 Obter Chave SendGrid

1. Vá para [sendgrid.com](https://sendgrid.com)
2. Crie conta (free)
3. Vá em **Settings → API Keys**
4. Copie chave (começa com `SG.`)

### 4.3 Deploy na Vercel

1. Na Vercel: **"Add New"** → **"Project"**
2. Selecione repositório `chathotel`
3. Clique "Environment Variables"
4. Adicione:
   ```
   SENDGRID_API_KEY = [sua chave SG.xxx]
   ```
5. Clique "Deploy"
6. Aguarde ✅ (2-5 min)

### 4.4 Domínio no Cloudflare

1. Vá para [cloudflare.com](https://cloudflare.com)
2. Selecione `elevare.tur.br`
3. Vá para **DNS**
4. Clique **"+ Add Record"**
5. Configure:
   ```
   Type:   CNAME
   Name:   chathotel
   Target: cname.vercel.com
   Proxy:  DNS only (gray cloud)
   ```
6. Clique "Save"
7. Aguarde 5-15 min propagação

### 4.5 Conectar Domínio (Vercel)

1. Na Vercel: **Settings → Domains**
2. Clique "Add Domain"
3. Digite: `chathotel.elevare.tur.br`
4. Clique "Add"
5. Aguarde verificação ✅

---

## ✅ Pronto!

Seu site está em produção:
```
🌐 https://chathotel.elevare.tur.br
```

**Teste:**
1. Acesse a URL
2. Imagem hotel deve aparecer
3. Preencha formulário
4. Você deve receber email de proposta

---

## 📚 Documentação Completa

```
Para mais detalhes, leia:

TESTE-LOCAL.md           Checklist completo de testes
DEPLOY-VERCEL.md         Guia detalhado de deploy + DNS
DESENVOLVIMENTO.md       Como modificar o código
README.md                Overview do projeto
```

---

## 🆘 Problemas Rápidos?

| Problema | Solução |
|----------|---------|
| "Port 3000 in use" | `taskkill /F /IM node.exe` |
| Imagem não aparece | Verificar `assets/hotel-background.png` |
| Email não funciona | Verificar `SENDGRID_API_KEY` em Vercel |
| Domínio não resolve | Aguardar 15 min + limpar cache navegador |

---

## 📞 Precisa de Ajuda?

1. Console do navegador (F12): procure erros vermelhos
2. Vercel Logs (Settings → Functions): veja logs da função
3. Cloudflare DNS: verifique se CNAME está salvo

---

## 🎉 Parabéns!

Seu website profissional está no ar! 🚀

```
✅ Design premium (5 paletas customizáveis)
✅ Animações suaves com imagem hotel
✅ Formulário com email automático
✅ Responsivo (mobile/tablet/desktop)
✅ Pronto para 1000+ visitantes/mês
```

---

**Chat Hotel v1.0 — Pronto para Lançamento!** ✨
