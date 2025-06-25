'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Eye, EyeOff, Lock, User, Shield } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { getLogger } from '@/lib/logger'
import { withErrorHandling } from '@/lib/errors'

/**
 * Login credentials interface for type safety
 */
interface LoginCredentials {
  email: string
  password: string
}

/**
 * Login form state interface
 */
interface LoginFormState {
  email: string
  password: string
  showPassword: boolean
  isLoading: boolean
  error: string
}

/**
 * Demo credentials for testing purposes
 * In production, this would be removed and handled by backend authentication
 */
const DEMO_CREDENTIALS = {
  email: 'admin@mavera.com',
  password: 'admin123'
} as const

/**
 * Staff login page component
 * Provides secure authentication for Mavera Hall staff portal access
 */
export default function LoginPage() {
  const logger = getLogger()
  const router = useRouter()
  
  // Form state management
  const [formState, setFormState] = useState<LoginFormState>({
    email: '',
    password: '',
    showPassword: false,
    isLoading: false,
    error: ''
  })

  /**
   * Logs page load and component mounting for analytics
   */
  useEffect(() => {
    const logPageLoad = withErrorHandling(async () => {
      logger.info('Login page loaded', {
        component: 'LoginPage',
        userAgent: navigator.userAgent,
        timestamp: new Date().toISOString()
      }, 'auth')

      logger.userAction(
        'page_view',
        'anonymous',
        'auth',
        'login-page-load',
        {
          page: '/login',
          timestamp: new Date().toISOString()
        }
      )
    })

    logPageLoad()
  }, [])

  /**
   * Updates form state with new values
   */
  const updateFormState = (updates: Partial<LoginFormState>) => {
    setFormState(prev => ({ ...prev, ...updates }))
  }

  /**
   * Toggles password visibility for better user experience
   */
  const togglePasswordVisibility = withErrorHandling(async () => {
    updateFormState({ showPassword: !formState.showPassword })
    
    logger.userAction(
      'toggle_password_visibility',
      'anonymous',
      'auth',
      'password-visibility-toggle',
      {
        visible: !formState.showPassword,
        timestamp: new Date().toISOString()
      }
    )
  })

  /**
   * Validates login credentials before submission
   */
  const validateCredentials = (credentials: LoginCredentials): boolean => {
    if (!credentials.email.trim()) {
      updateFormState({ error: 'البريد الإلكتروني مطلوب - Email is required' })
      return false
    }

    if (!credentials.password.trim()) {
      updateFormState({ error: 'كلمة المرور مطلوبة - Password is required' })
      return false
    }

    if (credentials.email.length < 5) {
      updateFormState({ error: 'البريد الإلكتروني غير صحيح - Invalid email format' })
      return false
    }

    if (credentials.password.length < 6) {
      updateFormState({ error: 'كلمة المرور قصيرة جداً - Password too short' })
      return false
    }

    return true
  }

  /**
   * Handles form submission with comprehensive error handling and logging
   */
  const handleFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    
    const credentials: LoginCredentials = {
      email: formState.email.trim(),
      password: formState.password
    }

    // Reset error state and start loading
    updateFormState({ isLoading: true, error: '' })

    const loginAttempt = withErrorHandling(async () => {
      logger.info('Login attempt initiated', {
        email: credentials.email,
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent
      }, 'auth')

      // Validate credentials
      if (!validateCredentials(credentials)) {
        logger.warn('Login validation failed', {
          email: credentials.email,
          reason: 'invalid_credentials_format',
          timestamp: new Date().toISOString()
        }, 'auth')
        return
      }

      try {
        // Simulate API authentication delay
        await new Promise(resolve => setTimeout(resolve, 1200))
        
        // Mock authentication - in production, this would be a secure API call
        if (credentials.email === DEMO_CREDENTIALS.email && 
            credentials.password === DEMO_CREDENTIALS.password) {
          
          logger.info('Login successful', {
            email: credentials.email,
            timestamp: new Date().toISOString(),
            sessionId: `session-${Date.now()}`
          }, 'auth')

          logger.userAction(
            'login_success',
            credentials.email,
            'auth',
            'successful-authentication',
            {
              timestamp: new Date().toISOString(),
              redirectTo: '/staff'
            }
          )

          // Redirect to staff portal
          router.push('/staff')
        } else {
          const errorMessage = 'بيانات الدخول غير صحيحة - Invalid email or password'
          updateFormState({ error: errorMessage })
          
          logger.warn('Login failed - invalid credentials', {
            email: credentials.email,
            reason: 'authentication_failed',
            timestamp: new Date().toISOString()
          }, 'auth')

          logger.userAction(
            'login_failure',
            credentials.email,
            'auth',
            'failed-authentication',
            {
              reason: 'invalid_credentials',
              timestamp: new Date().toISOString()
            }
          )
        }
      } catch (error) {
        const errorMessage = 'حدث خطأ في النظام - System error occurred'
        updateFormState({ error: errorMessage })
        
        logger.error('Login system error', error instanceof Error ? error : undefined, {
          email: credentials.email,
          timestamp: new Date().toISOString()
        }, 'auth')
      }
    })

    try {
      await loginAttempt()
    } finally {
      updateFormState({ isLoading: false })
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 px-4 py-8">
      <Card className="w-full max-w-md shadow-xl border-0 bg-white/95 backdrop-blur-sm">
        <CardHeader className="space-y-3 text-center">
          <div className="mx-auto w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mb-2">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <CardTitle className="text-2xl font-bold text-gray-900">
            مرحباً بعودتك
            <span className="block text-lg font-medium text-gray-600 mt-1">Welcome Back</span>
          </CardTitle>
          <CardDescription className="text-gray-600">
            تسجيل الدخول إلى بوابة موظفي قاعة مافيرا
            <span className="block text-sm mt-1">Sign in to access Mavera Hall staff portal</span>
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <form onSubmit={handleFormSubmit} className="space-y-5">
            {/* Email Input Field */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                البريد الإلكتروني - Email
              </Label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@mavera.com"
                  value={formState.email}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateFormState({ email: e.target.value, error: '' })}
                  className="pl-10 h-11 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  required
                  disabled={formState.isLoading}
                  aria-describedby="email-help"
                />
              </div>
              <p id="email-help" className="text-xs text-gray-500">
                استخدم البريد الإلكتروني المسجل في النظام
              </p>
            </div>
            
            {/* Password Input Field */}
            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                كلمة المرور - Password
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="password"
                  type={formState.showPassword ? 'text' : 'password'}
                  placeholder="أدخل كلمة المرور - Enter password"
                  value={formState.password}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateFormState({ password: e.target.value, error: '' })}
                  className="pl-10 pr-10 h-11 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  required
                  disabled={formState.isLoading}
                  aria-describedby="password-help"
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-3 top-3 text-gray-400 hover:text-gray-600 transition-colors"
                  aria-label={formState.showPassword ? 'إخفاء كلمة المرور' : 'إظهار كلمة المرور'}
                  disabled={formState.isLoading}
                >
                  {formState.showPassword ? 
                    <EyeOff className="h-4 w-4" /> : 
                    <Eye className="h-4 w-4" />
                  }
                </button>
              </div>
              <p id="password-help" className="text-xs text-gray-500">
                كلمة المرور يجب أن تكون 6 أحرف على الأقل
              </p>
            </div>

            {/* Error Display */}
            {formState.error && (
              <Alert variant="destructive" className="border-red-200 bg-red-50">
                <AlertDescription className="text-red-800">
                  {formState.error}
                </AlertDescription>
              </Alert>
            )}

            {/* Submit Button */}
            <Button 
              type="submit" 
              className="w-full h-11 bg-blue-600 hover:bg-blue-700 text-white font-medium transition-colors" 
              disabled={formState.isLoading}
            >
              {formState.isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  جاري تسجيل الدخول...
                </>
              ) : (
                'تسجيل الدخول - Sign In'
              )}
            </Button>
          </form>
          
          {/* Demo Credentials Info */}
          <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
            <h4 className="text-sm font-medium text-gray-700 mb-2">
              بيانات التجربة - Demo Credentials:
            </h4>
            <div className="text-xs text-gray-600 space-y-1">
              <p><strong>Email:</strong> admin@mavera.com</p>
              <p><strong>Password:</strong> admin123</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}