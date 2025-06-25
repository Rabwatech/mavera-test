/**
 * Comprehensive error handling system following clean code principles
 * Provides descriptive error classes and graceful fallback mechanisms
 */

// ============================================================================
// BASE ERROR CLASSES
// ============================================================================

/**
 * Base application error class with enhanced context information
 * Provides foundation for all custom error types
 */
export abstract class BaseApplicationError extends Error {
  public readonly code: string;
  public readonly statusCode: number;
  public readonly isOperational: boolean;
  public readonly context: Record<string, any>;
  public readonly timestamp: Date;
  public readonly userMessage: string;

  constructor(
    message: string,
    code: string,
    statusCode: number,
    userMessage: string,
    context: Record<string, any> = {},
    isOperational: boolean = true
  ) {
    super(message);
    
    this.name = this.constructor.name;
    this.code = code;
    this.statusCode = statusCode;
    this.userMessage = userMessage;
    this.context = context;
    this.isOperational = isOperational;
    this.timestamp = new Date();

    // Maintains proper stack trace for debugging
    Error.captureStackTrace(this, this.constructor);
  }

  /**
   * Converts error to JSON format for logging and API responses
   * Provides structured error information
   */
  toJSON(): ErrorResponse {
    return {
      name: this.name,
      message: this.message,
      code: this.code,
      statusCode: this.statusCode,
      userMessage: this.userMessage,
      context: this.context,
      timestamp: this.timestamp.toISOString(),
      stack: this.stack
    };
  }

  /**
   * Creates user-friendly error message for display
   * Hides technical details from end users
   */
  getUserFriendlyMessage(): string {
    return this.userMessage || 'An unexpected error occurred. Please try again.';
  }
}

// ============================================================================
// VALIDATION ERROR CLASSES
// ============================================================================

/**
 * Validation error for form and input validation failures
 * Provides detailed field-level error information
 */
export class ValidationError extends BaseApplicationError {
  public readonly fieldErrors: FieldError[];

  constructor(
    message: string,
    fieldErrors: FieldError[] = [],
    context: Record<string, any> = {}
  ) {
    super(
      message,
      'VALIDATION_ERROR',
      400,
      'Please check your input and try again.',
      { ...context, fieldErrors },
      true
    );
    
    this.fieldErrors = fieldErrors;
  }

  /**
   * Creates validation error from field-specific errors
   * Aggregates multiple field errors into single error
   */
  static fromFieldErrors(fieldErrors: FieldError[]): ValidationError {
    const message = `Validation failed for ${fieldErrors.length} field(s)`;
    return new ValidationError(message, fieldErrors);
  }

  /**
   * Adds additional field error to existing validation error
   * Enables building validation errors incrementally
   */
  addFieldError(field: string, message: string, code?: string): void {
    this.fieldErrors.push({ field, message, code });
  }

  /**
   * Checks if specific field has validation error
   * Useful for conditional error handling
   */
  hasFieldError(field: string): boolean {
    return this.fieldErrors.some(error => error.field === field);
  }

  /**
   * Gets error message for specific field
   * Returns first error message for the field
   */
  getFieldError(field: string): string | undefined {
    const fieldError = this.fieldErrors.find(error => error.field === field);
    return fieldError?.message;
  }
}

/**
 * Business rule validation error
 * Handles domain-specific validation failures
 */
export class BusinessRuleError extends BaseApplicationError {
  public readonly rule: string;
  public readonly violatedConstraints: string[];

  constructor(
    message: string,
    rule: string,
    violatedConstraints: string[] = [],
    context: Record<string, any> = {}
  ) {
    super(
      message,
      'BUSINESS_RULE_ERROR',
      422,
      'This action violates business rules. Please review and try again.',
      { ...context, rule, violatedConstraints },
      true
    );
    
    this.rule = rule;
    this.violatedConstraints = violatedConstraints;
  }
}

// ============================================================================
// AUTHENTICATION AND AUTHORIZATION ERRORS
// ============================================================================

/**
 * Authentication error for login and credential failures
 * Handles user authentication issues
 */
export class AuthenticationError extends BaseApplicationError {
  public readonly attemptCount?: number;
  public readonly lockoutTime?: Date;

  constructor(
    message: string,
    userMessage: string = 'Invalid credentials. Please try again.',
    context: Record<string, any> = {}
  ) {
    super(
      message,
      'AUTHENTICATION_ERROR',
      401,
      userMessage,
      context,
      true
    );
    
    this.attemptCount = context.attemptCount;
    this.lockoutTime = context.lockoutTime;
  }

  /**
   * Creates authentication error for invalid credentials
   * Standard error for login failures
   */
  static invalidCredentials(attemptCount?: number): AuthenticationError {
    return new AuthenticationError(
      'Invalid email or password provided',
      'Invalid email or password. Please try again.',
      { attemptCount }
    );
  }

