import { AnimatePresence, motion } from 'framer-motion';
import { Boxes, ChartColumn, Clock, Film, Info, Route, TriangleAlert } from 'lucide-react';
import { useState } from 'react';
import { Area, AreaChart, Bar, BarChart, CartesianGrid, Cell, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { Reveal, SectionHeading } from './ui';

/* ------------------------------------------------------------------
 * ALL NUMBERS BELOW ARE ILLUSTRATIVE SAMPLE DATA.
 * They demonstrate dashboard design only and are not business results.
 * ------------------------------------------------------------------ */
const inventory = {
  kpis: [
    { label: 'Sample SKUs', value: '520', icon: Boxes },
    { label: 'Below reorder', value: '38', icon: TriangleAlert },
    { label: 'Locations', value: '6', icon: Route },
  ],
  data: [
    { name: 'Bearings', value: 320 },
    { name: 'Fasteners', value: 410 },
    { name: 'Seals', value: 180 },
    { name: 'Castings', value: 140 },
    { name: 'Shafts', value: 110 },
    { name: 'Misc', value: 80 },
  ],
};
const workflow = {
  kpis: [
    { label: 'Open orders', value: '24', icon: Route },
    { label: 'Overdue steps', value: '7', icon: TriangleAlert },
    { label: 'Avg TAT (days)', value: '3.4', icon: Clock },
  ],
  data: [
    { name: 'Sales', planned: 1, actual: 1.2 },
    { name: 'Design', planned: 3, actual: 3.8 },
    { name: 'Planning', planned: 2, actual: 2.1 },
    { name: 'Purchase', planned: 4, actual: 5.2 },
    { name: 'Approval', planned: 1, actual: 1.6 },
    { name: 'Dispatch', planned: 5, actual: 4.7 },
  ],
};
const content = {
  kpis: [
    { label: 'Titles', value: '600', icon: Film },
    { label: 'Categories', value: '12', icon: ChartColumn },
    { label: 'Avg rating', value: '6.8', icon: Info },
  ],
  data: [
    { name: '2014', value: 22 },
    { name: '2015', value: 31 },
    { name: '2016', value: 46 },
    { name: '2017', value: 64 },
    { name: '2018', value: 82 },
    { name: '2019', value: 95 },
    { name: '2020', value: 88 },
    { name: '2021', value: 76 },
  ],
};

const tabs = [
  { id: 'inventory', label: 'Inventory view', story: 'Which categories hold the most stock, and how many items need reordering?' },
  { id: 'workflow', label: 'Workflow / TAT view', story: 'Planned vs actual days per stage — where do orders slow down?' },
  { id: 'content', label: 'Content trends view', story: 'How does the number of titles change across release years?' },
] as const;

const palette = ['#3b82f6', '#6366f1', '#8b5cf6', '#a855f7', '#22d3ee', '#06b6d4'];
const tooltipStyle = {
  contentStyle: { background: 'rgb(var(--surface))', border: '1px solid rgb(var(--line) / 0.15)', borderRadius: 12, fontSize: 12, color: 'rgb(var(--text))' },
  labelStyle: { color: 'rgb(var(--text))', fontWeight: 600 },
  cursor: { fill: 'rgb(var(--line) / 0.06)' },
};

export default function AnalyticsShowcase() {
  const [tab, setTab] = useState<(typeof tabs)[number]['id']>('inventory');
  const current = tab === 'inventory' ? inventory : tab === 'workflow' ? workflow : content;
  const story = tabs.find((t) => t.id === tab)!.story;

  return (
    <section id="analytics" className="section">
      <div className="container-x">
        <SectionHeading
          index="05"
          eyebrow="Analytics showcase"
          title="How I think about"
          accent="dashboards."
          intro="Each view starts with a question, shows a few KPIs, then one chart that answers it. Switch views to explore."
        />

        <Reveal>
          <div className="glass relative overflow-hidden rounded-3xl p-5 shadow-card sm:p-8">
            <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-blue-500/10 blur-3xl" aria-hidden="true" />

            <div className="relative flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap gap-2" role="tablist" aria-label="Dashboard views">
                {tabs.map((t) => (
                  <button
                    key={t.id}
                    role="tab"
                    aria-selected={tab === t.id}
                    onClick={() => setTab(t.id)}
                    className={`rounded-full px-4 py-2 text-sm transition ${tab === t.id ? 'bg-[rgb(var(--text))] text-[rgb(var(--bg))]' : 'border hairline text-muted hover:text-[rgb(var(--text))]'}`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/15 px-3 py-1.5 text-xs font-semibold text-amber-700 dark:text-amber-300">
                <Info className="h-3.5 w-3.5" aria-hidden="true" /> Illustrative sample data — not real business results
              </span>
            </div>

            <AnimatePresence mode="wait">
              <motion.div key={tab} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.35 }} className="relative mt-8 grid gap-6 lg:grid-cols-12">
                <div className="grid content-start gap-4 lg:col-span-4">
                  <p className="font-display text-2xl italic leading-snug">“{story}”</p>
                  {current.kpis.map((k) => (
                    <div key={k.label} className="surface flex items-center gap-4 rounded-2xl p-4">
                      <span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-blue-500/20 to-violet-500/20 text-violet-500 dark:text-violet-300">
                        <k.icon className="h-5 w-5" aria-hidden="true" />
                      </span>
                      <div>
                        <p className="text-xs text-muted">{k.label}</p>
                        <p className="text-2xl font-bold">{k.value}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="surface rounded-2xl p-4 lg:col-span-8">
                  <div className="h-[320px] w-full" role="img" aria-label={`Sample chart: ${story}`}>
                    <ResponsiveContainer width="100%" height="100%">
                      {tab === 'inventory' ? (
                        <BarChart data={inventory.data} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                          <CartesianGrid strokeDasharray="3 6" stroke="rgb(var(--line) / 0.12)" vertical={false} />
                          <XAxis dataKey="name" tickLine={false} axisLine={false} />
                          <YAxis tickLine={false} axisLine={false} />
                          <Tooltip {...tooltipStyle} />
                          <Bar dataKey="value" name="Units (sample)" radius={[8, 8, 0, 0]}>
                            {inventory.data.map((_, i) => (
                              <Cell key={i} fill={palette[i % palette.length]} />
                            ))}
                          </Bar>
                        </BarChart>
                      ) : tab === 'workflow' ? (
                        <LineChart data={workflow.data} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                          <CartesianGrid strokeDasharray="3 6" stroke="rgb(var(--line) / 0.12)" vertical={false} />
                          <XAxis dataKey="name" tickLine={false} axisLine={false} />
                          <YAxis tickLine={false} axisLine={false} />
                          <Tooltip {...tooltipStyle} cursor={{ stroke: 'rgb(var(--line) / 0.2)' }} />
                          <Line type="monotone" dataKey="planned" name="Planned days" stroke="#22d3ee" strokeWidth={2.5} strokeDasharray="6 4" dot={false} />
                          <Line type="monotone" dataKey="actual" name="Actual days" stroke="#8b5cf6" strokeWidth={3} dot={{ r: 4, fill: '#8b5cf6' }} />
                        </LineChart>
                      ) : (
                        <AreaChart data={content.data} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                          <defs>
                            <linearGradient id="areaFill" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="0" stopColor="#8b5cf6" stopOpacity={0.5} />
                              <stop offset="1" stopColor="#8b5cf6" stopOpacity={0} />
                            </linearGradient>
                          </defs>
                          <CartesianGrid strokeDasharray="3 6" stroke="rgb(var(--line) / 0.12)" vertical={false} />
                          <XAxis dataKey="name" tickLine={false} axisLine={false} />
                          <YAxis tickLine={false} axisLine={false} />
                          <Tooltip {...tooltipStyle} cursor={{ stroke: 'rgb(var(--line) / 0.2)' }} />
                          <Area type="monotone" dataKey="value" name="Titles (sample)" stroke="#8b5cf6" strokeWidth={2.5} fill="url(#areaFill)" />
                        </AreaChart>
                      )}
                    </ResponsiveContainer>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
