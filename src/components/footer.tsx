'use client'

import Link from 'next/link'
import { useTheme } from 'next-themes'
import { FaArrowUp } from 'react-icons/fa'
import { useEffect, useState } from 'react'
import { socialLinks } from '@data/socialLinks'

const quickLinks = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Projects', href: '/projects' },
  { label: 'Contact', href: '/contact' },
]

const resources = [
  { label: 'GitHub', href: `https://github.com/${process.env.NEXT_PUBLIC_GITHUB_USERNAME}`, external: true },
  { label: 'Email', href: 'mailto:hello@pakkard.xyz', external: false },
  { label: 'Resume', href: '#', external: false },
]

export default function Footer() {
  const [mounted, setMounted] = useState(false)
  const { resolvedTheme } = useTheme()
  const isDark = resolvedTheme === 'dark'

  useEffect(() => setMounted(true), [])

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  if (!mounted) return null

  const linkClass = (base = '') =>
    `text-sm transition-all duration-300 inline-flex items-center gap-1 group ${base} ${
      isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'
    }`

  return (
    <footer className={`mt-auto transition-colors duration-300 border-t ${
      isDark ? 'bg-gray-950 border-gray-800' : 'bg-white border-gray-200'
    }`}>
      <div className="px-4 py-16 mx-auto max-w-7xl sm:px-6 lg:px-8">

        {/* Main grid */}
        <div className="grid grid-cols-1 gap-12 mb-12 md:grid-cols-4">

          {/* Brand */}
          <div className="flex flex-col">
            <Link href="/" className="inline-flex items-center gap-2 mb-4 group w-fit">
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300 group-hover:scale-110 ${
                isDark ? 'bg-linear-to-br from-blue-500 to-purple-600' : 'bg-linear-to-br from-blue-600 to-purple-700'
              }`}>
                <span className="text-sm font-bold text-white">J</span>
              </div>
              <span className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>Jeerapat</span>
            </Link>
            <p className={`text-sm leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              Building beautiful and performant web experiences with clean code and thoughtful design.
            </p>
          </div>

          {/* Pages */}
          <div>
            <h3 className={`text-sm font-semibold mb-4 ${isDark ? 'text-gray-200' : 'text-gray-900'}`}>Pages</h3>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className={linkClass()}>
                    <span className="text-xs transition-opacity opacity-0 group-hover:opacity-100">→</span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className={`text-sm font-semibold mb-4 ${isDark ? 'text-gray-200' : 'text-gray-900'}`}>Resources</h3>
            <ul className="space-y-2.5">
              {resources.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target={link.external ? '_blank' : undefined}
                    rel={link.external ? 'noopener noreferrer' : undefined}
                    className={linkClass()}
                  >
                    <span className="text-xs transition-opacity opacity-0 group-hover:opacity-100">→</span>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h3 className={`text-sm font-semibold mb-4 ${isDark ? 'text-gray-200' : 'text-gray-900'}`}>Connect</h3>
            <div className="flex gap-3 mb-6">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target={social.label !== 'Email' ? '_blank' : undefined}
                  rel={social.label !== 'Email' ? 'noopener noreferrer' : undefined}
                  aria-label={social.label}
                  className={`p-2.5 rounded-lg transition-all duration-300 hover:scale-110 hover:shadow-lg ${
                    isDark ? 'bg-gray-800 text-gray-400' : 'bg-gray-100 text-gray-600'
                  } ${social.color}`}
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
            <button
              onClick={scrollToTop}
              aria-label="Scroll to top"
              className={`w-full py-2 px-3 rounded-lg text-sm font-medium transition-all duration-300 flex items-center justify-center gap-2 group ${
                isDark ? 'bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-700 hover:text-gray-900'
              }`}
            >
              <span>Back to Top</span>
              <FaArrowUp className="w-4 h-4 transition-transform group-hover:-translate-y-0.5" />
            </button>
          </div>
        </div>

        {/* Divider */}
        <div className={`h-px mb-6 ${isDark ? 'bg-gray-800' : 'bg-gray-200'}`} />

        {/* Bottom */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()} Jeerapat. All rights reserved.
          </p>
          <div className="flex gap-6">
            {[{ label: 'Privacy', href: '#' }, { label: 'Terms', href: '#' }, { label: 'Sitemap', href: '#' }].map((link) => (
              <Link key={link.label} href={link.href}
                className={`text-xs transition-colors duration-300 ${
                  isDark ? 'text-gray-500 hover:text-gray-300' : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

      </div>
    </footer>
  )
}