  /**
   * Creates authentication error for account lockout
   * Handles security lockout scenarios
   */
  static accountLocked(lockoutTime: Date): AuthenticationError {
    return new AuthenticationError(
      'Account temporarily locked due to multiple failed attempts',
      `Account locked. Please try again after ${lockoutTime.toLocaleTimeString()}.`,
      { lockoutTime }
    );
  }

  /**
   * Creates authentication error for expired session
   * Handles session timeout scenarios
   */
  static sessionExpired(): AuthenticationError {
    return new AuthenticationError(
      'User session has expired',
      'Your session has expired. Please log in again.',
      { reason: 'session_expired' }
    );
  }
}

/**
 * Authorization error for permission and access control failures
 * Handles user permission issues
 */
export class AuthorizationError extends BaseApplicationError {
  public readonly requiredPermissions: string[];
  public readonly userPermissions: string[];

  constructor(
    message: string,
    requiredPermissions: string[] = [],
    userPermissions: string[] = [],
    context: Record<string, any> = {}
  ) {
    super(
      message,
      'AUTHORIZATION_ERROR',
      403,
      'You do not have permission to perform this action.',
      { ...context, requiredPermissions, userPermissions },
      true
    );
    
    this.requiredPermissions = requiredPermissions;
    this.userPermissions = userPermissions;
  }

  /**
   * Creates authorization error for insufficient permissions
   * Standard error for access control failures
   */
  static insufficientPermissions(
    required: string[],
    current: string[]
  ): AuthorizationError {
    return new AuthorizationError(
      `Insufficient permissions. Required: ${required.join(', ')}`,
      required,
      current
    );
  }

  /**
   * Creates authorization error for resource access
   * Handles resource-specific access control
   */
  static resourceAccessDenied(resourceType: string, resourceId: string): AuthorizationError {
    return new AuthorizationError(
      `Access denied to ${resourceType} with ID: ${resourceId}`,
      [],
      [],
      { resourceType, resourceId }
    );
  }
}

// ============================================================================
// RESOURCE AND DATA ERRORS
// ============================================================================

/**
 * Resource not found error for missing entities
 * Handles cases where requested resources don't exist
 */
export class NotFoundError extends BaseApplicationError {
  public readonly resourceType: string;
  public readonly resourceId: string;

  constructor(
    resourceType: string,
    resourceId: string,
    context: Record<string, any> = {}
  ) {
    const message = `${resourceType} with ID '${resourceId}' not found`;
    const userMessage = `The requested ${resourceType.toLowerCase()} could not be found.`;
    
    super(
      message,
      'RESOURCE_NOT_FOUND',
      404,
      userMessage,
      { ...context, resourceType, resourceId },
      true
    );
    
    this.resourceType = resourceType;
    this.resourceId = resourceId;
  }

  /**
   * Creates not found error for user entities
   * Specialized error for user-related resources
   */
  static user(userId: string): NotFoundError {
    return new NotFoundError('User', userId);
  }

  /**
   * Creates not found error for hall entities
   * Specialized error for hall-related resources
   */
  static hall(hallId: string): NotFoundError {
    return new NotFoundError('Hall', hallId);
  }

  /**
   * Creates not found error for booking entities
   * Specialized error for booking-related resources
   */
  static booking(bookingId: string): NotFoundError {
    return new NotFoundError('Booking', bookingId);
  }
}

/**
 * Conflict error for resource state conflicts
 * Handles cases where resource state prevents operation
 */
export class ConflictError extends BaseApplicationError {
  public readonly conflictType: string;
  public readonly conflictingResource: string;

  constructor(
    message: string,
    conflictType: string,
    conflictingResource: string,
    userMessage: string,
    context: Record<string, any> = {}
  ) {
    super(
      message,
      'RESOURCE_CONFLICT',
      409,
      userMessage,
      { ...context, conflictType, conflictingResource },
      true
    );
    
    this.conflictType = conflictType;
    this.conflictingResource = conflictingResource;
  }

  /**
   * Creates conflict error for duplicate resources
   * Handles unique constraint violations
   */
  static duplicateResource(
    resourceType: string,
    field: string,
    value: string
  ): ConflictError {
    return new ConflictError(
      `${resourceType} with ${field} '${value}' already exists`,
      'duplicate',
      resourceType,
      `A ${resourceType.toLowerCase()} with this ${field} already exists.`,
      { field, value }
    );
  }

  /**
   * Creates conflict error for booking conflicts
   * Handles scheduling conflicts for hall bookings
   */
  static bookingConflict(
    hallId: string,
    date: Date,
    timeSlot: string
  ): ConflictError {
    return new ConflictError(
      `Hall ${hallId} is already booked for ${date.toDateString()} at ${timeSlot}`,
      'booking_conflict',
      'Hall',
      'This hall is already booked for the selected date and time.',
      { hallId, date: date.toISOString(), timeSlot }
    );
  }
}

