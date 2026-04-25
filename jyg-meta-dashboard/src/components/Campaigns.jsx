import { useState } from 'react'
import { campaigns } from '../data.js'
import styles from './Campaigns.module.css'

const COLS = [
  { key: 'name',        label: 'Campaña' },
  { key: 'status',      label: 'Estado' },
  { key: 'spend',       label: 'Gasto' },
  { key: 'impressions', label: 'Impresiones' },
  { key: 'ctr',         label: 'CTR' },
  { key: 'cpc',         label: 'CPC' },
  { key: 'purchases',   label: 'Compras' },
  { key: 'roas',        label: 'ROAS' },
]

function roasClass(roas) {
  if (roas == null) return styles.roasNull
  if (roas >= 7) return styles.roasGood
  if (roas >= 3) return styles.roasOk
  return styles.roasBad
}

export default function Campaigns() {
  const [sortKey, setSortKey] = useState('spend')
  const [sortDir, setSortDir] = useState(-1)

  function handleSort(key) {
    if (key === sortKey) setSortDir(d => d * -1)
    else { setSortKey(key); setSortDir(-1) }
  }

  const sorted = [...campaigns].sort((a, b) => {
    const av = a[sortKey] ?? -Infinity
    const bv = b[sortKey] ?? -Infinity
    if (typeof av === 'string') return av.localeCompare(bv) * sortDir
    return (av - bv) * sortDir
  })

  return (
    <div className={styles.wrapper}>
      <table className={styles.table}>
        <thead>
          <tr>
            {COLS.map(c => (
              <th key={c.key} onClick={() => handleSort(c.key)} className={styles.th}>
                {c.label}
                <span className={styles.arrow}>{sortKey === c.key ? (sortDir === 1 ? ' ↑' : ' ↓') : ' ↕'}</span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sorted.map(c => (
            <tr key={c.id} className={styles.row}>
              <td className={styles.nameCell} title={c.name}>{c.name}</td>
              <td>
                <span className={c.status === 'ACTIVE' ? styles.statusActive : styles.statusPaused}>
                  {c.status === 'ACTIVE' ? 'Activo' : 'Pausado'}
                </span>
              </td>
              <td>${c.spend.toFixed(0)}</td>
              <td>{c.impressions.toLocaleString()}</td>
              <td>{c.ctr.toFixed(2)}%</td>
              <td>${c.cpc.toFixed(3)}</td>
              <td>{c.purchases}</td>
              <td className={roasClass(c.roas)}>
                {c.roas != null ? `${c.roas.toFixed(2)}x` : '—'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
