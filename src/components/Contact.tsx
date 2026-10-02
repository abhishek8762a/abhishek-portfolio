import { ArrowUpRight, Check, Copy, Mail, Send } from 'lucide-react';
import { useState, type FormEvent } from 'react';
import { siteConfig } from '../config/siteConfig';
import { GithubIcon, LinkedinIcon } from './BrandIcons';
import { CvButton } from './Navbar';
import { Reveal, SectionHeading } from './ui';

type Status = { kind: 'idle' | 'sending' | 'sent' | 'error' | 'mailto'; msg?: string };

export default function Contact() {
  const [status, setStatus] = useState<Status>({ kind: 'idle' });
  const [copied, setCopied] = useState(false);

  const channels = [
    { label: 'Email', value: siteConfig.email, href: siteConfig.email ? `mailto:${siteConfig.email}` : '', icon: <Mail className="h-5 w-5" /> },
    { label: 'LinkedIn', value: siteConfig.linkedin.replace(/^https?:\/\/(www\.)?/, ''), href: siteConfig.linkedin, icon: <LinkedinIcon className="h-5 w-5" /> },
    { label: 'GitHub', value: siteConfig.github.replace(/^https?:\/\//, ''), href: siteConfig.github, icon: <GithubIcon className="h-5 w-5" /> },
  ];

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(siteConfig.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard blocked — the mailto link still works */
    }
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get('name') || '').trim();
    const email = String(data.get('email') || '').trim();
    const message = String(data.get('message') || '').trim();

    if (siteConfig.formspreeEndpoint) {
      setStatus({ kind: 'sending' });
      try {
        const res = await fetch(siteConfig.formspreeEndpoint, { method: 'POST', body: data, headers: { Accept: 'application/json' } });
        if (res.ok) {
          setStatus({ kind: 'sent', msg: 'Thanks! Your message was delivered.' });
          form.reset();
        } else {
          setStatus({ kind: 'error', msg: 'The message could not be sent. Please email me directly instead.' });
        }
      } catch {
        setStatus({ kind: 'error', msg: 'Network error — please email me directly instead.' });
      }
      return;
    }

    // Fallback: open the visitor's email app with the message pre-filled. Nothing is "sent" by the site.
    const subject = encodeURIComponent(`Portfolio enquiry from ${name}`);
    const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`);
    window.location.href = `mailto:${siteConfig.email}?subject=${subject}&body=${body}`;
    setStatus({ kind: 'mailto', msg: 'Your email app should open with this message — press Send there to deliver it.' });
  };

  const input = 'w-full rounded-xl border hairline bg-[rgb(var(--bg)/0.6)] px-4 py-3 text-sm outline-none transition placeholder:text-[rgb(var(--muted)/0.7)] focus:border-violet-400 focus:ring-2 focus:ring-violet-400/20';

  return (
    <section id="contact" className="section">
      <div className="container-x">
        <SectionHeading index="06" eyebrow="Contact" title="Let's build something" accent="data-driven." intro="Open to Data Analyst roles. The fastest way to reach me is email or LinkedIn." />

        <div className="grid gap-6 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <div className="grid gap-3">
              {channels.map((c) =>
                c.href ? (
                  <a
                    key={c.label}
                    href={c.href}
                    {...(c.href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    className="surface group flex items-center gap-4 rounded-2xl p-4 transition sm:p-5 hover:-translate-y-1 hover:border-violet-400/40 hover:shadow-glow"
                  >
                    <span className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-blue-500 to-violet-600 text-white">{c.icon}</span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-xs text-muted">{c.label}</span>
                      <span className="block truncate font-semibold">{c.value}</span>
                    </span>
                    <ArrowUpRight className="h-4 w-4 text-muted transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
                  </a>
                ) : (
                  <div key={c.label} className="surface flex items-center gap-4 rounded-2xl border-dashed p-5 text-muted">
                    {c.icon} {c.label}: [add in siteConfig.ts]
                  </div>
                ),
              )}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <CvButton />
                {siteConfig.email && (
                  <button type="button" onClick={copyEmail} className="btn-ghost">
                    {copied ? <Check className="h-4 w-4 text-emerald-500" /> : <Copy className="h-4 w-4" />}
                    {copied ? 'Copied' : 'Copy email'}
                  </button>
                )}
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1} className="lg:col-span-7">
            <form onSubmit={onSubmit} className="glass relative overflow-hidden rounded-3xl p-5 shadow-card sm:p-8" noValidate={false}>
              <div className="absolute -bottom-24 -right-24 h-64 w-64 rounded-full bg-violet-500/15 blur-3xl" aria-hidden="true" />
              <div className="relative grid gap-4 sm:grid-cols-2">
                <label className="grid gap-1.5 text-sm">
                  <span className="font-medium">Name</span>
                  <input name="name" required autoComplete="name" className={input} placeholder="Your name" />
                </label>
                <label className="grid gap-1.5 text-sm">
                  <span className="font-medium">Email</span>
                  <input name="email" type="email" required autoComplete="email" className={input} placeholder="you@company.com" />
                </label>
                <label className="grid gap-1.5 text-sm sm:col-span-2">
                  <span className="font-medium">Message</span>
                  <textarea name="message" required rows={5} className={`${input} resize-y`} placeholder="Tell me about the role or project…" />
                </label>
              </div>
              <div className="relative mt-6 flex flex-wrap items-center gap-4">
                <button type="submit" className="btn-primary" disabled={status.kind === 'sending'}>
                  <Send className="h-4 w-4" aria-hidden="true" />
                  {status.kind === 'sending' ? 'Sending…' : siteConfig.formspreeEndpoint ? 'Send message' : 'Send via email app'}
                </button>
                <p
                  role="status"
                  aria-live="polite"
                  className={`text-sm ${status.kind === 'error' ? 'text-rose-500' : status.kind === 'sent' ? 'text-emerald-500' : 'text-muted'}`}
                >
                  {status.msg}
                </p>
              </div>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
