'use client'

import { FiSun, FiMoon } from 'react-icons/fi'
import { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'

export default function ThemeSwitch() {
    const [mounted, setMounted] = useState(false)
    const { setTheme, resolvedTheme } = useTheme()

    useEffect(() => setMounted(true), [])

    if (!mounted) return null

    const isDark = resolvedTheme === 'dark'

    return (
        <button
            aria-label="Toggle Theme"
            onClick={() => setTheme(isDark ? 'light' : 'dark')}
            className="group relative p-2.5 rounded-xl transition-all duration-300"
        >
            {/* Background */}
            <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-gray-100 to-gray-50 dark:from-gray-800 dark:to-gray-900 transition-all duration-300 group-hover:shadow-lg dark:group-hover:shadow-purple-900/20" />

            {/* Border Animation */}
            <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br from-blue-400/20 to-purple-400/20 dark:from-blue-500/20 dark:to-purple-500/20 pointer-events-none" />

            {/* Icon Container */}
            <div className="relative w-6 h-6 flex items-center justify-center">
                {/* Sun Icon */}
                <div
                    className={`absolute w-6 h-6 flex items-center justify-center transition-all duration-500 ${isDark
                            ? 'opacity-0 rotate-90 scale-0'
                            : 'opacity-100 rotate-0 scale-100'
                        }`}
                >
                    <FiSun className="w-5 h-5 text-amber-500 drop-shadow-sm" />
                </div>

                {/* Moon Icon */}
                <div
                    className={`absolute w-6 h-6 flex items-center justify-center transition-all duration-500 ${isDark
                            ? 'opacity-100 rotate-0 scale-100'
                            : 'opacity-0 -rotate-90 scale-0'
                        }`}
                >
                    <FiMoon className="w-5 h-5 text-indigo-400 drop-shadow-sm" />
                </div>
            </div>

            {/* Glow effect on hover */}
            <div className="absolute -inset-1 rounded-xl bg-gradient-to-br from-blue-400 to-purple-400 opacity-0 group-hover:opacity-20 dark:group-hover:opacity-30 transition-opacity duration-300 blur -z-10" />

            {/* Ripple effect */}
            <div className="absolute inset-0 rounded-xl opacity-0 group-active:opacity-100 transition-opacity duration-300 animate-ping bg-gradient-to-br from-blue-400 to-purple-400 pointer-events-none" />
        </button>
    )
}