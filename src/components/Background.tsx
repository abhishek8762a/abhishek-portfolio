/** Fixed ambient background: grid + slowly drifting colour fields. */
export default function Background() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden="true">
      <div className="absolute inset-0 bg-grid" />
      <div className="absolute -left-40 -top-40 h-[36rem] w-[36rem] rounded-full bg-blue-600/20 blur-[120px] motion-safe:animate-drift dark:bg-blue-600/25" />
      <div className="absolute -right-40 top-1/3 h-[32rem] w-[32rem] rounded-full bg-violet-600/15 blur-[120px] motion-safe:animate-drift [animation-delay:-6s] dark:bg-violet-600/20" />
      <div className="absolute bottom-0 left-1/3 h-[28rem] w-[28rem] rounded-full bg-cyan-500/10 blur-[120px] motion-safe:animate-drift [animation-delay:-12s]" />
    </div>
  );
}
