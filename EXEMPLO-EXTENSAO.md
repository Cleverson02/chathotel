# Exemplo: Como Estender Chat Hotel

Este documento mostra exemplos práticos de como adicionar funcionalidades ao Chat Hotel.

---

## 1️⃣ Adicionar Nova Seção ao Website

### Cenário: Adicionar seção "Clientes"

#### Passo 1: Criar arquivo `clientes.jsx`

```jsx
// clientes.jsx
function ClientesSection() {
  const [ref, inView] = useInView(0.2);
  
  const clientes = [
    { nome: 'Hotel Vista Bela', logo: '🏨', destaque: true },
    { nome: 'Pousada Praia Sol', logo: '🏝️' },
    { nome: 'Resort Serrado', logo: '⛰️' },
    { nome: 'Flat Centro', logo: '🏙️' },
  ];

  return (
    <section ref={ref} id="clientes" style={{ background: 'var(--bg-elev)' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: 60 }}>
          <span className="eyebrow">CONFIANÇA ESTABELECIDA</span>
          <h2 className="display" style={{ marginTop: 16, marginBottom: 24 }}>
            Hotéis premium que confiam em nós
          </h2>
          <p className="lead" style={{ margin: '0 auto' }}>
            Mais de 50 estabelecimentos usando Chat Hotel para elevar sua hotelaria.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: 24,
        }}>
          {clientes.map((cliente, i) => (
            <div
              key={i}
              className="card reveal"
              style={{
                padding: 32,
                textAlign: 'center',
                border: cliente.destaque ? '1px solid var(--brand)' : undefined,
              }}
            >
              <div style={{ fontSize: 48, marginBottom: 16 }}>{cliente.logo}</div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 500 }}>
                {cliente.nome}
              </div>
              {cliente.destaque && (
                <div style={{
                  marginTop: 12,
                  padding: '6px 12px',
                  background: 'var(--glow)',
                  borderRadius: 8,
                  fontSize: 11,
                  color: 'var(--brand)',
                }}>
                  Destaque
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

#### Passo 2: Importar em Chat Hotel.html

Adicione esta linha após as outras importações de componentes:

```html
<script type="text/babel" src="clientes.jsx"></script>
```

#### Passo 3: Usar em App()

```jsx
function App() {
  return (
    <>
      <Hero palette={palette}/>
      <OmnichannelSection palette={palette}/>
      <FeaturesSection/>
      <ClientesSection/>  {/* ← Novo */}
      <UpsellSection/>
      {/* ... resto */}
    </>
  );
}
```

---

## 2️⃣ Adicionar Novo Tweak (Customização)

### Cenário: Permite ajustar largura máxima do container

#### Passo 1: Atualizar TWEAK_DEFAULTS

```javascript
const TWEAK_DEFAULTS = {
  "palette": "midnight",
  "typePair": "editorial",
  "darkMode": true,
  "containerWidth": "1280px"  // ← Novo
};
```

#### Passo 2: Criar estado no App()

```jsx
function App() {
  const [tweaks, setTweak] = useTweaks(TWEAK_DEFAULTS);
  
  React.useEffect(() => {
    const r = document.documentElement.style;
    r.setProperty('--container-width', tweaks.containerWidth);
  }, [tweaks.containerWidth]);
  // ... resto
}
```

#### Passo 3: Adicionar controle no TweaksPanel

```jsx
<TweaksPanel>
  <TweakSection title="Layout">
    <TweakSelect
      value={tweaks.containerWidth}
      onChange={v => setTweak('containerWidth', v)}
      options={[
        { value: '1024px', label: 'Compacto' },
        { value: '1280px', label: 'Padrão' },
        { value: '1440px', label: 'Amplo' },
        { value: '100%', label: 'Fluido' },
      ]}
    />
  </TweakSection>
