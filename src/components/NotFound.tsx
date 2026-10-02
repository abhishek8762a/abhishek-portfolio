export default function NotFound() {
  return (
    <main className="grid min-h-screen place-items-center px-6 text-center">
      <div>
        <p className="font-display text-8xl italic grad-text">404</p>
        <h1 className="mt-4 text-2xl font-bold">This page doesn't exist.</h1>
        <p className="mt-2 text-muted">The link may be outdated.</p>
        <a href={import.meta.env.BASE_URL} className="btn-primary mt-8">
          Back to portfolio
        </a>
      </div>
    </main>
  );
}
