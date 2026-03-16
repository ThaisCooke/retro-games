import ProgressBar from '../../shared/ProgressBar';
import PillarBadge from '../../shared/PillarBadge';
import { PILLARS } from '../../../data/pillars';
import useAppStore from '../../../store/useAppStore';

export default function StatRow({ stat }) {
  const updateWeeklyStat = useAppStore(s => s.updateWeeklyStat);
  const pillar = PILLARS.find(p => p.id === stat.pillar);
  const color = pillar?.color || '#185FA5';

  return (
    <div style={{ padding: '12px 0', borderBottom: '0.5px solid #f3f4f6' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <PillarBadge pillarId={stat.pillar} />
          <span style={{ fontSize: 14 }}>{stat.label}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <button onClick={() => updateWeeklyStat(stat.id, stat.value - 1)}
            style={{ width: 24, height: 24, borderRadius: 4, border: '0.5px solid #e5e7eb', fontSize: 16 }}>−</button>
          <span style={{ fontSize: 14, fontWeight: 600, minWidth: 40, textAlign: 'center' }}>
            {stat.value} / {stat.max}
          </span>
          <button onClick={() => updateWeeklyStat(stat.id, stat.value + 1)}
            style={{ width: 24, height: 24, borderRadius: 4, border: '0.5px solid #e5e7eb', fontSize: 16 }}>+</button>
        </div>
      </div>
      <ProgressBar value={stat.value} max={stat.max} color={color} />
    </div>
  );
}
