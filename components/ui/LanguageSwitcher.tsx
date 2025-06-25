/**
 * Language switcher component for changing application language
 * Provides consistent language switching UI across the application
 * Following Rabwa's clean code standards with comprehensive accessibility
 */

import { Globe } from 'lucide-react'
import { useΦLanguageContext, useΦLanguageSwitcher } from '@/hooks/useΦLanguageContext'
import { tw } from '@/utils/styling/tw'

/**
 * Props for the LanguageSwitcher component
 * Provides customization options for different use cases
 */
interface LanguageSwitcherProps {
  variant?: 'button' | 'icon' | 'dropdown'
  size?: 'sm' | 'md' | 'lg'
  className?: string
  showLabel?: boolean
  showFlag?: boolean
}

/**
 * Language switcher component
 * Provides intuitive language switching with analytics tracking
 */
export function LanguageSwitcher({
  variant = 'button',
  size = 'md',
  className = '',
  showLabel = true,
  showFlag = true
}: LanguageSwitcherProps) {
  const { currentLanguage, buttonLabels, supportedLanguages } = useΦLanguageContext()
  const { switchToNextLanguage } = useΦLanguageSwitcher()

  /**
   * Gets current language configuration
   * Returns language details for display
   */
  const getCurrentLanguageConfig = () => {
    return supportedLanguages.find(lang => lang.code === currentLanguage) || supportedLanguages[0]
  }

  /**
   * Handles language switching with proper event handling
   * Ensures accessibility and user experience
   */
  const handleLanguageSwitch = async (event: React.MouseEvent | React.KeyboardEvent) => {
    event.preventDefault()
    event.stopPropagation()
    
    await switchToNextLanguage()
  }

  /**
   * Handles keyboard navigation for accessibility
   * Supports Enter and Space key activation
   */
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      handleLanguageSwitch(event)
    }
  }

  const currentLang = getCurrentLanguageConfig()
  const sizeClasses = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-2 text-sm',
    lg: 'px-4 py-3 text-base'
  }

  const iconSizes = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5'
  }

  if (variant === 'icon') {
    return (
      <button
        onClick={handleLanguageSwitch}
        onKeyDown={handleKeyDown}
        className={tw(
          'p-2 rounded-lg text-gray-700 hover:text-primary-600',
          'hover:bg-primary-50 transition-colors',
          'focus:outline-none focus:ring-2 focus:ring-primary-500',
          'focus:ring-offset-2',
          className
        )}
        aria-label={buttonLabels.changeLanguageAriaLabel}
        title={buttonLabels.changeLanguage}
        tabIndex={0}
        role="button"
      >
        <Globe className={iconSizes[size]} aria-hidden="true" />
      </button>
    )
  }

  if (variant === 'dropdown') {
    return (
      <div className="relative group">
        <button
          onClick={handleLanguageSwitch}
          onKeyDown={handleKeyDown}
          className={tw(
            'flex items-center space-x-2 space-x-reverse',
            sizeClasses[size],
            'rounded-lg text-gray-700 hover:text-primary-600',
            'hover:bg-primary-50 transition-colors',
            'focus:outline-none focus:ring-2 focus:ring-primary-500',
            'focus:ring-offset-2 font-medium',
            className
          )}
          aria-label={buttonLabels.changeLanguageAriaLabel}
          aria-expanded="false"
          aria-haspopup="true"
          tabIndex={0}
          role="button"
        >
          {showFlag && (
            <span className="text-lg" aria-hidden="true">
              {currentLang.flag}
            </span>
          )}
          <Globe className={iconSizes[size]} aria-hidden="true" />
          {showLabel && (
            <span>{buttonLabels.changeLanguage}</span>
          )}
        </button>
        
        {/* Dropdown menu would be implemented here for future enhancement */}
        <div className="absolute top-full right-0 mt-1 w-48 bg-white rounded-lg shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
          <div className="py-1">
            {supportedLanguages.map((language) => (
              <button
                key={language.code}
                className={tw(
                  'w-full flex items-center space-x-3 space-x-reverse px-4 py-2 text-sm',
                  'text-gray-700 hover:text-primary-600 hover:bg-primary-50',
                  'transition-colors',
                  language.code === currentLanguage && 'bg-primary-50 text-primary-600'
                )}
                onClick={() => switchToNextLanguage()}
                aria-label={`Switch to ${language.englishName}`}
              >
                <span className="text-lg" aria-hidden="true">
                  {language.flag}
                </span>
                <span>{language.name}</span>
                {language.code === currentLanguage && (
                  <span className="text-primary-600 font-medium" aria-hidden="true">✓</span>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    )
  }

  // Default button variant
  return (
    <button
      onClick={handleLanguageSwitch}
      onKeyDown={handleKeyDown}
      className={tw(
        'flex items-center space-x-2 space-x-reverse',
        sizeClasses[size],
        'rounded-lg text-gray-700 hover:text-primary-600',
        'hover:bg-primary-50 transition-colors',
        'focus:outline-none focus:ring-2 focus:ring-primary-500',
        'focus:ring-offset-2 font-medium',
        className
      )}
      aria-label={buttonLabels.changeLanguageAriaLabel}
      title={buttonLabels.changeLanguage}
      tabIndex={0}
      role="button"
    >
      {showFlag && (
        <span className="text-lg" aria-hidden="true">
          {currentLang.flag}
        </span>
      )}
      <Globe className={iconSizes[size]} aria-hidden="true" />
      {showLabel && (
        <span>{buttonLabels.changeLanguage}</span>
      )}
    </button>
  )
} 