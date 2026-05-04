// Platform preview — omnichannel inbox

const INBOX_CONVOS = [
  { name: 'Marina Albuquerque', channel: 'whatsapp', preview: 'Adoraria. Será uma ocasião especial 🥂', time: '14:33', unread: 0, ai: true, active: true },
  { name: 'Léo Castanheira', channel: 'instagram', preview: 'A suíte panorâmica ainda está disponível?', time: '14:31', unread: 2, ai: true },
  { name: 'Helena Vasconcelos', channel: 'whatsapp', preview: 'Você lê pensamentos. Quais horários?', time: '14:29', unread: 0, ai: true, upsell: true },
  { name: 'Visitante #4821', channel: 'web', preview: 'Como funciona o check-in antecipado?', time: '14:28', unread: 1, ai: true },
  { name: 'Carla Ribeiro', channel: 'messenger', preview: 'Aceitam pets de pequeno porte?', time: '14:24', unread: 0, ai: true },
  { name: 'Tomás Berger', channel: 'whatsapp', preview: 'Vielen Dank! See you Friday.', time: '13:42', unread: 0, ai: true, lang: 'DE/EN' },
  { name: 'Sofia Marconi', channel: 'instagram', preview: 'Grazie mille per le foto!', time: '12:55', unread: 0, ai: true, lang: 'IT' },
];

const ACTIVE_MSGS = [
  { side: 'guest', text: 'Olá! Estou planejando uma escapada para o feriado. Vocês têm disponibilidade no fim de semana de 22 a 24?', time: '14:32' },
  { side: 'agent', text: 'Que bom receber você por aqui, Marina. Acabei de verificar — temos sim disponibilidade. Posso te mostrar duas opções com a vista que combina com você?', time: '14:32' },
  { side: 'guest', text: 'Adoraria. Será uma ocasião especial 🥂', time: '14:33' },
];

