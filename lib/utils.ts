/**
 * Utility functions following clean code principles
 * Each function has a single responsibility and comprehensive error handling
 */

import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { DATE_FORMATS, CURRENCY_CONFIG } from './constants';

// ============================================================================
// STYLING UTILITIES
// ============================================================================

/**
 * Combines and merges Tailwind CSS classes intelligently
 * Resolves conflicts and removes duplicates for optimal styling
 * 
 * @param inputs - Array of class values to merge
 * @returns Optimized class string with conflicts resolved
 */
export function combineClassNames(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

// Maintain backward compatibility with existing code
export const tw = combineClassNames;
export const cn = combineClassNames;

// ============================================================================
// DATE AND TIME FORMATTING UTILITIES
// ============================================================================

/**
 * Safely converts various date inputs to Date object
 * Handles edge cases and provides meaningful error messages
 * 
 * @param dateInput - Date string, Date object, or timestamp
 * @returns Valid Date object or throws descriptive error
 */
function createSafeDateObject(dateInput: Date | string | number): Date {
  try {
    const dateObject = new Date(dateInput);
    
    if (isNaN(dateObject.getTime())) {
      throw new Error(`Invalid date input: ${dateInput}`);
    }
    
    return dateObject;
  } catch (error) {
    console.error('date-conversion-error', {
      input: dateInput,
      error: error instanceof Error ? error.message : String(error),
      timestamp: new Date().toISOString(),
    });
    throw new Error(`Unable to parse date: ${dateInput}`);
  }
}

/**
 * Formats date in human-readable long format
 * Example: "December 25, 2023"
 * 
 * @param dateInput - Date to format
 * @param locale - Locale for formatting (defaults to 'en-US')
 * @returns Formatted date string
 */
export function formatDateInLongFormat(
  dateInput: Date | string | number,
  locale: string = 'en-US'
): string {
  try {
    const dateObject = createSafeDateObject(dateInput);
    return dateObject.toLocaleDateString(locale, DATE_FORMATS.longDate);
  } catch (error) {
    console.error('date-formatting-error', {
      input: dateInput,
      locale,
      error: error instanceof Error ? error.message : String(error),
      timestamp: new Date().toISOString(),
    });
    return 'Invalid Date';
  }
}

/**
 * Formats date in short format
 * Example: "Dec 25, 2023"
 * 
 * @param dateInput - Date to format
 * @param locale - Locale for formatting (defaults to 'en-US')
 * @returns Formatted date string
 */
export function formatDateInShortFormat(
  dateInput: Date | string | number,
  locale: string = 'en-US'
): string {
  try {
    const dateObject = createSafeDateObject(dateInput);
    return dateObject.toLocaleDateString(locale, DATE_FORMATS.shortDate);
  } catch (error) {
    console.error('date-formatting-error', {
      input: dateInput,
      locale,
      error: error instanceof Error ? error.message : String(error),
      timestamp: new Date().toISOString(),
    });
    return 'Invalid Date';
  }
}

/**
 * Formats date and time in comprehensive format
 * Example: "December 25, 2023 at 02:30 PM"
 * 
 * @param dateInput - Date to format
 * @param locale - Locale for formatting (defaults to 'en-US')
 * @returns Formatted date and time string
 */
export function formatDateTimeInFullFormat(
  dateInput: Date | string | number,
  locale: string = 'en-US'
): string {
  try {
    const dateObject = createSafeDateObject(dateInput);
    return dateObject.toLocaleString(locale, DATE_FORMATS.dateTime);
  } catch (error) {
    console.error('datetime-formatting-error', {
      input: dateInput,
      locale,
      error: error instanceof Error ? error.message : String(error),
      timestamp: new Date().toISOString(),
    });
    return 'Invalid Date';
  }
}

/**
 * Formats time only in readable format
 * Example: "02:30 PM"
 * 
 * @param dateInput - Date to extract time from
 * @param locale - Locale for formatting (defaults to 'en-US')
 * @returns Formatted time string
 */
export function formatTimeOnly(
  dateInput: Date | string | number,
  locale: string = 'en-US'
): string {
  try {
    const dateObject = createSafeDateObject(dateInput);
    return dateObject.toLocaleTimeString(locale, DATE_FORMATS.timeOnly);
  } catch (error) {
    console.error('time-formatting-error', {
      input: dateInput,
      locale,
      error: error instanceof Error ? error.message : String(error),
      timestamp: new Date().toISOString(),
    });
    return 'Invalid Time';
  }
}

// Maintain backward compatibility with existing code
export const formatDate = formatDateInLongFormat;
export const formatDateTime = formatDateTimeInFullFormat;

// ============================================================================
// CURRENCY AND NUMBER FORMATTING UTILITIES
// ============================================================================

/**
 * Formats currency amounts with proper localization
 * Handles various number inputs and provides consistent formatting
 * 
 * @param amount - Numeric amount to format
 * @param currencyCode - Currency code (defaults to USD)
 * @param locale - Locale for formatting (defaults to en-US)
 * @returns Formatted currency string
 */
export function formatCurrencyAmount(
  amount: number,
  currencyCode: string = CURRENCY_CONFIG.currency,
  locale: string = CURRENCY_CONFIG.locale
): string {
  try {
    if (typeof amount !== 'number' || isNaN(amount)) {
      throw new Error(`Invalid amount: ${amount}`);
    }
    
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: currencyCode,
      minimumFractionDigits: CURRENCY_CONFIG.minimumFractionDigits,
    maximumFractionDigits: CURRENCY_CONFIG.maximumFractionDigits,
    }).format(amount);
  } catch (error) {
    console.error('currency-formatting-error', {
      amount,
      currencyCode,
      locale,
      error: error instanceof Error ? error.message : String(error),
      timestamp: new Date().toISOString(),
    });
    return `${currencyCode} ${amount.toFixed(2)}`;
  }
}

