# Guia de Desenvolvimento — Chat Hotel

Documentação para desenvolvedores que desejam modificar, estender ou entender o projeto Chat Hotel.

---

## 🏗️ Arquitetura

O projeto segue uma arquitetura modular com componentes React renderizados via Babel standalone.

```
┌─────────────────────────────────────────────────┐
│    Chat Hotel.html (Ponto de Entrada)           │
└──────────────────┬──────────────────────────────┘
                   │
        ┌──────────┴──────────────┐
        │                         │
   ┌────▼────────┐        ┌───────▼────────┐
   │  CSS Styles │        │  React (CDN)   │
   │  styles.css │        │  Babel Compiler│
   └─────────────┘        └───────┬────────┘
                                  │
        ┌─────────────┬───────────┼──────────┬──────────┐
        │             │           │          │          │
    ┌───▼──┐  ┌──────▼──┐  ┌────▼────┐  ┌─▼──┐  ┌───▼───┐
    │Tokens│  │Tweaks   │  │Brand    │  │Hero│  │Omni-  │
    │      │  │Panel    │  │Assets   │  │    │  │channel│
    └──────┘  └─────────┘  └─────────┘  └────┘  └───────┘
```

---

## 🔄 Fluxo de Execução

1. **Carregamento**: Navegador carrega `Chat Hotel.html`
2. **CDN**: React, ReactDOM e Babel carregam via unpkg
3. **Compilação**: Babel compila `<script type="text/babel">` em tempo real
4. **Executação**: App() inicia e renderiza na `<div id="root">`
5. **Tema**: CSS variables aplicadas baseado em `TWEAK_DEFAULTS`

---

## 📝 Estrutura de Componentes

### Componente Padrão

```jsx
// componente.jsx
function MeuComponente({ props }) {
  const [ref, inView] = useInView(0.2);  // Intersection Observer
  
  return (
    <section ref={ref} style={{ padding: 'clamp(72px, 10vw, 120px) 0' }}>
      <div className="container">
        {/* Conteúdo */}
      </div>
    </section>
  );
}
```

### Convenções

- **Nomes**: PascalCase para componentes, camelCase para functions
- **Props**: Destructure no parâmetro
- **Hooks**: useInView para scroll animations, useState para controle local
- **Styles**: Inline styles + classes CSS para escopo
- **Tipografia**: Use `--font-display`, `--font-body`, `--font-mono`
- **Cores**: Use variáveis CSS como `var(--brand)`, `var(--fg)`, etc.

---

## 🎨 Sistema de Tokens

### Arquivo: `tokens.jsx`

Define 5 paletas de cor + 3 combinações tipográficas.

```javascript
const PALETTES = {
  midnight: {
    bg: '#0A1726',
    brand: '#D4B36A',
    // ...
  },
  // + 4 paletas adicionais
};

const TYPE_PAIRS = {
  editorial: {
    display: "'Fraunces', serif",
    body: "'Inter', sans-serif",
    // ...
  },
  // + 2 combinações adicionais
};
```

**Para usar em um componente:**

```jsx
function MeuComponente({ palette, typePair }) {
  return (
    <div style={{
      color: palette.fg,
      fontFamily: typePair.display,
    }}>
      Conteúdo
    </div>
  );
}
```

---

## 🎛️ Painel de Tweaks

### Como Funciona

1. `useTweaks()` gerencia estado de tweaks via localStorage
2. `TweaksPanel` renderiza UI flutuante no canto inferior direito
3. Alterações em tweaks (palette, typePair, darkMode) disparam updates
4. `applyTokens()` atualiza CSS variables no `:root`

### Controles Disponíveis

```javascript
<TweakSection title="Seção">
  <TweakSelect        // Dropdown
  <TweakRadio         // Segmented control
  <TweakToggle        // Botão liga/desliga
  <TweakSlider        // Range input
  <TweakNumber        // Number input com scrub
  <TweakColor         // Color picker
  <TweakText          // Text input
  <TweakButton        // Button
```

### Adicionar Novo Tweak

```javascript
const TWEAK_DEFAULTS = {
  palette: 'midnight',
  typePair: 'editorial',
  darkMode: true,
  // Novo tweak:
  fontSize: 16,
};

function App() {
  const [tweaks, setTweak] = useTweaks(TWEAK_DEFAULTS);
  
  return (
    <>
      <TweaksPanel>
        <TweakSection title="Tipografia">
          <TweakSlider
            label="Tamanho base"
            value={tweaks.fontSize}
            min={14}
            max={20}
            onChange={(v) => setTweak('fontSize', v)}
          />
        </TweakSection>
      </TweaksPanel>
    </>
  );
}
```

---

## 🎬 Animações

### Reveal Animation (Scroll-based)

```javascript
// Automático em styles.css
.reveal {
  opacity: 0;
  transform: translateY(28px);
  transition: opacity 1s ..., transform 1s ...;
}
.reveal.in { opacity: 1; transform: translateY(0); }
```

**Usar em um elemento:**
```jsx
<div className="reveal">Elemento aparece ao scroll</div>
```

### useInView Hook

