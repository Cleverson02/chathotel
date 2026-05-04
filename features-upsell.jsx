// Features + Upsell sections

const FEATURES = [
  { icon: 'chat', title: 'Linguagem natural, sem botões', desc: 'Conversa como um concierge faria. Em PT, EN, ES, FR, IT e mais 12 idiomas — alternando no meio da frase se preciso.' },
  { icon: 'bed', title: 'Reserva ponta a ponta', desc: 'Verifica disponibilidade, apresenta opções com fotos e tarifas, conduz ao fechamento, envia link de pagamento e dispara voucher por e-mail.' },
  { icon: 'spa', title: 'Upsells autônomos', desc: 'Oferece spa, restaurante e experiências com inteligência de momento. Agenda direto na agenda do terapeuta ou do maître.' },
  { icon: 'globe', title: 'Multilíngue nativo', desc: 'Não traduz: pensa em cada idioma. Hóspede internacional sente que está falando com alguém da casa.' },
  { icon: 'clock', title: 'Disponível 24/7', desc: 'Madrugada, feriado, alta temporada. Nunca cansa, nunca repete o tom, nunca perde a paciência.' },
  { icon: 'user', title: 'Handoff humano fluido', desc: 'Sua equipe acompanha em tempo real e assume qualquer conversa em um clique. Sem fricção, sem o hóspede perceber.' },
];

const FeaturesSection = () => (
  <section id="features">
    <div className="container">
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, alignItems: 'end', marginBottom: 80 }} className="feat-head">
        <div>
          <span className="eyebrow" style={{ marginBottom: 24, display: 'inline-flex' }}>O QUE O CHAT HOTEL FAZ</span>
          <h2 className="display" style={{ fontSize: 'clamp(40px, 4.5vw, 64px)', marginTop: 16 }}>
            Um <em>maître d'hôtel</em><br/>digital. Sem o uniforme.
          </h2>
        </div>
        <p className="lead" style={{ alignSelf: 'end' }}>
          Não é um chatbot, não é um SAC automatizado. É hospitalidade fina escrita em texto —
          treinada na sua marca, no seu tom, nos seus rituais.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 1, background: 'var(--line)', border: '1px solid var(--line)', borderRadius: 20, overflow: 'hidden' }} className="feat-grid">
        {FEATURES.map((f, i) => (
          <div key={i} style={{
            background: 'var(--bg)',
            padding: '40px 32px',
            transition: 'background 0.3s',
          }}
          onMouseEnter={e => e.currentTarget.style.background = 'var(--surface)'}
          onMouseLeave={e => e.currentTarget.style.background = 'var(--bg)'}>
            <div style={{
              width: 44, height: 44, borderRadius: 12,
              background: 'var(--glow)',
              border: '1px solid rgba(212, 179, 106, 0.25)',
              display: 'grid', placeItems: 'center',
              color: 'var(--brand)', marginBottom: 24,
            }}>
              <Icon name={f.icon} size={20}/>
            </div>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 24, fontWeight: 400, lineHeight: 1.2, marginBottom: 12, letterSpacing: '-0.01em' }}>
              {f.title}
            </h3>
            <p style={{ color: 'var(--fg-muted)', fontSize: 14, lineHeight: 1.6 }}>{f.desc}</p>
          </div>
        ))}
      </div>
    </div>
    <style>{`
      @media (max-width: 1024px) {
        .feat-head { grid-template-columns: 1fr !important; gap: 24px !important; margin-bottom: 56px !important; }
        .feat-grid { grid-template-columns: 1fr 1fr !important; }
      }
      @media (max-width: 640px) {
        .feat-grid { grid-template-columns: 1fr !important; }
      }
    `}</style>
  </section>
);

const UPSELL_SCRIPT = [
  { side: 'agent', text: 'Helena, posso sugerir? Reservei já a Suíte Panorâmica. Para coroar a estadia, temos um ritual de spa de 80 minutos com aromaterapia. Tenho dois horários ideais para você no domingo.', time: '14:38', delay: 800 },
  { side: 'guest', text: 'Você lê pensamentos. Quais horários?', time: '14:39', delay: 4500 },
  { side: 'agent', text: '11:00 com a terapeuta Júlia, ou 16:30 com o Marcos. Qual combina?', time: '14:39', delay: 6500 },
  { side: 'guest', text: '16:30 — vou aproveitar a manhã na piscina 🌿', time: '14:40', delay: 9500 },
  { side: 'typing', delay: 11200 },
  { side: 'agent', text: 'Reservado. Coloquei na agenda do Marcos e adicionei ao seu itinerário. Posso reservar uma mesa no restaurante para o jantar de domingo também?', time: '14:40', delay: 12500 },
];

