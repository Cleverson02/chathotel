# Chat Hotel — Concierge IA para Hotelaria Premium

Bem-vindo ao projeto **Chat Hotel**, um concierge de IA para gerenciamento de reservas e atendimento omnichannel em hotelaria de alto padrão.

Este é um projeto de design e implementação frontal construído com **React**, **Babel** (standalone) e **CSS nativo**, apresentando uma experiência de usuário premium inspirada na marca ELEVARE.

---

## 📋 Sobre o Projeto

**Chat Hotel** é uma plataforma de inteligência artificial que:

- **Gerencia conversas omnichannel**: WhatsApp, Instagram, Messenger, Email, Web Chat
- **Mantém contexto unificado**: Histórico completo por hóspede, independente do canal
- **Oferece sugestões inteligentes**: Recomendações de upsell baseadas em preferências
- **Permite intervenção humana**: Transição suave para atendimento personalizado
- **Exibe ROI**: Calculadora interativa de economia operacional

---

## 🚀 Como Iniciar

### Pré-requisitos
- Node.js 18+
- npm ou yarn

### Instalação

```bash
# Clonar/extrair o projeto
cd chathotel

# Instalar dependências (não há dependências externas, apenas Node.js)
npm install

# Iniciar servidor de desenvolvimento
npm run dev
```

O servidor estará disponível em **http://localhost:3000**

---

## 📁 Estrutura do Projeto

```
chathotel/
├── Chat Hotel.html          # Arquivo principal (ponto de entrada)
├── styles.css               # Estilos globais e utilities
├── tokens.jsx               # Design tokens (paletas, tipografia)
├── tweaks-panel.jsx         # Painel de customização em tempo real
│
├── Components (Seções)
├── hero.jsx                 # Seção hero com conversa animada
├── omnichannel.jsx          # Visualização de convergência de canais
├── features-upsell.jsx      # Recursos e upsell
├── conversation.jsx         # Componentes de conversa reutilizáveis
├── platform.jsx             # Preview da plataforma (inbox)
├── offer-cta-footer.jsx     # Oferta de lançamento + CTA + footer
│
├── Assets
├── assets/logo-chathotel.png
├── assets/logo-elevare.png
├── assets/logo-elevare-negative.png
├── assets/logo-rvs.png
│
├── Configuração
├── package.json
├── server.js                # Servidor HTTP de desenvolvimento
└── README.md                # Este arquivo
```

---

## 🎨 Design System

### Paletas de Cor (5 variações)

1. **Midnight Gold** (padrão)
   - Fundo: `#0A1726` (azul marinho)
   - Marca: `#D4B36A` (dourado champagne)
   - Acento: `#5B8FB9` (azul céu)

2. **Obsidian Copper**
   - Fundo: `#0E0E10` (preto profundo)
   - Marca: `#E26B2C` (cobre queimado)

3. **Emerald Sand**
   - Fundo: `#0B1814` (verde floresta)
   - Marca: `#C8A865` (areia dourada)

4. **Bordeaux Cream**
   - Fundo: `#1A0E14` (vinho escuro)
   - Marca: `#D4B36A` (champagne)

5. **Electric ELEVARE**
   - Fundo: `#0A0A0A` (preto puro)
   - Marca: `#D9E021` (amarelo neon)

### Tipografia (3 combinações)

- **Editorial**: Fraunces (display) + Inter (body) + Chakra Petch (mono)
- **Tech Luxury**: Cormorant Garamond (display) + Inter (body) + Chakra Petch (mono)
- **Modern Tech**: Instrument Serif (display) + Inter (body) + Chakra Petch (mono)

### Modo de Tema

- 🌙 **Modo Escuro** (padrão)
- ☀️ **Modo Claro** (disponível)

---

## 🎛️ Painel de Tweaks

O projeto inclui um painel de customização em tempo real (canto inferior direito):

### Controles Disponíveis

1. **Paleta**: Escolha entre 5 paletas de cores
2. **Tipografia**: Alterne entre 3 combinações de fontes
3. **Modo**: Ative/desative modo escuro

As alterações são aplicadas instantaneamente via CSS variables.

---

## 📱 Seções do Site

### 1. Hero Section
- Conversa animada com chatbot
- Mostra o caso de uso principal (reserva de hotel)
- Auto-play com loop a cada 17 segundos

### 2. Omnichannel
- Visualização de convergência de 5 canais
- Animação de mensagens chegando
- Descrição de benefícios unificados

### 3. Features & Upsell
- Grid de recursos principais
- Casos de uso específicos
- Propostas de valor

### 4. Platform Preview
- Screenshot interativo da plataforma
- Visualização do inbox omnichannel
- Demonstração da interface

### 5. ROI Calculator
- Calculadora interativa de economia
- Estimativa de economia operacional
- Comparação antes/depois

### 6. Launch Offer
- Oferta de lançamento exclusiva
- CTA principal (Call to Action)
- Benefícios limitados

### 7. Footer
- Links de navegação
- Contato e redes sociais
- Informações legais

---

## ⚙️ Configuração Técnica

### React & Babel
- React 18.3.1 via CDN (development build)
- Babel 7.29.0 (standalone transpiler)
- Sem build step necessário

### Renderização
- ReactDOM renderiza na `<div id="root">`
- Intersection Observer para animações
- CSS custom properties para tema dinâmico

### Performance
- Reveal animations com threshold 15%
- Lazy loading de componentes
- Cache de assets estáticos

---

## 🔧 Desenvolvimento

### Modificar um Componente

1. Abra o arquivo JSX correspondente
2. Edite o componente
3. Salve e atualize o navegador (hot-reload não implementado)

### Adicionar Novo Componente

1. Crie um arquivo `.jsx` na raiz
2. Defina a função React
3. Importe em `Chat Hotel.html` com `<script type="text/babel" src="seu-componente.jsx"></script>`

### Modificar Estilos

1. Edite `styles.css` para estilos globais
2. Use CSS variables (`--brand`, `--fg`, etc.) para temática
3. Os tweaks panel controlam as variables automaticamente

---

## 🌐 Deploy

### Vercel / Netlify

Como o projeto é apenas HTML/CSS/JS com React via CDN, você pode fazer deploy de qualquer forma:

```bash
# Build (opcional - nenhum build necessário)
# Apenas copie os arquivos HTML/CSS/JS/JSX

# Deploy para Vercel
vercel --prod
```

### Docker

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY . .
EXPOSE 3000
CMD ["node", "server.js"]
```

---

## 📖 Referências

- [React 18 Documentation](https://react.dev)
- [Babel Standalone](https://babeljs.io/docs/babel-standalone)
- [Web Fonts - Google Fonts](https://fonts.google.com)
- [CSS Custom Properties](https://developer.mozilla.org/en-US/docs/Web/CSS/--*)

---

## 📝 Notas de Design

- **Grain texture**: Camada de ruído SVG para autenticidade
- **Glassmorphism**: Backdrop filter para efeito vidro
- **Glow effects**: Sombras coloridas para marca
- **Typography scale**: Tipografia responsiva com `clamp()`
- **Mobile first**: Design otimizado para todos os breakpoints

---

## 🤝 Contribuindo

Este é um projeto educacional/de demonstração. Sinta-se livre para clonar, modificar e reusar para seus próprios projetos.

---

## 📧 Contato

Para dúvidas sobre o projeto:
- Email: contato@chathotel.com.br
- Website: https://chathotel.com.br

---

**Chat Hotel v1.0.0** — Desenvolvido com ❤️ por ELEVARE  
Última atualização: maio de 2026
