/**
 * ============================================================
 *  SITE CONFIG — edit this ONE file to update personal details,
 *  links, images and project URLs.
 *
 *  Rules used everywhere on the site:
 *   - An empty string ('') means "not provided yet". Buttons for
 *     empty links render as disabled "Coming soon" placeholders.
 *   - Image paths are relative to /public (e.g. 'images/profile.jpg'
 *     → file goes in public/images/profile.jpg). If a file is
 *     missing, a styled placeholder is shown instead of a broken image.
 * ============================================================
 */

export const siteConfig = {
  name: 'Abhishek Kumar',
  shortName: 'AK',
  title: 'Data Analyst | MIS Analyst | Automation Enthusiast',
  location: 'India',

  // ---- Contact ------------------------------------------------
  email: 'abhiyadav8762@gmail.com',
  linkedin: 'https://www.linkedin.com/in/abhi8762',
  github: 'https://github.com/abhishek8762a',

  // ---- CV -----------------------------------------------------
  // 1) Put your CV at public/resume.pdf
  // 2) Change `available` to true
  resume: {
    path: 'resume.pdf',
    available: true,
  },

  // ---- Images (all inside /public) -----------------------------
  images: {
    // Optional: a rendered illustration of you for the hero.
    // Leave '' to use the built-in animated vector avatar.
    heroAvatar: 'images/avatar.jpg',
    // Your real photograph for the About section.
    profilePhoto: 'images/profile.jpg',
    // A second (optional) candid photo for the About collage.
    secondaryPhoto: 'images/profile-2.jpg',
  },

  // ---- Contact form -------------------------------------------
  // Optional free service: create a form at https://formspree.io and paste
  // the endpoint (e.g. 'https://formspree.io/f/abcdwxyz').
  // If left '', the form opens the visitor's email app (mailto) instead.
  formspreeEndpoint: '',
};

/**
 * Per-project links. Only paste PUBLIC / sanitized URLs here.
 * Never paste links to private company spreadsheets.
 */
export const projectLinks: Record<
  string,
  { demoUrl: string; githubUrl: string; docsUrl: string; embedUrl: string }
> = {
  ims: { demoUrl: '', githubUrl: '', docsUrl: '', embedUrl: '' },
  fms: { demoUrl: '', githubUrl: '', docsUrl: '', embedUrl: '' },
  netflix: {
    demoUrl: '',
    githubUrl: 'https://github.com/abhishek8762a/netflix-sql-project',
    docsUrl: '',
    embedUrl: '',
  },
  sales: { demoUrl: '', githubUrl: '', docsUrl: '', embedUrl: '' },
  healthcare: { demoUrl: '', githubUrl: '', docsUrl: '', embedUrl: '' },
};

/** Resolves a /public path against the deploy base (needed for GitHub Pages). */
export const asset = (path: string) =>
  `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`;
