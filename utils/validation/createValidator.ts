/**
 * Reusable validation utilities following DRY principles
 * Provides type-safe validation functions with comprehensive error handling
 * Following Rabwa's clean code standards with clear abstraction
 */

import { VALIDATION_PATTERNS, PASSWORD_REQUIREMENTS } from '@/lib/constants'

/**
 * Validation result structure with detailed feedback
 * Provides comprehensive validation information for form handling
 */
export interface ValidationResult<T = any> {
  isValid: boolean
  value: T
  errors: string[]
  warnings: string[]
  fieldName?: string
  timestamp: string
}

/**
 * Validation function type signature
 * Generic validation function that can handle any input type
 */
export type ValidationFunction<T> = (value: T) => ValidationResult<T>

/**
 * Validation rule configuration
 * Defines validation behavior and error messages
 */
export interface ValidationRule<T> {
  validator: ValidationFunction<T>
  errorMessage: string
  warningMessage?: string
  isRequired?: boolean
}

/**
 * Creates a validator function from a regular expression pattern
 * Implements DRY principle by abstracting common validation patterns
 * 
 * @param pattern - Regular expression to test against
 * @param errorMessage - Error message for failed validation
 * @param warningMessage - Optional warning message
 * @returns Validation function that can be used across the application
 */
export function createPatternValidator<T extends string>(
  pattern: RegExp,
  errorMessage: string,
  warningMessage?: string
): ValidationFunction<T> {
  return (value: T): ValidationResult<T> => {
    const timestamp = new Date().toISOString()
    const isValid = pattern.test(value) && value.length > 0
    const errors: string[] = []
    const warnings: string[] = []

    if (!isValid) {
      errors.push(errorMessage)
    } else if (warningMessage) {
      warnings.push(warningMessage)
    }

    console.log(`pattern-validation-${Date.now()}`, {
      component: 'createPatternValidator',
      pattern: pattern.source,
      value: value.substring(0, 10) + '...', // Log partial value for security
      isValid,
      timestamp
    })

    return {
      isValid,
      value,
      errors,
      warnings,
      timestamp
    }
  }
}

/**
 * Creates a required field validator
 * Ensures field is not empty and meets minimum requirements
 * 
 * @param errorMessage - Error message for empty field
 * @returns Validation function for required fields
 */
export function createRequiredValidator<T>(
  errorMessage: string = 'This field is required'
): ValidationFunction<T> {
  return (value: T): ValidationResult<T> => {
    const timestamp = new Date().toISOString()
    const isValid = value !== null && value !== undefined && value !== ''
    const errors: string[] = []
    const warnings: string[] = []

    if (!isValid) {
      errors.push(errorMessage)
    }

    console.log(`required-validation-${Date.now()}`, {
      component: 'createRequiredValidator',
      hasValue: Boolean(value),
      isValid,
      timestamp
    })

    return {
      isValid,
      value,
      errors,
      warnings,
      timestamp
    }
  }
}

/**
 * Creates a length validator for string fields
 * Validates minimum and maximum length requirements
 * 
 * @param minLength - Minimum required length
 * @param maxLength - Maximum allowed length
 * @param errorMessage - Error message for length violations
 * @returns Validation function for length validation
 */
export function createLengthValidator(
  minLength: number,
  maxLength: number,
  errorMessage: string = `Length must be between ${minLength} and ${maxLength} characters`
): ValidationFunction<string> {
  return (value: string): ValidationResult<string> => {
    const timestamp = new Date().toISOString()
    const length = value.length
    const isValid = length >= minLength && length <= maxLength
    const errors: string[] = []
    const warnings: string[] = []

    if (!isValid) {
      errors.push(errorMessage)
    }

    console.log(`length-validation-${Date.now()}`, {
      component: 'createLengthValidator',
      length,
      minLength,
      maxLength,
      isValid,
      timestamp
    })

    return {
      isValid,
      value,
      errors,
      warnings,
      timestamp
    }
  }
}

/**
 * Creates a password strength validator
 * Validates password against security requirements
 * 
 * @param requirements - Password requirements configuration
 * @returns Validation function for password validation
 */
