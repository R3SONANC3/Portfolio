import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa'

export const socialLinks = [
  { 
    icon: FaEnvelope, 
    href: 'mailto:hello@jeerapat.dev', 
    label: 'Email',
    color: 'hover:text-red-500 dark:hover:text-red-400'
  },
  { 
    icon: FaGithub, 
    href: 'https://github.com/R3SONANC3', 
    label: 'GitHub',
    color: 'dark:hover:text-cyan-400 hover:text-blue-600'
  },
  { 
    icon: FaLinkedin, 
    href: 'https://linkedin.com/in/yourprofile', 
    label: 'LinkedIn',
    color: 'hover:text-blue-600 dark:hover:text-blue-400'
  },
]