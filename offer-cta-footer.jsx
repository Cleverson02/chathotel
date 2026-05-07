// ROI Calculator + Launch offer + CTA + Footer

const ROICalculator = () => {
  const [rooms, setRooms] = React.useState(80);
  const [adr, setAdr] = React.useState(680);
  const [conversions, setConversions] = React.useState(15);

  // Conservative model:
  // - Without Chat Hotel: a hotel converts a baseline % of inbound contacts.
  // - With Chat Hotel: 24/7 + zero friction → +X% conversion lift.
  // - Plus upsell autônomo: ticket médio +12%.
  const monthlyContacts = rooms * 18; // ~18 inbound contacts per room/month average
  const liftPct = 0.32; // +32% conversion lift (industry conservative for 24/7 + humanized)
  const additionalReservations = Math.round(monthlyContacts * (conversions / 100) * liftPct);
  const additionalRevenue = additionalReservations * adr * 1.8; // avg 1.8 nights
  const upsellRevenue = Math.round(additionalReservations * 180); // avg upsell per booking
  const totalMonthly = additionalRevenue + upsellRevenue;
  const yearly = totalMonthly * 12;

  const fmt = (n) => 'R$ ' + Math.round(n).toLocaleString('pt-BR');

  return (
    <section id="roi" style={{ background: 'var(--bg-elev)', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: '-20%', left: '-10%', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, var(--brand), transparent 60%)', filter: 'blur(80px)', opacity: 0.15 }}/>
      <div className="container" style={{ position: 'relative' }}>
        <div style={{ textAlign: 'center', marginBottom: 60, maxWidth: 760, margin: '0 auto 60px' }}>
          <span className="eyebrow" style={{ marginBottom: 24, display: 'inline-flex' }}>CALCULADORA DE RETORNO</span>
          <h2 className="display" style={{ fontSize: 'clamp(40px, 4.8vw, 64px)', marginTop: 16, marginBottom: 24 }}>
            Quanto o Chat Hotel<br/><em>devolve</em> ao seu hotel.
          </h2>
          <p className="lead" style={{ margin: '0 auto' }}>
            Estimativa baseada em ganho de conversão 24/7 + upsell autônomo. Ajuste os parâmetros do seu hotel.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32, alignItems: 'stretch' }} className="roi-grid">
          <div style={{ background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: 20, padding: 40 }}>
            <div style={{ fontSize: 11, fontFamily: 'var(--font-mono)', color: 'var(--fg-muted)', letterSpacing: '0.14em', marginBottom: 24 }}>SEU HOTEL</div>

            <Slider label="Quartos" value={rooms} setValue={setRooms} min={10} max={300} step={5} unit=""/>
            <Slider label="Diária média (ADR)" value={adr} setValue={setAdr} min={200} max={3000} step={20} unit="R$ " formatter={v => 'R$ ' + v.toLocaleString('pt-BR')}/>
            <Slider label="Conversão atual" value={conversions} setValue={setConversions} min={3} max={40} step={1} unit="%" formatter={v => v + '%'}/>

            <div style={{ marginTop: 32, paddingTop: 24, borderTop: '1px solid var(--line)', fontSize: 12, color: 'var(--fg-muted)', fontFamily: 'var(--font-mono)', letterSpacing: '0.06em', lineHeight: 1.7 }}>
              CONTATOS ESTIMADOS / MÊS · {monthlyContacts.toLocaleString('pt-BR')}<br/>
              GANHO DE CONVERSÃO APLICADO · +32%<br/>
              UPSELL MÉDIO · R$ 180 / RESERVA
            </div>
          </div>

          <div style={{ background: 'linear-gradient(135deg, var(--surface), var(--bg-elev))', border: '1px solid var(--brand)', borderRadius: 20, padding: 40, position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: 0, right: 0, width: 200, height: 200, background: 'radial-gradient(circle at 100% 0%, var(--glow), transparent 70%)' }}/>
            <div style={{ position: 'relative' }}>
              <div style={{ fontSize: 11, fontFamily: 'var(--font-mono)', color: 'var(--brand)', letterSpacing: '0.14em', marginBottom: 24 }}>RECEITA INCREMENTAL ESTIMADA</div>

              <div style={{ marginBottom: 28 }}>
                <div style={{ fontSize: 12, color: 'var(--fg-muted)', fontFamily: 'var(--font-mono)', letterSpacing: '0.06em', marginBottom: 8 }}>POR MÊS</div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(40px, 5vw, 64px)', fontStyle: 'italic', color: 'var(--brand)', lineHeight: 1, fontVariantNumeric: 'tabular-nums' }}>
                  {fmt(totalMonthly)}
                </div>
              </div>

              <div style={{ marginBottom: 28 }}>
                <div style={{ fontSize: 12, color: 'var(--fg-muted)', fontFamily: 'var(--font-mono)', letterSpacing: '0.06em', marginBottom: 8 }}>POR ANO</div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(32px, 4vw, 48px)', color: 'var(--fg)', lineHeight: 1, fontVariantNumeric: 'tabular-nums' }}>
                  {fmt(yearly)}
                </div>
              </div>

              <div style={{ paddingTop: 24, borderTop: '1px solid var(--line)', display: 'flex', flexDirection: 'column', gap: 10 }}>
                <Row label="Reservas a mais / mês" value={`+${additionalReservations}`}/>
                <Row label="Receita por reservas extras" value={fmt(additionalRevenue)}/>
                <Row label="Receita de upsells (spa/restaurante)" value={fmt(upsellRevenue)}/>
              </div>

              <a href="#cta" className="btn btn-primary" style={{ marginTop: 28, width: '100%', justifyContent: 'center' }}>
                Quero capturar essa receita <Icon name="arrow" size={14}/>
              </a>
            </div>
          </div>
        </div>

        <div style={{ marginTop: 24, fontSize: 11, color: 'var(--fg-subtle)', fontFamily: 'var(--font-mono)', letterSpacing: '0.04em', textAlign: 'center' }}>
          · Estimativas conservadoras baseadas em médias de mercado. Cada hotel é um caso.
        </div>
      </div>
      <style>{`
        @media (max-width: 1024px) { .roi-grid { grid-template-columns: 1fr !important; gap: 24px !important; } }
        @media (max-width: 640px) { .roi-grid > div { padding: 28px !important; } }
      `}</style>
    </section>
  );
};

