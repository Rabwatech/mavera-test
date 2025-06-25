'use client'

import { useState, useEffect } from 'react'
import { getLogger } from '@/lib/logger'
import { withErrorHandling } from '@/lib/errors'
import { GALLERY_IMAGES } from '@/lib/constants'
import { GalleryImageCategory, GalleryImage } from '@/types'
import { Eye, Download, Heart, Share2 } from 'lucide-react'
import { HydrationSafeDate } from '@/components/ui/HydrationSafeDate'

/**
 * Gallery section component displaying hall images and event photos
 * Showcases the venue's beauty and previous events
 */
export function GallerySection() {
  const [selectedCategory, setSelectedCategory] = useState<GalleryImageCategory | 'all'>('all')
  const [likedImages, setLikedImages] = useState<Set<string>>(new Set())
  const logger = getLogger()

  /**
   * Logs component mounting for analytics
   */
  useEffect(() => {
    const logComponentMount = withErrorHandling(async () => {
      logger.info('Gallery section component mounted', {
        component: 'GallerySection',
        totalImages: GALLERY_IMAGES.length,
        timestamp: new Date().toISOString()
      }, 'user_action')
    })

    logComponentMount()
  }, [])

  /**
   * Handles image category filter change
   */
  const handleCategoryChange = withErrorHandling(async (category: GalleryImageCategory | 'all') => {
    setSelectedCategory(category)
    
    logger.userAction(
      'gallery_filter_change',
      'anonymous', // Will be replaced with actual user ID when available
      'filter',
      `gallery-filter-${category}`,
      {
        component: 'GallerySection',
        category,
        timestamp: new Date().toISOString()
      }
    )
  })

  /**
   * Handles image interaction (view, like, share, download)
   */
  const handleImageAction = withErrorHandling(async (action: string, imageId: string, imageTitle: string) => {
    if (action === 'like') {
      setLikedImages(prev => {
        const newLiked = new Set(prev)
        if (newLiked.has(imageId)) {
          newLiked.delete(imageId)
        } else {
          newLiked.add(imageId)
        }
        return newLiked
      })
    }
    
    logger.userAction(
      `gallery_image_${action}`,
      'anonymous', // Will be replaced with actual user ID when available
      'image',
      `gallery-image-${imageId}`,
      {
        component: 'GallerySection',
        action,
        imageId,
        imageTitle,
        timestamp: new Date().toISOString()
      }
    )
  })

  // Filter images based on selected category
  const filteredImages: readonly GalleryImage[] = selectedCategory === 'all' 
    ? GALLERY_IMAGES 
    : GALLERY_IMAGES.filter(image => image.category === selectedCategory)

  // Get unique categories for filter buttons
  const categories: (GalleryImageCategory | 'all')[] = ['all', ...Array.from(new Set(GALLERY_IMAGES.map(img => img.category)))]

  return (
    <section className="py-24 bg-gray-50" aria-labelledby="gallery-heading">
      <div className="container-custom">
        <header className="text-center mb-16">
          <h2 id="gallery-heading" className="text-4xl md:text-5xl font-bold text-primary-900 mb-6">
            معرض الصور
            <span className="block text-primary-600 text-2xl md:text-3xl mt-2 font-medium">
              Gallery
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            استكشف جمال قاعة مافيرا من خلال مجموعة مختارة من أفضل الصور
          </p>
        </header>
        
        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => {
            const categoryLabels: Record<string, string> = {
              all: 'الكل',
              weddings: 'حفلات الزفاف',
              corporate_events: 'المؤتمرات',
              birthday_parties: 'الحفلات',
              venue_interior: 'القاعة'
            }
            
            return (
              <button
                key={category}
                onClick={() => handleCategoryChange(category)}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-primary-600 text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-primary-50 hover:text-primary-600 shadow-sm'
                }`}
                aria-label={`عرض صور ${categoryLabels[category] || category}`}
              >
                {categoryLabels[category] || category}
              </button>
            )
          })}
        </div>
        
        {/* Gallery Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredImages.map((image) => (
            <article
              key={image.id}
              className="group relative bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
            >
              {/* Image */}
              <div className="relative aspect-[4/3] overflow-hidden">
                <div className="w-full h-full bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center">
                  <span className="text-primary-600 text-sm font-medium">
                    {image.title}
                  </span>
                </div>
                
                {/* Overlay with Actions */}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="flex space-x-3 space-x-reverse">
                    <button
                      onClick={() => handleImageAction('view', image.id, image.title)}
                      className="p-3 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors"
                      aria-label={`عرض صورة ${image.title}`}
                    >
                      <Eye className="w-5 h-5" />
                    </button>
                    
                    <button
                      onClick={() => handleImageAction('like', image.id, image.title)}
                      className={`p-3 backdrop-blur-sm rounded-full transition-colors ${
                        likedImages.has(image.id)
                          ? 'bg-red-500 text-white'
                          : 'bg-white/20 text-white hover:bg-white/30'
                      }`}
                      aria-label={`${likedImages.has(image.id) ? 'إلغاء إعجاب' : 'إعجاب'} بصورة ${image.title}`}
                    >
                      <Heart className={`w-5 h-5 ${likedImages.has(image.id) ? 'fill-current' : ''}`} />
                    </button>
                    
                    <button
                      onClick={() => handleImageAction('share', image.id, image.title)}
                      className="p-3 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors"
                      aria-label={`مشاركة صورة ${image.title}`}
                    >
                      <Share2 className="w-5 h-5" />
                    </button>
                    
                    <button
                      onClick={() => handleImageAction('download', image.id, image.title)}
                      className="p-3 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors"
                      aria-label={`تحميل صورة ${image.title}`}
                    >
                      <Download className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Image Info */}
              <div className="p-6">
                <h3 className="font-semibold text-gray-900 mb-2">
                  {image.title}
                </h3>
                <p className="text-sm text-gray-600 mb-3">
                  {image.description}
                </p>
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span className="bg-primary-50 text-primary-600 px-2 py-1 rounded-full">
                    {image.category === 'weddings' ? 'حفل زفاف' :
                     image.category === 'corporate_events' ? 'مؤتمر' :
                     image.category === 'birthday_parties' ? 'حفلة' :
                     image.category === 'venue_interior' ? 'القاعة' : String(image.category)}
                  </span>
                  {image.eventDate && (
                    <HydrationSafeDate 
                      date={image.eventDate}
                      locale="ar-SA"
                      format="numeric"
                    />
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
        
        {/* No Results Message */}
        {filteredImages.length === 0 && (
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg">
              لا توجد صور في هذه الفئة حالياً
            </p>
          </div>
        )}
        
        {/* Call to Action */}
        <div className="text-center mt-16">
          <p className="text-lg text-gray-600 mb-6">
            هل تريد أن تكون صورك التالية في معرضنا؟
          </p>
          <button
            className="btn-primary px-8 py-4 text-lg"
            onClick={() => {
              logger.userAction(
                'gallery_cta_click',
                'anonymous',
                'button',
                'gallery-book-now',
                {
                  component: 'GallerySection',
                  timestamp: new Date().toISOString()
                }
              )
            }}
            aria-label="احجز مناسبتك الآن"
          >
            احجز مناسبتك الآن
          </button>
        </div>
      </div>
    </section>
  )
}