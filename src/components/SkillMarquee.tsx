import { motion, useAnimationFrame, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform, useVelocity, wrap } from 'framer-motion';
import { useRef } from 'react';

const rowA = ['SQL', 'Python', 'Power BI', 'Excel', 'Google Sheets', 'Apps Script', 'PostgreSQL', 'Pandas', 'Looker Studio'];
const rowB = ['Data Cleaning', 'KPI Reporting', 'Dashboards', 'TAT Analysis', 'Reconciliation', 'Workflow Automation', 'EDA', 'Data Modeling'];

/** A row that drifts constantly and speeds up / reverses with scroll velocity. */
function Row({ items, baseVelocity, outline = false }: { items: string[]; baseVelocity: number; outline?: boolean }) {
  const reduce = useReducedMotion();
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const velocity = useSpring(useVelocity(scrollY), { damping: 50, stiffness: 400 });
  const factor = useTransform(velocity, [0, 1000], [0, 4], { clamp: false });
  const dir = useRef(1);
  const x = useTransform(baseX, (v) => `${wrap(-25, -50, v)}%`);

  useAnimationFrame((_, delta) => {
    if (reduce) return;
    let move = dir.current * baseVelocity * (delta / 1000);
    const f = factor.get();
    if (f < 0) dir.current = -1;
    else if (f > 0) dir.current = 1;
    move += dir.current * move * Math.abs(f);
    baseX.set(baseX.get() + move);
  });

  const list = [...items, ...items, ...items, ...items];
  return (
    <div className="flex overflow-hidden whitespace-nowrap">
      <motion.div className="flex shrink-0 items-center gap-5 pr-5 sm:gap-8 sm:pr-8" style={{ x }}>
        {list.map((t, i) => (
          <span key={i} className="flex items-center gap-5 sm:gap-8">
            <span
              className={`text-2xl font-extrabold tracking-tight sm:text-4xl lg:text-6xl ${outline ? 'text-transparent [-webkit-text-stroke:1px_rgb(var(--text)/0.35)]' : ''}`}
            >
              {t}
            </span>
            <span className="h-2 w-2 rotate-45 rounded-sm bg-gradient-to-br from-blue-500 to-violet-500 sm:h-3 sm:w-3" />
          </span>
        ))}
      </motion.div>
    </div>
  );
}

export default function SkillMarquee() {
  return (
    <div className="relative -rotate-2 border-y hairline bg-[rgb(var(--surface)/0.5)] py-4 backdrop-blur-sm sm:py-6" aria-label="Tools and skills">
      <Row items={rowA} baseVelocity={-2} />
      <div className="mt-2 sm:mt-4">
        <Row items={rowB} baseVelocity={2} outline />
      </div>
    </div>
  );
}
