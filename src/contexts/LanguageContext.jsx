import React, { createContext, useContext, useState, useEffect } from 'react'

const LanguageContext = createContext()

export const useLanguage = () => {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    const saved = localStorage.getItem('mindful-language')
    return saved || 'zh-TW'
  })

  useEffect(() => {
    localStorage.setItem('mindful-language', language)
    document.documentElement.lang = language === 'zh-TW' ? 'zh-TW' : 'en'
  }, [language])

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'zh-TW' ? 'en' : 'zh-TW')
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  )
}

export default LanguageContext
