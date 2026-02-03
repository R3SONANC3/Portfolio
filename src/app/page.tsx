import Image from "next/image";
import Link from 'next/link'
import { ArrowRight, Github, Linkedin, Mail, ExternalLink, Code2, Zap, Users, Target } from 'lucide-react'

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      < section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8" >
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none" >
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-200 to-purple-200 rounded-full opacity-20 dark:opacity-10 blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-purple-200 to-pink-200 rounded-full opacity-20 dark:opacity-10 blur-3xl" />
        </div >

        <div className="relative max-w-5xl mx-auto">
          {/* Hero Content */}
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="mb-6">
              <span className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 text-sm font-medium text-blue-700 dark:text-blue-300">
                <span className="w-2 h-2 rounded-full bg-blue-500 mr-2 animate-pulse" />
                Welcome to my portfolio
              </span>
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 dark:from-white dark:via-gray-100 dark:to-gray-300 bg-clip-text text-transparent">
                I'm Jeerapat
              </span>
              <br />
              <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                Full Stack Developer
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-2xl leading-relaxed">
              I craft beautiful, performant web applications that solve real-world problems. Passionate about clean code, great design, and creating experiences that users love.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 mb-12">
              <Link
                href="/projects"
                className="group inline-flex items-center px-8 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/50 active:scale-95"
              >
                View My Work
                <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
              </Link>

              <Link
                href="/contact"
                className="inline-flex items-center px-8 py-3 rounded-xl border-2 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white font-medium transition-all duration-300 hover:border-blue-500 dark:hover:border-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/20"
              >
                Get in Touch
              </Link>
            </div>

            {/* Social Links */}
            <div className="flex gap-4">
              {[
                { icon: Github, label: 'GitHub', href: 'https://github.com' },
                { icon: Linkedin, label: 'LinkedIn', href: 'https://linkedin.com' },
                { icon: Mail, label: 'Email', href: 'mailto:hello@jeerapat.dev' },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="group p-3 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-blue-500 dark:hover:bg-blue-600 text-gray-600 dark:text-gray-400 hover:text-white transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20"
                >
                  <social.icon className="w-5 h-5 transition-transform group-hover:scale-110" />
                </a>
              ))}
            </div>
          </div>
        </div>

      </section >
    </div>


  );
}