import { useEffect } from 'react';
import useAppStore from '../store/useAppStore';

function thisMondayISO() {
  const d = new Date();
  const day = d.getDay();
  const diff = day === 0 ? -6 : 1 - day;
  d.setDate(d.getDate() + diff);
  return d.toISOString().slice(0, 10);
}

export function useMondayReset() {
  const resetWeeklyStats = useAppStore(s => s.resetWeeklyStats);
  const weekStartDate = useAppStore(s => s.weeklyStats.weekStartDate);

  useEffect(() => {
    const monday = thisMondayISO();
    if (weekStartDate < monday) {
      resetWeeklyStats(monday);
    }

    function scheduleNext() {
      const now = new Date();
      const next = new Date(now);
      const daysUntilMon = (1 - now.getDay() + 7) % 7 || 7;
      next.setDate(now.getDate() + daysUntilMon);
      next.setHours(0, 0, 0, 0);
      const ms = next - now;
      return setTimeout(() => {
        resetWeeklyStats(thisMondayISO());
        scheduleNext();
      }, ms);
    }

    const t = scheduleNext();
    return () => clearTimeout(t);
  }, []);
}
