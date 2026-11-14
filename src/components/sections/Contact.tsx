'use client'

import { useState, type ChangeEvent, type FormEvent } from 'react'
import { useLanguage } from '@/components/LanguageProvider'
import { content } from '@/data/content'
import { contactMethods } from '@/data/contactMethods'
import { GITHUB_URL } from '@/data/site'

const field =
  'w-full rounded-xl border-2 border-ink bg-white px-3 py-2 text-ink placeholder:text-muted'

export default function Contact() {
  const { language } = useLanguage()
  const t = content[language].contact
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

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
      }).catch(() => null)
      if (!response) throw new Error(t.error)
      const result = (await response.json().catch(() => ({}))) as { error?: string }
      if (!response.ok) throw new Error(result.error || t.error)
      setStatus('success')
      setMessage(t.success)
      setForm({ name: '', email: '', subject: '', message: '' })
    } catch (error) {
      setStatus('error')
      setMessage(error instanceof Error ? error.message : t.error)
    }
  }

  const link = 'break-words [overflow-wrap:anywhere] hover:underline focus-visible:outline-sun'
  const row = 'flex items-start justify-between gap-4 border-b border-cream/20 py-2.5 text-[15px]'
  const label = 'shrink-0 text-[#cbbba9]'

  return (
    <section id="contact" className="mx-auto max-w-6xl scroll-mt-20 px-5 pb-12 md:px-10">
      <div className="grid gap-8 rounded-3xl bg-ink p-6 text-cream md:grid-cols-[1.1fr_1fr] md:gap-8 md:p-9">
        <div className="min-w-0">
          <p className="font-hand text-lg text-sun">{t.kicker}</p>
          <h2 className="mb-3 text-3xl font-extrabold tracking-[-0.02em] md:text-4xl">{t.title}</h2>
          <p className="mb-5 leading-relaxed">{t.intro}</p>
          {contactMethods.map((m) => (
            <div key={m.key} className={row}>
              <span className={label}>{t[`row${m.key[0].toUpperCase()}${m.key.slice(1)}` as 'rowEmail' | 'rowPhone' | 'rowLocation']}</span>
              {m.href ? (
                <a href={m.href} className={`${link} text-right`}>
                  {m.value}
                </a>
              ) : (
                <span className="text-right">{t.locationValue}</span>
              )}
            </div>
          ))}
          {GITHUB_URL && (
            <div className={row}>
              <span className={label}>{t.github}</span>
              <a href={GITHUB_URL} target="_blank" rel="noreferrer" className={`${link} text-right`}>
                {GITHUB_URL.replace('https://', '')}
              </a>
            </div>
          )}
        </div>
        <form onSubmit={submitForm} className="min-w-0 space-y-3 rounded-2xl bg-cream p-5 text-ink">
          {(['name', 'email', 'subject'] as const).map((k) => (
            <div key={k}>
              <label htmlFor={`contact-${k}`} className="mb-1 block text-sm font-bold">
                {t[k]}
              </label>
              <input
                id={`contact-${k}`}
                name={k}
                type={k === 'email' ? 'email' : 'text'}
                required
                placeholder={t.ph[k]}
                value={form[k]}
                onChange={changeForm}
                className={field}
              />
            </div>
          ))}
          <div>
            <label htmlFor="contact-message" className="mb-1 block text-sm font-bold">
              {t.message}
            </label>
            <textarea
              id="contact-message"
              name="message"
              required
              placeholder={t.ph.message}
              rows={4}
              value={form.message}
              onChange={changeForm}
              className={field}
            />
          </div>
          <button
            type="submit"
            disabled={status === 'loading'}
            className="w-full rounded-full bg-orange-deep px-5 py-2.5 font-bold text-white disabled:opacity-60"
          >
            {status === 'loading' ? t.sending : t.send}
          </button>
          <p role="status" className={`text-sm leading-relaxed ${status === 'error' ? 'font-bold text-orange-deep' : ''}`}>
            {status === 'success' || status === 'error' ? message : ''}
          </p>
        </form>
      </div>
    </section>
  )
}
