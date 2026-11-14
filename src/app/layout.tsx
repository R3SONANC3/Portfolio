import type { Metadata } from 'next'
import { Bricolage_Grotesque, IBM_Plex_Sans_Thai, Mali } from 'next/font/google'
import { Suspense } from 'react'
import Navbar from '@components/Navbar'
import ErrorBoundary from '@components/ErrorBoundary'
import Loading from './loading'
import Footer from '@/components/footer'
import { LanguageProvider } from '@/components/LanguageProvider'
import './globals.css'

const bricolage = Bricolage_Grotesque({ subsets: ['latin'], weight: ['400', '600', '800'], variable: '--font-bricolage' })
const plexThai = IBM_Plex_Sans_Thai({ subsets: ['thai', 'latin'], weight: ['400', '600'], variable: '--font-plex-thai' })
const mali = Mali({ subsets: ['thai', 'latin'], weight: ['400', '600'], variable: '--font-mali' })

export const metadata: Metadata = {
  title: 'Jeerapat Kahyaisiang — Full-stack Developer',
  description: 'Full-stack developer (React, Node.js, TypeScript) based in Phrae, Thailand. Selected work, experience and CV.',
  icons: {
    icon: [
      { url: '/icons/favicon.ico' },
    ],
    apple: '/icons/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${bricolage.variable} ${plexThai.variable} ${mali.variable}`} suppressHydrationWarning>
      <body className="min-h-screen">
        <LanguageProvider>
          <Navbar />
          <ErrorBoundary>
            <Suspense fallback={<Loading />}>
              {children}
            </Suspense>
          </ErrorBoundary>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  )
}
