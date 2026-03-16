import { DndContext, closestCenter, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy, arrayMove } from '@dnd-kit/sortable';
import TimeBlock from './TimeBlock';
import useAppStore from '../../../store/useAppStore';

export default function TodayView() {
  const todayBlocks = useAppStore(s => s.todayBlocks);
  const reorderTodayBlocks = useAppStore(s => s.reorderTodayBlocks);

  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 5 } }));

  function handleDragEnd(event) {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const oldIdx = todayBlocks.findIndex(b => b.id === active.id);
    const newIdx = todayBlocks.findIndex(b => b.id === over.id);
    reorderTodayBlocks(arrayMove(todayBlocks, oldIdx, newIdx));
  }

  const today = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
  const completed = todayBlocks.filter(b => b.checked).length;

  return (
    <div>
      <div style={{ marginBottom: 20 }}>
        <h1 style={{ fontSize: 22, fontWeight: 700 }}>Today</h1>
        <p style={{ color: '#6b7280', fontSize: 14, marginTop: 4 }}>{today} · {completed}/{todayBlocks.length} blocks done</p>
      </div>
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={todayBlocks.map(b => b.id)} strategy={verticalListSortingStrategy}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {todayBlocks.map(block => <TimeBlock key={block.id} block={block} />)}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
}
