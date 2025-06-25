/**
 * Custom hook for navigation analytics and user interaction tracking
 * Provides comprehensive navigation event logging and analytics
 * Following Rabwa's signature style with Greek prefix and detailed logging
 */

import { useCallback } from 'react'
import { getLogger } from '@/lib/logger'
import { withErrorHandling } from '@/lib/errors'

/**
 * Navigation event types for analytics categorization
 * Helps in organizing and analyzing navigation patterns
 */
type NavigationEventType = 
  | 'page_view'
  | 'navigation_click'
  | 'mobile_menu_toggle'
  | 'booking_cta_click'
  | 'gallery_navigation'
  | 'contact_navigation'
  | 'external_link_click'

/**
 * Navigation context for detailed analytics
 * Provides rich context for navigation event analysis
 */
interface NavigationContext {
  fromPage: string
  toPage: string
  fromMobile: boolean
  userAgent: string
  viewport: {
    width: number
    height: number
  }
  sessionId?: string
  userId?: string
}

/**
 * Navigation analytics configuration
 * Allows customization of analytics behavior
 */
interface NavigationAnalyticsConfig {
  enableDetailedLogging: boolean
  enablePerformanceTracking: boolean
  enableUserBehaviorTracking: boolean
  logLevel: 'debug' | 'info' | 'warn' | 'error'
}

/**
 * Custom hook for comprehensive navigation analytics
 * Provides navigation event tracking with detailed context and performance monitoring
 */
