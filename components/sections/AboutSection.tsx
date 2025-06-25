'use client'

import { useEffect } from 'react'
import { getLogger } from '@/lib/logger'
import { withErrorHandling } from '@/lib/errors'
import { HALL_STATISTICS } from '@/lib/constants'

/**
 * About section component showcasing Mavera Hall's story and achievements
 * Displays company information, statistics, and visual elements
 */
export function AboutSection() {
  const logger = getLogger()

  /**
   * Logs component mounting for analytics
   */
  useEffect(() => {
    const logComponentMount = withErrorHandling(async () => {
      logger.info('About section component mounted', {
        component: 'AboutSection',
        timestamp: new Date().toISOString()
      }, 'user_action')
    })

    logComponentMount()
  }, [])

  return (
    <section className="py-24 bg-gray-50" aria-labelledby="about-heading">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content Section */}
          <div className="space-y-8">
            <header>
              <h2 id="about-heading" className="text-4xl md:text-5xl font-bold text-primary-900 mb-6">
                عن قاعة مافيرا
                <span className="block text-primary-600 text-2xl md:text-3xl mt-2 font-medium">
                  About Mavera Hall
                </span>
              </h2>
            </header>
            
            <div className="prose prose-lg text-gray-700 space-y-6">
              <p className="text-xl leading-relaxed">
                تقع قاعة مافيرا في قلب الأناقة، وتقف كشاهد على الجمال الخالد والتصميم المتطور. 
                كانت قاعتنا خلفية لعدد لا يحصى من اللحظات السحرية، من التجمعات الحميمة إلى الاحتفالات الكبرى.
              </p>
              
              <p className="text-lg leading-relaxed">
                مع أكثر من عقد من الخبرة في إنشاء الأحداث التي لا تُنسى، يضمن فريقنا المتفاني أن كل التفاصيل 
                مثالية، من الاستشارة الأولى إلى الوداع الأخير. نحن نؤمن أن كل حدث يستحق أن يكون استثنائياً.
              </p>
            </div>
            
            {/* Statistics Grid */}
            <div className="grid grid-cols-2 gap-8 pt-8">
              {HALL_STATISTICS.map((stat, index) => (
                <div key={index} className="text-center lg:text-left">
                  <h3 className="text-4xl md:text-5xl font-bold text-primary-600 mb-2">
                    {stat.value}
                  </h3>
                  <p className="text-gray-600 font-medium">
                    {stat.label}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    {stat.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
          
          {/* Visual Section */}
          <div className="relative">
            <div className="aspect-square bg-gradient-to-br from-primary-100 to-primary-200 rounded-2xl shadow-2xl overflow-hidden">
              {/* Placeholder for actual image */}
              <div className="w-full h-full flex items-center justify-center">
                <div className="text-center text-primary-600">
                  <div className="w-24 h-24 mx-auto mb-4 bg-primary-300 rounded-full flex items-center justify-center">
                    <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p className="text-lg font-medium">صورة قاعة مافيرا</p>
                </div>
              </div>
            </div>
            
            {/* Decorative Elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-secondary-200 rounded-full opacity-60" aria-hidden="true"></div>
            <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-primary-300 rounded-full opacity-40" aria-hidden="true"></div>
          </div>
        </div>
      </div>
    </section>
  )
}