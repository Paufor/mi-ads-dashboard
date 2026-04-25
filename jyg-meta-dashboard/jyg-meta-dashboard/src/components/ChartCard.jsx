import styles from './ChartCard.module.css'

export default function ChartCard({ title, children, fullWidth }) {
  return (
    <div className={`${styles.card} ${fullWidth ? styles.full : ''}`}>
      <div className={styles.title}>{title}</div>
      {children}
    </div>
  )
}
