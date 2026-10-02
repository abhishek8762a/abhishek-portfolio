import { motion, useReducedMotion } from 'framer-motion';
import { useState, type ReactNode } from 'react';
import { ArrowUpRight, ImageOff, Lock } from 'lucide-react';
import { asset } from '../config/siteConfig';

/** Fades content up as it scrolls into view. */
export function Reveal({ children, delay = 0, className = '' }: { children: ReactNode; delay?: number; className?: string }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function SectionHeading({ index, eyebrow, title, accent, intro }: { index: string; eyebrow: string; title: string; accent: string; intro?: string }) {
  return (
    <Reveal className="mb-14 grid gap-6 md:grid-cols-12 md:items-end">
      <div className="md:col-span-7">
        <p className="eyebrow mb-4">
          <span className="grad-text font-semibold">{index}</span> &nbsp;/&nbsp; {eyebrow}
        </p>
        <h2 className="text-4xl font-bold leading-[1.05] sm:text-5xl lg:text-6xl">
          {title} <span className="font-display font-normal italic grad-text">{accent}</span>
        </h2>
      </div>
      {intro && <p className="text-muted md:col-span-5 md:pb-2 md:text-lg">{intro}</p>}
    </Reveal>
  );
}

/**
 * Link button that becomes a clearly-labelled disabled placeholder when the URL is empty.
 * Never renders a dead link.
 */
export function LinkButton({ href, label, icon, variant = 'ghost', download }: { href: string; label: string; icon?: ReactNode; variant?: 'primary' | 'ghost'; download?: boolean }) {
  if (!href) {
    return (
      <span className="btn-disabled text-muted" aria-disabled="true" title={`${label} — not available yet`}>
        <Lock className="h-3.5 w-3.5" aria-hidden="true" />
        {label} · soon
      </span>
    );
  }
  const external = /^https?:/.test(href);
  return (
    <a
      href={href}
      className={variant === 'primary' ? 'btn-primary' : 'btn-ghost'}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      {...(download ? { download: '' } : {})}
    >
      {icon}
      {label}
      {external && <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />}
    </a>
  );
}

/** Image that falls back to a named placeholder if the file is missing. */
export function SmartImage({ src, alt, className = '', placeholderLabel, fallback }: { src: string; alt: string; className?: string; placeholderLabel?: string; fallback?: ReactNode }) {
  const [failed, setFailed] = useState(!src || !__IMAGE_FILES__.includes(src));
  if (failed) {
    if (fallback) return <>{fallback}</>;
    return (
      <div className={`flex flex-col items-center justify-center gap-2 border border-dashed hairline p-4 text-center ${className}`} role="img" aria-label={`${alt} (placeholder)`}>
        <ImageOff className="h-6 w-6 text-muted" aria-hidden="true" />
        <span className="text-xs text-muted">Image placeholder</span>
        {src && <code className="rounded bg-black/10 px-2 py-0.5 font-mono text-[10px] text-muted dark:bg-white/10">public/{src}</code>}
        {placeholderLabel && <span className="text-[11px] text-muted">{placeholderLabel}</span>}
      </div>
    );
  }
  return <img src={asset(src)} alt={alt} loading="lazy" decoding="async" onError={() => setFailed(true)} className={className} />;
}

export const accentMap = {
  blue: { from: '#3b82f6', to: '#6366f1', text: 'text-blue-400', soft: 'rgba(59,130,246,0.14)' },
  violet: { from: '#8b5cf6', to: '#d946ef', text: 'text-violet-400', soft: 'rgba(139,92,246,0.14)' },
  cyan: { from: '#22d3ee', to: '#3b82f6', text: 'text-cyan-400', soft: 'rgba(34,211,238,0.14)' },
  rose: { from: '#f43f5e', to: '#8b5cf6', text: 'text-rose-400', soft: 'rgba(244,63,94,0.14)' },
  emerald: { from: '#10b981', to: '#22d3ee', text: 'text-emerald-400', soft: 'rgba(16,185,129,0.14)' },
} as const;
