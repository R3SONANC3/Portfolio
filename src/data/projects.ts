export interface Project {
    id: string
    title: string
    description: string
    image: string
    tags: string[]
    category: string
    github?: string
    live?: string
    featured: boolean
    stats?: {
        label: string
        value: string
    }[]
}

export const projects: Project[] = [
    {
        id: '1',
        title: 'E-Commerce Platform',
        description: 'A full-stack e-commerce solution with real-time inventory management, payment integration, and admin dashboard.',
        image: '🛍️',
        tags: ['Next.js', 'TypeScript', 'Stripe', 'PostgreSQL'],
        category: 'Full Stack',
        github: 'https://github.com',
        live: 'https://example.com',
        featured: true,
        stats: [
            { label: 'Performance', value: '98/100' },
            { label: 'Users', value: '5K+' },
            { label: 'Revenue', value: '$50K+' },
        ]
    },
    {
        id: '2',
        title: 'Task Management App',
        description: 'Collaborative task management application with real-time updates, notifications, and team workspaces.',
        image: '✓',
        tags: ['React', 'Firebase', 'Tailwind CSS'],
        category: 'Frontend',
        github: 'https://github.com',
        live: 'https://example.com',
        featured: true,
        stats: [
            { label: 'Stars', value: '2.5K' },
            { label: 'Contributors', value: '12' },
            { label: 'Downloads', value: '10K+' },
        ]
    },
    {
        id: '3',
        title: 'Analytics Dashboard',
        description: 'Real-time analytics dashboard with interactive charts, data visualization, and custom reporting features.',
        image: '📊',
        tags: ['React', 'D3.js', 'Node.js', 'MongoDB'],
        category: 'Full Stack',
        github: 'https://github.com',
        live: 'https://example.com',
        featured: false,
    },
    {
        id: '4',
        title: 'Social Media App',
        description: 'Next-generation social platform with real-time messaging, feeds, and community features.',
        image: '💬',
        tags: ['Next.js', 'Socket.io', 'PostgreSQL'],
        category: 'Full Stack',
        github: 'https://github.com',
        live: 'https://example.com',
        featured: false,
    },
    {
        id: '5',
        title: 'Design System',
        description: 'Comprehensive component library and design system for building consistent web applications.',
        image: '🎨',
        tags: ['React', 'Storybook', 'Figma'],
        category: 'Frontend',
        github: 'https://github.com',
        live: 'https://example.com',
        featured: false,
    },
    {
        id: '6',
        title: 'AI Chat Assistant',
        description: 'Intelligent chat application powered by OpenAI with context awareness and custom integrations.',
        image: '🤖',
        tags: ['Next.js', 'OpenAI API', 'Prisma'],
        category: 'Full Stack',
        github: 'https://github.com',
        live: 'https://example.com',
        featured: false,
    },
]