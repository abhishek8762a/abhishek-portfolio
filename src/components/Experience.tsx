import { motion, useScroll, useSpring } from 'framer-motion';
import { Briefcase, GraduationCap, Rocket } from 'lucide-react';
import { useRef } from 'react';
import { timeline } from '../data/experience';
import { SectionHeading } from './ui';

const kindMeta = {
  work: { icon: Briefcase, label: 'Experience', color: 'from-blue-500 to-violet-500' },
  project: { icon: Rocket, label: 'Project', color: 'from-violet-500 to-fuchsia-500' },
  education: { icon: GraduationCap, label: 'Education', color: 'from-cyan-400 to-blue-500' },
};

export default function Experience() {
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 75%', 'end 60%'] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 90, damping: 25 });

  return (
    <section id="experience" className="section">
      <div className="container-x">
        <SectionHeading index="04" eyebrow="Journey" title="From the lab to" accent="the dashboard." intro="Experience, systems built and education — in one timeline." />

        <ol ref={ref} className="relative mx-auto max-w-4xl">
          <span className="absolute bottom-0 left-5 top-0 w-px bg-[rgb(var(--line)/0.15)] md:left-1/2" aria-hidden="true" />
          <motion.span style={{ scaleY }} className="absolute bottom-0 left-5 top-0 w-px origin-top bg-gradient-to-b from-blue-500 via-violet-500 to-cyan-400 md:left-1/2" aria-hidden="true" />

          {timeline.map((t, i) => {
            const m = kindMeta[t.kind];
            const left = i % 2 === 0;
            return (
              <li key={t.title} className="relative mb-10 pl-16 md:grid md:grid-cols-2 md:gap-12 md:pl-0">
                <span className={`absolute left-0 top-1 grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br ${m.color} text-white shadow-glow md:left-1/2 md:-translate-x-1/2`}>
                  <m.icon className="h-4 w-4" aria-hidden="true" />
                </span>
                <motion.article
                  initial={{ opacity: 0, x: left ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.6 }}
                  className={`surface rounded-2xl p-5 transition hover:border-violet-400/40 ${left ? 'md:col-start-1 md:mr-6 md:text-right' : 'md:col-start-2 md:ml-6'}`}
                >
                  <p className="font-mono text-[11px] uppercase tracking-widest text-muted">
                    {m.label} · <span className={t.period.includes('[') ? 'text-amber-600 dark:text-amber-300' : ''}>{t.period}</span>
                  </p>
                  <h3 className="mt-2 text-lg font-bold">{t.title}</h3>
                  <p className={`text-sm ${t.org.includes('[') ? 'text-amber-600 dark:text-amber-300' : 'text-muted'}`}>{t.org}</p>
                  <ul className="mt-3 grid gap-1.5 text-sm text-muted">
                    {t.points.map((p) => (
                      <li key={p}>{p}</li>
                    ))}
                  </ul>
                </motion.article>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
