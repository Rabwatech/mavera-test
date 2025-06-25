'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { Facebook, Instagram, Twitter, Phone, Mail, MapPin, Clock } from 'lucide-react'
import { getLogger } from '@/lib/logger'
import { withErrorHandling } from '@/lib/errors'
import { useΦTranslations } from '@/hooks/useΦTranslations'
import { useΦLanguageContext } from '@/hooks/useΦLanguageContext'

/**
 * Footer component providing site navigation, contact information, and social links
 * Serves as the main site footer with comprehensive information and links
 */
export function Footer() {
  const logger = getLogger()

  /**
   * Translation hook for accessing multilingual content
   * Provides language-specific footer information
   */
  const { footer, common } = useΦTranslations()

  /**
   * Language context for navigation items
   * Provides language-specific navigation
   */
  const { navigationItems } = useΦLanguageContext()

  /**
   * Logs component mounting for analytics
   */
  useEffect(() => {
    const logComponentMount = withErrorHandling(async () => {
      logger.info('Footer component mounted', {
        component: 'Footer',
        timestamp: new Date().toISOString()
      }, 'user_action')
    })

    logComponentMount()
  }, [])

  /**
   * Handles footer link clicks for analytics tracking
   */
  const handleFooterLinkClick = withErrorHandling(async (linkType: string, linkTarget: string, linkText: string) => {
    logger.userAction(
      'footer_link_click',
      'anonymous', // Will be replaced with actual user ID when available
      'link',
      `footer-${linkType}-${linkTarget}`,
      {
        component: 'Footer',
        linkType,
        linkTarget,
        linkText,
        timestamp: new Date().toISOString()
      }
    )
  })

  /**
   * Handles social media link clicks
   */
  const handleSocialClick = withErrorHandling(async (platform: string) => {
    logger.userAction(
      'social_media_click',
      'anonymous',
      'social',
      `footer-social-${platform}`,
      {
        component: 'Footer',
        platform,
        timestamp: new Date().toISOString()
      }
    )
  })

  /**
   * Handles contact info clicks (phone, email, address)
   */
  const handleContactClick = withErrorHandling(async (contactType: string, contactValue: string) => {
    logger.userAction(
      'footer_contact_click',
      'anonymous',
      'contact',
      `footer-contact-${contactType}`,
      {
        component: 'Footer',
        contactType,
        contactValue,
        timestamp: new Date().toISOString()
      }
    )
  })

  return (
    <footer className="bg-primary-900 text-white py-16" role="contentinfo">
      <div className="container-custom">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-white">
              قاعة مافيرا
              <span className="block text-lg font-medium text-primary-200 mt-1">
                Mavera Hall
              </span>
            </h3>
            <p className="text-primary-100 mb-6 leading-relaxed">
              {footer.description}
            </p>
            <div className="flex space-x-4 space-x-reverse">
              <Link 
                href="https://facebook.com/maverahall" 
                className="text-primary-200 hover:text-white transition-colors p-2 rounded-full hover:bg-primary-800"
                onClick={() => handleSocialClick('facebook')}
                aria-label="تابعنا على فيسبوك"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Facebook className="w-5 h-5" />
              </Link>
              <Link 
                href="https://instagram.com/maverahall" 
                className="text-primary-200 hover:text-white transition-colors p-2 rounded-full hover:bg-primary-800"
                onClick={() => handleSocialClick('instagram')}
                aria-label="تابعنا على إنستغرام"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Instagram className="w-5 h-5" />
              </Link>
              <Link 
                href="https://twitter.com/maverahall" 
                className="text-primary-200 hover:text-white transition-colors p-2 rounded-full hover:bg-primary-800"
                onClick={() => handleSocialClick('twitter')}
                aria-label="تابعنا على تويتر"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Twitter className="w-5 h-5" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">
              {footer.quickLinks}
            </h4>
            <ul className="space-y-3">
              {navigationItems.map((item) => (
                <li key={item.href}>
                  <Link 
                    href={item.href} 
                    className="text-primary-200 hover:text-white transition-colors hover:underline"
                    onClick={() => handleFooterLinkClick('navigation', item.href, item.label)}
                    aria-label={item.ariaLabel}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">
              {footer.services}
            </h4>
            <ul className="space-y-3">
              <li>
                <Link 
                  href="/services" 
                  className="text-primary-200 hover:text-white transition-colors hover:underline"
                  onClick={() => handleFooterLinkClick('service', 'weddings', 'حفلات الزفاف')}
                  aria-label="تعرف على خدمات حفلات الزفاف"
                >
                  حفلات الزفاف
                </Link>
              </li>
              <li>
                <Link 
                  href="/services" 
                  className="text-primary-200 hover:text-white transition-colors hover:underline"
                  onClick={() => handleFooterLinkClick('service', 'corporate', 'الفعاليات المؤسسية')}
                  aria-label="تعرف على خدمات الفعاليات المؤسسية"
                >
                  الفعاليات المؤسسية
                </Link>
              </li>
              <li>
                <Link 
                  href="/services" 
                  className="text-primary-200 hover:text-white transition-colors hover:underline"
                  onClick={() => handleFooterLinkClick('service', 'parties', 'الحفلات الخاصة')}
                  aria-label="تعرف على خدمات الحفلات الخاصة"
                >
                  الحفلات الخاصة
                </Link>
              </li>
              <li>
                <Link 
                  href="/services" 
                  className="text-primary-200 hover:text-white transition-colors hover:underline"
                  onClick={() => handleFooterLinkClick('service', 'seminars', 'الندوات والمؤتمرات')}
                  aria-label="تعرف على خدمات الندوات والمؤتمرات"
                >
                  الندوات والمؤتمرات
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">
              {footer.contact}
            </h4>
            <div className="space-y-4">
              <div className="flex items-start space-x-3 space-x-reverse">
                <Phone className="w-5 h-5 text-primary-200 mt-1 flex-shrink-0" />
                <div>
                  <a
                    href="tel:+966111234567"
                    className="text-primary-200 hover:text-white transition-colors"
                    onClick={() => handleContactClick('phone', '+966 11 123 4567')}
                    aria-label="اتصل بنا على الهاتف"
                  >
                    +966 11 123 4567
                  </a>
                </div>
              </div>
              
              <div className="flex items-start space-x-3 space-x-reverse">
                <Mail className="w-5 h-5 text-primary-200 mt-1 flex-shrink-0" />
                <div>
                  <a
                    href="mailto:info@maverahall.com"
                    className="text-primary-200 hover:text-white transition-colors"
                    onClick={() => handleContactClick('email', 'info@maverahall.com')}
                    aria-label="أرسل إيميل إلينا"
                  >
                    info@maverahall.com
                  </a>
                </div>
              </div>
              
              <div className="flex items-start space-x-3 space-x-reverse">
                <MapPin className="w-5 h-5 text-primary-200 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-primary-200">
                    شارع الملك فهد، الرياض، المملكة العربية السعودية
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3 space-x-reverse">
                <Clock className="w-5 h-5 text-primary-200 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-primary-200">
                    الأحد - الخميس: 8:00 ص - 10:00 م
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Bottom Section */}
        <div className="border-t border-primary-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-primary-200 text-sm">
              {footer.copyright}
            </p>
            <div className="flex space-x-6 space-x-reverse">
              <Link 
                href="/privacy" 
                className="text-primary-200 hover:text-white transition-colors text-sm"
                onClick={() => handleFooterLinkClick('legal', 'privacy', footer.privacyPolicy)}
                aria-label={footer.privacyPolicy}
              >
                {footer.privacyPolicy}
              </Link>
              <Link 
                href="/terms" 
                className="text-primary-200 hover:text-white transition-colors text-sm"
                onClick={() => handleFooterLinkClick('legal', 'terms', footer.termsOfService)}
                aria-label={footer.termsOfService}
              >
                {footer.termsOfService}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}