export function useΨNavigationAnalytics(
  config: Partial<NavigationAnalyticsConfig> = {}
) {
  const logger = getLogger()
  
  const defaultConfig: NavigationAnalyticsConfig = {
    enableDetailedLogging: true,
    enablePerformanceTracking: true,
    enableUserBehaviorTracking: true,
    logLevel: 'info'
  }
  
  const finalConfig = { ...defaultConfig, ...config }

  /**
   * Tracks navigation events with comprehensive context
   * Logs navigation interactions for analytics and user behavior analysis
   * 
   * @param eventType - Type of navigation event
   * @param context - Navigation context and metadata
   * @param additionalData - Additional data for the event
   */
  const trackNavigationEvent = useCallback(
    withErrorHandling(async (
      eventType: NavigationEventType,
      context: Partial<NavigationContext>,
      additionalData: Record<string, any> = {}
    ) => {
      const startTime = performance.now()
      
      const navigationContext: NavigationContext = {
        fromPage: context.fromPage || window.location.pathname,
        toPage: context.toPage || window.location.pathname,
        fromMobile: context.fromMobile || window.innerWidth < 768,
        userAgent: context.userAgent || navigator.userAgent,
        viewport: context.viewport || {
          width: window.innerWidth,
          height: window.innerHeight
        },
        sessionId: context.sessionId,
        userId: context.userId
      }

      console.log(`navigation-event-${Date.now()}`, {
        component: 'useΨNavigationAnalytics',
        eventType,
        context: navigationContext,
        additionalData,
        timestamp: new Date().toISOString()
      })

      // Log navigation event
      if (finalConfig.enableDetailedLogging) {
        logger.info(`Navigation event: ${eventType}`, {
          component: 'useΨNavigationAnalytics',
          eventType,
          context: navigationContext,
          additionalData,
          timestamp: new Date().toISOString()
        }, 'user_action')
      }

      // Track user action for analytics
      if (finalConfig.enableUserBehaviorTracking) {
        logger.userAction(
          eventType,
          navigationContext.userId || 'anonymous',
          'navigation',
          `${eventType}-${navigationContext.toPage}`,
          {
            ...navigationContext,
            ...additionalData,
            timestamp: new Date().toISOString()
          }
        )
      }

      // Performance tracking
      if (finalConfig.enablePerformanceTracking) {
        const duration = performance.now() - startTime
        logger.info('Navigation event tracking completed', {
          component: 'useΨNavigationAnalytics',
          eventType,
          duration,
          timestamp: new Date().toISOString()
        }, 'performance')
      }
    }),
    [logger, finalConfig]
  )

  /**
   * Tracks page view events with comprehensive metadata
   * Logs page views for analytics and content performance analysis
   * 
   * @param pagePath - Path of the viewed page
   * @param pageTitle - Title of the viewed page
   * @param additionalData - Additional page view data
   */
  const trackPageView = useCallback(
    withErrorHandling(async (
      pagePath: string,
      pageTitle: string,
      additionalData: Record<string, any> = {}
    ) => {
      const navigationContext: NavigationContext = {
        fromPage: document.referrer ? new URL(document.referrer).pathname : 'direct',
        toPage: pagePath,
        fromMobile: window.innerWidth < 768,
        userAgent: navigator.userAgent,
        viewport: {
          width: window.innerWidth,
          height: window.innerHeight
        }
      }

      await trackNavigationEvent('page_view', navigationContext, {
        pageTitle,
        referrer: document.referrer,
        ...additionalData
      })
    }),
    [trackNavigationEvent]
  )

  /**
   * Tracks navigation link clicks with detailed context
   * Logs user navigation patterns for UX optimization
   * 
   * @param href - Destination URL
   * @param label - Link label or text
   * @param fromMobile - Whether click originated from mobile
   * @param additionalData - Additional click data
   */
  const trackNavigationClick = useCallback(
    withErrorHandling(async (
      href: string,
      label: string,
      fromMobile: boolean = false,
      additionalData: Record<string, any> = {}
    ) => {
      const navigationContext: NavigationContext = {
        fromPage: window.location.pathname,
        toPage: href,
        fromMobile,
        userAgent: navigator.userAgent,
        viewport: {
          width: window.innerWidth,
          height: window.innerHeight
        }
      }

      await trackNavigationEvent('navigation_click', navigationContext, {
        linkLabel: label,
        linkHref: href,
        ...additionalData
      })
    }),
    [trackNavigationEvent]
  )

  /**
   * Tracks mobile menu interactions
   * Logs mobile navigation patterns for mobile UX optimization
   * 
   * @param isOpen - Whether menu is being opened or closed
   * @param additionalData - Additional menu interaction data
   */
  const trackMobileMenuToggle = useCallback(
    withErrorHandling(async (
      isOpen: boolean,
      additionalData: Record<string, any> = {}
    ) => {
      const navigationContext: NavigationContext = {
        fromPage: window.location.pathname,
        toPage: window.location.pathname,
        fromMobile: true,
        userAgent: navigator.userAgent,
        viewport: {
          width: window.innerWidth,
          height: window.innerHeight
        }
      }

      await trackNavigationEvent('mobile_menu_toggle', navigationContext, {
        menuState: isOpen ? 'opened' : 'closed',
        ...additionalData
      })
    }),
    [trackNavigationEvent]
  )

  /**
   * Tracks booking call-to-action clicks
   * Logs booking funnel interactions for conversion optimization
   * 
   * @param source - Source of the booking CTA
   * @param fromMobile - Whether click originated from mobile
   * @param additionalData - Additional booking data
   */
  const trackBookingCTAClick = useCallback(
    withErrorHandling(async (
      source: string,
      fromMobile: boolean = false,
      additionalData: Record<string, any> = {}
    ) => {
      const navigationContext: NavigationContext = {
        fromPage: window.location.pathname,
        toPage: '/booking',
        fromMobile,
        userAgent: navigator.userAgent,
        viewport: {
          width: window.innerWidth,
          height: window.innerHeight
        }
      }

      await trackNavigationEvent('booking_cta_click', navigationContext, {
        ctaSource: source,
        ...additionalData
      })
    }),
    [trackNavigationEvent]
  )

  /**
   * Tracks external link clicks
   * Logs external navigation for security and analytics purposes
   * 
   * @param externalUrl - External URL being visited
   * @param linkText - Text of the external link
   * @param additionalData - Additional external link data
   */
  const trackExternalLinkClick = useCallback(
    withErrorHandling(async (
      externalUrl: string,
      linkText: string,
      additionalData: Record<string, any> = {}
    ) => {
      const navigationContext: NavigationContext = {
        fromPage: window.location.pathname,
        toPage: externalUrl,
        fromMobile: window.innerWidth < 768,
        userAgent: navigator.userAgent,
        viewport: {
          width: window.innerWidth,
          height: window.innerHeight
        }
      }

      await trackNavigationEvent('external_link_click', navigationContext, {
        externalUrl,
        linkText,
        ...additionalData
      })
    }),
    [trackNavigationEvent]
  )

  return {
    trackNavigationEvent,
    trackPageView,
    trackNavigationClick,
    trackMobileMenuToggle,
    trackBookingCTAClick,
    trackExternalLinkClick,
    config: finalConfig
  }
} 