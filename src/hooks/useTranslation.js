import { useLanguage } from '../contexts/LanguageContext'
import { translations, interpolate } from '../i18n/translations'

export const useTranslation = () => {
  const { language, toggleLanguage, setLanguage } = useLanguage()

  const t = (key, vars = {}) => {
    const keys = key.split('.')
    let result = translations[language]

    for (const k of keys) {
      if (result && result[k] !== undefined) {
        result = result[k]
      } else {
        // Fallback to zh-TW if key not found
        result = translations['zh-TW']
        for (const fallbackKey of keys) {
          if (result && result[fallbackKey] !== undefined) {
            result = result[fallbackKey]
          } else {
            return key // Return the key if not found in fallback either
          }
        }
        break
      }
    }

    // If result is a string and we have variables, interpolate them
    if (typeof result === 'string' && Object.keys(vars).length > 0) {
      return interpolate(result, vars)
    }

    return result
  }

  return {
    t,
    language,
    toggleLanguage,
    setLanguage,
    isZhTW: language === 'zh-TW',
    isEn: language === 'en'
  }
}

export default useTranslation
