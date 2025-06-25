'use client'

import { useEffect } from 'react'
import HeroSection from '@/components/sections/HeroSection'
import { AboutSection } from '@/components/sections/AboutSection'
import { ServicesSection } from '@/components/sections/ServicesSection'
import { GallerySection } from '@/components/sections/GallerySection'
import { TestimonialsSection } from '@/components/sections/TestimonialsSection'
import { ContactSection } from '@/components/sections/ContactSection'
import { useΨNavigationAnalytics } from '@/hooks/useΨNavigationAnalytics'

/**
 * Main home page component for Mavera Hall website
 * Renders all primary sections in a structured layout
 * Uses custom hooks for analytics and follows Rabwa's clean code standards
 */
export default function HomePage() {
  /**
   * Navigation analytics hook for tracking page views and user interactions
   * Provides comprehensive analytics for page performance analysis
   */
  const { trackPageView } = useΨNavigationAnalytics()

  /**
   * Logs page load and component mounting for analytics
   * Tracks page view events for content performance analysis
   */
  useEffect(() => {
    const logPageLoad = async () => {
      await trackPageView('/', 'Mavera Hall - قاعة مافيرا', {
        page: 'Home',
        url: window.location.href,
        userAgent: navigator.userAgent,
        timestamp: new Date().toISOString(),
        viewport: {
          width: window.innerWidth,
          height: window.innerHeight
        }
      })
    }

    logPageLoad()
  }, [trackPageView])

  return (
    <main role="main" className="min-h-screen">
      {/* Hero Section - Primary landing area */}
      <HeroSection />
      
      {/* About Section - Company information and statistics */}
      <AboutSection />
      
      {/* Services Section - Available services and offerings */}
      <ServicesSection />
      
      {/* Gallery Section - Visual showcase of events and venue */}
      <GallerySection />
      
      {/* Testimonials Section - Customer reviews and feedback */}
      <TestimonialsSection />
      
      {/* Contact Section - Contact form and information */}
      <ContactSection />
    </main>
  )
}