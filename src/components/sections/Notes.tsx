'use client'

import { Fragment } from 'react'
import { useLanguage } from '@/components/LanguageProvider'
import { content } from '@/data/content'
import { fieldNotes } from '@/data/notes'

// Text between backticks becomes inline <code>; backticks in the data must be paired.
function Rich({ text }: { text: string }) {
  return text.split('`').map((part, i) =>
    i % 2 ? (
      <code key={i} className="break-all rounded bg-peach px-1 font-mono text-[0.85em]">
        {part}
      </code>
    ) : (
      <Fragment key={i}>{part}</Fragment>
    ),
  )
}

export default function Notes() {
  const { language } = useLanguage()
  const t = content[language].notes
  const th = language === 'th'

  return (
    <section id="notes" className="mx-auto max-w-6xl scroll-mt-20 border-t-2 border-dashed border-line px-5 py-12 md:px-10">
      <p lang={language === 'en' ? 'th' : 'en'} className="font-hand text-lg text-orange-deep">{t.kicker}</p>
      <h2 className="mb-3 text-3xl font-extrabold tracking-[-0.02em] md:text-4xl">{t.title}</h2>
      <p className="mb-8 max-w-2xl leading-relaxed">{t.intro}</p>

      <ul className="grid gap-7 md:grid-cols-3 md:gap-5">
        {fieldNotes.map((n, i) => {
          const rows: [string, string | undefined][] = [
            [t.symptom, th ? n.symptomTh : n.symptom],
            [t.cause, th ? n.causeTh : n.cause],
            [t.found, th ? n.foundTh : n.found],
            [t.fix, th ? n.fixTh : n.fix],
            [t.lesson, th ? n.lessonTh : n.lesson],
          ]
          return (
            <li
              key={n.id}
              className={`relative min-w-0 rounded-xl border-2 border-ink bg-white p-5 pt-6 ${
                i % 2 ? 'motion-safe:rotate-[1deg]' : 'motion-safe:rotate-[-1deg]'
              }`}
            >
              <span
                aria-hidden
                className="absolute -top-3 left-[38%] h-5 w-16 -rotate-3 bg-sun/80"
              />
              <h3 className="mb-3 break-words text-lg font-extrabold leading-snug">{th ? n.titleTh : n.title}</h3>
              <dl className="space-y-2.5 text-sm leading-relaxed">
                {rows.map(([label, text]) =>
                  text ? (
                    <div key={label}>
                      <dt className="font-hand text-orange-deep">{label}</dt>
                      <dd className="break-words">
                        <Rich text={text} />
                      </dd>
                    </div>
                  ) : null,
                )}
              </dl>
            </li>
          )
        })}
      </ul>

      <h3 className="mb-3 mt-12 text-xl font-extrabold">{t.howTitle}</h3>
      <ul className="max-w-2xl space-y-2 font-hand leading-relaxed">
        {t.how.map((line) => (
          <li key={line} className="flex gap-2.5">
            <span aria-hidden className="shrink-0 text-ink">
              ✓
            </span>
            <span className="min-w-0 break-words">{line}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}
