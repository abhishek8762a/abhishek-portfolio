import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { CircleCheck, GitBranch, Info, Scissors } from 'lucide-react';
import { useState } from 'react';
import { engineRules, flows, type Timing } from '../data/flows';

const timingStyle: Record<Timing, string> = {
  Entry: 'bg-blue-500/15 text-blue-600 dark:text-blue-300',
  TAT: 'bg-violet-500/15 text-violet-600 dark:text-violet-300',
  'Before date': 'bg-cyan-500/15 text-cyan-700 dark:text-cyan-300',
  'Clock time': 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-300',
  Decision: 'bg-amber-500/15 text-amber-700 dark:text-amber-300',
};

/** "Same engine, any business flow" — switch between real and example process configurations. */
export default function FlowExplorer() {
  const [id, setId] = useState(flows[0].id);
  const reduce = useReducedMotion();
  const flow = flows.find((f) => f.id === id)!;

  return (
    <div>
      <div className="mb-5 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
        {engineRules.map((r) => (
          <div key={r.k} className="surface rounded-xl px-3 py-2.5">
            <p className="text-xs font-semibold">{r.k}</p>
            <p className="mt-0.5 text-xs leading-snug text-muted">{r.v}</p>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap gap-2" role="tablist" aria-label="Example business flows">
        {flows.map((f) => (
          <button
            key={f.id}
            role="tab"
            aria-selected={id === f.id}
            onClick={() => setId(f.id)}
            className={`relative isolate rounded-full px-3.5 py-1.5 text-xs font-medium transition ${id === f.id ? 'text-white' : 'border hairline text-muted hover:text-[rgb(var(--text))]'}`}
          >
            {id === f.id && <motion.span layoutId="flow-pill" className="absolute inset-0 -z-10 rounded-full bg-gradient-to-r from-violet-600 to-blue-500" />}
            {f.name}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div key={flow.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }} className="mt-5">
          <div className="mb-4 flex flex-wrap items-center gap-2 text-xs">
            {flow.real ? (
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/15 px-2.5 py-1 font-semibold text-emerald-700 dark:text-emerald-300">
                <CircleCheck className="h-3 w-3" aria-hidden="true" /> Running at work
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/15 px-2.5 py-1 font-semibold text-amber-700 dark:text-amber-300">
                <Info className="h-3 w-3" aria-hidden="true" /> Example configuration
              </span>
            )}
            <span className="chip !py-1 font-mono">Unique ID: {flow.uniqueId}</span>
          </div>

          <ol className="relative grid gap-2 pl-2">
            <span className="absolute bottom-3 left-[1.2rem] top-3 w-[2px] bg-gradient-to-b from-violet-500/60 via-blue-500/40 to-cyan-400/60" aria-hidden="true" />
            {!reduce && (
              <motion.span
                aria-hidden="true"
                className="absolute left-[0.98rem] h-2.5 w-2.5 rounded-full bg-cyan-300 shadow-[0_0_14px_4px_rgba(34,211,238,0.6)]"
                initial={{ top: '0%' }}
                animate={{ top: ['2%', '96%'] }}
                transition={{ duration: flow.steps.length * 0.7, repeat: Infinity, ease: 'linear' }}
              />
            )}
            {flow.steps.map((s, i) => (
              <motion.li
                key={s.what}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.06 }}
                className={`relative flex items-start gap-3 ${s.branch ? 'ml-6' : ''}`}
              >
                <span className="relative z-10 mt-1 grid h-7 w-7 shrink-0 place-items-center rounded-full border border-violet-400/40 bg-[rgb(var(--bg))] font-mono text-[10px] font-bold">
                  {i + 1}
                </span>
                <div className="surface flex min-w-0 flex-1 flex-wrap items-center gap-x-3 gap-y-1 rounded-xl px-3 py-2">
                  <span className="text-sm font-semibold">{s.what}</span>
                  {s.branch && (
                    <span className={`inline-flex items-center gap-1 rounded-md px-1.5 py-0.5 text-[10px] font-bold ${s.branch === 'Yes' ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-300' : 'bg-rose-500/15 text-rose-600 dark:text-rose-300'}`}>
                      <GitBranch className="h-3 w-3" aria-hidden="true" /> if {s.branch}
                    </span>
                  )}
                  {s.split && (
                    <span className="inline-flex items-center gap-1 rounded-md bg-fuchsia-500/15 px-1.5 py-0.5 text-[10px] font-bold text-fuchsia-600 dark:text-fuchsia-300">
                      <Scissors className="h-3 w-3" aria-hidden="true" /> qty split
                    </span>
                  )}
                  <span className="ml-auto flex flex-wrap items-center gap-2 text-[11px] text-muted">
                    <span>{s.who}</span>
                    <span className={`rounded-md px-1.5 py-0.5 font-medium ${timingStyle[s.timing]}`}>{s.when}</span>
                  </span>
                </div>
              </motion.li>
            ))}
          </ol>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
