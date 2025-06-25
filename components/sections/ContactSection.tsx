'use client'

import { useState, useEffect } from 'react'
import { getLogger } from '@/lib/logger'
import { withErrorHandling } from '@/lib/errors'
import { validateContactForm } from '@/lib/validation'
import { CONTACT_INFO } from '@/lib/constants'
import { Phone, Mail, MapPin, Clock } from 'lucide-react'
import { useΦTranslations } from '@/hooks/useΦTranslations'

/**
 * Contact section component with contact information and message form
 * Provides multiple ways for users to get in touch with Mavera Hall
 */
export function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  })
  const [formErrors, setFormErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  
  const logger = getLogger()

  /**
   * Translation hook for accessing multilingual content
   * Provides language-specific contact information
   */
  const { contact } = useΦTranslations()

  /**
   * Logs component mounting for analytics
   */
  useEffect(() => {
    const logComponentMount = withErrorHandling(async () => {
      logger.info('Contact section component mounted', {
        component: 'ContactSection',
        timestamp: new Date().toISOString()
      }, 'user_action')
    })

    logComponentMount()
  }, [])

  /**
   * Handles form input changes with real-time validation
   */
  const handleInputChange = withErrorHandling(async (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    
    // Clear field error when user starts typing
    if (formErrors[field]) {
      setFormErrors(prev => {
        const newErrors = { ...prev }
        delete newErrors[field]
        return newErrors
      })
    }
  })

  /**
   * Handles contact form submission with validation and error handling
   */
  const handleFormSubmit = withErrorHandling(async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validate form data
    const validation = validateContactForm(formData)
    
    if (!validation.isValid) {
      setFormErrors(validation.fieldErrors)
      logger.warn('Contact form validation failed', {
        component: 'ContactSection',
        errors: validation.fieldErrors,
        timestamp: new Date().toISOString()
      })
      return
    }

    setIsSubmitting(true)
    setSubmitStatus('idle')
    
    try {
      logger.userAction(
        'contact_form_submit',
        'anonymous', // Will be replaced with actual user ID when available
        'form',
        'contact-form',
        {
          component: 'ContactSection',
          formData: {
            name: formData.name,
            email: formData.email,
            hasPhone: !!formData.phone,
            messageLength: formData.message.length
          },
          timestamp: new Date().toISOString()
        }
      )

      // Simulate form submission (replace with actual API call)
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      setSubmitStatus('success')
      setFormData({ name: '', email: '', phone: '', message: '' })
      
      logger.info('Contact form submitted successfully', {
        component: 'ContactSection',
        timestamp: new Date().toISOString()
      })
      
    } catch (error) {
      setSubmitStatus('error')
      logger.error('Contact form submission failed', error instanceof Error ? error : new Error('Unknown error'), {
        timestamp: new Date().toISOString()
      }, 'user_action')
    } finally {
      setIsSubmitting(false)
    }
  })

  /**
   * Handles contact info click for analytics tracking
   */
  const handleContactInfoClick = withErrorHandling(async (type: string, value: string) => {
    logger.userAction(
      'contact_info_click',
      'anonymous', // Will be replaced with actual user ID when available
      'link',
      `contact-${type}`,
      {
        component: 'ContactSection',
        contactType: type,
        value,
        timestamp: new Date().toISOString()
      }
    )
  })

  return (
    <section className="py-24 bg-gray-50" aria-labelledby="contact-heading">
      <div className="container-custom">
        <header className="text-center mb-16">
          <h2 id="contact-heading" className="text-4xl md:text-5xl font-bold text-primary-900 mb-6">
            {contact.title}
            <span className="block text-primary-600 text-2xl md:text-3xl mt-2 font-medium">
              {contact.subtitle}
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {contact.description}
          </p>
        </header>
        
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-primary-900 mb-8">
                معلومات التواصل
              </h3>
              
              <div className="space-y-6">
                {CONTACT_INFO.map((info, index) => {
                  const IconComponent = {
                    phone: Phone,
                    email: Mail,
                    address: MapPin,
                    hours: Clock
                  }[info.type] || MapPin
                  
                  return (
                    <div key={index} className="flex items-start space-x-4 space-x-reverse">
                      <div className="flex-shrink-0 w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center">
                        <IconComponent className="w-6 h-6 text-primary-600" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900 mb-1">
                          {info.label}
                        </h4>
                        {info.type === 'phone' || info.type === 'email' ? (
                          <a
                            href={info.type === 'phone' ? `tel:${info.value}` : `mailto:${info.value}`}
                            className="text-primary-600 hover:text-primary-700 transition-colors"
                            onClick={() => handleContactInfoClick(info.type, info.value)}
                            aria-label={`${info.type === 'phone' ? 'اتصل بـ' : 'أرسل إيميل إلى'} ${info.value}`}
                          >
                            {info.value}
                          </a>
                        ) : (
                          <p className="text-gray-600">{info.value}</p>
                        )}
                        {info.description && (
                          <p className="text-sm text-gray-500 mt-1">{info.description}</p>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
          
          {/* Contact Form */}
          <div>
            <h3 className="text-2xl font-bold text-primary-900 mb-8">
              أرسل لنا رسالة
            </h3>
            
            <form onSubmit={handleFormSubmit} className="space-y-6" noValidate>
              {/* Name Field */}
              <div>
                <label htmlFor="contact-name" className="block text-sm font-medium text-gray-700 mb-2">
                  الاسم الكامل *
                </label>
                <input
                  id="contact-name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors ${
                    formErrors.name ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="أدخل اسمك الكامل"
                  required
                  aria-describedby={formErrors.name ? 'name-error' : undefined}
                />
                {formErrors.name && (
                  <p id="name-error" className="mt-1 text-sm text-red-600" role="alert">
                    {formErrors.name}
                  </p>
                )}
              </div>
              
              {/* Email Field */}
              <div>
                <label htmlFor="contact-email" className="block text-sm font-medium text-gray-700 mb-2">
                  البريد الإلكتروني *
                </label>
                <input
                  id="contact-email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors ${
                    formErrors.email ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="your@email.com"
                  required
                  aria-describedby={formErrors.email ? 'email-error' : undefined}
                />
                {formErrors.email && (
                  <p id="email-error" className="mt-1 text-sm text-red-600" role="alert">
                    {formErrors.email}
                  </p>
                )}
              </div>
              
              {/* Phone Field */}
              <div>
                <label htmlFor="contact-phone" className="block text-sm font-medium text-gray-700 mb-2">
                  رقم الهاتف
                </label>
                <input
                  id="contact-phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors ${
                    formErrors.phone ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="+966 50 123 4567"
                  aria-describedby={formErrors.phone ? 'phone-error' : undefined}
                />
                {formErrors.phone && (
                  <p id="phone-error" className="mt-1 text-sm text-red-600" role="alert">
                    {formErrors.phone}
                  </p>
                )}
              </div>
              
              {/* Message Field */}
              <div>
                <label htmlFor="contact-message" className="block text-sm font-medium text-gray-700 mb-2">
                  الرسالة *
                </label>
                <textarea
                  id="contact-message"
                  value={formData.message}
                  onChange={(e) => handleInputChange('message', e.target.value)}
                  rows={5}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors resize-vertical ${
                    formErrors.message ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="اكتب رسالتك هنا..."
                  required
                  aria-describedby={formErrors.message ? 'message-error' : undefined}
                />
                {formErrors.message && (
                  <p id="message-error" className="mt-1 text-sm text-red-600" role="alert">
                    {formErrors.message}
                  </p>
                )}
              </div>
              
              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full btn-primary py-4 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="إرسال الرسالة"
              >
                {isSubmitting ? 'جاري الإرسال...' : 'إرسال الرسالة'}
              </button>
              
              {/* Status Messages */}
              {submitStatus === 'success' && (
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg" role="alert">
                  <p className="text-green-800 text-center">
                    تم إرسال رسالتك بنجاح! سنتواصل معك قريباً.
                  </p>
                </div>
              )}
              
              {submitStatus === 'error' && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg" role="alert">
                  <p className="text-red-800 text-center">
                    حدث خطأ أثناء إرسال الرسالة. يرجى المحاولة مرة أخرى.
                  </p>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}