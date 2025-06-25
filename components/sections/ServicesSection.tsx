'use client'

import { useEffect } from 'react'
import { getLogger } from '@/lib/logger'
import { withErrorHandling } from '@/lib/errors'
import { HALL_SERVICES } from '@/lib/constants'

/**
 * Services section component showcasing Mavera Hall's offerings
 * Displays available services with descriptions and features
 */
export function ServicesSection() {
  const logger = getLogger()

  /**
   * Logs component mounting for analytics
   */
  useEffect(() => {
    const logComponentMount = withErrorHandling(async () => {
    logger.info('Services section component mounted', {
      component: 'ServicesSection',
      timestamp: new Date().toISOString()
    }, 'user_action')
  })

    logComponentMount()
  }, [])

  /**
   * Handles service card click for analytics tracking
   */
  const handleServiceClick = withErrorHandling(async (serviceName: string) => {
    logger.userAction(
      'service_card_click',
      'anonymous', // Will be replaced with actual user ID when available
      'card',
      `service-${serviceName.toLowerCase().replace(/\s+/g, '-')}`,
      {
        component: 'ServicesSection',
        serviceName,
        timestamp: new Date().toISOString()
      }
    )
  })

  return (
    <section className="py-24 bg-white" aria-labelledby="services-heading">
      <div className="container-custom">
        <header className="text-center mb-16">
          <h2 id="services-heading" className="text-4xl md:text-5xl font-bold text-primary-900 mb-6">
            خدماتنا
            <span className="block text-primary-600 text-2xl md:text-3xl mt-2 font-medium">
              Our Services
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            نقدم مجموعة شاملة من الخدمات لجعل مناسبتك مثالية ولا تُنسى
          </p>
        </header>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {HALL_SERVICES.map((service, index) => (
            <div 
              key={index}
              className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-primary-200 cursor-pointer"
              onClick={() => handleServiceClick(service.title)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  handleServiceClick(service.title)
                }
              }}
              aria-label={`تعرف على خدمة ${service.title}`}
            >
              {/* Service Icon */}
              <div className="p-8 pb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-primary-100 to-primary-200 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <div className="text-primary-600" dangerouslySetInnerHTML={{ __html: service.icon }} />
                </div>
                
                <h3 className="text-2xl font-bold text-primary-900 mb-4 group-hover:text-primary-700 transition-colors">
                  {service.title}
                </h3>
                
                <p className="text-gray-600 leading-relaxed mb-6">
                  {service.description}
                </p>
                
                {/* Features List */}
                <ul className="space-y-2">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-sm text-gray-500">
                      <svg className="w-4 h-4 text-primary-500 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              
              {/* Hover Effect */}
              <div className="h-1 bg-gradient-to-r from-primary-500 to-secondary-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
            </div>
          ))}
        </div>
        
        {/* Call to Action */}
        <div className="text-center mt-16">
          <p className="text-lg text-gray-600 mb-6">
            هل تحتاج إلى خدمة مخصصة؟ تواصل معنا لمناقشة احتياجاتك
          </p>
          <button 
            className="btn-primary px-8 py-4 text-lg"
            onClick={() => handleServiceClick('Custom Service Inquiry')}
            aria-label="تواصل معنا للحصول على خدمة مخصصة"
          >
            تواصل معنا
          </button>
        </div>
      </div>
    </section>
  )
}