```javascript
const [ref, inView] = useInView(0.15);  // 15% visível

React.useEffect(() => {
  if (!inView) return;
  // Iniciar animação/script quando em view
}, [inView]);

return <div ref={ref}>Conteúdo observado</div>;
```

### Animações CSS

```css
@keyframes typing-dot {
  0%, 60%, 100% { transform: translateY(0); opacity: 0.4; }
  30% { transform: translateY(-3px); opacity: 1; }
}

.typing-dot { animation: typing-dot 1.4s infinite; }
```

---

## 🌍 Responsividade

### Abordagem: Mobile-First + clamp()

```jsx
// Padding responsivo
<section style={{ padding: 'clamp(72px, 10vw, 120px) 0' }}>
  {/* Mín: 72px, Ideal: 10vw, Máx: 120px */}
</section>

// Font size responsivo
<h1 style={{ fontSize: 'clamp(34px, 5vw, 64px)' }}>
  {/* Mín: 34px, Ideal: 5vw, Máx: 64px */}
</h1>
```

### Media Queries

```css
@media (max-width: 1024px) {
  .grid { grid-template-columns: 1fr !important; }
}

@media (max-width: 768px) {
  .container { padding: 0 20px; }  /* vs 32px em desktop */
}
```

---

## 🖼️ Assets & Imagens

### Localização
`assets/` contém logos e imagens

### Como Usar

```jsx
<img src="assets/logo-chathotel.png" alt="Chat Hotel" />
```

### Otimizações
- Usar `.png` para logos (transparência)
- Usar `.jpg` para fotos
- Usar `.svg` para ícones (renderizáveis como componentes)

---

## 🔌 Adicionar Novo Componente

### Passo 1: Criar arquivo JSX

```javascript
// novo-componente.jsx
function NovoComponente() {
  return (
    <section style={{ padding: '120px 0' }}>
      <div className="container">
        <h2 className="display">Título</h2>
        <p className="lead">Descrição</p>
      </div>
    </section>
  );
}
```

### Passo 2: Importar em Chat Hotel.html

```html
<script type="text/babel" src="novo-componente.jsx"></script>
```

### Passo 3: Usar em App()

```jsx
function App() {
  return (
    <>
      <Hero/>
      <NovoComponente/>  {/* ← Novo componente */}
      <Footer/>
      <TweaksPanel>...</TweaksPanel>
    </>
  );
}
```

---

## 🧪 Debugging

### Console do Navegador

```javascript
// Em Chat Hotel.html ou qualquer componente
console.log('Debug:', {
  tweaks,
  palette,
  inView,
});
```

### React DevTools

1. Instale extensão React DevTools no navegador
2. Inspecione componentes, props, state

### Styles Debugging

```css
/* Adicionar temporário */
.debug {
  outline: 2px solid red;
  padding: 8px;
}
```

---

## 📊 Performance

### Otimizações Implementadas

- Lazy loading de componentes (useInView)
- Reveal animations com `will-change: opacity`
- CSS custom properties (0 recalculate)
- Backdrop filter com fallback

### Como Melhorar Mais

```javascript
// Usar React.memo para componentes custosos
const MeuComponente = React.memo(function({ props }) {
  return <div>...</div>;
});

// Usar useMemo para cálculos pesados
const resultado = React.useMemo(() => {
  return computarAlgo(props);
}, [props]);
```

---

## 🚀 Deploy

### Vercel

```bash
npm install -g vercel
vercel --prod
```

### Netlify

```bash
npm install -g netlify-cli
netlify deploy --prod --dir=.
```

### GitHub Pages

```bash
npm run build
git add dist/
git commit -m "Build"
git push
```

---

## 📚 Referências Rápidas

### React Hooks
```javascript
React.useState()        // State
React.useEffect()       // Effects
React.useRef()          // Refs
React.useMemo()         // Memoization
React.useCallback()     // Callback memoization
```

### CSS Variables
```css
:root { --brand: #D4B36A; }
element { color: var(--brand); }
getComputedStyle(el).getPropertyValue('--brand');
```

### Intersection Observer
```javascript
const obs = new IntersectionObserver(
  ([entry]) => { if (entry.isIntersecting) {...} },
  { threshold: 0.15 }
);
obs.observe(element);
```

---

## ❓ Troubleshooting

### "Babel não compila meu JSX"
- Verifique se `<script type="text/babel">` tem atributo `type="text/babel"`
- Certifique-se que o arquivo tem sintaxe JSX válida

### "Cores não mudam com tweaks"
- Use `var(--brand)` em vez de `#D4B36A` fixo
- Verifique se CSS é carregado antes de React

### "Animações não funcionam"
- Verifique se elemento tem classe `reveal`
- Teste se `useInView` está importado
- Verifique threshold do IntersectionObserver

---

## 💡 Dicas

1. **Reutilizar componentes**: `Bubble`, `Icon`, `ChannelIcon` são reutilizáveis
2. **Padronizar espaçamento**: Use `clamp()` para responsividade
3. **Testar escuras/claras**: Toggle modo escuro via tweaks panel
4. **Performance**: Minimize re-renders com React.memo
5. **Acessibilidade**: Adicione `alt`, `aria-*`, `role` conforme necessário

---

**Chat Hotel Development Guide v1.0**  
Última atualização: maio de 2026
