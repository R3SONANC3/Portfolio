'use client'

import Image from 'next/image'
import { ArrowUpRight } from 'lucide-react'
import { useLanguage } from '@/components/LanguageProvider'
import { content, type Copy } from '@/data/content'
import { projects, type Project } from '@/data/projects'

type WorkCopy = Copy['work']

const lift = 'motion-safe:transition motion-safe:hover:-translate-y-0.5'
const linkCls = 'inline-flex items-center gap-1 text-sm font-semibold text-orange-deep'

function Links({ p, t }: { p: Project; t: WorkCopy }) {
  if (!p.github && !p.live) return null
  return (
    <div className="mt-auto flex flex-wrap gap-x-4 gap-y-1 pt-3">
      {p.live && (
        <a href={p.live} aria-label={`${t.visit}: ${p.title}`} target="_blank" rel="noopener noreferrer" className={linkCls}>
          {t.visit} <ArrowUpRight size={16} aria-hidden />
        </a>
      )}
      {p.github && (
        <a href={p.github} aria-label={`${t.code}: ${p.title}`} target="_blank" rel="noopener noreferrer" className={linkCls}>
          {t.code} <ArrowUpRight size={16} aria-hidden />
        </a>
      )}
    </div>
  )
}

function Pill({ children }: { children: React.ReactNode }) {
  return <span className="inline-block rounded-full bg-peach px-2.5 py-0.5 text-xs font-semibold text-orange-ink">{children}</span>
}

function Box({ children, sub, api }: { children: React.ReactNode; sub?: string; api?: boolean }) {
  return (
    <div className={`rounded-lg border-2 border-ink px-2 py-1.5 text-center text-xs font-semibold leading-tight ${api ? 'bg-sun' : 'bg-white'}`}>
      {children}
      {sub && <small className="block text-[10px] font-normal text-muted">{sub}</small>}
    </div>
  )
}

function Arrow() {
  return (
    <span aria-hidden className="text-lg font-bold leading-none">
      <span className="lg:hidden">↓</span>
      <span className="hidden lg:inline">→</span>
    </span>
  )
}

const group = 'flex flex-col items-stretch gap-2'

// API is the single hub: inputs -> API -> outputs. Vertical stack until lg.
function Architecture({ alt }: { alt: string }) {
  return (
    <div role="img" aria-label={alt} className="rounded-xl border-2 border-ink bg-[#fff8e6] p-4">
      <div aria-hidden className="flex flex-col items-center gap-2 lg:flex-row lg:justify-center lg:gap-2">
        <div className={group}>
          <Box sub="Electron">POS</Box>
          <Box sub="Next.js">Admin</Box>
        </div>
        <Arrow />
        <Box api sub="Node · Express">
          API
        </Box>
        <Arrow />
        <div className={group}>
          <Box>SQL Server</Box>
          <Box>SAP Business One</Box>
          <Box>Bank API</Box>
        </div>
      </div>
    </div>
  )
}

function LeadCard({ p, t, th }: { p: Project; t: WorkCopy; th: boolean }) {
  return (
    <article className="grid gap-6 rounded-2xl border-2 border-ink bg-white p-5 shadow-hard md:grid-cols-[1.3fr_1fr] md:gap-7 md:p-6">
      <div className="min-w-0">
        {p.badge && <Pill>{th ? (p.badgeTh ?? p.badge) : p.badge}</Pill>}
        <h3 className="mb-2 mt-2 text-3xl font-extrabold tracking-[-0.02em]">{p.title}</h3>
        <p className="mb-4 text-sm leading-[1.6]">{th ? (p.descriptionTh ?? p.description) : p.description}</p>
        <ul className="mb-4 space-y-2 text-sm leading-[1.5]">
          {p.parts?.map((part) => (
            <li key={part.name}>
              <b>{th ? part.nameTh : part.name}</b> <span className="text-muted">{th ? part.textTh : part.text}</span>
            </li>
          ))}
        </ul>
        <ul className="mb-4 flex flex-wrap gap-1.5">
          {p.tags.map((tag) => (
            <li key={tag} className="rounded-full border border-line px-2.5 py-0.5 text-xs">
              {tag}
            </li>
          ))}
        </ul>
        <p className="text-sm text-muted">{t.privateNote}</p>
      </div>
      <Architecture alt={t.archAlt} />
    </article>
  )
}

function Card({ p, t, th, i, big }: { p: Project; t: WorkCopy; th: boolean; i: number; big: boolean }) {
  return (
    <article
      className={`flex min-w-0 flex-col border-2 border-ink bg-white ${lift} ${
        big
          ? 'rounded-2xl p-4 shadow-hard motion-safe:hover:shadow-[7px_7px_0_#2b2118]'
          : 'rounded-xl p-3.5 shadow-hard-sm motion-safe:hover:shadow-[5px_5px_0_#2b2118]'
      }`}
    >
      {big && (
        <div
          className={`relative mb-3 flex aspect-video items-center justify-center overflow-hidden rounded-lg border-2 border-ink ${
            i % 2 ? 'bg-[#ffe1d3]' : 'bg-[#fff3c4]'
          }`}
        >
          {p.screenshot ? (
            <Image src={p.screenshot} alt="" fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
          ) : (
            <span aria-hidden className="font-hand text-2xl">
              {p.title}
            </span>
          )}
        </div>
      )}
      {p.badge && (
        <div>
          <Pill>{th ? (p.badgeTh ?? p.badge) : p.badge}</Pill>
        </div>
      )}
      <h3 className={`mt-2 font-extrabold ${big ? 'text-2xl' : 'text-[17px]'}`}>{p.title}</h3>
      <p className="mb-2 mt-1 text-sm leading-[1.55]">{th ? (p.descriptionTh ?? p.description) : p.description}</p>
      <p className="text-xs text-muted">{p.tags.slice(0, 5).join(' · ')}</p>
      <Links p={p} t={t} />
    </article>
  )
}

export default function Work() {
  const { language } = useLanguage()
  const t = content[language].work
  const th = language === 'th'
  const lead = projects.find((p) => p.lead)
  const featured = projects.filter((p) => p.featured && !p.lead)
  const rest = projects.filter((p) => !p.featured && !p.lead)

  return (
    <section id="work" className="mx-auto max-w-6xl scroll-mt-20 border-t-2 border-dashed border-line px-5 py-12 md:px-10">
      <p lang={language === 'en' ? 'th' : 'en'} className="font-hand text-lg text-orange-deep">{t.kicker}</p>
      <h2 className="mb-6 text-3xl font-extrabold tracking-[-0.02em] md:text-4xl">{t.title}</h2>
      {lead && <LeadCard p={lead} t={t} th={th} />}
      <div className="mt-6 grid gap-5 md:grid-cols-2">
        {featured.map((p, i) => (
          <Card key={p.id} p={p} t={t} th={th} i={i} big />
        ))}
      </div>
      <div className="mt-5 grid gap-4 md:grid-cols-3">
        {rest.map((p, i) => (
          <Card key={p.id} p={p} t={t} th={th} i={i} big={false} />
        ))}
      </div>
    </section>
  )
}
