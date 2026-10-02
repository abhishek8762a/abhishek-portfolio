import { motion, useReducedMotion } from 'framer-motion';
import { ArrowDown, ArrowRight, Mail, MapPin } from 'lucide-react';
import { siteConfig } from '../config/siteConfig';
import AnimatedAvatar from './AnimatedAvatar';
import { GithubIcon, LinkedinIcon } from './BrandIcons';
import { CvButton } from './Navbar';
import { Magnetic, SplitWords } from './motion';

const skills = ['SQL', 'Python', 'Power BI', 'Excel', 'PostgreSQL', 'Pandas'];

export default function Hero() {
  const reduce = useReducedMotion();
  const item = (i: number) => ({
    initial: reduce ? false : { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, delay: (i < 2 ? 0.3 : 0.7) + i * 0.12, ease: [0.22, 1, 0.36, 1] as const },
  });

  const socials = [
    { href: siteConfig.linkedin, label: 'LinkedIn', icon: <LinkedinIcon /> },
    { href: siteConfig.github, label: 'GitHub', icon: <GithubIcon /> },
    { href: siteConfig.email ? `mailto:${siteConfig.email}` : '', label: 'Email', icon: <Mail className="h-4 w-4" /> },
  ].filter((s) => s.href);

  return (
    <section id="home" className="relative flex items-center overflow-hidden pb-10 pt-24 sm:pb-16 sm:pt-28 lg:min-h-screen lg:pt-24">
      <div className="container-x grid items-center gap-8 sm:gap-12 lg:grid-cols-12 lg:gap-6">
        <div className="relative z-10 lg:col-span-6">
          <motion.div {...item(0)} className="chip mb-7">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75 motion-safe:animate-ping" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-400" />
            </span>
            <span className="font-mono tracking-[0.18em]">DATA ANALYST · SQL · PYTHON · POWER BI</span>
          </motion.div>

          <h1 className="text-[2.35rem] font-extrabold leading-[1.04] sm:text-6xl xl:text-7xl" aria-label="From the QC lab to live business data.">
            <SplitWords text="From the" delay={0.35} />{' '}
            <SplitWords text="QC lab" delay={0.45} wordClassName="font-display font-normal italic grad-text pr-[0.06em]" />{' '}
            <SplitWords text="to live" delay={0.6} />{' '}
            <span className="relative sm:whitespace-nowrap">
              <SplitWords text="business data." delay={0.75} />
              <svg className="absolute -bottom-2 left-0 h-3 w-full" viewBox="0 0 300 12" preserveAspectRatio="none" aria-hidden="true">
                <motion.path
                  d="M2 9 C80 2 160 2 298 7"
                  stroke="url(#ul)"
                  strokeWidth="3"
                  fill="none"
                  strokeLinecap="round"
                  initial={{ pathLength: reduce ? 1 : 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ delay: 1.3, duration: 1 }}
                />
                <defs>
                  <linearGradient id="ul" x1="0" x2="1">
                    <stop offset="0" stopColor="#3b82f6" />
                    <stop offset="1" stopColor="#22d3ee" />
                  </linearGradient>
                </defs>
              </svg>
            </span>
          </h1>

          <motion.p {...item(2)} className="mt-5 max-w-xl text-[15px] leading-relaxed text-muted sm:mt-7 sm:text-lg">
            Data Analyst at a gearbox manufacturer — I run a 1,800+ SKU inventory system and a 24-step order tracker, and investigate public datasets with SQL, Python and Power BI.
          </motion.p>

          <motion.ul {...item(3)} className="mt-5 flex flex-wrap gap-1.5 sm:mt-7 sm:gap-2" aria-label="Core skills">
            {skills.map((s) => (
              <li key={s} className="chip transition hover:-translate-y-0.5 hover:border-violet-400/60">
                {s}
              </li>
            ))}
          </motion.ul>

          <motion.div {...item(4)} className="mt-7 flex flex-wrap items-center gap-3 sm:mt-9">
            <Magnetic>
              <a href="#projects" className="btn-primary group !px-5 !py-3 sm:!px-6">
                View My Projects
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </a>
            </Magnetic>
            <Magnetic>
              <CvButton />
            </Magnetic>
          </motion.div>

          <motion.div {...item(5)} className="mt-7 flex flex-wrap items-center gap-5 text-sm text-muted sm:mt-9">
            <div className="flex items-center gap-2">
              {socials.map((s) => (
                <Magnetic key={s.label} strength={0.5}>
                <a
                  href={s.href}
                  {...(s.href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  className="grid h-10 w-10 place-items-center rounded-full border hairline transition hover:-translate-y-1 hover:border-violet-400 hover:text-[rgb(var(--text))]"
                  aria-label={s.label}
                >
                  {s.icon}
                </a>
                </Magnetic>
              ))}
            </div>
            <span className="flex items-center gap-1.5">
              <MapPin className="h-4 w-4" aria-hidden="true" /> {siteConfig.location}
            </span>
          </motion.div>
        </div>

        <div className="relative lg:col-span-6">
          <AnimatedAvatar />
        </div>
      </div>

      <a href="#about" className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 items-center gap-2 font-mono text-[10px] uppercase tracking-[0.25em] text-muted md:flex" aria-label="Scroll to About section">
        Scroll <ArrowDown className="h-3.5 w-3.5 motion-safe:animate-bounce" aria-hidden="true" />
      </a>
    </section>
  );
}
