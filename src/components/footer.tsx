'use client'

import { socialLinks } from '@data/socialLinks'
import { content } from '@data/content'
import { useLanguage } from './LanguageProvider'

export default function Footer() {
  const { language } = useLanguage()
  const { madeIn } = content[language].footer

  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-5 py-6 text-sm text-muted sm:px-10">
        <p>© {new Date().getFullYear()} Jeerapat Kahyaisiang · {madeIn}</p>
        <div className="flex items-center gap-4 text-lg text-ink">
          {socialLinks.map(({ icon: Icon, href, label }) => (
            <a key={label} href={href} aria-label={label} {...(href.startsWith('mailto:') ? {} : { target: '_blank', rel: 'noopener noreferrer' })}>
              <Icon />
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}
