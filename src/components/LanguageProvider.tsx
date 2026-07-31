'use client'

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'

type Language = 'en' | 'th'
type LanguageContextValue = { language: Language; setLanguage: (language: Language) => void }

const LanguageContext = createContext<LanguageContextValue | null>(null)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('en')

  useEffect(() => {
    document.documentElement.lang = language
  }, [language])

  return <LanguageContext.Provider value={{ language, setLanguage }}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) throw new Error('useLanguage must be used inside LanguageProvider')
  return context
}
