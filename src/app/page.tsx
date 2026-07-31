'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState, type ChangeEvent, type FormEvent } from 'react'
import { AlertCircle, ArrowDown, ArrowUpRight, CheckCircle, Code2, Cpu, Github, Layers3, Send, Sparkles } from 'lucide-react'
import { contactMethods } from '@data/contactMethods'
import { experience } from '@data/experience'
import { projects } from '@data/projects'
import { socialLinks } from '@data/socialLinks'
import profile from '@assets/images/profile.jpg'
import OrbitalScene from '@/components/OrbitalScene'
import { useLanguage } from '@/components/LanguageProvider'

const capabilities = [
  { icon: Code2, no: '01' },
  { icon: Layers3, no: '02' },
  { icon: Cpu, no: '03' },
]

const projectDescriptionsTh: Record<string, string> = {
  'portfolio': 'เว็บไซต์พอร์ตโฟลิโอที่เล่าเรื่องงานให้ดูง่ายและเป็นตัวเอง',
}

export default function Home() {
  const { language } = useLanguage()
  const th = language === 'th'
  const copy = th
    ? {
        role: 'นักพัฒนาเว็บแบบ Full-stack',
        heroA: 'ทำเว็บที่', heroB: 'คนใช้แล้วสบายใจ',
        intro: 'สวัสดีครับ ผมจีรพัฒน์ ผมออกแบบและพัฒนาเว็บไซต์ที่ใช้งานง่าย ทำงานได้ดี และช่วยให้ไอเดียของคุณไปต่อได้จริง',
        work: 'ดูผลงาน', talk: 'คุยกับผม', stack: 'เครื่องมือที่ใช้บ่อย',
        focus: 'กำลังสนใจ', focusA: 'เว็บไซต์ที่คิดถึง', focusB: 'คนใช้งานจริง', notes: 'บันทึกการทำงาน / 2026',
        intent: 'ทำงานอย่างตั้งใจ', intentA: 'ดีไซน์ที่ช่วยให้', intentB: 'งานไปต่อได้', discover: 'เลื่อนลงเพื่อดูต่อ',
        bring: 'สิ่งที่ผมช่วยได้', capabilityA: 'เรียบง่าย แต่ใช้งานดี', capabilityB: 'เว็บที่สวยและเข้าใจง่าย', capabilityC: 'ระบบที่เติบโตได้', capabilityD: 'โครงสร้างที่ดูแลง่ายในระยะยาว', capabilityE: 'ใช้เทคโนโลยีให้เหมาะ', capabilityF: 'เลือกเครื่องมือที่ช่วยแก้ปัญหาได้จริง',
        capabilityTitleA: 'ทำให้ทุกอย่าง', capabilityTitleB: 'ง่ายขึ้น', capabilityText: 'ผมดูทั้งภาพรวมและรายละเอียด ตั้งแต่หน้าตาของเว็บไซต์ ไปจนถึงระบบที่อยู่เบื้องหลัง',
        aboutTag: 'ตัวตนของผม', aboutA: 'นักพัฒนาที่', aboutB: 'ใส่ใจรายละเอียด', aboutText: 'ผมจบด้านวิศวกรรมคอมพิวเตอร์ และชอบทำงานกับไอเดียที่ท้าทายแต่มีประโยชน์ ผมสนุกกับการเปลี่ยนเรื่องยากให้กลายเป็นหน้าจอที่คนใช้งานได้ทันที', expA: 'ประสบการณ์', expB: 'ทำงาน',
        projectsTag: 'ผลงานที่เลือกมา', projectsA: 'ของที่ทำ', projectsB: 'ให้ใช้งานได้จริง', projectsText: 'แต่ละโปรเจกต์มีโจทย์และข้อจำกัดไม่เหมือนกัน นี่คือบางงานที่ผมได้ออกแบบและพัฒนาขึ้นมา',
        source: 'ดูโค้ด', visit: 'ดูเว็บไซต์',
        contactTag: 'ติดต่อผม', contactA: 'มีไอเดีย', contactB: 'มาคุยกันได้เลย', contactText: 'ถ้าคุณมีโปรเจกต์ อยากปรึกษา หรืออยากทำอะไรด้วยกัน ส่งข้อความมาได้เลยครับ',
        name: 'ชื่อของคุณ', namePlaceholder: 'ชื่อที่อยากให้เรียก', email: 'อีเมล', subject: 'อยากคุยเรื่องอะไร', subjectPlaceholder: 'เช่น เว็บไซต์ใหม่ หรือโปรเจกต์ที่กำลังคิดอยู่', message: 'เล่าให้ฟังได้เลย', messagePlaceholder: 'บอกบริบทคร่าว ๆ ก็ได้ครับ', send: 'ส่งข้อความ', sending: 'กำลังส่ง...',
        success: 'ได้รับข้อความแล้วครับ เดี๋ยวผมติดต่อกลับ', error: 'ส่งข้อความไม่สำเร็จ ลองใหม่อีกครั้งได้เลย', portraitAlt: 'จีรพัฒน์กำลังเล่นกีตาร์', portraitNote: 'ชอบเรียนรู้เสมอ',
        experience: 'ประสบการณ์ทำงาน', projectFallback: 'โปรเจกต์ที่ออกแบบและพัฒนาเพื่อแก้ปัญหาให้ใช้งานได้จริง',
      }
    : {
        role: 'FULL-STACK WEB DEVELOPER',
        heroA: 'Websites that', heroB: 'feel easy to use.',
        intro: 'Hi, I’m Jeerapat. I design and build clear, reliable websites that help good ideas become useful products.',
        work: 'View my work', talk: 'Get in touch', stack: 'WORKING WITH',
        focus: 'CURRENT FOCUS', focusA: 'Useful products', focusB: 'for real people.', notes: 'WORK NOTES / 2026',
        intent: 'BUILT WITH CARE', intentA: 'Design that helps', intentB: 'things make sense.', discover: 'SCROLL TO EXPLORE',
        bring: 'WHAT I CAN HELP WITH', capabilityA: 'Simple and useful', capabilityB: 'Interfaces that look good and make sense.', capabilityC: 'Built to last', capabilityD: 'Structure that stays easy to work with.', capabilityE: 'Tech with a reason', capabilityF: 'Tools chosen to solve real problems.',
        capabilityTitleA: 'Simple, useful,', capabilityTitleB: 'well made.', capabilityText: 'I work across the product, from the feel of the interface to the system running quietly behind it.',
        aboutTag: 'A LITTLE ABOUT ME', aboutA: 'A developer who', aboutB: 'cares about details.', aboutText: 'I studied Computer Engineering and enjoy working on ideas that are ambitious but practical. I like turning complicated needs into screens people can use right away.', expA: 'WORK', expB: 'EXPERIENCE',
        projectsTag: 'SELECTED WORK', projectsA: 'Things I’ve built', projectsB: 'and shipped.', projectsText: 'Every project comes with different people, problems, and constraints. Here are a few I’ve had the chance to shape.',
        source: 'Source', visit: 'Visit',
        contactTag: 'GET IN TOUCH', contactA: 'Have an idea?', contactB: 'Let’s talk.', contactText: 'If you have a project in mind, need a hand, or just want to say hello, send me a message.',
        name: 'Your name', namePlaceholder: 'How should I call you?', email: 'Email address', subject: 'What would you like to talk about?', subjectPlaceholder: 'A new site, an idea, or a collaboration', message: 'Tell me a bit about it', messagePlaceholder: 'A little context goes a long way.', send: 'Send message', sending: 'Sending...',
        success: 'Thanks — I got your message and will get back to you soon.', error: 'Your message could not be sent. Please try again.', portraitAlt: 'Jeerapat playing guitar', portraitNote: 'CURIOUS BY DEFAULT',
        experience: 'professional experience', projectFallback: 'A project designed and built to solve a real need.',
      }

  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  const capabilityCopy = [
    [copy.capabilityA, copy.capabilityB],
    [copy.capabilityC, copy.capabilityD],
    [copy.capabilityE, copy.capabilityF],
  ]

  const changeForm = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [event.target.name]: event.target.value })
  }

  const submitForm = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setStatus('loading')
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const result = await response.json().catch(() => ({})) as { error?: string }
      if (!response.ok) throw new Error(result.error || copy.error)
      setStatus('success')
      setMessage(copy.success)
      setForm({ name: '', email: '', subject: '', message: '' })
    } catch (error) {
      setStatus('error')
      setMessage(error instanceof Error ? error.message : copy.error)
    }
  }

  return <main className="observatory" lang={language}>
    <section id="home" className="hero-observatory">
      <OrbitalScene />
      <div className="hero-frame">
        <div className="hero-copy-new">
          <p className="eyebrow"><span /> {copy.role}</p>
          <h1>{copy.heroA}<br /><strong>{copy.heroB}</strong></h1>
          <p className="hero-lede">{copy.intro}</p>
          <div className="hero-actions"><Link href="#projects" className="button-primary">{copy.work} <ArrowUpRight /></Link><Link href="#contact" className="button-quiet">{copy.talk}</Link></div>
          <div className="hero-strip"><span>{copy.stack}</span><i /><b>React</b><b>Next.js</b><b>TypeScript</b><b>Node.js</b></div>
        </div>
        <div className="hero-side">
          <article className="signal-card signal-card-top"><p><i /> {copy.focus}</p><b>{copy.focusA}<br />{copy.focusB}</b><span>{copy.notes}</span></article>
          <article className="signal-card signal-card-bottom"><Sparkles /><p>{copy.intent}</p><b>{copy.intentA}<br />{copy.intentB}</b></article>
        </div>
      </div>
      <a className="hero-scroll" href="#about"><span>{copy.discover}</span><ArrowDown /></a>
    </section>

    <section className="capability-band">
      <div className="section-shell"><div className="section-intro"><p className="eyebrow"><span /> {copy.bring}</p><h2>{copy.capabilityTitleA}<br /><em>{copy.capabilityTitleB}</em></h2><p>{copy.capabilityText}</p></div><div className="capability-grid">{capabilities.map(({ icon: Icon, no }, index) => <article key={no} className="capability"><span>{no}</span><Icon /><h3>{capabilityCopy[index][0]}</h3><p>{capabilityCopy[index][1]}</p><i /></article>)}</div></div>
    </section>

    <section id="about" className="about-observatory scroll-mt-28">
      <div className="section-shell about-layout"><div className="portrait-composition"><div className="portrait-number">01</div><div className="portrait-image"><Image src={profile} alt={copy.portraitAlt} fill sizes="(max-width: 900px) 90vw, 40vw" priority /><span>JEERAPAT / THAILAND</span></div><div className="portrait-stamp">{copy.portraitNote}</div></div><div className="about-copy"><p className="eyebrow"><span /> {copy.aboutTag}</p><h2>{copy.aboutA}<br />{copy.aboutB}</h2><p className="large-copy">{copy.aboutText}</p><div className="numbers-row"><div><b>3M+</b><span>{copy.experience}</span></div><div><b>5+</b><span>{th ? 'โปรเจกต์ที่ทำเสร็จ' : 'projects shipped'}</span></div><div><b>15+</b><span>{th ? 'เครื่องมือที่ใช้งาน' : 'tools in my orbit'}</span></div></div><div className="timeline"><p className="eyebrow"><span /> {copy.expA} {copy.expB}</p>{experience.slice(0, 2).map((job) => <article key={job.id}><span>{job.duration}</span><div><h3>{job.title}</h3><p>{job.company}</p></div></article>)}</div></div></div>
    </section>

    <section id="projects" className="projects-observatory scroll-mt-28"><div className="section-shell"><div className="project-heading"><div><p className="eyebrow"><span /> {copy.projectsTag}</p><h2>{copy.projectsA}<br /><em>{copy.projectsB}</em></h2></div><p>{copy.projectsText}</p></div><div className="work-grid">{projects.map((project, index) => <article className={`work-card work-${index + 1}`} key={project.id}><div className="work-top"><span>0{index + 1} — {project.category}</span><b>{project.image}</b></div><h3>{project.title}</h3><p>{th ? projectDescriptionsTh[project.id] || copy.projectFallback : project.description}</p><div className="work-tags">{project.tags.slice(0, 4).map((tag) => <span key={tag}>{tag}</span>)}</div><div className="work-links">{project.github && <a href={project.github} target="_blank" rel="noopener noreferrer"><Github /> {copy.source}</a>}{project.live && <a href={project.live} target="_blank" rel="noopener noreferrer">{copy.visit} <ArrowUpRight /></a>}</div></article>)}</div></div></section>

    <section id="contact" className="contact-observatory scroll-mt-28"><div className="contact-glow" /><div className="section-shell"><div className="contact-title"><p className="eyebrow"><span /> {copy.contactTag}</p><h2>{copy.contactA}<br /><em>{copy.contactB}</em></h2><p>{copy.contactText}</p><div className="contact-socials">{socialLinks.map((social) => <a key={social.label} href={social.href} target={social.label !== 'Email' ? '_blank' : undefined} rel={social.label !== 'Email' ? 'noopener noreferrer' : undefined} aria-label={social.label}><social.icon /></a>)}</div></div><div className="contact-zone"><div className="contact-links">{contactMethods.map((method) => { const Icon = method.icon; return <a key={method.label} href={method.href}><Icon /><span><small>{method.label}</small><b>{method.value}</b></span><ArrowUpRight /></a> })}</div><form className="contact-form-new" onSubmit={submitForm}><div className="field-pair"><label>{copy.name}<input name="name" value={form.name} onChange={changeForm} placeholder={copy.namePlaceholder} required /></label><label>{copy.email}<input name="email" type="email" value={form.email} onChange={changeForm} placeholder="jane@email.com" required /></label></div><label>{copy.subject}<input name="subject" value={form.subject} onChange={changeForm} placeholder={copy.subjectPlaceholder} required /></label><label>{copy.message}<textarea name="message" value={form.message} onChange={changeForm} placeholder={copy.messagePlaceholder} rows={5} required /></label>{status !== 'idle' && <p className={`form-note ${status}`}>{status === 'success' ? <CheckCircle /> : <AlertCircle />}{message}</p>}<button type="submit" disabled={status === 'loading'}>{status === 'loading' ? copy.sending : copy.send} <Send /></button></form></div></div></section>
  </main>
}
