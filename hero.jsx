// Hero v3 — mobile-first, conversa centralizada, canais como faixa lateral (não orbital)

const HERO_SCRIPT = [
  { side: 'guest', text: 'Olá! Estou planejando uma escapada para o feriado. Disponibilidade no fim de semana de 22 a 24?', delay: 600, time: '14:32' },
  { side: 'typing', delay: 2400 },
  { side: 'agent', text: 'Que bom receber você, Marina. Acabei de verificar — temos sim disponibilidade. Posso te mostrar duas opções com a vista que combina com você?', delay: 4000, time: '14:32' },
  { side: 'guest', text: 'Adoraria. Será uma ocasião especial 🥂', delay: 7000, time: '14:33' },
  { side: 'typing', delay: 8800 },
  { side: 'agent', text: 'Que lindo. Posso reservar a Suíte Panorâmica e separar uma cesta de boas-vindas com o espumante da casa por nossa conta?', delay: 10600, time: '14:33' },
];

const useHeroScript = (inView) => {
  const [step, setStep] = React.useState(0);
  React.useEffect(() => {
    if (!inView) return;
    let timers = [];
    const run = () => {
      setStep(0);
      timers = HERO_SCRIPT.map((m, i) => setTimeout(() => setStep(i + 1), m.delay));
    };
    run();
    const loop = setInterval(run, 17000);
    return () => { timers.forEach(clearTimeout); clearInterval(loop); };
  }, [inView]);
  return step;
};

const HeroBubble = ({ side, text, time, status }) => {
  const isAgent = side === 'agent';
  return (
    <div style={{ display: 'flex', justifyContent: isAgent ? 'flex-start' : 'flex-end', marginBottom: 8 }}>
      <div style={{
        maxWidth: '85%',
        background: isAgent ? 'rgba(255,255,255,0.07)' : 'var(--brand)',
        color: isAgent ? 'var(--fg)' : 'var(--bg)',
        padding: '10px 14px',
        borderRadius: 16,
        borderTopLeftRadius: isAgent ? 4 : 16,
        borderTopRightRadius: isAgent ? 16 : 4,
        fontSize: 14,
        lineHeight: 1.5,
        border: isAgent ? '1px solid rgba(255,255,255,0.08)' : 'none',
        boxShadow: '0 4px 20px rgba(0,0,0,0.25)',
      }}>
        <div>{text}</div>
        <div style={{ fontSize: 10, opacity: 0.7, marginTop: 4, textAlign: 'right', fontFamily: 'var(--font-mono)' }}>{time}{status ? ' ✓✓' : ''}</div>
      </div>
    </div>
  );
};

const TypingBubble = () => (
  <div style={{ display: 'flex', justifyContent: 'flex-start', marginBottom: 8 }}>
    <div style={{
      background: 'rgba(255,255,255,0.07)',
      padding: '12px 16px',
      borderRadius: 16,
      borderTopLeftRadius: 4,
      border: '1px solid rgba(255,255,255,0.08)',
      color: 'var(--fg-muted)',
    }}>
      <span className="typing-dot"/><span className="typing-dot"/><span className="typing-dot"/>
    </div>
  </div>
);

