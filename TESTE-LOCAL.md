# 🧪 Guia de Teste Local — Chat Hotel

Instruções para testar toda a funcionalidade localmente antes de fazer deploy na Vercel.

---

## 📋 Checklist de Testes

Use este checklist para verificar cada aspecto do projeto:

### 1. Servidor de Desenvolvimento
- [ ] Servidor inicia sem erros: `npm run dev`
- [ ] Acesso em `http://localhost:3000` funciona
- [ ] Página carrega rapidamente (< 2s)
- [ ] Console do navegador sem erros (F12)

### 2. Visual & Design
- [ ] Página hero aparece corretamente
- [ ] Imagem de hotel aparece como background (transparência em 25%)
- [ ] Efeito glow colorido aparece no fundo
- [ ] Gradient overlay não deixa texto ilegível

### 3. Animações & Efeitos
- [ ] Conversa do hero anima automaticamente (5 mensagens)
- [ ] Animação de typing (3 pontos piscando) funciona
- [ ] Loop de conversa reinicia a cada 17 segundos
- [ ] Scroll animations (reveal) funcionam ao rolar
- [ ] Efeitos de luz piscam suavemente

### 4. Painel de Tweaks (Customizador)
- [ ] Painel aparece no canto inferior direito
- [ ] Selecionar paleta de cores muda o tema
  - [ ] Midnight Gold (padrão)
  - [ ] Obsidian Copper
  - [ ] Emerald Sand
  - [ ] Bordeaux Cream
  - [ ] Electric ELEVARE
- [ ] Tipografia muda ao selecionar (3 opções)
- [ ] Modo escuro/claro alterna
- [ ] Alterações persistem ao reload da página (localStorage)
- [ ] Painel é draggable (pode mover)

### 5. Responsividade
- [ ] **Desktop (1440px)**
  - Layout 2 colunas no hero
  - Navbar visível com links
  - Painel de tweaks aparece
  
- [ ] **Tablet (768px)**
  - Layout muda para 1 coluna
  - Componentes se reorganizam
  - Fontes ajustam proporcionalmente
  
- [ ] **Mobile (375px)**
  - Layout single column
  - Padding reduzido
  - Navbar oculta (menu hamburger)
  - Clicável em tela pequena

### 6. Formulário & Email
- [ ] Formulário aparece na seção "FALE COM A GENTE"
- [ ] Campos:
  - [ ] Nome
  - [ ] Hotel
  - [ ] Email
  - [ ] WhatsApp
- [ ] Todos os campos são required (não permite submit vazio)
- [ ] Email é validado (não aceita formato inválido)
- [ ] Botão mostra estado loading durante envio
- [ ] Confirmação visual aparece após sucesso
- [ ] Mensagem de erro aparece se falhar

### 7. Fontes & Tipografia
- [ ] Google Fonts carregam (Fraunces, Inter, Chakra Petch)
- [ ] Display font (Fraunces) aparece em títulos
- [ ] Body font (Inter) aparece em parágrafos
- [ ] Mono font (Chakra Petch) aparece em labels/detalhes
- [ ] Tamanhos de fonte são responsivos (usam clamp)

### 8. Cores & Contraste
- [ ] Contraste de texto é adequado (WCAG AA)
- [ ] Cores da paleta se aplicam corretamente
- [ ] Glow effects são sutis (não irritam)
- [ ] Modo claro tem suficiente contraste

### 9. Performance
- [ ] Imagens carregam rapidamente
- [ ] Sem lag ao scrollar
- [ ] Animações são suaves (60fps)
- [ ] CPU/RAM não sobem excessivamente (DevTools)

### 10. Acessibilidade
- [ ] Elementos são navegáveis com Tab
- [ ] Links têm focus visível
- [ ] Botões têm texto descritivo
- [ ] Imagens têm alt text

---

## 🧪 Testes Detalhados

### Teste 1: Iniciar Servidor

```bash
cd C:\Users\Cleverson\projetos\chathotel
npm run dev
```

