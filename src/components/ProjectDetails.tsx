import { AnimatePresence, motion, useMotionValueEvent, useScroll, useSpring, type MotionValue } from 'framer-motion';
import { ArrowDown, BookOpen, Cog, Database, ExternalLink, Lightbulb, Target, X } from 'lucide-react';
import { createContext, useContext, useEffect, useRef, useState, type RefObject } from 'react';
import { lockScroll } from '../lib/smoothScroll';
import { linksFor } from '../config/siteConfig';
import FlowExplorer from './FlowExplorer';
import type { Project } from '../data/projects';
import { GithubIcon } from './BrandIcons';
import ProjectArt from './ProjectArt';
import { StatusBadge } from './ProjectCard';
import { LinkButton, SmartImage, accentMap } from './ui';

/** The modal is its own scroll container — diagrams read their scroll progress from it. */
const ScrollBox = createContext<RefObject<HTMLDivElement | null> | null>(null);

function Block({ n, title, children, label }: { n: number; title: string; children: React.ReactNode; label?: string }) {
  return (
    <section className="border-t hairline py-8 first:border-t-0 first:pt-0" aria-labelledby={`cs-${n}`}>
      <div className="grid gap-4 md:grid-cols-12">
        <div className="md:col-span-3">
          <p className="font-mono text-[11px] text-muted">{label ?? String(n).padStart(2, '0')}</p>
          <h3 id={`cs-${n}`} className="mt-1 text-lg font-bold">
            {title}
          </h3>
        </div>
        <div className="md:col-span-9">{children}</div>
      </div>
    </section>
  );
}

function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="grid gap-2.5">
      {items.map((t) => (
        <li key={t} className="flex gap-3 text-sm leading-relaxed text-muted">
          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-violet-400" aria-hidden="true" />
          {t}
        </li>
      ))}
    </ul>
  );
}

function Architecture({ steps, project }: { steps: string[]; project: Project }) {
  const a = accentMap[project.accent];
  const icons = [BookOpen, Cog, Database, Target, Lightbulb];
  return (
    <ol className="mx-auto flex max-w-md flex-col items-center" aria-label="System architecture">
      {steps.map((s, i) => {
        const Icon = icons[i % icons.length];
        return (
          <li key={s} className="flex w-full flex-col items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="glass flex w-full items-center gap-3 rounded-2xl px-4 py-3"
            >
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl text-white" style={{ background: `linear-gradient(135deg, ${a.from}, ${a.to})` }}>
                <Icon className="h-4 w-4" aria-hidden="true" />
              </span>
              <span className="text-sm font-semibold">{s}</span>
            </motion.div>
            {i < steps.length - 1 && (
              <span className="flex h-8 flex-col items-center justify-center text-muted" aria-hidden="true">
                <ArrowDown className="h-4 w-4" />
              </span>
            )}
          </li>
        );
      })}
    </ol>
  );
}

