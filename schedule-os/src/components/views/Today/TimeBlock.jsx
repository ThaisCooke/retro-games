import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import PillarBadge from '../../shared/PillarBadge';
import Checkbox from '../../shared/Checkbox';
import BlockStatus from './BlockStatus';
import useAppStore from '../../../store/useAppStore';

function getStatus(startTime, endTime, checked) {
  if (checked) return 'done';
  const now = new Date();
  const [sh, sm] = startTime.split(':').map(Number);
  const [eh, em] = endTime.split(':').map(Number);
  const start = sh * 60 + sm;
  const end = eh * 60 + em;
  const cur = now.getHours() * 60 + now.getMinutes();
  if (cur >= start && cur < end) return 'now';
  if (cur < start) return 'upnext';
  return null;
}

function getDayKey() {
  return ['sun','mon','tue','wed','thu','fri','sat'][new Date().getDay()];
}

export default function TimeBlock({ block }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: block.id });
  const checkBlock = useAppStore(s => s.checkBlock);

  const status = getStatus(block.startTime, block.endTime, block.checked);
  const dayKey = getDayKey();
  const note = block.goldenHourNotes?.[dayKey];

  return (
    <div ref={setNodeRef} style={{
      transform: CSS.Transform.toString(transform),
      transition,
      opacity: isDragging ? 0.5 : 1,
      background: '#fff',
      border: `0.5px solid ${status === 'now' ? '#bbf7d0' : '#e5e7eb'}`,
      borderRadius: 8,
      padding: '12px 14px',
      display: 'flex',
      alignItems: 'flex-start',
      gap: 12,
    }}>
      <div {...attributes} {...listeners} style={{
        cursor: isDragging ? 'grabbing' : 'grab',
        color: '#d1d5db', fontSize: 18, paddingTop: 2, userSelect: 'none',
      }}>⠿</div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
          <span style={{ fontSize: 12, color: '#6b7280', fontVariantNumeric: 'tabular-nums' }}>
            {block.startTime}–{block.endTime}
          </span>
          <BlockStatus status={status} />
        </div>
        <div style={{ fontWeight: 600, fontSize: 14, marginTop: 4 }}>{block.title}</div>
        {note && <div style={{ fontSize: 12, color: '#6b7280', marginTop: 2 }}>→ {note}</div>}
        <div style={{ marginTop: 6 }}>
          <PillarBadge pillarId={block.pillar} />
        </div>
      </div>
      <Checkbox checked={block.checked} onChange={() => checkBlock(block.id)} />
    </div>
  );
}
