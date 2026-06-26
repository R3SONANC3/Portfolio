export interface ProjectStat {
  label: string
  value: string
}

export interface Project {
  id: string
  title: string
  description: string
  image: string
  category: string
  tags: string[]
  github?: string
  live?: string
  featured?: boolean
  stats?: ProjectStat[]
}

const GITHUB_USERNAME = process.env.NEXT_PUBLIC_GITHUB_USERNAME

export const projects: Project[] = [
  {
    id: 'competency-v2',
    title: 'Competency V2',
    description:
      'A centralized system for managing and analyzing Competency, SFIA V9, and TPQI frameworks. Built as two integrated subsystems for admin management and career & competency exploration, with a REST API backend connected to multiple domain-specific MySQL databases, all orchestrated with Docker Compose.',
    image: '🧩',
    category: 'Full Stack',
    tags: ['React', 'Vite', 'Node.js', 'Express', 'Prisma', 'MySQL', 'Docker', 'TypeScript'],
    github: 'https://github.com/CosecDY/CompetencyV2.1',
    featured: true,
    stats: [
      { label: 'Databases', value: '3' },
      { label: 'Frameworks', value: '3' },
      { label: 'Commits', value: '327+' },
    ],
  },
  {
    id: 'perfnet',
    title: 'PerfNet',
    description:
      'A performance and load-testing platform built for a Hackathon, designed to measure how well a server handles concurrent user load. PerfNet analyzes response time, stability, and request success rate to help teams understand real-world server performance.',
    image: '📈',
    category: 'Full Stack',
    tags: ['Python', 'JavaScript', 'Docker', 'CSS'],
    github: `https://github.com/${GITHUB_USERNAME}/PerfNet`,
    featured: true,
    stats: [
      { label: 'Hackathon', value: '🥈 2nd' },
      { label: 'Stack', value: 'Full Stack' },
      { label: 'Focus', value: 'Load Testing' },
    ],
  },
  {
    id: 'institution-evaluation',
    title: 'Institution Evaluation',
    description:
      'A web application for evaluating institutions, built with a React client and a separate backend server. Deployed live for real-world usage and testing.',
    image: '🏫',
    category: 'Full Stack',
    tags: ['React', 'JavaScript', 'CSS'],
    github: `https://github.com/${GITHUB_USERNAME}/InstitutionEvaluation`,
    live: 'https://field-ex.vercel.app',
  },
  {
    id: 'database-project',
    title: 'Database Project',
    description:
      'A university database systems project (course 305311) that takes email enrollment data and transforms it into an interactive dashboard, covering schema design, data processing, and visualization.',
    image: '🗄️',
    category: 'Full Stack',
    tags: ['JavaScript', 'TypeScript', 'Python', 'SQL'],
    github: `https://github.com/${GITHUB_USERNAME}/DatabaseProject`,
    live: 'https://database-project-bice.vercel.app',
  },
  {
    id: 'portfolio',
    title: 'Portfolio Website',
    description:
      'This very portfolio website — built with Next.js, TypeScript, and Tailwind CSS, featuring theming, animated sections, and a contact form. Created as an experiment in AI-powered, vibe-coded web development.',
    image: '💼',
    category: 'Frontend',
    tags: ['Next.js', 'TypeScript', 'Tailwind CSS', 'next-themes'],
    github: `https://github.com/${GITHUB_USERNAME}/Portfolio`,
  },
]