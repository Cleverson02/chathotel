// Brand assets — Chat Hotel + ELEVARE + RVS

const ChatHotelMark = ({ size = 32, color = 'var(--brand)' }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
    {/* Speech bubble + hotel */}
    <path d="M10 12 Q10 6 16 6 L48 6 Q54 6 54 12 L54 40 Q54 46 48 46 L30 46 L22 56 L22 46 L16 46 Q10 46 10 40 Z" fill={color}/>
    {/* Hotel inside (negative space) */}
    <g fill="var(--bg)">
      <path d="M22 20 L32 14 L42 20 L42 22 L40 22 L40 38 L24 38 L24 22 L22 22 Z"/>
      <rect x="27" y="25" width="3" height="3"/>
      <rect x="34" y="25" width="3" height="3"/>
      <rect x="27" y="30" width="3" height="3"/>
      <rect x="34" y="30" width="3" height="3"/>
      <rect x="30" y="34" width="4" height="4"/>
    </g>
  </svg>
);

const ChatHotelLogo = ({ size = 28, color = 'var(--fg)', mono = false }) => (
  <div style={{ display: 'inline-flex', alignItems: 'center', gap: 12 }}>
    <ChatHotelMark size={size} color={mono ? color : 'var(--brand)'}/>
    <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
      <div style={{ fontFamily: "'Chakra Petch', sans-serif", fontWeight: 600, fontSize: size * 0.55, letterSpacing: '0.18em', color }}>
        CHAT HOTEL
      </div>
      <div style={{ fontFamily: "'Chakra Petch', sans-serif", fontSize: size * 0.32, letterSpacing: '0.32em', color: 'var(--fg-muted)', marginTop: 4 }}>
        BY ELEVARE
      </div>
    </div>
  </div>
);

// Channel icons with glassmorphism + glow halos
const ChannelIcon = ({ channel, size = 16, glow = false }) => {
  const icons = {
    whatsapp: <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413"/>,
    instagram: <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>,
    messenger: <path d="M.001 11.639C.001 4.949 5.241 0 12.001 0S24 4.95 24 11.639c0 6.689-5.24 11.638-12 11.638-1.21 0-2.371-.159-3.46-.45a.96.96 0 00-.641.05l-2.39 1.05a.96.96 0 01-1.35-.85l-.07-2.14a.97.97 0 00-.32-.68A11.39 11.39 0 010 11.639zm8.32-2.19l-3.52 5.59c-.34.54.32 1.139.82.769l3.78-2.871a.72.72 0 01.86 0l2.8 2.1c.84.63 2.04.41 2.6-.48l3.52-5.59c.34-.54-.32-1.13-.82-.76l-3.78 2.87a.72.72 0 01-.86 0l-2.8-2.1a1.8 1.8 0 00-2.6.48z"/>,
    email: <g fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></g>,
    web: <g fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15 15 0 0 1 0 20M12 2a15 15 0 0 0 0 20"/></g>,
  };

  const colors = {
    whatsapp: '#25D366',
    instagram: '#E1306C',
    messenger: '#0084FF',
    email: '#D4B36A',
    web: '#5B8FB9',
  };

  const gradients = {
    whatsapp: 'linear-gradient(135deg, #25D366, #128C7E)',
    instagram: 'linear-gradient(135deg, #F58529, #DD2A7B, #8134AF)',
    messenger: 'linear-gradient(135deg, #00B2FF, #006AFF)',
    email: 'linear-gradient(135deg, #E5C988, #D4B36A)',
    web: 'linear-gradient(135deg, #8AB4D6, #5B8FB9)',
  };

  return (
    <span style={{
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: size + 16,
      height: size + 16,
      borderRadius: '50%',
      background: gradients[channel],
      color: '#fff',
      flexShrink: 0,
      boxShadow: glow ? `0 8px 24px ${colors[channel]}66, inset 0 1px 0 rgba(255,255,255,0.3), 0 0 0 1px rgba(255,255,255,0.1)` : `0 4px 12px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.2)`,
      position: 'relative',
    }}>
      <svg viewBox="0 0 24 24" width={size} height={size} fill={['email', 'web'].includes(channel) ? 'none' : 'currentColor'}>
        {icons[channel]}
      </svg>
    </span>
  );
};

