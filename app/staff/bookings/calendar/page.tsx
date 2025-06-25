'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function StaffBookingsCalendarPage() {
  const router = useRouter()
  const [currentDate, setCurrentDate] = useState(new Date())
  const [viewMode, setViewMode] = useState<'month' | 'week' | 'day'>('month')

  const [bookings] = useState([
    {
      id: 1,
      title: 'Sarah & Michael Wedding',
      date: '2024-12-15',
      startTime: '14:00',
      endTime: '23:00',
      status: 'confirmed',
      clientName: 'Sarah Johnson'
    },
    {
      id: 2,
      title: 'TechCorp Corporate Event',
      date: '2024-12-20',
      startTime: '09:00',
      endTime: '17:00',
      status: 'pending',
      clientName: 'TechCorp'
    },
    {
      id: 3,
      title: 'Ahmed Birthday Party',
      date: '2024-12-25',
      startTime: '18:00',
      endTime: '23:00',
      status: 'confirmed',
      clientName: 'Ahmed Al-Rashid'
    }
  ])

  console.log('mavera-hall-staff-bookings-calendar', new Date().toISOString(), 'Staff bookings calendar page rendered')

  const handleBackToBookings = () => {
    console.log('mavera-hall-staff-bookings-calendar-back', new Date().toISOString(), 'Back to bookings clicked')
    router.push('/staff/bookings')
  }

  const handleNewBooking = () => {
    console.log('mavera-hall-staff-bookings-calendar-new', new Date().toISOString(), 'New booking clicked')
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

  // Generate calendar days for current month
  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDay = firstDay.getDay()
    
    const days = []
    for (let i = 0; i < startingDay; i++) {
      days.push(null)
    }
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i))
    }
    return days
  }

  const calendarDays = getDaysInMonth(currentDate)

  const getBookingsForDate = (date: Date) => {
    const dateString = date.toISOString().split('T')[0]
    return bookings.filter(booking => booking.date === dateString)
  }

  return (
    <div className="py-24">
      <div className="container-custom">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="section-title text-primary">Bookings Calendar</h1>
            <p className="body-regular text-text-secondary">
              View all bookings in calendar format
            </p>
          </div>
          <div className="space-x-3">
            <button 
              onClick={handleNewBooking}
              className="btn-primary"
            >
              New Booking
            </button>
            <button 
              onClick={handleBackToBookings}
              className="btn-outline"
            >
              Back to Bookings
            </button>
          </div>
        </div>

        {/* Calendar Controls */}
        <div className="service-card p-6 mb-8">
          <div className="flex justify-between items-center">
            <div className="flex space-x-4">
              <button 
                onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1))}
                className="btn-secondary"
              >
                Previous Month
              </button>
              <button 
                onClick={() => setCurrentDate(new Date())}
                className="btn-primary"
              >
                Today
              </button>
              <button 
                onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1))}
                className="btn-secondary"
              >
                Next Month
              </button>
            </div>
            <div className="flex items-center space-x-4">
              <h2 className="subsection-title">
                {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
              </h2>
              <div className="flex space-x-2">
                <button 
                  onClick={() => setViewMode('month')}
                  className={`px-3 py-1 rounded ${viewMode === 'month' ? 'bg-primary text-white' : 'bg-gray-200'}`}
                >
                  Month
                </button>
                <button 
                  onClick={() => setViewMode('week')}
                  className={`px-3 py-1 rounded ${viewMode === 'week' ? 'bg-primary text-white' : 'bg-gray-200'}`}
                >
                  Week
                </button>
                <button 
                  onClick={() => setViewMode('day')}
                  className={`px-3 py-1 rounded ${viewMode === 'day' ? 'bg-primary text-white' : 'bg-gray-200'}`}
                >
                  Day
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Calendar Grid */}
        <div className="service-card p-6">
          <div className="grid grid-cols-7 gap-1">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div key={day} className="p-3 text-center font-semibold bg-gray-100">
                {day}
              </div>
            ))}
            {calendarDays.map((day, index) => (
              <div 
                key={index} 
                className={`min-h-32 p-2 border border-gray-200 ${
                  day && day.toDateString() === new Date().toDateString() ? 'bg-blue-50' : ''
                }`}
              >
                {day && (
                  <>
                    <div className="text-sm font-semibold mb-2">
                      {day.getDate()}
                    </div>
                    <div className="space-y-1">
                      {getBookingsForDate(day).map(booking => (
                        <div 
                          key={booking.id}
                          className={`p-1 text-xs rounded cursor-pointer ${getStatusColor(booking.status)}`}
                          onClick={() => console.log('View booking', booking.id)}
                        >
                          <div className="font-semibold">{booking.title}</div>
                          <div className="text-xs opacity-75">
                            {booking.startTime} - {booking.endTime}
                          </div>
                          <div className="text-xs opacity-75">
                            {booking.clientName}
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Legend */}
        <div className="service-card p-6 mt-8">
          <h3 className="subsection-title mb-4 text-primary">Legend</h3>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-green-100 rounded"></div>
              <span className="body-regular">Confirmed Bookings</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-yellow-100 rounded"></div>
              <span className="body-regular">Pending Bookings</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-red-100 rounded"></div>
              <span className="body-regular">Cancelled Bookings</span>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid md:grid-cols-3 gap-6 mt-8">
          <div className="service-card p-6 text-center">
            <h3 className="subsection-title text-green-600 mb-2">
              {bookings.filter(b => b.status === 'confirmed').length}
            </h3>
            <p className="body-regular">Confirmed Bookings</p>
          </div>
          <div className="service-card p-6 text-center">
            <h3 className="subsection-title text-yellow-600 mb-2">
              {bookings.filter(b => b.status === 'pending').length}
            </h3>
            <p className="body-regular">Pending Bookings</p>
          </div>
          <div className="service-card p-6 text-center">
            <h3 className="subsection-title text-primary mb-2">{bookings.length}</h3>
            <p className="body-regular">Total Bookings</p>
          </div>
        </div>
      </div>
    </div>
  )
} 