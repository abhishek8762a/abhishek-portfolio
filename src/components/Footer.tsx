import { ArrowUp } from 'lucide-react';
import { siteConfig } from '../config/siteConfig';

export default function Footer() {
  return (
    <footer className="border-t hairline">
      <div className="container-x py-12">
        <p className="font-display text-[clamp(2.5rem,9vw,7.5rem)] italic leading-none opacity-90">
          <span className="grad-text">Data</span> → decisions.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-between gap-4 text-sm text-muted">
          <p>
            © {new Date().getFullYear()} {siteConfig.name}. Built with React, TypeScript & Tailwind.
          </p>
          <a href="#home" className="inline-flex items-center gap-2 hover:text-[rgb(var(--text))]">
            Back to top <ArrowUp className="h-4 w-4" aria-hidden="true" />
          </a>
        </div>
      </div>
    </footer>
  );
}
