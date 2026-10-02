import { AnimatePresence, MotionConfig, motion, useReducedMotion, useScroll, useSpring } from 'framer-motion';
import { lazy, Suspense, useCallback, useEffect, useState } from 'react';
import About from './components/About';
import Background from './components/Background';
import Contact from './components/Contact';
import CustomCursor from './components/CustomCursor';
import SkillMarquee from './components/SkillMarquee';
import { startSmoothScroll } from './lib/smoothScroll';
import Experience from './components/Experience';
import Footer from './components/Footer';
import Hero from './components/Hero';
import Loader from './components/Loader';
import Navbar from './components/Navbar';
import NotFound from './components/NotFound';
import ProjectDetails from './components/ProjectDetails';
import ProjectGallery from './components/ProjectGallery';
import Skills from './components/Skills';
import { projects } from './data/projects';
import { useTheme } from './hooks/useTheme';

// Charts library is heavy — load the showcase only when needed.
const AnalyticsShowcase = lazy(() => import('./components/AnalyticsShowcase'));

const PROJECT_HASH = '#project/';

function readProjectFromHash() {
  const h = window.location.hash;
  return h.startsWith(PROJECT_HASH) ? h.slice(PROJECT_HASH.length) : null;
}

/** True when the URL path is the site root (static hosting serves 404.html for anything else). */
function isKnownPath() {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  const path = window.location.pathname.replace(/\/(index\.html)?$/, '');
  return path === base;
}

export default function App() {
  const { theme, toggle } = useTheme();
  const reduce = useReducedMotion();
  const [loading, setLoading] = useState(!reduce);
  const [openId, setOpenId] = useState<string | null>(readProjectFromHash);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  useEffect(() => {
    if (!loading) return;
    const t = setTimeout(() => setLoading(false), 1100);
    return () => clearTimeout(t);
  }, [loading]);

  useEffect(() => startSmoothScroll(), []);

  useEffect(() => {
    const onHash = () => setOpenId(readProjectFromHash());
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  const open = useCallback((id: string) => {
    window.history.pushState(null, '', `${PROJECT_HASH}${id}`);
    setOpenId(id);
  }, []);

  const close = useCallback(() => {
    window.history.replaceState(null, '', `${window.location.pathname}#projects`);
    setOpenId(null);
  }, []);

  if (!isKnownPath()) return <NotFound />;

  const project = projects.find((p) => p.id === openId) ?? null;

  return (
    <MotionConfig reducedMotion="user">
      <AnimatePresence>{loading && <Loader key="loader" />}</AnimatePresence>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-full focus:bg-violet-600 focus:px-4 focus:py-2 focus:text-white">
        Skip to content
      </a>
      <motion.div className="fixed inset-x-0 top-0 z-[70] h-[2px] origin-left bg-gradient-to-r from-blue-500 via-violet-500 to-cyan-400" style={{ scaleX: progress }} aria-hidden="true" />
      <CustomCursor />
      <Background />
      <Navbar theme={theme} onToggleTheme={toggle} />
      <main id="main">
        <Hero />
        <SkillMarquee />
        <About />
        <ProjectGallery onOpen={open} openId={openId} />
        <Skills />
        <Experience />
        <Suspense fallback={<div className="section" id="analytics" aria-busy="true" />}>
          <AnalyticsShowcase />
        </Suspense>
        <Contact />
      </main>
      <Footer />
      <ProjectDetails project={project} onClose={close} />
    </MotionConfig>
  );
}
