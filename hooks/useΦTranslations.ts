/**
 * Translation hook for accessing multilingual content
 * Provides easy access to all translations based on current language
 * Following Rabwa's signature style with Greek prefix and comprehensive logging
 */

import { useMemo } from 'react'
import { useΦLanguageContext } from './useΦLanguageContext'
import { TRANSLATIONS, LanguageCode, TranslationKey } from '@/lib/translations'
import { getLogger } from '@/lib/logger'

/**
 * Translation hook return type
 * Provides typed access to all translation sections
 */
interface TranslationHookReturn {
  // Common translations
  common: any
  // Section-specific translations
  hero: any
  about: any
  services: any
  gallery: any
  testimonials: any
  contact: any
  footer: any
  // Page-specific translations
  pages: any
  // Utility functions
  t: <T extends TranslationKey>(section: T, key: string) => string
  getPageTranslation: (pageName: keyof typeof TRANSLATIONS.pages) => any
}

/**
 * Custom hook for accessing translations
 * Provides typed access to all translation content based on current language
 */
export function useΦTranslations(): TranslationHookReturn {
  const { currentLanguage } = useΦLanguageContext()
  const logger = getLogger()

  /**
   * Memoized translations object for current language
   * Prevents unnecessary re-renders when language changes
   */
  const translations = useMemo(() => {
    const languageCode = currentLanguage as LanguageCode
    
    logger.info('Loading translations for language', {
      component: 'useΦTranslations',
      language: languageCode,
      timestamp: new Date().toISOString()
    })

    return {
      common: TRANSLATIONS.common[languageCode],
      hero: TRANSLATIONS.hero[languageCode],
      about: TRANSLATIONS.about[languageCode],
      services: TRANSLATIONS.services[languageCode],
      gallery: TRANSLATIONS.gallery[languageCode],
      testimonials: TRANSLATIONS.testimonials[languageCode],
      contact: TRANSLATIONS.contact[languageCode],
      footer: TRANSLATIONS.footer[languageCode],
      pages: TRANSLATIONS.pages.home[languageCode]
    }
  }, [currentLanguage, logger])

  /**
   * Generic translation function for accessing nested translation keys
   * Provides fallback to English if translation is missing
   */
  const t = useMemo(() => {
    return <T extends TranslationKey>(section: T, key: string): string => {
      try {
        const sectionTranslations = TRANSLATIONS[section] as any
        const currentLangTranslations = sectionTranslations[currentLanguage as LanguageCode]
        const englishTranslations = sectionTranslations.en
        
        // Try to get the translation from current language
        const translation = getNestedValue(currentLangTranslations, key)
        if (translation !== undefined) {
          return translation
        }
        
        // Fallback to English
        const englishTranslation = getNestedValue(englishTranslations, key)
        if (englishTranslation !== undefined) {
          logger.warn('Translation missing for current language, using English fallback', {
            component: 'useΦTranslations',
            section,
            key,
            currentLanguage,
            timestamp: new Date().toISOString()
          })
          return englishTranslation
        }
        
        // Final fallback
        logger.error('Translation key not found in any language', {
          component: 'useΦTranslations',
          section,
          key,
          currentLanguage,
          timestamp: new Date().toISOString()
        })
        
        return key
      } catch (error) {
        logger.error('Error accessing translation', {
          component: 'useΦTranslations',
          section,
          key,
          currentLanguage,
          error: error instanceof Error ? error.message : 'Unknown error',
          timestamp: new Date().toISOString()
        })
        return key
      }
    }
  }, [currentLanguage, logger])

  /**
   * Get page-specific translations
   * Returns translations for a specific page
   */
  const getPageTranslation = useMemo(() => {
    return (pageName: keyof typeof TRANSLATIONS.pages) => {
      const languageCode = currentLanguage as LanguageCode
      return TRANSLATIONS.pages[pageName][languageCode]
    }
  }, [currentLanguage])

  return {
    ...translations,
    t,
    getPageTranslation
  }
}

/**
 * Utility function to get nested object values by dot notation
 * Safely accesses nested translation keys like 'form.name'
 */
function getNestedValue(obj: any, path: string): string | undefined {
  try {
    return path.split('.').reduce((current, key) => {
      return current && current[key] !== undefined ? current[key] : undefined
    }, obj)
  } catch {
    return undefined
  }
}

/**
 * Hook for accessing common translations only
 * Lightweight hook for components that only need common translations
 */
export function useΦCommonTranslations() {
  const { currentLanguage } = useΦLanguageContext()
  
  return useMemo(() => {
    const languageCode = currentLanguage as LanguageCode
    return TRANSLATIONS.common[languageCode]
  }, [currentLanguage])
}

/**
 * Hook for accessing page-specific translations
 * Optimized for page components that need page-specific content
 */
export function useΦPageTranslations(pageName: keyof typeof TRANSLATIONS.pages) {
  const { currentLanguage } = useΦLanguageContext()
  
  return useMemo(() => {
    const languageCode = currentLanguage as LanguageCode
    return TRANSLATIONS.pages[pageName][languageCode]
  }, [currentLanguage, pageName])
}

/**
 * Hook for accessing section-specific translations
 * Optimized for section components that need specific content
 */
export function useΦSectionTranslations<T extends TranslationKey>(section: T) {
  const { currentLanguage } = useΦLanguageContext()
  
  return useMemo(() => {
    const languageCode = currentLanguage as LanguageCode
    return (TRANSLATIONS[section] as any)[languageCode]
  }, [currentLanguage, section])
} 