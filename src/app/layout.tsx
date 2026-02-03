import type { Metadata } from 'next'
import Navbar from '@components/Navbar'
import { ThemeProviderWrapper } from '@components/ThemeProvider'
import './globals.css'


export const metadata: Metadata = {
  title: 'Jeerapat.dev',
  description: 'Portfolio Website',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body className="min-h-screen text-black bg-white dark:bg-gray-950 dark:text-white">
        <ThemeProviderWrapper>
          <Navbar/>
          <main className='px-4 min-h-scree md:px-6'>
          {children}
          </main>
        </ThemeProviderWrapper>
      </body> 
    </html>
  )
}