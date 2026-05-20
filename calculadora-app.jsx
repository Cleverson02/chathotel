// Calculadora de ROI Standalone + Formulário integrado

const CalculadoraApp = () => {
  const [rooms, setRooms] = React.useState(80);
  const [adr, setAdr] = React.useState(680);
  const [conversions, setConversions] = React.useState(15);
  const [showForm, setShowForm] = React.useState(false);
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    phone: '',
    hotel: '',
    message: ''
  });
  const [loading, setLoading] = React.useState(false);
  const [submitted, setSubmitted] = React.useState(false);

  // ROI Calculation
  const monthlyContacts = rooms * 18;
  const liftPct = 0.32;
  const additionalReservations = Math.round(monthlyContacts * (conversions / 100) * liftPct);
  const additionalRevenue = additionalReservations * adr * 1.8;
  const upsellRevenue = Math.round(additionalReservations * 180);
  const totalMonthly = additionalRevenue + upsellRevenue;
  const yearly = totalMonthly * 12;

  const fmt = (n) => 'R$ ' + Math.round(n).toLocaleString('pt-BR');

  // Handle form submission
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const message = `
Calculadora de ROI - Formulário de Interesse

DADOS DO HOTEL:
Nome: ${formData.name}
Email: ${formData.email}
Telefone: ${formData.phone}
Hotel: ${formData.hotel}

PARÂMETROS DA CALCULADORA:
Quartos: ${rooms}
Diária Média (ADR): R$ ${adr.toLocaleString('pt-BR')}
Taxa de Conversão Atual: ${conversions}%

RESULTADOS CALCULADOS:
Contatos/mês: ${monthlyContacts.toLocaleString('pt-BR')}
Reservas a mais/mês: +${additionalReservations}
Receita Incremental/mês: ${fmt(totalMonthly)}
Receita Incremental/ano: ${fmt(yearly)}

OBSERVAÇÕES:
${formData.message}
    `.trim();

    try {
      const response = await fetch('/api/send-proposal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          hotel: formData.hotel,
          message: message,
          type: 'roi-calculator'
        })
      });

      if (response.ok) {
        setSubmitted(true);
        setTimeout(() => {
          setShowForm(false);
          setFormData({ name: '', email: '', phone: '', hotel: '', message: '' });
          setSubmitted(false);
        }, 3000);
      }
    } catch (error) {
      console.error('Erro ao enviar:', error);
    }
    setLoading(false);
  };

  return (
    <>
      <style>{`
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: var(--font-body), -apple-system, sans-serif; background: var(--bg); color: var(--fg); }
        .calc-container { max-width: 1200px; margin: 0 auto; padding: 60px 20px; }
        .calc-header { text-align: center; margin-bottom: 60px; }
        .calc-eyebrow { font-size: 11px; font-family: var(--font-mono); letter-spacing: 0.14em; color: var(--fg-muted); text-transform: uppercase; margin-bottom: 20px; display: inline-block; }
        .calc-title { font-size: clamp(40px, 5vw, 64px); font-family: var(--font-display); font-style: italic; color: var(--fg); margin: 20px 0; line-height: 1.2; }
        .calc-subtitle { font-size: 18px; color: var(--fg-muted); max-width: 600px; margin: 0 auto; }
        .calc-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 40px; margin-bottom: 40px; align-items: stretch; }
        @media (max-width: 1024px) { .calc-grid { grid-template-columns: 1fr; } }

        .calc-card { background: var(--surface); border: 1px solid var(--line); border-radius: 20px; padding: 40px; }
        .calc-card.highlight { background: linear-gradient(135deg, var(--surface), var(--bg-elev)); border-color: var(--brand); position: relative; overflow: hidden; }
        .calc-card.highlight::before { content: ''; position: absolute; top: 0; right: 0; width: 200px; height: 200px; background: radial-gradient(circle at 100% 0%, var(--glow), transparent 70%); }
        .calc-card > * { position: relative; }

        .calc-label { font-size: 11px; font-family: var(--font-mono); color: var(--fg-muted); letter-spacing: 0.14em; text-transform: uppercase; margin-bottom: 24px; display: block; }
        .calc-card.highlight .calc-label { color: var(--brand); }

        .slider-group { margin-bottom: 24px; }
        .slider-header { display: flex; justify-content: space-between; margin-bottom: 12px; font-size: 13px; }
        .slider-label { color: var(--fg-muted); }
        .slider-value { font-family: var(--font-display); font-style: italic; color: var(--brand); font-variant-numeric: tabular-nums; font-size: 16px; }
        input[type="range"] { width: 100%; height: 4px; border-radius: 4px; outline: none; cursor: pointer; appearance: none; -webkit-appearance: none; }
        input[type="range"]::-webkit-slider-thumb { appearance: none; width: 18px; height: 18px; background: var(--brand); border: 2px solid var(--bg); border-radius: 50%; cursor: pointer; box-shadow: 0 0 0 1px var(--brand), 0 4px 12px var(--glow); }
        input[type="range"]::-moz-range-thumb { width: 18px; height: 18px; background: var(--brand); border: 2px solid var(--bg); border-radius: 50%; cursor: pointer; }

        .calc-note { margin-top: 32px; padding-top: 24px; border-top: 1px solid var(--line); font-size: 12px; color: var(--fg-muted); font-family: var(--font-mono); line-height: 1.7; }
        .calc-note div { margin-bottom: 6px; }

        .calc-results { margin-bottom: 28px; }
        .calc-results-label { font-size: 12px; color: var(--fg-muted); font-family: var(--font-mono); letter-spacing: 0.06em; margin-bottom: 8px; }
        .calc-results-value { font-family: var(--font-display); font-style: italic; color: var(--brand); font-variant-numeric: tabular-nums; line-height: 1; }
        .calc-results-value.large { font-size: clamp(40px, 5vw, 64px); }
        .calc-results-value.small { font-size: clamp(32px, 4vw, 48px); color: var(--fg); }

        .calc-row { display: flex; justify-content: space-between; font-size: 13px; margin-bottom: 10px; padding-bottom: 10px; border-bottom: 1px solid var(--line); }
        .calc-row:last-child { border-bottom: none; margin-bottom: 0; padding-bottom: 0; }
        .calc-row-label { color: var(--fg-muted); }
        .calc-row-value { color: var(--fg); font-family: var(--font-mono); font-variant-numeric: tabular-nums; }

        .calc-actions { display: flex; gap: 14px; margin-top: 32px; flex-wrap: wrap; }
        .btn { padding: 14px 24px; border-radius: 12px; font-size: 14px; font-weight: 500; cursor: pointer; border: none; text-decoration: none; display: inline-flex; align-items: center; gap: 8px; transition: all 200ms; font-family: inherit; }
        .btn-primary { background: var(--brand); color: var(--bg); }
        .btn-primary:hover { background: var(--accent); box-shadow: 0 8px 24px var(--glow); }
        .btn-secondary { background: transparent; border: 1px solid var(--brand); color: var(--brand); }
        .btn-secondary:hover { background: var(--brand); color: var(--bg); }
        .btn-whatsapp { background: #25D366; color: white; }
        .btn-whatsapp:hover { background: #20BA5A; }

        .form-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.8); display: flex; align-items: center; justify-content: center; z-index: 1000; padding: 20px; }
        .form-modal { background: var(--bg); border: 1px solid var(--line); border-radius: 20px; padding: 40px; max-width: 500px; width: 100%; }
        .form-close { position: absolute; top: 20px; right: 20px; background: none; border: none; color: var(--fg); font-size: 24px; cursor: pointer; }
        .form-title { font-size: 24px; font-family: var(--font-display); margin-bottom: 20px; }
        .form-group { margin-bottom: 20px; }
        .form-label { display: block; font-size: 12px; color: var(--fg-muted); margin-bottom: 6px; text-transform: uppercase; letter-spacing: 0.06em; }
        .form-input { width: 100%; padding: 12px; background: var(--surface); border: 1px solid var(--line); border-radius: 8px; color: var(--fg); font-family: inherit; }
        .form-input:focus { outline: none; border-color: var(--brand); box-shadow: 0 0 0 3px var(--glow); }
        .form-submit { width: 100%; margin-top: 24px; }
        .success-message { color: var(--brand); text-align: center; margin: 20px 0; font-weight: 500; }

        .disclaimer { font-size: 11px; color: var(--fg-subtle); text-align: center; margin-top: 32px; font-family: var(--font-mono); letter-spacing: 0.04em; }
      `}</style>

      <div className="calc-container">
        {/* Header */}
        <div className="calc-header">
          <span className="calc-eyebrow">Calculadora de Retorno</span>
          <h1 className="calc-title">
            Quanto o Chat Hotel<br/>
            <em>devolve</em> ao seu hotel
          </h1>
          <p className="calc-subtitle">
            Estimativa baseada em ganho de conversão 24/7 + upsell autônomo. Ajuste os parâmetros do seu hotel e veja o impacto.
          </p>
        </div>

        {/* Calculator */}
        <div className="calc-grid">
          {/* Inputs */}
          <div className="calc-card">
            <span className="calc-label">Seu Hotel</span>

            <div className="slider-group">
              <div className="slider-header">
                <span className="slider-label">Quartos</span>
                <span className="slider-value">{rooms}</span>
              </div>
              <input type="range" min="10" max="300" step="5" value={rooms}
                onChange={(e) => setRooms(Number(e.target.value))}
                style={{
                  background: `linear-gradient(to right, var(--brand) 0%, var(--brand) ${((rooms-10)/290)*100}%, var(--line) ${((rooms-10)/290)*100}%, var(--line) 100%)`
                }}/>
            </div>

            <div className="slider-group">
              <div className="slider-header">
                <span className="slider-label">Diária Média (ADR)</span>
                <span className="slider-value">R$ {adr.toLocaleString('pt-BR')}</span>
              </div>
              <input type="range" min="200" max="3000" step="20" value={adr}
                onChange={(e) => setAdr(Number(e.target.value))}
                style={{
                  background: `linear-gradient(to right, var(--brand) 0%, var(--brand) ${((adr-200)/2800)*100}%, var(--line) ${((adr-200)/2800)*100}%, var(--line) 100%)`
                }}/>
            </div>

            <div className="slider-group">
              <div className="slider-header">
                <span className="slider-label">Taxa de Conversão Atual</span>
                <span className="slider-value">{conversions}%</span>
              </div>
              <input type="range" min="1" max="40" step="1" value={conversions}
                onChange={(e) => setConversions(Number(e.target.value))}
                style={{
                  background: `linear-gradient(to right, var(--brand) 0%, var(--brand) ${((conversions-1)/39)*100}%, var(--line) ${((conversions-1)/39)*100}%, var(--line) 100%)`
                }}/>
            </div>

            <div className="calc-note">
              <div>CONTATOS ESTIMADOS / MÊS · {monthlyContacts.toLocaleString('pt-BR')}</div>
              <div>GANHO DE CONVERSÃO APLICADO · +32%</div>
              <div>UPSELL MÉDIO · R$ 180 / RESERVA</div>
            </div>
          </div>

          {/* Results */}
          <div className="calc-card highlight">
            <span className="calc-label">Receita Incremental Estimada</span>

            <div className="calc-results">
              <div className="calc-results-label">POR MÊS</div>
              <div className="calc-results-value large">{fmt(totalMonthly)}</div>
            </div>

            <div className="calc-results">
              <div className="calc-results-label">POR ANO</div>
              <div className="calc-results-value small">{fmt(yearly)}</div>
            </div>

            <div style={{ paddingTop: 24, borderTop: '1px solid var(--line)' }}>
              <div className="calc-row">
                <span className="calc-row-label">Reservas a mais / mês</span>
                <span className="calc-row-value">+{additionalReservations}</span>
              </div>
              <div className="calc-row">
                <span className="calc-row-label">Receita por reservas extras</span>
                <span className="calc-row-value">{fmt(additionalRevenue)}</span>
              </div>
              <div className="calc-row">
                <span className="calc-row-label">Receita de upsells</span>
                <span className="calc-row-value">{fmt(upsellRevenue)}</span>
              </div>
            </div>

            <div className="calc-actions">
              <button className="btn btn-primary" onClick={() => setShowForm(true)}>
                Quero saber mais 📧
              </button>
              <a className="btn btn-whatsapp" href={`https://wa.me/5541992756768?text=Olá! Tenho interesse em saber mais sobre o Chat Hotel. Calculei um retorno potencial de R$ ${Math.round(yearly).toLocaleString('pt-BR')} por ano.`} target="_blank">
                Chamar no WhatsApp 💬
              </a>
            </div>
          </div>
        </div>

        <div className="disclaimer">
          · Estimativas conservadoras baseadas em médias de mercado. Cada hotel é um caso único.
        </div>
      </div>

      {/* Form Modal */}
      {showForm && (
        <div className="form-overlay" onClick={() => !loading && setShowForm(false)}>
          <div className="form-modal" onClick={(e) => e.stopPropagation()}>
            <button className="form-close" onClick={() => setShowForm(false)}>✕</button>

            {submitted ? (
              <div className="success-message">
                <div style={{ fontSize: 24, marginBottom: 12 }}>✅</div>
                <div>Mensagem enviada com sucesso!</div>
                <div style={{ fontSize: 12, marginTop: 8, opacity: 0.8 }}>Entraremos em contato em breve.</div>
              </div>
            ) : (
              <>
                <h2 className="form-title">Sua Informação</h2>
                <form onSubmit={handleFormSubmit}>
                  <div className="form-group">
                    <label className="form-label">Nome</label>
                    <input className="form-input" type="text" required
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      placeholder="Seu nome completo"/>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Email</label>
                    <input className="form-input" type="email" required
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      placeholder="seu@email.com"/>
                  </div>

                  <div className="form-group">
                    <label className="form-label">WhatsApp</label>
                    <input className="form-input" type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      placeholder="+55 11 99999-0000"/>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Nome do Hotel</label>
                    <input className="form-input" type="text" required
                      value={formData.hotel}
                      onChange={(e) => setFormData({...formData, hotel: e.target.value})}
                      placeholder="Hotel Exemplo"/>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Mensagem (opcional)</label>
                    <textarea className="form-input" rows="4"
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      placeholder="Dúvidas ou comentários..."
                      style={{ resize: 'vertical' }}/>
                  </div>

                  <button type="submit" className="btn btn-primary form-submit" disabled={loading}>
                    {loading ? 'Enviando...' : 'Enviar e Agendar Demo'}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

window.CalculadoraApp = CalculadoraApp;
