'use client'

import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
import Link from 'next/link'
import { ExternalLink, Github, Star } from 'lucide-react'
import { projects, Project } from '@data/projects'

const categories = ['All', 'Frontend', 'Full Stack', 'Backend']

export default function Projects() {
    const { resolvedTheme } = useTheme()
    const isDark = resolvedTheme === 'dark'
    const [mounted, setMounted] = useState(false)
    const [selectedCategory, setSelectedCategory] = useState('All')

    useEffect(() => {
        setMounted(true)
    }, [])

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
                    <div className={`absolute rounded-full -top-40 -right-40 w-80 h-80 blur-3xl ${mounted && isDark
                        ? 'bg-linear-to-br from-blue-900 to-purple-900 opacity-20'
                        : 'bg-linear-to-br from-blue-200 to-purple-200 opacity-20'
                        }`} />
                    <div className={`absolute rounded-full -bottom-40 -left-40 w-80 h-80 blur-3xl ${mounted && isDark
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

// Featured Project Card Component
function FeaturedProjectCard({ project, isDark, index }: { project: Project; isDark: boolean; index: number }) {
    return (
        <div
            className={`group p-8 rounded-xl border transition-all duration-300 animate-in fade-in slide-in-from-bottom-4 ${isDark
                ? 'bg-gray-800 border-gray-700 hover:border-blue-500 hover:bg-gray-750'
                : 'bg-white border-gray-200 hover:border-blue-400 hover:bg-blue-50'
                } hover:shadow-lg`}
            style={{ animationDelay: `${index * 100}ms` }}
        >
            <div className="grid items-start grid-cols-1 gap-8 md:grid-cols-3">
                {/* Image */}
                <div className={`col-span-1 flex items-center justify-center h-48 rounded-lg text-6xl transition-all duration-300 ${isDark
                    ? 'bg-linear-to-br from-blue-900/20 to-purple-900/20'
                    : 'bg-linear-to-br from-blue-100/50 to-purple-100/50'
                    } group-hover:scale-105`}>
                    {project.image}
                </div>

                {/* Content */}
                <div className="flex flex-col col-span-1 md:col-span-2">
                    <div className="flex items-start justify-between mb-4">
                        <h3 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'
                            }`}>
                            {project.title}
                        </h3>
                        <Star className={`w-6 h-6 ${isDark ? 'text-yellow-400' : 'text-amber-500'}`} fill="currentColor" />
                    </div>

                    <p className={`mb-6 leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-600'
                        }`}>
                        {project.description}
                    </p>

                    {/* Stats */}
                    {project.stats && (
                        <div className="grid grid-cols-3 gap-4 mb-6">
                            {project.stats.map((stat) => (
                                <div key={stat.label}>
                                    <div className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'
                                        }`}>
                                        {stat.value}
                                    </div>
                                    <div className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'
                                        }`}>
                                        {stat.label}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-6">
                        {project.tags.map((tag) => (
                            <span
                                key={tag}
                                className={`text-xs font-medium px-3 py-1 rounded-full transition-colors duration-300 ${isDark
                                    ? 'bg-blue-900/30 text-blue-300'
                                    : 'bg-blue-100 text-blue-700'
                                    }`}
                            >
                                {tag}
                            </span>
                        ))}
                    </div>

                    {/* Links */}
                    <div className="flex gap-3">
                        {project.github && (
                            <a
                                href={project.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 ${isDark
                                    ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    }`}
                            >
                                <Github className="w-4 h-4" />
                                Code
                            </a>
                        )}
                        {project.live && (
                            <a
                                href={project.live}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 ${isDark
                                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                                    : 'bg-blue-500 text-white hover:bg-blue-600'
                                    }`}
                            >
                                <ExternalLink className="w-4 h-4" />
                                Live
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

// Regular Project Card Component
function ProjectCard({ project, isDark, index }: { project: Project; isDark: boolean; index: number }) {
    return (
        <div
            className={`group p-6 rounded-xl border transition-all duration-300 animate-in fade-in slide-in-from-bottom-4 h-full flex flex-col ${isDark
                ? 'bg-gray-800 border-gray-700 hover:border-blue-500'
                : 'bg-white border-gray-200 hover:border-blue-400'
                } hover:shadow-lg`}
            style={{ animationDelay: `${index * 100}ms` }}
        >
            {/* Image */}
            <div className={`flex items-center justify-center h-40 rounded-lg text-5xl mb-4 transition-all duration-300 ${isDark
                ? 'bg-linear-to-br from-blue-900/20 to-purple-900/20'
                : 'bg-linear-to-br from-blue-100/50 to-purple-100/50'
                } group-hover:scale-105`}>
                {project.image}
            </div>

            {/* Content */}
            <h3 className={`text-xl font-bold mb-3 ${isDark ? 'text-white' : 'text-gray-900'
                }`}>
                {project.title}
            </h3>

            <p className={`mb-4 leading-relaxed grow ${isDark ? 'text-gray-400' : 'text-gray-600'
                }`}>
                {project.description}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-4">
                {project.tags.slice(0, 3).map((tag) => (
                    <span
                        key={tag}
                        className={`text-xs font-medium px-2 py-1 rounded-full ${isDark
                            ? 'bg-blue-900/30 text-blue-300'
                            : 'bg-blue-100 text-blue-700'
                            }`}
                    >
                        {tag}
                    </span>
                ))}
                {project.tags.length > 3 && (
                    <span className={`text-xs font-medium px-2 py-1 rounded-full ${isDark
                        ? 'bg-gray-700 text-gray-400'
                        : 'bg-gray-200 text-gray-600'
                        }`}>
                        +{project.tags.length - 3}
                    </span>
                )}
            </div>

            {/* Links */}
            <div className="flex gap-2">
                {project.github && (
                    <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`inline-flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${isDark
                            ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                    >
                        <Github className="w-4 h-4" />
                        Code
                    </a>
                )}
                {project.live && (
                    <a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`inline-flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${isDark
                            ? 'bg-blue-600 text-white hover:bg-blue-700'
                            : 'bg-blue-500 text-white hover:bg-blue-600'
                            }`}
                    >
                        <ExternalLink className="w-4 h-4" />
                        Live
                    </a>
                )}
            </div>
        </div>
    )
}