const HeroConversation = () => {
  const [ref, inView] = useInView(0.05);
  const step = useHeroScript(inView);

  return (
    <div ref={ref} style={{
      width: '100%',
      maxWidth: 420,
      margin: '0 auto',
      background: 'rgba(10, 23, 38, 0.78)',
      backdropFilter: 'blur(40px) saturate(140%)',
      WebkitBackdropFilter: 'blur(40px) saturate(140%)',
      border: '1px solid rgba(212, 179, 106, 0.18)',
      borderRadius: 24,
      overflow: 'hidden',
      boxShadow: '0 40px 100px rgba(0,0,0,0.6), 0 0 60px rgba(212,179,106,0.1), inset 0 1px 0 rgba(255,255,255,0.05)',
    }}>
      <div style={{
        padding: '14px 18px',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        display: 'flex', alignItems: 'center', gap: 12,
        background: 'rgba(255,255,255,0.02)',
      }}>
        <ChannelIcon channel="whatsapp" size={14} glow/>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 13, fontWeight: 500, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>Concierge · Hotel Vista Bela</div>
          <div style={{ fontSize: 11, color: 'var(--fg-muted)', display: 'flex', alignItems: 'center', gap: 5, fontFamily: 'var(--font-mono)' }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#25D366' }}/>
            online · respondendo
          </div>
        </div>
      </div>

      <div style={{
        padding: '18px',
        height: 360,
        overflow: 'hidden',
        display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
      }}>
        {HERO_SCRIPT.slice(0, step).map((msg, i) => {
          if (msg.side === 'typing') return <div key={i} className="bubble-enter"><TypingBubble/></div>;
          return <div key={i} className="bubble-enter"><HeroBubble {...msg} status={msg.side === 'guest'}/></div>;
        })}
      </div>

      <div style={{
        padding: '12px 18px',
        borderTop: '1px solid rgba(255,255,255,0.06)',
        display: 'flex', alignItems: 'center', gap: 10,
      }}>
        <div style={{ flex: 1, padding: '8px 14px', background: 'rgba(255,255,255,0.04)', borderRadius: 999, fontSize: 12, color: 'var(--fg-subtle)', fontStyle: 'italic' }}>Mensagem…</div>
        <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'var(--brand)', display: 'grid', placeItems: 'center', color: 'var(--bg)', flexShrink: 0 }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M3.4 20.4l17.45-7.48a1 1 0 0 0 0-1.84L3.4 3.6a1 1 0 0 0-1.39 1.21l2.6 7.19-2.6 7.18a1 1 0 0 0 1.39 1.22z"/></svg>
        </div>
      </div>
    </div>
  );
};

// Channel rail — vertical column of floating channels alongside chat (desktop)
// On mobile becomes a horizontal row above the chat.
const ChannelRail = () => {
  const channels = [
    { id: 'whatsapp', label: 'WhatsApp' },
    { id: 'instagram', label: 'Instagram' },
    { id: 'messenger', label: 'Messenger' },
    { id: 'email', label: 'E-mail' },
    { id: 'web', label: 'Site' },
  ];
  return (
    <div className="channel-rail" style={{
      display: 'flex',
      flexDirection: 'column',
      gap: 14,
    }}>
      {channels.map((ch, i) => (
        <div key={ch.id} className="channel-rail-item" style={{
          display: 'flex', alignItems: 'center', gap: 12,
          padding: '10px 14px 10px 10px',
          background: 'rgba(10, 23, 38, 0.55)',
          backdropFilter: 'blur(20px) saturate(140%)',
          WebkitBackdropFilter: 'blur(20px) saturate(140%)',
          border: '1px solid rgba(212,179,106,0.12)',
          borderRadius: 999,
          animation: 'floatY 4s ease-in-out infinite',
          animationDelay: `${i * 0.6}s`,
          boxShadow: '0 12px 30px rgba(0,0,0,0.35)',
          whiteSpace: 'nowrap',
        }}>
          <ChannelIcon channel={ch.id} size={14} glow/>
          <span style={{ fontSize: 12, color: 'var(--fg-muted)', fontFamily: 'var(--font-mono)', letterSpacing: '0.06em' }}>{ch.label}</span>
        </div>
      ))}
    </div>
  );
};