const UpsellSection = () => {
  const [ref, inView] = useInView(0.2);
  const [step, setStep] = React.useState(0);

  React.useEffect(() => {
    if (!inView) return;
    let timers = [];
    const run = () => {
      setStep(0);
      timers = UPSELL_SCRIPT.map((m, i) => setTimeout(() => setStep(i + 1), m.delay));
    };
    run();
    const loop = setInterval(run, 17000);
    return () => { timers.forEach(clearTimeout); clearInterval(loop); };
  }, [inView]);

  return (
    <section id="upsell" ref={ref} style={{ background: 'var(--bg-elev)' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: 80 }}>
          <span className="eyebrow" style={{ marginBottom: 24, display: 'inline-flex' }}>UPSELLS AUTÔNOMOS</span>
          <h2 className="display" style={{ fontSize: 'clamp(40px, 4.8vw, 72px)', marginTop: 16, marginBottom: 24, maxWidth: 900, marginLeft: 'auto', marginRight: 'auto' }}>
            <em>Spa</em> agendado.<br/>Mesa reservada. Sem ninguém levantar.
          </h2>
          <p className="lead" style={{ margin: '0 auto' }}>
            Identifica o momento certo, oferece o serviço, fecha a venda e
            agenda direto na agenda do terapeuta ou do maître. Receita a mais sem custo operacional.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32, alignItems: 'stretch' }} className="upsell-grid">
          <div style={{
            background: 'var(--surface)', border: '1px solid var(--line)',
            borderRadius: 20, padding: 24,
            display: 'flex', flexDirection: 'column', minHeight: 520,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, paddingBottom: 16, borderBottom: '1px solid var(--line)', marginBottom: 16 }}>
              <ChannelIcon channel="whatsapp" size={14} glow/>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 500 }}>Helena Vasconcelos</div>
                <div style={{ fontSize: 11, color: 'var(--fg-muted)', fontFamily: 'var(--font-mono)' }}>hóspede · suíte 412</div>
              </div>
              <span style={{ fontSize: 10, fontFamily: 'var(--font-mono)', color: 'var(--brand)', padding: '4px 10px', background: 'var(--glow)', borderRadius: 20, border: '1px solid rgba(212,179,106,0.3)' }}>UPSELL ATIVO</span>
            </div>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
              {UPSELL_SCRIPT.slice(0, step).map((msg, i) => {
                if (msg.side === 'typing') return <div key={i} className="bubble-enter"><TypingBubble/></div>;
                return <div key={i} className="bubble-enter"><Bubble {...msg} status={msg.side === 'guest'}/></div>;
              })}
            </div>
          </div>

          <TherapistAgenda activeBooking={step >= 6}/>
        </div>
      </div>
      <style>{`
        @media (max-width: 1024px) { .upsell-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
};

const TherapistAgenda = ({ activeBooking }) => {
  const slots = [
    { time: '09:00', label: 'Yoga matinal · Sra. Ribeiro', booked: true },
    { time: '10:30', label: 'Massagem relaxante · Sr. Tanaka', booked: true },
    { time: '11:00', label: '', booked: false },
    { time: '12:30', label: 'Almoço', booked: false, locked: true },
    { time: '14:00', label: 'Aromaterapia · Sra. Mendes', booked: true },
    { time: '15:30', label: '', booked: false },
    { time: '16:30', label: '', booked: false, target: true },
    { time: '18:00', label: '', booked: false },
  ];

  return (
    <div style={{ background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: 20, padding: 24, display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'var(--accent)', display: 'grid', placeItems: 'center', color: 'var(--bg)', fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 18 }}>M</div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 14, fontWeight: 500 }}>Marcos Faria</div>
          <div style={{ fontSize: 11, color: 'var(--fg-muted)', fontFamily: 'var(--font-mono)', letterSpacing: '0.04em' }}>terapeuta · spa</div>
        </div>
        <div style={{ fontSize: 11, color: 'var(--fg-muted)', fontFamily: 'var(--font-mono)' }}>DOM · 18 mai</div>
      </div>

      <div style={{ marginTop: 20, display: 'flex', flexDirection: 'column', gap: 6 }}>
        {slots.map((s, i) => {
          const isTargetActive = s.target && activeBooking;
          return (
            <div key={i} style={{
              display: 'flex', alignItems: 'center', gap: 16,
              padding: '12px 14px', borderRadius: 10,
              background: isTargetActive ? 'var(--glow)' : s.booked ? 'rgba(255,255,255,0.02)' : 'transparent',
              border: isTargetActive ? '1px solid var(--brand)' : '1px solid transparent',
              transition: 'all 0.5s cubic-bezier(0.2,0.8,0.2,1)',
              transform: isTargetActive ? 'scale(1.02)' : 'scale(1)',
            }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--fg-muted)', width: 50, letterSpacing: '0.04em' }}>{s.time}</div>
              <div style={{ flex: 1, fontSize: 13, color: s.booked ? 'var(--fg)' : (isTargetActive ? 'var(--brand)' : 'var(--fg-subtle)'), fontStyle: s.locked ? 'italic' : 'normal' }}>
                {isTargetActive ? 'Helena Vasconcelos · Aromaterapia 80min' : (s.label || (s.locked ? 'Pausa' : 'Disponível'))}
              </div>
              {s.booked && <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--accent)' }}/>}
              {isTargetActive && <div style={{ fontSize: 10, fontFamily: 'var(--font-mono)', letterSpacing: '0.1em', color: 'var(--brand)', textTransform: 'uppercase' }}>← agora</div>}
            </div>
          );
        })}
      </div>

      <div style={{ marginTop: 20, paddingTop: 20, borderTop: '1px solid var(--line)', display: 'flex', justifyContent: 'space-between', fontSize: 11, fontFamily: 'var(--font-mono)', color: 'var(--fg-muted)', letterSpacing: '0.06em' }}>
        <span>R$ 4.280 reservado hoje</span>
        <span>+ R$ 480 agora</span>
      </div>
    </div>
  );
};

window.FeaturesSection = FeaturesSection;
window.UpsellSection = UpsellSection;