/** Steps light up one by one and a progress line draws as the reader scrolls through the diagram. */
function WorkflowDiagram({ steps, project }: { steps: string[]; project: Project }) {
  const a = accentMap[project.accent];
  const box = useContext(ScrollBox);
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ container: box ?? undefined, target: ref, offset: ['start 85%', 'end 55%'] });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 26 }) as MotionValue<number>;
  const [lit, setLit] = useState(0);
  useMotionValueEvent(progress, 'change', (v) => setLit(Math.round(v * steps.length)));

  return (
    <div>
      <div className="mb-5 flex items-center gap-3">
        <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-[rgb(var(--line)/0.1)]">
          <motion.div className="h-full origin-left rounded-full" style={{ scaleX: progress, background: `linear-gradient(90deg, ${a.from}, ${a.to})` }} />
        </div>
        <span className="font-mono text-xs tabular-nums text-muted">
          {Math.min(lit, steps.length)}/{steps.length}
        </span>
      </div>
      <ol ref={ref} className="relative grid gap-0 pl-2" aria-label="Workflow steps">
        {/* rail */}
        <span className="absolute bottom-4 left-[1.45rem] top-4 w-[2px] bg-[rgb(var(--line)/0.12)]" aria-hidden="true" />
        <motion.span
          className="absolute bottom-4 left-[1.45rem] top-4 w-[2px] origin-top"
          style={{ scaleY: progress, background: `linear-gradient(180deg, ${a.from}, ${a.to})` }}
          aria-hidden="true"
        />
        {steps.map((s, i) => {
          const on = i < lit;
          return (
            <li key={s} className="relative flex items-center gap-4 py-2">
              <span
                className="relative z-10 grid h-8 w-8 shrink-0 place-items-center rounded-full border font-mono text-[11px] font-bold transition-all duration-500"
                style={
                  on
                    ? { background: `linear-gradient(135deg, ${a.from}, ${a.to})`, borderColor: 'transparent', color: '#fff', boxShadow: `0 0 18px ${a.from}88` }
                    : { background: 'rgb(var(--bg))', borderColor: 'rgb(var(--line) / 0.2)', color: 'rgb(var(--muted))' }
                }
              >
                {i + 1}
              </span>
              <span
                className={`rounded-xl px-3 py-2 text-sm font-medium transition-all duration-500 ${on ? 'surface translate-x-1' : 'text-muted opacity-60'}`}
              >
                {s}
              </span>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

export default function ProjectDetails({ project, onClose }: { project: Project | null; onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!project) return;
    const prev = document.activeElement as HTMLElement | null;
    lockScroll(true);
    closeRef.current?.focus({ preventScroll: true });
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => {
      lockScroll(false);
      window.removeEventListener('keydown', onKey);
      prev?.focus?.({ preventScroll: true });
    };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          ref={scrollRef}
          data-lenis-prevent
          className="fixed inset-0 z-[60] flex justify-center overflow-y-auto overscroll-contain bg-black/60 p-0 backdrop-blur-sm sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <ScrollBox.Provider value={scrollRef}>
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="cs-title"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 30, opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative h-fit w-full max-w-5xl overflow-hidden bg-[rgb(var(--bg))] shadow-2xl sm:rounded-3xl sm:border sm:hairline"
          >
            <motion.div layoutId={`cover-${project.id}`} className="relative h-56 overflow-hidden sm:h-72" transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}>
              <SmartImage src={project.thumbnail} alt={`${project.title} cover`} className="h-full w-full object-cover" fallback={<ProjectArt project={project} className="h-full w-full opacity-50" />} />
              <div className="absolute inset-0 bg-gradient-to-t from-[rgb(var(--bg))] via-[rgb(var(--bg)/0.3)] to-transparent" />
              <button
                ref={closeRef}
                type="button"
                onClick={onClose}
                className="glass absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full transition hover:rotate-90"
                aria-label="Close case study"
              >
                <X className="h-4 w-4" />
              </button>
            </motion.div>

            <div className="relative -mt-20 px-5 pb-10 sm:px-10">
              <StatusBadge status={project.status} />
              <p className="eyebrow mt-4">Case study · {project.category}</p>
              <h2 id="cs-title" className="mt-2 text-3xl font-extrabold leading-tight sm:text-5xl">
                {project.title}
              </h2>
              <p className="mt-2 font-display text-xl italic text-muted">{project.tagline}</p>

              <div className="mt-6 flex flex-wrap gap-2">
                {project.highlights.map((h) => (
                  <span key={h} className="chip">
                    {h}
                  </span>
                ))}
              </div>

              <div className="mt-10">
                <Block n={1} title="Project Overview">
                  <p className="leading-relaxed text-muted">{project.overview}</p>
                </Block>
                <Block n={2} title="Business Problem">
                  <p className="leading-relaxed text-muted">{project.problem}</p>
                </Block>
                <Block n={3} title="Project Objective">
                  <p className="leading-relaxed text-muted">{project.objective}</p>
                </Block>
                <Block n={4} title="Tools & Technologies">
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((t) => (
                      <span key={t} className="chip font-mono">
                        {t}
                      </span>
                    ))}
                  </div>
                </Block>
                <Block n={5} title="System Architecture">
                  <Architecture steps={project.architecture} project={project} />
                </Block>
                <Block n={6} title={`Workflow — ${project.workflowTitle}`}>
                  <WorkflowDiagram steps={project.workflow} project={project} />
                </Block>
                {project.flowExplorer && (
                  <Block n={6} label="06b" title="Same engine — any business flow">
                    <p className="mb-5 text-sm leading-relaxed text-muted">
                      The FMS isn’t hard-wired to one process. Anything with a unique ID and a sequence of owned steps can be tracked — pick a flow to see how it maps.
                    </p>
                    <FlowExplorer />
                  </Block>
                )}
                <Block n={7} title="Data Processing">
                  <Bullets items={project.dataProcessing} />
                </Block>
                <Block n={8} title="Automation Logic">
                  <Bullets items={project.automationLogic} />
                </Block>
                <Block n={9} title="Dashboard Screenshots">
                  {project.screenshots.length === 0 && <p className="text-sm text-muted">SQL-only project — the queries and results are in the GitHub repository.</p>}
                  <div className="grid gap-4 sm:grid-cols-2">
                    {project.screenshots.map((s) => (
                      <figure key={s.file}>
                        <SmartImage src={s.file} alt={s.caption} className="aspect-video w-full rounded-2xl object-cover" placeholderLabel={s.caption} />
                        <figcaption className="mt-2 text-xs text-muted">{s.caption}</figcaption>
                      </figure>
                    ))}
                  </div>
                  {linksFor(project.id).embedUrl && (
                    <iframe
                      title={`${project.title} live report`}
                      src={linksFor(project.id).embedUrl}
                      loading="lazy"
                      className="mt-6 aspect-video w-full rounded-2xl border hairline"
                      allowFullScreen
                    />
                  )}
                  <p className="mt-4 text-xs text-muted">Only sanitized screenshots or synthetic demo data are shown — no confidential company information.</p>
                </Block>
                <Block n={10} title="Key Insights">
                  <Bullets items={project.insights} />
                  {project.insightsNote && <p className="mt-4 rounded-xl bg-amber-500/10 px-4 py-3 text-xs text-amber-700 dark:text-amber-300">{project.insightsNote}</p>}
                </Block>
                <Block n={11} title="Business Relevance">
                  <p className="leading-relaxed text-muted">{project.relevance}</p>
                </Block>
                <Block n={12} title="GitHub Repository">
                  <LinkButton href={linksFor(project.id).githubUrl ?? ''} label="View on GitHub" icon={<GithubIcon className="h-4 w-4" />} />
                </Block>
                <Block n={13} title="Live Demo & Links">
                  <div className="flex flex-wrap gap-2">
                    {(linksFor(project.id).extra ?? []).map((l) => (
                      <LinkButton key={l.url} href={l.url} label={l.label} icon={<GithubIcon className="h-4 w-4" />} />
                    ))}
                    <LinkButton href={linksFor(project.id).demoUrl ?? ''} label="Live Demo" variant="primary" icon={<ExternalLink className="h-4 w-4" />} />
                    <LinkButton href={linksFor(project.id).docsUrl ?? ''} label="Documentation" icon={<BookOpen className="h-4 w-4" />} />
                  </div>
                </Block>
              </div>
            </div>
          </motion.div>
          </ScrollBox.Provider>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
