/**
 * Language context hook for managing application language state
 * Provides language switching functionality with persistence
 * Following Rabwa's signature style with Greek prefix and comprehensive logging
 */

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react'
import { getLogger } from '@/lib/logger'
import { withErrorHandling } from '@/lib/errors'
import { SUPPORTED_LANGUAGES, NAVIGATION_ITEMS_BY_LANGUAGE, BUTTON_LABELS_BY_LANGUAGE } from '@/lib/constants'

/**
 * Language context interface
 * Defines the structure for language state management
 */
interface LanguageContextType {
  currentLanguage: string
  setLanguage: (languageCode: string) => Promise<void>
  navigationItems: typeof NAVIGATION_ITEMS_BY_LANGUAGE.ar
  buttonLabels: typeof BUTTON_LABELS_BY_LANGUAGE.ar
  isRTL: boolean
  supportedLanguages: typeof SUPPORTED_LANGUAGES
}

/**
 * Language context provider props
 * Defines the props for the language context provider
 */
interface LanguageProviderProps {
  children: ReactNode
  defaultLanguage?: string
}

/**
 * Default language context value
 * Provides fallback values when context is not available
 */
const defaultLanguageContext: LanguageContextType = {
  currentLanguage: 'ar',
  setLanguage: async () => {},
  navigationItems: NAVIGATION_ITEMS_BY_LANGUAGE.ar,
  buttonLabels: BUTTON_LABELS_BY_LANGUAGE.ar,
  isRTL: true,
  supportedLanguages: SUPPORTED_LANGUAGES
}

/**
 * Language context for React
 * Provides language state throughout the application
 */
const LanguageContext = createContext<LanguageContextType>(defaultLanguageContext)

/**
 * Language provider component
 * Manages language state and provides context to children
 */
export function LanguageProvider({ 
  children, 
  defaultLanguage = 'ar' 
}: LanguageProviderProps) {
  const [currentLanguage, setCurrentLanguage] = useState(defaultLanguage)
  const logger = getLogger()

  /**
   * Validates if a language code is supported
   * Ensures only valid languages can be set
   */
  const isValidLanguage = useCallback((languageCode: string): boolean => {
    return SUPPORTED_LANGUAGES.some(lang => lang.code === languageCode)
  }, [])

  /**
   * Gets the current language configuration
   * Returns language-specific settings and direction
   */
  const getCurrentLanguageConfig = useCallback(() => {
    return SUPPORTED_LANGUAGES.find(lang => lang.code === currentLanguage) || SUPPORTED_LANGUAGES[0]
  }, [currentLanguage])

  /**
   * Sets the application language with persistence and logging
   * Handles language switching with comprehensive error handling
   */
  const setLanguage = useCallback(
    withErrorHandling(async (languageCode: string) => {
      if (!isValidLanguage(languageCode)) {
        logger.warn('Invalid language code provided', {
          component: 'useΦLanguageContext',
          providedLanguage: languageCode,
          supportedLanguages: SUPPORTED_LANGUAGES.map(lang => lang.code),
          timestamp: new Date().toISOString()
        })
        return
      }

      const previousLanguage = currentLanguage
      setCurrentLanguage(languageCode)

      // Persist language preference
      try {
        localStorage.setItem('mavera-hall-language', languageCode)
      } catch (error) {
        logger.warn('Failed to persist language preference', {
          component: 'useΦLanguageContext',
          error: error instanceof Error ? error.message : 'Unknown error',
          timestamp: new Date().toISOString()
        })
      }

      // Log language change for analytics
      logger.userAction(
        'language_changed',
        'anonymous',
        'setting',
        'language-preference',
        {
          component: 'useΦLanguageContext',
          previousLanguage,
          newLanguage: languageCode,
          timestamp: new Date().toISOString()
        }
      )

      // Update document direction
      const languageConfig = SUPPORTED_LANGUAGES.find(lang => lang.code === languageCode)
      if (languageConfig) {
        document.documentElement.dir = languageConfig.direction
        document.documentElement.lang = languageCode
      }
    }),
    [currentLanguage, isValidLanguage, logger]
  )

  /**
   * Loads language preference from localStorage on mount
   * Restores user's language preference on application start
   */
  useEffect(() => {
    const loadLanguagePreference = withErrorHandling(async () => {
      try {
        const savedLanguage = localStorage.getItem('mavera-hall-language')
        if (savedLanguage && isValidLanguage(savedLanguage)) {
          setCurrentLanguage(savedLanguage)
          
          logger.info('Language preference loaded from storage', {
            component: 'useΦLanguageContext',
            language: savedLanguage,
            timestamp: new Date().toISOString()
          })
        }
      } catch (error) {
        logger.warn('Failed to load language preference from storage', {
          component: 'useΦLanguageContext',
          error: error instanceof Error ? error.message : 'Unknown error',
          timestamp: new Date().toISOString()
        })
      }
    })

    loadLanguagePreference()
  }, [isValidLanguage, logger])

  /**
   * Updates document attributes when language changes
   * Ensures proper RTL/LTR rendering and accessibility
   */
  useEffect(() => {
    const languageConfig = getCurrentLanguageConfig()
    document.documentElement.dir = languageConfig.direction
    document.documentElement.lang = currentLanguage
  }, [currentLanguage, getCurrentLanguageConfig])

  /**
   * Gets current navigation items based on language
   * Returns language-specific navigation labels
   */
  const navigationItems = NAVIGATION_ITEMS_BY_LANGUAGE[currentLanguage as keyof typeof NAVIGATION_ITEMS_BY_LANGUAGE] || NAVIGATION_ITEMS_BY_LANGUAGE.ar

  /**
   * Gets current button labels based on language
   * Returns language-specific button text
   */
  const buttonLabels = BUTTON_LABELS_BY_LANGUAGE[currentLanguage as keyof typeof BUTTON_LABELS_BY_LANGUAGE] || BUTTON_LABELS_BY_LANGUAGE.ar

  /**
   * Determines if current language is RTL
   * Used for layout and styling decisions
   */
  const isRTL = getCurrentLanguageConfig().direction === 'rtl'

  const contextValue: LanguageContextType = {
    currentLanguage,
    setLanguage,
    navigationItems,
    buttonLabels,
    isRTL,
    supportedLanguages: SUPPORTED_LANGUAGES
  }

  return (
    <LanguageContext.Provider value={contextValue}>
      {children}
    </LanguageContext.Provider>
  )
}