/**
 * Formats large numbers with appropriate suffixes
 * Example: 1500 -> "1.5K", 1500000 -> "1.5M"
 * 
 * @param number - Number to format
 * @returns Formatted number string with suffix
 */
export function formatLargeNumber(number: number): string {
  try {
    if (typeof number !== 'number' || isNaN(number)) {
      throw new Error(`Invalid number: ${number}`);
    }
    
    const absNumber = Math.abs(number);
    const sign = number < 0 ? '-' : '';
    
    if (absNumber >= 1000000000) {
      return `${sign}${(absNumber / 1000000000).toFixed(1)}B`;
    }
    if (absNumber >= 1000000) {
      return `${sign}${(absNumber / 1000000).toFixed(1)}M`;
    }
    if (absNumber >= 1000) {
      return `${sign}${(absNumber / 1000).toFixed(1)}K`;
    }
    
    return number.toString();
  } catch (error) {
    console.error('number-formatting-error', {
      number,
      error: error instanceof Error ? error.message : String(error),
      timestamp: new Date().toISOString(),
    });
    return number.toString();
  }
}

// ============================================================================
// STRING MANIPULATION UTILITIES
// ============================================================================

/**
 * Converts text to URL-friendly slug format
 * Handles special characters, spaces, and maintains readability
 * 
 * @param text - Text to convert to slug
 * @param maxLength - Maximum length of the slug (optional)
 * @returns URL-friendly slug string
 */
export function convertTextToUrlSlug(
  text: string,
  maxLength?: number
): string {
  try {
    if (typeof text !== 'string') {
      throw new Error(`Invalid text input: ${text}`);
    }
    
    let slug = text
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '') // Remove special characters
      .replace(/[\s_-]+/g, '-') // Replace spaces and underscores with hyphens
      .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
    
    if (maxLength && slug.length > maxLength) {
      slug = slug.substring(0, maxLength).replace(/-+$/, '');
    }
    
    return slug || 'untitled';
  } catch (error) {
    console.error('slug-generation-error', {
      text,
      maxLength,
      error: error instanceof Error ? error.message : String(error),
      timestamp: new Date().toISOString(),
    });
    return 'untitled';
  }
}

/**
 * Capitalizes the first letter of each word in a string
 * Useful for proper name formatting and titles
 * 
 * @param text - Text to capitalize
 * @returns Text with each word capitalized
 */
export function capitalizeWordsInText(text: string): string {
  try {
    if (typeof text !== 'string') {
      throw new Error(`Invalid text input: ${text}`);
    }
    
    return text
      .toLowerCase()
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  } catch (error) {
    console.error('text-capitalization-error', {
      text,
      error: error instanceof Error ? error.message : String(error),
      timestamp: new Date().toISOString(),
    });
    return text;
  }
}

