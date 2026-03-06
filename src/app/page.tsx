'use client'

import Link from 'next/link'
import { useTheme } from 'next-themes'
import { useState, useEffect } from 'react'
import { ArrowRight } from 'lucide-react'
import { socialLinks } from '@data/socialLinks'
import CodeEditor from '@/components/CodeEditor'

export default function Home() {
  const [mounted, setMounted] = useState(false)
  const { resolvedTheme } = useTheme()
  const isDark = resolvedTheme === 'dark'

  useEffect(() => setMounted(true), [])
  if (!mounted) return null

  return (
    <div>
      {/* Hero Section */}
      <section className={`relative px-4 pt-32 pb-20 sm:px-6 lg:px-8 transition-colors duration-300 ${
        isDark ? 'bg-gray-950' : 'bg-white'
      }`}>

        {/* Background blobs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className={`absolute rounded-full -top-40 -right-40 w-80 h-80 blur-3xl transition-opacity duration-300 ${
            isDark ? 'bg-linear-to-br from-blue-900 to-purple-900 opacity-20'
                   : 'bg-linear-to-br from-blue-200 to-purple-200 opacity-20'
          }`} />
          <div className={`absolute rounded-full -bottom-40 -left-40 w-80 h-80 blur-3xl transition-opacity duration-300 ${
            isDark ? 'bg-linear-to-tr from-purple-900 to-pink-900 opacity-20'
                   : 'bg-linear-to-tr from-purple-200 to-pink-200 opacity-20'
          }`} />
        </div>

        {/* 2-column grid */}
        <div className="relative grid items-center max-w-6xl grid-cols-1 gap-12 mx-auto lg:grid-cols-2 lg:gap-16">

          {/* LEFT: Hero content */}
          <div className="duration-700 animate-in fade-in slide-in-from-bottom-4">
            <div className="mb-6">
              <span className={`inline-flex items-center px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 ${
                isDark ? 'bg-linear-to-r from-blue-900/40 to-purple-900/40 text-blue-300'
                       : 'bg-linear-to-r from-blue-100 to-purple-100 text-blue-700'
              }`}>
                <span className="w-2 h-2 mr-2 bg-blue-500 rounded-full animate-pulse" />
                Welcome to my portfolio
              </span>
            </div>

            <h1 className="mb-6 text-5xl font-bold leading-tight sm:text-6xl">
              <span className={`text-transparent bg-clip-text transition-all duration-300 ${
                isDark ? 'bg-linear-to-r from-white via-gray-200 to-gray-400'
                       : 'bg-linear-to-r from-gray-900 via-gray-800 to-gray-700'
              }`}>
                I'm Jeerapat
              </span>
              <br />
              <span className="text-transparent bg-linear-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text">
                Full Stack Developer
              </span>
            </h1>

            <p className={`max-w-lg mb-8 text-lg leading-relaxed transition-colors duration-300 ${
              isDark ? 'text-gray-400' : 'text-gray-600'
            }`}>
              I craft beautiful, performant web applications that solve real-world problems. Passionate about clean code, great design, and creating experiences that users love.
            </p>

            <div className="flex flex-wrap gap-4 mb-10">
              <Link
                href="/projects"
                className={`inline-flex items-center px-8 py-3 font-medium text-white transition-all duration-300 group rounded-xl active:scale-95 ${
                  isDark ? 'bg-linear-to-r from-blue-600 to-purple-700 hover:shadow-lg hover:shadow-blue-600/40'
                         : 'bg-linear-to-r from-blue-500 to-purple-600 hover:shadow-lg hover:shadow-blue-500/50'
                }`}
              >
                View My Work
                <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="/contact"
                className={`inline-flex items-center px-8 py-3 font-medium transition-all duration-300 border-2 rounded-xl ${
                  isDark ? 'border-gray-700 text-white hover:border-blue-500 hover:bg-blue-950/20'
                         : 'border-gray-300 text-gray-900 hover:border-blue-500 hover:bg-blue-50'
                }`}
              >
                Get in Touch
              </Link>
            </div>

            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target={social.label !== 'Email' ? '_blank' : undefined}
                  rel={social.label !== 'Email' ? 'noopener noreferrer' : undefined}
                  aria-label={social.label}
                  className={`p-3 transition-all duration-300 rounded-lg group ${
                    isDark ? 'bg-gray-800 text-gray-400 hover:text-white hover:shadow-lg hover:shadow-blue-600/20'
                           : 'bg-gray-100 text-gray-600 hover:text-white hover:shadow-lg hover:shadow-blue-500/20'
                  } hover:bg-blue-500 dark:hover:bg-blue-600 ${social.color}`}
                >
                  <social.icon className="w-5 h-5 transition-transform group-hover:scale-110" />
                </a>
              ))}
            </div>
          </div>

          {/* RIGHT: Code Editor */}
          <div className="duration-1000 delay-300 animate-in fade-in slide-in-from-right-8">
            <div className={`absolute -z-10 w-72 h-72 rounded-full blur-3xl opacity-20 pointer-events-none translate-x-8 translate-y-8 ${
              isDark ? 'bg-blue-900' : 'bg-blue-200'
            }`} />
            <CodeEditor />
          </div>

        </div>
      </section>

      {/* Features Section */}
      <section className={`px-4 py-20 sm:px-6 lg:px-8 transition-colors duration-300 ${
        isDark ? 'bg-gray-900/50' : 'bg-gray-50'
      } border-t ${isDark ? 'border-gray-800' : 'border-gray-200'}`}>
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {[
              { icon: '⚡', title: 'Fast & Performant', desc: 'Optimized applications that load in milliseconds' },
              { icon: '🎨', title: 'Beautiful Design', desc: 'Modern, responsive interfaces that delight users' },
              { icon: '🔧', title: 'Clean Code', desc: 'Maintainable, scalable solutions built with best practices' },
            ].map((feature, index) => (
              <div
                key={feature.title}
                className={`p-6 rounded-xl transition-all duration-300 ${
                  isDark ? 'bg-gray-800 border border-gray-700 hover:border-blue-500'
                         : 'bg-white border border-gray-200 hover:border-blue-400'
                } hover:shadow-lg animate-in fade-in slide-in-from-bottom-4`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="mb-3 text-3xl">{feature.icon}</div>
                <h3 className={`text-lg font-semibold mb-2 transition-colors duration-300 ${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}>{feature.title}</h3>
                <p className={`text-sm transition-colors duration-300 ${
                  isDark ? 'text-gray-400' : 'text-gray-600'
                }`}>{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}