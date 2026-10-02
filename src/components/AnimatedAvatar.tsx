import { motion, useMotionValue, useReducedMotion, useSpring, useTransform, type MotionValue } from 'framer-motion';
import { Braces, Database, Sheet, TrendingUp } from 'lucide-react';
import { useRef, type ReactNode } from 'react';
import { siteConfig } from '../config/siteConfig';
import { CountUp } from './motion';
import { SmartImage } from './ui';

/* ------------------------------------------------------------------
 * Illustrated avatar — young South Asian man, black hair, glasses,
 * burgundy polo, working on a laptop. Drawn as layered SVG with
 * gradients for a soft 3D look. Replace with a rendered image by
 * setting siteConfig.images.heroAvatar.
 * ------------------------------------------------------------------ */
function AvatarIllustration({ reduce }: { reduce: boolean }) {
  return (
    <svg viewBox="0 0 400 470" className="h-full w-full" role="img" aria-label="Illustrated avatar of Abhishek Kumar working on a laptop">
      <defs>
        <radialGradient id="skin" cx="45%" cy="40%" r="65%">
          <stop offset="0" stopColor="#d9a07a" />
          <stop offset="0.7" stopColor="#c08260" />
          <stop offset="1" stopColor="#9e6446" />
        </radialGradient>
        <linearGradient id="neck" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#8f5a3e" />
          <stop offset="1" stopColor="#b77a58" />
        </linearGradient>
        <linearGradient id="hair" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#2a2a35" />
          <stop offset="0.5" stopColor="#111118" />
          <stop offset="1" stopColor="#050508" />
        </linearGradient>
        <linearGradient id="polo" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#8a2b3f" />
          <stop offset="0.55" stopColor="#6b1c2e" />
          <stop offset="1" stopColor="#3f0f1b" />
        </linearGradient>
        <linearGradient id="collar" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#9a3348" />
          <stop offset="1" stopColor="#5c1626" />
        </linearGradient>
        <linearGradient id="lens" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#a5b4fc" stopOpacity="0.35" />
          <stop offset="0.5" stopColor="#ffffff" stopOpacity="0.05" />
          <stop offset="1" stopColor="#22d3ee" stopOpacity="0.25" />
        </linearGradient>
        <linearGradient id="lid" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#334155" />
          <stop offset="1" stopColor="#0f172a" />
        </linearGradient>
        <linearGradient id="lidEdge" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#3b82f6" />
          <stop offset="0.5" stopColor="#8b5cf6" />
          <stop offset="1" stopColor="#22d3ee" />
        </linearGradient>
        <radialGradient id="screenGlow" cx="50%" cy="100%" r="80%">
          <stop offset="0" stopColor="#60a5fa" stopOpacity="0.55" />
          <stop offset="1" stopColor="#60a5fa" stopOpacity="0" />
        </radialGradient>
        <filter id="soft" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="6" />
        </filter>
      </defs>

      {/* ground shadow */}
      <ellipse cx="200" cy="452" rx="150" ry="14" fill="#000" opacity="0.25" filter="url(#soft)" />

      {/* torso */}
      <path d="M62 470 C66 380 100 312 162 292 L238 292 C300 312 334 380 338 470 Z" fill="url(#polo)" />
      {/* shoulder highlights */}
      <path d="M96 360 C110 326 136 306 166 298" stroke="#b04a62" strokeWidth="5" strokeLinecap="round" fill="none" opacity="0.45" />
      <path d="M304 360 C292 330 270 310 240 300" stroke="#2c0a12" strokeWidth="6" strokeLinecap="round" fill="none" opacity="0.4" />

      {/* neck */}
      <path d="M176 232 L224 232 L230 298 C214 312 186 312 170 298 Z" fill="url(#neck)" />
      <path d="M176 250 C192 262 208 262 224 250" stroke="#7a4730" strokeWidth="3" fill="none" opacity="0.5" />

      {/* collar + placket */}
      <path d="M164 290 L200 318 L182 344 L148 304 Z" fill="url(#collar)" />
      <path d="M236 290 L200 318 L218 344 L252 304 Z" fill="url(#collar)" />
      <path d="M192 318 L208 318 L208 372 L192 372 Z" fill="#5c1626" />
      <circle cx="200" cy="334" r="2.6" fill="#e9d5da" />
      <circle cx="200" cy="354" r="2.6" fill="#e9d5da" />

      {/* ears */}
      <ellipse cx="141" cy="172" rx="12" ry="18" fill="#b77655" />
      <ellipse cx="259" cy="172" rx="12" ry="18" fill="#a96a4b" />
      <path d="M137 166 C142 172 142 178 138 182" stroke="#8a5238" strokeWidth="2.5" fill="none" />
      <path d="M263 166 C258 172 258 178 262 182" stroke="#8a5238" strokeWidth="2.5" fill="none" />

      {/* head */}
      <path d="M144 150 C144 100 172 80 200 80 C228 80 256 100 256 150 C256 200 240 238 200 246 C160 238 144 200 144 150 Z" fill="url(#skin)" />
      {/* jaw shading / light stubble */}
      <path d="M154 196 C164 228 182 242 200 244 C218 242 236 228 246 196 C238 222 222 236 200 238 C178 236 162 222 154 196 Z" fill="#6b3f2a" opacity="0.28" />
      {/* cheek warmth */}
      <ellipse cx="168" cy="198" rx="12" ry="7" fill="#d9826a" opacity="0.18" />
      <ellipse cx="232" cy="198" rx="12" ry="7" fill="#d9826a" opacity="0.18" />

      {/* hair */}
      <path
        d="M140 160 C132 108 156 66 204 64 C246 62 270 92 264 158 C260 140 254 124 246 116 C232 122 214 120 198 112 C188 124 168 128 152 124 C146 134 142 146 140 160 Z"
        fill="url(#hair)"
      />
      <path d="M152 112 C170 84 208 74 238 92" stroke="#3a3a48" strokeWidth="4" strokeLinecap="round" fill="none" opacity="0.7" />
      <path d="M176 96 C196 84 222 84 240 98" stroke="#4a4a5a" strokeWidth="2.5" strokeLinecap="round" fill="none" opacity="0.6" />
      {/* side hair */}
      <path d="M142 158 C140 146 142 134 146 126 L150 154 Z" fill="#111118" />
      <path d="M258 158 C260 146 258 134 254 126 L250 154 Z" fill="#111118" />

      {/* eyebrows */}
      <path d="M160 148 C168 141 182 140 192 145" stroke="#141418" strokeWidth="5.5" strokeLinecap="round" fill="none" />
      <path d="M208 145 C218 140 232 141 240 148" stroke="#141418" strokeWidth="5.5" strokeLinecap="round" fill="none" />

      {/* eyes (blink) */}
      <motion.g
        style={{ transformOrigin: '200px 168px' }}
        animate={reduce ? undefined : { scaleY: [1, 1, 0.1, 1, 1] }}
        transition={{ duration: 5, times: [0, 0.9, 0.93, 0.96, 1], repeat: Infinity }}
      >
        <ellipse cx="177" cy="168" rx="6" ry="5" fill="#1b1410" />
        <ellipse cx="223" cy="168" rx="6" ry="5" fill="#1b1410" />
        <circle cx="179" cy="166" r="1.7" fill="#fff" />
        <circle cx="225" cy="166" r="1.7" fill="#fff" />
      </motion.g>

      {/* glasses */}
      <g stroke="#15151c" strokeWidth="4" fill="url(#lens)">
        <rect x="155" y="152" width="40" height="32" rx="9" />
        <rect x="205" y="152" width="40" height="32" rx="9" />
      </g>
      <path d="M195 164 C198 160 202 160 205 164" stroke="#15151c" strokeWidth="3.5" fill="none" />
      <path d="M155 162 L141 158" stroke="#15151c" strokeWidth="3.5" strokeLinecap="round" />
      <path d="M245 162 L259 158" stroke="#15151c" strokeWidth="3.5" strokeLinecap="round" />
      <path d="M161 158 L170 156" stroke="#fff" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
      <path d="M211 158 L220 156" stroke="#fff" strokeWidth="2" strokeLinecap="round" opacity="0.6" />

      {/* nose */}
      <path d="M200 176 C198 188 194 196 192 200 C196 204 204 204 208 200" stroke="#8a5238" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      {/* mouth */}
      <path d="M184 216 C192 224 208 224 216 216" stroke="#6e2f22" strokeWidth="3.5" strokeLinecap="round" fill="none" />
      <path d="M188 218 C196 222 204 222 212 218" stroke="#f5e6dc" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.7" />

      {/* laptop glow on body */}
      <ellipse cx="200" cy="360" rx="120" ry="60" fill="url(#screenGlow)" />

      {/* laptop lid (back faces viewer) */}
      <g>
        <path d="M108 340 L292 340 C298 340 302 344 302 350 L306 432 L94 432 L98 350 C98 344 102 340 108 340 Z" fill="url(#lid)" />
        <path d="M108 340 L292 340 C298 340 302 344 302 350" stroke="url(#lidEdge)" strokeWidth="2" fill="none" />
        <circle cx="200" cy="386" r="16" fill="none" stroke="url(#lidEdge)" strokeWidth="2" opacity="0.9" />
        <text x="200" y="392" textAnchor="middle" fontFamily="Georgia, serif" fontStyle="italic" fontSize="15" fill="#c4b5fd">AK</text>
        {/* base */}
        <path d="M70 432 L330 432 L344 446 C344 450 340 452 336 452 L64 452 C60 452 56 450 56 446 Z" fill="#1e293b" />
        <path d="M70 432 L330 432" stroke="#64748b" strokeWidth="1.5" />
      </g>
    </svg>
  );
}

