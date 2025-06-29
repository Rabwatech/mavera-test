'use client'

import { useEffect } from 'react'
import { getLogger } from '@/lib/logger'
import { withErrorHandling } from '@/lib/errors'
import { Star } from 'lucide-react'
import { useΦTranslations } from '@/hooks/useΦTranslations'

/**
 * Testimonials section component displaying client reviews and ratings
 * Showcases positive feedback from satisfied customers
 */
export function TestimonialsSection() {
  const logger = getLogger()

  /**
   * Translation hook for accessing multilingual content
   * Provides language-specific testimonial information
   */
  const { testimonials } = useΦTranslations()

  /**
   * Logs component mounting for analytics
   */
  useEffect(() => {
    const logComponentMount = withErrorHandling(async () => {
      logger.info('Testimonials section component mounted', {
        component: 'TestimonialsSection',
        testimonialsCount: testimonials.testimonials.length,
        timestamp: new Date().toISOString()
      }, 'user_action')
    })

    logComponentMount()
  }, [])

  /**
   * Handles testimonial card click for analytics tracking
   */
  const handleTestimonialClick = withErrorHandling(async (testimonialId: string, clientName: string) => {
    logger.userAction(
      'testimonial_click',
      'anonymous', // Will be replaced with actual user ID when available
      'card',
      `testimonial-${testimonialId}`,
      {
        component: 'TestimonialsSection',
        testimonialId,
        clientName,
        timestamp: new Date().toISOString()
      }
    )
  })

  /**
   * Renders star rating display
   */
  const renderStarRating = (rating: number) => {
    return (
      <div className="flex items-center space-x-1" role="img" aria-label={`تقييم ${rating} من 5 نجوم`}>
        {Array.from({ length: 5 }, (_, index) => (
          <Star
            key={index}
            className={`w-5 h-5 ${
              index < rating
                ? 'text-yellow-400 fill-current'
                : 'text-gray-300'
            }`}
            aria-hidden="true"
          />
        ))}
        <span className="sr-only">{rating} من 5 نجوم</span>
      </div>
    )
  }

  return (
    <section className="py-24 bg-white" aria-labelledby="testimonials-heading">
      <div className="container-custom">
        <header className="text-center mb-16">
          <h2 id="testimonials-heading" className="text-4xl md:text-5xl font-bold text-primary-900 mb-6">
            {testimonials.title}
            <span className="block text-primary-600 text-2xl md:text-3xl mt-2 font-medium">
              {testimonials.subtitle}
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {testimonials.description}
          </p>
        </header>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.testimonials.map((testimonial: any, index: number) => (
            <article
              key={index}
              className="bg-gray-50 p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 cursor-pointer"
              onClick={() => handleTestimonialClick(`testimonial-${index}`, testimonial.name)}
              tabIndex={0}
              role="button"
              aria-label={`اقرأ تقييم ${testimonial.name}`}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  handleTestimonialClick(`testimonial-${index}`, testimonial.name)
                }
              }}
            >
              {/* Rating */}
              <div className="mb-6">
                {renderStarRating(testimonial.rating)}
              </div>
              
              {/* Testimonial Text */}
              <blockquote className="text-gray-700 text-lg leading-relaxed mb-6 italic">
                "{testimonial.content}"
              </blockquote>
              
              {/* Client Info */}
              <footer className="flex items-center">
                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                  <span className="text-primary-600 font-semibold text-lg">
                    {testimonial.name.charAt(0)}
                  </span>
                </div>
                <div className="flex-1">
                  <cite className="font-semibold text-gray-900 not-italic">
                    {testimonial.name}
                  </cite>
                  <p className="text-sm text-gray-600">
                    {testimonial.role}
                  </p>
                </div>
              </footer>
            </article>
          ))}
        </div>
        
        {/* Call to Action */}
        <div className="text-center mt-16">
          <p className="text-lg text-gray-600 mb-6">
            هل تريد أن تكون التالي في قائمة عملائنا السعداء؟
          </p>
          <button
            className="btn-primary px-8 py-4 text-lg"
            onClick={() => {
              logger.userAction(
                'testimonials_cta_click',
                'anonymous',
                'button',
                'testimonials-book-now',
                {
                  component: 'TestimonialsSection',
                  timestamp: new Date().toISOString()
                }
              )
            }}
            aria-label="احجز قاعتك الآن"
          >
            احجز قاعتك الآن
          </button>
        </div>
      </div>
    </section>
  )
}