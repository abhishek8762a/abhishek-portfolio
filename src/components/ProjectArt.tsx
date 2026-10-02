import type { Project } from '../data/projects';
import { accentMap } from './ui';

/** Generated cover art used whenever a real screenshot isn't supplied. Purely decorative. */
export default function ProjectArt({ project, className = '' }: { project: Project; className?: string }) {
  const a = accentMap[project.accent];
  const gid = `pa-${project.id}`;
  return (
    <div className={`relative overflow-hidden ${className}`} style={{ background: `linear-gradient(135deg, ${a.soft}, transparent 70%)` }} aria-hidden="true">
      <div className="absolute inset-0 bg-grid opacity-60" />
      <svg viewBox="0 0 320 200" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id={gid} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor={a.from} />
            <stop offset="1" stopColor={a.to} />
          </linearGradient>
        </defs>
        {project.id === 'ims' && (
          <g>
            {Array.from({ length: 5 }).map((_, r) =>
              Array.from({ length: 7 }).map((__, c) => (
                <rect key={`${r}-${c}`} x={40 + c * 36} y={30 + r * 30} width="28" height="22" rx="4" fill={`url(#${gid})`} opacity={((r * 7 + c) % 5) / 6 + 0.15} />
              )),
            )}
            <rect x="40" y="182" width="244" height="3" rx="1.5" fill={`url(#${gid})`} opacity="0.5" />
          </g>
        )}
        {project.id === 'fms' && (
          <g>
            <path d="M40 60 H280 M280 60 C300 60 300 100 280 100 H40 C20 100 20 140 40 140 H280" stroke={`url(#${gid})`} strokeWidth="2" fill="none" className="flow-line" />
            {[60, 100, 140].map((y, r) =>
              [40, 100, 160, 220, 280].map((x, c) => <circle key={`${r}-${c}`} cx={x} cy={y} r={r * 5 + c < 9 ? 8 : 6} fill={r * 5 + c < 9 ? `url(#${gid})` : 'none'} stroke={a.from} strokeWidth="2" />),
            )}
          </g>
        )}
        {project.id === 'netflix' && (
          <g>
            {[70, 110, 90, 140, 120, 160, 130, 150].map((h, i) => (
              <rect key={i} x={40 + i * 32} y={180 - h} width="20" height={h} rx="4" fill={`url(#${gid})`} opacity={0.35 + i * 0.08} />
            ))}
          </g>
        )}
        {project.id === 'sales' && (
          <g>
            {[0, 1, 2].map((i) => (
              <rect key={i} x={36 + i * 86} y="40" width="76" height="46" rx="10" fill={`url(#${gid})`} opacity={0.25 + i * 0.2} />
            ))}
            <path d="M36 160 L90 140 L140 150 L190 115 L240 125 L290 95" stroke={`url(#${gid})`} strokeWidth="3" fill="none" />
          </g>
        )}
        {project.id === 'healthcare' && (
          <g>
            <path d="M20 120 H90 L105 80 L125 160 L145 60 L165 140 L180 120 H300" stroke={`url(#${gid})`} strokeWidth="3" fill="none" strokeLinejoin="round" />
            <circle cx="250" cy="70" r="26" fill="none" stroke={`url(#${gid})`} strokeWidth="6" strokeDasharray="110 60" />
          </g>
        )}
      </svg>
      <span className="absolute bottom-3 right-4 font-display text-5xl italic opacity-20">{project.shortTitle}</span>
    </div>
  );
}
