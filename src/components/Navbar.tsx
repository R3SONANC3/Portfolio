'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState, type MouseEvent } from 'react'
import { ArrowUpRight, Braces, Menu, X } from 'lucide-react'
import ThemeSwitch from './ThemeSwitch'
import { useLanguage } from './LanguageProvider'

const links = [
  { id: 'home', href: '/' },
  { id: 'about', href: '/#about' },
  { id: 'projects', href: '/#projects' },
] as const

export default function Navbar() {
  const pathname = usePathname()
  const [active, setActive] = useState('home')
  const [open, setOpen] = useState(false)
  const { language, setLanguage } = useLanguage()
  const labels = language === 'th'
    ? { home: 'หน้าแรก', about: 'เกี่ยวกับ', projects: 'ผลงาน', cta: 'คุยกัน', role: 'นักพัฒนาเว็บ' }
    : { home: 'Home', about: 'About', projects: 'Projects', cta: 'Let’s talk', role: 'WEB DEVELOPER' }

  useEffect(() => {
    if (pathname !== '/') return
    const observed = links.map(({ id }) => document.getElementById(id)).filter((item): item is HTMLElement => item !== null)
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)
      if (visible[0]) setActive(visible[0].target.id)
    }, { rootMargin: '-30% 0px -52% 0px', threshold: [0.08, 0.3, 0.6] })
    observed.forEach((item) => observer.observe(item))
    const hero = () => { if (window.scrollY < 170) setActive('home') }
    window.addEventListener('scroll', hero, { passive: true })
    return () => { observer.disconnect(); window.removeEventListener('scroll', hero) }
  }, [pathname])

  const go = (event: MouseEvent<HTMLAnchorElement>, id: string) => {
    setOpen(false)
    setActive(id)
    if (pathname !== '/') return
    const target = document.getElementById(id)
    if (!target) return
    event.preventDefault()
    target.scrollIntoView({ behavior: 'smooth', block: 'start' })
    window.history.replaceState(null, '', id === 'home' ? '/' : `#${id}`)
  }

  return <header className="topbar">
    <div className="topbar-inner">
      <Link href="/" className="topbar-brand topbar-brand--icon" aria-label="Jeerapat home">
        <span className="brand-mark"><Braces /></span>
        <span><b>JEERAPAT</b><small>{labels.role}</small></span>
      </Link>
      <nav className="topbar-links topbar-links--compact" aria-label="Primary navigation">
        {links.map((link) => <Link key={link.id} href={link.href} onClick={(event) => go(event, link.id)} className={active === link.id && pathname === '/' ? 'active' : ''}>{labels[link.id]}</Link>)}
      </nav>
      <div className="topbar-actions">
        <button className="language-switch language-switch--orbital" onClick={() => setLanguage(language === 'en' ? 'th' : 'en')} aria-label={language === 'en' ? 'Switch to Thai' : 'Switch to English'}>
          <span className="language-glow" aria-hidden="true" /><span className={language === 'en' ? 'active' : ''}>EN</span><i /><span className={language === 'th' ? 'active' : ''}>TH</span>
        </button>
        <ThemeSwitch />
        <Link href="/#contact" onClick={(event) => go(event, 'contact')} className="topbar-cta">{labels.cta} <ArrowUpRight /></Link>
        <button className="topbar-menu" aria-label="Toggle navigation" aria-expanded={open} onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>
      </div>
    </div>
    {open && <nav className="topbar-mobile">{links.map((link, index) => <Link key={link.id} href={link.href} onClick={(event) => go(event, link.id)} className={active === link.id && pathname === '/' ? 'active' : ''}><span>0{index + 1}</span>{labels[link.id]}<ArrowUpRight /></Link>)}</nav>}
  </header>
}
