'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'
import ThemeSwitch from './ThemeSwitch'

const NAV_ITEMS = [
  { name: 'Home', href: '/', icon: '🏠' },
  { name: 'About', href: '/about', icon: '👤' },
  { name: 'Projects', href: '/projects', icon: '💼' },
  { name: 'Contact', href: '/contact', icon: '📧' },
]

export default function Navbar() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [mounted, setMounted] = useState(false)
  const { resolvedTheme } = useTheme()

  const isDark = resolvedTheme === 'dark'

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  // Handle scroll event
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => setMounted(true), [])
  if (!mounted) return null

  return (
    <nav className={`sticky top-0 z-50 w-full transition-all duration-300 ${
      isScrolled
        ? `border-b ${isDark ? 'border-gray-800/50 bg-gray-950/70' : 'border-gray-200/50 bg-white/70'} shadow-md`
        : `border-b ${isDark ? 'border-gray-800/30 bg-gray-950/50' : 'border-gray-200/30 bg-white/50'}`
    } backdrop-blur-xl`}>
      
      <div className="flex items-center justify-between px-4 py-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        
        {/* Logo */}
        <NavLogo isDark={isDark} />

        {/* Desktop Navigation */}
        <DesktopNav pathname={pathname} isDark={isDark} />

        {/* Mobile Menu Button */}
        <MobileMenuButton isOpen={isOpen} setIsOpen={setIsOpen} isDark={isDark} />
      </div>

      {/* Mobile Menu */}
      {isOpen && <MobileMenu pathname={pathname} setIsOpen={setIsOpen} isDark={isDark} />}
    </nav>
  )
}

// Logo Component
function NavLogo({ isDark }: { isDark: boolean }) {
  return (
    <Link
      href="/"
      className={`relative flex items-center gap-2 group shrink-0 transition-opacity duration-300 hover:opacity-80`}
    >
      {/* Icon */}
      <div className={`relative flex items-center justify-center w-10 h-10 rounded-lg shadow-lg transition-all duration-300 ${
        isDark
          ? 'bg-linear-to-br from-blue-600 to-purple-700 group-hover:shadow-purple-700/40'
          : 'bg-linear-to-br from-blue-500 to-purple-600 group-hover:shadow-blue-500/40'
      } group-hover:shadow-xl`}>
        <span className="text-lg font-bold text-white">J</span>
        <div className={`absolute inset-0 rounded-lg opacity-0 group-hover:opacity-40 transition-opacity duration-300 blur-sm ${
          isDark
            ? 'bg-linear-to-br from-blue-500 to-purple-600'
            : 'bg-linear-to-br from-blue-400 to-purple-500'
        }`} />
      </div>

      {/* Text */}
      <div className="flex flex-col">
        <span className={`text-lg font-bold transition-colors duration-300 ${
          isDark ? 'text-white' : 'text-gray-900'
        }`}>
          Jeerapat
        </span>
        <span className="text-xs font-semibold text-blue-600 dark:text-blue-400">dev</span>
      </div>
    </Link>
  )
}

// Desktop Navigation
function DesktopNav({ pathname, isDark }: { pathname: string; isDark: boolean }) {
  return (
    <div className="items-center hidden gap-12 md:flex">
      <div className="flex gap-1">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href
          return (
            <NavLink key={item.href} item={item} isActive={isActive} isDark={isDark} />
          )
        })}
      </div>

      {/* Divider */}
      <div className={`w-px h-6 transition-colors duration-300 ${
        isDark ? 'bg-linear-to-b from-transparent via-gray-700 to-transparent' : 'bg-linear-to-b from-transparent via-gray-300 to-transparent'
      }`} />

      {/* Theme Toggle */}
      <ThemeSwitch />
    </div>
  )
}

