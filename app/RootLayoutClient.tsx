'use client'

import { useΦApplicationInitialization } from '@/hooks/useΦApplicationInitialization'
import Navbar from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { QueryProvider } from '@/components/providers/QueryProvider'

/**
 * Client-side root layout component that wraps the entire application
 * Provides global providers, navigation, and footer structure
 * Uses custom hooks for initialization and lifecycle management
 * Following Rabwa's clean code standards with clear separation of concerns
 */
export function RootLayoutClient({ children }: { children: React.ReactNode }) {
  /**
   * Initialize application with comprehensive logging and analytics
   * Handles performance monitoring and user session tracking
   */
  const { isInitialized, sessionId, config } = useΦApplicationInitialization({
    enablePerformanceTracking: true,
    enableAnalytics: true,
    enableErrorBoundary: true,
    logLevel: 'info'
  })

  return (
    <QueryProvider>
      <div className="min-h-screen flex flex-col bg-white">
        {/* Main Navigation */}
        <Navbar />
        
        {/* Main Content Area */}
        <main className="flex-1" role="main">
          {children}
        </main>
        
        {/* Site Footer */}
        <Footer />
      </div>
    </QueryProvider>
  )
}