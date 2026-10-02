import { motion } from 'framer-motion';

/** Brief branded intro. Skipped entirely for reduced-motion users (see App). */
export default function Loader() {
  return (
    <motion.div className="fixed inset-0 z-[100] grid place-items-center bg-[rgb(var(--bg))]" exit={{ opacity: 0, transition: { duration: 0.5 } }} aria-hidden="true">
      <div className="flex flex-col items-center gap-5">
        <motion.span initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="font-display text-6xl italic grad-text">
          AK
        </motion.span>
        <div className="h-[2px] w-40 overflow-hidden rounded-full bg-[rgb(var(--line)/0.15)]">
          <motion.div className="h-full bg-gradient-to-r from-blue-500 via-violet-500 to-cyan-400" initial={{ width: '0%' }} animate={{ width: '100%' }} transition={{ duration: 0.9, ease: 'easeInOut' }} />
        </div>
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted">Loading insights</span>
      </div>
    </motion.div>
  );
}
