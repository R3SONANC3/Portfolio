# Portfolio redesign: "Personal & warm" (direction C)

Date: 2026-11-14 · Branch base: `dev`

## Intent

Jeerapat wants the portfolio rebuilt from scratch so it looks good and **does not look AI-generated**. The main reader is **HR / recruiters** screening candidates. They give a portfolio a few seconds, so the page has to answer four things almost at once: who this is, what they can do, how to reach them, and where the CV is.

Jeerapat picked direction **C, "Personal & warm"**, from three mockups (A editorial résumé, B Swiss index, C personal). It should feel like a real person who would be nice to work with, not like a template.

Reference mockup: `.superpowers/brainstorm/1873-1794635999/content/c-full-page.html` (local only, gitignored). It sets the visual target. The dashed "note" boxes in it are not part of the site.

## Goals

- An HR reader gets name, role, location/remote, education, contact and CV from the hero alone, without scrolling.
- The work and experience sections are easy to scan: featured projects show proof (numbers, award, stack), and experience reads as a timeline.
- The site looks hand-made, with the warm cream/orange palette, handwritten Thai accents, a polaroid photo and chunky outlined cards.
- TH/EN switching keeps working.
- The contact form keeps sending through the existing Resend API.
- The code is easier to maintain than today: one component per section, styling in Tailwind classes, all copy in one data file.

## Non-goals

- No dark mode and no theme switcher (see Decisions).
- No 3D scene, starfield or mouse-tilt effects.
- No new pages and no blog. It stays a single page plus the existing 404.
- No changes to the contact API's behavior (`src/app/api/contact/route.ts`).
- No CMS or admin. Content stays in TypeScript data files.

## Anti-goals (a failure even if it works)

- Anything that reads as the AI look: dark gradient backgrounds, glow/neon, glassmorphism cards, ✨ sparkle icons, tiny uppercase "eyebrow" labels with a dash before every heading, or generic bento grids.
- The hero takes more than one screen to explain who Jeerapat is.
- Text fails WCAG AA contrast because of the warm palette.
- The page breaks or scrolls sideways on a phone.

## Constraints

- Stack stays as is: Next.js 16 (App Router), React 19, Tailwind CSS v4, TypeScript, pnpm. Path aliases come from `tsconfig.json` (`baseUrl: src`, `@data/*`, `@components/*`, `@assets/*`).
- `lucide-react` and `react-icons` are already installed. Use them rather than adding icon packages.
- The contact API requires `name`, `email`, `subject` and `message` (all non-empty), so the form keeps its subject field.
- The CV PDF will be placed at `public/cv.pdf` (Jeerapat has the file).
- Profile photo: `src/assets/images/profile.jpg`, which shows Jeerapat playing guitar.

## Approaches considered

1. **Tailwind utilities in per-section components (chosen).** Design tokens (colors, fonts) go once in `globals.css` via Tailwind v4 `@theme`. Each section is its own component styled with utility classes, and copy moves to a data file. It is easier to maintain and edit a section in isolation. It costs slightly more effort to translate the mockup CSS into utilities.
2. **One hand-written CSS file (as today).** Port the mockup CSS into `globals.css` and use semantic class names. This is the fastest route and gives pixel parity with the mockup, but it recreates today's problem, a 55 KB `globals.css` that is hard to read.
3. **A component kit (shadcn/ui), rejected.** It produces the generic look the brief is trying to escape.

Jeerapat chose approach 1.

## Decisions

### Decided by Jeerapat
- Full rebuild, direction C, aimed at HR.
- Approach 1 (Tailwind plus per-section components).
- A Download CV button that links to the PDF.
- The Portfolio project card does not mention AI. Its description says only what the site is and what it's built with (Next.js, TypeScript, Tailwind CSS). The `next-themes` tag and the theming/animation claims are removed. The footer says "made in Phrae", **not** "made by hand".