/**
 * Truncates text to specified length with ellipsis
 * Ensures text doesn't break in the middle of words
 * 
 * @param text - Text to truncate
 * @param maxLength - Maximum length before truncation
 * @param suffix - Suffix to add when truncated (defaults to '...')
 * @returns Truncated text with suffix if needed
 */
export function truncateTextSafely(
  text: string,
  maxLength: number,
  suffix: string = '...'
): string {
  try {
    if (typeof text !== 'string') {
      throw new Error(`Invalid text input: ${text}`);
    }
    
    if (text.length <= maxLength) {
      return text;
    }
    
    const truncated = text.substring(0, maxLength - suffix.length);
    const lastSpaceIndex = truncated.lastIndexOf(' ');
    
    // If there's a space near the end, truncate at the space to avoid breaking words
    if (lastSpaceIndex > maxLength * 0.8) {
      return truncated.substring(0, lastSpaceIndex) + suffix;
    }
    
    return truncated + suffix;
  } catch (error) {
    console.error('text-truncation-error', {
      text,
      maxLength,
      suffix,
      error: error instanceof Error ? error.message : String(error),
      timestamp: new Date().toISOString(),
    });
    return text;
  }
}

// Maintain backward compatibility with existing code
export const slugify = convertTextToUrlSlug;

// ============================================================================
// ID GENERATION UTILITIES
// ============================================================================

/**
 * Generates cryptographically secure random ID
 * More secure than Math.random() for sensitive applications
 * 
 * @param length - Length of the generated ID (defaults to 12)
 * @param prefix - Optional prefix for the ID
 * @returns Secure random ID string
 */
export function generateSecureRandomId(
  length: number = 12,
  prefix?: string
): string {
  try {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    
    // Use crypto.getRandomValues if available (browser environment)
    if (typeof crypto !== 'undefined' && crypto.getRandomValues) {
      const array = new Uint8Array(length);
      crypto.getRandomValues(array);
      
      for (let i = 0; i < length; i++) {
        result += characters[array[i] % characters.length];
      }
    } else {
      // Fallback to Math.random for Node.js environment
      for (let i = 0; i < length; i++) {
        result += characters[Math.floor(Math.random() * characters.length)];
      }
    }
    
    return prefix ? `${prefix}_${result}` : result;
  } catch (error) {
    console.error('id-generation-error', {
      length,
      prefix,
      error: error instanceof Error ? error.message : String(error),
      timestamp: new Date().toISOString(),
    });
    
    // Fallback to timestamp-based ID
    const fallbackId = Date.now().toString(36) + Math.random().toString(36).substr(2);
    return prefix ? `${prefix}_${fallbackId}` : fallbackId;
  }
}

/**
 * Generates timestamp-based ID for debugging and logging
 * Useful for tracking and correlating events
 * 
 * @param prefix - Optional prefix for the ID
 * @returns Timestamp-based ID string
 */
export function generateTimestampId(prefix?: string): string {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substr(2, 5);
  const id = `${timestamp}_${random}`;
  
  return prefix ? `${prefix}_${id}` : id;
}

// Maintain backward compatibility with existing code
export const generateId = generateSecureRandomId;

// ============================================================================
// UTILITY TYPE GUARDS
// ============================================================================

/**
 * Type guard to check if a value is a valid Date object
 * Useful for runtime type checking and validation
 * 
 * @param value - Value to check
 * @returns True if value is a valid Date object
 */
export function isValidDate(value: unknown): value is Date {
  return value instanceof Date && !isNaN(value.getTime());
}

/**
 * Type guard to check if a value is a non-empty string
 * Useful for form validation and data processing
 * 
 * @param value - Value to check
 * @returns True if value is a non-empty string
 */
export function isNonEmptyString(value: unknown): value is string {
  return typeof value === 'string' && value.trim().length > 0;
}

/**
 * Type guard to check if a value is a positive number
 * Useful for quantity and price validation
 * 
 * @param value - Value to check
 * @returns True if value is a positive number
 */
export function isPositiveNumber(value: unknown): value is number {
  return typeof value === 'number' && !isNaN(value) && value > 0;
}