// Omnichannel section — channels converging into a single Chat Hotel core

const CHANNEL_MESSAGES = [
  { channel: 'whatsapp', name: 'Marina · WhatsApp', text: 'Vocês têm disponibilidade dia 22?', time: '14:32', delay: 200 },
  { channel: 'instagram', name: 'Léo · Instagram DM', text: 'Vi o post da suíte, ainda dá pra esse fim de semana?', time: '14:33', delay: 1300 },
  { channel: 'web', name: 'Visitante · Site', text: 'Como funciona o check-in antecipado?', time: '14:33', delay: 2600 },
  { channel: 'messenger', name: 'Carla · Messenger', text: 'Aceitam pets de pequeno porte?', time: '14:34', delay: 3900 },
  { channel: 'email', name: 'helena@…', text: 'Gostaria de agendar uma sessão de spa para o domingo.', time: '14:34', delay: 5200 },
];

const OmnichannelSection = ({ palette }) => {
  const [ref, inView] = useInView(0.2);
  const [visible, setVisible] = React.useState(0);

  React.useEffect(() => {
    if (!inView) return;
    let timers = [];
    const run = () => {
      setVisible(0);
      timers = CHANNEL_MESSAGES.map((m, i) => setTimeout(() => setVisible(i + 1), m.delay + 600));
    };
    run();
    const loop = setInterval(run, 8500);
    return () => { timers.forEach(clearTimeout); clearInterval(loop); };
  }, [inView]);

  return (
    <section id="omnichannel" ref={ref} style={{ background: 'var(--bg-elev)' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1.1fr)', gap: 80, alignItems: 'center' }} className="omni-grid">
          <div>
            <span className="eyebrow" style={{ marginBottom: 24, display: 'inline-flex' }}>O VERDADEIRO OMNICHANNEL</span>
            <h2 className="display" style={{ fontSize: 'clamp(40px, 4.5vw, 64px)', marginTop: 16, marginBottom: 24 }}>
              Cinco canais.<br/><em>Uma só</em> conversa.
            </h2>
            <p className="lead" style={{ marginBottom: 32 }}>
              O hóspede começa no Instagram, continua no WhatsApp, encerra por e-mail.
              O Chat Hotel mantém o contexto inteiro e sua equipe vê tudo num histórico unificado —
              sem repetir perguntas, sem cair em filas, sem perder o tom.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {[
                'WhatsApp Business · Instagram DM · Messenger',
                'Chat do site · E-mail · SMS',
                'Histórico unificado por hóspede',
                'Handoff humano em um clique, sem perder contexto',
              ].map((t, i) => (
                <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', color: 'var(--fg-muted)', fontSize: 14 }}>
                  <span style={{ color: 'var(--brand)', marginTop: 2, flexShrink: 0 }}><Icon name="check" size={16}/></span>
                  {t}
                </div>
              ))}
            </div>
          </div>

          <div className="omni-visual" style={{ position: 'relative' }}>
            <ConvergenceVisual palette={palette} visible={visible}/>
          </div>
        </div>
      </div>
      <style>{`
        @media (max-width: 1024px) {
          .omni-grid { grid-template-columns: 1fr !important; gap: 50px !important; }
          .omni-visual { min-height: auto !important; }
        }
      `}</style>
    </section>
  );
};

const ConvergenceVisual = ({ palette, visible }) => {
  return (
    <>
      {/* Desktop: orbital convergence */}
      <div className="conv-desktop" style={{ position: 'relative', width: '100%', aspectRatio: '1 / 0.95', maxHeight: 600 }}>
        <div style={{
          position: 'absolute', top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 130, height: 130,
          borderRadius: 24,
          background: `linear-gradient(135deg, ${palette.brand}, ${palette.brandSoft})`,
          display: 'grid', placeItems: 'center',
          boxShadow: `0 0 0 1px ${palette.line}, 0 0 0 8px ${palette.bg}, 0 0 0 9px ${palette.line}, 0 0 80px ${palette.glow}`,
          zIndex: 5,
        }}>
          <ChatHotelMark size={56} color={palette.bg}/>
          <div style={{
            position: 'absolute', inset: -28,
            border: `1px dashed ${palette.line}`,
            borderRadius: 32,
            animation: 'orbit 30s linear infinite',
          }}/>
        </div>

        {CHANNEL_MESSAGES.map((msg, i) => {
          const positions = [
            { top: 0, left: 0 },
            { top: 0, right: 0 },
            { top: '50%', right: 0, transform: 'translateY(-50%)' },
            { bottom: 0, right: 0 },
            { bottom: 0, left: 0 },
          ];
          const pos = positions[i];
          const isVisible = i < visible;
          return (
            <div key={i} style={{
              position: 'absolute', ...pos,
              width: 'min(230px, 38%)',
              opacity: isVisible ? 1 : 0,
              transform: `${pos.transform || ''} translateY(${isVisible ? 0 : 16}px)`,
              transition: 'opacity 0.7s, transform 0.7s cubic-bezier(0.2,0.8,0.2,1)',
              zIndex: 4,
            }}>
              <ChannelMessageCard msg={msg}/>
            </div>
          );
        })}

        <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', zIndex: 1, pointerEvents: 'none' }}>
          <defs>
            <linearGradient id="line-grad" x1="0" x2="1" y1="0" y2="0">
              <stop offset="0%" stopColor={palette.brand} stopOpacity="0"/>
              <stop offset="50%" stopColor={palette.brand} stopOpacity="0.5"/>
              <stop offset="100%" stopColor={palette.brand} stopOpacity="0"/>
            </linearGradient>
          </defs>
          {[
            { x1: '15%', y1: '12%', x2: '50%', y2: '50%' },
            { x1: '85%', y1: '12%', x2: '50%', y2: '50%' },
            { x1: '88%', y1: '50%', x2: '50%', y2: '50%' },
            { x1: '85%', y1: '88%', x2: '50%', y2: '50%' },
            { x1: '15%', y1: '88%', x2: '50%', y2: '50%' },
          ].map((l, i) => (
            <line key={i} {...l} stroke="url(#line-grad)" strokeWidth="1" strokeDasharray="3 4"
              style={{ opacity: i < visible ? 1 : 0, transition: 'opacity 0.8s' }}/>
          ))}
        </svg>
      </div>

      {/* Mobile: stacked feed converging into core */}
      <div className="conv-mobile" style={{ display: 'none' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
          {CHANNEL_MESSAGES.map((msg, i) => {
            const isVisible = i < visible;
            return (
              <div key={i} style={{
                opacity: isVisible ? 1 : 0,
                transform: `translateY(${isVisible ? 0 : 12}px)`,
                transition: 'opacity 0.6s, transform 0.6s',
              }}>
                <ChannelMessageCard msg={msg}/>
              </div>
            );
          })}
        </div>
        {/* arrow + core */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14 }}>
          <div style={{ width: 1, height: 40, background: `linear-gradient(180deg, transparent, ${palette.brand})` }}/>
          <div style={{
            width: 110, height: 110,
            borderRadius: 22,
            background: `linear-gradient(135deg, ${palette.brand}, ${palette.brandSoft})`,
            display: 'grid', placeItems: 'center',
            boxShadow: `0 0 0 1px ${palette.line}, 0 0 0 6px ${palette.bg}, 0 0 0 7px ${palette.line}, 0 0 60px ${palette.glow}`,
          }}>
            <ChatHotelMark size={48} color={palette.bg}/>
          </div>
          <div style={{ fontSize: 11, fontFamily: 'var(--font-mono)', color: 'var(--fg-muted)', letterSpacing: '0.14em', textTransform: 'uppercase' }}>uma só conversa</div>
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .conv-desktop { display: none !important; }
          .conv-mobile { display: block !important; }
        }
      `}</style>
    </>
  );
};

const ChannelMessageCard = ({ msg }) => (
  <div style={{
    background: 'var(--surface)',
    border: '1px solid var(--line)',
    borderRadius: 14,
    padding: '12px 14px',
    boxShadow: '0 12px 30px rgba(0,0,0,0.3)',
  }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
      <ChannelIcon channel={msg.channel} size={12} glow/>
      <div style={{ fontSize: 11, fontFamily: 'var(--font-mono)', color: 'var(--fg-muted)', letterSpacing: '0.04em', flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{msg.name}</div>
    </div>
    <div style={{ fontSize: 13, lineHeight: 1.45 }}>{msg.text}</div>
    <div style={{ fontSize: 10, color: 'var(--fg-subtle)', marginTop: 6, fontFamily: 'var(--font-mono)' }}>{msg.time}</div>
  </div>
);

window.OmnichannelSection = OmnichannelSection;
