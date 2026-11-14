'use client'

import { useLanguage } from '@/components/LanguageProvider'
import { content } from '@/data/content'
import { experience } from '@/data/experience'

export default function Experience() {
  const { language } = useLanguage()
  const t = content[language].experience
  const th = language === 'th'

  return (
    <section id="experience" className="mx-auto max-w-6xl scroll-mt-20 px-5 py-12 md:px-10">
      <p className="font-hand text-lg text-orange-deep">{t.kicker}</p>
      <h2 className="mb-6 text-3xl font-extrabold tracking-[-0.02em] md:text-4xl">{t.title}</h2>
      <ol className="mt-5">
        {experience.map((job) => (
          <li key={job.id} className="group md:grid md:grid-cols-[150px_1fr] md:gap-x-6">
            <p className="min-w-0 pb-1 pl-6 pt-1 font-hand text-sm text-muted md:p-0 md:pt-1 md:text-right">
              <time>{job.shortDuration}</time>
            </p>
            <div className="relative min-w-0 border-l-2 border-ink pb-7 pl-6 group-last:pb-0">
              <span aria-hidden className="absolute -left-2 top-1.5 size-3.5 rounded-full border-2 border-ink bg-orange" />
              <h3 className="text-xl font-extrabold leading-snug">{job.title}</h3>
              <p className="mb-2 mt-0.5 text-sm text-muted">{job.shortCompany}</p>
              <p className="max-w-xl text-sm leading-relaxed">{th ? job.summaryTh : job.summary}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  )
}
