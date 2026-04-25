import {
  BarChart, Bar, LineChart, Line,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts'
import KpiCard from './KpiCard.jsx'
import ChartCard from './ChartCard.jsx'
import { accountTotals, dailyData } from '../data.js'
import styles from './Overview.module.css'

const ACCENT = '#8d60ca'
const GREEN  = '#4caf82'
const GRID   = 'rgba(255,255,255,0.05)'
const TICK   = '#555'

const fmt = n => n?.toLocaleString('en-US') ?? '—'
const fmtUSD = n => n != null ? `$${n.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}` : '—'

export default function Overview() {
  const t = accountTotals

  return (
    <div>
      <div className={styles.kpiGrid}>
        <KpiCard label="Inversión total"  value={fmtUSD(t.spend)}        sub="30 días activos"          subColor="accent" />
        <KpiCard label="ROAS"             value={`${t.roas.toFixed(2)}x`} sub={`${fmtUSD(t.revenue)} revenue`} subColor="good" />
        <KpiCard label="Compras"          value={fmt(t.purchases)}        sub={`CPA: $${(t.spend/t.purchases).toFixed(2)}`} />
        <KpiCard label="CTR"              value={`${t.ctr.toFixed(2)}%`}  sub={`CPC: $${t.cpc.toFixed(3)}`}  subColor="good" />
        <KpiCard label="Impresiones"      value={fmt(t.impressions)}      sub={`Clics: ${fmt(t.clicks)}`} />
        <KpiCard label="Add to Cart"      value={fmt(t.addToCart)}        sub={`ATC rate: ${(t.addToCart/t.clicks*100).toFixed(2)}%`} />
        <KpiCard label="Checkouts init."  value={fmt(t.initiateCheckout)} sub={`Conv. rate: ${(t.purchases/t.initiateCheckout*100).toFixed(0)}%`} subColor="accent" />
        <KpiCard label="Video Views"      value={fmt(t.videoViews)}       sub={`Leads: ${fmt(t.leads)}`} />
      </div>

      <div className={styles.chartRow}>
        <ChartCard title="Gasto diario ($)">
          <ResponsiveContainer width="100%" height={160}>
            <BarChart data={dailyData} margin={{ top: 4, right: 4, bottom: 0, left: -10 }}>
              <CartesianGrid stroke={GRID} vertical={false} />
              <XAxis dataKey="date" tick={{ fill: TICK, fontSize: 10 }} interval={3} />
              <YAxis tick={{ fill: TICK, fontSize: 10 }} />
              <Tooltip contentStyle={{ background: '#1a1a1a', border: '0.5px solid #333', borderRadius: 6, fontSize: 12 }} formatter={v => [`$${v.toFixed(2)}`, 'Gasto']} />
              <Bar dataKey="spend" fill={ACCENT} radius={[3,3,0,0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Compras diarias">
          <ResponsiveContainer width="100%" height={160}>
            <BarChart data={dailyData} margin={{ top: 4, right: 4, bottom: 0, left: -10 }}>
              <CartesianGrid stroke={GRID} vertical={false} />
              <XAxis dataKey="date" tick={{ fill: TICK, fontSize: 10 }} interval={3} />
              <YAxis tick={{ fill: TICK, fontSize: 10 }} />
              <Tooltip contentStyle={{ background: '#1a1a1a', border: '0.5px solid #333', borderRadius: 6, fontSize: 12 }} formatter={v => [v, 'Compras']} />
              <Bar dataKey="purchases" fill={GREEN} radius={[3,3,0,0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      <ChartCard title="CTR diario (%)">
        <ResponsiveContainer width="100%" height={140}>
          <LineChart data={dailyData} margin={{ top: 4, right: 4, bottom: 0, left: -10 }}>
            <CartesianGrid stroke={GRID} vertical={false} />
            <XAxis dataKey="date" tick={{ fill: TICK, fontSize: 10 }} interval={3} />
            <YAxis tick={{ fill: TICK, fontSize: 10 }} tickFormatter={v => v.toFixed(1)+'%'} />
            <Tooltip contentStyle={{ background: '#1a1a1a', border: '0.5px solid #333', borderRadius: 6, fontSize: 12 }} formatter={v => [v.toFixed(2)+'%', 'CTR']} />
            <Line type="monotone" dataKey="ctr" stroke={ACCENT} strokeWidth={2} dot={{ r: 2, fill: ACCENT }} activeDot={{ r: 4 }} />
          </LineChart>
        </ResponsiveContainer>
      </ChartCard>

      <ChartCard title="Add to Cart diario">
        <ResponsiveContainer width="100%" height={130}>
          <BarChart data={dailyData} margin={{ top: 4, right: 4, bottom: 0, left: -10 }}>
            <CartesianGrid stroke={GRID} vertical={false} />
            <XAxis dataKey="date" tick={{ fill: TICK, fontSize: 10 }} interval={3} />
            <YAxis tick={{ fill: TICK, fontSize: 10 }} />
            <Tooltip contentStyle={{ background: '#1a1a1a', border: '0.5px solid #333', borderRadius: 6, fontSize: 12 }} formatter={v => [v, 'ATC']} />
            <Bar dataKey="atc" fill="#5a3090" radius={[3,3,0,0]} />
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>
    </div>
  )
}
