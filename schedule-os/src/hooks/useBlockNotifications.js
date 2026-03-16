import { useEffect } from 'react';
import useAppStore from '../store/useAppStore';

function getDayKey() {
  return ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'][new Date().getDay()];
}

function parseMins(timeStr) {
  const [h, m] = timeStr.split(':').map(Number);
  return h * 60 + m;
}

function formatDuration(start, end) {
  const diff = parseMins(end) - parseMins(start);
  const h = Math.floor(diff / 60);
  const m = diff % 60;
  if (h && m) return `${h}h ${m}m`;
  if (h) return `${h}h`;
  return `${m}m`;
}

function msUntil(targetMins) {
  const now = new Date();
  const curMins = now.getHours() * 60 + now.getMinutes();
  const subSecMs = now.getSeconds() * 1000 + now.getMilliseconds();
  return (targetMins - curMins) * 60_000 - subSecMs;
}

function fireNotification(title, body) {
  if (Notification.permission === 'granted') {
    new Notification(title, { body });
  }
}

export function useBlockNotifications() {
  useEffect(() => {
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission().catch(() => {});
    }
  }, []);

  const todayBlocks = useAppStore(s => s.todayBlocks);

  useEffect(() => {
    if (!('Notification' in window)) return;

    const day = getDayKey();
    const timers = [];

    for (const block of todayBlocks) {
      const startMins = parseMins(block.startTime);
      const duration = formatDuration(block.startTime, block.endTime);
      const focusNote = block.goldenHourNotes?.[day];
      const body = focusNote
        ? `Focus: ${focusNote} · Duration: ${duration}`
        : `Duration: ${duration}`;

      const msWarning = msUntil(startMins - 2);
      if (msWarning > 0) {
        timers.push(setTimeout(() => fireNotification(`⏰ ${block.title} in 2 minutes`, body), msWarning));
      }

      const msStart = msUntil(startMins);
      if (msStart > 0) {
        timers.push(setTimeout(() => fireNotification(`▶ ${block.title} starting now`, body), msStart));
      }
    }

    return () => timers.forEach(clearTimeout);
  }, [todayBlocks]);
}
