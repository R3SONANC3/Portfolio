import { Mail, Phone, MapPin } from 'lucide-react'

export const contactMethods = [
    {
        icon: Mail,
        label: 'Email',
        value: 'jeerapat.kah@gmail.com',
        href: 'mailto:jeerapat.kah@gmail.com',
        description: 'Quick response within 24 hours'
    },
    {
        icon: Phone,
        label: 'Phone',
        value: '+66 (0)65-608-9783',
        href: 'tel:+66656089783',
        description: 'Available Mon-Fri, 9AM-6PM'
    },
    {
        icon: MapPin,
        label: 'Location',
        value: 'Phrae, Thailand',
        href: '#',
        description: 'Open to remote work worldwide'
    },
]