const Slider = ({ label, value, setValue, min, max, step, formatter }) => (
  <div style={{ marginBottom: 24 }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
      <span style={{ fontSize: 13, color: 'var(--fg-muted)' }}>{label}</span>
      <span style={{ fontSize: 16, fontFamily: 'var(--font-display)', fontStyle: 'italic', color: 'var(--brand)', fontVariantNumeric: 'tabular-nums' }}>
        {formatter ? formatter(value) : value}
      </span>
    </div>
    <input type="range" min={min} max={max} step={step} value={value}
      onChange={e => setValue(Number(e.target.value))}
      style={{
        width: '100%', appearance: 'none', height: 4,
        background: `linear-gradient(to right, var(--brand) 0%, var(--brand) ${((value-min)/(max-min))*100}%, var(--line) ${((value-min)/(max-min))*100}%, var(--line) 100%)`,
        borderRadius: 4, outline: 'none', cursor: 'pointer',
      }}/>
    <style>{`
      input[type="range"]::-webkit-slider-thumb {
        appearance: none; width: 18px; height: 18px;
        background: var(--brand); border: 2px solid var(--bg);
        border-radius: 50%; cursor: pointer;
        box-shadow: 0 0 0 1px var(--brand), 0 4px 12px var(--glow);
      }
      input[type="range"]::-moz-range-thumb {
        width: 18px; height: 18px; background: var(--brand);
        border: 2px solid var(--bg); border-radius: 50%; cursor: pointer;
      }
    `}</style>
  </div>
);

const Row = ({ label, value }) => (
  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13 }}>
    <span style={{ color: 'var(--fg-muted)' }}>{label}</span>
    <span style={{ color: 'var(--fg)', fontVariantNumeric: 'tabular-nums', fontFamily: 'var(--font-mono)' }}>{value}</span>
  </div>
);

