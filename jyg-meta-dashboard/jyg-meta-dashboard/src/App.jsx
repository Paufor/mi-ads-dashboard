import { useState } from 'react'
import Sidebar from './components/Sidebar.jsx'
import Overview from './components/Overview.jsx'
import Campaigns from './components/Campaigns.jsx'
import Analytics from './components/Analytics.jsx'
import Creatives from './components/Creatives.jsx'
import Budget from './components/Budget.jsx'
import styles from './App.module.css'

const SECTIONS = [
  { id: 'overview',   label: 'Vista General' },
  { id: 'campaigns',  label: 'Campañas' },
  { id: 'analytics',  label: 'Analítica' },
  { id: 'creatives',  label: 'Creatividades' },
  { id: 'budget',     label: 'Presupuesto' },
]

const VIEWS = {
  overview:  <Overview />,
  campaigns: <Campaigns />,
  analytics: <Analytics />,
  creatives: <Creatives />,
  budget:    <Budget />,
}

export default function App() {
  const [active, setActive] = useState('overview')
  const label = SECTIONS.find(s => s.id === active)?.label

  return (
    <div className={styles.layout}>
      <Sidebar sections={SECTIONS} active={active} onNav={setActive} />
      <div className={styles.main}>
        <header className={styles.topbar}>
          <span className={styles.topbarTitle}>{label}</span>
          <span className={styles.dateBadge}>26 Mar – 24 Apr 2026 · 30 días</span>
        </header>
        <div className={styles.content}>
          {VIEWS[active]}
        </div>
      </div>
    </div>
  )
}