/**
 * Custom hook to use language context
 * Provides easy access to language state and functions
 */
export function useΦLanguageContext(): LanguageContextType {
  const context = useContext(LanguageContext)
  
  if (context === undefined) {
    throw new Error('useΦLanguageContext must be used within a LanguageProvider')
  }
  
  return context
}

/**
 * Hook for language switching functionality
 * Provides simplified language switching with analytics
 */
export function useΦLanguageSwitcher() {
  const { currentLanguage, setLanguage, supportedLanguages } = useΦLanguageContext()
  const logger = getLogger()

  /**
   * Switches to the next available language
   * Cycles through supported languages
   */
  const switchToNextLanguage = useCallback(
    withErrorHandling(async () => {
      const currentIndex = supportedLanguages.findIndex(lang => lang.code === currentLanguage)
      const nextIndex = (currentIndex + 1) % supportedLanguages.length
      const nextLanguage = supportedLanguages[nextIndex]
      
      await setLanguage(nextLanguage.code)
      
      logger.info('Switched to next language', {
        component: 'useΦLanguageSwitcher',
        fromLanguage: currentLanguage,
        toLanguage: nextLanguage.code,
        timestamp: new Date().toISOString()
      })
    }),
    [currentLanguage, setLanguage, supportedLanguages, logger]
  )

  /**
   * Switches to a specific language
   * Direct language switching with validation
   */
  const switchToLanguage = useCallback(
    withErrorHandling(async (languageCode: string) => {
      await setLanguage(languageCode)
      
      logger.info('Switched to specific language', {
        component: 'useΦLanguageSwitcher',
        fromLanguage: currentLanguage,
        toLanguage: languageCode,
        timestamp: new Date().toISOString()
      })
    }),
    [currentLanguage, setLanguage, logger]
  )

  return {
    currentLanguage,
    switchToNextLanguage,
    switchToLanguage,
    supportedLanguages
  }
} 