import { useState } from 'react'
import { ads } from '../data.js'
import styles from './Creatives.module.css'

const SORT_OPTIONS = [
  { key: 'roas',        label: 'ROAS' },
  { key: 'spend',       label: 'Gasto' },
  { key: 'ctr',         label: 'CTR' },
  { key: 'purchases',   label: 'Compras' },
  { key: 'impressions', label: 'Impresiones' },
]

function roasColor(roas) {
  if (roas == null) return 'var(--text3)'
  if (roas >= 10)   return 'var(--green)'
  if (roas >= 5)    return 'var(--amber)'
  return 'var(--red)'
}

const maxRoas = Math.max(...ads.filter(a => a.roas).map(a => a.roas))

export default function Creatives() {
  const [sortKey, setSortKey]     = useState('roas')
  const [filterRoas, setFilter]   = useState(false)

  let list = [...ads]
  if (filterRoas) list = list.filter(a => a.roas != null && a.roas > 0)
  list.sort((a,b) => {
    const av = a[sortKey] ?? -Infinity
    const bv = b[sortKey] ?? -Infinity
    return bv - av
  })

  return (
    <div>
      <div className={styles.toolbar}>
        <div className={styles.sortGroup}>
          {SORT_OPTIONS.map(o => (
            <button
              key={o.key}
              className={`${styles.sortBtn} ${sortKey === o.key ? styles.sortActive : ''}`}
              onClick={() => setSortKey(o.key)}
            >{o.label}</button>
          ))}
        </div>
        <button
          className={`${styles.sortBtn} ${filterRoas ? styles.sortActive : ''}`}
          onClick={() => setFilter(f => !f)}
        >Solo con ROAS</button>
      </div>

      <div className={styles.grid}>
        {list.map(ad => (
          <div key={ad.id} className={styles.card}>
            <div className={styles.adName} title={ad.name}>{ad.name}</div>
            <div className={styles.stats}>
              <div className={styles.stat}>
                <span className={styles.statLabel}>Gasto</span>
                <span className={styles.statVal}>${ad.spend.toFixed(0)}</span>
              </div>
              <div className={styles.stat}>
                <span className={styles.statLabel}>Impr.</span>
                <span className={styles.statVal}>{ad.impressions.toLocaleString()}</span>
              </div>
              <div className={styles.stat}>
                <span className={styles.statLabel}>CTR</span>
                <span className={styles.statVal}>{ad.ctr.toFixed(2)}%</span>
              </div>
              <div className={styles.stat}>
                <span className={styles.statLabel}>Compras</span>
                <span className={styles.statVal}>{ad.purchases}</span>
              </div>
            </div>
            <div className={styles.roasRow}>
              <span className={styles.roasLabel}>ROAS</span>
              <span className={styles.roasVal} style={{ color: roasColor(ad.roas) }}>
                {ad.roas != null ? `${ad.roas.toFixed(2)}x` : '—'}
              </span>
            </div>
            <div className={styles.roasBarWrap}>
              <div
                className={styles.roasBarFill}
                style={{
                  width: ad.roas ? `${(ad.roas / maxRoas * 100).toFixed(1)}%` : '0%',
                  background: roasColor(ad.roas),
                }}
              />
            </div>
            {ad.videoViews > 0 && (
              <div className={styles.videoViews}>{ad.videoViews.toLocaleString()} video views</div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
