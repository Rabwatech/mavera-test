/**
 * Custom hook for hydration-safe date formatting
 * Prevents server/client rendering mismatches by ensuring consistent date formatting
 * Following Rabwa's signature style with Greek prefix and comprehensive error handling
 */

import { useState, useEffect } from 'react'

/**
 * Date formatting options for consistent display
 * Ensures the same format is used on both server and client
 */
interface DateFormatOptions {
  locale: string
  format: 'short' | 'long' | 'numeric' | 'hijri'
  timeZone?: string
}

/**
 * Hydration state to track client-side rendering
 * Prevents hydration mismatches by waiting for client-side rendering
 */
interface HydrationState {
  isClient: boolean
  isHydrated: boolean
}

/**
 * Custom hook for hydration-safe date formatting
 * Provides consistent date formatting that prevents server/client mismatches
 * 
 * @param date - Date to format
 * @param options - Formatting options
 * @returns Formatted date string and hydration state
 */
export function useΩHydrationSafeDate(
  date: Date | string | number,
  options: Partial<DateFormatOptions> = {}
) {
  const [hydrationState, setHydrationState] = useState<HydrationState>({
    isClient: false,
    isHydrated: false
  })

  const defaultOptions: DateFormatOptions = {
    locale: 'ar-SA',
    format: 'short',
    timeZone: 'Asia/Riyadh'
  }

  const finalOptions = { ...defaultOptions, ...options }

  /**
   * Handles client-side hydration
   * Ensures consistent rendering after hydration
   */
  useEffect(() => {
    setHydrationState({
      isClient: true,
      isHydrated: true
    })
  }, [])

  /**
   * Formats date consistently for both server and client
   * Uses a fixed format to prevent hydration mismatches
   * 
   * @param dateInput - Date to format
   * @returns Consistently formatted date string
   */
  const formatDateSafely = (dateInput: Date | string | number): string => {
    try {
      const dateObject = new Date(dateInput)
      
      if (isNaN(dateObject.getTime())) {
        console.warn(`invalid-date-${Date.now()}`, {
          component: 'useΩHydrationSafeDate',
          input: dateInput,
          timestamp: new Date().toISOString()
        })
        return 'Invalid Date'
      }

      // Use a consistent format that works on both server and client
      switch (finalOptions.format) {
        case 'hijri':
          return formatHijriDate(dateObject, finalOptions.locale)
        case 'long':
          return formatLongDate(dateObject, finalOptions.locale)
        case 'numeric':
          return formatNumericDate(dateObject, finalOptions.locale)
        case 'short':
        default:
          return formatShortDate(dateObject, finalOptions.locale)
      }
    } catch (error) {
      console.error(`date-formatting-error-${Date.now()}`, {
        component: 'useΩHydrationSafeDate',
        input: dateInput,
        options: finalOptions,
        error: error instanceof Error ? error.message : String(error),
        timestamp: new Date().toISOString()
      })
      return 'Invalid Date'
    }
  }

  /**
   * Formats date in Hijri calendar format
   * Provides consistent Hijri date formatting
   */
  const formatHijriDate = (date: Date, locale: string): string => {
    // Use Intl.DateTimeFormat with u-ca-islamic for Hijri calendar
    const formatter = new Intl.DateTimeFormat(locale, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      calendar: 'islamic'
    })
    
    return formatter.format(date)
  }

  /**
   * Formats date in long format
   * Provides consistent long date formatting
   */
  const formatLongDate = (date: Date, locale: string): string => {
    const formatter = new Intl.DateTimeFormat(locale, {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
    
    return formatter.format(date)
  }

  /**
   * Formats date in numeric format
   * Provides consistent numeric date formatting
   */
  const formatNumericDate = (date: Date, locale: string): string => {
    const formatter = new Intl.DateTimeFormat(locale, {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    })
    
    return formatter.format(date)
  }

  /**
   * Formats date in short format
   * Provides consistent short date formatting
   */
  const formatShortDate = (date: Date, locale: string): string => {
    const formatter = new Intl.DateTimeFormat(locale, {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
    
    return formatter.format(date)
  }

  /**
   * Gets the formatted date with hydration safety
   * Returns a placeholder during server-side rendering to prevent mismatches
   */
  const getFormattedDate = (): string => {
    // During server-side rendering, return a placeholder
    if (!hydrationState.isClient) {
      return 'Loading...'
    }
    
    return formatDateSafely(date)
  }

  /**
   * Gets the current date in a hydration-safe manner
   * Useful for components that need the current date
   */
  const getCurrentDate = (): Date => {
    // During server-side rendering, return a fixed date to prevent mismatches
    if (!hydrationState.isClient) {
      return new Date('2024-01-01T00:00:00.000Z')
    }
    
    return new Date()
  }

  return {
    formattedDate: getFormattedDate(),
    currentDate: getCurrentDate(),
    isHydrated: hydrationState.isHydrated,
    isClient: hydrationState.isClient,
    formatDate: formatDateSafely
  }
}

/**
 * Utility function for hydration-safe date formatting
 * Can be used outside of React components
 * 
 * @param date - Date to format
 * @param options - Formatting options
 * @returns Formatted date string
 */
export function formatDateHydrationSafe(
  date: Date | string | number,
  options: Partial<DateFormatOptions> = {}
): string {
  const defaultOptions: DateFormatOptions = {
    locale: 'ar-SA',
    format: 'short',
    timeZone: 'Asia/Riyadh'
  }

  const finalOptions = { ...defaultOptions, ...options }

  try {
    const dateObject = new Date(date)
    
    if (isNaN(dateObject.getTime())) {
      return 'Invalid Date'
    }

    const formatter = new Intl.DateTimeFormat(finalOptions.locale, {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      timeZone: finalOptions.timeZone
    })
    
    return formatter.format(dateObject)
  } catch (error) {
    console.error(`date-formatting-error-${Date.now()}`, {
      component: 'formatDateHydrationSafe',
      input: date,
      options: finalOptions,
      error: error instanceof Error ? error.message : String(error),
      timestamp: new Date().toISOString()
    })
    return 'Invalid Date'
  }
} 