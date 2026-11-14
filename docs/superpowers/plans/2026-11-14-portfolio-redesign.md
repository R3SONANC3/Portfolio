# Portfolio Redesign (Direction C) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the one-page portfolio in the warm "Personal & warm" style so an HR reader sees who Jeerapat is, what they can do, how to reach them and where the CV is in a few seconds.

**Architecture:** Tailwind v4 design tokens live in one `@theme` block in `globals.css`. Each page section is its own component under `src/components/sections/`, all UI copy lives in `src/data/content.ts` keyed by language, and `page.tsx` only composes the sections. The theme, 3D and old observatory CSS are deleted.

**Tech Stack:** Next.js 16 App Router, React 19, Tailwind CSS v4, TypeScript, `next/font/google`, `lucide-react` / `react-icons`, pnpm.

**Spec:** `docs/superpowers/specs/2026-11-14-portfolio-redesign-design.md` (read it with this plan). Visual target: `.superpowers/brainstorm/1873-1794635999/content/c-full-page.html` (local, gitignored).

## Global Constraints

- Work on a new branch `feature/redesign-c` cut from `dev`.
- No new runtime or dev dependencies. Remove `three`, `@react-three/fiber`, `@react-three/drei`, `next-themes`.
- There is no test runner in this repo and the spec adds none. The checks are `pnpm exec tsc --noEmit`, `pnpm lint`, `pnpm build`, plus browser checks run in the dev server (`pnpm dev`, http://localhost:3000) with `document` queries.
- Tokens (exact): ink `#2b2118`, cream `#fdf6ec`, orange `#e0572e` (large/decorative only), orange-deep `#c2410c` (buttons and any orange text under 24px), sun `#ffd166`, peach `#ffe8dc`, muted `#6b5b4b`, line `#e7d9c6`.
- Fonts: Bricolage Grotesque (headings/UI), IBM Plex Sans Thai (Thai and body fallback), Mali (handwritten accents only).
- Anti-goals: no dark gradients, glow, glassmorphism, ✨ icons, uppercase dash-eyebrows or bento grids. No `dark:` classes anywhere.
- Every user-facing string comes from `content.ts` in both `en` and `th`. Thai must read naturally, not as a literal translation. Tech and brand names stay in English.
- Do not add claims that are not already in `experience.ts` / `projects.ts`. Shortening the wording is fine.
- Never write "made by hand", and never mention AI in site copy.
- Do not change `src/app/api/contact/route.ts`. The form sends `name`, `email`, `subject`, `message`, all required.
- Respect `prefers-reduced-motion`: no smooth scroll and no hover transforms when it is set.

## Review Focus

1. **Phone width (375px):** the rotated polaroid, sticker and offset shadows must not cause sideways scroll. Expect `document.documentElement.scrollWidth <= innerWidth`. → Task 2 Step 4, re-checked in Task 7.
2. **Thai mode:** every visible string switches, and long Thai lines wrap without overflowing cards or buttons. → each section task's TH check, and the full sweep in Task 7.
3. **Contact form failure** (429, 500, network down): show the error note, re-enable the button and keep what was typed. → Task 6 Step 3.
4. **Missing project links** (no `github`/`live`, or an unset `NEXT_PUBLIC_GITHUB_USERNAME`): no `href` containing `undefined`, and the link is hidden. → Task 3 Step 3.
5. **Keyboard use:** every link and button shows a visible focus ring, and the mobile menu opens and closes with the keyboard (Escape closes it). → Task 1 Step 6.

---

### Task 1: Foundation: tokens, fonts, cleanup, navbar, footer

**Files:**
- Modify: `package.json` (remove 4 deps), `src/app/globals.css` (replace entirely), `src/app/layout.tsx`, `src/app/page.tsx` (replace with a composition stub), `src/components/Navbar.tsx` (rewrite), `src/components/footer.tsx` (rewrite), `src/data/socialLinks.ts`
- Create: `src/data/content.ts`, `src/data/site.ts`
- Delete: `src/components/Earth3D.tsx`, `src/components/OrbitalScene.tsx`, `src/components/ThemeSwitch.tsx`, `src/components/ThemeProvider.tsx`, `src/app/motion.css`, `tailwind.config.js`

**Interfaces:**
- Produces:
  - `src/data/content.ts`: `export type Lang = 'en' | 'th'`. Build `const en = {...}` and `export type Copy = typeof en`, then `export const content: Record<Lang, Copy> = { en, th }`. TypeScript then fails the build if `th` is missing a key. Top-level keys: `nav`, `hero`, `work`, `experience`, `notes`, `about`, `contact`, `footer`, `errors`. Each later task fills its own key in both languages.
  - `src/data/site.ts`: `export const GITHUB_URL: string | null` (null when `NEXT_PUBLIC_GITHUB_USERNAME` is unset), `export const EMAIL = 'jeerapat.kah@gmail.com'`, `export const CV_PATH = '/cv.pdf'`. The email is the one in `contactMethods.ts` until Jeerapat confirms otherwise.
  - Tailwind utilities from `@theme`: `bg-cream text-ink text-muted bg-sun bg-peach text-orange-deep bg-orange-deep border-ink border-line`, `font-sans` (Bricolage → Plex Thai → system-ui), `font-hand` (Mali), `shadow-hard` (`5px 5px 0 #2b2118`), `shadow-hard-sm` (`3px 3px 0 #2b2118`).
  - Section ids used by nav and footer: `home`, `work`, `experience`, `notes`, `about`, `contact`.
  - `useLanguage()` from `src/components/LanguageProvider.tsx` (unchanged).

- [ ] **Step 1: Branch and remove dead code**

Run: `git switch -c feature/redesign-c dev`, then `pnpm remove three @react-three/fiber @react-three/drei next-themes`, then delete the 6 files listed above.
Expected: `git status` shows those deletions plus the `package.json`/`pnpm-lock.yaml` changes.

- [ ] **Step 2: Write `globals.css`**

Use `@import "tailwindcss";`, then `@theme inline` holding the color tokens from Global Constraints, the font variables (`--font-sans: var(--font-bricolage), var(--font-plex-thai), system-ui, sans-serif;` and `--font-hand: var(--font-mali), cursive;`) and the two shadows. Base layer: `html { scroll-behavior: smooth }` inside `@media (prefers-reduced-motion: no-preference)`; `body` gets `bg-cream text-ink font-sans antialiased`; `:focus-visible { outline: 3px solid #c2410c; outline-offset: 3px }`. Nothing else goes in this file.

- [ ] **Step 3: Write `layout.tsx`**

Load `Bricolage_Grotesque` (latin, weights 400/600/800, `variable: '--font-bricolage'`), `IBM_Plex_Sans_Thai` (thai+latin, 400/600, `--font-plex-thai`) and `Mali` (thai+latin, 400/600, `--font-mali`) from `next/font/google`, and put all three `.variable` classes on `<html>`. Remove the `ThemeProviderWrapper`, the `motion.css` import and the body's `bg-white dark:*` classes. Metadata: title `Jeerapat Kahyaisiang — Full-stack Developer`, description `Full-stack developer (React, Node.js, TypeScript) based in Phrae, Thailand. Selected work, experience and CV.`

- [ ] **Step 4: Write `content.ts` (nav, footer, errors keys), `site.ts`, and fix `socialLinks.ts`**

EN copy: nav `{ work: 'Work', experience: 'Experience', notes: 'Notes', about: 'About', cv: 'Download CV', menu: 'Menu', switchTo: 'ภาษาไทย' }`; footer `{ madeIn: 'made in Phrae' }`. TH copy goes in the same shape (`switchTo: 'English'`). In `socialLinks.ts`, use `EMAIL` and `GITHUB_URL` from `site.ts` and drop the GitHub entry when `GITHUB_URL` is null. Remove the unused `color` field.

- [ ] **Step 5: Rewrite `Navbar.tsx`, `footer.tsx`, and stub `page.tsx`**

Navbar: sticky, `bg-cream/90` with a bottom `border-line`; the `jeerapat.dev` wordmark links to `#home`; links go to `#work`, `#experience`, `#notes` and `#about`; a TH/EN pill button toggles `setLanguage` and its `aria-label` comes from `nav.switchTo`; a dark pill `<a href={CV_PATH} download>` reads `{nav.cv} ↓`. Below `md`, the four links move into a menu button (`aria-expanded`). Escape and clicking a link close it. The CV pill stays visible at every width. Footer: one line with `© {year} Jeerapat Kahyaisiang · {footer.madeIn}` and the social icon links (`aria-label` = label). `page.tsx` becomes a server component rendering `<main id="home">` with no sections yet. Each later task adds its section here.

- [ ] **Step 6: Verify**

Run: `pnpm exec tsc --noEmit && pnpm lint`
Expected: no errors.
Browser at 375px: Tab through the navbar and confirm each item shows the orange focus ring. Open the menu with Enter and close it with Escape, and confirm `aria-expanded` flips each time. Click TH/EN and confirm the nav labels switch and `document.documentElement.lang` becomes `th`.

- [ ] **Step 7: Commit**

```bash
git add -A && git commit -m "refactor: new warm theme foundation, remove 3D and theme switcher"
```

### Task 2: Hero

**Files:**
- Create: `src/components/sections/Hero.tsx`
- Modify: `src/data/content.ts` (`hero` key), `src/app/page.tsx`

**Interfaces:**
- Consumes: `content`, `useLanguage`, `EMAIL`, the tokens, and `profile` from `@assets/images/profile.jpg`.
- Produces: `export default function Hero()` (client component).

- [ ] **Step 1: Add `hero` copy (EN verbatim from the mockup, TH written to match)**

`greeting: 'สวัสดีครับ, I'm Jeerapat 👋'`. The H1 is split as `titleA: 'Full-stack dev who likes the '`, `titleMark: 'boring details'`, `titleB: ' done right.'`. `lede: 'I build web apps end to end with React, Node.js and TypeScript, from the database schema to the last button state. Currently looking for my next team.'` `cta: 'See my work'`. Role line under the greeting: `role: 'Full-stack & DevOps'`. Facts: `location: 'Phrae, TH'`, `remote: 'open to remote'`, `degree: 'B.Eng. Computer Eng.'`, `roles: '3 roles since 2024'`. `caption: 'off-duty mode 🎸'`, `sticker: 'open to work!'`, `photoAlt: 'Jeerapat playing guitar'`. On the TH page the greeting becomes English (`'Hi, I'm Jeerapat 👋'`), following the spec's language-swap rule for handwriting.

- [ ] **Step 2: Build `Hero.tsx`**

Two columns (`md:grid-cols-[1.4fr_1fr]`) that stack on mobile with the photo below. The greeting uses `font-hand text-orange-deep`. The H1 runs about 56px on desktop and 40px on mobile, weight 800 with tight tracking, and `titleMark` sits in a span with `bg-[linear-gradient(transparent_62%,#ffd166_62%)]`. Buttons: `See my work` (`bg-orange-deep text-white`, links to `#work`) and the mailto email (outlined). Facts row icons: `MapPin`, `GraduationCap`, `Briefcase` from lucide. Polaroid: white frame, `rotate-3`, a tape strip, `next/image` with `fill` and `priority`, the caption in `font-hand`, and a round dark sticker (`text-sun font-hand -rotate-10`) placed `right-2` at the frame's lower edge. Keep it inside the frame's box so it cannot overflow the viewport.

- [ ] **Step 3: Add `<Hero />` to `page.tsx`, then type-check and lint**

Run: `pnpm exec tsc --noEmit && pnpm lint`
Expected: no errors.

- [ ] **Step 4: Browser check (Review Focus 1, 2)**

At 375px run `document.documentElement.scrollWidth <= innerWidth` and expect `true`. At 1280px the hero fits in one screen with name, lede, buttons and facts above the fold. Switch to TH and confirm every hero string changes and the H1 wraps cleanly.

- [ ] **Step 5: Commit** — `git commit -am "feat: hero section"` (add the new file first).

### Task 3: Work section and project data

**Files:**
- Create: `src/components/sections/Work.tsx`
- Modify: `src/data/projects.ts`, `src/data/content.ts` (`work` key), `src/app/page.tsx`

**Interfaces:**
- Consumes: `GITHUB_URL`-style env handling from `site.ts`.
- Produces: `Project` gains `badge?: string`, `badgeTh?: string`, `descriptionTh?: string`, `screenshot?: string`, `lead?: boolean` and `parts?: { name: string; nameTh: string; text: string; textTh: string }[]`, and loses `image`. `github` is only set when the username env exists (build it the same way as `GITHUB_URL`; set `undefined` when unset). `export default function Work()`.

- [ ] **Step 1: Update `projects.ts`**

Add TMK ERP as the first entry: `id: 'tmk-erp'`, `title: 'TMK ERP'`, `lead: true`, no `github`/`live`/`screenshot`, `badge: 'ERP · SAP B1 & bank integration'`. `description` / `descriptionTh` are the "Card — EN/TH" blocks from Jeerapat's TMK content doc, word for word, without the trailing tech line. `tags`: Node.js, Express, SQL Server, Sequelize, Next.js, React, Ant Design, Electron, SQLite, SAP Business One, Docker, Jenkins. `parts`: POS (desktop app): weighing, purchase receipts, payments, shift open/close, keeps working on unstable internet. Admin (web back office): approvals, master data, permissions, reports, SAP sync monitoring. API (central server): data and processing, SAP Business One and bank payment integration, nightly jobs. Take the Thai `parts` from the doc's TH summary. Remove `image`. Badges: Competency V2 `'Full stack · 327+ commits'`, PerfNet `'Hackathon · 🥈 2nd place'`, Institution Evaluation and Database Project `'Live'`, Portfolio `'This site'`. Shorten the descriptions to 1–2 sentences with no new claims (use the mockup's wording for the two featured projects). Portfolio description: `'This site: a bilingual one-page portfolio built with Next.js, TypeScript and Tailwind CSS.'`. Drop the `next-themes` tag and any mention of AI, theming or animation. Fill `descriptionTh` and `badgeTh` for every project.

- [ ] **Step 2: Add `work` copy and build `Work.tsx`**

Copy: `kicker` (EN page `'ของที่ทำมา'`, TH page `"things I've built"`), `title` (`'Selected work'` / Thai), `code: 'Code'`, `visit: 'Visit'`, `privateNote: 'Private client project · details shared in interview'` / Thai. **The lead project** (`lead: true`) renders first as a full-width `LeadCard` (inside `Work.tsx`): `md:grid-cols-[1.3fr_1fr]`. The left side has the badge, title, description, the 3 `parts` as rows (bold name plus one line) and tag chips. The right side has an architecture sketch built from bordered boxes and arrows in plain HTML/CSS: `POS · Electron` → `API · Node/Express` → `SQL Server`, `Admin · Next.js` → API, and API → `SAP Business One` and `Bank API`. On mobile it stacks, and the sketch arrows turn vertical. `privateNote` replaces the links. Featured projects (`featured: true`) go in a `md:grid-cols-2` grid of large cards: `border-2 border-ink rounded-2xl bg-white shadow-hard`, a 16:9 media box (the `screenshot` via `next/image` when present, otherwise a colored block, `bg-[#fff3c4]` and `bg-[#ffe1d3]` alternating, showing the title in `font-hand`), the badge pill (`bg-peach text-orange-deep`), title, description, a stack line (first 5 tags joined with ` · `) and links. The rest go in a `md:grid-cols-3` grid of small cards with `shadow-hard-sm`. Card hover is `-translate-y-0.5` with a larger shadow, under `motion-safe:` only. External links get `target="_blank" rel="noopener noreferrer"` and an `ArrowUpRight` icon.

- [ ] **Step 3: Add to `page.tsx`, then verify (Review Focus 4)**

Run: `pnpm exec tsc --noEmit && pnpm lint` and expect no errors.
Browser, with `NEXT_PUBLIC_GITHUB_USERNAME` unset: `[...document.querySelectorAll('#work a')].some(a => a.href.includes('undefined'))` returns `false`, and the cards show no Code link. With it set, the Code links appear. At 375px the grids are one column and `scrollWidth <= innerWidth`. In TH, the descriptions and badges are Thai.

- [ ] **Step 4: Commit** — `git commit -m "feat: work section with featured and small project cards"`.

### Task 4: Experience and About

**Files:**
- Create: `src/components/sections/Experience.tsx`, `src/components/sections/About.tsx`
- Modify: `src/data/experience.ts`, `src/data/content.ts` (`experience`, `about` keys), `src/app/page.tsx`

**Interfaces:**
- Produces: each experience entry gains `shortDuration: string`, `shortCompany: string`, `summary: string` and `summaryTh: string`. The existing fields stay. (This is the spec's "`descriptionTh`" for experience. It is named `summaryTh` because it translates the new short `summary`, not the long `description`.) `export default function Experience()` and `export default function About()`.

- [ ] **Step 1: Update `experience.ts`**

Take `shortDuration` (`'Feb – Mar 2026'`, `'Apr – Jun 2025'`, `'Mar – Jul 2024'`), `shortCompany` (`'Freelance'`, `'Easy Rice Digital Technology'`, `'Freelance'`) and `summary` verbatim from the mockup. The title for the first entry becomes `'Web & Mobile Developer'`. Write `summaryTh` for each, with no new claims.

- [ ] **Step 2: Build `Experience.tsx`**

Kicker `'ที่ที่เคยทำงาน'` / `"where I've worked"`, title `'Experience'` / Thai. Use a `grid-cols-[150px_1fr]` timeline (on mobile the dates go above each entry): dates in `font-hand text-muted`, right aligned, and a `border-l-2 border-ink` line with an orange dot (`bg-orange border-2 border-ink`) for each job.

- [ ] **Step 3: Build `About.tsx`**

Kicker `'ตัวตนนิดนึง'` / `'a bit about me'`, title `'About me'` / Thai. Left column: the paragraph text from `content.about.body: string[]`. It holds the mockup's two paragraphs as placeholder, with a `// TODO(Jeerapat): replace with your own words` comment above the key in both languages. Right column: four chip groups: `Frontend` (React, Next.js, TypeScript, Tailwind, Redux, Ant Design, Flutter, Electron), `Backend & data` (Node.js, NestJS, Express, Prisma, Sequelize, MySQL, SQL Server), `Integrations` (SAP Business One, Bank payment API, Cron jobs) and `DevOps & infra` (Docker, Docker Compose, Harbor, Traefik v3, HTTPS / certificates, Linux troubleshooting, Jenkins, AWS EC2, Vercel, Git), with chips as `border-2 border-ink rounded-full bg-white`. Below them, a `bg-sun border-2 border-ink rounded-2xl -rotate-1` education card: `B.Eng. Computer Engineering` and languages `Thai (native) · English` in `font-hand`.

- [ ] **Step 4: Add both to `page.tsx`, then verify**

Run: `pnpm exec tsc --noEmit && pnpm lint` and expect no errors. At 375px `scrollWidth <= innerWidth`. In TH, the summaries, kickers and titles are Thai.

- [ ] **Step 5: Commit** — `git commit -m "feat: experience timeline and about section"`.

### Task 5: Field notes (DevOps cases)

**Files:**
- Create: `src/components/sections/Notes.tsx`, `src/data/notes.ts`
- Modify: `src/data/content.ts` (`notes` key), `src/app/page.tsx` (insert between Experience and About)

**Interfaces:**
- Produces: `src/data/notes.ts` exports `type FieldNote = { id: string; title: string; titleTh: string; symptom: string; symptomTh: string; cause: string; causeTh: string; found: string; foundTh: string; fix: string; fixTh: string; lesson?: string; lessonTh?: string }` (`lesson` is optional; case 3 has none in the source doc, so don't invent one) and `export const fieldNotes: FieldNote[]`. `export default function Notes()`.

- [ ] **Step 1: Write `notes.ts`**

Three entries from Jeerapat's DevOps doc, cases 1–3, keeping the doc's facts and shortening the wording. `next-env-baked`: images missing and the page stuck loading → the image was built with an empty `.env.production`, so `NEXT_PUBLIC_*` was never replaced → found the unreplaced references in `.next/static` and a 0-byte env file in the image → temporary fix with a startup script that substitutes the values (reversible), permanent fix by building with the real env in the pipeline → lesson: `NEXT_PUBLIC_*` is baked in at build time. `offline-https`: browser shows "Not secure" → Let's Encrypt cannot issue certificates in a network with no outbound internet → Traefik's startup log could not find the `.key` matching the `.crt` (the names must match) → placed the wildcard `cert.crt` + `cert.key` and restarted; confirmed with "loaded cert.crt" in the log. `login-400`: `POST /auth/sign_in` returned 400 "Something went wrong." with the error swallowed in a `catch` → traced the code path with temporary logging and found `id` undefined after create → the table had no AUTO_INCREMENT/PRIMARY KEY on `id` → proposed a schema fix through the DBA, with a backup first. Write the Thai fields from the doc's Thai text. Leave out case 4, any system name and any URL path.

- [ ] **Step 2: Add `notes` copy and build `Notes.tsx`**

Copy: kicker `'เรื่องที่เคยแก้'` / `"things I've fixed"`, title `'Notes from the field'` / Thai. Intro: `'I keep web and API services running on Docker inside a public health agency's closed, on-prem network. I start from logs and evidence, and I fix things in ways that can be rolled back.'` / Thai. Labels: `symptom: 'Symptom'`, `cause: 'Cause'`, `found: 'How I found it'`, `fix: 'Fix'`, `lesson: 'Lesson'`. `howTitle: 'How I work'`, plus `how: string[]` holding the doc's 5 principles (evidence first, small reversible fixes, change course when the evidence says so, review before touching production, never leak secrets). Layout: a `md:grid-cols-3` grid of cards with `bg-white border-2 border-ink rounded-xl`, a tape strip on top and alternating `rotate-[-1deg]` / `rotate-[1deg]` (under `motion-safe:`, flat otherwise). Labels go in `font-hand text-orange-deep`, and inline code in `font-mono text-[0.85em] bg-peach px-1 rounded`. Below the cards, the "How I work" list in `font-hand` with an ink checkmark for each line.

- [ ] **Step 3: Verify**

Run: `pnpm exec tsc --noEmit && pnpm lint` and expect no errors. At 375px the cards are one column and `scrollWidth <= innerWidth` (long tokens such as `NEXT_PUBLIC_*` and `/auth/sign_in` must wrap; use `break-words`). In TH, all labels and texts are Thai. `grep -n "c-life" src -r` returns nothing.

- [ ] **Step 4: Commit** — `git commit -m "feat: field notes section with DevOps cases"`.

### Task 6: Contact

**Files:**
- Create: `src/components/sections/Contact.tsx`
- Modify: `src/data/content.ts` (`contact` key), `src/data/contactMethods.ts` (drop `description`, and point `href: '#'` for Location to nothing; render it as plain text), `src/app/page.tsx`

**Interfaces:**
- Consumes: `contactMethods`, `GITHUB_URL`, `EMAIL`.
- Produces: `export default function Contact()` (client). The submit logic is moved unchanged from the old `page.tsx`: `fetch('/api/contact', { method: 'POST', ... })` with `status: 'idle' | 'loading' | 'success' | 'error'`.

- [ ] **Step 1: Add `contact` copy and build `Contact.tsx`**

Kicker `'มาคุยกันได้เลย'` / `"let's talk"`, title `"Let's work together."` / Thai, plus field labels and placeholders, `send`, `sending`, `success` and `error` (reuse the meaning of today's strings). Layout: a `bg-ink text-cream rounded-3xl` panel with `md:grid-cols-[1.1fr_1fr]`. On the left, rows for Email, Phone, GitHub (only when `GITHUB_URL`) and Location as plain text. On the right, a `bg-cream text-ink` form with name, email, subject and message (all `required`, labels visible) and a submit button in `bg-orange-deep text-white`. The result note uses `role="status"`.

- [ ] **Step 2: Add to `page.tsx`, then type-check and lint**

Run: `pnpm exec tsc --noEmit && pnpm lint`
Expected: no errors.

- [ ] **Step 3: Browser check of failure paths (Review Focus 3)**

In DevTools, override `fetch` to return `new Response('{"error":"Too many requests"}', { status: 429 })`, then submit. Expect the error note to show "Too many requests", the button to be enabled again, and all four fields to keep their text. Repeat with `fetch` rejecting (network down) and expect the generic error copy. Success path: with the real API and no `RESEND_API_KEY`, record whatever the API returns. Do not change the API.

- [ ] **Step 4: Commit** — `git commit -m "feat: contact section"`.

### Task 7: Error, 404 and loading screens, then the full sweep

**Files:**
- Modify: `src/app/not-found.tsx`, `src/app/loading.tsx`, `src/app/error.tsx`, `src/app/global-error.tsx`, `src/components/ErrorBoundary.tsx`, `src/data/content.ts` (`errors` key)

**Interfaces:**
- Consumes: the tokens and `content.errors`. `global-error.tsx` renders outside the layout, so it keeps inline styles using the token hex values and the copy is English only.

- [ ] **Step 1: Restyle the five screens**

Each one is a centered card on cream: `border-2 border-ink rounded-2xl bg-white shadow-hard`, a handwritten line, a heading and one button (`bg-orange-deep text-white`). Remove the "signal / cosmic / SYSTEM SAFE MODE" wording and the `safe-error` class. Copy: 404 `'This page wandered off.'` with a `Back home` button; error `'Something broke on this page.'` with `Try again`. `ErrorBoundary` and `not-found` read their copy from `content.errors` (`not-found` is a server component, so it uses `en`).

- [ ] **Step 2: Full verification**

Run: `pnpm exec tsc --noEmit && pnpm lint && pnpm build`
Expected: all succeed. `grep -rn "dark:\|safe-error\|observatory\|OrbitalScene\|next-themes\|three" src` returns nothing.

- [ ] **Step 3: Full browser sweep (all Review Focus items)**

At 375px and 1280px, in EN and TH:
- `scrollWidth <= innerWidth` is true.
- Every visible string switches language.
- No `href` contains `undefined`.
- Tabbing shows a focus ring on every link and button.
- With reduced motion emulated, there is no smooth scroll and no card lift.
- `/does-not-exist` shows the new 404.
- `/cv.pdf` responds 200. If it is a 404, report it to Jeerapat as an open item; do not create a placeholder PDF.

Take screenshots of the hero at both widths for the hand-over.

- [ ] **Step 4: Commit** — `git commit -am "feat: restyle error, 404 and loading screens"`.
