'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function StaffSupportPage() {
  const router = useRouter()
  const [selectedTicket, setSelectedTicket] = useState<number | null>(null)
  const [replyText, setReplyText] = useState('')

  const [tickets] = useState([
    {
      id: 1,
      customerName: 'Sarah Johnson',
      email: 'sarah.johnson@email.com',
      phone: '+966 50 123 4567',
      subject: 'Wedding booking inquiry',
      message: 'I would like to know more about your wedding packages and availability for December 2024.',
      status: 'open',
      priority: 'high',
      category: 'booking',
      createdAt: '2024-12-01T10:30:00',
      lastUpdated: '2024-12-01T14:20:00',
      assignedTo: 'Support Team'
    },
    {
      id: 2,
      customerName: 'TechCorp Events',
      email: 'events@techcorp.com',
      phone: '+966 11 234 5678',
      subject: 'Corporate event pricing',
      message: 'We are planning a corporate event for 80 people and need pricing information for different packages.',
      status: 'in_progress',
      priority: 'normal',
      category: 'pricing',
      createdAt: '2024-11-30T15:45:00',
      lastUpdated: '2024-12-01T09:15:00',
      assignedTo: 'Ahmed Hassan'
    },
    {
      id: 3,
      customerName: 'Ahmed Al-Rashid',
      email: 'ahmed.rashid@email.com',
      phone: '+966 55 987 6543',
      subject: 'Catering menu questions',
      message: 'I have some questions about the catering menu options for my birthday party.',
      status: 'resolved',
      priority: 'low',
      category: 'catering',
      createdAt: '2024-11-29T12:20:00',
      lastUpdated: '2024-11-30T16:30:00',
      assignedTo: 'Fatima Ali'
    }
  ])

  console.log('mavera-hall-staff-support', new Date().toISOString(), 'Staff support page rendered')

  const handleBackToDashboard = () => {
    console.log('mavera-hall-staff-support-dashboard', new Date().toISOString(), 'Back to dashboard clicked')
    router.push('/staff')
  }

  const handleReplyToTicket = (ticketId: number) => {
    console.log('mavera-hall-staff-support-reply', new Date().toISOString(), 'Replying to ticket', ticketId)
    if (replyText.trim()) {
      setReplyText('')
      setSelectedTicket(null)
      // Here you would typically save the reply to backend
    }
  }

  const handleAssignTicket = (ticketId: number, assignee: string) => {
    console.log('mavera-hall-staff-support-assign', new Date().toISOString(), 'Assigning ticket', ticketId, 'to', assignee)
    // Here you would typically update the ticket assignment
  }

  const handleUpdateStatus = (ticketId: number, status: string) => {
    console.log('mavera-hall-staff-support-status', new Date().toISOString(), 'Updating ticket status', ticketId, 'to', status)
    // Here you would typically update the ticket status
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'bg-red-100 text-red-800'
      case 'in_progress': return 'bg-yellow-100 text-yellow-800'
      case 'resolved': return 'bg-green-100 text-green-800'
      case 'closed': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800'
      case 'normal': return 'bg-blue-100 text-blue-800'
      case 'low': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'booking': return 'bg-purple-100 text-purple-800'
      case 'pricing': return 'bg-green-100 text-green-800'
      case 'catering': return 'bg-orange-100 text-orange-800'
      case 'technical': return 'bg-blue-100 text-blue-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="py-24">
      <div className="container-custom">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="section-title text-primary">Support Tickets</h1>
            <p className="body-regular text-text-secondary">
              Manage customer support requests and inquiries
            </p>
          </div>
          <button 
            onClick={handleBackToDashboard}
            className="btn-outline"
          >
            Back to Dashboard
          </button>
        </div>

        {/* Support Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="service-card p-6 text-center">
            <h3 className="subsection-title text-primary mb-2">{tickets.length}</h3>
            <p className="body-regular">Total Tickets</p>
          </div>
          <div className="service-card p-6 text-center">
            <h3 className="subsection-title text-red-600 mb-2">
              {tickets.filter(t => t.status === 'open').length}
            </h3>
            <p className="body-regular">Open</p>
          </div>
          <div className="service-card p-6 text-center">
            <h3 className="subsection-title text-yellow-600 mb-2">
              {tickets.filter(t => t.status === 'in_progress').length}
            </h3>
            <p className="body-regular">In Progress</p>
          </div>
          <div className="service-card p-6 text-center">
            <h3 className="subsection-title text-green-600 mb-2">
              {tickets.filter(t => t.status === 'resolved').length}
            </h3>
            <p className="body-regular">Resolved</p>
          </div>
        </div>

        {/* Filters */}
        <div className="service-card p-6 mb-8">
          <div className="flex justify-between items-center">
            <div className="flex space-x-4">
              <select className="p-2 border border-gray-300 rounded-lg">
                <option>All Status</option>
                <option>Open</option>
                <option>In Progress</option>
                <option>Resolved</option>
                <option>Closed</option>
              </select>
              <select className="p-2 border border-gray-300 rounded-lg">
                <option>All Priorities</option>
                <option>High</option>
                <option>Normal</option>
                <option>Low</option>
              </select>
              <select className="p-2 border border-gray-300 rounded-lg">
                <option>All Categories</option>
                <option>Booking</option>
                <option>Pricing</option>
                <option>Catering</option>
                <option>Technical</option>
              </select>
            </div>
            <div className="flex space-x-3">
              <button className="btn-secondary">Export</button>
              <button className="btn-outline">Bulk Actions</button>
            </div>
          </div>
        </div>

        {/* Tickets List */}
        <div className="space-y-4">
          {tickets.map((ticket) => (
            <div key={ticket.id} className="service-card p-6">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="subsection-title">{ticket.subject}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(ticket.status)}`}>
                      {ticket.status.replace('_', ' ')}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getPriorityColor(ticket.priority)}`}>
                      {ticket.priority}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getCategoryColor(ticket.category)}`}>
                      {ticket.category}
                    </span>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="body-regular"><strong>Customer:</strong> {ticket.customerName}</p>
                      <p className="body-regular"><strong>Email:</strong> {ticket.email}</p>
                      <p className="body-regular"><strong>Phone:</strong> {ticket.phone}</p>
                    </div>
                    <div>
                      <p className="body-regular"><strong>Assigned to:</strong> {ticket.assignedTo}</p>
                      <p className="body-regular"><strong>Created:</strong> {new Date(ticket.createdAt).toLocaleDateString()}</p>
                      <p className="body-regular"><strong>Updated:</strong> {new Date(ticket.lastUpdated).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <div className="mb-4">
                    <p className="body-regular text-text-secondary">{ticket.message}</p>
                  </div>
                </div>
                <div className="flex space-x-2 ml-4">
                  <button 
                    onClick={() => setSelectedTicket(selectedTicket === ticket.id ? null : ticket.id)}
                    className="btn-primary text-sm"
                  >
                    {selectedTicket === ticket.id ? 'Close Reply' : 'Reply'}
                  </button>
                  <button 
                    onClick={() => console.log('View ticket details', ticket.id)}
                    className="btn-secondary text-sm"
                  >
                    View Details
                  </button>
                  <button 
                    onClick={() => console.log('Call customer', ticket.phone)}
                    className="btn-outline text-sm"
                  >
                    Call
                  </button>
                </div>
              </div>

              {/* Reply Form */}
              {selectedTicket === ticket.id && (
                <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                  <h4 className="subsection-title mb-3 text-primary">Reply to {ticket.customerName}</h4>
                  <textarea 
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    rows={4}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent mb-4"
                    placeholder="Type your reply here..."
                  />
                  <div className="flex justify-between items-center">
                    <div className="flex space-x-3">
                      <button 
                        onClick={() => handleReplyToTicket(ticket.id)}
                        className="btn-primary"
                      >
                        Send Reply
                      </button>
                      <button 
                        onClick={() => setSelectedTicket(null)}
                        className="btn-outline"
                      >
                        Cancel
                      </button>
                    </div>
                    <div className="flex space-x-2">
                      <select 
                        onChange={(e) => handleAssignTicket(ticket.id, e.target.value)}
                        className="p-2 border border-gray-300 rounded-lg text-sm"
                      >
                        <option>Assign to...</option>
                        <option value="Ahmed Hassan">Ahmed Hassan</option>
                        <option value="Fatima Ali">Fatima Ali</option>
                        <option value="Support Team">Support Team</option>
                      </select>
                      <select 
                        onChange={(e) => handleUpdateStatus(ticket.id, e.target.value)}
                        className="p-2 border border-gray-300 rounded-lg text-sm"
                      >
                        <option>Update Status...</option>
                        <option value="open">Open</option>
                        <option value="in_progress">In Progress</option>
                        <option value="resolved">Resolved</option>
                        <option value="closed">Closed</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {tickets.length === 0 && (
          <div className="service-card p-12 text-center">
            <h3 className="subsection-title mb-4 text-primary">No Support Tickets</h3>
            <p className="body-regular text-text-secondary">
              No support tickets found matching your current filters.
            </p>
          </div>
        )}

        {/* Quick Actions */}
        <div className="service-card p-6 mt-8">
          <h3 className="subsection-title mb-4 text-primary">Quick Actions</h3>
          <div className="grid md:grid-cols-4 gap-4">
            <button 
              onClick={() => console.log('Create new ticket')}
              className="btn-primary"
            >
              Create Ticket
            </button>
            <button 
              onClick={() => console.log('View all tickets')}
              className="btn-secondary"
            >
              View All Tickets
            </button>
            <button 
              onClick={() => console.log('Export tickets')}
              className="btn-outline"
            >
              Export Tickets
            </button>
            <button 
              onClick={() => console.log('Support settings')}
              className="btn-outline"
            >
              Settings
            </button>
          </div>
        </div>
      </div>
    </div>
  )
} 