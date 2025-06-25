'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function StaffAnnouncementsPage() {
  const router = useRouter()
  const [showNewForm, setShowNewForm] = useState(false)
  const [newAnnouncement, setNewAnnouncement] = useState({
    title: '',
    content: '',
    type: 'general',
    priority: 'normal'
  })

  const [announcements] = useState([
    {
      id: 1,
      title: 'Holiday Schedule Update',
      content: 'The hall will be closed for maintenance from December 10-12, 2024.',
      type: 'maintenance',
      priority: 'high',
      publishDate: '2024-12-01',
      status: 'published'
    },
    {
      id: 2,
      title: 'New Catering Menu Available',
      content: 'We have updated our catering menu with new seasonal dishes.',
      type: 'service',
      priority: 'normal',
      publishDate: '2024-11-28',
      status: 'published'
    },
    {
      id: 3,
      title: 'Special Wedding Package',
      content: 'Limited time offer: 20% discount on wedding packages booked before January 2025.',
      type: 'promotion',
      priority: 'high',
      publishDate: '2024-11-25',
      status: 'draft'
    }
  ])

  console.log('mavera-hall-staff-announcements', new Date().toISOString(), 'Staff announcements page rendered')

  const handleCreateAnnouncement = () => {
    console.log('mavera-hall-staff-announcements-create', new Date().toISOString(), 'Creating new announcement')
    if (newAnnouncement.title && newAnnouncement.content) {
      setNewAnnouncement({ title: '', content: '', type: 'general', priority: 'normal' })
      setShowNewForm(false)
      // Here you would typically save to backend
    }
  }

  const handleBackToDashboard = () => {
    console.log('mavera-hall-staff-announcements-dashboard', new Date().toISOString(), 'Back to dashboard clicked')
    router.push('/staff')
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800'
      case 'normal': return 'bg-blue-100 text-blue-800'
      case 'low': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'maintenance': return 'bg-yellow-100 text-yellow-800'
      case 'service': return 'bg-green-100 text-green-800'
      case 'promotion': return 'bg-purple-100 text-purple-800'
      case 'general': return 'bg-blue-100 text-blue-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published': return 'bg-green-100 text-green-800'
      case 'draft': return 'bg-yellow-100 text-yellow-800'
      case 'archived': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="py-24">
      <div className="container-custom">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="section-title text-primary">Content Management</h1>
            <p className="body-regular text-text-secondary">
              Manage announcements and website content
            </p>
          </div>
          <div className="space-x-3">
            <button 
              onClick={() => setShowNewForm(true)}
              className="btn-primary"
            >
              New Announcement
            </button>
            <button 
              onClick={handleBackToDashboard}
              className="btn-outline"
            >
              Back to Dashboard
            </button>
          </div>
        </div>

        {/* Content Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="service-card p-6 text-center">
            <h3 className="subsection-title text-primary mb-2">{announcements.length}</h3>
            <p className="body-regular">Total Announcements</p>
          </div>
          <div className="service-card p-6 text-center">
            <h3 className="subsection-title text-green-600 mb-2">
              {announcements.filter(a => a.status === 'published').length}
            </h3>
            <p className="body-regular">Published</p>
          </div>
          <div className="service-card p-6 text-center">
            <h3 className="subsection-title text-yellow-600 mb-2">
              {announcements.filter(a => a.status === 'draft').length}
            </h3>
            <p className="body-regular">Drafts</p>
          </div>
          <div className="service-card p-6 text-center">
            <h3 className="subsection-title text-red-600 mb-2">
              {announcements.filter(a => a.priority === 'high').length}
            </h3>
            <p className="body-regular">High Priority</p>
          </div>
        </div>

        {/* New Announcement Form */}
        {showNewForm && (
          <div className="service-card p-6 mb-8">
            <h3 className="subsection-title mb-4 text-primary">Create New Announcement</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block body-regular font-semibold mb-2">Title *</label>
                <input 
                  type="text" 
                  value={newAnnouncement.title}
                  onChange={(e) => setNewAnnouncement({...newAnnouncement, title: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Enter announcement title"
                />
              </div>
              <div>
                <label className="block body-regular font-semibold mb-2">Type</label>
                <select 
                  value={newAnnouncement.type}
                  onChange={(e) => setNewAnnouncement({...newAnnouncement, type: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option value="general">General</option>
                  <option value="maintenance">Maintenance</option>
                  <option value="service">Service Update</option>
                  <option value="promotion">Promotion</option>
                </select>
              </div>
              <div>
                <label className="block body-regular font-semibold mb-2">Priority</label>
                <select 
                  value={newAnnouncement.priority}
                  onChange={(e) => setNewAnnouncement({...newAnnouncement, priority: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option value="low">Low</option>
                  <option value="normal">Normal</option>
                  <option value="high">High</option>
                </select>
              </div>
              <div className="md:col-span-2">
                <label className="block body-regular font-semibold mb-2">Content *</label>
                <textarea 
                  value={newAnnouncement.content}
                  onChange={(e) => setNewAnnouncement({...newAnnouncement, content: e.target.value})}
                  rows={6}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Enter announcement content..."
                />
              </div>
            </div>
            <div className="flex space-x-3 mt-6">
              <button 
                onClick={handleCreateAnnouncement}
                className="btn-primary"
              >
                Create Announcement
              </button>
              <button 
                onClick={() => setShowNewForm(false)}
                className="btn-outline"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Filters */}
        <div className="service-card p-6 mb-8">
          <div className="flex justify-between items-center">
            <div className="flex space-x-4">
              <select className="p-2 border border-gray-300 rounded-lg">
                <option>All Types</option>
                <option>General</option>
                <option>Maintenance</option>
                <option>Service Update</option>
                <option>Promotion</option>
              </select>
              <select className="p-2 border border-gray-300 rounded-lg">
                <option>All Status</option>
                <option>Published</option>
                <option>Draft</option>
                <option>Archived</option>
              </select>
              <select className="p-2 border border-gray-300 rounded-lg">
                <option>All Priorities</option>
                <option>High</option>
                <option>Normal</option>
                <option>Low</option>
              </select>
            </div>
            <div className="flex space-x-3">
              <button className="btn-secondary">Export</button>
              <button className="btn-outline">Bulk Actions</button>
            </div>
          </div>
        </div>

        {/* Announcements List */}
        <div className="space-y-4">
          {announcements.map((announcement) => (
            <div key={announcement.id} className="service-card p-6">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="subsection-title">{announcement.title}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getPriorityColor(announcement.priority)}`}>
                      {announcement.priority}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getTypeColor(announcement.type)}`}>
                      {announcement.type}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(announcement.status)}`}>
                      {announcement.status}
                    </span>
                  </div>
                  <p className="body-regular text-text-secondary mb-3">{announcement.content}</p>
                  <p className="body-small text-text-secondary">
                    Published: {new Date(announcement.publishDate).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex space-x-2 ml-4">
                  <button 
                    onClick={() => console.log('Edit announcement', announcement.id)}
                    className="btn-secondary text-sm"
                  >
                    Edit
                  </button>
                  <button 
                    onClick={() => console.log('View announcement', announcement.id)}
                    className="btn-primary text-sm"
                  >
                    View
                  </button>
                  <button 
                    onClick={() => console.log('Delete announcement', announcement.id)}
                    className="btn-outline text-sm text-red-600 border-red-600 hover:bg-red-50"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {announcements.length === 0 && (
          <div className="service-card p-12 text-center">
            <h3 className="subsection-title mb-4 text-primary">No Announcements</h3>
            <p className="body-regular text-text-secondary">
              No announcements found. Create your first announcement to get started!
            </p>
          </div>
        )}
      </div>
    </div>
  )
} 