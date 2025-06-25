'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function StaffCalendarPage() {
  const router = useRouter()
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [viewMode, setViewMode] = useState<'month' | 'week' | 'day'>('month')
  const [showEventForm, setShowEventForm] = useState(false)
  const [newEvent, setNewEvent] = useState({
    title: '',
    type: 'booking',
    startDate: '',
    endDate: '',
    description: ''
  })

  const [events] = useState([
    {
      id: 1,
      title: 'Sarah & Michael Wedding',
      type: 'booking',
      date: '2024-12-15',
      startTime: '14:00',
      endTime: '23:00',
      status: 'confirmed'
    },
    {
      id: 2,
      title: 'TechCorp Corporate Event',
      type: 'booking',
      date: '2024-12-20',
      startTime: '09:00',
      endTime: '17:00',
      status: 'pending'
    },
    {
      id: 3,
      title: 'Hall Maintenance',
      type: 'maintenance',
      date: '2024-12-10',
      startTime: '08:00',
      endTime: '16:00',
      status: 'scheduled'
    },
    {
      id: 4,
      title: 'Staff Meeting',
      type: 'meeting',
      date: '2024-12-12',
      startTime: '10:00',
      endTime: '11:00',
      status: 'confirmed'
    }
  ])

  console.log('mavera-hall-staff-calendar', new Date().toISOString(), 'Staff calendar page rendered')

  const handleCreateEvent = () => {
    console.log('mavera-hall-staff-calendar-create', new Date().toISOString(), 'Creating new event')
    if (newEvent.title && newEvent.startDate) {
      // Here you would typically save to backend
      setNewEvent({ title: '', type: 'booking', startDate: '', endDate: '', description: '' })
      setShowEventForm(false)
    }
  }

  const handleBackToDashboard = () => {
    console.log('mavera-hall-staff-calendar-dashboard', new Date().toISOString(), 'Back to dashboard clicked')
    router.push('/staff')
  }

  const handleViewBookings = () => {
    console.log('mavera-hall-staff-calendar-bookings', new Date().toISOString(), 'View bookings clicked')
    router.push('/staff/bookings')
  }

  const handleViewTasks = () => {
    console.log('mavera-hall-staff-calendar-tasks', new Date().toISOString(), 'View tasks clicked')
    router.push('/staff/tasks')
  }

  const handleViewAvailability = () => {
    console.log('mavera-hall-staff-calendar-availability', new Date().toISOString(), 'View availability clicked')
    router.push('/staff/availability')
  }

  const handleExportCalendar = () => {
    console.log('mavera-hall-staff-calendar-export', new Date().toISOString(), 'Export calendar clicked')
    // Here you would typically export calendar data
  }

  const handlePrintCalendar = () => {
    console.log('mavera-hall-staff-calendar-print', new Date().toISOString(), 'Print calendar clicked')
    window.print()
  }

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case 'booking': return 'bg-blue-100 text-blue-800'
      case 'maintenance': return 'bg-red-100 text-red-800'
      case 'meeting': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800'
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'scheduled': return 'bg-blue-100 text-blue-800'
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

  const getEventsForDate = (date: Date) => {
    const dateString = date.toISOString().split('T')[0]
    return events.filter(event => event.date === dateString)
  }

  return (
    <div className="py-24">
      <div className="container-custom">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="section-title text-primary">Calendar</h1>
            <p className="body-regular text-text-secondary">
              Manage your schedule and view all events
            </p>
          </div>
          <div className="space-x-3">
            <button 
              onClick={handleViewBookings}
              className="btn-secondary"
            >
              View Bookings
            </button>
            <button 
              onClick={handleBackToDashboard}
              className="btn-outline"
            >
              Back to Dashboard
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
                Previous
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
                Next
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
            <div className="flex space-x-3">
              <button 
                onClick={() => setShowEventForm(true)}
                className="btn-primary"
              >
                Add Event
              </button>
              <button 
                onClick={handleExportCalendar}
                className="btn-secondary"
              >
                Export
              </button>
              <button 
                onClick={handlePrintCalendar}
                className="btn-outline"
              >
                Print
              </button>
            </div>
          </div>
        </div>

        {/* New Event Form */}
        {showEventForm && (
          <div className="service-card p-6 mb-8">
            <h3 className="subsection-title mb-4 text-primary">Add New Event</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block body-regular font-semibold mb-2">Event Title</label>
                <input 
                  type="text" 
                  value={newEvent.title}
                  onChange={(e) => setNewEvent({...newEvent, title: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Enter event title"
                />
              </div>
              <div>
                <label className="block body-regular font-semibold mb-2">Event Type</label>
                <select 
                  value={newEvent.type}
                  onChange={(e) => setNewEvent({...newEvent, type: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option value="booking">Booking</option>
                  <option value="maintenance">Maintenance</option>
                  <option value="meeting">Meeting</option>
                </select>
              </div>
              <div>
                <label className="block body-regular font-semibold mb-2">Start Date</label>
                <input 
                  type="date" 
                  value={newEvent.startDate}
                  onChange={(e) => setNewEvent({...newEvent, startDate: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
              <div>
                <label className="block body-regular font-semibold mb-2">End Date</label>
                <input 
                  type="date" 
                  value={newEvent.endDate}
                  onChange={(e) => setNewEvent({...newEvent, endDate: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block body-regular font-semibold mb-2">Description</label>
                <textarea 
                  value={newEvent.description}
                  onChange={(e) => setNewEvent({...newEvent, description: e.target.value})}
                  rows={3}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Enter event description"
                />
              </div>
            </div>
            <div className="flex space-x-3 mt-6">
              <button 
                onClick={handleCreateEvent}
                className="btn-primary"
              >
                Create Event
              </button>
              <button 
                onClick={() => setShowEventForm(false)}
                className="btn-outline"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

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
                      {getEventsForDate(day).map(event => (
                        <div 
                          key={event.id}
                          className={`p-1 text-xs rounded cursor-pointer ${getEventTypeColor(event.type)}`}
                          onClick={() => setSelectedDate(day)}
                        >
                          <div className="font-semibold">{event.title}</div>
                          <div className="text-xs opacity-75">
                            {event.startTime} - {event.endTime}
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

        {/* Quick Actions */}
        <div className="grid md:grid-cols-3 gap-6 mt-8">
          <div className="service-card p-6">
            <h3 className="subsection-title mb-4 text-primary">Quick Actions</h3>
            <div className="space-y-3">
              <button 
                onClick={handleViewTasks}
                className="btn-secondary w-full"
              >
                View My Tasks
              </button>
              <button 
                onClick={handleViewAvailability}
                className="btn-secondary w-full"
              >
                Check Availability
              </button>
              <button 
                onClick={() => router.push('/staff/notifications')}
                className="btn-secondary w-full"
              >
                View Notifications
              </button>
            </div>
          </div>

          <div className="service-card p-6">
            <h3 className="subsection-title mb-4 text-primary">Upcoming Events</h3>
            <div className="space-y-3">
              {events.slice(0, 3).map(event => (
                <div key={event.id} className="flex justify-between items-center p-3 bg-gray-50 rounded">
                  <div>
                    <div className="font-semibold text-sm">{event.title}</div>
                    <div className="text-xs text-text-secondary">{event.date}</div>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(event.status)}`}>
                    {event.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="service-card p-6">
            <h3 className="subsection-title mb-4 text-primary">Calendar Stats</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="body-regular">Total Events</span>
                <span className="font-semibold">{events.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="body-regular">Confirmed Bookings</span>
                <span className="font-semibold text-green-600">
                  {events.filter(e => e.status === 'confirmed').length}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="body-regular">Pending Events</span>
                <span className="font-semibold text-yellow-600">
                  {events.filter(e => e.status === 'pending').length}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 