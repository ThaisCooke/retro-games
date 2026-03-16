import Phase from './Phase';
import ProgressBar from '../../shared/ProgressBar';
import useAppStore from '../../../store/useAppStore';

export default function NinetyDayView() {
  const phases = useAppStore(s => s.phases);
  const allMilestones = phases.flatMap(p => p.milestones);
  const done = allMilestones.filter(m => m.done).length;
  const total = allMilestones.length;

  return (
    <div>
      <div style={{ marginBottom: 20 }}>
        <h1 style={{ fontSize: 22, fontWeight: 700 }}>90-Day Goals</h1>
        <p style={{ color: '#6b7280', fontSize: 14, marginTop: 4 }}>
          Overall: {done}/{total} milestones complete
        </p>
        <div style={{ marginTop: 10 }}>
          <ProgressBar value={done} max={total} color="#534AB7" />
        </div>
      </div>
      {phases.map(phase => <Phase key={phase.id} phase={phase} />)}
    </div>
  );
}
