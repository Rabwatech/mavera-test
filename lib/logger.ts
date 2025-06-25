/**
 * Comprehensive logging system following clean code principles
 * Provides structured logging with different levels and contexts
 */

// ============================================================================
// LOGGING TYPES AND INTERFACES
// ============================================================================

/**
 * Log level hierarchy for message importance
 * Enables filtering and routing of log messages
 */
export type LogLevel = 'debug' | 'info' | 'warn' | 'error' | 'fatal';

/**
 * Log category for organizing messages by domain
 * Helps in filtering and analyzing logs
 */
export type LogCategory = 
  | 'auth'
  | 'booking'
  | 'payment'
  | 'email'
  | 'database'
  | 'api'
  | 'validation'
  | 'security'
  | 'performance'
  | 'system'
  | 'user_action'
  | 'external_service'
  | 'general';

/**
 * Structured log entry with comprehensive metadata
 * Provides rich context for debugging and monitoring
 */
export interface LogEntry {
  timestamp: string;
  level: LogLevel;
  category: LogCategory;
  message: string;
  context: LogContext;
  sessionId?: string;
  userId?: string;
  requestId?: string;
  correlationId?: string;
  source: {
    file?: string;
    function?: string;
    line?: number;
  };
  performance?: {
    duration?: number;
    memoryUsage?: number;
    cpuUsage?: number;
  };
  error?: {
    name: string;
    message: string;
    stack?: string;
    code?: string;
  };
}

/**
 * Log context for additional information
 * Flexible structure for domain-specific data
 */
export interface LogContext {
  [key: string]: any;
}

/**
 * Logger configuration options
 * Customizable logging behavior
 */
export interface LoggerConfig {
  level: LogLevel;
  enableConsole: boolean;
  enableFile: boolean;
  enableRemote: boolean;
  format: 'json' | 'text';
  maxFileSize: number;
  maxFiles: number;
  remoteEndpoint?: string;
  sensitiveFields: string[];
  enablePerformanceLogging: boolean;
  enableStackTrace: boolean;
}

/**
 * Performance measurement data
 * Tracks operation timing and resource usage
 */
export interface PerformanceMetrics {
  startTime: number;
  endTime?: number;
  duration?: number;
  memoryBefore?: number;
  memoryAfter?: number;
  memoryDelta?: number;
}

// ============================================================================
// LOGGER CLASS IMPLEMENTATION
// ============================================================================

/**
 * Main logger class with comprehensive logging capabilities
 * Provides structured logging with multiple output targets
 */
export class Logger {
  private config: LoggerConfig;
  private logBuffer: LogEntry[] = [];
  private performanceMap = new Map<string, PerformanceMetrics>();
  private static instance: Logger;

  constructor(config: Partial<LoggerConfig> = {}) {
    this.config = {
      level: 'info',
      enableConsole: true,
      enableFile: false,
      enableRemote: false,
      format: 'json',
      maxFileSize: 10 * 1024 * 1024, // 10MB
      maxFiles: 5,
      sensitiveFields: ['password', 'token', 'apiKey', 'secret', 'creditCard'],
      enablePerformanceLogging: true,
      enableStackTrace: true,
      ...config
    };
  }

