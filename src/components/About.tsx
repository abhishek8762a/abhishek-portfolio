import { Briefcase, FlaskConical, GraduationCap, Layers, Microscope, Workflow } from 'lucide-react';
import { siteConfig } from '../config/siteConfig';
import { Reveal, SectionHeading, SmartImage } from './ui';

const cards = [
  {
    icon: GraduationCap,
    title: 'Education',
    body: 'B.Sc. in Chemistry, Zoology and Botany. Currently pursuing M.Sc. Chemistry.',
  },
  {
    icon: Microscope,
    title: 'Quality Control roots',
    body: 'Started in pharmaceutical Quality Control — where accuracy, documentation and checks are non-negotiable.',
  },
  {
    icon: Workflow,
    title: 'Lab to data',
    body: 'From the lab bench to analytics — now working hands-on with SQL, Python and BI on real business data.',
  },
  {
    icon: Layers,
    title: 'Technical background',
    body: 'SQL, Python, Power BI, Excel, Google Sheets and Apps Script, plus HTML, CSS and JavaScript for web-app front ends.',
  },
];

const formula = [
  { label: 'Science', icon: FlaskConical },
  { label: 'Quality Control', icon: Microscope },
  { label: 'SQL & Python', icon: Briefcase },
  { label: 'Data', icon: Layers },
];

export default function About() {
  return (
    <section id="about" className="section">
      <div className="container-x">
        <SectionHeading
          index="01"
          eyebrow="About"
          title="I ask the data"
          accent="better questions."
          intro="Trained as a scientist, I treat every dataset like an experiment — question it, clean it, test it, then explain what it means."
        />

        <div className="grid gap-14 lg:grid-cols-12 lg:gap-10">
          {/* Photo collage */}
          <Reveal className="relative lg:col-span-5">
            <div className="relative mx-auto max-w-md">
              <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-blue-500/25 via-violet-500/20 to-cyan-400/20 blur-2xl" aria-hidden="true" />
              <div className="relative overflow-hidden rounded-[1.75rem] border hairline bg-[rgb(var(--surface))] p-2 shadow-card">
                <SmartImage
                  src={siteConfig.images.profilePhoto}
                  alt={`Photograph of ${siteConfig.name}`}
                  className="aspect-[4/5] w-full rounded-[1.4rem] object-cover"
                  placeholderLabel="Add your photo (portrait, ~1000×1250px)"
                />
              </div>
              <div className="absolute -bottom-8 -right-4 w-36 rotate-3 overflow-hidden rounded-2xl border-4 border-[rgb(var(--bg))] shadow-card sm:-right-10 sm:w-44">
                <SmartImage
                  src={siteConfig.images.secondaryPhoto}
                  alt={`Second photograph of ${siteConfig.name}`}
                  className="aspect-square w-full bg-[rgb(var(--surface))] object-cover"
                  placeholderLabel="Optional"
                />
              </div>
              <span className="absolute -top-8 left-2 -rotate-3 font-hand text-2xl text-violet-500 dark:text-violet-300 sm:-left-3 sm:top-8 sm:-rotate-6" aria-hidden="true">
                hi, I'm Abhishek!
              </span>
            </div>
          </Reveal>

          {/* Story */}
          <div className="lg:col-span-7 lg:pl-6">
            <Reveal>
              <p className="font-display text-[1.6rem] leading-snug sm:text-3xl">
                I'm <span className="italic grad-text">{siteConfig.name}</span> — a data analyst who turns messy, real-world data into answers people can act on.
              </p>
              <p className="mt-6 leading-relaxed text-muted">
                My path started in a pharmaceutical QC lab, where a wrong number isn't a typo — it's a failed batch. That taught me to check data before trusting it: every number needs a source, and every outlier needs an explanation.
              </p>
              <p className="mt-4 leading-relaxed text-muted">
                Today I write SQL to investigate, use Python to clean and automate, and build Power BI dashboards that tell a clear story — from 90,000-row public datasets to the live inventory and order data I work with every day.
              </p>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="mt-8 flex flex-wrap items-center gap-2" aria-label="Background formula">
                {formula.map((f, i) => (
                  <span key={f.label} className="flex items-center gap-2">
                    <span className="chip !py-1.5">
                      <f.icon className="h-3.5 w-3.5 text-violet-400" aria-hidden="true" /> {f.label}
                    </span>
                    {i < formula.length - 1 && <span className="text-muted" aria-hidden="true">+</span>}
                  </span>
                ))}
                <span className="text-muted" aria-hidden="true">=</span>
                <span className="chip !border-violet-400/50 !py-1.5 font-semibold">Data you can trust</span>
              </div>
            </Reveal>

            <div className="mt-8 grid grid-cols-2 gap-3 sm:mt-10 sm:gap-4">
              {cards.map((c, i) => (
                <Reveal key={c.title} delay={0.05 * i}>
                  <article className="surface group h-full rounded-2xl p-4 transition sm:p-5 duration-300 hover:-translate-y-1 hover:border-violet-400/40 hover:shadow-glow">
                    <span className="mb-3 grid h-9 w-9 place-items-center rounded-xl sm:mb-4 sm:h-10 sm:w-10 bg-gradient-to-br from-blue-500/15 to-violet-500/15 text-violet-500 transition group-hover:scale-110 dark:text-violet-300">
                      <c.icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <h3 className="text-sm font-semibold sm:text-base">{c.title}</h3>
                    <p className="mt-1.5 text-xs leading-relaxed text-muted sm:text-sm">{c.body}</p>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
