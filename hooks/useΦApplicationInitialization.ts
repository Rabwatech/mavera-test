/**
 * Custom hook for application initialization and lifecycle management
 * Handles logging, analytics tracking, and performance monitoring
 * Following Rabwa's signature style with Greek prefix and comprehensive logging
 */

import { useEffect, useCallback, useMemo } from 'react'
import { getLogger } from '@/lib/logger'
import { withErrorHandling } from '@/lib/errors'

/**
 * Extended Performance interface for Chrome-specific memory API
 * Provides access to memory usage information when available
 */
interface ExtendedPerformance extends Performance {
  memory?: {
    usedJSHeapSize: number
    totalJSHeapSize: number
    jsHeapSizeLimit: number
  }
}

/**
 * Application initialization state and configuration
 * Tracks various initialization metrics and user context
 */
interface ApplicationInitializationState {
  isInitialized: boolean
  initializationTimestamp: string
  userAgent: string
  viewportDimensions: {
    width: number
    height: number
  }
  language: string
  platform: string
  sessionId: string
  performanceMetrics: {
    loadTime: number
    memoryUsage: number
  }
}

/**
 * Application initialization configuration options
 * Allows customization of initialization behavior
 */
interface ApplicationInitializationConfig {
  enablePerformanceTracking: boolean
  enableAnalytics: boolean
  enableErrorBoundary: boolean
  logLevel: 'debug' | 'info' | 'warn' | 'error'
}

/**
 * Custom hook for comprehensive application initialization
 * Provides application lifecycle management with detailed logging and analytics
 */
export function useΦApplicationInitialization(
  config: Partial<ApplicationInitializationConfig> = {}
) {
  const logger = getLogger()
  
  const defaultConfig: ApplicationInitializationConfig = {
    enablePerformanceTracking: true,
    enableAnalytics: true,
    enableErrorBoundary: true,
    logLevel: 'info'
  }
  
  const finalConfig = useMemo(() => ({ ...defaultConfig, ...config }), [config])

  /**
   * Generates unique session identifier for user tracking
   * Creates consistent session ID for analytics and logging
   */
  const generateSessionId = useCallback((): string => {
    const timestamp = Date.now()
    const randomSuffix = Math.random().toString(36).substring(2, 15)
    return `session-${timestamp}-${randomSuffix}`
  }, [])

  /**
   * Captures initial application state and user context
   * Collects comprehensive initialization data for analytics
   */
  const captureInitialState = useCallback((): ApplicationInitializationState => {
    const startTime = performance.now()
    
    console.log(`capture-initial-state-${Date.now()}`, {
      component: 'useΦApplicationInitialization',
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      viewport: {
        width: window.innerWidth,
        height: window.innerHeight
      },
      language: navigator.language,
      platform: navigator.platform
    })

    return {
      isInitialized: false,
      initializationTimestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      viewportDimensions: {
        width: window.innerWidth,
        height: window.innerHeight
      },
      language: navigator.language,
      platform: navigator.platform,
      sessionId: generateSessionId(),
      performanceMetrics: {
        loadTime: 0,
        memoryUsage: 0
      }
    }
  }, [generateSessionId])

  /**
   * Performs comprehensive application initialization
   * Handles logging, analytics, and performance monitoring
   */
  const initializeApplication = useCallback(
    withErrorHandling(async (initialState: ApplicationInitializationState) => {
      const startTime = performance.now()
      
      logger.info('Application initialization started', {
        component: 'useΦApplicationInitialization',
        sessionId: initialState.sessionId,
        timestamp: new Date().toISOString(),
        config: finalConfig
      }, 'system')

      // Track application start for analytics
      if (finalConfig.enableAnalytics) {
        logger.userAction(
          'application_start',
          'anonymous',
          'system',
          'app-initialization',
          {
            sessionId: initialState.sessionId,
            timestamp: new Date().toISOString(),
            userAgent: initialState.userAgent,
            viewport: initialState.viewportDimensions,
            language: initialState.language,
            platform: initialState.platform
          }
        )
      }

      // Performance monitoring
      if (finalConfig.enablePerformanceTracking) {
        const loadTime = performance.now() - startTime
        const extendedPerformance = performance as ExtendedPerformance
        const memoryUsage = extendedPerformance.memory?.usedJSHeapSize || 0
        
        logger.info('Application initialization completed', {
          component: 'useΦApplicationInitialization',
          sessionId: initialState.sessionId,
          performance: {
            loadTime,
            memoryUsage,
            timestamp: new Date().toISOString()
          }
        }, 'performance')
      }

      return {
        ...initialState,
        isInitialized: true,
        performanceMetrics: {
          loadTime: performance.now() - startTime,
          memoryUsage: (performance as ExtendedPerformance).memory?.usedJSHeapSize || 0
        }
      }
    }),
    [logger, finalConfig, generateSessionId]
  )

  /**
   * Handles application cleanup and finalization
   * Logs session end and cleanup metrics
   */
  const cleanupApplication = useCallback(
    withErrorHandling(async (sessionId: string) => {
      logger.info('Application cleanup initiated', {
        component: 'useΦApplicationInitialization',
        sessionId,
        timestamp: new Date().toISOString()
      }, 'system')

      // Track session end for analytics
      if (finalConfig.enableAnalytics) {
        logger.userAction(
          'application_end',
          'anonymous',
          'system',
          'app-cleanup',
          {
            sessionId,
            timestamp: new Date().toISOString(),
            duration: Date.now() - Date.parse(new Date().toISOString())
          }
        )
      }
    }),
    [logger, finalConfig]
  )

  /**
   * Handles viewport changes and responsive behavior
   * Logs viewport updates for responsive design analytics
   */
  const handleViewportChange = useCallback(
    withErrorHandling(async (sessionId: string) => {
      const newDimensions = {
        width: window.innerWidth,
        height: window.innerHeight
      }

      logger.debug('Viewport dimensions changed', {
        component: 'useΦApplicationInitialization',
        sessionId,
        viewport: newDimensions,
        timestamp: new Date().toISOString()
      }, 'user_action')
    }),
    [logger]
  )

  /**
   * Main initialization effect
   * Orchestrates the complete application initialization process
   */
  useEffect(() => {
    const performInitialization = async () => {
      const initialState = captureInitialState()
      const finalState = await initializeApplication(initialState)
      
      // Set up viewport change listener
      const handleResize = () => handleViewportChange(finalState.sessionId)
      window.addEventListener('resize', handleResize)

      // Cleanup function
      return () => {
        window.removeEventListener('resize', handleResize)
        cleanupApplication(finalState.sessionId)
      }
    }

    performInitialization()
  }, [captureInitialState, initializeApplication, handleViewportChange, cleanupApplication])

  return {
    isInitialized: true,
    sessionId: generateSessionId(),
    config: finalConfig
  }
} 