/* ---------------- floating widgets ---------------- */
function Float({ children, className, depth, mx, my, delay = 0, reduce }: { children: ReactNode; className: string; depth: number; mx: MotionValue<number>; my: MotionValue<number>; delay?: number; reduce: boolean }) {
  const x = useTransform(mx, (v) => v * depth);
  const y = useTransform(my, (v) => v * depth);
  return (
    <motion.div className={`absolute z-20 ${className}`} style={{ x, y }}>
      <motion.div
        initial={{ opacity: 0, scale: 0.85, y: 20 }}
        animate={reduce ? { opacity: 1, scale: 1, y: 0 } : { opacity: 1, scale: 1, y: [0, -10, 0] }}
        transition={
          reduce
            ? { duration: 0.4, delay }
            : { opacity: { duration: 0.6, delay }, scale: { duration: 0.6, delay }, y: { duration: 5 + depth * 2, repeat: Infinity, ease: 'easeInOut', delay } }
        }
        whileHover={{ scale: 1.06, rotate: -1 }}
        className="glass rounded-2xl p-3 shadow-card transition-shadow hover:shadow-glow"
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

function MiniBars() {
  const bars = [38, 62, 46, 80, 58, 92];
  return (
    <div>
      <p className="mb-2 font-mono text-[9px] uppercase tracking-widest text-muted">Category mix</p>
      <div className="flex h-12 items-end gap-1.5">
        {bars.map((h, i) => (
          <motion.span
            key={i}
            className="w-2.5 rounded-sm bg-gradient-to-t from-blue-500 to-violet-400"
            initial={{ height: 0 }}
            animate={{ height: `${h}%` }}
            transition={{ delay: 1 + i * 0.08, duration: 0.7 }}
          />
        ))}
      </div>
    </div>
  );
}

function MiniLine() {
  return (
    <div className="w-36">
      <p className="mb-1 flex items-center gap-1 font-mono text-[9px] uppercase tracking-widest text-muted">
        <TrendingUp className="h-3 w-3 text-cyan-400" aria-hidden="true" /> Trend
      </p>
      <svg viewBox="0 0 120 40" className="h-10 w-full" aria-hidden="true">
        <defs>
          <linearGradient id="spark" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#22d3ee" stopOpacity="0.45" />
            <stop offset="1" stopColor="#22d3ee" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d="M0 32 L18 26 L34 29 L52 17 L70 21 L88 9 L104 13 L120 4 L120 40 L0 40 Z" fill="url(#spark)" />
        <motion.path
          d="M0 32 L18 26 L34 29 L52 17 L70 21 L88 9 L104 13 L120 4"
          fill="none"
          stroke="#22d3ee"
          strokeWidth="2"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ delay: 1.2, duration: 1.4 }}
        />
      </svg>
    </div>
  );
}

