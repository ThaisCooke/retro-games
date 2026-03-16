import { useDroppable } from '@dnd-kit/core';
import WeekBlock from './WeekBlock';

const DAY_LABELS = { mon: 'Mon', tue: 'Tue', wed: 'Wed', thu: 'Thu', fri: 'Fri' };

export default function DayColumn({ day, blocks }) {
  const { setNodeRef, isOver } = useDroppable({ id: day });

  return (
    <div style={{ flex: 1, minWidth: 0 }}>
      <div style={{
        fontSize: 12, fontWeight: 700, color: '#6b7280',
        textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8, textAlign: 'center',
      }}>{DAY_LABELS[day]}</div>
      <div ref={setNodeRef} style={{
        display: 'flex', flexDirection: 'column', gap: 6,
        minHeight: 80, padding: 4,
        background: isOver ? '#f0f9ff' : 'transparent',
        borderRadius: 6, transition: 'background 0.15s',
      }}>
        {blocks.map(block => <WeekBlock key={block.id} block={block} day={day} />)}
      </div>
    </div>
  );
}
