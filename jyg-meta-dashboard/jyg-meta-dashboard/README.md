# JYG Pro Fishing — Meta Ads Dashboard

Dashboard interno de Meta Ads con datos reales del account. Stack: React + Vite + Recharts. Tema oscuro completo.

## Deploy en Vercel (método más rápido)

### Opción A — Vercel CLI
```bash
npm install -g vercel
cd jyg-meta-dashboard
npm install
vercel
```

### Opción B — Desde GitHub
1. Sube esta carpeta a un repo GitHub
2. Ve a vercel.com → New Project → importa el repo
3. Framework preset: **Vite** (se detecta automáticamente)
4. Build command: `npm run build`
5. Output directory: `dist`
6. Deploy ✓

### Desarrollo local
```bash
npm install
npm run dev
```
Abre http://localhost:5173

## Estructura del proyecto

```
src/
  data.js              ← Todos los datos reales de la API de Meta
  App.jsx              ← Layout principal + navegación
  components/
    Sidebar.jsx        ← Navegación lateral
    Overview.jsx       ← Vista General (KPIs + gráficos)
    Campaigns.jsx      ← Tabla ordenable de campañas
    Analytics.jsx      ← Gráficos de rendimiento + embudo
    Creatives.jsx      ← Grid de anuncios con filtros
    Budget.jsx         ← Pacing de presupuesto
    KpiCard.jsx        ← Componente tarjeta KPI reutilizable
    ChartCard.jsx      ← Wrapper para gráficos
```

## Actualizar datos

Edita `src/data.js` con los nuevos valores de la API de Meta. Los campos clave:

- `accountTotals` — resumen de cuenta (30d)
- `dailyData` — array de métricas día a día
- `campaigns` — datos por campaña
- `ads` — datos por anuncio individual
