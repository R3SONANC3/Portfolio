'use client'

import { useLanguage } from '@/components/LanguageProvider'
import { content } from '@/data/content'

export default function About() {
  const { language } = useLanguage()
  const t = content[language].about

  return (
    <section id="about" className="mx-auto max-w-6xl scroll-mt-20 px-5 py-12 md:px-10">
      <p className="font-hand text-lg text-orange-deep">{t.kicker}</p>
      <h2 className="mb-6 text-3xl font-extrabold tracking-[-0.02em] md:text-4xl">{t.title}</h2>
      <div className="grid gap-8 md:grid-cols-[1.2fr_1fr] md:gap-9">
        <div className="min-w-0 space-y-3">
          {t.body.map((para) => (
            <p key={para} className="leading-relaxed">
              {para}
            </p>
          ))}
        </div>
        <div className="min-w-0">
          {t.groups.map((g) => (
            <div key={g.name} className="mb-4">
              <h3 className="mb-1.5 text-sm font-bold text-muted">{g.name}</h3>
              <ul className="flex flex-wrap gap-1.5">
                {g.items.map((item) => (
                  <li key={item} className="rounded-full border-2 border-ink bg-white px-2.5 py-0.5 text-[13px]">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div className="mt-6 -rotate-1 rounded-2xl border-2 border-ink bg-sun px-4 py-3 text-sm">
            <b>{t.degree}</b>
            <p className="font-hand">{t.languages}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
