'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ArrowRight, Calendar } from 'lucide-react'
import { useΨNavigationAnalytics } from '@/hooks/useΨNavigationAnalytics'
import { useΦTranslations } from '@/hooks/useΦTranslations'
import { tw, buttonClasses, headingClasses, textClasses } from '@/utils/styling/tw'

/**
 * Hero section component for the main landing page
 * Displays the main call-to-action and introduction to Mavera Hall
 * Uses custom hooks for analytics and follows Rabwa's clean code standards
 */
export default function HeroSection() {
  const [isLoaded, setIsLoaded] = useState(false)
  
  /**
   * Navigation analytics hook for tracking user interactions
   * Provides comprehensive navigation event logging
   */
  const { trackBookingCTAClick, trackNavigationClick } = useΨNavigationAnalytics()

  /**
   * Translation hook for accessing multilingual content
   * Provides language-specific text and labels
   */
  const { hero } = useΦTranslations()

  /**
   * Initializes component state and triggers entrance animation
   * Handles the component mounting lifecycle
   */
  useEffect(() => {
    // Trigger entrance animation after component mount
    const timer = setTimeout(() => {
      setIsLoaded(true)
    }, 100)

    return () => clearTimeout(timer)
  }, [])

  /**
   * Handles booking button click with comprehensive analytics tracking
   * Logs booking CTA interactions for conversion optimization
   */
  const handleBookingClick = async () => {
    await trackBookingCTAClick('hero_section', false, {
      component: 'HeroSection',
      action: 'booking_navigation',
      timestamp: new Date().toISOString()
    })
  }

  /**
   * Handles gallery button click with analytics tracking
   * Logs gallery navigation for content engagement analysis
   */
  const handleGalleryClick = async () => {
    await trackNavigationClick('/gallery', 'Gallery', false, {
      component: 'HeroSection',
      action: 'gallery_navigation',
      timestamp: new Date().toISOString()
    })
  }

  return (
    <section className={tw(
      'relative min-h-screen flex items-center justify-center',
      'overflow-hidden'
    )}>
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="https://images.pexels.com/photos/30311728/pexels-photo-30311728.jpeg"
          alt="Elegant hall interior with modern design and warm lighting"
          className="w-full h-full object-cover"
          loading="eager"
        />
      </div>
      
      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-black/40"></div>
      
      {/* Content */}
      <div className="container-custom relative z-10 text-center">
        <div className={tw(
          'transition-all duration-1000',
          isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        )}>
          <h1 className={tw(
            headingClasses(),
            'text-white mb-6'
          )}>
            {hero.title}
            <span className={tw(
              'block text-primary-200 text-3xl md:text-4xl lg:text-5xl mt-2'
            )}>
              {hero.subtitle}
            </span>
          </h1>
          
          <p className={tw(
            textClasses(),
            'text-white/90 mb-4 font-medium'
          )}>
            {hero.tagline}
          </p>
          
          <p className={tw(
            textClasses(),
            'text-white/80 mb-12 max-w-3xl mx-auto leading-relaxed'
          )}>
            {hero.description}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link 
              href="/booking" 
              onClick={handleBookingClick}
              className={tw(
                buttonClasses({
                  isHovered: false,
                  isFocused: false,
                  isActive: false,
                  isDisabled: false
                }),
                'group inline-flex items-center gap-3 text-lg px-8 py-4',
                'bg-white text-primary-900 hover:bg-primary-50',
                'border-2 border-white hover:border-primary-200'
              )}
              aria-label={hero.bookNowAriaLabel}
            >
              {hero.bookNowButton}
              <Calendar className="w-5 h-5 group-hover:scale-110 transition-transform" />
            </Link>
            
            <Link 
              href="/gallery" 
              onClick={handleGalleryClick}
              className={tw(
                'inline-flex items-center gap-3',
                'text-white hover:text-primary-200',
                'font-semibold text-lg group transition-colors',
                'focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-transparent'
              )}
              aria-label={hero.exploreGalleryAriaLabel}
            >
              {hero.exploreGalleryButton}
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
      
      {/* Decorative Elements */}
      <div 
        className={tw(
          'absolute top-20 left-10 w-20 h-20',
          'bg-white/20 rounded-full opacity-60 animate-pulse'
        )} 
        aria-hidden="true"
      ></div>
      <div 
        className={tw(
          'absolute bottom-20 right-10 w-16 h-16',
          'bg-primary-200/30 rounded-full opacity-60 animate-pulse delay-1000'
        )} 
        aria-hidden="true"
      ></div>
      <div 
        className={tw(
          'absolute top-1/2 left-5 w-12 h-12',
          'bg-white/30 rounded-full opacity-40 animate-bounce'
        )} 
        aria-hidden="true"
      ></div>
    </section>
  )
}