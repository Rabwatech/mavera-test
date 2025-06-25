'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { useState, useEffect } from 'react'
import { getLogger } from '@/lib/logger'
import { withErrorHandling } from '@/lib/errors'

interface QueryProviderProps {
  children: React.ReactNode
}

/**
 * React Query provider component that configures global query settings
 * Provides caching, error handling, and development tools for data fetching
 */
export function QueryProvider({ children }: QueryProviderProps) {
  const logger = getLogger()

  /**
   * Creates and configures the QueryClient with optimized settings
   * Includes error handling, retry logic, and caching strategies
   */
  const [queryClient] = useState(
    () => {
      const client = new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000, // 1 minute - data considered fresh
            gcTime: 10 * 60 * 1000, // 10 minutes - garbage collection time
            retry: (failureCount, error) => {
              // Custom retry logic with logging
              if (failureCount < 3) {
                logger.warn('Query retry attempt', {
                  failureCount,
                  error: error.message,
                  timestamp: new Date().toISOString()
                }, 'api')
                return true
              }
              return false
            },
            refetchOnWindowFocus: false,
            refetchOnReconnect: true,
            refetchOnMount: true,
          },
          mutations: {
            retry: 1,
            onError: (error) => {
              logger.error('Mutation error occurred', error instanceof Error ? error : new Error(String(error)), {
                timestamp: new Date().toISOString()
              }, 'api')
            },
          },
        },

      })

      // Global error handler for unhandled query errors is handled in individual query hooks

      return client
    }
  )

  /**
   * Logs provider initialization for monitoring
   */
  useEffect(() => {
    const logProviderInit = withErrorHandling(async () => {
      logger.info('React Query provider initialized', {
        component: 'QueryProvider',
        queryClientConfig: {
          staleTime: '1 minute',
          gcTime: '10 minutes',
          retryAttempts: 3,
          refetchOnWindowFocus: false
        },
        timestamp: new Date().toISOString()
      }, 'system')
    })

    logProviderInit()
  }, [])

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {/* Development tools - only shown in development mode */}
      {process.env.NODE_ENV === 'development' && (
        <ReactQueryDevtools 
          initialIsOpen={false}
        />
      )}
    </QueryClientProvider>
  )
}