</TweaksPanel>
```

#### Passo 4: Usar em CSS

```css
.container {
  max-width: var(--container-width);
}
```

---

## 3️⃣ Adicionar Animação Customizada

### Cenário: Números contadores que animam ao scroll

#### Criar arquivo `contador.jsx`

```jsx
// contador.jsx
function Contador({ valor, label }) {
  const [ref, inView] = useInView();
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    if (!inView) return;
    
    let current = 0;
    const increment = Math.ceil(valor / 30);
    const timer = setInterval(() => {
      current += increment;
      if (current >= valor) {
        setCount(valor);
        clearInterval(timer);
      } else {
        setCount(current);
      }
    }, 30);
    
    return () => clearInterval(timer);
  }, [inView, valor]);

  return (
    <div ref={ref} style={{ textAlign: 'center', padding: 24 }}>
      <div style={{
        fontSize: 'clamp(32px, 5vw, 64px)',
        fontWeight: 600,
        color: 'var(--brand)',
        fontFamily: 'var(--font-display)',
      }}>
        {count.toLocaleString('pt-BR')}
      </div>
      <div style={{ color: 'var(--fg-muted)', marginTop: 8 }}>{label}</div>
    </div>
  );
}
```

#### Usar em uma seção

```jsx
<section>
  <div className="container">
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 40 }}>
      <Contador valor={5000} label="Hóspedes atendidos" />
      <Contador valor={98} label="% de satisfação" />
      <Contador valor={24} label="Horas de suporte" />
    </div>
  </div>
</section>
```

---

## 4️⃣ Adicionar Formulário Interativo

### Cenário: Adicionar formulário de contato

#### Criar arquivo `contato.jsx`

```jsx
// contato.jsx
function ContatoSection() {
  const [email, setEmail] = React.useState('');
  const [mensagem, setMensagem] = React.useState('');
  const [enviado, setEnviado] = React.useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Aqui você integraria com um serviço real
    console.log('Enviar:', { email, mensagem });
    
    setEnviado(true);
    setTimeout(() => {
      setEmail('');
      setMensagem('');
      setEnviado(false);
    }, 3000);
  };

  return (
    <section style={{ padding: '120px 0', background: 'var(--bg-elev)' }}>
      <div className="container" style={{ maxWidth: 600 }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <h2 className="display">Entre em Contato</h2>
          <p className="lead">Converse conosco sobre como Chat Hotel pode ajudar seu estabelecimento.</p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <input
            type="email"
            placeholder="seu@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{
              padding: 14,
              borderRadius: 12,
              border: '1px solid var(--line)',
              background: 'var(--surface)',
              color: 'var(--fg)',
              font: 'inherit',
              fontSize: 14,
            }}
          />
          <textarea
            placeholder="Sua mensagem..."
            value={mensagem}
            onChange={(e) => setMensagem(e.target.value)}
            required
            rows={5}
            style={{
              padding: 14,
              borderRadius: 12,
              border: '1px solid var(--line)',
              background: 'var(--surface)',
              color: 'var(--fg)',
              font: 'inherit',
              fontSize: 14,
              resize: 'vertical',
            }}
          />
          <button
            type="submit"
            className="btn btn-primary"
            disabled={enviado}
          >
            {enviado ? '✓ Enviado!' : 'Enviar Mensagem'}
          </button>
        </form>
      </div>
    </section>
  );
}
```

---

## 5️⃣ Modificar Tema com Paleta Customizada

### Cenário: Adicionar paleta específica para um cliente

#### Em `tokens.jsx`

```javascript
const PALETTES = {
  // ... paletas existentes ...
  
  // Novo: Paleta customizada para "Hotel Vista Bela"
  vistaBela: {
    name: 'Vista Bela',
    bg: '#0D1E35',
    bgElev: '#132A45',
    surface: '#1A3A52',
    line: '#254A62',
    fg: '#F2EDD8',
    fgMuted: '#A0AEC0',
    fgSubtle: '#6B7C8F',
    brand: '#2E9C9F',        // Azul turquesa (identidade do hotel)
    brandSoft: '#5BB0B4',
    accent: '#D4A574',       // Dourado terra
    accentSoft: '#E5C99A',
    glow: 'rgba(46, 156, 159, 0.35)',
  },
};

