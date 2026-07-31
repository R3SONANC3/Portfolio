'use client'

import Link from 'next/link'
import { ArrowUp, ArrowUpRight, Braces, Send } from 'lucide-react'
import { socialLinks } from '@data/socialLinks'
import { useLanguage } from './LanguageProvider'

export default function Footer() {
  const { language } = useLanguage()
  const th = language === 'th'

  return <footer className="new-footer">
    <div className="footer-light" />
    <div className="footer-shell">
      <div className="footer-invite"><div><p><span /> {th ? 'มีไอเดียอยู่ไหม' : 'HAVE AN IDEA?'}</p><h2>{th ? <>เริ่มจาก<br /><em>การทักกันก่อน</em></> : <>Let’s start with<br /><em>a quick chat.</em></>}</h2></div><Link href="/#contact">{th ? 'ทักมาได้เลย' : 'Say hello'} <Send /></Link></div>
      <div className="footer-lower">
        <div className="footer-profile"><div className="footer-mark" aria-hidden="true"><Braces /></div><div><b>JEERAPAT</b><p>{th ? 'ออกแบบและพัฒนาเว็บไซต์จากประเทศไทย' : 'Designing and building websites from Thailand.'}</p></div></div>
        <div className="footer-nav"><Link href="/#about">{th ? 'เกี่ยวกับ' : 'About'}</Link><Link href="/#projects">{th ? 'ผลงาน' : 'Projects'}</Link><Link href="/#contact">{th ? 'ติดต่อ' : 'Contact'}</Link></div>
        <div className="footer-social">{socialLinks.map((social) => <a key={social.label} href={social.href} target={social.label !== 'Email' ? '_blank' : undefined} rel={social.label !== 'Email' ? 'noopener noreferrer' : undefined} aria-label={social.label}><social.icon /></a>)}</div>
      </div>
      <div className="footer-end"><span>© {new Date().getFullYear()} JEERAPAT. {th ? 'สงวนลิขสิทธิ์' : 'ALL RIGHTS RESERVED.'}</span><button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>{th ? 'กลับขึ้นด้านบน' : 'BACK TO TOP'} <ArrowUp /></button><Link href="/#contact">{th ? 'ติดต่อ' : 'GET IN TOUCH'} <ArrowUpRight /></Link></div>
    </div>
  </footer>
}
