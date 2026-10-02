import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

let lenis: Lenis | null = null;

/** Starts Lenis smooth scrolling and keeps GSAP ScrollTrigger in sync with it. */
export function startSmoothScroll() {
  if (lenis) return () => {};
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const touch = window.matchMedia('(pointer: coarse)').matches;
  if (reduce || touch) return () => {}; // native scroll on phones & for reduced motion

  document.documentElement.style.scrollBehavior = 'auto'; // Lenis handles smoothing
  lenis = new Lenis({ duration: 1.15, smoothWheel: true, anchors: { offset: -80 } });
  lenis.on('scroll', ScrollTrigger.update);
  const tick = (time: number) => lenis?.raf(time * 1000);
  gsap.ticker.add(tick);
  gsap.ticker.lagSmoothing(0);

  return () => {
    gsap.ticker.remove(tick);
    lenis?.destroy();
    lenis = null;
    document.documentElement.style.scrollBehavior = '';
  };
}

/** Pause page scrolling (e.g. while a modal is open). */
export function lockScroll(lock: boolean) {
  if (lenis) (lock ? lenis.stop() : lenis.start());
  document.body.style.overflow = lock ? 'hidden' : '';
}

export { gsap, ScrollTrigger };