// Adicionar em TYPE_PAIRS se necessário
const TYPE_PAIRS = {
  // ... tipos existentes ...
  vistaBela: {
    name: 'Vista Bela',
    display: "'Fraunces', serif",
    body: "'Inter', sans-serif",
    mono: "'Chakra Petch', monospace",
    description: 'Tipografia premium para Vista Bela',
  },
};
```

#### Em Chat Hotel.html

```javascript
// Atualizar opções no TweakSelect
<TweakSelect
  value={tweaks.palette}
  onChange={v => setTweak('palette', v)}
  options={[
    { value: 'midnight', label: 'Midnight Gold' },
    { value: 'vistaBela', label: 'Hotel Vista Bela' },  // ← Novo
    // ... outros ...
  ]}
/>
```

---

## 6️⃣ Integrar com API Externa

### Cenário: Carregar dados de hotéis da API

```jsx
// hoteis.jsx
function HoteisSection() {
  const [hoteis, setHoteis] = React.useState([]);
  const [carregando, setCarregando] = React.useState(true);
  const [ref, inView] = useInView();

  React.useEffect(() => {
    if (!inView) return;

    fetch('https://api.example.com/hoteis')
      .then(r => r.json())
      .then(data => {
        setHoteis(data);
        setCarregando(false);
      })
      .catch(err => {
        console.error('Erro ao carregar hotéis:', err);
        setCarregando(false);
      });
  }, [inView]);

  return (
    <section ref={ref}>
      <div className="container">
        {carregando && <div style={{ textAlign: 'center' }}>Carregando...</div>}
        {!carregando && hoteis.length === 0 && <div>Nenhum hotel encontrado</div>}
        {hoteis.map((hotel, i) => (
          <div key={i}>
            <h3>{hotel.nome}</h3>
            <p>{hotel.descricao}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
```

---

## 🎯 Checklist: Adicionar Novo Componente

- [ ] Criar arquivo `.jsx` na raiz do projeto
- [ ] Estruturar com `<section>` e `<div className="container">`
- [ ] Usar classes CSS: `display`, `lead`, `eyebrow`, `reveal`
- [ ] Implementar `useInView` para animações ao scroll
- [ ] Importar em `Chat Hotel.html` com `<script type="text/babel">`
- [ ] Adicionar a `App()` na ordem desejada
- [ ] Testar responsividade em mobile (768px)
- [ ] Testar tema escuro e claro (tweaks panel)
- [ ] Verificar accessibilidade (alt texts, aria-labels)
- [ ] Atualizar documentação (README.md)

---

## 📚 Templates Rápidos

### Seção com 3 colunas

```jsx
<div style={{
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
  gap: 32,
}}>
  {items.map((item, i) => (
    <div key={i} className="card reveal">
      {/* Conteúdo */}
    </div>
  ))}
</div>
```

### Card com hover

```jsx
<div
  className="card"
  style={{
    cursor: 'pointer',
    transition: 'transform 0.3s, border-color 0.3s',
  }}
  onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-4px)'}
  onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
>
  Conteúdo
</div>
```

### Modal / Dialog

```jsx
const [open, setOpen] = React.useState(false);

return (
  <>
    <button onClick={() => setOpen(true)}>Abrir</button>
    {open && (
      <div style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0,0,0,0.5)',
        display: 'grid',
        placeItems: 'center',
        zIndex: 100,
      }} onClick={() => setOpen(false)}>
        <div
          className="card"
          style={{ maxWidth: 500 }}
          onClick={(e) => e.stopPropagation()}
        >
          Conteúdo do Modal
          <button onClick={() => setOpen(false)}>Fechar</button>
        </div>
      </div>
    )}
  </>
);
```

---

**Chat Hotel Extension Guide v1.0**  
Pronto para extensões criativas! 🚀