const PlatformSection = () => (
  <section id="platform">
    <div className="container">
      <div style={{ textAlign: 'center', marginBottom: 60, maxWidth: 800, margin: '0 auto 60px' }}>
        <span className="eyebrow" style={{ marginBottom: 24, display: 'inline-flex' }}>PLATAFORMA OMNICHANNEL</span>
        <h2 className="display" style={{ fontSize: 'clamp(40px, 4.8vw, 68px)', marginTop: 16, marginBottom: 24 }}>
          Sua equipe assume<br/>quando <em>quiser</em>.
        </h2>
        <p className="lead" style={{ margin: '0 auto' }}>
          Todas as conversas — IA e humanas — em um só lugar. Acompanhe ao vivo, intervenha em um clique.
        </p>
      </div>

      <div style={{ background: 'var(--bg-elev)', border: '1px solid var(--line)', borderRadius: 24, overflow: 'hidden', boxShadow: '0 60px 120px rgba(0,0,0,0.5)' }}>
        <div style={{ padding: '12px 18px', borderBottom: '1px solid var(--line)', display: 'flex', alignItems: 'center', gap: 14, background: 'var(--surface)' }}>
          <div style={{ display: 'flex', gap: 6 }}>
            <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#FF5F57' }}/>
            <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#FEBC2E' }}/>
            <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#28C840' }}/>
          </div>
          <div style={{ flex: 1, textAlign: 'center', fontSize: 11, color: 'var(--fg-subtle)', fontFamily: 'var(--font-mono)', letterSpacing: '0.06em' }}>app.chathotel.com.br / hotel-vista-bela / inbox</div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '64px 320px 1fr 280px', minHeight: 580 }} className="inbox-grid">
          <div style={{ background: 'var(--surface)', borderRight: '1px solid var(--line)', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px 0', gap: 8 }}>
            <ChatHotelMark size={32}/>
            <div style={{ height: 12 }}/>
            {[{n:'chat', a:true},{n:'bed'},{n:'spa'},{n:'globe'},{n:'user'}].map((it, i) => (
              <div key={i} style={{
                width: 36, height: 36, borderRadius: 10,
                display: 'grid', placeItems: 'center',
                color: it.a ? 'var(--brand)' : 'var(--fg-subtle)',
                background: it.a ? 'var(--glow)' : 'transparent',
                border: it.a ? '1px solid rgba(212,179,106,0.25)' : '1px solid transparent',
              }}>
                <Icon name={it.n} size={16}/>
              </div>
            ))}
          </div>

          <div style={{ borderRight: '1px solid var(--line)', display: 'flex', flexDirection: 'column' }}>
            <div style={{ padding: '20px 18px 14px', borderBottom: '1px solid var(--line)' }}>
              <div style={{ fontSize: 16, fontFamily: 'var(--font-display)', fontWeight: 500, marginBottom: 4 }}>Inbox</div>
              <div style={{ fontSize: 11, fontFamily: 'var(--font-mono)', color: 'var(--fg-muted)', letterSpacing: '0.04em' }}>12 ATIVAS · IA RESPONDENDO</div>
            </div>
            <div style={{ flex: 1, overflow: 'auto' }}>
              {INBOX_CONVOS.map((c, i) => (
                <div key={i} style={{
                  padding: '14px 18px', borderBottom: '1px solid var(--line)',
                  background: c.active ? 'var(--glow)' : 'transparent',
                  borderLeft: c.active ? '2px solid var(--brand)' : '2px solid transparent',
                  display: 'flex', gap: 12, alignItems: 'flex-start',
                }}>
                  <div style={{ position: 'relative', flexShrink: 0 }}>
                    <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'linear-gradient(135deg, var(--accent), var(--surface))', display: 'grid', placeItems: 'center', fontSize: 13, fontFamily: 'var(--font-display)', fontStyle: 'italic', color: 'var(--bg)' }}>
                      {c.name.split(/[\s@]/)[0][0].toUpperCase()}
                    </div>
                    <div style={{ position: 'absolute', bottom: -4, right: -4, transform: 'scale(0.65)' }}>
                      <ChannelIcon channel={c.channel} size={10} glow/>
                    </div>
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 3, gap: 8 }}>
                      <div style={{ fontSize: 13, fontWeight: 500, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{c.name}</div>
                      <div style={{ fontSize: 10, color: 'var(--fg-muted)', fontFamily: 'var(--font-mono)', flexShrink: 0 }}>{c.time}</div>
                    </div>
                    <div style={{ fontSize: 12, color: 'var(--fg-muted)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', marginBottom: 6 }}>{c.preview}</div>
                    <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                      {c.ai && <span style={{ fontSize: 9, fontFamily: 'var(--font-mono)', color: 'var(--brand)', padding: '2px 7px', background: 'var(--glow)', borderRadius: 20, letterSpacing: '0.06em' }}>IA</span>}
                      {c.upsell && <span style={{ fontSize: 9, fontFamily: 'var(--font-mono)', color: 'var(--accent)', padding: '2px 7px', background: 'rgba(91,143,185,0.12)', borderRadius: 20, letterSpacing: '0.06em' }}>UPSELL</span>}
                      {c.lang && <span style={{ fontSize: 9, fontFamily: 'var(--font-mono)', color: 'var(--fg-muted)', padding: '2px 7px', background: 'rgba(255,255,255,0.04)', borderRadius: 20 }}>{c.lang}</span>}
                      {c.unread > 0 && <span style={{ fontSize: 9, fontFamily: 'var(--font-mono)', color: 'var(--bg)', padding: '2px 7px', background: 'var(--brand)', borderRadius: 20, fontWeight: 600 }}>{c.unread}</span>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ padding: '16px 22px', borderBottom: '1px solid var(--line)', display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'linear-gradient(135deg, var(--accent), var(--surface))', display: 'grid', placeItems: 'center', fontSize: 13, fontFamily: 'var(--font-display)', fontStyle: 'italic', color: 'var(--bg)' }}>M</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 500 }}>Marina Albuquerque</div>
                <div style={{ fontSize: 11, color: 'var(--fg-muted)', fontFamily: 'var(--font-mono)', display: 'flex', gap: 8 }}>
                  <span>+55 11 99XXX-1834</span><span>·</span><span style={{ color: 'var(--brand)' }}>IA conduzindo</span>
                </div>
              </div>
              <button className="btn btn-ghost" style={{ fontSize: 12, padding: '8px 14px' }}>Assumir</button>
            </div>
            <div style={{ flex: 1, padding: 22, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
              {ACTIVE_MSGS.map((m, i) => <Bubble key={i} {...m}/>)}
              <div style={{ padding: '6px 0', display: 'flex', justifyContent: 'flex-start' }}>
                <div style={{ background: 'var(--glow)', border: '1px dashed rgba(212,179,106,0.3)', padding: '8px 12px', borderRadius: 10, fontSize: 11, color: 'var(--brand)', fontFamily: 'var(--font-mono)', letterSpacing: '0.04em', display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span className="typing-dot" style={{ background: 'var(--brand)' }}/>
                  IA preparando resposta — sugestões de quartos
                </div>
              </div>
            </div>
          </div>

          <div style={{ background: 'var(--surface)', borderLeft: '1px solid var(--line)', padding: 22, fontSize: 12 }}>
            <div style={{ fontSize: 10, fontFamily: 'var(--font-mono)', color: 'var(--fg-muted)', letterSpacing: '0.12em', marginBottom: 12 }}>HÓSPEDE</div>
            <div style={{ marginBottom: 18 }}>
              <div style={{ fontSize: 16, fontWeight: 500, marginBottom: 4 }}>Marina Albuquerque</div>
              <div style={{ color: 'var(--fg-muted)', fontSize: 12 }}>3ª estadia · cliente desde 2023</div>
            </div>
            <div style={{ borderTop: '1px solid var(--line)', paddingTop: 16, marginBottom: 16 }}>
              <div style={{ fontSize: 10, fontFamily: 'var(--font-mono)', color: 'var(--fg-muted)', letterSpacing: '0.12em', marginBottom: 10 }}>PREFERÊNCIAS</div>
              {['Vista para o jardim', 'Travesseiro de pena', 'Café sem lactose', 'Aniversário · 14 nov'].map((p, i) => (
                <div key={i} style={{ fontSize: 12, color: 'var(--fg-muted)', padding: '4px 0' }}>· {p}</div>
              ))}
            </div>
            <div style={{ borderTop: '1px solid var(--line)', paddingTop: 16 }}>
              <div style={{ fontSize: 10, fontFamily: 'var(--font-mono)', color: 'var(--fg-muted)', letterSpacing: '0.12em', marginBottom: 10 }}>HISTÓRICO IA</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {[
                  { c: 'instagram', t: 'Curtiu post da suíte', d: 'há 4d' },
                  { c: 'web', t: 'Visitou tarifas', d: 'há 2d' },
                  { c: 'whatsapp', t: 'Iniciou conversa', d: 'agora' },
                ].map((h, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 11, color: 'var(--fg-muted)' }}>
                    <ChannelIcon channel={h.c} size={10} glow/>
                    <span style={{ flex: 1 }}>{h.t}</span>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10 }}>{h.d}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <style>{`
      @media (max-width: 1100px) {
        .inbox-grid { grid-template-columns: 60px 280px 1fr !important; }
        .inbox-grid > div:last-child { display: none !important; }
      }
      @media (max-width: 760px) {
        .inbox-grid { grid-template-columns: 1fr !important; }
        .inbox-grid > div:nth-child(1), .inbox-grid > div:nth-child(2) { display: none !important; }
      }
    `}</style>
  </section>
);

window.PlatformSection = PlatformSection;
