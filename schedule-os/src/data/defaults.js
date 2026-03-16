export const DEFAULT_PHASES = [
  {
    id: 'ph1', label: 'Phase 1 — Foundation', startDate: '2026-01-01', endDate: '2026-03-31',
    milestones: [
      { id: 'm1', text: 'Publish 10 LinkedIn posts', done: false },
      { id: 'm2', text: 'Complete Databricks fundamentals course', done: false },
      { id: 'm3', text: 'Finish LSS Green Belt project charter', done: false },
    ],
  },
  {
    id: 'ph2', label: 'Phase 2 — Build', startDate: '2026-04-01', endDate: '2026-06-30',
    milestones: [
      { id: 'm4', text: 'Launch Substack newsletter', done: false },
      { id: 'm5', text: 'Complete Databricks Associate certification', done: false },
      { id: 'm6', text: 'Submit LSS Green Belt project', done: false },
    ],
  },
  {
    id: 'ph3', label: 'Phase 3 — Scale', startDate: '2026-07-01', endDate: '2026-09-30',
    milestones: [
      { id: 'm7', text: 'Reach 1,000 LinkedIn followers', done: false },
      { id: 'm8', text: 'Publish 5 Substack posts', done: false },
      { id: 'm9', text: 'Complete AI specialty certification', done: false },
    ],
  },
];

export const DEFAULT_WEEKLY_STATS = [
  { id: 's1', label: 'LinkedIn posts published', pillar: 'content', value: 0, max: 5 },
  { id: 's2', label: 'Substack words written', pillar: 'content', value: 0, max: 2000 },
  { id: 's3', label: 'Databricks study hours', pillar: 'upskill', value: 0, max: 10 },
  { id: 's4', label: 'LSS study hours', pillar: 'lss', value: 0, max: 5 },
  { id: 's5', label: 'Books/articles read', pillar: 'reading', value: 0, max: 3 },
];