  /**
   * Gets singleton logger instance
   * Ensures consistent logging throughout the application
   */
  static getInstance(config?: Partial<LoggerConfig>): Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger(config);
    }
    return Logger.instance;
  }

  /**
   * Updates logger configuration
   * Allows runtime configuration changes
   */
  updateConfig(config: Partial<LoggerConfig>): void {
    this.config = { ...this.config, ...config };
  }

  // ============================================================================
  // CORE LOGGING METHODS
  // ============================================================================

  /**
   * Logs debug messages for development and troubleshooting
   * Detailed information for debugging purposes
   */
  debug(
    message: string,
    context: LogContext = {},
    category: LogCategory = 'general'
  ): void {
    this.log('debug', category, message, context);
  }

  /**
   * Logs informational messages for general application flow
   * Normal application events and milestones
   */
  info(
    message: string,
    context: LogContext = {},
    category: LogCategory = 'general'
  ): void {
    this.log('info', category, message, context);
  }

  /**
   * Logs warning messages for potential issues
   * Situations that need attention but don't stop execution
   */
  warn(
    message: string,
    context: LogContext = {},
    category: LogCategory = 'general'
  ): void {
    this.log('warn', category, message, context);
  }

  /**
   * Logs error messages for handled exceptions
   * Errors that are caught and handled gracefully
   */
  error(
    message: string,
    error?: Error,
    context: LogContext = {},
    category: LogCategory = 'general'
  ): void {
    const errorContext = error ? {
      ...context,
      error: {
        name: error.name,
        message: error.message,
        stack: this.config.enableStackTrace ? error.stack : undefined,
        code: (error as any).code
      }
    } : context;

    this.log('error', category, message, errorContext);
  }

  /**
   * Logs fatal messages for critical system failures
   * Severe errors that may cause application shutdown
   */
  fatal(
    message: string,
    error?: Error,
    context: LogContext = {},
    category: LogCategory = 'system'
  ): void {
    const errorContext = error ? {
      ...context,
      error: {
        name: error.name,
        message: error.message,
        stack: this.config.enableStackTrace ? error.stack : undefined,
        code: (error as any).code
      }
    } : context;

    this.log('fatal', category, message, errorContext);
  }

  // ============================================================================
  // SPECIALIZED LOGGING METHODS
  // ============================================================================

  /**
   * Logs authentication events with security context
   * Tracks login attempts, failures, and security events
   */
  auth(
    event: string,
    userId?: string,
    context: LogContext = {},
    success: boolean = true
  ): void {
    const level: LogLevel = success ? 'info' : 'warn';
    const message = `Authentication ${event}: ${success ? 'Success' : 'Failed'}`;
    
    this.log(level, 'auth', message, {
      ...context,
      userId,
      event,
      success,
      timestamp: new Date().toISOString()
    });
  }

  /**
   * Logs booking-related events with business context
   * Tracks booking lifecycle and business operations
   */
  booking(
    event: string,
    bookingId: string,
    userId?: string,
    context: LogContext = {}
  ): void {
    this.log('info', 'booking', `Booking ${event}`, {
      ...context,
      bookingId,
      userId,
      event,
      timestamp: new Date().toISOString()
    });
  }

  /**
   * Logs payment events with financial context
   * Tracks payment processing and financial transactions
   */
  payment(
    event: string,
    amount: number,
    currency: string,
    paymentId?: string,
    context: LogContext = {}
  ): void {
    this.log('info', 'payment', `Payment ${event}`, {
      ...context,
      event,
      amount,
      currency,
      paymentId,
      timestamp: new Date().toISOString()
    });
  }

  /**
   * Logs API requests and responses with performance metrics
   * Tracks API usage and performance characteristics
   */
  api(
    method: string,
    endpoint: string,
    statusCode: number,
    duration: number,
    context: LogContext = {}
  ): void {
    const level: LogLevel = statusCode >= 400 ? 'error' : 'info';
    const message = `API ${method} ${endpoint} - ${statusCode} (${duration}ms)`;
    
    this.log(level, 'api', message, {
      ...context,
      method,
      endpoint,
      statusCode,
      duration,
      timestamp: new Date().toISOString()
    });
  }

  /**
   * Logs database operations with query context
   * Tracks database performance and operations
   */
  database(
    operation: string,
    table: string,
    duration: number,
    rowsAffected?: number,
    context: LogContext = {}
  ): void {
    const message = `Database ${operation} on ${table} (${duration}ms)`;
    
    this.log('info', 'database', message, {
      ...context,
      operation,
      table,
      duration,
      rowsAffected,
      timestamp: new Date().toISOString()
    });
  }

  /**
   * Logs user actions for audit trail
   * Tracks user behavior and system usage
   */
  userAction(
    action: string,
    userId: string,
    resourceType?: string,
    resourceId?: string,
    context: LogContext = {}
  ): void {
    this.log('info', 'user_action', `User action: ${action}`, {
      ...context,
      action,
      userId,
      resourceType,
      resourceId,
      timestamp: new Date().toISOString()
    });
  }

  /**
   * Logs security events for monitoring and alerting
   * Tracks security-related events and potential threats
   */
  security(
    event: string,
    severity: 'low' | 'medium' | 'high' | 'critical',
    context: LogContext = {}
  ): void {
    const level: LogLevel = severity === 'critical' ? 'fatal' : 
                           severity === 'high' ? 'error' : 
                           severity === 'medium' ? 'warn' : 'info';
    
    this.log(level, 'security', `Security event: ${event}`, {
      ...context,
      event,
      severity,
      timestamp: new Date().toISOString()
    });
  }

  // ============================================================================
  // PERFORMANCE MONITORING
  // ============================================================================

  /**
   * Starts performance measurement for an operation
   * Begins tracking execution time and resource usage
   */
  startPerformanceTimer(operationId: string): void {
    if (!this.config.enablePerformanceLogging) return;

    const metrics: PerformanceMetrics = {
      startTime: performance.now(),
      memoryBefore: this.getMemoryUsage()
    };

    this.performanceMap.set(operationId, metrics);
  }

  /**
   * Ends performance measurement and logs results
   * Completes timing and logs performance metrics
   */
  endPerformanceTimer(
    operationId: string,
    operation: string,
    context: LogContext = {}
  ): void {
    if (!this.config.enablePerformanceLogging) return;

    const metrics = this.performanceMap.get(operationId);
    if (!metrics) {
      this.warn(`Performance timer not found for operation: ${operationId}`);
      return;
    }

    metrics.endTime = performance.now();
    metrics.duration = metrics.endTime - metrics.startTime;
    metrics.memoryAfter = this.getMemoryUsage();
    metrics.memoryDelta = metrics.memoryAfter - (metrics.memoryBefore || 0);

    this.log('info', 'performance', `Performance: ${operation}`, {
      ...context,
      operationId,
      operation,
      duration: Math.round(metrics.duration * 100) / 100, // Round to 2 decimal places
      memoryDelta: metrics.memoryDelta,
      timestamp: new Date().toISOString()
    });

    this.performanceMap.delete(operationId);
  }

  /**
   * Wraps a function with performance monitoring
   * Automatically measures function execution time
   */
  withPerformanceMonitoring<T extends any[], R>(
    operation: string,
    fn: (...args: T) => R | Promise<R>
  ): (...args: T) => R | Promise<R> {
    return (...args: T): R | Promise<R> => {
      const operationId = `${operation}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      
      this.startPerformanceTimer(operationId);
      
      try {
        const result = fn(...args);
        
        if (result instanceof Promise) {
          return result.finally(() => {
            this.endPerformanceTimer(operationId, operation);
          }) as R;
        } else {
          this.endPerformanceTimer(operationId, operation);
          return result;
        }
      } catch (error) {
        this.endPerformanceTimer(operationId, operation, { error: true });
        throw error;
      }
    };
  }

  // ============================================================================
  // CORE LOGGING IMPLEMENTATION
  // ============================================================================

  /**
   * Core logging method that handles all log entries
   * Processes and routes log messages to appropriate outputs
   */
  private log(
    level: LogLevel,
    category: LogCategory,
    message: string,
    context: LogContext = {}
  ): void {
    // Check if log level meets minimum threshold
    if (!this.shouldLog(level)) {
      return;
    }

    // Sanitize sensitive data from context
    const sanitizedContext = this.sanitizeContext(context);

    // Create structured log entry
    const logEntry: LogEntry = {
      timestamp: new Date().toISOString(),
      level,
      category,
      message,
      context: sanitizedContext,
      sessionId: this.getSessionId(),
      userId: this.getUserId(sanitizedContext),
      requestId: this.getRequestId(sanitizedContext),
      correlationId: this.getCorrelationId(sanitizedContext),
      source: this.getSourceInfo(),
      performance: this.getPerformanceInfo(),
      error: sanitizedContext.error
    };

    // Output to configured targets
    this.outputLog(logEntry);

    // Buffer for batch processing if needed
    this.bufferLog(logEntry);
  }

  /**
   * Determines if a log entry should be processed based on level
   * Implements log level filtering
   */
  private shouldLog(level: LogLevel): boolean {
    const levels: Record<LogLevel, number> = {
      debug: 0,
      info: 1,
      warn: 2,
      error: 3,
      fatal: 4
    };

    return levels[level] >= levels[this.config.level];
  }

  /**
   * Removes sensitive information from log context
   * Protects sensitive data from being logged
   */
  private sanitizeContext(context: LogContext): LogContext {
    const sanitized = { ...context };
    
    const sanitizeObject = (obj: any, path: string = ''): any => {
      if (obj === null || typeof obj !== 'object') {
        return obj;
      }

      if (Array.isArray(obj)) {
        return obj.map((item, index) => sanitizeObject(item, `${path}[${index}]`));
      }

      const result: any = {};
      for (const [key, value] of Object.entries(obj)) {
        const currentPath = path ? `${path}.${key}` : key;
        
        if (this.config.sensitiveFields.some(field => 
          key.toLowerCase().includes(field.toLowerCase()) ||
          currentPath.toLowerCase().includes(field.toLowerCase())
        )) {
          result[key] = '[REDACTED]';
        } else {
          result[key] = sanitizeObject(value, currentPath);
        }
      }
      return result;
    };

    return sanitizeObject(sanitized);
  }

  /**
   * Outputs log entry to configured targets
   * Routes logs to console, file, or remote endpoints
   */
  private outputLog(logEntry: LogEntry): void {
    if (this.config.enableConsole) {
      this.outputToConsole(logEntry);
    }

    if (this.config.enableFile) {
      this.outputToFile(logEntry);
    }

    if (this.config.enableRemote) {
      this.outputToRemote(logEntry);
    }
  }

  /**
   * Outputs log entry to console with appropriate formatting
   * Provides colored console output for development
   */
  private outputToConsole(logEntry: LogEntry): void {
    const colors = {
      debug: '\x1b[36m', // Cyan
      info: '\x1b[32m',  // Green
      warn: '\x1b[33m',  // Yellow
      error: '\x1b[31m', // Red
      fatal: '\x1b[35m'  // Magenta
    };
    
    const reset = '\x1b[0m';
    const color = colors[logEntry.level] || '';
    
    if (this.config.format === 'json') {
      console.log(`${color}${JSON.stringify(logEntry, null, 2)}${reset}`);
    } else {
      const timestamp = logEntry.timestamp;
      const level = logEntry.level.toUpperCase().padEnd(5);
      const category = logEntry.category.toUpperCase().padEnd(12);
      const message = logEntry.message;
      const context = Object.keys(logEntry.context).length > 0 ? 
        ` | ${JSON.stringify(logEntry.context)}` : '';
      
      console.log(`${color}[${timestamp}] ${level} ${category} ${message}${context}${reset}`);
    }
  }

  /**
   * Outputs log entry to file (placeholder for file logging)
   * Would implement file rotation and management
   */
  private outputToFile(logEntry: LogEntry): void {
    // File logging implementation would go here
    // This would include file rotation, compression, etc.
    console.log('File logging not implemented in browser environment');
  }

  /**
   * Outputs log entry to remote endpoint (placeholder for remote logging)
   * Would implement remote log aggregation
   */
  private outputToRemote(logEntry: LogEntry): void {
    // Remote logging implementation would go here
    // This would batch and send logs to external services
    console.log('Remote logging not implemented');
  }

  /**
   * Buffers log entry for batch processing
   * Enables efficient log processing and analysis
   */
  private bufferLog(logEntry: LogEntry): void {
    this.logBuffer.push(logEntry);
    
    // Keep buffer size manageable
    if (this.logBuffer.length > 1000) {
      this.logBuffer = this.logBuffer.slice(-500); // Keep last 500 entries
    }
  }

  // ============================================================================
  // UTILITY METHODS
  // ============================================================================

  /**
   * Gets current session ID from context or generates one
   * Provides session tracking across log entries
   */
  private getSessionId(): string | undefined {
    // In a real application, this would get the session ID from context
    return typeof window !== 'undefined' ? 
      sessionStorage.getItem('sessionId') || undefined : undefined;
  }

  /**
   * Extracts user ID from log context
   * Provides user tracking in log entries
   */
  private getUserId(context: LogContext): string | undefined {
    return context.userId || context.user?.id;
  }

  /**
   * Extracts request ID from log context
   * Provides request tracking across log entries
   */
  private getRequestId(context: LogContext): string | undefined {
    return context.requestId;
  }

  /**
   * Extracts correlation ID from log context
   * Provides distributed tracing capabilities
   */
  private getCorrelationId(context: LogContext): string | undefined {
    return context.correlationId;
  }

  /**
   * Gets source code information for debugging
   * Provides file and line information when available
   */
  private getSourceInfo(): LogEntry['source'] {
    // In a real implementation, this could use stack trace analysis
    // to determine the calling file and line number
    return {};
  }

  /**
   * Gets current performance information
   * Provides system performance context
   */
  private getPerformanceInfo(): LogEntry['performance'] | undefined {
    if (!this.config.enablePerformanceLogging) {
      return undefined;
    }

    return {
      memoryUsage: this.getMemoryUsage()
    };
  }

  /**
   * Gets current memory usage information
   * Provides memory consumption metrics
   */
  private getMemoryUsage(): number {
    if (typeof performance !== 'undefined' && (performance as any).memory) {
      return (performance as any).memory.usedJSHeapSize;
    }
    return 0;
  }

  /**
   * Gets buffered log entries for analysis
   * Provides access to recent log history
   */
  getLogBuffer(): LogEntry[] {
    return [...this.logBuffer];
  }

  /**
   * Clears the log buffer
   * Resets log history for memory management
   */
  clearLogBuffer(): void {
    this.logBuffer = [];
  }

  /**
   * Gets current logger configuration
   * Provides access to current settings
   */
  getConfig(): LoggerConfig {
    return { ...this.config };
  }
}

// ============================================================================
// LOGGER FACTORY AND UTILITIES
// ============================================================================

/**
 * Creates a logger instance with default configuration
 * Provides convenient logger creation
 */
export function createLogger(config?: Partial<LoggerConfig>): Logger {
  return new Logger(config);
}

/**
 * Gets the default logger instance
 * Provides global logger access
 */
export function getLogger(): Logger {
  return Logger.getInstance();
}

/**
 * Creates a category-specific logger
 * Provides domain-specific logging with preset category
 */
export function createCategoryLogger(
  category: LogCategory,
  config?: Partial<LoggerConfig>
): CategoryLogger {
  return new CategoryLogger(category, config);
}

/**
 * Category-specific logger wrapper
 * Simplifies logging for specific domains
 */
export class CategoryLogger {
  private logger: Logger;
  private category: LogCategory;

  constructor(category: LogCategory, config?: Partial<LoggerConfig>) {
    this.logger = new Logger(config);
    this.category = category;
  }

  debug(message: string, context: LogContext = {}): void {
    this.logger.debug(message, context, this.category);
  }

  info(message: string, context: LogContext = {}): void {
    this.logger.info(message, context, this.category);
  }

  warn(message: string, context: LogContext = {}): void {
    this.logger.warn(message, context, this.category);
  }

  error(message: string, error?: Error, context: LogContext = {}): void {
    this.logger.error(message, error, context, this.category);
  }

  fatal(message: string, error?: Error, context: LogContext = {}): void {
    this.logger.fatal(message, error, context, this.category);
  }
}

// ============================================================================
// LOGGING DECORATORS AND UTILITIES
// ============================================================================

/**
 * Decorator for automatic method logging
 * Provides transparent logging for class methods
 */
export function logMethod(
  category: LogCategory = 'general',
  level: LogLevel = 'info'
) {
  return function (target: any, propertyName: string, descriptor: PropertyDescriptor) {
    const method = descriptor.value;
    const logger = getLogger();

    descriptor.value = function (...args: any[]) {
      const className = target.constructor.name;
      const methodName = propertyName;
      const operationId = `${className}.${methodName}-${Date.now()}`;
      
      logger.startPerformanceTimer(operationId);
      if (level === 'debug') {
        logger.debug(`Entering ${className}.${methodName}`, {
          className,
          methodName,
          args: args.length
        }, category);
      } else if (level === 'info') {
        logger.info(`Entering ${className}.${methodName}`, {
          className,
          methodName,
          args: args.length
        }, category);
      }

      try {
        const result = method.apply(this, args);
        
        if (result instanceof Promise) {
          return result
            .then((value) => {
              logger.endPerformanceTimer(operationId, `${className}.${methodName}`);
              if (level === 'debug') {
                logger.debug(`Exiting ${className}.${methodName} (success)`, {
                  className,
                  methodName,
                  success: true
                }, category);
              } else if (level === 'info') {
                logger.info(`Exiting ${className}.${methodName} (success)`, {
                  className,
                  methodName,
                  success: true
                }, category);
              }
              return value;
            })
            .catch((error) => {
              logger.endPerformanceTimer(operationId, `${className}.${methodName}`, { error: true });
              logger.error(`Error in ${className}.${methodName}`, error, {
                className,
                methodName
              }, category);
              throw error;
            });
        } else {
          logger.endPerformanceTimer(operationId, `${className}.${methodName}`);
          if (level === 'debug') {
            logger.debug(`Exiting ${className}.${methodName} (success)`, {
              className,
              methodName,
              success: true
            }, category);
          } else if (level === 'info') {
            logger.info(`Exiting ${className}.${methodName} (success)`, {
              className,
              methodName,
              success: true
            }, category);
          }
          return result;
        }
      } catch (error) {
        logger.endPerformanceTimer(operationId, `${className}.${methodName}`, { error: true });
        logger.error(`Error in ${className}.${methodName}`, error as Error, {
          className,
          methodName
        }, category);
        throw error;
      }
    };

    return descriptor;
  };
}

/**
 * Creates a request-scoped logger with correlation ID
 * Provides request tracking across the application
 */
export function createRequestLogger(
  requestId: string,
  correlationId?: string,
  userId?: string
): Logger {
  const logger = getLogger();
  
  // Override the log method to include request context
  const originalLog = (logger as any).log.bind(logger);
  (logger as any).log = function(
    level: LogLevel,
    category: LogCategory,
    message: string,
    context: LogContext = {}
  ) {
    const enhancedContext = {
      ...context,
      requestId,
      correlationId,
      userId
    };
    return originalLog(level, category, message, enhancedContext);
  };

  return logger;
}

// Export default logger instance
export default getLogger();