'use client'

import Image from 'next/image'
import { Briefcase, GraduationCap, MapPin } from 'lucide-react'
import profile from '@assets/images/profile.jpg'
import { useLanguage } from '@/components/LanguageProvider'
import { content } from '@/data/content'
import { EMAIL } from '@/data/site'

export default function Hero() {
  const { language } = useLanguage()
  const t = content[language].hero

  return (
    <section className="mx-auto grid max-w-6xl scroll-mt-20 items-center gap-10 px-5 pb-12 pt-8 md:grid-cols-[1.4fr_1fr] md:gap-9 md:px-10 md:pt-6">
      <div>
        <p className="font-hand text-lg text-orange-deep">{t.greeting}</p>
        <p className="mb-3 text-sm text-muted">{t.role}</p>
        <h1 className="mb-4 text-[40px] font-extrabold leading-[1.15] tracking-[-0.03em] md:text-[56px]">
          {t.titleA}
          <span className="whitespace-nowrap bg-[linear-gradient(transparent_62%,#ffd166_62%)]">{t.titleMark}</span>
          {t.titleB}
        </h1>
        <p className="mb-5 max-w-[440px] text-[17px] leading-[1.55]">{t.lede}</p>
        <div className="flex flex-wrap gap-3">
          <a
            href="#work"
            className="inline-block rounded-full border-2 border-orange-deep bg-orange-deep px-[18px] py-2.5 text-sm font-semibold text-white"
          >
            {t.cta}
          </a>
          <a
            href={`mailto:${EMAIL}`}
            className="inline-block break-all rounded-full border-2 border-ink px-[18px] py-2.5 text-sm font-semibold"
          >
            {EMAIL}
          </a>
        </div>
        <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted">
          <li className="flex items-center gap-1.5">
            <MapPin size={16} aria-hidden />
            <span>
              <b className="text-ink">{t.location}</b> · {t.remote}
            </span>
          </li>
          <li className="flex items-center gap-1.5">
            <GraduationCap size={16} aria-hidden />
            <span>{t.degree}</span>
          </li>
          <li className="flex items-center gap-1.5">
            <Briefcase size={16} aria-hidden />
            <span>{t.roles}</span>
          </li>
        </ul>
      </div>

      <div className="relative mx-auto w-full max-w-xs rotate-3 bg-white px-3 pb-10 pt-3 shadow-hard-sm md:max-w-none">
        <span
          aria-hidden
          className="absolute -top-3 left-1/2 h-5 w-20 -translate-x-1/2 -rotate-2 bg-sun/80"
        />
        <div className="relative aspect-square">
          <Image
            src={profile}
            alt={t.photoAlt}
            fill
            priority
            sizes="(min-width: 768px) 380px, 320px"
            className="object-cover"
          />
        </div>
        <p className="absolute inset-x-0 bottom-2 text-center font-hand text-[15px]">{t.caption}</p>
        <span className="absolute bottom-8 right-2 grid size-[84px] -rotate-[10deg] place-items-center rounded-full bg-ink p-1 text-center font-hand text-[13px] leading-tight text-sun">
          {t.sticker}
        </span>
      </div>
    </section>
  )
}
