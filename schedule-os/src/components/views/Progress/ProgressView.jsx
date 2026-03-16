import StatRow from './StatRow';
import StreakCounter from './StreakCounter';
import PhaseProgress from './PhaseProgress';
import useAppStore from '../../../store/useAppStore';

export default function ProgressView() {
  const stats = useAppStore(s => s.weeklyStats.stats);
  const weekStart = useAppStore(s => s.weeklyStats.weekStartDate);

  return (
    <div>
      <div style={{ marginBottom: 20 }}>
        <h1 style={{ fontSize: 22, fontWeight: 700 }}>Progress</h1>
        <p style={{ color: '#6b7280', fontSize: 14, marginTop: 4 }}>Week of {weekStart}</p>
      </div>
      <StreakCounter />
      <PhaseProgress />
      <div className="card">
        <div style={{ fontWeight: 700, marginBottom: 4 }}>Weekly Stats</div>
        {stats.map(stat => <StatRow key={stat.id} stat={stat} />)}
      </div>
    </div>
  );
}
