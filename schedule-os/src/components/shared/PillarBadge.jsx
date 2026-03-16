import { PILLARS } from '../../data/pillars';

export default function PillarBadge({ pillarId }) {
  if (!pillarId) return null;
  const pillar = PILLARS.find(p => p.id === pillarId);
  if (!pillar) return null;
  return (
    <span style={{
      background: pillar.color + '18',
      color: pillar.color,
      border: `1px solid ${pillar.color}40`,
      borderRadius: 4,
      fontSize: 11,
      fontWeight: 600,
      padding: '2px 6px',
      whiteSpace: 'nowrap',
    }}>
      {pillar.label}
    </span>
  );
}
