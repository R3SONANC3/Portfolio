import { Mail, Phone, MapPin, type LucideIcon } from 'lucide-react'

export const contactMethods: { key: 'email' | 'phone' | 'location'; icon: LucideIcon; value: string; href?: string }[] = [
    { key: 'email', icon: Mail, value: 'jeerapat.kah@gmail.com', href: 'mailto:jeerapat.kah@gmail.com' },
    { key: 'phone', icon: Phone, value: '+66 (0)65-608-9783', href: 'tel:+66656089783' },
    { key: 'location', icon: MapPin, value: 'Phrae, Thailand' },
]
