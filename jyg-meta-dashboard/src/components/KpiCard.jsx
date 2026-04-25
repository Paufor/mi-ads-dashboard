import styles from './KpiCard.module.css'

export default function KpiCard({ label, value, sub, subColor }) {
  const subStyle = subColor ? { color: subColor === 'good' ? 'var(--green)' : subColor === 'bad' ? 'var(--red)' : subColor === 'accent' ? 'var(--accent)' : 'var(--text2)' } : { color: 'var(--text2)' }
  return (
    <div className={styles.card}>
      <div className={styles.label}>{label}</div>
      <div className={styles.value}>{value}</div>
      {sub && <div className={styles.sub} style={subStyle}>{sub}</div>}
    </div>
  )
}
