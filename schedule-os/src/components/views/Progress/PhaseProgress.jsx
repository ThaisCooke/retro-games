import ProgressBar from '../../shared/ProgressBar';
import useAppStore from '../../../store/useAppStore';

export default function PhaseProgress() {
  const phases = useAppStore(s => s.phases);
  const allDone = phases.flatMap(p => p.milestones).filter(m => m.done).length;
  const allTotal = phases.flatMap(p => p.milestones).length;

  return (
    <div className="card" style={{ marginBottom: 16 }}>
      <div style={{ fontWeight: 700, marginBottom: 12 }}>90-Day Progress</div>
      <div style={{ color: '#6b7280', fontSize: 13, marginBottom: 8 }}>
        {allDone} / {allTotal} milestones complete
      </div>
      <ProgressBar value={allDone} max={allTotal} color="#534AB7" />
    </div>
  );
}
