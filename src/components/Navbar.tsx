import { AnimatePresence, motion } from 'framer-motion';
import { Download, Menu, Moon, Sun, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { asset, siteConfig } from '../config/siteConfig';
import { useActiveSection } from '../hooks/useActiveSection';

const links = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'experience', label: 'Experience' },
  { id: 'contact', label: 'Contact' },
];
const ids = links.map((l) => l.id);

export function CvButton({ compact = false }: { compact?: boolean }) {
  const { available, path } = siteConfig.resume;
  if (!available) {
    return (
      <span className={`btn-disabled text-muted ${compact ? '!px-4 !py-2 text-xs' : ''}`} aria-disabled="true" title="CV will be available soon">
        <Download className="h-3.5 w-3.5" aria-hidden="true" /> CV · soon
      </span>
    );
  }
  return (
    <a href={asset(path)} download="Abhishek_Kumar_CV.pdf" className={`btn-primary ${compact ? '!px-4 !py-2 text-xs' : ''}`}>
      <Download className="h-3.5 w-3.5" aria-hidden="true" /> Download CV
    </a>
  );
}

export default function Navbar({ theme, onToggleTheme }: { theme: 'dark' | 'light'; onToggleTheme: () => void }) {
  const active = useActiveSection(ids);
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-6"
    >
      <nav
        aria-label="Primary"
        className={`container-x flex items-center justify-between rounded-2xl !px-4 py-2.5 transition-all duration-500 sm:!px-5 ${scrolled ? 'glass shadow-card' : 'border border-transparent'}`}
      >
        <a href="#home" className="group flex items-center gap-3" aria-label={`${siteConfig.name} — home`}>
          <span className="relative grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-blue-500 via-violet-500 to-cyan-400 p-[1.5px]">
            <span className="grid h-full w-full place-items-center rounded-[10px] bg-[rgb(var(--bg))] font-display text-lg italic">AK</span>
          </span>
          <span className="hidden text-sm font-semibold sm:block">
            {siteConfig.name}
            <span className="block font-mono text-[10px] font-normal uppercase tracking-[0.2em] text-muted">Data · MIS</span>
          </span>
        </a>

        <ul className="hidden items-center gap-1 lg:flex">
          {links.map((l) => (
            <li key={l.id}>
              <a
                href={`#${l.id}`}
                aria-current={active === l.id ? 'true' : undefined}
                className={`relative rounded-full px-4 py-2 text-sm transition-colors ${active === l.id ? '' : 'text-muted hover:text-[rgb(var(--text))]'}`}
              >
                {active === l.id && (
                  <motion.span layoutId="nav-pill" className="absolute inset-0 -z-10 rounded-full bg-[rgb(var(--line)/0.1)]" transition={{ type: 'spring', stiffness: 380, damping: 32 }} />
                )}
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onToggleTheme}
            className="grid h-9 w-9 place-items-center rounded-full border hairline transition hover:rotate-12 hover:border-violet-400"
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
          <div className="hidden sm:block">
            <CvButton compact />
          </div>
          <button
            type="button"
            className="grid h-9 w-9 place-items-center rounded-full border hairline lg:hidden"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            className="glass container-x mt-2 rounded-2xl p-3 shadow-card lg:hidden"
          >
            <ul className="grid gap-1">
              {links.map((l, i) => (
                <motion.li key={l.id} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.04 }}>
                  <a
                    href={`#${l.id}`}
                    onClick={() => setOpen(false)}
                    className={`flex items-center justify-between rounded-xl px-4 py-3 text-sm ${active === l.id ? 'bg-[rgb(var(--line)/0.1)] font-semibold' : 'text-muted'}`}
                  >
                    {l.label}
                    <span className="font-mono text-[10px]">0{i + 1}</span>
                  </a>
                </motion.li>
              ))}
            </ul>
            <div className="mt-3 border-t hairline pt-3 sm:hidden">
              <CvButton />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
