import Nav from '../Nav/Nav';
import styles from './Shell.module.css';

export default function Shell({ view, setView, children }) {
  return (
    <div className={styles.shell}>
      <aside className={styles.sidebar}>
        <div className={styles.logo}>Schedule OS</div>
        <Nav view={view} setView={setView} />
      </aside>
      <main className={styles.main}>{children}</main>
    </div>
  );
}
