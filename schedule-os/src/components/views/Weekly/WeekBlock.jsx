import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import PillarBadge from '../../shared/PillarBadge';

export default function WeekBlock({ block, day }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: block.id,
    data: { day },
  });

  const style = {
    transform: CSS.Translate.toString(transform),
    opacity: isDragging ? 0.4 : 1,
    background: '#fff',
    border: '0.5px solid #e5e7eb',
    borderRadius: 6,
    padding: '8px 10px',
    cursor: isDragging ? 'grabbing' : 'grab',
    fontSize: 12,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <div style={{ color: '#6b7280', marginBottom: 2 }}>{block.startTime}–{block.endTime}</div>
      <div style={{ fontWeight: 600, lineHeight: 1.3 }}>{block.title}</div>
      <div style={{ marginTop: 4 }}><PillarBadge pillarId={block.pillar} /></div>
    </div>
  );
}
