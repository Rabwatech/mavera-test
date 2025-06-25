'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { Facebook, Instagram, Twitter, Phone, Mail, MapPin, Clock } from 'lucide-react'
import { getLogger } from '@/lib/logger'
import { withErrorHandling } from '@/lib/errors'
import { CONTACT_INFO, NAVIGATION_ITEMS, HALL_SERVICES } from '@/lib/constants'

/**
 * Footer component providing site navigation, contact information, and social links
 * Serves as the main site footer with comprehensive information and links
 */
export function Footer() {
  const logger = getLogger()

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

  // Get contact information from constants
  const phoneInfo = CONTACT_INFO.find(info => info.type === 'phone')
  const emailInfo = CONTACT_INFO.find(info => info.type === 'email')
  const addressInfo = CONTACT_INFO.find(info => info.type === 'address')
  const hoursInfo = CONTACT_INFO.find(info => info.type === 'hours')

  // Get main services for footer display
  const mainServices = HALL_SERVICES.slice(0, 4)

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
              وجهتك المثالية للمناسبات والاحتفالات التي لا تُنسى في أجواء فاخرة ومميزة
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
              روابط سريعة
              <span className="block text-sm font-medium text-primary-200 mt-1">
                Quick Links
              </span>
            </h4>
            <ul className="space-y-3">
              {NAVIGATION_ITEMS.map((item) => (
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
              خدماتنا
              <span className="block text-sm font-medium text-primary-200 mt-1">
                Our Services
              </span>
            </h4>
            <ul className="space-y-3">
              {mainServices.map((service, index) => (
                <li key={index}>
                  <Link 
                    href={`#services`} 
                    className="text-primary-200 hover:text-white transition-colors hover:underline"
                    onClick={() => handleFooterLinkClick('service', index.toString(), service.title)}
                    aria-label={`تعرف على خدمة ${service.title}`}
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">
              معلومات التواصل
              <span className="block text-sm font-medium text-primary-200 mt-1">
                Contact Info
              </span>
            </h4>
            <div className="space-y-4">
              {phoneInfo && (
                <div className="flex items-center space-x-3 space-x-reverse">
                  <Phone className="w-4 h-4 text-primary-300 flex-shrink-0" />
                  <Link
                    href={`tel:${phoneInfo.value}`}
                    className="text-primary-200 hover:text-white transition-colors"
                    onClick={() => handleContactClick('phone', phoneInfo.value)}
                    aria-label={`اتصل بنا على ${phoneInfo.value}`}
                  >
                    {phoneInfo.value}
                  </Link>
                </div>
              )}
              
              {emailInfo && (
                <div className="flex items-center space-x-3 space-x-reverse">
                  <Mail className="w-4 h-4 text-primary-300 flex-shrink-0" />
                  <Link
                    href={`mailto:${emailInfo.value}`}
                    className="text-primary-200 hover:text-white transition-colors"
                    onClick={() => handleContactClick('email', emailInfo.value)}
                    aria-label={`راسلنا على ${emailInfo.value}`}
                  >
                    {emailInfo.value}
                  </Link>
                </div>
              )}
              
              {addressInfo && (
                <div className="flex items-start space-x-3 space-x-reverse">
                  <MapPin className="w-4 h-4 text-primary-300 flex-shrink-0 mt-0.5" />
                  <span className="text-primary-200 leading-relaxed">
                    {addressInfo.value}
                  </span>
                </div>
              )}
              
              {hoursInfo && (
                <div className="flex items-start space-x-3 space-x-reverse">
                  <Clock className="w-4 h-4 text-primary-300 flex-shrink-0 mt-0.5" />
                  <span className="text-primary-200 leading-relaxed">
                    {hoursInfo.value}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-primary-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-primary-200 text-center md:text-right">
              © 2024 قاعة مافيرا. جميع الحقوق محفوظة.
            </p>
            <div className="flex space-x-6 space-x-reverse text-sm">
              <Link 
                href="/privacy" 
                className="text-primary-200 hover:text-white transition-colors"
                onClick={() => handleFooterLinkClick('legal', '/privacy', 'سياسة الخصوصية')}
              >
                سياسة الخصوصية
              </Link>
              <Link 
                href="/terms" 
                className="text-primary-200 hover:text-white transition-colors"
                onClick={() => handleFooterLinkClick('legal', '/terms', 'شروط الاستخدام')}
              >
                شروط الاستخدام
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}