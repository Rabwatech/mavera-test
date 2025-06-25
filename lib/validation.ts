/**
 * Validation utilities following clean code principles
 * Each function has a single responsibility and descriptive naming
 */

import { VALIDATION_PATTERNS, BOOKING_CONSTRAINTS, ERROR_MESSAGES } from './constants';

// ============================================================================
// VALIDATION RESULT TYPES
// ============================================================================

/**
 * Standardized validation result interface
 * Provides consistent error handling across the application
 */
export interface ValidationResult {
  isValid: boolean;
  errorMessage?: string;
  sanitizedValue?: string;
}

/**
 * Comprehensive form validation result
 * Used for multi-field form validation
 */
export interface FormValidationResult {
  isValid: boolean;
  fieldErrors: Record<string, string>;
  generalErrors: string[];
}

// ============================================================================
// BASIC VALIDATION FUNCTIONS
// ============================================================================

/**
 * Creates a reusable validator function for pattern-based validation
 * Follows DRY principle by abstracting common validation logic
 * 
 * @param pattern - Regular expression pattern to validate against
 * @param errorMessage - Custom error message for validation failure
 * @returns Validation function that can be reused across the application
 */
function createPatternValidator(
  pattern: RegExp,
  errorMessage: string
) {
  return (value: string): ValidationResult => {
    const trimmedValue = value.trim();
    
    if (!trimmedValue) {
      return {
        isValid: false,
        errorMessage: ERROR_MESSAGES.validation.required,
      };
    }
    
    const isValid = pattern.test(trimmedValue);
    
    return {
      isValid,
      errorMessage: isValid ? undefined : errorMessage,
      sanitizedValue: trimmedValue,
    };
  };
}

/**
 * Validates email addresses using standardized pattern
 * Provides consistent email validation across all forms
 * 
 * @param emailAddress - Email address to validate
 * @returns Validation result with sanitized email if valid
 */
export const validateEmailAddress = createPatternValidator(
  VALIDATION_PATTERNS.email,
  ERROR_MESSAGES.validation.invalidEmail
);

/**
 * Validates phone numbers with international format support
 * Accepts various phone number formats for user convenience
 * 
 * @param phoneNumber - Phone number to validate
 * @returns Validation result with sanitized phone number if valid
 */
export const validatePhoneNumber = createPatternValidator(
  VALIDATION_PATTERNS.phone,
  ERROR_MESSAGES.validation.invalidPhone
);

/**
 * Validates password strength according to security requirements
 * Ensures passwords meet minimum security standards
 * 
 * @param password - Password to validate
 * @returns Validation result with strength assessment
 */
export function validatePasswordStrength(password: string): ValidationResult {
  if (!password) {
    return {
      isValid: false,
      errorMessage: ERROR_MESSAGES.validation.required,
    };
  }
  
  const isValid = VALIDATION_PATTERNS.strongPassword.test(password);
  
  return {
    isValid,
    errorMessage: isValid ? undefined : ERROR_MESSAGES.validation.passwordTooWeak,
    sanitizedValue: password, // Don't trim passwords to preserve intentional spaces
  };
}

/**
 * Validates password confirmation matches original password
 * Prevents user errors in password entry forms
 * 
 * @param originalPassword - The original password
 * @param confirmationPassword - The confirmation password
 * @returns Validation result indicating if passwords match
 */
export function validatePasswordConfirmation(
  originalPassword: string,
  confirmationPassword: string
): ValidationResult {
  if (!confirmationPassword) {
    return {
      isValid: false,
      errorMessage: ERROR_MESSAGES.validation.required,
    };
  }
  
  const passwordsMatch = originalPassword === confirmationPassword;
  
  return {
    isValid: passwordsMatch,
    errorMessage: passwordsMatch ? undefined : ERROR_MESSAGES.validation.passwordMismatch,
    sanitizedValue: confirmationPassword,
  };
}

// ============================================================================
// BUSINESS LOGIC VALIDATION FUNCTIONS
// ============================================================================

/**
 * Validates guest count for event bookings
 * Ensures guest count falls within venue capacity constraints
 * 
 * @param guestCount - Number of guests for the event
 * @returns Validation result with capacity compliance check
 */
export function validateEventGuestCount(guestCount: number): ValidationResult {
  const { minimumGuestCount, maximumGuestCount } = BOOKING_CONSTRAINTS;
  
  if (guestCount < minimumGuestCount || guestCount > maximumGuestCount) {
    return {
      isValid: false,
      errorMessage: ERROR_MESSAGES.booking.guestCountExceeded,
    };
  }
  
  return {
    isValid: true,
    sanitizedValue: guestCount.toString(),
  };
}

/**
 * Validates event booking date against business rules
 * Ensures bookings meet advance notice requirements
 * 
 * @param eventDate - Proposed date for the event
 * @returns Validation result with date availability check
 */
export function validateEventBookingDate(eventDate: Date): ValidationResult {
  const currentDate = new Date();
  const daysDifference = Math.ceil(
    (eventDate.getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24)
  );
  
  const { minimumAdvanceBookingDays, maximumAdvanceBookingDays } = BOOKING_CONSTRAINTS;
  
  if (daysDifference < minimumAdvanceBookingDays) {
    return {
      isValid: false,
      errorMessage: ERROR_MESSAGES.booking.advanceBookingRequired,
    };
  }
  
  if (daysDifference > maximumAdvanceBookingDays) {
    return {
      isValid: false,
      errorMessage: `Bookings cannot be made more than ${maximumAdvanceBookingDays} days in advance`,
    };
  }
  
  return {
    isValid: true,
    sanitizedValue: eventDate.toISOString(),
  };
}

