import React from 'react'
import { Globe } from 'lucide-react'
import { useTranslation } from '../hooks/useTranslation'

const LanguageToggle = ({ className = '' }) => {
  const { language, toggleLanguage } = useTranslation()

  return (
    <button
      onClick={toggleLanguage}
      className={`flex items-center gap-2 px-3 py-2 rounded-xl bg-white/60 hover:bg-white/80 transition-all duration-200 ${className}`}
      title={language === 'zh-TW' ? 'Switch to English' : '切換至中文'}
    >
      <Globe className="w-4 h-4 text-mindful-purple" />
      <span className="text-sm font-medium text-gray-700">
        {language === 'zh-TW' ? 'EN' : '中文'}
      </span>
    </button>
  )
}

export default LanguageToggle
