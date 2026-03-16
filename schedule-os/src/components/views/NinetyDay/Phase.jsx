import MilestoneItem from './MilestoneItem';
import ProgressBar from '../../shared/ProgressBar';

export default function Phase({ phase }) {
  const done = phase.milestones.filter(m => m.done).length;
  const total = phase.milestones.length;
  const pct = total > 0 ? Math.round((done / total) * 100) : 0;

  return (
    <div className="card" style={{ marginBottom: 12 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 8 }}>
        <h3 style={{ fontSize: 15, fontWeight: 700 }}>{phase.label}</h3>
        <span style={{ fontSize: 12, color: '#6b7280' }}>{done}/{total} · {pct}%</span>
      </div>
      <div style={{ marginBottom: 10 }}>
        <ProgressBar value={done} max={total} color="#185FA5" />
      </div>
      <div style={{ fontSize: 12, color: '#9ca3af', marginBottom: 12 }}>
        {phase.startDate} → {phase.endDate}
      </div>
      {phase.milestones.map(m => <MilestoneItem key={m.id} phaseId={phase.id} milestone={m} />)}
    </div>
  );
}
