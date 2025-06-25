'use client'

import { useEffect } from 'react'
import { useΨNavigationAnalytics } from '@/hooks/useΨNavigationAnalytics'
import { tw, sectionClasses, headingClasses, textClasses, cardClasses, gridClasses } from '@/utils/styling/tw'
import { HALL_SERVICES } from '@/lib/constants'

/**
 * Services page component for Mavera Hall
 * Displays comprehensive service offerings with detailed descriptions
 * Uses custom hooks for analytics and follows Rabwa's clean code standards
 */
export default function ServicesPage() {
  /**
   * Navigation analytics hook for tracking page views and user interactions
   * Provides comprehensive analytics for page performance analysis
   */
  const { trackPageView } = useΨNavigationAnalytics()

  /**
   * Logs page load and component mounting for analytics
   * Tracks page view events for content performance analysis
   */
  useEffect(() => {
    const logPageLoad = async () => {
      await trackPageView('/services', 'خدماتنا - Mavera Hall Services', {
        page: 'Services',
        url: window.location.href,
        userAgent: navigator.userAgent,
        timestamp: new Date().toISOString(),
        viewport: {
          width: window.innerWidth,
          height: window.innerHeight
        }
      })
    }

    logPageLoad()
  }, [trackPageView])

  return (
    <main role="main" className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className={tw(
        sectionClasses(),
        'bg-gradient-to-br from-primary-50 to-primary-100'
      )}>
        <div className="container-custom">
          <div className="text-center mb-16">
            <h1 className={tw(
              headingClasses(),
              'text-primary-900 mb-6'
            )}>
              خدماتنا
              <span className={tw(
                'block text-primary-600 text-2xl md:text-3xl lg:text-4xl mt-2'
              )}>
                Our Services
              </span>
            </h1>
            
            <p className={tw(
              textClasses(),
              'text-primary-700 max-w-3xl mx-auto'
            )}>
              نقدم مجموعة شاملة من الخدمات الاحترافية لجعل مناسبتك استثنائية. من التخطيط إلى التنفيذ، نحن هنا لضمان نجاح حدثك.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className={tw(sectionClasses())}>
        <div className="container-custom">
          <div className={gridClasses()}>
            {HALL_SERVICES.map((service, index) => (
              <div
                key={service.title}
                className={tw(
                  cardClasses(),
                  'group hover:shadow-lg transition-all duration-300',
                  'transform hover:-translate-y-1'
                )}
              >
                {/* Service Icon */}
                <div className="mb-6 text-primary-600 group-hover:text-primary-700 transition-colors">
                  <div 
                    className="w-16 h-16 mx-auto"
                    dangerouslySetInnerHTML={{ __html: service.icon }}
                  />
                </div>

                {/* Service Title */}
                <h3 className={tw(
                  'text-xl font-bold text-primary-900 mb-4',
                  'group-hover:text-primary-700 transition-colors'
                )}>
                  {service.title}
                </h3>

                {/* Service Description */}
                <p className={tw(
                  textClasses(),
                  'text-primary-600 mb-6'
                )}>
                  {service.description}
                </p>

                {/* Service Features */}
                <ul className="space-y-2">
                  {service.features.map((feature, featureIndex) => (
                    <li
                      key={featureIndex}
                      className={tw(
                        'flex items-center text-sm text-primary-700',
                        'before:content-["✓"] before:text-primary-600',
                        'before:font-bold before:mr-2'
                      )}
                    >
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className={tw(
        sectionClasses(),
        'bg-primary-900 text-white'
      )}>
        <div className="container-custom text-center">
          <h2 className={tw(
            headingClasses(),
            'text-white mb-6'
          )}>
            احجز مناسبتك الآن
            <span className={tw(
              'block text-primary-200 text-2xl md:text-3xl lg:text-4xl mt-2'
            )}>
              Book Your Event Now
            </span>
          </h2>
          
          <p className={tw(
            textClasses(),
            'text-primary-100 mb-8 max-w-2xl mx-auto'
          )}>
            تواصل معنا اليوم لمناقشة تفاصيل مناسبتك والحصول على عرض سعر مخصص
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/booking"
              className={tw(
                'inline-flex items-center justify-center px-8 py-4',
                'bg-white text-primary-900 font-semibold rounded-lg',
                'hover:bg-primary-50 transition-colors',
                'focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2',
                'focus:ring-offset-primary-900'
              )}
            >
              احجز الآن
            </a>
            
            <a
              href="/contact"
              className={tw(
                'inline-flex items-center justify-center px-8 py-4',
                'border-2 border-white text-white font-semibold rounded-lg',
                'hover:bg-white hover:text-primary-900 transition-colors',
                'focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2',
                'focus:ring-offset-primary-900'
              )}
            >
              اتصل بنا
            </a>
          </div>
        </div>
      </section>
    </main>
  )
} 