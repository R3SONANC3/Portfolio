'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ArrowRight, Github, Linkedin, Mail, ExternalLink, Code2, Zap, Users, Target } from 'lucide-react'
import { skills } from '@/data/skills'
import { experience } from '@/data/experience'
import { values } from '@/data/values'

export default function About() {
    const [isScrolled, setIsScrolled] = useState(false)
    const [activeTab, setActiveTab] = useState('frontend')

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return (
        <main className="min-h-screen overflow-hidden">
            {/* Values Section */}
            <section className="py-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-5xl mx-auto">
                    <h2 className="text-4xl font-bold text-center mb-12 text-gray-900 dark:text-white">
                        What I Value
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {values.map((value, index) => (
                            <div
                                key={value.title}
                                className="group p-6 rounded-xl bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-900 border border-blue-200 dark:border-gray-700 hover:border-blue-400 dark:hover:border-blue-400 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10 animate-in fade-in slide-in-from-bottom-4 duration-700"
                                style={{ animationDelay: `${index * 100}ms` }}
                            >
                                <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-to-br from-blue-400 to-purple-500 text-white mb-4 group-hover:scale-110 transition-transform duration-300">
                                    <value.icon className="w-6 h-6" />
                                </div>
                                <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
                                    {value.title}
                                </h3>
                                <p className="text-gray-600 dark:text-gray-400">
                                    {value.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Experience Section */}
            <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900/50">
                <div className="max-w-5xl mx-auto">
                    <h2 className="text-4xl font-bold mb-12 text-gray-900 dark:text-white">
                        Experience
                    </h2>

                    <div className="space-y-6">
                        {experience.map((job, index) => (
                            <div
                                key={job.company}
                                className="p-6 rounded-xl border-2 border-gray-200 dark:border-gray-800 hover:border-blue-400 dark:hover:border-blue-400 bg-white dark:bg-gray-800/50 transition-all duration-300 hover:shadow-lg animate-in fade-in slide-in-from-left-4 duration-700"
                                style={{ animationDelay: `${index * 100}ms` }}
                            >
                                <div className="flex items-start justify-between mb-4">
                                    <div>
                                        <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                                            {job.title}
                                        </h3>
                                        <p className="text-blue-600 dark:text-blue-400 font-medium">
                                            {job.company}
                                        </p>
                                    </div>
                                    <span className="text-sm text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full">
                                        {job.duration}
                                    </span>
                                </div>

                                <p className="text-gray-600 dark:text-gray-400 mb-4">
                                    {job.description}
                                </p>

                                <div className="flex flex-wrap gap-2">
                                    {job.highlights.map((highlight) => (
                                        <span
                                            key={highlight}
                                            className="text-xs font-medium px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300"
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
            <section className="py-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-5xl mx-auto">
                    <h2 className="text-4xl font-bold mb-12 text-gray-900 dark:text-white">
                        Skills & Technologies
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {skills.map((skillGroup, groupIndex) => (
                            <div
                                key={skillGroup.category}
                                className="animate-in fade-in slide-in-from-bottom-4 duration-700"
                                style={{ animationDelay: `${groupIndex * 100}ms` }}
                            >
                                <h3 className="text-lg font-bold mb-4 text-gray-900 dark:text-white">
                                    {skillGroup.category}
                                </h3>

                                <div className="space-y-3">
                                    {skillGroup.items.map((skill, skillIndex) => (
                                        <div
                                            key={skill}
                                            className="group relative p-3 rounded-lg bg-gradient-to-r from-gray-100 to-gray-50 dark:from-gray-800 dark:to-gray-900 border border-gray-200 dark:border-gray-700 hover:border-blue-400 dark:hover:border-blue-400 transition-all duration-300 hover:shadow-md cursor-default"
                                            style={{ animationDelay: `${(groupIndex * 100) + (skillIndex * 50)}ms` }}
                                        >
                                            <div className="flex items-center justify-between">
                                                <span className="font-medium text-gray-900 dark:text-white">
                                                    {skill}
                                                </span>
                                                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-500 to-purple-600 text-white relative overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0" style={{
                        backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 1px)',
                        backgroundSize: '50px 50px'
                    }} />
                </div>

                <div className="relative max-w-4xl mx-auto text-center">
                    <h2 className="text-4xl sm:text-5xl font-bold mb-6">
                        Let's Create Something Amazing
                    </h2>
                    <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
                        I'm always interested in hearing about new projects and opportunities.
                    </p>

                    <Link
                        href="/contact"
                        className="inline-flex items-center px-8 py-4 rounded-xl bg-white text-blue-600 font-bold transition-all duration-300 hover:shadow-2xl hover:shadow-white/25 active:scale-95 group"
                    >
                        Get in Touch
                        <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
                    </Link>
                </div>
            </section>
        </main>
    )
}