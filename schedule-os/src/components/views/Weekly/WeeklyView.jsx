import { DndContext, PointerSensor, useSensor, useSensors, DragOverlay } from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
import DayColumn from './DayColumn';
import WeekBlock from './WeekBlock';
import useAppStore from '../../../store/useAppStore';
import { useState } from 'react';

const DAYS = ['mon', 'tue', 'wed', 'thu', 'fri'];

export default function WeeklyView() {
  const weeklyBlocks = useAppStore(s => s.weeklyBlocks);
  const reorderWeekBlock = useAppStore(s => s.reorderWeekBlock);
  const moveWeekBlock = useAppStore(s => s.moveWeekBlock);
  const [activeBlock, setActiveBlock] = useState(null);

  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 5 } }));

  function findBlockDay(blockId) {
    return DAYS.find(d => weeklyBlocks[d].some(b => b.id === blockId));
  }

  function handleDragStart(event) {
    const { active } = event;
    const day = active.data.current?.day || findBlockDay(active.id);
    const block = weeklyBlocks[day]?.find(b => b.id === active.id);
    setActiveBlock(block);
  }

  function handleDragEnd(event) {
    const { active, over } = event;
    setActiveBlock(null);
    if (!over) return;

    const fromDay = active.data.current?.day || findBlockDay(active.id);
    const toDay = DAYS.includes(over.id) ? over.id : findBlockDay(over.id);

    if (!fromDay || !toDay) return;

    if (fromDay === toDay) {
      const blocks = weeklyBlocks[fromDay];
      const oldIdx = blocks.findIndex(b => b.id === active.id);
      const newIdx = blocks.findIndex(b => b.id === over.id);
      if (oldIdx !== -1 && newIdx !== -1 && oldIdx !== newIdx) {
        reorderWeekBlock(fromDay, arrayMove(blocks, oldIdx, newIdx));
      }
    } else {
      const toBlocks = weeklyBlocks[toDay];
      const insertIdx = over.id === toDay ? toBlocks.length : toBlocks.findIndex(b => b.id === over.id);
      moveWeekBlock(active.id, fromDay, toDay, null, insertIdx === -1 ? toBlocks.length : insertIdx);
    }
  }

  return (
    <div>
      <div style={{ marginBottom: 20 }}>
        <h1 style={{ fontSize: 22, fontWeight: 700 }}>Weekly Planner</h1>
        <p style={{ color: '#6b7280', fontSize: 14, marginTop: 4 }}>Drag blocks between days to reschedule</p>
      </div>
      <DndContext sensors={sensors} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
        <div style={{ display: 'flex', gap: 12, overflowX: 'auto' }}>
          {DAYS.map(day => (
            <DayColumn key={day} day={day} blocks={weeklyBlocks[day]} />
          ))}
        </div>
        <DragOverlay>
          {activeBlock ? <WeekBlock block={activeBlock} day="" /> : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
}
