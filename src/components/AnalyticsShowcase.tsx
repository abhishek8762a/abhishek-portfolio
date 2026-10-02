import { AnimatePresence, motion } from 'framer-motion';
import { Boxes, CalendarRange, CircleCheck, FileWarning, PackageMinus, PackagePlus, TrendingUp, Users } from 'lucide-react';
import { useState } from 'react';
import { Area, AreaChart, Bar, BarChart, CartesianGrid, Cell, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { Reveal, SectionHeading } from './ui';

/* ------------------------------------------------------------------
 * REAL DATA from my own projects:
 *  - FDA CAERS dataset (github.com/abhishek8762a/fda-adverse-events-sql)
 *  - IMS stock-entry log (aggregated monthly counts only, no item data)
 * ------------------------------------------------------------------ */
const fdaCategories = [
  { name: 'Supplements', value: 48501 },
  { name: 'Cosmetics', value: 11733 },
  { name: 'Nuts & seeds', value: 3383 },
  { name: 'Vegetables', value: 3115 },
  { name: 'Soft drinks', value: 2591 },
  { name: 'Bakery', value: 2543 },
];

const fdaYears = [
  { name: '2004', value: 3338 },
  { name: '2005', value: 2500 },
  { name: '2006', value: 2194 },
  { name: '2007', value: 3152 },
  { name: '2008', value: 4116 },
  { name: '2009', value: 5768 },
  { name: '2010', value: 4949 },
  { name: '2011', value: 6711 },
  { name: '2012', value: 7757 },
  { name: '2013', value: 9308 },
  { name: '2014', value: 8981 },
  { name: '2015', value: 11689 },
  { name: '2016', value: 15547 },
];

const imsMonths = [
  { name: 'Jun 26', in: 547, out: 837 },
  { name: 'Jul 26', in: 465, out: 1063 },
  { name: 'Aug 26', in: 391, out: 1336 },
  { name: 'Sep 26', in: 507, out: 930 },
];

const tabs = [
  {
    id: 'fda-cat',
    label: 'FDA · by category',
    source: 'FDA Adverse Events project',
    question: 'Which product categories cause the most adverse-event reports?',
    answer: 'Supplements alone account for 53% of all reports — about 4× the next category.',
    kpis: [
      { label: 'Reports analysed', value: '90,786', icon: FileWarning },
      { label: 'Supplements', value: '48,501', icon: TrendingUp },
      { label: 'Female reporters', value: '64.9%', icon: Users },
    ],
  },
  {
    id: 'fda-year',
    label: 'FDA · year trend',
    source: 'FDA Adverse Events project',
    question: 'Are adverse-event reports increasing over time?',
    answer: 'Yes — about 5× growth from 2004 to 2016, with the climb starting around 2009.',
    kpis: [
      { label: '2004 reports', value: '3,338', icon: CalendarRange },
      { label: '2016 reports', value: '15,547', icon: CalendarRange },
      { label: 'Growth', value: '4.7×', icon: TrendingUp },
    ],
  },
  {
    id: 'ims',
    label: 'IMS · stock movements',
    source: 'Inventory Management System (live)',
    question: 'How much stock movement does the store log each month?',
    answer: 'Issues (OUT) outnumber receipts (IN) roughly 2 : 1 — August was the busiest month for issues.',
    kpis: [
      { label: 'Entries Jun–Sep', value: '6,076', icon: Boxes },
      { label: 'IN entries', value: '1,910', icon: PackagePlus },
      { label: 'OUT entries', value: '4,166', icon: PackageMinus },
    ],
  },
] as const;

const palette = ['#8b5cf6', '#6366f1', '#3b82f6', '#0ea5e9', '#22d3ee', '#14b8a6'];
const fmt = (v: number) => v.toLocaleString('en-IN');
const tooltipStyle = {
  contentStyle: { background: 'rgb(var(--surface))', border: '1px solid rgb(var(--line) / 0.15)', borderRadius: 12, fontSize: 12, color: 'rgb(var(--text))' },
  labelStyle: { color: 'rgb(var(--text))', fontWeight: 600 },
  cursor: { fill: 'rgb(var(--line) / 0.06)' },
  formatter: (v: unknown) => fmt(Number(v)),
};

export default function AnalyticsShowcase() {
  const [tabId, setTabId] = useState<(typeof tabs)[number]['id']>('fda-cat');
  const tab = tabs.find((t) => t.id === tabId)!;

  return (
    <section id="analytics" className="section">
      <div className="container-x">
        <SectionHeading
          index="05"
          eyebrow="Analytics showcase"
          title="Real questions,"
          accent="real data."
          intro="Every chart here comes from my own projects — a question, the numbers that answer it, and what they mean."
        />

        <Reveal>
          <div className="glass relative overflow-hidden rounded-3xl p-4 shadow-card sm:p-8">
            <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-blue-500/10 blur-3xl" aria-hidden="true" />

            <div className="relative flex flex-wrap items-center justify-between gap-4">
              <div className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 sm:mx-0 sm:flex-wrap sm:px-0" role="tablist" aria-label="Dashboard views">
                {tabs.map((t) => (
                  <button
                    key={t.id}
                    role="tab"
                    aria-selected={tabId === t.id}
                    onClick={() => setTabId(t.id)}
                    className={`shrink-0 rounded-full px-4 py-2 text-sm transition ${tabId === t.id ? 'bg-[rgb(var(--text))] text-[rgb(var(--bg))]' : 'border hairline text-muted hover:text-[rgb(var(--text))]'}`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/15 px-3 py-1.5 text-xs font-semibold text-emerald-700 dark:text-emerald-300">
                <CircleCheck className="h-3.5 w-3.5" aria-hidden="true" /> Real data · {tab.source}
              </span>
            </div>

            <AnimatePresence mode="wait">
              <motion.div key={tabId} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.35 }} className="relative mt-5 grid gap-4 sm:mt-8 sm:gap-6 lg:grid-cols-12">
                <div className="grid grid-cols-3 content-start gap-2 sm:gap-4 lg:col-span-4 lg:grid-cols-1">
                  <p className="col-span-3 font-display text-xl italic leading-snug sm:text-2xl lg:col-span-1">“{tab.question}”</p>
                  {tab.kpis.map((k) => (
                    <div key={k.label} className="surface flex flex-col items-start gap-2 rounded-2xl p-3 sm:flex-row sm:items-center sm:gap-4 sm:p-4">
                      <span className="hidden h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-blue-500/20 to-violet-500/20 text-violet-500 dark:text-violet-300 sm:grid">
                        <k.icon className="h-5 w-5" aria-hidden="true" />
                      </span>
                      <div>
                        <p className="text-[11px] leading-tight text-muted sm:text-xs">{k.label}</p>
                        <p className="text-xl font-bold sm:text-2xl">{k.value}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="surface rounded-2xl p-2 sm:p-4 lg:col-span-8">
                  <div className="h-[240px] w-full sm:h-[320px]" role="img" aria-label={`${tab.question} ${tab.answer}`}>
                    <ResponsiveContainer width="100%" height="100%">
                      {tabId === 'fda-cat' ? (
                        <BarChart data={fdaCategories} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                          <CartesianGrid strokeDasharray="3 6" stroke="rgb(var(--line) / 0.12)" vertical={false} />
                          <XAxis dataKey="name" tickLine={false} axisLine={false} interval={0} tick={{ fontSize: 10 }} />
                          <YAxis tickLine={false} axisLine={false} width={44} tickFormatter={(v) => `${Math.round(v / 1000)}k`} />
                          <Tooltip {...tooltipStyle} />
                          <Bar dataKey="value" name="Reports" radius={[8, 8, 0, 0]}>
                            {fdaCategories.map((_, i) => (
                              <Cell key={i} fill={palette[i % palette.length]} />
                            ))}
                          </Bar>
                        </BarChart>
                      ) : tabId === 'fda-year' ? (
                        <AreaChart data={fdaYears} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                          <defs>
                            <linearGradient id="areaFill" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="0" stopColor="#8b5cf6" stopOpacity={0.5} />
                              <stop offset="1" stopColor="#8b5cf6" stopOpacity={0} />
                            </linearGradient>
                          </defs>
                          <CartesianGrid strokeDasharray="3 6" stroke="rgb(var(--line) / 0.12)" vertical={false} />
                          <XAxis dataKey="name" tickLine={false} axisLine={false} tick={{ fontSize: 10 }} />
                          <YAxis tickLine={false} axisLine={false} width={44} tickFormatter={(v) => `${Math.round(v / 1000)}k`} />
                          <Tooltip {...tooltipStyle} cursor={{ stroke: 'rgb(var(--line) / 0.2)' }} />
                          <Area type="monotone" dataKey="value" name="Reports" stroke="#8b5cf6" strokeWidth={2.5} fill="url(#areaFill)" />
                        </AreaChart>
                      ) : (
                        <BarChart data={imsMonths} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                          <CartesianGrid strokeDasharray="3 6" stroke="rgb(var(--line) / 0.12)" vertical={false} />
                          <XAxis dataKey="name" tickLine={false} axisLine={false} />
                          <YAxis tickLine={false} axisLine={false} width={44} />
                          <Tooltip {...tooltipStyle} />
                          <Legend wrapperStyle={{ fontSize: 12 }} />
                          <Bar dataKey="in" name="IN (receipts)" fill="#22d3ee" radius={[6, 6, 0, 0]} />
                          <Bar dataKey="out" name="OUT (issues)" fill="#8b5cf6" radius={[6, 6, 0, 0]} />
                        </BarChart>
                      )}
                    </ResponsiveContainer>
                  </div>
                  <p className="mt-3 border-t hairline px-2 pt-3 text-sm">
                    <span className="font-semibold">Insight: </span>
                    <span className="text-muted">{tab.answer}</span>
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
