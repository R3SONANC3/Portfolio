import { FaGithub, FaEnvelope } from 'react-icons/fa'

export const socialLinks = [
  { 
    icon: FaEnvelope, 
    href: 'mailto:hello@jeerapat.dev', 
    label: 'Email',
    color: 'hover:text-red-500 dark:hover:text-red-400'
  },
  { 
    icon: FaGithub, 
    href: `https://github.com/${process.env.GITHUB_USERNAME}`, 
    label: 'GitHub',
    color: 'dark:hover:text-cyan-400 hover:text-blue-600'
  },
]