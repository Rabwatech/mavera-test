'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function StaffGalleryPage() {
  const router = useRouter()
  const [selectedImages, setSelectedImages] = useState<number[]>([])
  const [showUploadForm, setShowUploadForm] = useState(false)
  const [uploadData, setUploadData] = useState({
    title: '',
    category: 'events',
    description: ''
  })

  const [images] = useState([
    {
      id: 1,
      title: 'Wedding Reception Setup',
      category: 'events',
      url: '/api/placeholder/400/300',
      description: 'Beautiful wedding reception setup with elegant decorations',
      uploadDate: '2024-12-01',
      featured: true
    },
    {
      id: 2,
      title: 'Corporate Event Hall',
      category: 'events',
      url: '/api/placeholder/400/300',
      description: 'Professional setup for corporate meetings and conferences',
      uploadDate: '2024-11-28',
      featured: false
    },
    {
      id: 3,
      title: 'Hall Interior',
      category: 'venue',
      url: '/api/placeholder/400/300',
      description: 'Main hall interior showing the elegant architecture',
      uploadDate: '2024-11-25',
      featured: true
    },
    {
      id: 4,
      title: 'Catering Setup',
      category: 'services',
      url: '/api/placeholder/400/300',
      description: 'Professional catering setup and food presentation',
      uploadDate: '2024-11-20',
      featured: false
    },
    {
      id: 5,
      title: 'Lighting System',
      category: 'venue',
      url: '/api/placeholder/400/300',
      description: 'State-of-the-art lighting system for events',
      uploadDate: '2024-11-15',
      featured: false
    },
    {
      id: 6,
      title: 'Birthday Party',
      category: 'events',
      url: '/api/placeholder/400/300',
      description: 'Colorful birthday party setup and decorations',
      uploadDate: '2024-11-10',
      featured: false
    }
  ])

  console.log('mavera-hall-staff-gallery', new Date().toISOString(), 'Staff gallery page rendered')

  const handleImageSelect = (imageId: number) => {
    console.log('mavera-hall-staff-gallery-select', new Date().toISOString(), `Image ${imageId} selected`)
    setSelectedImages(prev => 
      prev.includes(imageId) 
        ? prev.filter(id => id !== imageId)
        : [...prev, imageId]
    )
  }

  const handleDeleteSelected = () => {
    console.log('mavera-hall-staff-gallery-delete', new Date().toISOString(), `Deleting images: ${selectedImages.join(', ')}`)
    setSelectedImages([])
    // Here you would typically delete from backend
  }

  const handleUploadImages = () => {
    console.log('mavera-hall-staff-gallery-upload', new Date().toISOString(), 'Uploading images')
    if (uploadData.title && uploadData.category) {
      setUploadData({ title: '', category: 'events', description: '' })
      setShowUploadForm(false)
      // Here you would typically upload to backend
    }
  }

  const handleBackToDashboard = () => {
    console.log('mavera-hall-staff-gallery-dashboard', new Date().toISOString(), 'Back to dashboard clicked')
    router.push('/staff')
  }

  const handleViewHall = () => {
    console.log('mavera-hall-staff-gallery-hall', new Date().toISOString(), 'View hall clicked')
    router.push('/staff/hall')
  }

  const handleExportGallery = () => {
    console.log('mavera-hall-staff-gallery-export', new Date().toISOString(), 'Export gallery clicked')
    // Here you would typically export gallery data
  }

  const handleBulkAction = (action: string) => {
    console.log('mavera-hall-staff-gallery-bulk', new Date().toISOString(), `Bulk action: ${action}`)
    if (selectedImages.length === 0) return
    
    switch (action) {
      case 'feature':
        // Here you would typically mark as featured
        break
      case 'unfeature':
        // Here you would typically unmark as featured
        break
      case 'delete':
        handleDeleteSelected()
        break
    }
  }

  const categories = ['all', 'events', 'venue', 'services']
  const [selectedCategory, setSelectedCategory] = useState('all')

  const filteredImages = selectedCategory === 'all' 
    ? images 
    : images.filter(img => img.category === selectedCategory)

  return (
    <div className="py-24">
      <div className="container-custom">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="section-title text-primary">Gallery Management</h1>
            <p className="body-regular text-text-secondary">
              Manage hall photos and visual content
            </p>
          </div>
          <div className="space-x-3">
            <button 
              onClick={handleViewHall}
              className="btn-secondary"
            >
              View Hall Details
            </button>
            <button 
              onClick={handleBackToDashboard}
              className="btn-outline"
            >
              Back to Dashboard
            </button>
          </div>
        </div>

        {/* Gallery Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="service-card p-6 text-center">
            <h3 className="subsection-title text-primary mb-2">{images.length}</h3>
            <p className="body-regular">Total Images</p>
          </div>
          <div className="service-card p-6 text-center">
            <h3 className="subsection-title text-primary mb-2">{images.filter(img => img.featured).length}</h3>
            <p className="body-regular">Featured Images</p>
          </div>
          <div className="service-card p-6 text-center">
            <h3 className="subsection-title text-primary mb-2">{images.filter(img => img.category === 'events').length}</h3>
            <p className="body-regular">Event Photos</p>
          </div>
          <div className="service-card p-6 text-center">
            <h3 className="subsection-title text-primary mb-2">{images.filter(img => img.category === 'venue').length}</h3>
            <p className="body-regular">Venue Photos</p>
          </div>
        </div>

        {/* Actions */}
        <div className="service-card p-6 mb-8">
          <div className="flex justify-between items-center">
            <div className="flex space-x-4">
              <button 
                onClick={() => setShowUploadForm(true)}
                className="btn-primary"
              >
                Upload Images
              </button>
              <button 
                onClick={handleExportGallery}
                className="btn-secondary"
              >
                Export Gallery
              </button>
            </div>
            <div className="flex space-x-3">
              <select 
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="p-2 border border-gray-300 rounded-lg"
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </option>
                ))}
              </select>
              {selectedImages.length > 0 && (
                <div className="flex space-x-2">
                  <button 
                    onClick={() => handleBulkAction('feature')}
                    className="btn-secondary text-sm"
                  >
                    Feature Selected
                  </button>
                  <button 
                    onClick={() => handleBulkAction('unfeature')}
                    className="btn-secondary text-sm"
                  >
                    Unfeature Selected
                  </button>
                  <button 
                    onClick={() => handleBulkAction('delete')}
                    className="btn-outline text-sm text-red-600 border-red-600 hover:bg-red-50"
                  >
                    Delete Selected
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Upload Form */}
        {showUploadForm && (
          <div className="service-card p-6 mb-8">
            <h3 className="subsection-title mb-4 text-primary">Upload New Images</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block body-regular font-semibold mb-2">Image Title</label>
                <input 
                  type="text" 
                  value={uploadData.title}
                  onChange={(e) => setUploadData({...uploadData, title: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Enter image title"
                />
              </div>
              <div>
                <label className="block body-regular font-semibold mb-2">Category</label>
                <select 
                  value={uploadData.category}
                  onChange={(e) => setUploadData({...uploadData, category: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option value="events">Events</option>
                  <option value="venue">Venue</option>
                  <option value="services">Services</option>
                </select>
              </div>
              <div className="md:col-span-2">
                <label className="block body-regular font-semibold mb-2">Description</label>
                <textarea 
                  value={uploadData.description}
                  onChange={(e) => setUploadData({...uploadData, description: e.target.value})}
                  rows={3}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Enter image description"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block body-regular font-semibold mb-2">Upload Images</label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                  <p className="text-gray-500 mb-4">Drag and drop images here, or click to select files</p>
                  <button className="btn-secondary">
                    Choose Files
                  </button>
                </div>
              </div>
            </div>
            <div className="flex space-x-3 mt-6">
              <button 
                onClick={handleUploadImages}
                className="btn-primary"
              >
                Upload Images
              </button>
              <button 
                onClick={() => setShowUploadForm(false)}
                className="btn-outline"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Gallery Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredImages.map((image) => (
            <div key={image.id} className="service-card p-4">
              <div className="relative">
                <img 
                  src={image.url} 
                  alt={image.title}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
                <input 
                  type="checkbox"
                  checked={selectedImages.includes(image.id)}
                  onChange={() => handleImageSelect(image.id)}
                  className="absolute top-2 left-2 w-5 h-5"
                />
                {image.featured && (
                  <span className="absolute top-2 right-2 bg-primary text-white px-2 py-1 rounded-full text-xs">
                    Featured
                  </span>
                )}
              </div>
              <div>
                <h3 className="subsection-title mb-2">{image.title}</h3>
                <p className="body-small text-text-secondary mb-2">{image.description}</p>
                <div className="flex justify-between items-center">
                  <span className="px-2 py-1 bg-gray-100 rounded-full text-xs">
                    {image.category}
                  </span>
                  <span className="body-small text-text-secondary">
                    {new Date(image.uploadDate).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex space-x-2 mt-3">
                  <button 
                    onClick={() => console.log('Edit image', image.id)}
                    className="btn-secondary text-sm flex-1"
                  >
                    Edit
                  </button>
                  <button 
                    onClick={() => console.log('Delete image', image.id)}
                    className="btn-outline text-sm text-red-600 border-red-600 hover:bg-red-50 flex-1"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredImages.length === 0 && (
          <div className="service-card p-12 text-center">
            <h3 className="subsection-title mb-4 text-primary">No Images Found</h3>
            <p className="body-regular text-text-secondary">
              {selectedCategory === 'all' 
                ? 'No images in the gallery. Upload some images to get started!'
                : `No images found in the "${selectedCategory}" category.`
              }
            </p>
          </div>
        )}
      </div>
    </div>
  )
} 