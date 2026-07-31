import type { Metadata } from 'next'
import { Suspense } from 'react'
import Navbar from '@components/Navbar'
import { ThemeProviderWrapper } from '@components/ThemeProvider'
import ErrorBoundary from '@components/ErrorBoundary'
import Loading from './loading'
import Footer from '@/components/footer'
import { LanguageProvider } from '@/components/LanguageProvider'
import './globals.css'

export const metadata: Metadata = {
  title: 'Jeerapat.dev',
  description: 'Portfolio Website',  
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
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen text-black bg-white dark:bg-gray-950 dark:text-white">
        <ThemeProviderWrapper>
          <LanguageProvider>
            <Navbar />
            <ErrorBoundary>
              <Suspense fallback={<Loading />}>
                {children}
              </Suspense>
            </ErrorBoundary>
            <Footer />
          </LanguageProvider>
        </ThemeProviderWrapper>
      </body>
    </html>
  )
}
