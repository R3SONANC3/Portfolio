'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'
import ThemeSwitch from './ThemeSwitch'

const navItems = [
  { name: 'Home', href: '/', icon: '🏠' },
  { name: 'About', href: '/about', icon: '👤' },
  { name: 'Projects', href: '/projects', icon: '💼' },
  { name: 'Contact', href: '/contact', icon: '📧' },
]

export default function Navbar() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  return (
    <nav className={`sticky top-0 z-50 w-full transition-all duration-300 ${
      isScrolled
        ? 'border-b border-gray-200/50 bg-white/70 dark:border-gray-800/50 dark:bg-gray-950/70 shadow-md'
        : 'border-b border-gray-200/30 bg-white/50 dark:border-gray-800/30 dark:bg-gray-950/50'
    } backdrop-blur-xl`}>
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8 py-4">
        
        {/* Logo Section */}
        <Link 
          href="/" 
          className="group relative flex-shrink-0 flex items-center gap-2"
        >
          {/* Logo Icon */}
          <div className="relative w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow duration-300">
            <span className="text-white font-bold text-lg">J</span>
            <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-blue-400 to-purple-500 opacity-0 group-hover:opacity-50 transition-opacity duration-300 blur-sm" />
          </div>
          
          {/* Logo Text */}
          <div className="flex flex-col">
            <span className="text-lg font-bold bg-gradient-to-r from-black via-gray-800 to-gray-600 bg-clip-text text-transparent transition-all duration-300 group-hover:from-gray-800 group-hover:via-black group-hover:to-gray-700 dark:from-white dark:via-gray-200 dark:to-gray-400 dark:group-hover:from-gray-200 dark:group-hover:via-white dark:group-hover:to-gray-300">
              Jeerapat
            </span>
            <span className="text-xs font-semibold text-blue-600 dark:text-blue-400">dev</span>
          </div>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-12">
          <div className="flex gap-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="group relative px-4 py-2"
                >
                  <span
                    className={`text-sm font-medium transition-colors duration-200 inline-flex items-center gap-2 ${
                      isActive
                        ? 'text-black dark:text-white'
                        : 'text-gray-600 group-hover:text-black dark:text-gray-400 dark:group-hover:text-white'
                    }`}
                  >
                    <span className="text-base">{item.icon}</span>
                    {item.name}
                  </span>
                  
                  {/* Animated Underline */}
                  <div
                    className={`absolute bottom-1 left-4 h-0.5 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 transition-all duration-300 ${
                      isActive
                        ? 'w-[calc(100%-2rem)]'
                        : 'w-0 group-hover:w-[calc(100%-2rem)] origin-left'
                    }`}
                  />
                  
                  {/* Background Highlight */}
                  <div
                    className={`absolute inset-0 rounded-lg bg-gradient-to-r from-blue-500/10 to-purple-500/10 -z-10 transition-opacity duration-300 ${
                      isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                    }`}
                  />
                </Link>
              )
            })}
          </div>

          {/* Divider */}
          <div className="h-6 w-px bg-gradient-to-b from-transparent via-gray-300 to-transparent dark:via-gray-700" />

          {/* Theme Toggle */}
          <ThemeSwitch />
        </div>  

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center gap-3">
          <ThemeSwitch />

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2.5 rounded-lg bg-gradient-to-br from-gray-100 to-gray-50 dark:from-gray-800 dark:to-gray-900 hover:shadow-md transition-all duration-200 active:scale-95"
            aria-label="Toggle menu"
          >
            {isOpen ? (
              <X className="w-5 h-5 text-gray-700 dark:text-gray-300" />
            ) : (
              <Menu className="w-5 h-5 text-gray-700 dark:text-gray-300" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu - Enhanced */}
      {isOpen && (
        <div className="md:hidden animate-in fade-in slide-in-from-top-2 duration-300 border-t border-gray-200/50 dark:border-gray-800/50 bg-white/95 dark:bg-gray-950/95 backdrop-blur-xl">
          <div className="flex flex-col gap-2 p-4">
            {navItems.map((item, index) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  style={{ animationDelay: `${index * 50}ms` }}
                  className={`px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-3 animate-in fade-in slide-in-from-left-4 ${
                    isActive
                      ? 'bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-black dark:text-white border-l-2 border-blue-500 shadow-md'
                      : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-900/50 border-l-2 border-transparent'
                  }`}
                >
                  <span className="text-lg">{item.icon}</span>
                  <span>{item.name}</span>
                  {isActive && (
                    <div className="ml-auto w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                  )}
                </Link>
              )
            })}
          </div>
        </div>
      )}
    </nav>
  )
}