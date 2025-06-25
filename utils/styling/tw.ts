/**
 * Tailwind CSS class composition utility
 * Provides type-safe class merging and composition to avoid repetition
 * Following Rabwa's clean code standards with clear abstraction
 */

import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Composes Tailwind CSS classes with intelligent merging
 * Handles conflicts and provides type-safe class composition
 * 
 * @param inputs - Class values to compose (strings, objects, arrays, etc.)
 * @returns Merged and optimized class string
 */
export function tw(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs))
}

/**
 * Creates a conditional class composer
 * Allows conditional class application with clean syntax
 * 
 * @param baseClasses - Base classes that are always applied
 * @returns Function that accepts conditional classes
 */
export function createClassComposer(baseClasses: string) {
  return (conditionalClasses: Record<string, boolean> = {}) => {
    const classes = [baseClasses]
    
    Object.entries(conditionalClasses).forEach(([className, condition]) => {
      if (condition) {
        classes.push(className)
      }
    })
    
    return tw(...classes)
  }
}

/**
 * Creates a responsive class composer
 * Provides responsive class variants for different breakpoints
 * 
 * @param baseClasses - Base classes for mobile
 * @param responsiveVariants - Classes for different breakpoints
 * @returns Function that generates responsive classes
 */
export function createResponsiveComposer(
  baseClasses: string,
  responsiveVariants: {
    sm?: string
    md?: string
    lg?: string
    xl?: string
    '2xl'?: string
  } = {}
) {
  return () => {
    const classes = [baseClasses]
    
    if (responsiveVariants.sm) classes.push(`sm:${responsiveVariants.sm}`)
    if (responsiveVariants.md) classes.push(`md:${responsiveVariants.md}`)
    if (responsiveVariants.lg) classes.push(`lg:${responsiveVariants.lg}`)
    if (responsiveVariants.xl) classes.push(`xl:${responsiveVariants.xl}`)
    if (responsiveVariants['2xl']) classes.push(`2xl:${responsiveVariants['2xl']}`)
    
    return tw(...classes)
  }
}

/**
 * Creates a state-based class composer
 * Provides classes for different component states
 * 
 * @param baseClasses - Base classes
 * @param stateClasses - Classes for different states
 * @returns Function that accepts current state
 */
export function createStateComposer(
  baseClasses: string,
  stateClasses: {
    hover?: string
    focus?: string
    active?: string
    disabled?: string
    loading?: string
    error?: string
    success?: string
    warning?: string
    info?: string
  } = {}
) {
  return (currentState: {
    isHovered?: boolean
    isFocused?: boolean
    isActive?: boolean
    isDisabled?: boolean
    isLoading?: boolean
    hasError?: boolean
    isSuccess?: boolean
    hasWarning?: boolean
    hasInfo?: boolean
  } = {}) => {
    const classes = [baseClasses]
    
    if (currentState.isHovered && stateClasses.hover) classes.push(stateClasses.hover)
    if (currentState.isFocused && stateClasses.focus) classes.push(stateClasses.focus)
    if (currentState.isActive && stateClasses.active) classes.push(stateClasses.active)
    if (currentState.isDisabled && stateClasses.disabled) classes.push(stateClasses.disabled)
    if (currentState.isLoading && stateClasses.loading) classes.push(stateClasses.loading)
    if (currentState.hasError && stateClasses.error) classes.push(stateClasses.error)
    if (currentState.isSuccess && stateClasses.success) classes.push(stateClasses.success)
    if (currentState.hasWarning && stateClasses.warning) classes.push(stateClasses.warning)
    if (currentState.hasInfo && stateClasses.info) classes.push(stateClasses.info)
    
    return tw(...classes)
  }
}

// ============================================================================
// PREDEFINED CLASS COMPOSERS
// ============================================================================

/**
 * Button class composer with comprehensive state handling
 * Provides consistent button styling across the application
 */
export const buttonClasses = createStateComposer(
  'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background',
  {
    hover: 'hover:bg-accent hover:text-accent-foreground',
    focus: 'focus:ring-2 focus:ring-primary-500',
    active: 'active:scale-95',
    disabled: 'opacity-50 cursor-not-allowed',
    loading: 'animate-pulse'
  }
)

/**
 * Input class composer with validation states
 * Provides consistent input styling with error handling
 */
export const inputClasses = createStateComposer(
  'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
  {
    focus: 'focus:ring-2 focus:ring-primary-500 focus:border-primary-500',
    error: 'border-red-500 focus:ring-red-500',
    success: 'border-green-500 focus:ring-green-500'
  }
)

/**
 * Card class composer with responsive design
 * Provides consistent card styling with responsive behavior
 */
export const cardClasses = createResponsiveComposer(
  'rounded-lg border bg-card text-card-foreground shadow-sm',
  {
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8'
  }
)

/**
 * Navigation link class composer
 * Provides consistent navigation styling with active states
 */
export const navLinkClasses = createStateComposer(
  'text-sm font-medium transition-colors hover:text-primary',
  {
    hover: 'hover:text-primary-600',
    active: 'text-primary-600 font-semibold',
    focus: 'focus:text-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2'
  }
)

/**
 * Container class composer with responsive max-widths
 * Provides consistent container sizing across breakpoints
 */
export const containerClasses = createResponsiveComposer(
  'w-full px-4 mx-auto',
  {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl'
  }
)

/**
 * Section class composer with consistent spacing
 * Provides consistent section styling with responsive padding
 */
export const sectionClasses = createResponsiveComposer(
  'py-12',
  {
    sm: 'py-16',
    md: 'py-20',
    lg: 'py-24',
    xl: 'py-28'
  }
)

/**
 * Heading class composer with responsive typography
 * Provides consistent heading styles with responsive sizing
 */
export const headingClasses = createResponsiveComposer(
  'font-bold text-gray-900',
  {
    sm: 'text-2xl',
    md: 'text-3xl',
    lg: 'text-4xl',
    xl: 'text-5xl'
  }
)

/**
 * Text class composer with responsive sizing
 * Provides consistent text styling with responsive behavior
 */
export const textClasses = createResponsiveComposer(
  'text-gray-600 leading-relaxed',
  {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl'
  }
)

/**
 * Grid class composer with responsive columns
 * Provides consistent grid layouts with responsive behavior
 */
export const gridClasses = createResponsiveComposer(
  'grid gap-4',
  {
    sm: 'grid-cols-1',
    md: 'grid-cols-2',
    lg: 'grid-cols-3',
    xl: 'grid-cols-4'
  }
)

/**
 * Flex class composer with responsive behavior
 * Provides consistent flex layouts with responsive adjustments
 */
export const flexClasses = createResponsiveComposer(
  'flex flex-col',
  {
    sm: 'flex-row',
    md: 'items-center',
    lg: 'justify-between'
  }
)

/**
 * Badge class composer with variant support
 * Provides consistent badge styling with different variants
 */
export const badgeClasses = createStateComposer(
  'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
  {
    hover: 'hover:bg-opacity-80',
    focus: 'focus:outline-none focus:ring-2 focus:ring-offset-2'
  }
)

/**
 * Alert class composer with type variants
 * Provides consistent alert styling with different message types
 */
export const alertClasses = createStateComposer(
  'relative w-full rounded-lg border p-4',
  {
    error: 'border-red-200 bg-red-50 text-red-800',
    success: 'border-green-200 bg-green-50 text-green-800',
    warning: 'border-yellow-200 bg-yellow-50 text-yellow-800',
    info: 'border-blue-200 bg-blue-50 text-blue-800'
  }
) 