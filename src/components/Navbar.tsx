'use client'

import { useEffect, useRef, useState } from 'react'
import { content } from '@data/content'
import { CV_PATH } from '@data/site'
import { useLanguage } from './LanguageProvider'

const ids = ['work', 'experience', 'notes', 'about'] as const

export default function Navbar() {
  const { language, setLanguage } = useLanguage()
  const [open, setOpen] = useState(false)
  const menuRef = useRef<HTMLButtonElement>(null)
  const nav = content[language].nav

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return
      setOpen(false)
      menuRef.current?.focus()
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open])

  const link = 'rounded px-1 py-1 hover:text-orange-deep'

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-cream/90">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-2 px-4 py-4 text-sm font-semibold sm:px-10">
        <a href="#home" className="text-base font-extrabold sm:text-lg">jeerapat.dev</a>
        <div className="flex items-center gap-2 sm:gap-4">
          <nav aria-label="Primary" className="hidden items-center gap-5 md:flex">
            {ids.map((id) => <a key={id} href={`#${id}`} className={link}>{nav[id]}</a>)}
          </nav>
          <button
            type="button"
            className="rounded-full border-2 border-ink px-2.5 py-0.5 text-xs"
            aria-label={nav.switchTo}
            onClick={() => setLanguage(language === 'en' ? 'th' : 'en')}
          >
            {language === 'en' ? 'TH' : 'EN'}
          </button>
          <a href={CV_PATH} download aria-label={nav.cv} className="whitespace-nowrap rounded-full bg-ink px-3 py-1.5 text-cream sm:px-3.5"><span aria-hidden="true" className="sm:hidden">CV ↓</span><span className="hidden sm:inline">{nav.cv} ↓</span></a>
          <button
            type="button"
            ref={menuRef}
            className="rounded px-1 py-1 md:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen(!open)}
          >
            {nav.menu}
          </button>
        </div>
      </div>
      {open && (
        <nav id="mobile-menu" aria-label="Mobile" className="flex flex-col gap-2 border-t border-line px-4 py-3 text-base font-semibold md:hidden">
          {ids.map((id) => <a key={id} href={`#${id}`} className={link} onClick={() => setOpen(false)}>{nav[id]}</a>)}
        </nav>
      )}
    </header>
  )
}
