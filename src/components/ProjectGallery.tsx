import { motion } from 'framer-motion';
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { projects } from '../data/projects';
import { gsap, ScrollTrigger } from '../lib/smoothScroll';
import ProjectCard from './ProjectCard';
import { SectionHeading } from './ui';

const filters = ['All', 'Automation', 'SQL & BI', 'Analytics'] as const;
type Filter = (typeof filters)[number];

/** Layout mode for the current device. Horizontal pinned scroll only on large mouse screens. */
function useLayoutMode() {
  const get = () => {
    const w = window.innerWidth;
    const horizontal = w >= 1024 && window.matchMedia('(pointer: fine)').matches && !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    return { horizontal, cols: w >= 1280 ? 3 : w >= 768 ? 2 : 1 };
  };
  const [mode, setMode] = useState(get);
  useEffect(() => {
    const onResize = () => setMode(get());
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);
  return mode;
}

function FilterTabs({ filter, setFilter }: { filter: Filter; setFilter: (f: Filter) => void }) {
  return (
    <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filter projects">
      {filters.map((f) => (
        <button
          key={f}
          role="tab"
          aria-selected={filter === f}
          onClick={() => setFilter(f)}
          className={`relative rounded-full px-4 py-2 text-sm transition ${filter === f ? 'text-white' : 'text-muted hover:text-[rgb(var(--text))]'}`}
        >
          {filter === f && (
            <motion.span layoutId="filter-pill" className="absolute inset-0 -z-10 rounded-full bg-gradient-to-r from-blue-500 to-violet-600" transition={{ type: 'spring', stiffness: 400, damping: 32 }} />
          )}
          {f}
        </button>
      ))}
    </div>
  );
}

export default function ProjectGallery({ onOpen, openId }: { onOpen: (id: string) => void; openId: string | null }) {
  const [filter, setFilter] = useState<Filter>('All');
  const list = useMemo(() => (filter === 'All' ? projects : projects.filter((p) => p.category === filter)), [filter]);
  const { horizontal, cols } = useLayoutMode();

  const pinRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);

  // Pinned horizontal scroll: the section sticks while vertical scroll slides the cards sideways.
  useLayoutEffect(() => {
    if (!horizontal || !pinRef.current || !trackRef.current) return;
    const ctx = gsap.context(() => {
      const track = trackRef.current!;
      const distance = () => Math.max(0, track.scrollWidth - window.innerWidth);
      gsap.to(track, {
        x: () => -distance(),
        ease: 'none',
        scrollTrigger: {
          trigger: pinRef.current,
          start: 'top top',
          end: () => `+=${distance()}`,
          pin: true,
          scrub: 0.8,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            if (barRef.current) barRef.current.style.transform = `scaleX(${self.progress})`;
          },
        },
      });
    }, pinRef);
    return () => ctx.revert();
  }, [horizontal, list]);

  // Refresh positions once fonts/images settle.
  useEffect(() => {
    const t = setTimeout(() => ScrollTrigger.refresh(), 600);
    return () => clearTimeout(t);
  }, [horizontal, list]);

  const columns = useMemo(() => {
    const out: (typeof projects)[] = Array.from({ length: cols }, () => []);
    list.forEach((p, i) => out[i % cols].push(p));
    return out;
  }, [list, cols]);

  if (horizontal) {
    return (
      <section id="projects" className="relative">
        <div ref={pinRef} className="relative flex h-screen flex-col justify-center overflow-hidden">
          <div ref={trackRef} className="flex items-center gap-8 pl-[max(2rem,calc((100vw-80rem)/2+2rem))] pr-[12vw] will-change-transform">
            {/* intro panel */}
            <div className="w-[min(32rem,38vw)] shrink-0 pr-6">
              <p className="eyebrow mb-4">
                <span className="grad-text font-semibold">02</span> &nbsp;/&nbsp; Featured work
              </p>
              <h2 className="text-5xl font-bold leading-[1.02] xl:text-6xl">
                Systems & analyses, <span className="font-display font-normal italic grad-text">built to be used.</span>
              </h2>
              <p className="mt-5 text-muted">Two systems running in real operations, one completed SQL + BI project, and clearly-labelled work in progress.</p>
              <div className="mt-7">
                <FilterTabs filter={filter} setFilter={setFilter} />
              </div>
              <p className="mt-8 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
                Scroll <span className="h-px w-16 bg-gradient-to-r from-violet-500 to-transparent" /> to explore
              </p>
            </div>
            {list.map((p, i) => (
              <div key={p.id} className={`w-[min(26rem,34vw)] shrink-0 ${i % 2 ? 'translate-y-8' : '-translate-y-4'}`}>
                <ProjectCard project={p} index={projects.indexOf(p)} onOpen={onOpen} hidden={openId === p.id} compact />
              </div>
            ))}
          </div>
          <div className="container-x absolute inset-x-0 bottom-8">
            <div className="h-[2px] w-full overflow-hidden rounded-full bg-[rgb(var(--line)/0.12)]">
              <div ref={barRef} className="h-full origin-left scale-x-0 bg-gradient-to-r from-blue-500 via-violet-500 to-cyan-400" />
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="projects" className="section">
      <div className="container-x">
        <SectionHeading
          index="02"
          eyebrow="Featured work"
          title="Systems & analyses,"
          accent="built to be used."
          intro="Two systems running in real operations, one completed SQL + BI project, and clearly-labelled work in progress."
        />
        <div className="mb-10">
          <FilterTabs filter={filter} setFilter={setFilter} />
        </div>
        <div className="flex gap-6">
          {columns.map((col, c) => (
            <div key={`${filter}-${c}`} className="flex min-w-0 flex-1 flex-col gap-6">
              {col.map((p) => (
                <ProjectCard key={p.id} project={p} index={projects.indexOf(p)} onOpen={onOpen} hidden={openId === p.id} />
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
