import { FaGithub, FaEnvelope } from 'react-icons/fa'
import { EMAIL, GITHUB_URL } from './site'

export const socialLinks = [
  { icon: FaEnvelope, href: `mailto:${EMAIL}`, label: 'Email' },
  ...(GITHUB_URL ? [{ icon: FaGithub, href: GITHUB_URL, label: 'GitHub' }] : []),
]