const Hero = ({ palette }) => {
  return (
    <section style={{ paddingTop: 0, paddingBottom: 0, minHeight: '100vh', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        {/* Hotel background image with transparency */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'url(assets/hotel-background.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
          opacity: 0.25,
          zIndex: 0,
        }}/>

        {/* Fallback SVG for older views */}
        <LobbyPlaceholder palette={palette}/>

        {/* Dark gradient overlay for readability */}
        <div style={{
          position: 'absolute', inset: 0,
          background: `linear-gradient(180deg, ${palette.bg}dd 0%, ${palette.bg}88 30%, ${palette.bg}f0 100%)`,
          zIndex: 1,
        }}/>

        {/* Glow effect from brand color */}
        <div style={{
          position: 'absolute',
          top: '20%', right: '15%',
          width: 400, height: 400,
          background: `radial-gradient(circle, ${palette.brand}15 0%, transparent 70%)`,
          borderRadius: '50%',
          filter: 'blur(100px)',
          zIndex: 1,
        }}/>
      </div>

      <Navbar/>

      <div className="container hero-container" style={{
        position: 'relative', zIndex: 2,
      }}>
        <div className="hero-grid">
          <div className="hero-copy">
            <div className="reveal in" style={{ marginBottom: 20 }}>
              <span className="eyebrow">
                CHAT HOTEL · O CONCIERGE QUE CONVERSA
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--brand)', boxShadow: '0 0 0 4px var(--glow)' }}/>
              </span>
            </div>

            <h1 className="display reveal in hero-headline">
              O hóspede conversa.<br/>
              <em>Ninguém percebe</em><br/>
              que não é humano.
            </h1>

            <p className="lead reveal in" style={{ marginBottom: 32 }}>
              Hospitalidade fina em todos os canais — sem botões, sem formulários, sem o tom robótico.
              Da primeira pergunta sobre a região ao envio do voucher, uma conversa só. Em qualquer idioma.
            </p>

            <div className="reveal in" style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 40 }}>
              <a href="#cta" className="btn btn-primary">Agendar demonstração <Icon name="arrow" size={14}/></a>
              <a href="#omnichannel" className="btn btn-ghost"><Icon name="play" size={12}/> Ver em ação</a>
            </div>

            <div className="reveal in hero-stats">
              <div>
                <div className="hero-stat-num">30</div>
                <div className="hero-stat-lbl">anos · grupo RVS</div>
              </div>
              <div>
                <div className="hero-stat-num">20</div>
                <div className="hero-stat-lbl">anos · CleverIA</div>
              </div>
              <div>
                <div className="hero-stat-num">24/7</div>
                <div className="hero-stat-lbl">concierge ativo</div>
              </div>
            </div>
          </div>

          <div className="hero-visual">
            {/* Ambient halo behind chat */}
            <div className="hero-halo"/>

            {/* Chat + rail of channels (desktop = side by side, mobile = stacked) */}
            <div className="hero-chat-wrap">
              <div className="hero-chat-rail-spacer"><ChannelRail/></div>
              <div className="hero-chat-frame"><HeroConversation/></div>
            </div>
          </div>
        </div>
      </div>

      <div className="hero-scroll-cue">
        <span/>
        SCROLL
      </div>

      <style>{`
        .hero-container {
          padding-top: clamp(110px, 14vh, 150px);
          padding-bottom: clamp(60px, 10vh, 110px);
          min-height: 100vh;
          display: flex;
          align-items: center;
        }
        .hero-grid {
          width: 100%;
          display: grid;
          grid-template-columns: minmax(0, 1.05fr) minmax(0, 1fr);
          gap: clamp(40px, 5vw, 80px);
          align-items: center;
        }
        .hero-headline {
          font-size: clamp(36px, 5.5vw, 80px);
          margin-bottom: 24px;
        }
        .hero-stats {
          display: flex;
          gap: clamp(20px, 4vw, 40px);
          flex-wrap: wrap;
          padding-top: 24px;
          border-top: 1px solid var(--line);
          color: var(--fg-muted);
        }
        .hero-stat-num {
          font-family: var(--font-display);
          font-size: clamp(24px, 2.4vw, 30px);
          color: var(--fg);
          font-style: italic;
          line-height: 1;
          margin-bottom: 6px;
        }
        .hero-stat-lbl {
          font-size: 11px;
          font-family: var(--font-mono);
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--fg-muted);
        }

        .hero-visual {
          position: relative;
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 560px;
        }
        .hero-halo {
          position: absolute;
          width: min(100%, 540px);
          aspect-ratio: 1;
          border-radius: 50%;
          background: radial-gradient(circle, var(--brand) 0%, transparent 60%);
          opacity: 0.18;
          filter: blur(60px);
          z-index: 0;
        }
        .hero-chat-wrap {
          position: relative;
          z-index: 2;
          display: grid;
          grid-template-columns: auto 1fr;
          gap: 24px;
          align-items: center;
          width: 100%;
          max-width: 600px;
        }
        .hero-chat-frame {
          width: 100%;
          min-width: 0;
        }

        .hero-scroll-cue {
          position: absolute;
          bottom: 24px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 2;
          color: var(--fg-muted);
          font-size: 10px;
          font-family: var(--font-mono);
          letter-spacing: 0.24em;
          text-transform: uppercase;
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .hero-scroll-cue span {
          width: 24px;
          height: 1px;
          background: var(--fg-muted);
        }

        /* Tablet — collapse to single column */
        @media (max-width: 1024px) {
          .hero-grid {
            grid-template-columns: 1fr;
            gap: 50px;
          }
          .hero-visual {
            min-height: auto;
            order: 2;
          }
          .hero-copy {
            order: 1;
          }
          .hero-chat-wrap {
            grid-template-columns: 1fr;
            gap: 20px;
            max-width: 460px;
          }
          .channel-rail {
            flex-direction: row !important;
            flex-wrap: wrap;
            justify-content: center;
            gap: 8px !important;
          }
        }

        /* Mobile */
        @media (max-width: 640px) {
          .hero-container {
            padding-top: 100px;
            padding-bottom: 60px;
          }
          .hero-headline { font-size: clamp(34px, 9vw, 44px) !important; }
          .hero-stats {
            gap: 18px;
            padding-top: 20px;
          }
          .hero-chat-frame > div {
            border-radius: 20px !important;
          }
          .hero-scroll-cue { display: none; }
          .channel-rail-item span {
            display: none;
          }
          .channel-rail-item {
            padding: 8px !important;
            border-radius: 50% !important;
          }
        }
      `}</style>
    </section>
  );
};

