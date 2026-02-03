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
            className={`group relative p-2.5 rounded-xl transition-all duration-300`}
        >
            {/* Background */}
            <div className={`absolute inset-0 transition-all duration-300 rounded-xl ${isDark
                    ? 'bg-linear-to-br from-gray-800 to-gray-900 group-hover:shadow-lg group-hover:shadow-purple-900/20'
                    : 'bg-linear-to-br from-gray-100 to-gray-50 group-hover:shadow-lg group-hover:shadow-blue-500/20'
                }`} />

            {/* Border Animation */}
            <div className={`absolute inset-0 transition-opacity duration-300 opacity-0 pointer-events-none rounded-xl group-hover:opacity-100 ${isDark
                    ? 'bg-linear-to-br from-blue-500/20 to-purple-500/20'
                    : 'bg-linear-to-br from-blue-400/20 to-purple-400/20'
                }`} />

            {/* Icon Container */}
            <div className="relative flex items-center justify-center w-6 h-6">
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
                    <FiMoon className="w-5 h-5 text-blue-400 drop-shadow-sm" />
                </div>
            </div>

            {/* Glow effect on hover */}
            <div className={`absolute transition-opacity duration-300 opacity-0 -inset-1 rounded-xl blur -z-10 ${isDark
                    ? 'bg-linear-to-br from-blue-600 to-purple-600 group-hover:opacity-30'
                    : 'bg-linear-to-br from-blue-400 to-purple-400 group-hover:opacity-20'
                }`} />

            {/* Ripple effect */}
            <div className={`absolute inset-0 transition-opacity duration-300 opacity-0 pointer-events-none rounded-xl group-active:opacity-100 animate-ping ${isDark
                    ? 'bg-linear-to-br from-blue-600 to-purple-600'
                    : 'bg-linear-to-br from-blue-400 to-purple-400'
                }`} />
        </button>
    )
}