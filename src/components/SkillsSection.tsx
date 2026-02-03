import React from "react";
import { Skills } from "@/data/skill";

const SKILL_IMAGES: Record<string, string> = {
    React: "/frontend/vite.png",
    "Next.js": "/frontend/nextjs.png",
    TypeScript: "/frontend/typescript.svg",
    "Tailwind CSS": "/frontend/tailwind.png",
    "Node.js": "/backend/nodejs.png",
    Express: "/backend/express.png",
    MySQL: "/backend/mysql.png",
    Git: "/tools/git.png",
    Docker: "/tools/docker.png",
    AWS: "/tools/aws.png",
    Postman: "/tools/postman.png",
};

const CATEGORY_ICONS: Record<string, string> = {
    Frontend: "/frontend/frontend.png",
    Backend: "/backend/backend.png",
    Tools: "/tools/tools.png",
};

const DEFAULT_COLORS = {
    light: "from-gray-400 to-gray-600",
    dark: "from-gray-500 to-gray-700",
};



const SKILL_COLORS: Record<
    string,
    { light: string; dark: string }
> = {
    React: { light: "from-cyan-400 to-blue-500", dark: "from-cyan-500 to-blue-600" },
    "Next.js": { light: "from-gray-600 to-gray-900", dark: "from-gray-500 to-gray-800" },
    TypeScript: { light: "from-blue-500 to-blue-700", dark: "from-blue-600 to-blue-800" },
    "Tailwind CSS": { light: "from-cyan-400 to-cyan-600", dark: "from-cyan-500 to-cyan-700" },
    "Node.js": { light: "from-green-400 to-green-600", dark: "from-green-500 to-green-700" },
    Express: { light: "from-gray-700 to-gray-900", dark: "from-gray-600 to-gray-800" },
    MySQL: { light: "from-orange-400 to-red-500", dark: "from-orange-500 to-red-600" },
    Git: { light: "from-orange-500 to-red-600", dark: "from-orange-600 to-red-700" },
    Docker: { light: "from-blue-400 to-blue-600", dark: "from-blue-500 to-blue-700" },
    AWS: { light: "from-orange-400 to-yellow-500", dark: "from-orange-500 to-yellow-600" },
    Postman: { light: "from-orange-400 to-yellow-500", dark: "from-orange-500 to-yellow-600" },
};

const getSkillImage = (skill: string) =>
    SKILL_IMAGES[skill] ?? "/skills/default.svg";

const getSkillColors = (skill: string) =>
    SKILL_COLORS[skill] ?? DEFAULT_COLORS;

interface SkillsSectionProps {
    isDark?: boolean;
}

export const SkillsSection: React.FC<SkillsSectionProps> = ({
    isDark = false,
}) => {
    const sectionBg = isDark
        ? "bg-gray-800/50 border border-gray-700 backdrop-blur-sm"
        : "bg-white";

    const textPrimary = isDark ? "text-white" : "text-gray-900";

    return (
        <section className={`px-4 py-20 sm:px-6 lg:px-8 duration-300 ${sectionBg}`}>
            <div className="max-w-5xl mx-auto">
                {/* Header */}
                <header className="mb-16">
                    <h2 className={`text-5xl font-bold mb-4 ${textPrimary}`}>
                        Skills & Technologies
                    </h2>
                    <div
                        className={`h-1 w-24 rounded-full bg-linear-to-r ${isDark
                            ? "from-blue-500 to-purple-600"
                            : "from-blue-600 to-purple-600"
                            }`}
                    />
                </header>

                {/* Skills */}
                <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
                    {Skills.map((group, groupIndex) => (
                        <div
                            key={group.category}
                            className="duration-700 animate-in fade-in slide-in-from-bottom-4"
                            style={{ animationDelay: `${groupIndex * 100}ms` }}
                        >
                            <h3
                                className={`text-2xl font-bold mb-6 flex items-center gap-3 ${isDark ? "text-white" : "text-gray-900"
                                    }`}
                            >
                                <img
                                    src={CATEGORY_ICONS[group.category]}
                                    alt={group.category}
                                    className="object-contain w-7 h-7"
                                />

                                {group.category}
                            </h3>



                            <div className="space-y-3">
                                {group.items.map((skill, skillIndex) => {
                                    const colors = getSkillColors(skill);

                                    return (
                                        <div
                                            key={skill}
                                            className={`group relative overflow-hidden rounded-xl border cursor-default transition-all duration-300 hover:shadow-lg ${isDark
                                                ? "bg-gray-800/50 border-gray-700 hover:border-blue-500"
                                                : "bg-white border-gray-200 hover:border-blue-400"
                                                }`}
                                            style={{
                                                animationDelay: `${groupIndex * 100 + skillIndex * 50
                                                    }ms`,
                                            }}
                                        >
                                            {/* Hover background */}
                                            <div
                                                className={`absolute inset-0 bg-linear-to-r ${colors[isDark ? "dark" : "light"]
                                                    } opacity-0 group-hover:opacity-10 transition-opacity`}
                                            />

                                            <div className="relative flex items-center justify-between p-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="p-2.5 rounded-lg group-hover:scale-110 transition-transform">
                                                        <img
                                                            src={getSkillImage(skill)}
                                                            alt={skill}
                                                            className="object-contain w-8 h-8"
                                                        />
                                                    </div>

                                                    <span
                                                        className={`font-medium ${isDark ? "text-gray-100" : "text-gray-900"
                                                            }`}
                                                    >
                                                        {skill}
                                                    </span>
                                                </div>

                                                <span
                                                    className={`h-2 w-2 rounded-full opacity-0 group-hover:opacity-100 group-hover:scale-150 transition-all bg-linear-to-r ${colors[isDark ? "dark" : "light"]
                                                        }`}
                                                />
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Divider */}
                <div className="h-px mt-16 bg-linear-to-r from-transparent via-blue-500 to-transparent opacity-30" />
            </div>
        </section>
    );
};