const Icon = ({ name, size = 18 }) => {
  const stroked = ['arrow', 'check', 'bed', 'spa', 'fork', 'globe', 'chat', 'lock', 'clock', 'user', 'plus', 'star'];
  const paths = {
    spark: <path d="M12 3l1.8 5.4L19 10l-5.2 1.6L12 17l-1.8-5.4L5 10l5.2-1.6L12 3zM19 3l.9 2.1L22 6l-2.1.9L19 9l-.9-2.1L16 6l2.1-.9L19 3z"/>,
    arrow: <path d="M5 12h14M12 5l7 7-7 7" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>,
    check: <path d="M5 12l5 5L20 7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>,
    play: <path d="M8 5v14l11-7z"/>,
    bed: <path d="M3 18v-6h18v6M3 12V8a2 2 0 012-2h14a2 2 0 012 2v4M7 12V9h4v3" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>,
    spa: <path d="M12 3c2 4 2 8 0 12-2-4-2-8 0-12zM12 21c-3-2-6-2-9-1 1-3 4-5 7-5M12 21c3-2 6-2 9-1-1-3-4-5-7-5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>,
    fork: <path d="M7 2v8a2 2 0 002 2v9M11 2v8M14 8c0-3 2-6 4-6v20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>,
    globe: <g fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 010 18M12 3a14 14 0 000 18"/></g>,
    chat: <path d="M21 12a8 8 0 01-11.5 7.2L4 21l1.8-5.5A8 8 0 1121 12z" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>,
    lock: <g fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V7a4 4 0 018 0v4"/></g>,
    clock: <g fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></g>,
    user: <g fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0116 0"/></g>,
    plus: <path d="M12 5v14M5 12h14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>,
    star: <path d="M12 3l2.6 6.4L21 10l-5 4.4L17.5 21 12 17.7 6.5 21 8 14.4 3 10l6.4-.6z" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>,
  };
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={stroked.includes(name) ? 'none' : 'currentColor'} style={{ flexShrink: 0 }}>
      {paths[name]}
    </svg>
  );
};

