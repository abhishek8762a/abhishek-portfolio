# Abhishek Kumar — Data Analyst Portfolio

React + Vite + TypeScript + Tailwind CSS + Framer Motion + Lucide + Recharts.
Static site, GitHub Pages pe free deploy hota hai. Koi backend / paid service nahi.

---

## 1. Node.js install karo (ek baar)

- Windows/Mac: https://nodejs.org se **LTS (v20 ya v22)** download karke install karo.
- Check:
  ```bash
  node -v
  npm -v
  ```

## 2. Project chalao (local)

> Project already bana hua hai — `npm create vite` ki zarurat nahi. Zip extract karke:

```bash
cd abhishek-portfolio
npm install          # dependencies install
npm run dev          # http://localhost:5173 pe khulega
```

## 3. Production build + test

```bash
npm run build        # type-check + build → dist/ folder
npm run preview      # build ko locally test karo (http://localhost:4173)
```

---

## 4. Apni details update karo — sirf EK file: `src/config/siteConfig.ts`

| Kya | Kahan |
|---|---|
| Email / LinkedIn / GitHub | `siteConfig.email`, `linkedin`, `github` (already filled) |
| CV | `public/resume.pdf` daalo → `resume.available: true` |
| Project links (demo / docs / GitHub / embed) | `projectLinks` — khaali `''` = "Coming soon" disabled button |
| Contact form (optional) | Free Formspree endpoint → `formspreeEndpoint`. Khaali ho to form visitor ka email app kholta hai (mailto). Fake "sent" message kabhi nahi dikhta. |

Baaki text yahan hai:
- Projects / case studies → `src/data/projects.ts`
- Skills → `src/data/skills.ts`
- Timeline (dates, company names) → `src/data/experience.ts` — **`[ ]` wale placeholders amber colour mein dikhte hain, inhe bhar dena.**

## 5. Images — exact filenames

Sab `public/images/` ke andar. File daalo, rebuild karo — automatically dikh jayegi. Jab tak file nahi hai, site pe saaf placeholder dikhta hai (koi broken image / 404 nahi).

| File | Kahan dikhega |
|---|---|
| `public/images/profile.jpg` | About section — main photo (portrait, ~1000×1250) |
| `public/images/profile-2.jpg` | About — chhoti second photo (optional, square) |
| `public/images/avatar.jpg` ✅ | Hero image (framed photo mode). Isko `''` karoge to built-in vector avatar dikhega. Na ho to built-in animated vector avatar (glasses, black hair, maroon polo) dikhta hai. |
| `public/images/projects/ims-thumbnail.png` | IMS card cover |
| `public/images/projects/ims-dashboard.png`, `ims-entry-form.png`, `ims-location-stock.png` | IMS case study screenshots |
| `public/images/projects/fms-thumbnail.png` | FMS card cover |
| `public/images/projects/fms-workflow.png`, `fms-pending.png`, `fms-looker.png` | FMS screenshots |
| `public/images/projects/netflix-thumbnail.png`, `netflix-dashboard.png`, `netflix-queries.png` | Netflix project |
| `public/images/projects/sales-*.png`, `healthcare-*.png` | Template projects (jab kaam ho jaye) |

⚠️ IMS/FMS screenshots **sanitize** karke daalna — customer names, vendor names, rates, employee data blur/replace kar dena. Private Google Sheet links kabhi `projectLinks` mein mat daalna.

---

## 6A. Vercel pe LIVE karo (recommended)

1. Code GitHub repo mein push karo (neeche wale git commands).
2. https://vercel.com → **Continue with GitHub**.
3. **Add New → Project** → `abhishek-portfolio` → **Import** → **Deploy** (Vite auto-detect hota hai, koi setting nahi).
4. Link milega: `https://abhishek-portfolio.vercel.app`. Har `git push` pe auto-update.

## 6B. Ya GitHub Pages pe LIVE karo

**a) Repo banao:** github.com → New repository → naam e.g. `abhishek-portfolio` → Public → *README add mat karna* → Create.

**b) Code push karo** (project folder ke andar):
```bash
git init
git add .
git commit -m "Initial portfolio"
git branch -M main
git remote add origin https://github.com/abhishek8762a/abhishek-portfolio.git
git push -u origin main
```

**c) Pages enable karo:** Repo → **Settings → Pages → Build and deployment → Source: "GitHub Actions"**.

**d) Deploy:** Push hote hi `.github/workflows/deploy.yml` chalega (Actions tab mein dekho, ~1–2 min). Base path automatically repo name se set hota hai.

**e) Verify:** Site yahan live hogi → `https://abhishek8762a.github.io/abhishek-portfolio/`
Check karo: theme toggle, nav links, project case study (URL `#project/ims` jaisa), CV button, contact.

> Tip: Repo ka naam `abhishek8762a.github.io` rakhoge to site `https://abhishek8762a.github.io/` pe khulegi (workflow ye bhi handle karta hai).

**f) Baad mein update:**
```bash
git add .
git commit -m "Update projects"
git push
```
Har push pe site auto-redeploy hoti hai.

---

## Animations (built-in)
- Lenis smooth scroll (desktop) + GSAP ScrollTrigger
- Hero: word-by-word heading reveal, photo mask reveal + light sweep, count-up numbers, magnetic buttons
- Velocity-reactive skills marquee
- Projects: pinned horizontal scroll (desktop), 3D tilt + glare cards, card → case-study shared transition
- Case study: workflow steps light up and line draws as you scroll
- Custom cursor ("View" on project cards)
- Phones / reduced-motion: heavy effects auto-off, site stays fast

## Features (built-in)
- Sticky nav with active-section pill, mobile menu, dark/light toggle (saved), scroll progress bar
- Hero: animated illustrated avatar, mouse parallax, floating KPI/SQL/chart widgets, handwritten annotations
- Pinterest-style masonry project gallery with filters + 13-section case study modal (deep-linkable)
- Architecture + workflow diagrams (IMS, FMS 15-stage flow)
- Analytics showcase (Recharts, lazy-loaded) — **clearly labelled sample data**
- Scroll-reveal animations, `prefers-reduced-motion` respected, skip-link, keyboard/Escape support
- SEO meta tags, favicon, 404 page, `.nojekyll`