const LaunchOffer = () => (
  <section style={{ position: 'relative', overflow: 'hidden' }}>
    <div className="container" style={{ position: 'relative', zIndex: 1 }}>
      <div style={{ background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: 28, padding: 'clamp(40px, 6vw, 80px)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: 0, right: 0, width: 300, height: 300, background: 'radial-gradient(circle at 100% 0%, var(--glow), transparent 70%)' }}/>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, alignItems: 'center', position: 'relative' }} className="offer-grid">
          <div>
            <span className="eyebrow" style={{ marginBottom: 24, display: 'inline-flex' }}>
              OFERTA DE LANÇAMENTO · MAIO
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--brand)', boxShadow: '0 0 0 4px var(--glow)' }}/>
            </span>
            <h2 className="display" style={{ fontSize: 'clamp(36px, 4.2vw, 56px)', marginTop: 16, marginBottom: 24 }}>
              <em>Implantação</em> por nossa conta.
            </h2>
            <p className="lead" style={{ marginBottom: 32 }}>
              Para hotéis que ativarem o Chat Hotel ainda em maio, a taxa de implantação de <strong style={{ color: 'var(--fg)' }}>R$ 1.500</strong> fica
              por nossa conta. Treinamos a IA na sua marca, conectamos seus canais e configuramos os fluxos de upsell.
            </p>
            <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
              <a href="#cta" className="btn btn-primary">Garantir condição de maio <Icon name="arrow" size={14}/></a>
              <a href="#roi" className="btn btn-ghost">Ver retorno estimado</a>
            </div>
            <div style={{ marginTop: 28, fontSize: 12, color: 'var(--fg-subtle)', fontFamily: 'var(--font-mono)', letterSpacing: '0.04em' }}>
              · ativação em até 14 dias · sem fidelidade nos 30 primeiros dias
            </div>
          </div>

          <div style={{ background: 'var(--bg)', border: '1px solid var(--line)', borderRadius: 18, padding: 32, position: 'relative' }} className="tech-corner">
            <div style={{ fontSize: 11, fontFamily: 'var(--font-mono)', color: 'var(--fg-muted)', letterSpacing: '0.14em', marginBottom: 8 }}>TAXA DE IMPLANTAÇÃO</div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 16, marginBottom: 8, flexWrap: 'wrap' }}>
              <span style={{ fontFamily: 'var(--font-display)', fontSize: 40, textDecoration: 'line-through', textDecorationColor: 'var(--brand)', textDecorationThickness: '2px', color: 'var(--fg-subtle)' }}>R$ 1.500</span>
              <span style={{ fontFamily: 'var(--font-display)', fontSize: 64, fontStyle: 'italic', color: 'var(--brand)', lineHeight: 1 }}>R$ 0</span>
            </div>
            <div style={{ fontSize: 13, color: 'var(--fg-muted)', marginBottom: 24 }}>Cortesia para hotéis que ativarem em maio.</div>
            <div style={{ borderTop: '1px solid var(--line)', paddingTop: 20, display: 'flex', flexDirection: 'column', gap: 12 }}>
              {[
                'Treinamento da IA na voz e rituais da sua marca',
                'Conexão de WhatsApp, Instagram, site e e-mail',
                'Configuração de fluxos de reserva e upsell',
                'Onboarding da equipe na plataforma',
              ].map((t, i) => (
                <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', fontSize: 13, color: 'var(--fg-muted)' }}>
                  <span style={{ color: 'var(--brand)', marginTop: 1 }}><Icon name="check" size={14}/></span>{t}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
    <style>{`@media (max-width: 1024px) { .offer-grid { grid-template-columns: 1fr !important; gap: 40px !important; } }`}</style>
  </section>
);

const CTASection = () => {
  const [submitted, setSubmitted] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const formRef = React.useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const formData = new FormData(formRef.current);
      const data = {
        name: formData.get('name'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        hotel: formData.get('hotel'),
        message: `Solicitação de demonstração ao vivo do Chat Hotel.\n\nHotel: ${formData.get('hotel')}\nTelefone: ${formData.get('phone')}`,
        type: 'proposal',
      };

      const apiUrl = window.location.hostname === 'localhost'
        ? 'http://localhost:3000/api/send-proposal'
        : `${window.location.origin}/api/send-proposal`;

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Erro ao enviar mensagem');
      }

      setSubmitted(true);
    } catch (err) {
      setError(err.message || 'Erro ao enviar. Tente novamente.');
      console.error('Form submission error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="cta" style={{ paddingBottom: 100, background: 'var(--bg-elev)' }}>
      <div className="container">
        <div style={{ textAlign: 'center', maxWidth: 700, margin: '0 auto' }}>
          <span className="eyebrow" style={{ marginBottom: 24, display: 'inline-flex' }}>FALE COM A GENTE</span>
          <h2 className="display" style={{ fontSize: 'clamp(40px, 5.5vw, 80px)', marginTop: 16, marginBottom: 24 }}>
            Conheça quem<br/>responde por <em>você</em>.
          </h2>
          <p className="lead" style={{ margin: '0 auto 48px' }}>
            Demonstração ao vivo com seus próprios canais. Em 30 minutos, mostramos o concierge atendendo um hóspede fictício do início ao fim.
          </p>

          {!submitted ? (
            <form ref={formRef} onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, maxWidth: 560, margin: '0 auto', textAlign: 'left' }} className="cta-form">
              <FormField label="Seu nome" name="name" placeholder="Maria Helena Costa" required/>
              <FormField label="Hotel" name="hotel" placeholder="Hotel Vista Bela" required/>
              <FormField label="E-mail" name="email" placeholder="maria@hotelvistabela.com" type="email" required/>
              <FormField label="WhatsApp" name="phone" placeholder="+55 11 99999-0000" required/>

              {error && (
                <div style={{ gridColumn: '1 / -1', padding: 12, background: 'rgba(220, 53, 69, 0.1)', border: '1px solid rgba(220, 53, 69, 0.3)', borderRadius: 8, color: '#dc3545', fontSize: 13 }}>
                  ⚠️ {error}
                </div>
              )}

              <div style={{ gridColumn: '1 / -1', display: 'flex', justifyContent: 'center', marginTop: 16 }}>
                <button type="submit" disabled={loading} className="btn btn-primary" style={{ padding: '16px 32px', opacity: loading ? 0.7 : 1, cursor: loading ? 'not-allowed' : 'pointer' }}>
                  {loading ? '⏳ Enviando...' : <>Agendar demonstração <Icon name="arrow" size={14}/></>}
                </button>
              </div>
            </form>
          ) : (
            <div style={{ padding: 40, border: '1px solid var(--brand)', borderRadius: 18, background: 'var(--glow)', maxWidth: 480, margin: '0 auto' }}>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 28, fontStyle: 'italic', color: 'var(--brand)', marginBottom: 12 }}>✅ Recebemos!</div>
              <div style={{ color: 'var(--fg-muted)', fontSize: 14, lineHeight: 1.6 }}>
                Obrigado por seu interesse! 🎉<br/><br/>
                Enviamos uma confirmação para seu e-mail. Nosso time entra em contato em até 1 hora útil para combinar a demonstração no canal da sua preferência.
              </div>
            </div>
          )}
        </div>
      </div>
      <style>{`@media (max-width: 600px) { .cta-form { grid-template-columns: 1fr !important; } }`}</style>
    </section>
  );
};