const Navbar = () => (
  <nav style={{
    position: 'absolute', top: 0, left: 0, right: 0,
    zIndex: 10, padding: '20px 0',
  }}>
    <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16 }}>
      <ChatHotelLogo size={26}/>
      <div className="nav-links" style={{ display: 'flex', gap: 28, alignItems: 'center' }}>
        <a href="#omnichannel" className="link-shimmer" style={{ fontSize: 13, color: 'var(--fg-muted)' }}>Omnichannel</a>
        <a href="#features" className="link-shimmer" style={{ fontSize: 13, color: 'var(--fg-muted)' }}>O que faz</a>
        <a href="#upsell" className="link-shimmer" style={{ fontSize: 13, color: 'var(--fg-muted)' }}>Upsells</a>
        <a href="#platform" className="link-shimmer" style={{ fontSize: 13, color: 'var(--fg-muted)' }}>Plataforma</a>
        <a href="#roi" className="link-shimmer" style={{ fontSize: 13, color: 'var(--fg-muted)' }}>ROI</a>
        <a href="#cta" className="btn btn-ghost" style={{ padding: '9px 16px', fontSize: 13 }}>Falar conosco</a>
      </div>
    </div>
    <style>{`
      @media (max-width: 960px) {
        nav .nav-links { display: none !important; }
      }
    `}</style>
  </nav>
);

window.Hero = Hero;
window.Navbar = Navbar;
window.HeroBubble = HeroBubble;
window.TypingBubble = TypingBubble;
