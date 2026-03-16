export const DEFAULT_BLOCKS = [
  {
    id: 'b1', startTime: '05:30', endTime: '07:00', title: 'Golden Hour', pillar: 'content',
    goldenHourNotes: {
      mon: 'LinkedIn drafts', tue: 'Cloud/AI upskilling',
      wed: 'LinkedIn drafts', thu: 'Cloud/AI upskilling',
      fri: 'Substack or reading', sat: null, sun: null,
    },
    checked: false, order: 0,
  },
  { id: 'b2', startTime: '07:00', endTime: '09:00', title: 'Morning Prep & Commute', pillar: 'reading', goldenHourNotes: null, checked: false, order: 1 },
  { id: 'b3', startTime: '09:00', endTime: '11:00', title: 'Full-time Job Block 1', pillar: null, goldenHourNotes: null, checked: false, order: 2 },
  { id: 'b4', startTime: '11:00', endTime: '13:00', title: 'Gym + Lunch', pillar: null, goldenHourNotes: null, checked: false, order: 3 },
  {
    id: 'b5', startTime: '13:00', endTime: '15:00', title: 'Full-time Job Block 2', pillar: null,
    goldenHourNotes: {
      mon: 'Cloud/AI practice', tue: 'LSS study if idle',
      wed: 'Cloud/AI practice', thu: 'LSS study if idle',
      fri: null, sat: null, sun: null,
    },
    checked: false, order: 4,
  },
  { id: 'b6', startTime: '15:00', endTime: '17:00', title: 'Deep Work / Upskilling', pillar: 'upskill', goldenHourNotes: null, checked: false, order: 5 },
  { id: 'b7', startTime: '17:00', endTime: '19:00', title: 'Free Time', pillar: null, goldenHourNotes: null, checked: false, order: 6 },
  { id: 'b8', startTime: '19:00', endTime: '20:00', title: 'Light Tasks', pillar: 'content', goldenHourNotes: null, checked: false, order: 7 },
];