**Verificar:**
```
✅ Servidor rodando em http://localhost:3000
✅ 🎯 Servidor rodando em http://localhost:3000
✅ Componentes carregados:
  ✓ Hero Section
  ✓ Omnichannel
  ✓ Features & Upsell
  ✓ Platform Preview
  ✓ ROI Calculator
  ✓ Launch Offer
  ✓ CTA & Footer
  ✓ Design Tweaks Panel
```

Se tiver erro:
```bash
# Verificar Node.js version
node --version  # Deve ser 18+

# Reinstalar dependências (não há)
npm install

# Se porta 3000 está em uso
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

---

### Teste 2: Visual & Imagem de Fundo

1. Abra `http://localhost:3000` no navegador
2. Observe:
   - [ ] Página hero com texto "O hóspede conversa..."
   - [ ] Imagem de hotel transparente ao fundo (opacidade 25%)
   - [ ] Efeito glow colorido (amarelo/dourado por padrão)
   - [ ] Gradiente escuro sobre a imagem (para legibilidade)
   - [ ] Conversa do chatbot visível e centralizada

**Se não ver a imagem:**
```bash
# Verificar se arquivo existe
ls assets/hotel-background.png

# Se não existir, copiar novamente
cp "imagens/hotel luxo ia.png" assets/hotel-background.png
```

---

### Teste 3: Animações

1. Aguarde a conversa do hero aparecer
2. Observe:
   - [ ] **Primeira mensagem (600ms):** Hóspede pergunta sobre disponibilidade
   - [ ] **Typing bubble (2400ms):** Pontos animados piscando
   - [ ] **Segunda mensagem (4000ms):** Agente responde
   - [ ] **Terceira mensagem (7000ms):** Hóspede comenta sobre ocasião
   - [ ] **Typing bubble (8800ms):** Pontos animam novamente
   - [ ] **Quarta mensagem (10600ms):** Agente faz proposta de upsell
   - [ ] **Loop:** Conversa reinicia depois de 17 segundos

3. Role a página e observe:
   - [ ] Elementos aparecem com fade + slide (reveal animation)
   - [ ] Efeito ocorre quando 15% do elemento entra em viewport

---

### Teste 4: Painel de Tweaks

1. Procure **canto inferior direito** da tela
2. Clique em **"Tweaks · Chat Hotel"**
3. Teste cada controle:

**Paleta de Cores:**
```
Selecione:         Verificar:
○ Midnight Gold    Ouro + Azul (padrão)
○ Obsidian Copper  Cobre + Preto
○ Emerald Sand     Areia + Verde
○ Bordeaux Cream   Crème + Vinho
○ Electric ELEVARE Neon + Preto
```

**Tipografia:**
```
○ Editorial        Serifa clássica (Fraunces)
○ Tech Luxury      Serifa aristocrática (Cormorant)
○ Modern Tech      Serifa moderna (Instrument)
```

**Modo:**
```
☑ Modo escuro      ✅ Ativa / ❌ Desativa
```

4. Recarregue a página (`F5`)
   - [ ] Alterações persistem (salvas em localStorage)

5. Arraste o painel pela barra de título
   - [ ] Painel é draggable

---

### Teste 5: Formulário

1. Role até seção **"FALE COM A GENTE"** (final da página)
2. Preencha o formulário:

```
Nome:     João Silva
Hotel:    Hotel Rosa
Email:    joao@hotelrosa.com.br
WhatsApp: +55 11 98765-4321
```

3. Clique em **"Agendar demonstração"**
4. Verifique:
   - [ ] Botão muda para "⏳ Enviando..."
   - [ ] Após 2-5 segundos, mensagem de sucesso aparece:
     ```
     ✅ Recebemos!
     Obrigado por seu interesse! 🎉
     Enviamos uma confirmação para seu e-mail...
     ```

5. Verificar emails:
   - **Seu email (joao@hotelrosa.com.br):**
     - Deve receber confirmação automática
     - De: `noreply@chathotel.elevare.tur.br`
     - Assunto: "Recebemos sua mensagem! 🎯"
   
   - **Email do Cleverson (cleverson.s.silva@gmail.com):**
     - Deve receber proposta completa
     - De: `noreply@chathotel.elevare.tur.br`
     - Assunto: "Chat Hotel - Proposta de João Silva"
     - Contém: Nome, Email, Hotel, WhatsApp, timestamp

