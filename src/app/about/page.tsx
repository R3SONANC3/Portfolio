'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useTheme } from 'next-themes'
import { ArrowRight } from 'lucide-react'
import { experience } from '@/data/experience'
import profile from '@assets/images/profile.jpg'
import { SkillsSection } from '@/components/SkillsSection'

export default function About() {
    const [mounted, setMounted] = useState(false)
    const { resolvedTheme } = useTheme()
    const isDark = resolvedTheme === 'dark'

    useEffect(() => setMounted(true), [])

    if (!mounted) return null

    return (
        <main className={`min-h-screen transition-colors duration-300 ${isDark ? 'bg-gray-950' : 'bg-white'
            }`}>
            {/* Hero Section with Image */}
            <section className={`relative px-4 pt-32 pb-20 sm:px-6 lg:px-8 transition-colors duration-300 ${isDark ? 'bg-gray-950' : 'bg-linear-to-br from-white to-gray-50'
                }`}>
                {/* Background Elements */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className={`absolute rounded-full -top-40 -right-40 w-80 h-80 blur-3xl ${isDark
                        ? 'bg-linear-to-br from-blue-900 to-purple-900 opacity-20'
                        : 'bg-linear-to-br from-blue-200 to-purple-200 opacity-20'
                        }`} />
                    <div className={`absolute rounded-full -bottom-40 -left-40 w-80 h-80 blur-3xl ${isDark
                        ? 'bg-linear-to-tr from-purple-900 to-pink-900 opacity-20'
                        : 'bg-linear-to-tr from-purple-200 to-pink-200 opacity-20'
                        }`} />
                </div>

                <div className="relative max-w-6xl mx-auto">
                    <div className="grid items-center grid-cols-1 gap-12 lg:grid-cols-2">
                        {/* Left: Image */}
                        <div className="order-2 duration-700 animate-in fade-in slide-in-from-left-4 lg:order-1">
                            <div className="relative">
                                {/* Glow background */}
                                <div className={`absolute inset-0 rounded-2xl blur-2xl opacity-20 ${isDark
                                    ? 'bg-linear-to-br from-blue-600 to-purple-600'
                                    : 'bg-linear-to-br from-blue-400 to-purple-500'
                                    }`} />

                                {/* Image Container */}
                                <div className={`relative rounded-2xl overflow-hidden border-2 transition-colors duration-300 ${isDark
                                    ? 'border-gray-800'
                                    : 'border-gray-200'
                                    }`}>
                                    <div className={`relative w-full h-96 sm:h-125 ${isDark
                                        ? 'bg-linear-to-br from-gray-800 to-gray-900'
                                        : 'bg-linear-to-br from-gray-100 to-gray-200'
                                        } flex items-center justify-center`}>
                                        {/* Replace with actual image */}
                                        <div className="text-6xl">👨‍💻</div>
                                        <Image
                                            src={profile}
                                            alt="Profile Picture"
                                            fill
                                            className="object-cover"
                                            priority
                                        />

                                    </div>
                                </div>

                                {/* Status Badge */}
                                <div className={`absolute bottom-6 left-6 px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2 transition-colors duration-300 ${isDark
                                    ? 'bg-gray-800 text-green-300 border border-gray-700'
                                    : 'bg-white text-green-600 border border-gray-200'
                                    }`}>
                                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                                    Open to opportunities
                                </div>
                            </div>
                        </div>

                        {/* Right: Content */}
                        <div className="order-1 duration-700 animate-in fade-in slide-in-from-right-4 lg:order-2">
                            <h1 className="mb-6 text-5xl font-bold leading-tight sm:text-6xl">
                                <span className={`text-transparent bg-clip-text ${isDark
                                    ? 'bg-linear-to-r from-white via-gray-200 to-gray-400'
                                    : 'bg-linear-to-r from-gray-900 via-gray-800 to-gray-700'
                                    }`}>
                                    About Me
                                </span>
                            </h1>

                            <div
                                className={`space-y-6 mb-8 max-w-2xl text-lg leading-8 tracking-wide ${isDark ? 'text-gray-400' : 'text-gray-600'
                                    }`}
                            >
                                <p>
                                    I'm a <span className="font-semibold text-blue-500">Computer Engineering graduate</span> and
                                    aspiring <span className="font-semibold text-blue-500">Full Stack Developer</span> with
                                    hands-on experience from internships, freelance work, and personal projects. I enjoy building
                                    modern web applications and solving real-world problems through technology.
                                </p>

                                <p>
                                    My experience includes working with <span className="font-medium">React</span>,
                                    <span className="font-medium"> Next.js</span>,
                                    <span className="font-medium"> NestJS</span>,
                                    <span className="font-medium"> TypeScript</span>,
                                    <span className="font-medium"> Python</span>,
                                    <span className="font-medium"> MySQL</span>, and
                                    <span className="font-medium"> Docker</span>, as well as contributing to ERP system
                                    customization using <span className="font-medium">ERPNext</span> and
                                    <span className="font-medium"> Frappe Framework</span>.
                                </p>

                                <p>
                                    This portfolio was created as an experiment in
                                    <span className="font-semibold text-purple-500"> AI powered vibe coding</span>, showcasing my
                                    projects, skills, and learning journey while exploring how AI can accelerate software
                                    development.
                                </p>
                            </div>

                            {/* Stats */}
                            <div className="grid grid-cols-2 gap-4 mb-8">
                                {[
                                    { label: 'Internship Experience', value: '3M+' },
                                    { label: 'Personal Projects', value: '5+' },
                                    { label: 'Hackathon Awards', value: '1' },
                                    { label: 'Technologies', value: '15+' },
                                ].map((stat) => (
                                    <div
                                        key={stat.label}
                                        className={`p-4 rounded-lg transition-colors duration-300 ${isDark
                                            ? 'bg-gray-800 border border-gray-700'
                                            : 'bg-linear-to-br from-blue-50 to-purple-50 border border-blue-200'
                                            }`}
                                    >
                                        <div
                                            className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-blue-600'
                                                }`}
                                        >
                                            {stat.value}
                                        </div>
                                        <div
                                            className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'
                                                }`}
                                        >
                                            {stat.label}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* CTA Button */}
                            <Link
                                href="/contact"
                                className={`inline-flex items-center gap-2 px-8 py-3 rounded-xl font-medium transition-all duration-300 group ${isDark
                                    ? 'bg-linear-to-r from-blue-600 to-purple-700 text-white hover:shadow-lg hover:shadow-blue-600/40'
                                    : 'bg-linear-to-r from-blue-500 to-purple-600 text-white hover:shadow-lg hover:shadow-blue-500/50'
                                    } active:scale-95`}
                            >
                                Get in Touch
                                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Experience Section */}
            <section className={`px-4 py-20 sm:px-6 lg:px-8 transition-colors duration-300 ${isDark ? 'bg-gray-900/50' : 'bg-gray-50'
                }`}>
                <div className="max-w-5xl mx-auto">
                    <h2 className={`mb-12 text-4xl font-bold ${isDark ? 'text-white' : 'text-gray-900'
                        }`}>
                        Experience
                    </h2>

                    <div className="space-y-6">
                        {experience.map((job, index) => (
                            <div
                                key={job.id}
                                className={`p-6 rounded-xl border-2 transition-all duration-300 animate-in fade-in slide-in-from-left-4 ${isDark
                                    ? 'bg-gray-800/50 border-gray-700 hover:border-blue-500'
                                    : 'bg-white border-gray-200 hover:border-blue-400'
                                    } hover:shadow-lg`}
                                style={{ animationDelay: `${index * 100}ms` }}
                            >
                                <div className="flex items-start justify-between mb-4">
                                    <div>
                                        <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'
                                            }`}>
                                            {job.title}
                                        </h3>
                                        <p className="font-medium text-blue-600 dark:text-blue-400">
                                            {job.company}
                                        </p>
                                    </div>
                                    <span className={`px-3 py-1 text-sm rounded-full ${isDark
                                        ? 'bg-gray-700 text-gray-300'
                                        : 'bg-gray-100 text-gray-600'
                                        }`}>
                                        {job.duration}
                                    </span>
                                </div>

                                <p className={`mb-4 ${isDark ? 'text-gray-400' : 'text-gray-600'
                                    }`}>
                                    {job.description}
                                </p>

                                <div className="flex flex-wrap gap-2">
                                    {job.highlights.map((highlight) => (
                                        <span
                                            key={highlight}
                                            className={`text-xs font-medium px-3 py-1 rounded-full transition-colors duration-300 ${isDark
                                                ? 'bg-blue-900/30 text-blue-300'
                                                : 'bg-blue-100 text-blue-700'
                                                }`}
                                        >
                                            {highlight}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Skills Section */}
            <SkillsSection isDark={isDark} />

            {/* CTA Section */}
            <section className={`relative px-4 py-20 sm:px-6 lg:px-8 overflow-hidden text-white ${isDark
                ? 'bg-linear-to-br from-blue-600 to-purple-700'
                : 'bg-linear-to-br from-blue-500 to-purple-600'
                }`}>
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0" style={{
                        backgroundImage: 'radial-linear(circle at 1px 1px, white 1px, transparent 1px)',
                        backgroundSize: '50px 50px'
                    }} />
                </div>

                <div className="relative max-w-4xl mx-auto text-center">
                    <h2 className="mb-6 text-4xl font-bold sm:text-5xl">
                        Let's Create Something Amazing
                    </h2>
                    <p className="max-w-2xl mx-auto mb-8 text-lg opacity-90">
                        I'm always interested in hearing about new projects and opportunities.
                    </p>

                    <Link
                        href="/contact"
                        className="inline-flex items-center px-8 py-4 font-bold text-blue-600 transition-all duration-300 bg-white rounded-xl hover:shadow-2xl hover:shadow-white/25 active:scale-95 group"
                    >
                        Get in Touch
                        <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
                    </Link>
                </div>
            </section>
        </main>
    )
}