// ============================================================================
// EXTERNAL SERVICE ERRORS
// ============================================================================

/**
 * External service error for third-party API failures
 * Handles integration and external dependency issues
 */
export class ExternalServiceError extends BaseApplicationError {
  public readonly serviceName: string;
  public readonly serviceResponse?: any;
  public readonly retryable: boolean;

  constructor(
    message: string,
    serviceName: string,
    serviceResponse?: any,
    retryable: boolean = true,
    context: Record<string, any> = {}
  ) {
    super(
      message,
      'EXTERNAL_SERVICE_ERROR',
      502,
      'A service is temporarily unavailable. Please try again later.',
      { ...context, serviceName, serviceResponse, retryable },
      true
    );
    
    this.serviceName = serviceName;
    this.serviceResponse = serviceResponse;
    this.retryable = retryable;
  }

  /**
   * Creates external service error for payment processing
   * Handles payment gateway failures
   */
  static paymentService(
    error: any,
    retryable: boolean = true
  ): ExternalServiceError {
    return new ExternalServiceError(
      `Payment processing failed: ${error.message}`,
      'Payment Gateway',
      error,
      retryable,
      { errorCode: error.code }
    );
  }

  /**
   * Creates external service error for email service
   * Handles email delivery failures
   */
  static emailService(
    error: any,
    retryable: boolean = true
  ): ExternalServiceError {
    return new ExternalServiceError(
      `Email delivery failed: ${error.message}`,
      'Email Service',
      error,
      retryable
    );
  }

  /**
   * Creates external service error for SMS service
   * Handles SMS delivery failures
   */
  static smsService(
    error: any,
    retryable: boolean = true
  ): ExternalServiceError {
    return new ExternalServiceError(
      `SMS delivery failed: ${error.message}`,
      'SMS Service',
      error,
      retryable
    );
  }
}

/**
 * Rate limit error for API throttling
 * Handles rate limiting and quota exceeded scenarios
 */
export class RateLimitError extends BaseApplicationError {
  public readonly limit: number;
  public readonly resetTime: Date;
  public readonly retryAfter: number;

  constructor(
    limit: number,
    resetTime: Date,
    retryAfter: number,
    context: Record<string, any> = {}
  ) {
    const message = `Rate limit exceeded. Limit: ${limit}, Reset: ${resetTime.toISOString()}`;
    const userMessage = `Too many requests. Please try again in ${Math.ceil(retryAfter / 1000)} seconds.`;
    
    super(
      message,
      'RATE_LIMIT_EXCEEDED',
      429,
      userMessage,
      { ...context, limit, resetTime: resetTime.toISOString(), retryAfter },
      true
    );
    
    this.limit = limit;
    this.resetTime = resetTime;
    this.retryAfter = retryAfter;
  }
}

// ============================================================================
// SYSTEM AND INFRASTRUCTURE ERRORS
// ============================================================================

/**
 * Database error for data persistence failures
 * Handles database connection and query issues
 */
export class DatabaseError extends BaseApplicationError {
  public readonly operation: string;
  public readonly table?: string;
  public readonly query?: string;

  constructor(
    message: string,
    operation: string,
    table?: string,
    query?: string,
    context: Record<string, any> = {}
  ) {
    super(
      message,
      'DATABASE_ERROR',
      500,
      'A database error occurred. Please try again later.',
      { ...context, operation, table, query },
      false
    );
    
    this.operation = operation;
    this.table = table;
    this.query = query;
  }

  /**
   * Creates database error for connection failures
   * Handles database connectivity issues
   */
  static connectionFailed(error: any): DatabaseError {
    return new DatabaseError(
      `Database connection failed: ${error.message}`,
      'connect',
      undefined,
      undefined,
      { originalError: error }
    );
  }

  /**
   * Creates database error for query timeouts
   * Handles slow or hanging queries
   */
  static queryTimeout(query: string, timeout: number): DatabaseError {
    return new DatabaseError(
      `Query timeout after ${timeout}ms`,
      'query',
      undefined,
      query,
      { timeout }
    );
  }
}

/**
 * Configuration error for application setup issues
 * Handles missing or invalid configuration
 */
export class ConfigurationError extends BaseApplicationError {
  public readonly configKey: string;
  public readonly expectedType?: string;

  constructor(
    message: string,
    configKey: string,
    expectedType?: string,
    context: Record<string, any> = {}
  ) {
    super(
      message,
      'CONFIGURATION_ERROR',
      500,
      'Application configuration error. Please contact support.',
      { ...context, configKey, expectedType },
      false
    );
    
    this.configKey = configKey;
    this.expectedType = expectedType;
  }

