import { ExternalLink, Github, Star } from 'lucide-react'
import { Project } from '@data/projects'

interface FeaturedProjectCardProps {
    project: Project
    isDark: boolean
    index?: number
}

export default function FeaturedProjectCard({ project, isDark, index = 0 }: FeaturedProjectCardProps) {
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