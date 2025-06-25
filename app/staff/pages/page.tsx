'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function StaffPagesPage() {
  const router = useRouter()
  const [editingPage, setEditingPage] = useState<number | null>(null)
  const [editData, setEditData] = useState({
    title: '',
    content: '',
    metaDescription: '',
    isPublished: true
  })

  const [pages] = useState([
    {
      id: 1,
      title: 'Home Page',
      slug: 'home',
      content: 'Welcome to Mavera Hall - Your premier event venue...',
      metaDescription: 'Mavera Hall - Premier event venue for weddings, corporate events, and celebrations',
      lastModified: '2024-12-01',
      isPublished: true,
      views: 1250
    },
    {
      id: 2,
      title: 'About Us',
      slug: 'about',
      content: 'Learn about our history and commitment to excellence...',
      metaDescription: 'Discover the story behind Mavera Hall and our commitment to creating memorable events',
      lastModified: '2024-11-28',
      isPublished: true,
      views: 890
    },
    {
      id: 3,
      title: 'Services',
      slug: 'services',
      content: 'Explore our comprehensive range of event services...',
      metaDescription: 'Comprehensive event services including catering, decoration, and entertainment',
      lastModified: '2024-11-25',
      isPublished: true,
      views: 756
    },
    {
      id: 4,
      title: 'Contact',
      slug: 'contact',
      content: 'Get in touch with us for your event planning needs...',
      metaDescription: 'Contact Mavera Hall for event bookings and inquiries',
      lastModified: '2024-11-20',
      isPublished: true,
      views: 432
    }
  ])

  console.log('mavera-hall-staff-pages', new Date().toISOString(), 'Staff pages management page rendered')

  const handleEditPage = (page: any) => {
    console.log('mavera-hall-staff-pages-edit', new Date().toISOString(), 'Editing page', page.id)
    setEditingPage(page.id)
    setEditData({
      title: page.title,
      content: page.content,
      metaDescription: page.metaDescription,
      isPublished: page.isPublished
    })
  }

  const handleSavePage = () => {
    console.log('mavera-hall-staff-pages-save', new Date().toISOString(), 'Saving page', editingPage)
    setEditingPage(null)
    // Here you would typically save to backend
  }

  const handleCancelEdit = () => {
    console.log('mavera-hall-staff-pages-cancel', new Date().toISOString(), 'Canceling edit')
    setEditingPage(null)
  }

  const handleBackToDashboard = () => {
    console.log('mavera-hall-staff-pages-dashboard', new Date().toISOString(), 'Back to dashboard clicked')
    router.push('/staff')
  }

  const handlePreviewPage = (slug: string) => {
    console.log('mavera-hall-staff-pages-preview', new Date().toISOString(), 'Previewing page', slug)
    window.open(`/${slug}`, '_blank')
  }

  return (
    <div className="py-24">
      <div className="container-custom">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="section-title text-primary">Page Management</h1>
            <p className="body-regular text-text-secondary">
              Edit and manage website pages
            </p>
          </div>
          <button 
            onClick={handleBackToDashboard}
            className="btn-outline"
          >
            Back to Dashboard
          </button>
        </div>

        {/* Page Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="service-card p-6 text-center">
            <h3 className="subsection-title text-primary mb-2">{pages.length}</h3>
            <p className="body-regular">Total Pages</p>
          </div>
          <div className="service-card p-6 text-center">
            <h3 className="subsection-title text-green-600 mb-2">
              {pages.filter(p => p.isPublished).length}
            </h3>
            <p className="body-regular">Published</p>
          </div>
          <div className="service-card p-6 text-center">
            <h3 className="subsection-title text-blue-600 mb-2">
              {pages.reduce((sum, p) => sum + p.views, 0).toLocaleString()}
            </h3>
            <p className="body-regular">Total Views</p>
          </div>
          <div className="service-card p-6 text-center">
            <h3 className="subsection-title text-yellow-600 mb-2">
              {pages.filter(p => !p.isPublished).length}
            </h3>
            <p className="body-regular">Drafts</p>
          </div>
        </div>

        {/* Pages List */}
        <div className="space-y-4">
          {pages.map((page) => (
            <div key={page.id} className="service-card p-6">
              {editingPage === page.id ? (
                <div>
                  <h3 className="subsection-title mb-4 text-primary">Editing: {page.title}</h3>
                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label className="block body-regular font-semibold mb-2">Page Title *</label>
                      <input 
                        type="text" 
                        value={editData.title}
                        onChange={(e) => setEditData({...editData, title: e.target.value})}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block body-regular font-semibold mb-2">Meta Description</label>
                      <input 
                        type="text" 
                        value={editData.metaDescription}
                        onChange={(e) => setEditData({...editData, metaDescription: e.target.value})}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                        placeholder="SEO meta description"
                      />
                    </div>
                  </div>
                  <div className="mb-6">
                    <label className="block body-regular font-semibold mb-2">Page Content *</label>
                    <textarea 
                      value={editData.content}
                      onChange={(e) => setEditData({...editData, content: e.target.value})}
                      rows={8}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="Enter page content..."
                    />
                  </div>
                  <div className="flex items-center space-x-4 mb-6">
                    <label className="flex items-center space-x-2">
                      <input 
                        type="checkbox" 
                        checked={editData.isPublished}
                        onChange={(e) => setEditData({...editData, isPublished: e.target.checked})}
                        className="w-4 h-4 text-primary focus:ring-primary border-gray-300 rounded"
                      />
                      <span className="body-regular">Published</span>
                    </label>
                  </div>
                  <div className="flex space-x-3">
                    <button 
                      onClick={handleSavePage}
                      className="btn-primary"
                    >
                      Save Changes
                    </button>
                    <button 
                      onClick={handleCancelEdit}
                      className="btn-outline"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="subsection-title">{page.title}</h3>
                      <span className="text-sm text-text-secondary">/{page.slug}</span>
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        page.isPublished ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {page.isPublished ? 'Published' : 'Draft'}
                      </span>
                    </div>
                    <p className="body-regular text-text-secondary mb-3 line-clamp-2">
                      {page.content}
                    </p>
                    <div className="flex items-center space-x-4 text-sm text-text-secondary">
                      <span>Last modified: {new Date(page.lastModified).toLocaleDateString()}</span>
                      <span>Views: {page.views.toLocaleString()}</span>
                    </div>
                  </div>
                  <div className="flex space-x-2 ml-4">
                    <button 
                      onClick={() => handleEditPage(page)}
                      className="btn-secondary text-sm"
                    >
                      Edit
                    </button>
                    <button 
                      onClick={() => handlePreviewPage(page.slug)}
                      className="btn-primary text-sm"
                    >
                      Preview
                    </button>
                    <button 
                      onClick={() => console.log('View page analytics', page.id)}
                      className="btn-outline text-sm"
                    >
                      Analytics
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {pages.length === 0 && (
          <div className="service-card p-12 text-center">
            <h3 className="subsection-title mb-4 text-primary">No Pages Found</h3>
            <p className="body-regular text-text-secondary">
              No pages are currently available for editing.
            </p>
          </div>
        )}

        {/* Quick Actions */}
        <div className="service-card p-6 mt-8">
          <h3 className="subsection-title mb-4 text-primary">Quick Actions</h3>
          <div className="grid md:grid-cols-3 gap-4">
            <button 
              onClick={() => console.log('Create new page')}
              className="btn-primary"
            >
              Create New Page
            </button>
            <button 
              onClick={() => console.log('Import pages')}
              className="btn-secondary"
            >
              Import Pages
            </button>
            <button 
              onClick={() => console.log('Export pages')}
              className="btn-outline"
            >
              Export Pages
            </button>
          </div>
        </div>
      </div>
    </div>
  )
} 