export function createPasswordValidator(
  requirements = PASSWORD_REQUIREMENTS
): ValidationFunction<string> {
  return (value: string): ValidationResult<string> => {
    const timestamp = new Date().toISOString()
    const errors: string[] = []
    const warnings: string[] = []

    // Check minimum length
    if (value.length < requirements.minLength) {
      errors.push(`Password must be at least ${requirements.minLength} characters long`)
    }

    // Check uppercase requirement
    if (requirements.requireUppercase && !/[A-Z]/.test(value)) {
      errors.push('Password must contain at least one uppercase letter')
    }

    // Check lowercase requirement
    if (requirements.requireLowercase && !/[a-z]/.test(value)) {
      errors.push('Password must contain at least one lowercase letter')
    }

    // Check numbers requirement
    if (requirements.requireNumbers && !/\d/.test(value)) {
      errors.push('Password must contain at least one number')
    }

    // Check special characters requirement
    if (requirements.requireSpecialChars && !new RegExp(`[${requirements.specialChars}]`).test(value)) {
      errors.push(`Password must contain at least one special character: ${requirements.specialChars}`)
    }

    const isValid = errors.length === 0

    console.log(`password-validation-${Date.now()}`, {
      component: 'createPasswordValidator',
      hasValue: Boolean(value),
      length: value.length,
      isValid,
      errorCount: errors.length,
      timestamp
    })

    return {
      isValid,
      value,
      errors,
      warnings,
      timestamp
    }
  }
}

/**
 * Creates a composite validator that combines multiple validation rules
 * Allows chaining of validation functions for complex validation scenarios
 * 
 * @param validators - Array of validation functions to apply
 * @returns Composite validation function
 */
export function createCompositeValidator<T>(
  ...validators: ValidationFunction<T>[]
): ValidationFunction<T> {
  return (value: T): ValidationResult<T> => {
    const timestamp = new Date().toISOString()
    const allErrors: string[] = []
    const allWarnings: string[] = []
    let isValid = true

    // Apply all validators and collect results
    for (const validator of validators) {
      const result = validator(value)
      
      if (!result.isValid) {
        isValid = false
      }
      
      allErrors.push(...result.errors)
      allWarnings.push(...result.warnings)
    }

    console.log(`composite-validation-${Date.now()}`, {
      component: 'createCompositeValidator',
      validatorCount: validators.length,
      isValid,
      errorCount: allErrors.length,
      warningCount: allWarnings.length,
      timestamp
    })

    return {
      isValid,
      value,
      errors: allErrors,
      warnings: allWarnings,
      timestamp
    }
  }
}

// ============================================================================
// PREDEFINED VALIDATORS
// ============================================================================

/**
 * Email validation using the standard email pattern
 * Validates email format and ensures it's not empty
 */
export const validateEmail = createCompositeValidator(
  createRequiredValidator<string>('Email address is required'),
  createPatternValidator(
    VALIDATION_PATTERNS.email,
    'Please enter a valid email address'
  )
)

/**
 * Phone number validation with flexible format support
 * Accepts various phone number formats including international
 */
export const validatePhone = createCompositeValidator(
  createRequiredValidator<string>('Phone number is required'),
  createPatternValidator(
    VALIDATION_PATTERNS.phone,
    'Please enter a valid phone number'
  )
)

/**
 * Arabic text validation for Arabic language content
 * Ensures text contains only Arabic characters and spaces
 */
export const validateArabicText = createCompositeValidator(
  createRequiredValidator<string>('Arabic text is required'),
  createPatternValidator(
    VALIDATION_PATTERNS.arabicText,
    'Please enter text in Arabic only'
  )
)

/**
 * English text validation for English language content
 * Ensures text contains only English letters and spaces
 */
export const validateEnglishText = createCompositeValidator(
  createRequiredValidator<string>('English text is required'),
  createPatternValidator(
    VALIDATION_PATTERNS.englishText,
    'Please enter text in English only'
  )
)

/**
 * Password validation with comprehensive security requirements
 * Validates password strength and security standards
 */
export const validatePassword = createPasswordValidator()

/**
 * Name validation with length and format requirements
 * Validates names with appropriate length and character restrictions
 */
export const validateName = createCompositeValidator(
  createRequiredValidator<string>('Name is required'),
  createLengthValidator(2, 50, 'Name must be between 2 and 50 characters'),
  createPatternValidator(
    /^[a-zA-Z\u0600-\u06FF\s]+$/,
    'Name can only contain letters and spaces'
  )
)

/**
 * Generic text validation for general content
 * Provides basic text validation with length limits
 */
export const validateText = createCompositeValidator(
  createRequiredValidator<string>('Text is required'),
  createLengthValidator(1, 1000, 'Text must be between 1 and 1000 characters')
) 