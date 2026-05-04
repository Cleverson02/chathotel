// Helper: useInView hook (shared)
const useInView = (threshold = 0.2) => {
  const ref = React.useRef(null);
  const [inView, setInView] = React.useState(false);
  React.useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
};

// Generic Bubble for sections beyond hero
const Bubble = ({ side, text, time, status }) => {
  const isAgent = side === 'agent';
  return (
    <div style={{ display: 'flex', justifyContent: isAgent ? 'flex-start' : 'flex-end', marginBottom: 6 }}>
      <div style={{
        maxWidth: '75%',
        background: isAgent ? 'rgba(255,255,255,0.06)' : 'var(--brand)',
        color: isAgent ? 'var(--fg)' : 'var(--bg)',
        padding: '10px 14px',
        borderRadius: 16,
        borderTopLeftRadius: isAgent ? 4 : 16,
        borderTopRightRadius: isAgent ? 16 : 4,
        fontSize: 14,
        lineHeight: 1.5,
        border: isAgent ? '1px solid rgba(255,255,255,0.08)' : 'none',
        boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
      }}>
        <div>{text}</div>
        <div style={{ fontSize: 10, opacity: 0.7, marginTop: 4, textAlign: 'right', fontFamily: 'var(--font-mono)' }}>{time}{status ? ' ✓✓' : ''}</div>
      </div>
    </div>
  );
};

window.useInView = useInView;
window.Bubble = Bubble;