// Cinematic luxury lobby — improved with depth, light rays, atmospheric perspective
const LobbyPlaceholder = ({ palette }) => (
  <svg viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice" style={{ width: '100%', height: '100%', position: 'absolute', inset: 0 }}>
    <defs>
      <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor={palette.bg}/>
        <stop offset="50%" stopColor={palette.bgElev}/>
        <stop offset="100%" stopColor={palette.surface}/>
      </linearGradient>
      <radialGradient id="lightSource" cx="0.5" cy="0.3" r="0.7">
        <stop offset="0%" stopColor={palette.brand} stopOpacity="0.25"/>
        <stop offset="40%" stopColor={palette.brand} stopOpacity="0.08"/>
        <stop offset="100%" stopColor={palette.brand} stopOpacity="0"/>
      </radialGradient>
      <linearGradient id="archLight" x1="0.5" y1="0" x2="0.5" y2="1">
        <stop offset="0%" stopColor={palette.brandSoft} stopOpacity="0.5"/>
        <stop offset="60%" stopColor={palette.brand} stopOpacity="0.15"/>
        <stop offset="100%" stopColor={palette.brand} stopOpacity="0"/>
      </linearGradient>
      <linearGradient id="floorReflect" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor={palette.surface}/>
        <stop offset="100%" stopColor={palette.bg}/>
      </linearGradient>
      <radialGradient id="vignette" cx="0.5" cy="0.5" r="0.75">
        <stop offset="55%" stopColor="black" stopOpacity="0"/>
        <stop offset="100%" stopColor="black" stopOpacity="0.7"/>
      </radialGradient>
    </defs>

    <rect width="1600" height="900" fill="url(#skyGrad)"/>

    {/* Atmospheric haze */}
    <rect width="1600" height="900" fill="url(#lightSource)"/>

    {/* Far back wall with arches */}
    <g opacity="0.5">
      {[0, 1, 2, 3, 4].map(i => {
        const x = 200 + i * 280;
        return (
          <g key={i}>
            <path d={`M ${x} 700 L ${x} 380 Q ${x} 280 ${x+90} 280 Q ${x+180} 280 ${x+180} 380 L ${x+180} 700 Z`}
                  fill="url(#archLight)" stroke={palette.line} strokeWidth="1.2"/>
          </g>
        );
      })}
    </g>

    {/* Light rays through arches */}
    <g opacity="0.12">
      {[0, 2, 4].map(i => {
        const x = 290 + i * 280;
        return <polygon key={i} points={`${x},340 ${x+90},340 ${x+200},900 ${x-110},900`} fill={palette.brand}/>;
      })}
    </g>

    {/* Foreground columns */}
    <g>
      <rect x="80" y="100" width="50" height="600" fill={palette.bg} opacity="0.85"/>
      <rect x="80" y="100" width="3" height="600" fill={palette.brand} opacity="0.4"/>
      <rect x="80" y="100" width="50" height="20" fill={palette.brand} opacity="0.3"/>

      <rect x="1470" y="100" width="50" height="600" fill={palette.bg} opacity="0.85"/>
      <rect x="1517" y="100" width="3" height="600" fill={palette.brand} opacity="0.4"/>
      <rect x="1470" y="100" width="50" height="20" fill={palette.brand} opacity="0.3"/>
    </g>

    {/* Chandelier */}
    <line x1="800" y1="0" x2="800" y2="160" stroke={palette.line} strokeWidth="1"/>
    <ellipse cx="800" cy="240" rx="220" ry="140" fill="url(#lightSource)" opacity="0.8"/>
    <g stroke={palette.brand} strokeWidth="0.8" fill="none" opacity="0.9">
      <ellipse cx="800" cy="220" rx="60" ry="14"/>
      <ellipse cx="800" cy="245" rx="100" ry="20"/>
      <ellipse cx="800" cy="275" rx="140" ry="26"/>
      {[-140,-100,-60,-20,20,60,100,140].map(d => (
        <g key={d}>
          <line x1={800+d} y1="245" x2={800+d*0.95} y2="295" stroke={palette.brand} strokeOpacity="0.5"/>
          <circle cx={800+d*0.95} cy="298" r="2.5" fill={palette.brandSoft}>
            <animate attributeName="opacity" values="0.6;1;0.6" dur={`${2 + Math.abs(d)/100}s`} repeatCount="indefinite"/>
          </circle>
        </g>
      ))}
    </g>

    {/* Reception desk silhouette */}
    <g opacity="0.85">
      <rect x="500" y="630" width="600" height="90" fill={palette.bg}/>
      <rect x="500" y="630" width="600" height="2" fill={palette.brand} opacity="0.6"/>
      <rect x="500" y="640" width="600" height="1" fill={palette.brand} opacity="0.2"/>
    </g>

    {/* Marble floor with reflection */}
    <rect x="0" y="700" width="1600" height="200" fill={palette.surface}/>
    <g opacity="0.4">
      <path d="M0 750 Q400 720 800 760 T1600 750" stroke={palette.line} strokeWidth="0.8" fill="none"/>
      <path d="M0 800 Q500 830 1000 790 T1600 810" stroke={palette.line} strokeWidth="0.8" fill="none"/>
      <path d="M0 850 Q300 870 700 840 T1600 860" stroke={palette.line} strokeWidth="0.8" fill="none"/>
    </g>
    <rect x="0" y="700" width="1600" height="200" fill="url(#floorReflect)" opacity="0.7"/>

    {/* Reflected chandelier on floor */}
    <ellipse cx="800" cy="780" rx="180" ry="40" fill={palette.brand} opacity="0.06"/>

    {/* Floor lamps glow */}
    <ellipse cx="200" cy="650" rx="100" ry="80" fill={palette.brand} opacity="0.1"/>
    <ellipse cx="1400" cy="650" rx="100" ry="80" fill={palette.brand} opacity="0.1"/>

    {/* Final vignette */}
    <rect width="1600" height="900" fill="url(#vignette)"/>
  </svg>
);

Object.assign(window, { ChatHotelMark, ChatHotelLogo, ChannelIcon, Icon, LobbyPlaceholder });
