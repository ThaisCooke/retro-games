import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { DEFAULT_BLOCKS } from '../data/schedule';
import { DEFAULT_PHASES, DEFAULT_WEEKLY_STATS } from '../data/defaults';

function todayISO() {
  return new Date().toISOString().slice(0, 10);
}

function thisMondayISO() {
  const d = new Date();
  const day = d.getDay(); // 0=Sun
  const diff = day === 0 ? -6 : 1 - day;
  d.setDate(d.getDate() + diff);
  return d.toISOString().slice(0, 10);
}

const useAppStore = create(
  persist(
    (set, get) => ({
      // Today
      todayBlocks: DEFAULT_BLOCKS,
      todayBlocksDate: todayISO(),

      // Weekly
      weeklyBlocks: {
        mon: DEFAULT_BLOCKS.map(b => ({ ...b, id: b.id + '_mon' })),
        tue: DEFAULT_BLOCKS.map(b => ({ ...b, id: b.id + '_tue' })),
        wed: DEFAULT_BLOCKS.map(b => ({ ...b, id: b.id + '_wed' })),
        thu: DEFAULT_BLOCKS.map(b => ({ ...b, id: b.id + '_thu' })),
        fri: DEFAULT_BLOCKS.map(b => ({ ...b, id: b.id + '_fri' })),
      },

      // 90-day
      phases: DEFAULT_PHASES,

      // Ideas
      ideas: [],

      // Progress
      weeklyStats: {
        weekStartDate: thisMondayISO(),
        stats: DEFAULT_WEEKLY_STATS,
      },
      streakData: { currentStreak: 0, longestStreak: 0, lastCheckinDate: null },

      // Actions
      checkBlock: (blockId) =>
        set(s => ({
          todayBlocks: s.todayBlocks.map(b =>
            b.id === blockId ? { ...b, checked: !b.checked } : b
          ),
        })),

      reorderTodayBlocks: (newOrder) => set({ todayBlocks: newOrder }),

      reorderWeekBlock: (day, newOrder) =>
        set(s => ({ weeklyBlocks: { ...s.weeklyBlocks, [day]: newOrder } })),

      moveWeekBlock: (blockId, fromDay, toDay, newFromOrder, insertIndex) =>
        set(s => {
          const block = s.weeklyBlocks[fromDay].find(b => b.id === blockId);
          const newFrom = s.weeklyBlocks[fromDay].filter(b => b.id !== blockId);
          const newTo = [...s.weeklyBlocks[toDay]];
          newTo.splice(insertIndex, 0, block);
          return {
            weeklyBlocks: {
              ...s.weeklyBlocks,
              [fromDay]: newFrom,
              [toDay]: newTo,
            },
          };
        }),

      toggleMilestone: (phaseId, milestoneId) =>
        set(s => ({
          phases: s.phases.map(p =>
            p.id !== phaseId ? p : {
              ...p,
              milestones: p.milestones.map(m =>
                m.id === milestoneId ? { ...m, done: !m.done } : m
              ),
            }
          ),
        })),

      addIdea: (text, pillar) =>
        set(s => ({
          ideas: [
            ...s.ideas,
            { id: Date.now().toString(), text, pillar, createdAt: new Date().toISOString() },
          ],
        })),

      deleteIdea: (id) =>
        set(s => ({ ideas: s.ideas.filter(i => i.id !== id) })),

      updateWeeklyStat: (statId, value) =>
        set(s => ({
          weeklyStats: {
            ...s.weeklyStats,
            stats: s.weeklyStats.stats.map(st =>
              st.id === statId ? { ...st, value: Math.max(0, value) } : st
            ),
          },
        })),

      resetTodayBlocks: (dateISO) =>
        set({
          todayBlocks: DEFAULT_BLOCKS,
          todayBlocksDate: dateISO,
        }),

      resetWeeklyStats: (mondayISO) =>
        set(s => ({
          weeklyStats: {
            weekStartDate: mondayISO,
            stats: s.weeklyStats.stats.map(st => ({ ...st, value: 0 })),
          },
        })),

      incrementStreak: () =>
        set(s => {
          const today = todayISO();
          const { currentStreak, longestStreak, lastCheckinDate } = s.streakData;
          if (lastCheckinDate === today) return s;
          const yesterday = new Date();
          yesterday.setDate(yesterday.getDate() - 1);
          const yISO = yesterday.toISOString().slice(0, 10);
          const newStreak = lastCheckinDate === yISO ? currentStreak + 1 : 1;
          return {
            streakData: {
              currentStreak: newStreak,
              longestStreak: Math.max(longestStreak, newStreak),
              lastCheckinDate: today,
            },
          };
        }),
    }),
    {
      name: 'schedule-os',
      partialize: (state) => ({
        todayBlocks: state.todayBlocks,
        todayBlocksDate: state.todayBlocksDate,
        weeklyBlocks: state.weeklyBlocks,
        phases: state.phases,
        ideas: state.ideas,
        weeklyStats: state.weeklyStats,
        streakData: state.streakData,
      }),
    }
  )
);

export default useAppStore;
