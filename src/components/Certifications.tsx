import { motion } from 'framer-motion';
import { Award, BadgeCheck } from 'lucide-react';
import { Reveal } from './ui';

const verify = (id: string) => `https://www.coursera.org/account/accomplishments/verify/${id}`;

const certs = [
  { name: 'SQL Foundations', issuer: 'Microsoft', date: 'Aug 2026', grade: '100%', id: '4TTDB8J6G2L7' },
  { name: 'Healthcare Data Visualization and Decision Support', issuer: 'SkillUp Online', date: 'Jun 2026', grade: '97.14%', id: 'Y9MP4QC7F3X1' },
  { name: 'Fundamentals of Data Analysis', issuer: 'LearnQuest', date: 'Jun 2026', grade: '', id: 'O24F0ALX9TWA' },
];

/** Verified Coursera certificates, each linking to its public verification page. */
export default function Certifications() {
  return (
    <section aria-labelledby="certs-title" className="container-x pb-6">
      <Reveal className="mb-5 flex items-center gap-3">
        <Award className="h-5 w-5 text-violet-400" aria-hidden="true" />
        <h3 id="certs-title" className="text-xl font-bold sm:text-2xl">
          Certifications <span className="font-display font-normal italic text-muted">— verified on Coursera</span>
        </h3>
      </Reveal>
      <div className="grid gap-3 sm:grid-cols-3 sm:gap-4">
        {certs.map((c, i) => (
          <Reveal key={c.id} delay={i * 0.06}>
            <motion.a
              href={verify(c.id)}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -4 }}
              className="surface group relative flex h-full flex-col overflow-hidden rounded-2xl p-5 transition-colors hover:border-violet-400/50"
              data-cursor="Verify"
            >
              <span className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-violet-500/10 blur-2xl transition group-hover:bg-violet-500/25" aria-hidden="true" />
              <div className="flex items-start justify-between gap-3">
                <span className="font-mono text-[11px] uppercase tracking-widest text-muted">{c.issuer}</span>
                {c.grade && (
                  <span className="rounded-full bg-emerald-500/15 px-2 py-0.5 text-[11px] font-bold text-emerald-600 dark:text-emerald-300">
                    Grade {c.grade}
                  </span>
                )}
              </div>
              <p className="mt-3 flex-1 font-semibold leading-snug">{c.name}</p>
              <div className="mt-4 flex items-center justify-between text-xs text-muted">
                <span>{c.date}</span>
                <span className="inline-flex items-center gap-1 font-semibold text-violet-500 dark:text-violet-300">
                  <BadgeCheck className="h-3.5 w-3.5" aria-hidden="true" /> Verify
                </span>
              </div>
            </motion.a>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
