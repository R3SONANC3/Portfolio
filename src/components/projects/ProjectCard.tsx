import { ExternalLink, Github } from 'lucide-react'
import { Project } from '@data/projects'

interface ProjectCardProps {
    project: Project
    isDark: boolean
    index?: number
}

export default function ProjectCard({ project, isDark, index = 0 }: ProjectCardProps) {
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