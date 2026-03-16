export default function BlockStatus({ status }) {
  const styles = {
    now: { background: '#dcfce7', color: '#15803d', border: '1px solid #bbf7d0' },
    upnext: { background: '#dbeafe', color: '#1d4ed8', border: '1px solid #bfdbfe' },
    done: { background: '#f3f4f6', color: '#9ca3af', border: '1px solid #e5e7eb' },
  };
  const labels = { now: 'NOW', upnext: 'UP NEXT', done: 'DONE' };
  if (!styles[status]) return null;
  return (
    <span style={{
      ...styles[status], borderRadius: 4, fontSize: 10, fontWeight: 700,
      padding: '2px 6px', letterSpacing: 0.5,
    }}>
      {labels[status]}
    </span>
  );
}
