import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import KpiCard from './KpiCard.jsx'
import ChartCard from './ChartCard.jsx'
import { campaigns, accountTotals, dailyData } from '../data.js'
import styles from './Budget.module.css'

const ACCENT = '#8d60ca'
const GRID   = 'rgba(255,255,255,0.05)'
const TICK   = '#555'
const TT_STYLE = { background: '#1a1a1a', border: '0.5px solid #333', borderRadius: 6, fontSize: 12 }

const spendDays = dailyData.filter(d => d.spend > 0).length
const avgDaily  = accountTotals.spend / spendDays

const spendByCamp = campaigns
  .filter(c => c.spend > 0)
  .sort((a,b) => b.spend - a.spend)
  .map(c => ({
    name: c.name.length > 28 ? c.name.slice(0,28)+'…' : c.name,
    spend: parseFloat(c.spend.toFixed(0)),
    status: c.status,
  }))

function PacingBar({ label, spend, budget, status, notes }) {
  const isActive = status === 'ACTIVE'
  const pct = budget ? Math.min((spend / (budget * 30 / 100)) * 100, 100) : 50
  const barColor = isActive ? ACCENT : '#444'

  return (
    <div className={styles.pacingCard}>
      <div className={styles.pacingTop}>
        <span className={styles.pacingName}>{label}</span>
        <span className={isActive ? styles.badgeActive : styles.badgePaused}>
          {isActive ? 'Activo' : 'Pausado'}
        </span>
      </div>
      <div className={styles.pacingSpend}>${spend.toFixed(0)}</div>
      <div className={styles.pacingBarWrap}>
        <div className={styles.pacingBarFill} style={{ width: pct+'%', background: barColor }} />
      </div>
      <div className={styles.pacingNotes}>{notes || (budget ? `Daily budget: $${(budget/100).toFixed(0)}` : 'Sin daily budget')}</div>
    </div>
  )
}

export default function Budget() {
  return (
    <div>
      <div className={styles.kpiGrid}>
        <KpiCard label="Total gastado"       value={`$${accountTotals.spend.toFixed(0)}`}        sub="30 días"                  subColor="accent" />
        <KpiCard label="Gasto diario prom."  value={`$${avgDaily.toFixed(2)}`}                    sub={`${spendDays} días con gasto`} />
        <KpiCard label="Revenue generado"    value={`$${accountTotals.revenue.toLocaleString()}`} sub={`ROAS: ${accountTotals.roas.toFixed(2)}x`} subColor="good" />
      </div>

      <div className={styles.pacingGrid}>
        <PacingBar label="SB 2026 – Prospect/Scale 1"  spend={147.38} budget={5000}  status="ACTIVE" />
        <PacingBar label="Live Series – Prospecting"    spend={148.86} budget={null}  status="ACTIVE" />
        <PacingBar label="Striped Bass – Prospecting"   spend={302.03} budget={null}  status="ACTIVE" />
        <PacingBar label="Giveaway IG – Leads"          spend={71.96}  budget={1500}  status="PAUSED" />
        <PacingBar label="Giveaway Engagement (no flw)" spend={98.92}  budget={null}  status="PAUSED" />
        <PacingBar label="Giveaway Engagement (flw)"    spend={37.98}  budget={null}  status="PAUSED" />
        <PacingBar label="Live Series Manual Test"       spend={138.18} budget={null}  status="PAUSED" />
      </div>

      <ChartCard title="Gasto acumulado por campaña">
        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={spendByCamp} layout="vertical" margin={{ top:4, right:16, bottom:0, left:8 }}>
            <CartesianGrid stroke={GRID} horizontal={false} />
            <XAxis type="number" tick={{ fill: TICK, fontSize: 10 }} tickFormatter={v=>'$'+v} />
            <YAxis type="category" dataKey="name" tick={{ fill: TICK, fontSize: 10 }} width={200} />
            <Tooltip contentStyle={TT_STYLE} formatter={v=>['$'+v, 'Gasto']} />
            <Bar dataKey="spend" radius={[0,4,4,0]}
              fill={ACCENT}
            />
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>

      <ChartCard title="Gasto acumulado por día (30d)">
        <ResponsiveContainer width="100%" height={150}>
          <BarChart data={dailyData} margin={{ top:4, right:4, bottom:0, left:-10 }}>
            <CartesianGrid stroke={GRID} vertical={false} />
            <XAxis dataKey="date" tick={{ fill: TICK, fontSize: 10 }} interval={3} />
            <YAxis tick={{ fill: TICK, fontSize: 10 }} tickFormatter={v=>'$'+v} />
            <Tooltip contentStyle={TT_STYLE} formatter={v=>['$'+v.toFixed(2),'Gasto']} />
            <Bar dataKey="spend" fill="#5a3090" radius={[3,3,0,0]} />
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>
    </div>
  )
}