// Positions used when the framed hero photo is shown (keeps words in the free space above/below it).
const photoAnnotations = [
  { word: 'Analyze', cls: 'left-[25%] top-[6%] -rotate-6' },
  { word: 'Solve', cls: 'left-[56%] top-[3%] rotate-3' },
  { word: 'Automate', cls: 'left-[35%] bottom-[12%] -rotate-3' },
  { word: 'Visualize', cls: 'left-[50%] bottom-[2%] rotate-2' },
];

const annotations = [
  { word: 'Analyze', cls: 'left-[2%] top-[2%] -rotate-6' },
  { word: 'Visualize', cls: 'right-[0%] top-[30%] rotate-6' },
  { word: 'Automate', cls: 'left-[-2%] top-[58%] -rotate-3' },
  { word: 'Solve', cls: 'right-[6%] bottom-[4%] rotate-3' },
  { word: 'Improve', cls: 'left-[34%] -top-[4%] rotate-2' },
];

export default function AnimatedAvatar() {
  const reduce = !!useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const mx = useSpring(rawX, { stiffness: 60, damping: 18 });
  const my = useSpring(rawY, { stiffness: 60, damping: 18 });
  const avatarX = useTransform(mx, (v) => v * -0.4);
  const avatarY = useTransform(my, (v) => v * -0.4);

  // A supplied hero image (that exists in /public) switches to the framed-photo layout.
  const photoMode = !!siteConfig.images.heroAvatar && __IMAGE_FILES__.includes(siteConfig.images.heroAvatar);

  const onMove = (e: React.PointerEvent) => {
    if (reduce || !ref.current || e.pointerType !== 'mouse') return;
    const r = ref.current.getBoundingClientRect();
    rawX.set(((e.clientX - r.left) / r.width - 0.5) * 24);
    rawY.set(((e.clientY - r.top) / r.height - 0.5) * 24);
  };
  const onLeave = () => {
    rawX.set(0);
    rawY.set(0);
  };

  return (
    <div ref={ref} onPointerMove={onMove} onPointerLeave={onLeave} className={`relative mx-auto w-full max-w-[560px] select-none ${photoMode ? 'aspect-[1/0.92] sm:aspect-[1/1.05]' : 'aspect-[1/1.05]'}`}>
      {/* ambient glow */}
      <div className="absolute inset-[8%] rounded-full bg-gradient-to-tr from-blue-600/40 via-violet-600/35 to-cyan-400/30 blur-3xl motion-safe:animate-drift" aria-hidden="true" />
      {/* orbit rings */}
      <div className="absolute inset-[12%] rounded-full border border-violet-400/20" aria-hidden="true" />
      <div className="absolute inset-[2%] rounded-full border border-dashed border-cyan-400/15 motion-safe:animate-[spin_80s_linear_infinite]" aria-hidden="true" />

      {/* data connections */}
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 105" preserveAspectRatio="none" aria-hidden="true">
        <g stroke="url(#conn)" strokeWidth="0.25" fill="none" opacity="0.45" className="flow-line">
          <path d="M18 18 C32 26 40 34 50 40" />
          <path d="M84 20 C70 28 62 34 52 40" />
          <path d="M14 56 C28 56 36 58 46 62" />
          <path d="M88 64 C74 62 64 62 54 64" />
          <path d="M20 90 C32 84 40 78 48 74" />
        </g>
        <defs>
          <linearGradient id="conn" x1="0" x2="1">
            <stop offset="0" stopColor="#22d3ee" />
            <stop offset="1" stopColor="#8b5cf6" />
          </linearGradient>
        </defs>
      </svg>

      {/* particles */}
      {!reduce &&
        Array.from({ length: 14 }).map((_, i) => (
          <motion.span
            key={i}
            aria-hidden="true"
            className="absolute h-1 w-1 rounded-full bg-cyan-300/70"
            style={{ left: `${(i * 37) % 95}%`, top: `${(i * 53) % 95}%` }}
            animate={{ y: [0, -18, 0], opacity: [0.2, 0.9, 0.2] }}
            transition={{ duration: 4 + (i % 5), repeat: Infinity, delay: i * 0.3 }}
          />
        ))}

      {/* avatar */}
      {photoMode ? (
        <motion.div className="absolute inset-x-[4%] top-[14%] z-10 sm:top-[16%]" style={{ x: avatarX, y: avatarY }}>
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.96 }}
            animate={reduce ? { opacity: 1, y: 0, scale: 1 } : { opacity: 1, scale: 1, y: [0, -10, 0] }}
            transition={reduce ? { duration: 0.5 } : { opacity: { duration: 0.8 }, scale: { duration: 0.8 }, y: { duration: 6, repeat: Infinity, ease: 'easeInOut' } }}
            className="relative rounded-[1.75rem] bg-gradient-to-br from-blue-500/70 via-violet-500/60 to-cyan-400/70 p-[1.5px] shadow-glow"
          >
            <motion.div
              className="relative overflow-hidden rounded-[1.65rem] bg-[rgb(var(--surface))]"
              initial={reduce ? false : { clipPath: 'inset(100% 0% 0% 0% round 26px)' }}
              animate={{ clipPath: 'inset(0% 0% 0% 0% round 26px)' }}
              transition={{ duration: 1.2, delay: 0.5, ease: [0.76, 0, 0.24, 1] }}
            >
              <motion.div
                className="h-full w-full"
                initial={reduce ? false : { scale: 1.25 }}
                animate={{ scale: 1 }}
                transition={{ duration: 1.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
              <SmartImage
                src={siteConfig.images.heroAvatar}
                alt={`${siteConfig.name} at his analytics workspace`}
                className="aspect-[4/3] w-full object-cover"
                fallback={<AvatarIllustration reduce={reduce} />}
              />
              </motion.div>
              {/* light sweep */}
              {!reduce && (
                <motion.span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/2 skew-x-[-20deg] bg-gradient-to-r from-transparent via-white/25 to-transparent"
                  initial={{ x: '0%' }}
                  animate={{ x: '400%' }}
                  transition={{ duration: 1.6, delay: 1.7, ease: 'easeInOut', repeat: Infinity, repeatDelay: 7 }}
                />
              )}
            </motion.div>
          </motion.div>
        </motion.div>
      ) : (
        <motion.div className="absolute inset-x-[14%] bottom-[2%] top-[8%] z-10" style={{ x: avatarX, y: avatarY }}>
          <motion.div
            className="h-full w-full"
            initial={{ opacity: 0, y: 30 }}
            animate={reduce ? { opacity: 1, y: 0 } : { opacity: 1, y: [0, -12, 0] }}
            transition={reduce ? { duration: 0.5 } : { opacity: { duration: 0.8 }, y: { duration: 6, repeat: Infinity, ease: 'easeInOut' } }}
          >
            <AvatarIllustration reduce={reduce} />
          </motion.div>
        </motion.div>
      )}

      {/* floating widgets */}
      <Float className={photoMode ? 'left-[-1%] top-[4%] sm:left-[-2%] sm:top-[6%]' : 'left-[0%] top-[10%]'} depth={1.2} mx={mx} my={my} delay={0.6} reduce={reduce}>
        <p className="font-mono text-[9px] uppercase tracking-widest text-muted">SKUs tracked</p>
        <p className="text-2xl font-bold leading-tight"><CountUp to={1800} /><span className="grad-text">+</span></p>
        <p className="text-[10px] text-muted"><CountUp to={6100} duration={2.2} />+ transactions</p>
      </Float>

      <Float className={photoMode ? 'right-[-2%] top-[2%] hidden sm:block' : 'right-[0%] top-[4%]'} depth={1.6} mx={mx} my={my} delay={0.8} reduce={reduce}>
        <p className="mb-1 flex items-center gap-1 font-mono text-[9px] uppercase tracking-widest text-muted">
          <Database className="h-3 w-3 text-violet-400" aria-hidden="true" /> query.sql
        </p>
        <pre className="font-mono text-[10px] leading-relaxed">
          <span className="text-violet-400">SELECT</span> category,{'\n'}
          {'  '}<span className="text-cyan-400">COUNT</span>(*){'\n'}
          <span className="text-violet-400">GROUP BY</span> 1;
        </pre>
      </Float>

      <Float className={photoMode ? 'hidden' : 'left-[-2%] top-[40%] hidden sm:block'} depth={2} mx={mx} my={my} delay={1} reduce={reduce}>
        <MiniBars />
      </Float>

      <Float className={photoMode ? 'hidden' : 'right-[-2%] top-[46%]'} depth={1.4} mx={mx} my={my} delay={1.1} reduce={reduce}>
        <div className="flex items-center gap-2">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-blue-500 to-yellow-400 text-white">
            <Braces className="h-4 w-4" aria-hidden="true" />
          </span>
          <div>
            <p className="text-xs font-semibold">Python</p>
            <p className="font-mono text-[9px] text-muted">pandas · numpy</p>
          </div>
        </div>
      </Float>

      <Float className={photoMode ? 'bottom-[8%] left-[2%]' : 'bottom-[10%] left-[0%]'} depth={1.8} mx={mx} my={my} delay={1.2} reduce={reduce}>
        <MiniLine />
      </Float>

      <Float className={photoMode ? 'bottom-[6%] right-[2%] hidden sm:block' : 'bottom-[18%] right-[2%] hidden sm:block'} depth={1.1} mx={mx} my={my} delay={1.3} reduce={reduce}>
        <div className="flex items-center gap-2">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-emerald-500 to-cyan-400 text-white">
            <Sheet className="h-4 w-4" aria-hidden="true" />
          </span>
          <div>
            <p className="text-xs font-semibold">Sheets + Apps Script</p>
            <p className="font-mono text-[9px] text-muted">forms → database</p>
          </div>
        </div>
      </Float>

      {/* handwritten annotations */}
      {(photoMode ? photoAnnotations : annotations).map((a, i) => (
        <motion.span
          key={a.word}
          aria-hidden="true"
          className={`pointer-events-none absolute z-0 hidden font-hand text-2xl text-violet-500/80 dark:text-violet-300/70 lg:block ${a.cls}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6 + i * 0.15 }}
        >
          {a.word}
        </motion.span>
      ))}
    </div>
  );
}
