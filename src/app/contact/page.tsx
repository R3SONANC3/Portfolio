'use client'

import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
import { Send, CheckCircle, AlertCircle } from 'lucide-react'
import { contactMethods } from '@data/contactMethods'
import { socialLinks } from '@data/socialLinks'

interface FormData {
  name: string
  email: string
  subject: string
  message: string
}

type StatusType = 'idle' | 'loading' | 'success' | 'error'

export default function Contact() {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const isDark = mounted && resolvedTheme === 'dark'

  const [formData, setFormData] = useState<FormData>({
    name: '', email: '', subject: '', message: '',
  })
  const [status, setStatus] = useState<StatusType>('idle')
  const [statusMsg, setStatusMsg] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setStatus('loading')
    setStatusMsg('Sending...')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'Something went wrong')
      }

      setStatus('success')
      setStatusMsg("Message sent! I'll get back to you soon.")
      setFormData({ name: '', email: '', subject: '', message: '' })

      setTimeout(() => { setStatus('idle'); setStatusMsg('') }, 6000)
    } catch (err: any) {
      setStatus('error')
      setStatusMsg(err.message || 'Failed to send. Please try again.')
    }
  }

  if (!mounted) return null

  const inputClass = `w-full px-4 py-3 rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 ${
    isDark
      ? 'bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:border-blue-500'
      : 'bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400 focus:border-blue-400 focus:bg-white'
  }`

  const labelClass = `block text-sm font-medium mb-2 transition-colors duration-300 ${
    isDark ? 'text-gray-300' : 'text-gray-700'
  }`

  return (
    <main className={`min-h-screen transition-colors duration-300 ${isDark ? 'bg-gray-950' : 'bg-white'}`}>

      {/* Hero */}
      <section className={`relative px-4 pt-32 pb-16 sm:px-6 lg:px-8 ${isDark ? 'bg-gray-950' : 'bg-linear-to-br from-white to-gray-50'}`}>
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className={`absolute rounded-full -top-40 -right-40 w-80 h-80 blur-3xl ${isDark ? 'bg-linear-to-br from-blue-900 to-purple-900 opacity-20' : 'bg-linear-to-br from-blue-200 to-purple-200 opacity-20'}`} />
          <div className={`absolute rounded-full -bottom-40 -left-40 w-80 h-80 blur-3xl ${isDark ? 'bg-linear-to-tr from-purple-900 to-pink-900 opacity-20' : 'bg-linear-to-tr from-purple-200 to-pink-200 opacity-20'}`} />
        </div>
        <div className="relative max-w-5xl mx-auto">
          <div className="duration-700 animate-in fade-in slide-in-from-bottom-4">
            <div className="mb-6">
              <span className={`inline-flex items-center px-4 py-2 text-sm font-medium rounded-full ${isDark ? 'bg-linear-to-r from-blue-900/40 to-purple-900/40 text-blue-300' : 'bg-linear-to-r from-blue-100 to-purple-100 text-blue-700'}`}>
                <span className="w-2 h-2 mr-2 bg-blue-500 rounded-full animate-pulse" />
                Let's Connect
              </span>
            </div>
            <h1 className="mb-6 text-5xl font-bold leading-tight sm:text-6xl lg:text-7xl">
              <span className={`text-transparent bg-clip-text ${isDark ? 'bg-linear-to-r from-white via-gray-200 to-gray-400' : 'bg-linear-to-r from-gray-900 via-gray-800 to-gray-700'}`}>
                Get in Touch
              </span>
            </h1>
            <p className={`max-w-2xl mb-8 text-lg leading-relaxed sm:text-xl ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              Have a project in mind or want to collaborate? I'd love to hear from you.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className={`px-4 py-16 sm:px-6 lg:px-8 ${isDark ? 'bg-gray-900/50' : 'bg-gray-50'}`}>
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {contactMethods.map((method, index) => {
              const Icon = method.icon
              return (
                <a key={method.label} href={method.href}
                  className={`group p-6 rounded-xl transition-all duration-300 animate-in fade-in slide-in-from-bottom-4 ${isDark ? 'bg-gray-800 border border-gray-700 hover:border-blue-500' : 'bg-white border border-gray-200 hover:border-blue-400 hover:bg-blue-50'} hover:shadow-lg`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg mb-4 bg-linear-to-br from-blue-500 to-purple-600 text-white group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className={`text-lg font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>{method.label}</h3>
                  <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{method.value}</p>
                  <p className="mt-2 text-xs text-gray-500">{method.description}</p>
                </a>
              )
            })}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className={`px-4 py-20 sm:px-6 lg:px-8 ${isDark ? 'bg-gray-950' : 'bg-white'}`}>
        <div className="max-w-3xl mx-auto">
          <div className="mb-12 text-center">
            <h2 className={`text-4xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Send Me a Message
            </h2>
            <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>
              Fill out the form below and I'll get back to you as soon as possible.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name & Email */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="duration-700 animate-in fade-in slide-in-from-left-4">
                <label className={labelClass}>Name</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange}
                  required className={inputClass} placeholder="Your name" />
              </div>
              <div className="duration-700 animate-in fade-in slide-in-from-right-4">
                <label className={labelClass}>Email</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange}
                  required className={inputClass} placeholder="your@email.com" />
              </div>
            </div>

            {/* Subject */}
            <div className="duration-700 animate-in fade-in slide-in-from-bottom-4" style={{ animationDelay: '100ms' }}>
              <label className={labelClass}>Subject</label>
              <input type="text" name="subject" value={formData.subject} onChange={handleChange}
                required className={inputClass} placeholder="What is this about?" />
            </div>

            {/* Message */}
            <div className="duration-700 animate-in fade-in slide-in-from-bottom-4" style={{ animationDelay: '200ms' }}>
              <label className={labelClass}>Message</label>
              <textarea name="message" value={formData.message} onChange={handleChange}
                required rows={6} className={`${inputClass} resize-none`}
                placeholder="Tell me more about your project or inquiry..." />
            </div>

            {/* Status */}
            {status !== 'idle' && (
              <div className={`p-4 rounded-lg flex items-center gap-3 animate-in fade-in duration-300 ${
                status === 'success'
                  ? isDark ? 'bg-green-900/20 border border-green-700 text-green-300' : 'bg-green-50 border border-green-200 text-green-700'
                  : status === 'error'
                  ? isDark ? 'bg-red-900/20 border border-red-700 text-red-300' : 'bg-red-50 border border-red-200 text-red-700'
                  : isDark ? 'bg-blue-900/20 border border-blue-700 text-blue-300' : 'bg-blue-50 border border-blue-200 text-blue-700'
              }`}>
                {status === 'success' ? <CheckCircle className="w-5 h-5 shrink-0" />
                  : status === 'error' ? <AlertCircle className="w-5 h-5 shrink-0" />
                  : <div className="w-5 h-5 border-2 border-current rounded-full shrink-0 border-t-transparent animate-spin" />}
                <span>{statusMsg}</span>
              </div>
            )}

            {/* Submit */}
            <button type="submit" disabled={status === 'loading'}
              className={`w-full py-3 px-6 rounded-lg font-medium transition-all duration-300 flex items-center justify-center gap-2 bg-linear-to-r ${
                isDark ? 'from-blue-600 to-purple-700 hover:shadow-lg hover:shadow-blue-600/40' : 'from-blue-500 to-purple-600 hover:shadow-lg hover:shadow-blue-500/50'
              } text-white disabled:opacity-50 disabled:cursor-not-allowed active:scale-95`}
            >
              {status === 'loading' ? (
                <><div className="w-4 h-4 border-2 border-white rounded-full border-t-transparent animate-spin" /> Sending...</>
              ) : (
                <><Send className="w-4 h-4" /> Send Message</>
              )}
            </button>
          </form>
        </div>
      </section>

      {/* Social Links */}
      <section className={`px-4 py-16 sm:px-6 lg:px-8 border-t ${isDark ? 'border-gray-800 bg-gray-900/50' : 'border-gray-200 bg-gray-50'}`}>
        <div className="max-w-5xl mx-auto text-center">
          <h2 className={`text-2xl font-bold mb-8 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Follow My Work
          </h2>
          <div className="flex justify-center gap-6">
            {socialLinks.map((link) => {
              const Icon = link.icon
              return (
                <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer" aria-label={link.label}
                  className={`p-4 rounded-lg transition-all duration-300 group ${isDark ? 'bg-gray-800 hover:bg-blue-600 text-gray-400 hover:text-white' : 'bg-gray-100 hover:bg-blue-500 text-gray-600 hover:text-white'} hover:shadow-lg hover:shadow-blue-500/20`}
                >
                  <Icon className="w-6 h-6 transition-transform group-hover:scale-110" />
                </a>
              )
            })}
          </div>
        </div>
      </section>
    </main>
  )
}