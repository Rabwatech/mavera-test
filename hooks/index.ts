/**
 * Hooks index file for clean imports
 * Provides centralized access to all custom hooks
 * Following Rabwa's clean code standards with organized exports
 */

// Application lifecycle hooks
export { useΦApplicationInitialization } from './useΦApplicationInitialization'

// Analytics and tracking hooks
export { useΨNavigationAnalytics } from './useΨNavigationAnalytics'

// Utility hooks
export { useΩHydrationSafeDate, formatDateHydrationSafe } from './useΩHydrationSafeDate'

// Language context hooks
export { useΦLanguageContext, useΦLanguageSwitcher, LanguageProvider } from './useΦLanguageContext'

// Translation hooks
export { 
  useΦTranslations, 
  useΦCommonTranslations, 
  useΦPageTranslations, 
  useΦSectionTranslations 
} from './useΦTranslations' 