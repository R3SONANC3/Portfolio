'use client'

import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
import Link from 'next/link'
import { projects } from '@data/projects'
import FeaturedProjectCard from '@/components/projects/FeaturedProjectCard'
import ProjectCard from '@/components/projects/ProjectCard'

const categories = ['All', 'Full Stack', 'Frontend', 'Backend']

export default function Projects() {
    const { resolvedTheme } = useTheme()
    const [mounted, setMounted] = useState(false)
    const [selectedCategory, setSelectedCategory] = useState('All')

    useEffect(() => {
        setMounted(true)
    }, [])

    const isDark = mounted && resolvedTheme === 'dark'

    if (!mounted) return null

    const filteredProjects = selectedCategory === 'All'
        ? projects
        : projects.filter(p => p.category === selectedCategory)

    const featuredProjects = filteredProjects.filter(p => p.featured)
    const regularProjects = filteredProjects.filter(p => !p.featured)

    return (
        <main className={`min-h-screen transition-colors duration-300 ${isDark ? 'bg-gray-950' : 'bg-white'
            }`}>
            {/* Hero Section */}
            <section className={`relative px-4 pt-32 pb-16 sm:px-6 lg:px-8 ${isDark ? 'bg-gray-950' : 'bg-linear-to-br from-white to-gray-50'
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

                <div className="relative max-w-5xl mx-auto">
                    <div className="duration-700 animate-in fade-in slide-in-from-bottom-4">
                        {/* Badge */}
                        <div className="mb-6">
                            <span className={`inline-flex items-center px-4 py-2 text-sm font-medium rounded-full ${isDark
                                ? 'bg-linear-to-r from-blue-900/40 to-purple-900/40 text-blue-300'
                                : 'bg-linear-to-r from-blue-100 to-purple-100 text-blue-700'
                                }`}>
                                <span className="w-2 h-2 mr-2 bg-blue-500 rounded-full animate-pulse" />
                                Portfolio & Case Studies
                            </span>
                        </div>

                        {/* Heading */}
                        <h1 className="mb-6 text-5xl font-bold leading-tight sm:text-6xl lg:text-7xl">
                            <span className={`text-transparent bg-clip-text ${isDark
                                ? 'bg-linear-to-r from-white via-gray-200 to-gray-400'
                                : 'bg-linear-to-r from-gray-900 via-gray-800 to-gray-700'
                                }`}>
                                My Projects
                            </span>
                        </h1>

                        {/* Description */}
                        <p className={`max-w-2xl mb-8 text-lg leading-relaxed sm:text-xl ${isDark ? 'text-gray-400' : 'text-gray-600'
                            }`}>
                            A collection of my best work showcasing expertise in web development, design, and problem-solving. Each project represents innovation and quality.
                        </p>
                    </div>
                </div>
            </section>

            {/* Filter Section */}
            <section className={`px-4 py-12 sm:px-6 lg:px-8 border-b ${isDark
                ? 'border-gray-800 bg-gray-900/50'
                : 'border-gray-200 bg-gray-50'
                }`}>
                <div className="max-w-5xl mx-auto">
                    <div className="flex flex-wrap justify-center gap-3">
                        {categories.map((category, index) => (
                            <button
                                key={category}
                                onClick={() => setSelectedCategory(category)}
                                className={`px-6 py-2 rounded-lg font-medium transition-all duration-300 animate-in fade-in slide-in-from-bottom-4 ${selectedCategory === category
                                    ? isDark
                                        ? 'bg-linear-to-r from-blue-600 to-purple-700 text-white shadow-lg shadow-blue-600/40'
                                        : 'bg-linear-to-r from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-500/50'
                                    : isDark
                                        ? 'bg-gray-800 text-gray-300 hover:bg-gray-700 border border-gray-700'
                                        : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                                    } active:scale-95`}
                                style={{ animationDelay: `${index * 50}ms` }}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Featured Projects */}
            {featuredProjects.length > 0 && (
                <section className={`px-4 py-20 sm:px-6 lg:px-8 transition-colors duration-300 ${isDark ? 'bg-gray-900/50' : 'bg-gray-50'
                    }`}>
                    <div className="max-w-5xl mx-auto">
                        <h2 className={`text-3xl font-bold mb-12 text-center ${isDark ? 'text-white' : 'text-gray-900'
                            }`}>
                            ⭐ Featured Work
                        </h2>

                        <div className="space-y-8">
                            {featuredProjects.map((project, index) => (
                                <FeaturedProjectCard
                                    key={project.id}
                                    project={project}
                                    isDark={isDark}
                                    index={index}
                                />
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Regular Projects Grid */}
            <section className={`px-4 py-20 sm:px-6 lg:px-8 transition-colors duration-300 ${isDark ? 'bg-gray-950' : 'bg-white'
                }`}>
                <div className="max-w-5xl mx-auto">
                    {featuredProjects.length > 0 && (
                        <h2 className={`text-3xl font-bold mb-12 text-center ${isDark ? 'text-white' : 'text-gray-900'
                            }`}>
                            More Projects
                        </h2>
                    )}

                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                        {regularProjects.map((project, index) => (
                            <ProjectCard
                                key={project.id}
                                project={project}
                                isDark={isDark}
                                index={index}
                            />
                        ))}
                    </div>

                    {filteredProjects.length === 0 && (
                        <div className="py-12 text-center">
                            <p className={`text-lg ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                                No projects found in this category.
                            </p>
                        </div>
                    )}
                </div>
            </section>

            {/* CTA Section */}
            <section className={`px-4 py-20 sm:px-6 lg:px-8 border-t ${isDark
                ? 'border-gray-800 bg-gray-900/50'
                : 'border-gray-200 bg-gray-50'
                }`}>
                <div className="max-w-3xl mx-auto text-center">
                    <h2 className={`text-3xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'
                        }`}>
                        Interested in working together?
                    </h2>
                    <p className={`text-lg mb-8 ${isDark ? 'text-gray-400' : 'text-gray-600'
                        }`}>
                        Let's discuss your next project and bring your ideas to life.
                    </p>
                    <Link
                        href="/contact"
                        className={`inline-flex items-center px-8 py-3 rounded-xl font-medium transition-all duration-300 ${isDark
                            ? 'bg-linear-to-r from-blue-600 to-purple-700 text-white hover:shadow-lg hover:shadow-blue-600/40'
                            : 'bg-linear-to-r from-blue-500 to-purple-600 text-white hover:shadow-lg hover:shadow-blue-500/50'
                            } active:scale-95`}
                    >
                        Start a Project
                    </Link>
                </div>
            </section>
        </main>
    )
}