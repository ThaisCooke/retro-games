import { useState } from 'react';
import Shell from './components/Shell/Shell';
import TodayView from './components/views/Today/TodayView';
import WeeklyView from './components/views/Weekly/WeeklyView';
import NinetyDayView from './components/views/NinetyDay/NinetyDayView';
import IdeasView from './components/views/Ideas/IdeasView';
import ProgressView from './components/views/Progress/ProgressView';
import { useMidnightReset } from './hooks/useMidnightReset';
import { useMondayReset } from './hooks/useMondayReset';
import { useBlockNotifications } from './hooks/useBlockNotifications';

const VIEWS = {
  today: TodayView,
  weekly: WeeklyView,
  ninetyDay: NinetyDayView,
  ideas: IdeasView,
  progress: ProgressView,
};

export default function App() {
  const [view, setView] = useState('today');
  useMidnightReset();
  useMondayReset();
  useBlockNotifications();

  const View = VIEWS[view] || TodayView;

  return (
    <Shell view={view} setView={setView}>
      <View />
    </Shell>
  );
}
