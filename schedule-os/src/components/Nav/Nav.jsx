import styles from './Nav.module.css';

const NAV_ITEMS = [
  { id: 'today',    label: 'Today',    icon: '◷' },
  { id: 'weekly',   label: 'Weekly',   icon: '◈' },
  { id: 'ninetyDay',label: '90-Day',   icon: '◎' },
  { id: 'ideas',    label: 'Ideas',    icon: '◇' },
  { id: 'progress', label: 'Progress', icon: '◆' },
];

export default function Nav({ view, setView }) {
  return (
    <nav className={styles.nav}>
      {NAV_ITEMS.map(item => (
        <button
          key={item.id}
          className={`${styles.item} ${view === item.id ? styles.active : ''}`}
          onClick={() => setView(item.id)}
        >
          <span className={styles.icon}>{item.icon}</span>
          <span className={styles.label}>{item.label}</span>
        </button>
      ))}
    </nav>
  );
}
