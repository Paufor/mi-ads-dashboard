import styles from './Sidebar.module.css'

export default function Sidebar({ sections, active, onNav }) {
  return (
    <nav className={styles.sidebar}>
      <div className={styles.logo}>
        <span className={styles.logoMark}>J</span>
        <span className={styles.logoText}>JYG PRO FISHING</span>
      </div>
      <div className={styles.subtitle}>Meta Ads Dashboard</div>
      <ul className={styles.navList}>
        {sections.map(s => (
          <li key={s.id}>
            <button
              className={`${styles.navItem} ${active === s.id ? styles.active : ''}`}
              onClick={() => onNav(s.id)}
            >
              <span className={styles.dot} />
              {s.label}
            </button>
          </li>
        ))}
      </ul>
      <div className={styles.footer}>
        <div className={styles.footerLabel}>Cuenta</div>
        <div className={styles.footerValue}>act_966568815440581</div>
      </div>
    </nav>
  )
}
