'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function StaffBookingsPage() {
  const router = useRouter()
  const [bookings] = useState([
    {
      id: 1,
      clientName: 'Sarah Johnson',
      eventType: 'Wedding',
      date: '2024-12-15',
      time: '14:00-23:00',
      status: 'confirmed',
      guestCount: 150,
      totalAmount: 8000,
      phone: '+966 50 123 4567',
      email: 'sarah.johnson@email.com'
    },
    {
      id: 2,
      clientName: 'TechCorp',
      eventType: 'Corporate Event',
      date: '2024-12-20',
      time: '09:00-17:00',
      status: 'pending',
      guestCount: 80,
      totalAmount: 5000,
      phone: '+966 11 234 5678',
      email: 'events@techcorp.com'
    },
    {
      id: 3,
      clientName: 'Ahmed Al-Rashid',
      eventType: 'Birthday Party',
      date: '2024-12-25',
      time: '18:00-23:00',
      status: 'confirmed',
      guestCount: 50,
      totalAmount: 3000,
      phone: '+966 55 987 6543',
      email: 'ahmed.rashid@email.com'
    }
  ])

  console.log('mavera-hall-staff-bookings', new Date().toISOString(), 'Staff bookings page rendered')

  const handleBackToDashboard = () => {
    console.log('mavera-hall-staff-bookings-dashboard', new Date().toISOString(), 'Back to dashboard clicked')
    router.push('/staff')
  }

  const handleViewCalendar = () => {
    console.log('mavera-hall-staff-bookings-calendar', new Date().toISOString(), 'View calendar clicked')
    router.push('/staff/calendar')
  }

  const handleNewBooking = () => {
    console.log('mavera-hall-staff-bookings-new', new Date().toISOString(), 'New booking clicked')
    router.push('/staff/bookings/new')
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800'
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'cancelled': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="py-24">
      <div className="container-custom">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="section-title text-primary">Bookings Management</h1>
            <p className="body-regular text-text-secondary">
              View and manage all hall bookings
            </p>
          </div>
          <div className="space-x-3">
            <button 
              onClick={handleViewCalendar}
              className="btn-secondary"
            >
              Calendar View
            </button>
            <button 
              onClick={handleNewBooking}
              className="btn-primary"
            >
              New Booking
            </button>
            <button 
              onClick={handleBackToDashboard}
              className="btn-outline"
            >
              Back to Dashboard
            </button>
          </div>
        </div>

        {/* Booking Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="service-card p-6 text-center">
            <h3 className="subsection-title text-primary mb-2">{bookings.length}</h3>
            <p className="body-regular">Total Bookings</p>
          </div>
          <div className="service-card p-6 text-center">
            <h3 className="subsection-title text-green-600 mb-2">
              {bookings.filter(b => b.status === 'confirmed').length}
            </h3>
            <p className="body-regular">Confirmed</p>
          </div>
          <div className="service-card p-6 text-center">
            <h3 className="subsection-title text-yellow-600 mb-2">
              {bookings.filter(b => b.status === 'pending').length}
            </h3>
            <p className="body-regular">Pending</p>
          </div>
          <div className="service-card p-6 text-center">
            <h3 className="subsection-title text-blue-600 mb-2">
              SAR {bookings.reduce((sum, b) => sum + b.totalAmount, 0).toLocaleString()}
            </h3>
            <p className="body-regular">Total Revenue</p>
          </div>
        </div>

        {/* Filters */}
        <div className="service-card p-6 mb-8">
          <div className="flex justify-between items-center">
            <div className="flex space-x-4">
              <select className="p-2 border border-gray-300 rounded-lg">
                <option>All Status</option>
                <option>Confirmed</option>
                <option>Pending</option>
                <option>Cancelled</option>
              </select>
              <select className="p-2 border border-gray-300 rounded-lg">
                <option>All Event Types</option>
                <option>Wedding</option>
                <option>Corporate Event</option>
                <option>Birthday Party</option>
              </select>
              <input 
                type="date" 
                className="p-2 border border-gray-300 rounded-lg"
                placeholder="Filter by date"
              />
            </div>
            <div className="flex space-x-3">
              <button className="btn-secondary">Export</button>
              <button className="btn-outline">Print</button>
            </div>
          </div>
        </div>

        {/* Bookings List */}
        <div className="space-y-4">
          {bookings.map((booking) => (
            <div key={booking.id} className="service-card p-6">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="subsection-title">{booking.clientName}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(booking.status)}`}>
                      {booking.status}
                    </span>
                    <span className="px-2 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800">
                      {booking.eventType}
                    </span>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="body-regular"><strong>Date:</strong> {new Date(booking.date).toLocaleDateString()}</p>
                      <p className="body-regular"><strong>Time:</strong> {booking.time}</p>
                      <p className="body-regular"><strong>Guests:</strong> {booking.guestCount}</p>
                    </div>
                    <div>
                      <p className="body-regular"><strong>Phone:</strong> {booking.phone}</p>
                      <p className="body-regular"><strong>Email:</strong> {booking.email}</p>
                      <p className="body-regular"><strong>Amount:</strong> SAR {booking.totalAmount.toLocaleString()}</p>
                    </div>
                  </div>
                </div>
                <div className="flex space-x-2 ml-4">
                  <button 
                    onClick={() => console.log('View booking details', booking.id)}
                    className="btn-primary text-sm"
                  >
                    View Details
                  </button>
                  <button 
                    onClick={() => console.log('Edit booking', booking.id)}
                    className="btn-secondary text-sm"
                  >
                    Edit
                  </button>
                  <button 
                    onClick={() => console.log('Contact client', booking.id)}
                    className="btn-outline text-sm"
                  >
                    Contact
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {bookings.length === 0 && (
          <div className="service-card p-12 text-center">
            <h3 className="subsection-title mb-4 text-primary">No Bookings Found</h3>
            <p className="body-regular text-text-secondary">
              No bookings match your current filters.
            </p>
          </div>
        )}
      </div>
    </div>
  )
} 