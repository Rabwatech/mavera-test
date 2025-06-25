'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function StaffFaqsPage() {
  const router = useRouter()
  const [showNewForm, setShowNewForm] = useState(false)

  const [faqs] = useState([
    {
      id: 1,
      question: 'What is the maximum capacity of the hall?',
      answer: 'Our main hall can accommodate up to 300 guests for seated events.',
      category: 'capacity',
      isPublished: true,
      views: 1250
    },
    {
      id: 2,
      question: 'Do you provide catering services?',
      answer: 'Yes, we offer comprehensive catering services including various dietary requirements.',
      category: 'catering',
      isPublished: true,
      views: 980
    }
  ])

  console.log('mavera-hall-staff-faqs', new Date().toISOString(), 'Staff FAQs page rendered')

  const handleBackToDashboard = () => {
    console.log('mavera-hall-staff-faqs-dashboard', new Date().toISOString(), 'Back to dashboard clicked')
    router.push('/staff')
  }

  return (
    <div className="py-24">
      <div className="container-custom">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="section-title text-primary">FAQ Management</h1>
            <p className="body-regular text-text-secondary">
              Manage frequently asked questions and help content
            </p>
          </div>
          <div className="space-x-3">
            <button 
              onClick={() => setShowNewForm(true)}
              className="btn-primary"
            >
              Add New FAQ
            </button>
            <button 
              onClick={handleBackToDashboard}
              className="btn-outline"
            >
              Back to Dashboard
            </button>
          </div>
        </div>

        {/* FAQ Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="service-card p-6 text-center">
            <h3 className="subsection-title text-primary mb-2">{faqs.length}</h3>
            <p className="body-regular">Total FAQs</p>
          </div>
          <div className="service-card p-6 text-center">
            <h3 className="subsection-title text-green-600 mb-2">
              {faqs.filter(f => f.isPublished).length}
            </h3>
            <p className="body-regular">Published</p>
          </div>
          <div className="service-card p-6 text-center">
            <h3 className="subsection-title text-blue-600 mb-2">
              {faqs.reduce((sum, f) => sum + f.views, 0).toLocaleString()}
            </h3>
            <p className="body-regular">Total Views</p>
          </div>
        </div>

        {/* FAQs List */}
        <div className="space-y-4">
          {faqs.map((faq) => (
            <div key={faq.id} className="service-card p-6">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="subsection-title mb-2">{faq.question}</h3>
                  <p className="body-regular text-text-secondary mb-4">{faq.answer}</p>
                  <div className="flex items-center space-x-4 text-sm text-text-secondary">
                    <span>Category: {faq.category}</span>
                    <span>Views: {faq.views.toLocaleString()}</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      faq.isPublished ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {faq.isPublished ? 'Published' : 'Draft'}
                    </span>
                  </div>
                </div>
                <div className="flex space-x-2 ml-4">
                  <button 
                    onClick={() => console.log('Edit FAQ', faq.id)}
                    className="btn-secondary text-sm"
                  >
                    Edit
                  </button>
                  <button 
                    onClick={() => console.log('Delete FAQ', faq.id)}
                    className="btn-outline text-sm text-red-600 border-red-600 hover:bg-red-50"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {faqs.length === 0 && (
          <div className="service-card p-12 text-center">
            <h3 className="subsection-title mb-4 text-primary">No FAQs Found</h3>
            <p className="body-regular text-text-secondary">
              No FAQs found. Create your first FAQ to get started!
            </p>
          </div>
        )}
      </div>
    </div>
  )
} 