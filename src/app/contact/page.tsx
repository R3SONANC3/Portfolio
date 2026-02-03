'use client'

import { useState } from 'react'
import { useTheme } from 'next-themes'
import { Send, CheckCircle, AlertCircle } from 'lucide-react'
import { contactMethods } from '@data/contactMethods'
import { socialLinks } from '@data/socialLinks'

interface FormData {
    name: string
    email: string
    subject: string
    message: string
}

interface FormStatus {
    type: 'idle' | 'loading' | 'success' | 'error'
    message: string
}

export default function Contact() {
    const { resolvedTheme } = useTheme()
    const isDark = resolvedTheme === 'dark'

    const [formData, setFormData] = useState<FormData>({
        name: '',
        email: '',
        subject: '',
        message: '',
    })

    const [formStatus, setFormStatus] = useState<FormStatus>({
        type: 'idle',
        message: '',
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }))
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setFormStatus({ type: 'loading', message: 'Sending...' })

        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1500))

            // In production, send to your API
            console.log('Form data:', formData)

            setFormStatus({
                type: 'success',
                message: 'Message sent successfully! I\'ll get back to you soon.',
            })

            // Reset form
            setFormData({
                name: '',
                email: '',
                subject: '',
                message: '',
            })

            // Clear message after 5 seconds
            setTimeout(() => {
                setFormStatus({ type: 'idle', message: '' })
            }, 5000)
        } catch (error) {
            setFormStatus({
                type: 'error',
                message: 'Failed to send message. Please try again.',
            })
        }
    }

    return (
        <main className={`min-h-screen transition-colors duration-300 ${isDark ? 'bg-gray-950' : 'bg-white'
            }`}>
            {/* Hero Section */}
            <section className={`relative px-4 pt-32 pb-16 sm:px-6 lg:px-8 ${isDark ? 'bg-gray-950' : 'bg-linear-to-br from-white to-gray-50'
                }`}>
                {/* Background Elements */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className={`absolute rounded-full -top-40 -right-40 w-80 h-80 blur-3xl ${isDark
                        ? 'bg-linear-to-br from-blue-900 to-purple-900 opacity-20'
                        : 'bg-linear-to-br from-blue-200 to-purple-200 opacity-20'
                        }`} />
                    <div className={`absolute rounded-full -bottom-40 -left-40 w-80 h-80 blur-3xl ${isDark
                        ? 'bg-linear-to-tr from-purple-900 to-pink-900 opacity-20'
                        : 'bg-linear-to-tr from-purple-200 to-pink-200 opacity-20'
                        }`} />
                </div>

                <div className="relative max-w-5xl mx-auto">
                    <div className="duration-700 animate-in fade-in slide-in-from-bottom-4">
                        {/* Badge */}
                        <div className="mb-6">
                            <span className={`inline-flex items-center px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 ${isDark
                                ? 'bg-linear-to-r from-blue-900/40 to-purple-900/40 text-blue-300'
                                : 'bg-linear-to-r from-blue-100 to-purple-100 text-blue-700'
                                }`}>
                                <span className="w-2 h-2 mr-2 bg-blue-500 rounded-full animate-pulse" />
                                Let's Connect
                            </span>
                        </div>

                        {/* Heading */}
                        <h1 className="mb-6 text-5xl font-bold leading-tight sm:text-6xl lg:text-7xl">
                            <span className={`text-transparent bg-clip-text transition-all duration-300 ${isDark
                                ? 'bg-linear-to-r from-white via-gray-200 to-gray-400'
                                : 'bg-linear-to-r from-gray-900 via-gray-800 to-gray-700'
                                }`}>
                                Get in Touch
                            </span>
                        </h1>

                        {/* Description */}
                        <p className={`max-w-2xl mb-8 text-lg leading-relaxed sm:text-xl transition-colors duration-300 ${isDark ? 'text-gray-400' : 'text-gray-600'
                            }`}>
                            Have a project in mind or want to collaborate? I'd love to hear from you. Reach out through any of these channels or fill out the form below.
                        </p>
                    </div>
                </div>
            </section>

            {/* Contact Methods */}
            <section className={`px-4 py-16 sm:px-6 lg:px-8 transition-colors duration-300 ${isDark ? 'bg-gray-900/50' : 'bg-gray-50'
                }`}>
                <div className="max-w-5xl mx-auto">
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                        {contactMethods.map((method, index) => {
                            const Icon = method.icon
                            return (
                                <a
                                    key={method.label}
                                    href={method.href}
                                    className={`group p-6 rounded-xl transition-all duration-300 animate-in fade-in slide-in-from-bottom-4 ${isDark
                                        ? 'bg-gray-800 border border-gray-700 hover:border-blue-500 hover:bg-gray-750'
                                        : 'bg-white border border-gray-200 hover:border-blue-400 hover:bg-blue-50'
                                        } hover:shadow-lg`}
                                    style={{ animationDelay: `${index * 100}ms` }}
                                >
                                    <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg mb-4 transition-all duration-300 ${isDark
                                        ? 'bg-linear-to-br from-blue-600 to-purple-700 text-white'
                                        : 'bg-linear-to-br from-blue-500 to-purple-600 text-white'
                                        } group-hover:scale-110`}>
                                        <Icon className="w-6 h-6" />
                                    </div>
                                    <h3 className={`text-lg font-bold mb-2 transition-colors duration-300 ${isDark ? 'text-white' : 'text-gray-900'
                                        }`}>
                                        {method.label}
                                    </h3>
                                    <p className={`text-sm transition-colors duration-300 ${isDark ? 'text-gray-400' : 'text-gray-600'
                                        }`}>
                                        {method.value}
                                    </p>
                                    <p className={`text-xs mt-2 transition-colors duration-300 ${isDark ? 'text-gray-500' : 'text-gray-500'
                                        }`}>
                                        {method.description}
                                    </p>
                                </a>
                            )
                        })}
                    </div>
                </div>
            </section>

            {/* Contact Form Section */}
            <section className={`px-4 py-20 sm:px-6 lg:px-8 transition-colors duration-300 ${isDark ? 'bg-gray-950' : 'bg-white'
                }`}>
                <div className="max-w-3xl mx-auto">
                    <div className="mb-12 text-center">
                        <h2 className={`text-4xl font-bold mb-4 transition-colors duration-300 ${isDark ? 'text-white' : 'text-gray-900'
                            }`}>
                            Send Me a Message
                        </h2>
                        <p className={`transition-colors duration-300 ${isDark ? 'text-gray-400' : 'text-gray-600'
                            }`}>
                            Fill out the form below and I'll get back to you as soon as possible.
                        </p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Name & Email Row */}
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                            {/* Name Field */}
                            <div className="duration-700 animate-in fade-in slide-in-from-left-4">
                                <label className={`block text-sm font-medium mb-2 transition-colors duration-300 ${isDark ? 'text-gray-300' : 'text-gray-700'
                                    }`}>
                                    Name
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    className={`w-full px-4 py-3 rounded-lg transition-all duration-300 ${isDark
                                        ? 'bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:border-blue-500 focus:bg-gray-750'
                                        : 'bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400 focus:border-blue-400 focus:bg-white'
                                        } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                                    placeholder="Your name"
                                />
                            </div>

                            {/* Email Field */}
                            <div className="duration-700 animate-in fade-in slide-in-from-right-4">
                                <label className={`block text-sm font-medium mb-2 transition-colors duration-300 ${isDark ? 'text-gray-300' : 'text-gray-700'
                                    }`}>
                                    Email
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className={`w-full px-4 py-3 rounded-lg transition-all duration-300 ${isDark
                                        ? 'bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:border-blue-500 focus:bg-gray-750'
                                        : 'bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400 focus:border-blue-400 focus:bg-white'
                                        } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                                    placeholder="your@email.com"
                                />
                            </div>
                        </div>

                        {/* Subject Field */}
                        <div className="duration-700 animate-in fade-in slide-in-from-bottom-4" style={{ animationDelay: '100ms' }}>
                            <label className={`block text-sm font-medium mb-2 transition-colors duration-300 ${isDark ? 'text-gray-300' : 'text-gray-700'
                                }`}>
                                Subject
                            </label>
                            <input
                                type="text"
                                name="subject"
                                value={formData.subject}
                                onChange={handleChange}
                                required
                                className={`w-full px-4 py-3 rounded-lg transition-all duration-300 ${isDark
                                    ? 'bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:border-blue-500 focus:bg-gray-750'
                                    : 'bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400 focus:border-blue-400 focus:bg-white'
                                    } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                                placeholder="What is this about?"
                            />
                        </div>

                        {/* Message Field */}
                        <div className="duration-700 animate-in fade-in slide-in-from-bottom-4" style={{ animationDelay: '200ms' }}>
                            <label className={`block text-sm font-medium mb-2 transition-colors duration-300 ${isDark ? 'text-gray-300' : 'text-gray-700'
                                }`}>
                                Message
                            </label>
                            <textarea
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                required
                                rows={6}
                                className={`w-full px-4 py-3 rounded-lg transition-all duration-300 resize-none ${isDark
                                    ? 'bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:border-blue-500 focus:bg-gray-750'
                                    : 'bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400 focus:border-blue-400 focus:bg-white'
                                    } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                                placeholder="Tell me more about your project or inquiry..."
                            />
                        </div>

                        {/* Status Message */}
                        {formStatus.type !== 'idle' && (
                            <div className={`p-4 rounded-lg flex items-center gap-3 animate-in fade-in duration-300 ${formStatus.type === 'success'
                                ? isDark
                                    ? 'bg-green-900/20 border border-green-700 text-green-300'
                                    : 'bg-green-50 border border-green-200 text-green-700'
                                : formStatus.type === 'error'
                                    ? isDark
                                        ? 'bg-red-900/20 border border-red-700 text-red-300'
                                        : 'bg-red-50 border border-red-200 text-red-700'
                                    : isDark
                                        ? 'bg-blue-900/20 border border-blue-700 text-blue-300'
                                        : 'bg-blue-50 border border-blue-200 text-blue-700'
                                }`}>
                                {formStatus.type === 'success' ? (
                                    <CheckCircle className="w-5 h-5 shrink-0" />
                                ) : formStatus.type === 'error' ? (
                                    <AlertCircle className="w-5 h-5 shrink-0" />
                                ) : (
                                    <div className="w-5 h-5 border-2 border-current rounded-full shrink-0 border-t-transparent animate-spin" />
                                )}
                                <span>{formStatus.message}</span>
                            </div>
                        )}

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={formStatus.type === 'loading'}
                            className={`w-full py-3 px-6 rounded-lg font-medium transition-all duration-300 flex items-center justify-center gap-2 ${isDark
                                ? 'bg-linear-to-r from-blue-600 to-purple-700 text-white hover:shadow-lg hover:shadow-blue-600/40'
                                : 'bg-linear-to-r from-blue-500 to-purple-600 text-white hover:shadow-lg hover:shadow-blue-500/50'
                                } disabled:opacity-50 disabled:cursor-not-allowed active:scale-95`}
                        >
                            {formStatus.type === 'loading' ? (
                                <>
                                    <div className="w-4 h-4 border-2 border-white rounded-full border-t-transparent animate-spin" />
                                    Sending...
                                </>
                            ) : (
                                <>
                                    <Send className="w-4 h-4" />
                                    Send Message
                                </>
                            )}
                        </button>
                    </form>
                </div>
            </section>

            {/* Social Links Section */}
            <section className={`px-4 py-16 sm:px-6 lg:px-8 border-t transition-colors duration-300 ${isDark
                ? 'border-gray-800 bg-gray-900/50'
                : 'border-gray-200 bg-gray-50'
                }`}>
                <div className="max-w-5xl mx-auto text-center">
                    <h2 className={`text-2xl font-bold mb-8 transition-colors duration-300 ${isDark ? 'text-white' : 'text-gray-900'
                        }`}>
                        Follow My Work
                    </h2>

                    <div className="flex justify-center gap-6">
                        {socialLinks.map((link) => {
                            const Icon = link.icon
                            return (
                                <a
                                    key={link.label}
                                    href={link.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={link.label}
                                    className={`p-4 rounded-lg transition-all duration-300 group ${isDark
                                        ? 'bg-gray-800 hover:bg-blue-600 text-gray-400 hover:text-white'
                                        : 'bg-gray-100 hover:bg-blue-500 text-gray-600 hover:text-white'
                                        } hover:shadow-lg hover:shadow-blue-500/20`}
                                >
                                    <Icon className="w-6 h-6 transition-transform group-hover:scale-110" />
                                </a>
                            )
                        })}
                    </div>
                </div>
            </section>
        </main>
    )
}