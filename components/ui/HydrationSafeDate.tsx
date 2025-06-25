/**
 * Hydration-safe date display component
 * Prevents server/client rendering mismatches for date formatting
 * Following Rabwa's clean code standards with comprehensive error handling
 */

import { useΩHydrationSafeDate } from '@/hooks/useΩHydrationSafeDate'
import { tw } from '@/utils/styling/tw'

/**
 * Props for the HydrationSafeDate component
 * Provides flexible date formatting options
 */
interface HydrationSafeDateProps {
  date: Date | string | number
  format?: 'short' | 'long' | 'numeric' | 'hijri'
  locale?: string
  timeZone?: string
  className?: string
  showLoadingState?: boolean
  loadingText?: string
}

/**
 * Hydration-safe date display component
 * Ensures consistent date formatting between server and client rendering
 * Prevents hydration errors caused by locale-dependent date formatting
 */
export function HydrationSafeDate({
  date,
  format = 'short',
  locale = 'ar-SA',
  timeZone = 'Asia/Riyadh',
  className = '',
  showLoadingState = true,
  loadingText = 'Loading...'
}: HydrationSafeDateProps) {
  /**
   * Hydration-safe date formatting hook
   * Handles server/client rendering consistency
   */
  const { formattedDate, isHydrated, isClient } = useΩHydrationSafeDate(date, {
    locale,
    format,
    timeZone
  })

  /**
   * Determines what text to display
   * Shows loading state during server-side rendering to prevent hydration mismatches
   */
  const displayText = (() => {
    // During server-side rendering, show loading state
    if (!isClient && showLoadingState) {
      return loadingText
    }
    
    // After hydration, show the formatted date
    return formattedDate
  })()

  return (
    <span 
      className={tw(
        'inline-block',
        // Add subtle animation when hydration completes
        isHydrated ? 'animate-in fade-in duration-300' : '',
        className
      )}
      // Add data attributes for debugging
      data-hydrated={isHydrated}
      data-client={isClient}
      data-format={format}
      data-locale={locale}
    >
      {displayText}
    </span>
  )
}

/**
 * Current date display component
 * Shows the current date in a hydration-safe manner
 */
export function CurrentDate({
  format = 'short',
  locale = 'ar-SA',
  timeZone = 'Asia/Riyadh',
  className = '',
  showLoadingState = true,
  loadingText = 'Loading...'
}: Omit<HydrationSafeDateProps, 'date'>) {
  return (
    <HydrationSafeDate
      date={new Date()}
      format={format}
      locale={locale}
      timeZone={timeZone}
      className={className}
      showLoadingState={showLoadingState}
      loadingText={loadingText}
    />
  )
}

/**
 * Hijri date display component
 * Shows dates in Hijri calendar format with hydration safety
 */
export function HijriDate({
  date,
  locale = 'ar-SA',
  timeZone = 'Asia/Riyadh',
  className = '',
  showLoadingState = true,
  loadingText = 'Loading...'
}: Omit<HydrationSafeDateProps, 'format'>) {
  return (
    <HydrationSafeDate
      date={date}
      format="hijri"
      locale={locale}
      timeZone={timeZone}
      className={className}
      showLoadingState={showLoadingState}
      loadingText={loadingText}
    />
  )
} 