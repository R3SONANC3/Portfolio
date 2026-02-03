import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import { ThemeProviderWrapper } from '@/components/ThemeProvider'
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
      <body className="min-h-screen bg-white text-black dark:bg-gray-950 dark:text-white">
        <ThemeProviderWrapper>
          <Navbar/>
          <main className='min-h-scree px-4 md:px-6'>
          {children}
          </main>
        </ThemeProviderWrapper>
      </body> 
    </html>
  )
}