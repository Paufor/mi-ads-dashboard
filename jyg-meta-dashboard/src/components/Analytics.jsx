import {
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts'
import ChartCard from './ChartCard.jsx'
import { campaigns, dailyData, accountTotals } from '../data.js'
import styles from './Analytics.module.css'

const ACCENT = '#8d60ca'
const GREEN  = '#4caf82'
const GRID   = 'rgba(255,255,255,0.05)'
const TICK   = '#555'
const TT_STYLE = { background: '#1a1a1a', border: '0.5px solid #333', borderRadius: 6, fontSize: 12 }

const PIE_COLORS = ['#8d60ca','#7a4fb0','#6a40a0','#5a3090','#444','#555','#333']

const activeCampsRoas = campaigns
  .filter(c => c.roas != null)
  .sort((a,b) => b.roas - a.roas)

const spendPie = campaigns.map((c,i) => ({
  name: c.name.replace('JYG ','').replace(' 2026','').replace(' – ',' – '),
  value: parseFloat(c.spend.toFixed(0)),
  color: PIE_COLORS[i] ?? '#333'
}))

const funnel = [
  { label: 'Impresiones',      val: accountTotals.impressions },
  { label: 'Clics',            val: accountTotals.clicks },
  { label: 'Landing PV',       val: accountTotals.landingPageViews },
  { label: 'View Content',     val: accountTotals.viewContent },
  { label: 'Add to Cart',      val: accountTotals.addToCart },
  { label: 'Init. Checkout',   val: accountTotals.initiateCheckout },
  { label: 'Compras',          val: accountTotals.purchases },
]
const maxFunnel = funnel[0].val

export default function Analytics() {
  return (
    <div>
      <div className={styles.chartRow}>
        <ChartCard title="ROAS por campaña">
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={activeCampsRoas} layout="vertical" margin={{ top:4, right:16, bottom:0, left:8 }}>
              <CartesianGrid stroke={GRID} horizontal={false} />
              <XAxis type="number" tick={{ fill: TICK, fontSize: 10 }} tickFormatter={v=>v+'x'} />
              <YAxis type="category" dataKey="name" tick={{ fill: TICK, fontSize: 10 }} width={160}
                tickFormatter={n => n.length > 22 ? n.slice(0,22)+'…' : n} />
              <Tooltip contentStyle={TT_STYLE} formatter={v=>[v.toFixed(2)+'x','ROAS']} />
              <Bar dataKey="roas" fill={ACCENT} radius={[0,4,4,0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Distribución del gasto">
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie data={spendPie} dataKey="value" cx="50%" cy="50%" outerRadius={80} innerRadius={40}>
                {spendPie.map((e,i) => <Cell key={i} fill={e.color} />)}
              </Pie>
              <Tooltip contentStyle={TT_STYLE} formatter={(v,n)=>['$'+v, n]} />
              <Legend iconType="square" iconSize={8} wrapperStyle={{ fontSize:10, color:'#888' }} />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      <ChartCard title="Embudo de conversión (30 días)">
        <div className={styles.funnel}>
          {funnel.map((f, i) => {
            const pct = (f.val / maxFunnel * 100).toFixed(1)
            const prev = i > 0 ? funnel[i-1].val : f.val
            const dropPct = i > 0 ? ((1 - f.val/prev)*100).toFixed(0) : null
            return (
              <div key={f.label} className={styles.funnelRow}>
                <div className={styles.funnelLabel}>{f.label}</div>
                <div className={styles.funnelBarWrap}>
                  <div className={styles.funnelBar} style={{ width: pct+'%' }} />
                </div>
                <div className={styles.funnelVal}>{f.val.toLocaleString()}</div>
                {dropPct && <div className={styles.funnelDrop}>–{dropPct}%</div>}
              </div>
            )
          })}
        </div>
      </ChartCard>

      <ChartCard title="CTR vs CPC por día (doble eje)">
        <ResponsiveContainer width="100%" height={180}>
          <LineChart data={dailyData} margin={{ top:4, right:16, bottom:0, left:-10 }}>
            <CartesianGrid stroke={GRID} vertical={false} />
            <XAxis dataKey="date" tick={{ fill: TICK, fontSize: 10 }} interval={3} />
            <YAxis yAxisId="left"  tick={{ fill: TICK, fontSize: 10 }} tickFormatter={v=>v.toFixed(1)+'%'} />
            <YAxis yAxisId="right" orientation="right" tick={{ fill: TICK, fontSize: 10 }} tickFormatter={v=>'$'+v.toFixed(2)} />
            <Tooltip contentStyle={TT_STYLE} formatter={(v,n) => n === 'CTR' ? [v.toFixed(2)+'%','CTR'] : ['$'+v.toFixed(3),'CPC']} />
            <Legend iconType="square" iconSize={8} wrapperStyle={{ fontSize:11, color:'#888' }} />
            <Line yAxisId="left"  type="monotone" dataKey="ctr" name="CTR" stroke={ACCENT} strokeWidth={2} dot={false} />
            <Line yAxisId="right" type="monotone" dataKey="cpc" name="CPC" stroke={GREEN}  strokeWidth={2} dot={false} strokeDasharray="4 2" />
          </LineChart>
        </ResponsiveContainer>
      </ChartCard>

      <ChartCard title="Spend vs Compras diario">
        <ResponsiveContainer width="100%" height={160}>
          <LineChart data={dailyData} margin={{ top:4, right:16, bottom:0, left:-10 }}>
            <CartesianGrid stroke={GRID} vertical={false} />
            <XAxis dataKey="date" tick={{ fill: TICK, fontSize: 10 }} interval={3} />
            <YAxis yAxisId="left"  tick={{ fill: TICK, fontSize: 10 }} tickFormatter={v=>'$'+v} />
            <YAxis yAxisId="right" orientation="right" tick={{ fill: TICK, fontSize: 10 }} />
            <Tooltip contentStyle={TT_STYLE} />
            <Legend iconType="square" iconSize={8} wrapperStyle={{ fontSize:11, color:'#888' }} />
            <Line yAxisId="left"  type="monotone" dataKey="spend"     name="Gasto ($)" stroke={ACCENT} strokeWidth={2} dot={false} />
            <Line yAxisId="right" type="monotone" dataKey="purchases" name="Compras"   stroke={GREEN}  strokeWidth={2} dot={{ r:2, fill:GREEN }} />
          </LineChart>
        </ResponsiveContainer>
      </ChartCard>
    </div>
  )
}
