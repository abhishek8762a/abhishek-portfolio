import { motion } from 'framer-motion';
import { ArrowRight, CircleCheck, FlaskConical, Info } from 'lucide-react';
import { projectLinks } from '../config/siteConfig';
import { statusLabel, type Project } from '../data/projects';
import { GithubIcon } from './BrandIcons';
import ProjectArt from './ProjectArt';
import { Tilt } from './motion';
import { LinkButton, SmartImage, accentMap } from './ui';

const heights = { tall: 'aspect-[4/4.2]', medium: 'aspect-[4/3]', short: 'aspect-[16/9]' };

export function StatusBadge({ status }: { status: Project['status'] }) {
  const real = status === 'production' || status === 'completed';
  const Icon = real ? CircleCheck : status === 'learning' ? FlaskConical : Info;
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-semibold ${
        real ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-300' : 'bg-amber-500/15 text-amber-700 dark:text-amber-300'
      }`}
    >
      <Icon className="h-3 w-3" aria-hidden="true" /> {statusLabel[status]}
    </span>
  );
}

export default function ProjectCard({ project, index, onOpen, hidden = false, compact = false }: { project: Project; index: number; onOpen: (id: string) => void; hidden?: boolean; compact?: boolean }) {
  const links = projectLinks[project.id];
  const a = accentMap[project.accent];

  return (
    <Tilt className="rounded-3xl">
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay: (index % 3) * 0.08 }}
      className="surface group relative overflow-hidden rounded-3xl shadow-card transition-[border-color,box-shadow] duration-500 hover:border-violet-400/40 hover:shadow-glow"
    >
      <button
        type="button"
        onClick={() => onOpen(project.id)}
        className="block w-full text-left"
        aria-label={`Open case study: ${project.title}`}
        data-cursor="View"
      >
        <motion.div layoutId={`cover-${project.id}`} style={{ opacity: hidden ? 0 : 1 }} className={`relative overflow-hidden ${compact ? 'aspect-[16/10] [@media(max-height:820px)]:aspect-[16/8]' : heights[project.size]}`}>
          <div className="h-full w-full transition-transform duration-700 group-hover:scale-105">
            <SmartImage
              src={project.thumbnail}
              alt={`${project.title} screenshot`}
              className="h-full w-full object-cover"
              fallback={<ProjectArt project={project} className="h-full w-full" />}
            />
          </div>
          <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[rgb(var(--surface))] to-transparent" />
          <span className="absolute left-4 top-4 font-mono text-[11px] tracking-widest text-muted">0{index + 1}</span>
          <span
            className="absolute right-4 top-4 grid h-10 w-10 translate-y-2 place-items-center rounded-full text-white opacity-0 shadow-lg transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100"
            style={{ background: `linear-gradient(135deg, ${a.from}, ${a.to})` }}
            aria-hidden="true"
          >
            <ArrowRight className="h-4 w-4 -rotate-45" />
          </span>
        </motion.div>
      </button>

      <div className="p-6 pt-2">
        <StatusBadge status={project.status} />
        <h3 className="mt-3 text-xl font-bold leading-tight">{project.title}</h3>
        <p className="mt-1 font-display text-lg italic text-muted">{project.tagline}</p>
        <p className={`mt-3 text-sm leading-relaxed text-muted ${compact ? 'line-clamp-3' : ''}`}>{project.description}</p>

        <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Technologies">
          {project.tech.map((t) => (
            <li key={t} className="rounded-md px-2 py-0.5 font-mono text-[10.5px]" style={{ background: a.soft }}>
              {t}
            </li>
          ))}
        </ul>

        <div className="mt-5 flex flex-wrap gap-2">
          <button type="button" onClick={() => onOpen(project.id)} className="btn-primary !px-4 !py-2 text-xs">
            View Case Study <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
          </button>
          {links.githubUrl && <LinkButton href={links.githubUrl} label="GitHub" icon={<GithubIcon className="h-3.5 w-3.5" />} />}
          {links.demoUrl && <LinkButton href={links.demoUrl} label="Live Demo" />}
        </div>
      </div>
    </motion.article>
    </Tilt>
  );
}