**Se não receber emails:**

Modo local não envia emails reais (testamos com Vercel/SendGrid).

Para simular em desenvolvimento:
```javascript
// Em api/send-proposal.js, linha 1, adicionar:
// console.log('Email que seria enviado:', emailData);
// Isso mostrará no console da função
```

---

### Teste 6: Responsividade

#### Desktop (1440px)

```bash
# Não precisa fazer nada, página normal
# Ou redimensionar navegador para 1440px
```

Verificar:
- [ ] 2 colunas no hero (texto esquerda, chat direita)
- [ ] Navbar com links horizontais
- [ ] Painel de tweaks aparece

#### Tablet (768px)

```bash
# Abrir DevTools (F12)
# Clique em "Toggle device toolbar" (ícone de dispositivo)
# Selecionar "iPad" (768px)
```

Verificar:
- [ ] Layout muda para 1 coluna
- [ ] Elementos se reorganizam corretamente
- [ ] Texto legível

#### Mobile (375px)

```bash
# DevTools → Selecionar "iPhone SE" (375px)
```

Verificar:
- [ ] Tudo em 1 coluna
- [ ] Padding reduzido (20px vs 32px)
- [ ] Botões clicáveis
- [ ] Sem scroll horizontal
- [ ] Fontes proporcionais

---

### Teste 7: Console & Erros

Abra **DevTools** (`F12`) → Aba **Console**:

- [ ] Nenhum erro vermelho (❌)
- [ ] Nenhum aviso amarelo (⚠️) crítico
- [ ] Mensagens verdes (✅) aparecem ao carregar

Se tiver erro, anote a mensagem completa e:
```bash
# Verificar terminal (npm run dev)
# Procurar por mensagens de erro relacionadas
```

---

### Teste 8: Performance

**DevTools** → Aba **Performance**:

1. Clique em **"Reload page"** (ícone circular)
2. Aguarde completar
3. Analise:
   - **FCP (First Contentful Paint):** < 2s ✅
   - **LCP (Largest Contentful Paint):** < 3s ✅
   - **CLS (Cumulative Layout Shift):** < 0.1 ✅

Se lento:
- Compactar imagens: `jpegmini`, `tinypng`
- Verificar bundle size (deve ser pequeno, sem build)

---

## ✅ Teste de Integração Completo

Simule um usuário real:

1. **Abra** `http://localhost:3000`
2. **Mude o tema** usando painel de tweaks (teste 3-5 paletas)
3. **Role a página** observando animações
4. **Teste responsividade** redimensionando navegador
5. **Preencha e envie** o formulário
6. **Verifique** a mensagem de sucesso

**Tempo esperado:** ~5 minutos

---

## 🚀 Pronto para Deploy?

Se passou em todos os testes:

1. Fazer commit no Git:
```bash
git add .
git commit -m "Add hotel background image, fix form validation, improve animations"
```

2. Fazer push:
```bash
git push origin main
```

3. Seguir **DEPLOY-VERCEL.md** para fazer deploy na Vercel

---

## 📞 Problemas Comuns

| Problema | Solução |
|----------|---------|
| "Cannot find module" | `npm install` |
| Porta 3000 em uso | `netstat -ano \| findstr :3000` + `taskkill` |
| Imagem não aparece | Verificar caminho em `hero.jsx` |
| Emails não funcionam | Aguardar teste com Vercel + SendGrid |
| Painel de tweaks não abre | Verificar se `tweaks-panel.jsx` está carregado |
| Animações lentas | Verificar GPU acceleration (não está desativada) |

---

## 📊 Métricas de Sucesso

Seu projeto está pronto quando:

- ✅ Nenhum erro no console
- ✅ Imagem de hotel visível com transparência
- ✅ Todas animações suaves (60fps)
- ✅ Painel de tweaks funcional (persistência funcionando)
- ✅ Formulário completo (validação OK)
- ✅ Responsividade em 3 breakpoints
- ✅ Performance adequada (< 3s LCP)

---

**Chat Hotel — Testes Locais v1.0** ✨  
Última atualização: Maio de 2026
