'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function StaffAvailabilityPage() {
  const router = useRouter()
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDates, setSelectedDates] = useState<Date[]>([])
  const [availabilityType, setAvailabilityType] = useState<'available' | 'unavailable' | 'maintenance'>('unavailable')
  const [showBulkEdit, setShowBulkEdit] = useState(false)
  const [bulkEditData, setBulkEditData] = useState({
    startDate: '',
    endDate: '',
    reason: '',
    type: 'unavailable'
  })

  const [availabilityData] = useState([
    {
      date: '2024-12-10',
      status: 'maintenance',
      reason: 'Scheduled maintenance and cleaning',
      bookings: []
    },
    {
      date: '2024-12-15',
      status: 'booked',
      reason: 'Sarah & Michael Wedding',
      bookings: [
        { id: 1, client: 'Sarah Johnson', event: 'Wedding', time: '14:00-23:00' }
      ]
    },
    {
      date: '2024-12-20',
      status: 'booked',
      reason: 'TechCorp Corporate Event',
      bookings: [
        { id: 2, client: 'TechCorp', event: 'Corporate Meeting', time: '09:00-17:00' }
      ]
    },
    {
      date: '2024-12-25',
      status: 'unavailable',
      reason: 'Holiday - Christmas',
      bookings: []
    }
  ])

  console.log('mavera-hall-staff-availability', new Date().toISOString(), 'Staff availability page rendered')

  const handleDateSelect = (date: Date) => {
    console.log('mavera-hall-staff-availability-select', new Date().toISOString(), `Date selected: ${date.toDateString()}`)
    const dateString = date.toISOString().split('T')[0]
    const existingData = availabilityData.find(d => d.date === dateString)
    
    if (existingData && existingData.status === 'booked') {
      alert('This date has existing bookings and cannot be modified.')
      return
    }
    
    setSelectedDates(prev => 
      prev.some(d => d.toDateString() === date.toDateString())
        ? prev.filter(d => d.toDateString() !== date.toDateString())
        : [...prev, date]
    )
  }

  const handleUpdateAvailability = () => {
    console.log('mavera-hall-staff-availability-update', new Date().toISOString(), `Updating availability for ${selectedDates.length} dates`)
    if (selectedDates.length === 0) return
    
    // Here you would typically update backend
    setSelectedDates([])
  }

  const handleBulkEdit = () => {
    console.log('mavera-hall-staff-availability-bulk', new Date().toISOString(), 'Bulk edit availability')
    if (bulkEditData.startDate && bulkEditData.endDate) {
      // Here you would typically update backend
      setBulkEditData({ startDate: '', endDate: '', reason: '', type: 'unavailable' })
      setShowBulkEdit(false)
    }
  }

  const handleBackToDashboard = () => {
    console.log('mavera-hall-staff-availability-dashboard', new Date().toISOString(), 'Back to dashboard clicked')
    router.push('/staff')
  }

  const handleViewHall = () => {
    console.log('mavera-hall-staff-availability-hall', new Date().toISOString(), 'View hall clicked')
    router.push('/staff/hall')
  }

  const handleViewCalendar = () => {
    console.log('mavera-hall-staff-availability-calendar', new Date().toISOString(), 'View calendar clicked')
    router.push('/staff/calendar')
  }

  const handleViewBookings = () => {
    console.log('mavera-hall-staff-availability-bookings', new Date().toISOString(), 'View bookings clicked')
    router.push('/staff/bookings')
  }

  const handleExportAvailability = () => {
    console.log('mavera-hall-staff-availability-export', new Date().toISOString(), 'Export availability clicked')
    // Here you would typically export availability data
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

  const getAvailabilityForDate = (date: Date) => {
    const dateString = date.toISOString().split('T')[0]
    return availabilityData.find(d => d.date === dateString)
  }

  const getDateStatusColor = (date: Date) => {
    const availability = getAvailabilityForDate(date)
    if (!availability) return 'bg-gray-100'
    
    switch (availability.status) {
      case 'available': return 'bg-green-100'
      case 'unavailable': return 'bg-red-100'
      case 'maintenance': return 'bg-yellow-100'
      case 'booked': return 'bg-blue-100'
      default: return 'bg-gray-100'
    }
  }

  const getDateStatusText = (date: Date) => {
    const availability = getAvailabilityForDate(date)
    if (!availability) return ''
    
    switch (availability.status) {
      case 'available': return 'Available'
      case 'unavailable': return 'Unavailable'
      case 'maintenance': return 'Maintenance'
      case 'booked': return 'Booked'
      default: return ''
    }
  }

  const isDateSelected = (date: Date) => {
    return selectedDates.some(d => d.toDateString() === date.toDateString())
  }

  const availableDays = availabilityData.filter(d => d.status === 'available').length
  const unavailableDays = availabilityData.filter(d => d.status === 'unavailable').length
  const bookedDays = availabilityData.filter(d => d.status === 'booked').length
  const maintenanceDays = availabilityData.filter(d => d.status === 'maintenance').length

  return (
    <div className="py-24">
      <div className="container-custom">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="section-title text-primary">Availability Management</h1>
            <p className="body-regular text-text-secondary">
              Manage hall availability and scheduling
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

        {/* Availability Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="service-card p-6 text-center">
            <h3 className="subsection-title text-green-600 mb-2">{availableDays}</h3>
            <p className="body-regular">Available Days</p>
          </div>
          <div className="service-card p-6 text-center">
            <h3 className="subsection-title text-red-600 mb-2">{unavailableDays}</h3>
            <p className="body-regular">Unavailable Days</p>
          </div>
          <div className="service-card p-6 text-center">
            <h3 className="subsection-title text-blue-600 mb-2">{bookedDays}</h3>
            <p className="body-regular">Booked Days</p>
          </div>
          <div className="service-card p-6 text-center">
            <h3 className="subsection-title text-yellow-600 mb-2">{maintenanceDays}</h3>
            <p className="body-regular">Maintenance Days</p>
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
                Current Month
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
              <div className="flex space-x-3">
                <button 
                  onClick={() => setShowBulkEdit(true)}
                  className="btn-secondary"
                >
                  Bulk Edit
                </button>
                <button 
                  onClick={handleExportAvailability}
                  className="btn-outline"
                >
                  Export
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bulk Edit Form */}
        {showBulkEdit && (
          <div className="service-card p-6 mb-8">
            <h3 className="subsection-title mb-4 text-primary">Bulk Edit Availability</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block body-regular font-semibold mb-2">Start Date</label>
                <input 
                  type="date" 
                  value={bulkEditData.startDate}
                  onChange={(e) => setBulkEditData({...bulkEditData, startDate: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
              <div>
                <label className="block body-regular font-semibold mb-2">End Date</label>
                <input 
                  type="date" 
                  value={bulkEditData.endDate}
                  onChange={(e) => setBulkEditData({...bulkEditData, endDate: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
              <div>
                <label className="block body-regular font-semibold mb-2">Status</label>
                <select 
                  value={bulkEditData.type}
                  onChange={(e) => setBulkEditData({...bulkEditData, type: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option value="available">Available</option>
                  <option value="unavailable">Unavailable</option>
                  <option value="maintenance">Maintenance</option>
                </select>
              </div>
              <div>
                <label className="block body-regular font-semibold mb-2">Reason</label>
                <input 
                  type="text" 
                  value={bulkEditData.reason}
                  onChange={(e) => setBulkEditData({...bulkEditData, reason: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Enter reason for unavailability"
                />
              </div>
            </div>
            <div className="flex space-x-3 mt-6">
              <button 
                onClick={handleBulkEdit}
                className="btn-primary"
              >
                Update Availability
              </button>
              <button 
                onClick={() => setShowBulkEdit(false)}
                className="btn-outline"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Selected Dates Actions */}
        {selectedDates.length > 0 && (
          <div className="service-card p-6 mb-8">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="subsection-title mb-2 text-primary">
                  {selectedDates.length} Date{selectedDates.length !== 1 ? 's' : ''} Selected
                </h3>
                <p className="body-small text-text-secondary">
                  {selectedDates.map(d => d.toLocaleDateString()).join(', ')}
                </p>
              </div>
              <div className="flex space-x-3">
                <select 
                  value={availabilityType}
                  onChange={(e) => setAvailabilityType(e.target.value as any)}
                  className="p-2 border border-gray-300 rounded-lg"
                >
                  <option value="available">Available</option>
                  <option value="unavailable">Unavailable</option>
                  <option value="maintenance">Maintenance</option>
                </select>
                <button 
                  onClick={handleUpdateAvailability}
                  className="btn-primary"
                >
                  Update Selected
                </button>
                <button 
                  onClick={() => setSelectedDates([])}
                  className="btn-outline"
                >
                  Clear Selection
                </button>
              </div>
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
                className={`min-h-24 p-2 border border-gray-200 cursor-pointer ${
                  day && day.toDateString() === new Date().toDateString() ? 'ring-2 ring-primary' : ''
                } ${day ? getDateStatusColor(day) : ''} ${
                  day && isDateSelected(day) ? 'ring-2 ring-blue-500' : ''
                }`}
                onClick={() => day && handleDateSelect(day)}
              >
                {day && (
                  <>
                    <div className="text-sm font-semibold mb-1">
                      {day.getDate()}
                    </div>
                    <div className="text-xs text-text-secondary">
                      {getDateStatusText(day)}
                    </div>
                    {isDateSelected(day) && (
                      <div className="w-2 h-2 bg-blue-500 rounded-full mx-auto mt-1"></div>
                    )}
                  </>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Legend */}
        <div className="service-card p-6 mt-8">
          <h3 className="subsection-title mb-4 text-primary">Legend</h3>
          <div className="grid md:grid-cols-4 gap-4">
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-green-100 rounded"></div>
              <span className="body-regular">Available</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-red-100 rounded"></div>
              <span className="body-regular">Unavailable</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-yellow-100 rounded"></div>
              <span className="body-regular">Maintenance</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-blue-100 rounded"></div>
              <span className="body-regular">Booked</span>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-3 gap-6 mt-8">
          <div className="service-card p-6 text-center">
            <button 
              onClick={handleViewCalendar}
              className="btn-secondary w-full mb-3"
            >
              View Calendar
            </button>
            <p className="body-small text-text-secondary">View full calendar with all events</p>
          </div>
          <div className="service-card p-6 text-center">
            <button 
              onClick={handleViewBookings}
              className="btn-secondary w-full mb-3"
            >
              View Bookings
            </button>
            <p className="body-small text-text-secondary">See all current and upcoming bookings</p>
          </div>
          <div className="service-card p-6 text-center">
            <button 
              onClick={() => router.push('/staff/hall')}
              className="btn-outline w-full mb-3"
            >
              Hall Details
            </button>
            <p className="body-small text-text-secondary">Manage hall information and settings</p>
          </div>
        </div>
      </div>
    </div>
  )
} 