const FormField = ({ label, name, placeholder, type = 'text', required = false }) => (
  <label htmlFor={name} style={{ display: 'block' }}>
    <div style={{ fontSize: 11, fontFamily: 'var(--font-mono)', color: 'var(--fg-muted)', letterSpacing: '0.14em', marginBottom: 8, textTransform: 'uppercase' }}>{label}</div>
    <input type={type} name={name} id={name} placeholder={placeholder} required={required}
      style={{ width: '100%', padding: '14px 16px', background: 'var(--bg)', border: '1px solid var(--line)', borderRadius: 12, fontSize: 14, color: 'var(--fg)', fontFamily: 'inherit', outline: 'none', transition: 'border-color 0.2s' }}
      onFocus={(e) => e.target.style.borderColor = 'var(--brand)'}
      onBlur={(e) => e.target.style.borderColor = 'var(--line)'}/>
  </label>
);

const Footer = () => (
  <footer style={{ borderTop: '1px solid var(--line)', padding: '60px 0 40px', background: 'var(--bg)' }}>
    <div className="container">
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: 48, marginBottom: 48 }} className="footer-grid">
        <div>
          <ChatHotelLogo size={28}/>
          <p style={{ color: 'var(--fg-muted)', fontSize: 13, lineHeight: 1.6, marginTop: 24, maxWidth: 320 }}>
            Chat Hotel é um produto ELEVARE Turismo, empresa do <a href="https://rvshoteis.com.br/" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--brand)', textDecoration: 'none', borderBottom: '1px solid var(--brand)' }}>Grupo RVS</a> (quase 30 anos de hotelaria),
            em parceria técnica com a <a href="https://www.cleveria.com.br/" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--brand)', textDecoration: 'none', borderBottom: '1px solid var(--brand)' }}>CleverIA</a> (20 anos de mercado).
          </p>
          <div style={{ display: 'flex', gap: 18, marginTop: 24, alignItems: 'center', opacity: 0.6 }}>
            <span style={{ fontSize: 10, fontFamily: 'var(--font-mono)', color: 'var(--fg-subtle)', letterSpacing: '0.14em' }}>POWERED BY</span>
            <img src="assets/logo-elevare-negative.png" alt="ELEVARE" style={{ height: 18, filter: 'brightness(0) invert(1)', opacity: 0.7 }}/>
            <span style={{ width: 1, height: 14, background: 'var(--line)' }}/>
            <img src="assets/logo-rvs.png" alt="RVS" style={{ height: 22, opacity: 0.85 }}/>
          </div>
        </div>
        {[
          { title: 'Produto', items: ['Chat Hotel IA', 'Plataforma omnichannel', 'Upsells autônomos', 'Multilíngue'] },
          { title: 'Empresa', items: [{ label: 'Sobre a ELEVARE' }, { label: 'Grupo RVS', href: 'https://rvshoteis.com.br/' }, { label: 'CleverIA', href: 'https://www.cleveria.com.br/' }, { label: 'Imprensa' }] },
          { title: 'Contato', items: [{ label: 'chathotel@elevare.tur.br', href: 'mailto:chathotel@elevare.tur.br' }, { label: '+55 41 992756768' }, { label: '+55 41 3301-3600' }, { label: 'Curitiba · BR' }] },
        ].map((col, i) => (
          <div key={i}>
            <div style={{ fontSize: 11, fontFamily: 'var(--font-mono)', color: 'var(--fg-muted)', letterSpacing: '0.14em', marginBottom: 16, textTransform: 'uppercase' }}>{col.title}</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {col.items.map((it, j) => {
                const item = typeof it === 'string' ? { label: it } : it;
                return (
                  <a key={j} href={item.href} target={item.href && !item.href.startsWith('mailto:') ? '_blank' : undefined} rel={item.href && !item.href.startsWith('mailto:') ? 'noopener noreferrer' : undefined} className="link-shimmer" style={{ fontSize: 13, color: item.href ? 'var(--brand)' : 'var(--fg)', textDecoration: 'none', cursor: item.href ? 'pointer' : 'default' }}>{item.label}</a>
                );
              })}
            </div>
          </div>
        ))}
      </div>
      <div style={{ paddingTop: 24, borderTop: '1px solid var(--line)', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12, fontSize: 11, fontFamily: 'var(--font-mono)', color: 'var(--fg-muted)', letterSpacing: '0.06em' }}>
        <div>© 2026 ELEVARE TURISMO · GRUPO RVS</div>
        <div>HOSPITALIDADE FINA · CONVERSADA</div>
      </div>
    </div>
    <style>{`
      @media (max-width: 880px) { .footer-grid { grid-template-columns: 1fr 1fr !important; } }
      @media (max-width: 540px) { .footer-grid { grid-template-columns: 1fr !important; } }
    `}</style>
  </footer>
);

window.ROICalculator = ROICalculator;
window.LaunchOffer = LaunchOffer;
window.CTASection = CTASection;
window.Footer = Footer;
