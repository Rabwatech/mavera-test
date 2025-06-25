'use client'

import { useState, useCallback } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { useΨNavigationAnalytics } from '@/hooks/useΨNavigationAnalytics'
import { useΦLanguageContext } from '@/hooks/useΦLanguageContext'
import { LanguageSwitcher } from '@/components/ui/LanguageSwitcher'
import { tw, navLinkClasses, buttonClasses } from '@/utils/styling/tw'

/**
 * Main navigation component for the application
 * Provides responsive navigation with mobile menu support and language switching
 * Uses custom hooks for analytics and follows Rabwa's clean code standards
 */
export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  
  /**
   * Navigation analytics hook for tracking user interactions
   * Provides comprehensive navigation event logging
   */
  const { 
    trackNavigationClick, 
    trackMobileMenuToggle, 
    trackBookingCTAClick 
  } = useΨNavigationAnalytics()

  /**
   * Language context hook for language switching functionality
   * Provides current language state and switching capabilities
   */
  const { 
    navigationItems, 
    buttonLabels
  } = useΦLanguageContext()

  /**
   * Toggles the mobile menu state with analytics tracking
   * Logs menu interactions for mobile UX optimization
   */
  const handleMobileMenuToggle = useCallback(async () => {
    const newMenuState = !isMenuOpen
    setIsMenuOpen(newMenuState)
    
    await trackMobileMenuToggle(newMenuState, {
      component: 'Navbar',
      timestamp: new Date().toISOString()
    })
  }, [isMenuOpen, trackMobileMenuToggle])

  /**
   * Handles navigation link clicks with comprehensive tracking
   * Closes mobile menu and logs navigation events for analytics
   */
  const handleNavigationClick = useCallback(async (
    href: string, 
    label: string
  ) => {
    // Close mobile menu when navigating
    if (isMenuOpen) {
      setIsMenuOpen(false)
    }
    
    await trackNavigationClick(href, label, isMenuOpen, {
      component: 'Navbar',
      timestamp: new Date().toISOString()
    })
  }, [isMenuOpen, trackNavigationClick])

  /**
   * Handles booking button clicks with conversion tracking
   * Logs booking CTA interactions for funnel optimization
   */
  const handleBookingClick = useCallback(async () => {
    if (isMenuOpen) {
      setIsMenuOpen(false)
    }
    
    await trackBookingCTAClick('navbar', isMenuOpen, {
      component: 'Navbar',
      timestamp: new Date().toISOString()
    })
  }, [isMenuOpen, trackBookingCTAClick])

  return (
    <nav 
      className={tw(
        'bg-white shadow-lg fixed w-full top-0 z-50',
        'transition-all duration-300 ease-in-out'
      )} 
      role="navigation" 
      aria-label="Main navigation"
    >
      <div className="container-custom">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link 
            href="/" 
            className={tw(
              'text-2xl font-bold text-primary-900',
              'hover:text-primary-700 transition-colors',
              'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2'
            )}
            onClick={() => handleNavigationClick('/', 'Logo')}
            aria-label="قاعة مافيرا - الصفحة الرئيسية"
          >
            قاعة مافيرا
          </Link>

          {/* Desktop Navigation */}
          <div 
            className="hidden md:flex space-x-8 space-x-reverse" 
            role="menubar"
          >
            {navigationItems.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={navLinkClasses({
                  isHovered: false,
                  isFocused: false,
                  isActive: false
                })}
                onClick={() => handleNavigationClick(link.href, link.label)}
                role="menuitem"
                aria-label={link.ariaLabel || link.label}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4 space-x-reverse">
            {/* Language Switcher */}
            <LanguageSwitcher 
              variant="button" 
              size="md" 
              showLabel={true} 
              showFlag={true}
            />

            {/* Desktop Booking Button */}
            <Link 
              href="/booking" 
              className={buttonClasses({
                isHovered: false,
                isFocused: false,
                isActive: false,
                isDisabled: false
              })}
              onClick={handleBookingClick}
              aria-label={buttonLabels.bookNowAriaLabel}
            >
              {buttonLabels.bookNow}
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className={tw(
              'md:hidden p-2 rounded-lg',
              'hover:bg-gray-100 transition-colors',
              'focus:outline-none focus:ring-2 focus:ring-primary-500',
              'focus:ring-offset-2'
            )}
            onClick={handleMobileMenuToggle}
            aria-label={isMenuOpen ? 'إغلاق القائمة' : 'فتح القائمة'}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6 text-gray-700" aria-hidden="true" />
            ) : (
              <Menu className="w-6 h-6 text-gray-700" aria-hidden="true" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div 
            id="mobile-menu"
            className={tw(
              'md:hidden py-4 border-t border-gray-200',
              'animate-in slide-in-from-top-2 duration-200'
            )}
            role="menu"
            aria-label="Mobile navigation menu"
          >
            <div className="flex flex-col space-y-4">
              {navigationItems.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={tw(
                    navLinkClasses({
                      isHovered: false,
                      isFocused: false,
                      isActive: false
                    }),
                    'block py-2'
                  )}
                  onClick={() => handleNavigationClick(link.href, link.label)}
                  role="menuitem"
                  aria-label={link.ariaLabel || link.label}
                >
                  {link.label}
                </Link>
              ))}
              
              {/* Mobile Language Switcher */}
              <div className="px-4 py-2">
                <LanguageSwitcher 
                  variant="button" 
                  size="md" 
                  showLabel={true} 
                  showFlag={true}
                />
              </div>
              
              <Link
                href="/booking"
                className={tw(
                  buttonClasses({
                    isHovered: false,
                    isFocused: false,
                    isActive: false,
                    isDisabled: false
                  }),
                  'inline-block text-center mt-4'
                )}
                onClick={handleBookingClick}
                role="menuitem"
                aria-label={buttonLabels.bookNowAriaLabel}
              >
                {buttonLabels.bookNow}
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}