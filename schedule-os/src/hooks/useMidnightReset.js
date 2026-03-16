import { useEffect } from 'react';
import useAppStore from '../store/useAppStore';

function todayISO() {
  return new Date().toISOString().slice(0, 10);
}

export function useMidnightReset() {
  const resetTodayBlocks = useAppStore(s => s.resetTodayBlocks);
  const todayBlocksDate = useAppStore(s => s.todayBlocksDate);

  useEffect(() => {
    if (todayBlocksDate !== todayISO()) {
      resetTodayBlocks(todayISO());
    }

    function scheduleNext() {
      const now = new Date();
      const next = new Date(now);
      next.setHours(24, 0, 0, 0);
      const ms = next - now;
      return setTimeout(() => {
        resetTodayBlocks(todayISO());
        scheduleNext();
      }, ms);
    }

    const t = scheduleNext();
    return () => clearTimeout(t);
  }, []);
}
