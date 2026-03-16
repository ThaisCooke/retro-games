import useAppStore from '../../../store/useAppStore';

export default function StreakCounter() {
  const { currentStreak, longestStreak } = useAppStore(s => s.streakData);
  const incrementStreak = useAppStore(s => s.incrementStreak);

  return (
    <div className="card" style={{ marginBottom: 16, display: 'flex', alignItems: 'center', gap: 24 }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontSize: 32, fontWeight: 700, color: '#185FA5' }}>{currentStreak}</div>
        <div style={{ fontSize: 12, color: '#6b7280' }}>day streak</div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontSize: 32, fontWeight: 700, color: '#9ca3af' }}>{longestStreak}</div>
        <div style={{ fontSize: 12, color: '#6b7280' }}>longest</div>
      </div>
      <button
        onClick={incrementStreak}
        style={{
          marginLeft: 'auto', padding: '8px 16px', background: '#185FA5',
          color: '#fff', borderRadius: 6, fontSize: 14, fontWeight: 600,
        }}
      >
        Check in today
      </button>
    </div>
  );
}
