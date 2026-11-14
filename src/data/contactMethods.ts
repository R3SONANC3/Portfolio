import { Mail, Phone, MapPin, type LucideIcon } from 'lucide-react'

export const contactMethods: { icon: LucideIcon; label: string; value: string; href?: string }[] = [
    { icon: Mail, label: 'Email', value: 'jeerapat.kah@gmail.com', href: 'mailto:jeerapat.kah@gmail.com' },
    { icon: Phone, label: 'Phone', value: '+66 (0)65-608-9783', href: 'tel:+66656089783' },
    { icon: MapPin, label: 'Location', value: 'Phrae, Thailand' },
]