  /**
   * Creates configuration error for missing values
   * Handles required configuration that's not set
   */
  static missingRequired(key: string): ConfigurationError {
    return new ConfigurationError(
      `Required configuration '${key}' is missing`,
      key
    );
  }

  /**
   * Creates configuration error for invalid values
   * Handles configuration with wrong type or format
   */
  static invalidValue(
    key: string,
    value: any,
    expectedType: string
  ): ConfigurationError {
    return new ConfigurationError(
      `Configuration '${key}' has invalid value '${value}', expected ${expectedType}`,
      key,
      expectedType,
      { actualValue: value }
    );
  }
}

// ============================================================================
// SUPPORTING INTERFACES AND TYPES
// ============================================================================

/**
 * Field-specific error information
 * Used in validation errors for detailed feedback
 */
export interface FieldError {
  field: string;
  message: string;
  code?: string;
}

/**
 * Structured error response format
 * Standardized error information for APIs
 */
export interface ErrorResponse {
  name: string;
  message: string;
  code: string;
  statusCode: number;
  userMessage: string;
  context: Record<string, any>;
  timestamp: string;
  stack?: string;
}

/**
 * Error context for enhanced debugging
 * Additional information for error investigation
 */
export interface ErrorContext {
  userId?: string;
  requestId?: string;
  userAgent?: string;
  ipAddress?: string;
  url?: string;
  method?: string;
  headers?: Record<string, string>;
  body?: any;
  query?: Record<string, any>;
  params?: Record<string, any>;
}

// ============================================================================
// ERROR UTILITY FUNCTIONS
// ============================================================================

/**
 * Determines if an error is operational (expected) or programming error
 * Helps in error handling and logging decisions
 */
export function isOperationalError(error: Error): boolean {
  if (error instanceof BaseApplicationError) {
    return error.isOperational;
  }
  return false;
}

/**
 * Extracts user-friendly message from any error
 * Provides safe error message extraction
 */
export function getUserFriendlyMessage(error: Error): string {
  if (error instanceof BaseApplicationError) {
    return error.getUserFriendlyMessage();
  }
  
  // Default fallback for unknown errors
  return 'An unexpected error occurred. Please try again.';
}

/**
 * Converts any error to standardized error response
 * Ensures consistent error format across the application
 */
export function toErrorResponse(error: Error): ErrorResponse {
  if (error instanceof BaseApplicationError) {
    return error.toJSON();
  }
  
  // Handle unknown errors safely
  return {
    name: error.name || 'UnknownError',
    message: error.message || 'An unknown error occurred',
    code: 'UNKNOWN_ERROR',
    statusCode: 500,
    userMessage: 'An unexpected error occurred. Please try again.',
    context: {},
    timestamp: new Date().toISOString(),
    stack: error.stack
  };
}

/**
 * Creates error with enhanced context information
 * Adds request context to errors for better debugging
 */
export function withContext<T extends BaseApplicationError>(
  error: T,
  context: ErrorContext
): T {
  Object.assign(error.context, context);
  return error;
}

/**
 * Wraps async functions with error handling
 * Provides consistent error handling for async operations
 */
export function withErrorHandling<T extends any[], R>(
  fn: (...args: T) => Promise<R>
): (...args: T) => Promise<R> {
  return async (...args: T): Promise<R> => {
    try {
      return await fn(...args);
    } catch (error) {
      // Log error for debugging
      console.error('Error in wrapped function:', {
        error: error instanceof Error ? error.message : error,
        stack: error instanceof Error ? error.stack : undefined,
        args: args.length > 0 ? args : undefined,
        timestamp: new Date().toISOString()
      });
      
      // Re-throw the error to maintain error flow
      throw error;
    }
  };
}

/**
 * Retries async operations with exponential backoff
 * Handles transient failures with intelligent retry logic
 */
export async function withRetry<T>(
  operation: () => Promise<T>,
  maxAttempts: number = 3,
  baseDelay: number = 1000,
  shouldRetry: (error: Error) => boolean = (error) => {
    return error instanceof ExternalServiceError && error.retryable;
  }
): Promise<T> {
  let lastError: Error;
  
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      return await operation();
    } catch (error) {
      lastError = error as Error;
      
      // Don't retry on last attempt or if error is not retryable
      if (attempt === maxAttempts || !shouldRetry(lastError)) {
        throw lastError;
      }
      
      // Calculate delay with exponential backoff and jitter
      const delay = baseDelay * Math.pow(2, attempt - 1) + Math.random() * 1000;
      
      console.warn(`Operation failed, retrying in ${delay}ms (attempt ${attempt}/${maxAttempts}):`, {
        error: lastError.message,
        attempt,
        maxAttempts,
        delay
      });
      
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
  
  throw lastError!;
}