// Nav Link Component
function NavLink({ 
  item, 
  isActive, 
  isDark 
}: { 
  item: typeof NAV_ITEMS[0]; 
  isActive: boolean; 
  isDark: boolean;
}) {
  return (
    <Link
      href={item.href}
      className="relative px-4 py-2 group"
    >
      {/* Text */}
      <span className={`inline-flex items-center gap-2 text-sm font-medium transition-colors duration-200 ${
        isActive
          ? isDark ? 'text-white' : 'text-black'
          : isDark 
            ? 'text-gray-400 group-hover:text-white'
            : 'text-gray-600 group-hover:text-black'
      }`}>
        <span className="text-base">{item.icon}</span>
        {item.name}
      </span>

      {/* Underline */}
      <div className={`absolute bottom-1 left-4 h-0.5 rounded-full transition-all duration-300 ${
        isActive
          ? 'w-[calc(100%-2rem)] bg-linear-to-r from-blue-500 via-purple-500 to-pink-500'
          : 'w-0 group-hover:w-[calc(100%-2rem)] origin-left bg-linear-to-r from-blue-500 via-purple-500 to-pink-500'
      }`} />

      {/* Background */}
      <div className={`absolute inset-0 rounded-lg -z-10 transition-opacity duration-300 ${
        isActive
          ? isDark
            ? 'bg-linear-to-r from-blue-600/10 to-purple-600/10 opacity-100'
            : 'bg-linear-to-r from-blue-500/10 to-purple-500/10 opacity-100'
          : 'opacity-0 group-hover:opacity-100'
      }`} />
    </Link>
  )
}

// Mobile Menu Button
function MobileMenuButton({ 
  isOpen, 
  setIsOpen, 
  isDark 
}: { 
  isOpen: boolean; 
  setIsOpen: (open: boolean) => void; 
  isDark: boolean;
}) {
  return (
    <div className="flex items-center gap-3 md:hidden">
      <ThemeSwitch />
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle menu"
        className={`p-2.5 rounded-lg transition-all duration-200 active:scale-95 ${
          isDark
            ? 'bg-linear-to-br from-gray-800 to-gray-900 hover:shadow-md'
            : 'bg-linear-to-br from-gray-100 to-gray-50 hover:shadow-md'
        }`}
      >
        {isOpen ? (
          <X className={`w-5 h-5 transition-colors duration-300 ${isDark ? 'text-gray-300' : 'text-gray-700'}`} />
        ) : (
          <Menu className={`w-5 h-5 transition-colors duration-300 ${isDark ? 'text-gray-300' : 'text-gray-700'}`} />
        )}
      </button>
    </div>
  )
}

// Mobile Menu
function MobileMenu({ 
  pathname, 
  setIsOpen, 
  isDark 
}: { 
  pathname: string; 
  setIsOpen: (open: boolean) => void; 
  isDark: boolean;
}) {
  return (
    <div className={`border-t md:hidden animate-in fade-in slide-in-from-top-2 duration-300 ${
      isDark
        ? 'border-gray-800/50 bg-gray-950/95'
        : 'border-gray-200/50 bg-white/95'
    } backdrop-blur-xl`}>
      <div className="flex flex-col gap-2 p-4">
        {NAV_ITEMS.map((item, index) => {
          const isActive = pathname === item.href
          return (
            <MobileNavLink
              key={item.href}
              item={item}
              isActive={isActive}
              isDark={isDark}
              index={index}
              onNavigate={() => setIsOpen(false)}
            />
          )
        })}
      </div>
    </div>
  )
}

// Mobile Nav Link Component
function MobileNavLink({
  item,
  isActive,
  isDark,
  index,
  onNavigate,
}: {
  item: typeof NAV_ITEMS[0];
  isActive: boolean;
  isDark: boolean;
  index: number;
  onNavigate: () => void;
}) {
  return (
    <Link
      href={item.href}
      onClick={onNavigate}
      style={{ animationDelay: `${index * 50}ms` }}
      className={`px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-3 animate-in fade-in slide-in-from-left-4 border-l-2 ${
        isActive
          ? `${isDark
              ? 'bg-linear-to-r from-blue-600/20 to-purple-600/20 text-white border-blue-500'
              : 'bg-linear-to-r from-blue-500/20 to-purple-500/20 text-black border-blue-500'
            } shadow-md`
          : `${isDark
              ? 'text-gray-400 hover:bg-gray-900/50 border-transparent'
              : 'text-gray-600 hover:bg-gray-100 border-transparent'
            }`
      }`}
    >
      <span className="text-lg">{item.icon}</span>
      <span>{item.name}</span>
      {isActive && <div className="w-2 h-2 ml-auto bg-blue-500 rounded-full animate-pulse" />}
    </Link>
  )
}