/**
 * Validates event cancellation timing against business rules
 * Ensures cancellations meet deadline requirements
 * 
 * @param eventDate - Date of the event to be cancelled
 * @returns Validation result with cancellation eligibility
 */
export function validateEventCancellationEligibility(eventDate: Date): ValidationResult {
  const currentDate = new Date();
  const daysDifference = Math.ceil(
    (eventDate.getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24)
  );
  
  const { cancellationDeadlineDays } = BOOKING_CONSTRAINTS;
  
  if (daysDifference < cancellationDeadlineDays) {
    return {
      isValid: false,
      errorMessage: ERROR_MESSAGES.booking.cancellationDeadlinePassed,
    };
  }
  
  return {
    isValid: true,
  };
}

// ============================================================================
// COMPREHENSIVE FORM VALIDATION
// ============================================================================

/**
 * Validates user registration form data
 * Combines multiple validation rules for comprehensive form validation
 * 
 * @param formData - User registration form data
 * @returns Validation result with field-specific errors
 */
export function validateUserRegistrationForm(formData: {
  name: string
  email: string
  phone: string
  password: string
  confirmPassword: string
}): FormValidationResult {
  const errors: Record<string, string> = {}
  
  // Validate name
  if (!formData.name.trim()) {
    errors.name = 'الاسم مطلوب'
  } else if (formData.name.trim().length < 2) {
    errors.name = 'الاسم يجب أن يكون حرفين على الأقل'
  }
  
  // Validate email
  const emailValidation = validateEmailAddress(formData.email)
  if (!emailValidation.isValid) {
    errors.email = emailValidation.errorMessage || 'البريد الإلكتروني غير صحيح'
  }
  
  // Validate phone
  const phoneValidation = validatePhoneNumber(formData.phone)
  if (!phoneValidation.isValid) {
    errors.phone = phoneValidation.errorMessage || 'رقم الهاتف غير صحيح'
  }
  
  // Validate password
  const passwordValidation = validatePasswordStrength(formData.password)
  if (!passwordValidation.isValid) {
    errors.password = passwordValidation.errorMessage || 'كلمة المرور ضعيفة'
  }
  
  // Validate password confirmation
  const confirmPasswordValidation = validatePasswordConfirmation(
    formData.password,
    formData.confirmPassword
  )
  if (!confirmPasswordValidation.isValid) {
    errors.confirmPassword = confirmPasswordValidation.errorMessage || 'كلمة المرور غير متطابقة'
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    fieldErrors: errors,
    generalErrors: []
  }
}

/**
 * Validates contact form data
 * Ensures all required fields are present and properly formatted
 * 
 * @param formData - Contact form data
 * @returns Validation result with field-specific errors
 */
export function validateContactForm(formData: {
  name: string
  email: string
  phone?: string
  message: string
}): FormValidationResult {
  const errors: Record<string, string> = {}
  
  // Validate name (required)
  if (!formData.name.trim()) {
    errors.name = 'الاسم مطلوب'
  } else if (formData.name.trim().length < 2) {
    errors.name = 'الاسم يجب أن يكون حرفين على الأقل'
  } else if (formData.name.trim().length > 100) {
    errors.name = 'الاسم طويل جداً (الحد الأقصى 100 حرف)'
  }
  
  // Validate email (required)
  const emailValidation = validateEmailAddress(formData.email)
  if (!emailValidation.isValid) {
    errors.email = emailValidation.errorMessage || 'البريد الإلكتروني غير صحيح'
  }
  
  // Validate phone (optional, but if provided must be valid)
  if (formData.phone && formData.phone.trim()) {
    const phoneValidation = validatePhoneNumber(formData.phone)
    if (!phoneValidation.isValid) {
      errors.phone = phoneValidation.errorMessage || 'رقم الهاتف غير صحيح'
    }
  }
  
  // Validate message (required)
  if (!formData.message.trim()) {
    errors.message = 'الرسالة مطلوبة'
  } else if (formData.message.trim().length < 10) {
    errors.message = 'الرسالة قصيرة جداً (الحد الأدنى 10 أحرف)'
  } else if (formData.message.trim().length > 1000) {
    errors.message = 'الرسالة طويلة جداً (الحد الأقصى 1000 حرف)'
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    fieldErrors: errors,
    generalErrors: []
  }
}

/**
 * Validates complete event booking form
 * Ensures all booking requirements are met before submission
 * 
 * @param formData - Event booking form data
 * @returns Comprehensive validation result for booking form
 */
export function validateEventBookingForm(formData: {
  eventDate: Date;
  guestCount: number;
  eventType: string;
  specialRequests?: string;
}): FormValidationResult {
  const fieldErrors: Record<string, string> = {};
  const generalErrors: string[] = [];
  
  // Validate event date
  const dateValidation = validateEventBookingDate(formData.eventDate);
  if (!dateValidation.isValid) {
    fieldErrors.eventDate = dateValidation.errorMessage!;
  }
  
  // Validate guest count
  const guestCountValidation = validateEventGuestCount(formData.guestCount);
  if (!guestCountValidation.isValid) {
    fieldErrors.guestCount = guestCountValidation.errorMessage!;
  }
  
  // Validate event type (required field)
  if (!formData.eventType.trim()) {
    fieldErrors.eventType = ERROR_MESSAGES.validation.required;
  }
  
  const isValid = Object.keys(fieldErrors).length === 0 && generalErrors.length === 0;
  
  return {
    isValid,
    fieldErrors,
    generalErrors,
  };
}