### My calls (Jeerapat can override)
- It stays one long scrolling page with TH/EN.
- Drop `OrbitalScene`, `ThemeSwitch`, `ThemeProvider` and the `next-themes` dependency. Use a single light cream theme, because a dark theme is what reads as AI here.
- When a project has no screenshot, the featured card shows a colored block with the project name/stack instead of an image.
- Fix in passing: `socialLinks.ts` builds the GitHub URL from `process.env.GITHUB_USERNAME`, which is not exposed to the browser, so the link is `.../undefined` today. Use the same source as `projects.ts` (`NEXT_PUBLIC_GITHUB_USERNAME`).
- The mockup's About text about guitar is placeholder copy that I wrote. It must be replaced with Jeerapat's own words, and the builder leaves it clearly marked until then.
- **Copy source:** use the mockup's English copy (new H1, lede, kickers, section titles, polaroid caption, sticker), not today's `page.tsx` strings. It is a draft I wrote, and Jeerapat reviews every string before it ships. The Thai versions are written fresh to match it and should be natural Thai, not a word-for-word translation.
- **Experience/project text:** shorten the wording as the mockup does (shorter company name, dates, 1–2 sentence descriptions), but **add no claim** that isn't already in `experience.ts` / `projects.ts`. Add optional `descriptionTh` to both data files and fill it. Thai mode falls back to English only where a field is missing.
- **Proof tag:** add an optional `badge` field to each project (e.g. "Full stack · 327+ commits"), rather than building it from `stats`.
- **Handwritten kickers swap language:** on the EN page the kickers above H2s are Thai (ของที่ทำมา, ที่ที่เคยทำงาน, ตัวตนนิดนึง, มาคุยกันได้เลย). On the TH page they switch to short English (things I've built, where I've worked, a bit about me, let's talk) while the H2 is Thai. Either way the handwriting stays bilingual and never just repeats the H2. These are per-language strings in `content.ts`.
- **Leftover 3D work on `dev`:** delete `Earth3D.tsx`, `src/app/motion.css` (and its import in `layout.tsx`) and `tailwind.config.js` (unused in Tailwind v4), and remove `three`, `@react-three/fiber` and `@react-three/drei` from `package.json`.
- Also restyle `error.tsx` and `global-error.tsx`. Replacing `globals.css` removes their current styles.

## Design

### Visual tokens
- Colors: ink `#2b2118`, background cream `#fdf6ec`, accent orange `#e0572e`, sun yellow `#ffd166`, peach `#ffe8dc`, muted text `#6b5b4b`.
- Contrast: white text on `#e0572e` is about 3.9:1, which fails AA for normal text. Buttons and any small orange text use a darker orange that reaches at least 4.5:1 (around `#c2410c`). Keep the lighter orange only for large or decorative use.
- Fonts via `next/font/google`, self-hosted with no layout shift:
  - **Bricolage Grotesque** for headings and UI (no Thai glyphs, so it falls back to the next font)
  - **IBM Plex Sans Thai** for Thai text and as the body fallback
  - **Mali** for the handwritten accents (small greeting lines, polaroid caption, sticker)
- Signature details: a yellow highlighter underline on a key phrase in the hero, a polaroid with tape and an "open to work" sticker, cards with a 2px ink border and a hard offset shadow (no blur), and dashed dividers between sections.

### Page structure (top to bottom)
1. **Navbar:** `jeerapat.dev` wordmark; links to Work / Experience / About; TH/EN toggle; a dark pill "Download CV ↓" (`/cv.pdf`, `download` attribute). On mobile the links collapse into a menu, but the CV button stays visible.
2. **Hero:** handwritten greeting ("สวัสดีครับ, I'm Jeerapat 👋"); an H1 with the highlighter phrase; a one-paragraph lede; buttons "See my work" (to `#work`) and the email address (mailto); a quick-facts row (📍 Phrae, TH · open to remote / 🎓 B.Eng. Computer Eng. / 💼 3 roles since 2024); the polaroid on the right with the sticker. On mobile the polaroid stacks under the text.
3. **Work (`#work`):** a handwritten kicker plus an H2. **Lead project: TMK ERP** (Jeerapat's main work, added 2026-11-14). It sits first as one full-width card. On the left: a badge, the title "TMK ERP", the short card text from Jeerapat's content doc (EN/TH, verbatim), three part rows (POS desktop app / Admin web back office / API central server, each one line), and skill tags. On the right: a small HTML/CSS architecture sketch (POS → API → SQL Server; Admin → API; API → SAP Business One and the bank payment API). It has no Code/Visit links because the project is private, and no screenshot (the content doc forbids screenshots with real data). **Featured** means projects with `featured: true` (Competency V2, PerfNet), shown in a 2-column grid of large cards: screenshot or colored block, a tag that carries the proof (e.g. "Full stack · 327+ commits", "Hackathon · 🥈 2nd place"), title, description, stack line, and Code ↗ / Visit ↗ links. **The other projects** go in a 3-column grid of small cards. Everything collapses to 1 column on mobile.
4. **Experience (`#experience`):** a vertical timeline. The left column holds dates in the handwritten font; the right side has a dot on a line, title, company and a short description, all from `experience.ts`.
5. **Field notes (`#notes`, added 2026-11-14):** kicker "เรื่องที่เคยแก้" / "things I've fixed", H2 "Notes from the field" / Thai. A one-line intro from Jeerapat's DevOps doc: keeps web + API services running on Docker in a closed on-prem network, finds the cause from logs and evidence, and fixes things in ways that can be rolled back. Then 3 case cards styled as taped index cards, each with **Symptom → Cause → How I found it → Fix → Lesson**, taken from the doc's cases 1–3 (Next.js `NEXT_PUBLIC_*` baked in at build; HTTPS in a network with no outbound internet; login 400 caused by a missing AUTO_INCREMENT/PK). Case 4 (Traefik stripprefix) is left out because the doc marks it as unverified, and it also contains a path that names the system. Below the cards: "How I work", the doc's 5 principles as a short handwritten list. The "learning / not yet strong" list is left out until Jeerapat fills it in.
6. **About (`#about`):** a short personal paragraph (placeholder until Jeerapat writes it); skill chips in 3 groups (Frontend, Backend & data, Shipping); a yellow education card that is slightly rotated (B.Eng. Computer Engineering; languages Thai native, English).
7. **Contact (`#contact`):** a dark ink panel with rounded corners. Left: kicker, H2 "Let's work together.", and rows for Email, Phone, GitHub and Location. Right: a cream form with name, email, subject and message, with success/error states reusing today's logic.
8. **Footer:** a single line: © year, name, "made in Phrae", and the GitHub/email icons.

Section ids change from `projects` to `work` and gain `experience` and `notes`. Nav links: Work · Experience · Notes · About. Navbar and footer links follow.

### Code layout
- `src/app/globals.css`: replace everything with `@import "tailwindcss"`, an `@theme` block for the tokens above, and minimal base styles. Nothing else.
- `src/app/layout.tsx`: load the fonts and expose them as CSS variables; drop `ThemeProviderWrapper`; set the body background/text from tokens; keep `LanguageProvider`, `Navbar`, `ErrorBoundary` and `Footer`; update the metadata description to something meaningful for recruiters.
- `src/data/content.ts` (new): all UI copy as `{ en: {...}, th: {...} }`, moved out of `page.tsx`, `Navbar.tsx` and `footer.tsx`. Project and experience data stay in their own files. Thai project descriptions currently live in `page.tsx`; move them to an optional `descriptionTh` field in `projects.ts`.
- `src/data/projects.ts`: add an optional `screenshot?: string` (a path under `public/`). `image` (emoji) is no longer used and can be removed. Add TMK ERP as the first entry with `lead: true` and `parts: { name, nameTh, text, textTh }[]` (3 entries). It has no `github`/`live`.
- **TMK content rules** (from Jeerapat's content doc). Never show credentials, server IPs/URLs, real customer or vendor names, bank account numbers, or screenshots with real data. Skill claims come only from that doc. The About chips gain: SQL Server, Sequelize, Redux, Ant Design (frontend/backend), Electron (desktop), plus a new group **Integrations** with SAP Business One, Bank payment API and Cron jobs.
- **DevOps content** (from Jeerapat's DevOps doc). The "Shipping" chip group becomes **DevOps & infra**: Docker, Docker Compose, Harbor, Traefik v3, HTTPS / certificates (openssl), Linux troubleshooting, Jenkins, AWS EC2, Vercel, Git. The hero role line becomes "Full-stack & DevOps", while the H1 stays the same. Same disclosure rules as TMK: no system names, hostnames, paths that identify a system, or secrets. "Public health agency" may be shown (confirmed).
- `src/components/sections/` (new): `Hero.tsx`, `Work.tsx`, `Experience.tsx`, `About.tsx`, `Contact.tsx`. `page.tsx` only composes them.
- Rewrite `Navbar.tsx` and `footer.tsx` in the new style.
- Delete: `OrbitalScene.tsx`, `ThemeSwitch.tsx`, `ThemeProvider.tsx`. Remove `next-themes` from `package.json`.
- Restyle `not-found.tsx` and `loading.tsx` with the new tokens (no `dark:` classes).

### Behavior
- Language: the default is EN and the toggle switches to TH, as today. `<html lang>` follows. Not persisted (unchanged).
- Smooth-scroll to sections; respect `prefers-reduced-motion` (no smooth scroll and no hover wiggles when it is set).
- Hover: cards lift slightly (the offset shadow grows). No other animation is required.

## Left to the builder
- Exact Tailwind class choices, spacing and type scale, matching the mockup's feel.
- How the mobile menu opens and closes.
- Copy tweaks for Thai strings, which must still be natural Thai.
- Whether the `Contact` form logic stays in `Contact.tsx` or moves to a small hook.

## Open items for Jeerapat
- **Permission: confirmed by Jeerapat on 2026-11-14.** TMK (including the name) and the public-health-agency DevOps work may be shown. The content rules above (no secrets, IPs/URLs, other customer/vendor names, real-data screenshots) still apply.
- **TMK role:** which job it belongs to, and Jeerapat's role. If that job is not in `experience.ts`, it is added to the timeline, and the hero fact "3 roles since 2024" is updated.
- **DevOps role (blocking for the timeline):** company (or how to describe it), title and dates for the on-prem DevOps work.- Fill in the "learning / not yet strong" list if it should appear.
- Review all draft copy (EN and TH) before it ships.
- Write the real About paragraph.
- Supply screenshots for featured projects if wanted (`public/work/<id>.png`).
- Put the CV at `public/cv.pdf`.
- Confirm which email to show everywhere: `contactMethods.ts` says `jeerapat.kah@gmail.com`, `socialLinks.ts` says `hello@jeerapat.dev`.
