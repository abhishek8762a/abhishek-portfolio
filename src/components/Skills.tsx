import { motion } from 'framer-motion';
import { skillGroups, webSkills } from '../data/skills';
import { Reveal, SectionHeading, accentMap } from './ui';

export default function Skills() {
  return (
    <section id="skills" className="section">
      <div className="container-x">
        <SectionHeading
          index="03"
          eyebrow="Toolkit"
          title="Skills, grouped by"
          accent="what they solve."
          intro="No made-up percentage bars — each tool is listed with how I actually use it."
        />

        <div className="grid gap-6 md:grid-cols-2">
          {skillGroups.map((g, gi) => {
            const a = accentMap[g.accent];
            return (
              <Reveal key={g.id} delay={gi * 0.06}>
                <article className="surface relative h-full overflow-hidden rounded-3xl p-6 sm:p-8">
                  <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full blur-3xl" style={{ background: a.soft }} aria-hidden="true" />
                  <div className="relative mb-6 flex items-end justify-between gap-4">
                    <div>
                      <p className="font-mono text-[11px] text-muted">0{gi + 1}</p>
                      <h3 className="text-2xl font-bold">{g.title}</h3>
                      <p className="mt-1 text-sm text-muted">{g.blurb}</p>
                    </div>
                    <span className="font-display text-5xl italic opacity-15">{g.skills.length}</span>
                  </div>
                  <ul className="relative grid gap-2.5 sm:grid-cols-2">
                    {g.skills.map((s) => (
                      <motion.li
                        key={s.name}
                        whileHover={{ y: -3 }}
                        className="group flex items-start gap-3 rounded-2xl border hairline bg-[rgb(var(--bg)/0.5)] p-3 transition-colors hover:border-violet-400/40"
                      >
                        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl text-white transition-transform group-hover:rotate-6 group-hover:scale-110" style={{ background: `linear-gradient(135deg, ${a.from}, ${a.to})` }}>
                          <s.icon className="h-4 w-4" aria-hidden="true" />
                        </span>
                        <span>
                          <span className="block text-sm font-semibold">{s.name}</span>
                          <span className="block text-xs leading-snug text-muted">{s.note}</span>
                        </span>
                      </motion.li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            );
          })}
        </div>

        <Reveal className="mt-8 flex flex-wrap items-center gap-2">
          <span className="eyebrow mr-2">Also</span>
          {webSkills.map((w) => (
            <span key={w} className="chip">
              {w}
            </span>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
