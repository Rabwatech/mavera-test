'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function StaffNewBookingPage() {
  const router = useRouter()
  const [bookingData, setBookingData] = useState({
    clientName: '',
    email: '',
    phone: '',
    eventType: 'wedding',
    date: '',
    startTime: '',
    endTime: '',
    guestCount: '',
    specialRequirements: '',
    catering: false,
    decoration: false,
    photography: false,
    music: false
  })

  console.log('mavera-hall-staff-new-booking', new Date().toISOString(), 'Staff new booking page rendered')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('mavera-hall-staff-new-booking-submit', new Date().toISOString(), 'Creating new booking')
    // Here you would typically save to backend
    router.push('/staff/bookings')
  }

  const handleBackToBookings = () => {
    console.log('mavera-hall-staff-new-booking-back', new Date().toISOString(), 'Back to bookings clicked')
    router.push('/staff/bookings')
  }

  return (
    <div className="py-24">
      <div className="container-custom">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="section-title text-primary">Create New Booking</h1>
            <p className="body-regular text-text-secondary">
              Add a new booking for the hall
            </p>
          </div>
          <button 
            onClick={handleBackToBookings}
            className="btn-outline"
          >
            Back to Bookings
          </button>
        </div>

        <div className="max-w-4xl mx-auto">
          <form onSubmit={handleSubmit} className="service-card p-8">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block body-regular font-semibold mb-2">Client Name *</label>
                <input 
                  type="text" 
                  required
                  value={bookingData.clientName}
                  onChange={(e) => setBookingData({...bookingData, clientName: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Enter client name"
                />
              </div>
              <div>
                <label className="block body-regular font-semibold mb-2">Email *</label>
                <input 
                  type="email" 
                  required
                  value={bookingData.email}
                  onChange={(e) => setBookingData({...bookingData, email: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Enter email address"
                />
              </div>
              <div>
                <label className="block body-regular font-semibold mb-2">Phone *</label>
                <input 
                  type="tel" 
                  required
                  value={bookingData.phone}
                  onChange={(e) => setBookingData({...bookingData, phone: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Enter phone number"
                />
              </div>
              <div>
                <label className="block body-regular font-semibold mb-2">Event Type *</label>
                <select 
                  required
                  value={bookingData.eventType}
                  onChange={(e) => setBookingData({...bookingData, eventType: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option value="wedding">Wedding</option>
                  <option value="corporate">Corporate Event</option>
                  <option value="birthday">Birthday Party</option>
                  <option value="anniversary">Anniversary</option>
                  <option value="graduation">Graduation</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label className="block body-regular font-semibold mb-2">Date *</label>
                <input 
                  type="date" 
                  required
                  value={bookingData.date}
                  onChange={(e) => setBookingData({...bookingData, date: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
              <div>
                <label className="block body-regular font-semibold mb-2">Guest Count *</label>
                <input 
                  type="number" 
                  required
                  value={bookingData.guestCount}
                  onChange={(e) => setBookingData({...bookingData, guestCount: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Number of guests"
                  min="1"
                />
              </div>
              <div>
                <label className="block body-regular font-semibold mb-2">Start Time *</label>
                <input 
                  type="time" 
                  required
                  value={bookingData.startTime}
                  onChange={(e) => setBookingData({...bookingData, startTime: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
              <div>
                <label className="block body-regular font-semibold mb-2">End Time *</label>
                <input 
                  type="time" 
                  required
                  value={bookingData.endTime}
                  onChange={(e) => setBookingData({...bookingData, endTime: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
            </div>

            <div className="mt-6">
              <label className="block body-regular font-semibold mb-4">Additional Services</label>
              <div className="grid md:grid-cols-2 gap-4">
                <label className="flex items-center space-x-3">
                  <input 
                    type="checkbox" 
                    checked={bookingData.catering}
                    onChange={(e) => setBookingData({...bookingData, catering: e.target.checked})}
                    className="w-4 h-4 text-primary focus:ring-primary border-gray-300 rounded"
                  />
                  <span className="body-regular">Catering Services</span>
                </label>
                <label className="flex items-center space-x-3">
                  <input 
                    type="checkbox" 
                    checked={bookingData.decoration}
                    onChange={(e) => setBookingData({...bookingData, decoration: e.target.checked})}
                    className="w-4 h-4 text-primary focus:ring-primary border-gray-300 rounded"
                  />
                  <span className="body-regular">Decoration & Setup</span>
                </label>
                <label className="flex items-center space-x-3">
                  <input 
                    type="checkbox" 
                    checked={bookingData.photography}
                    onChange={(e) => setBookingData({...bookingData, photography: e.target.checked})}
                    className="w-4 h-4 text-primary focus:ring-primary border-gray-300 rounded"
                  />
                  <span className="body-regular">Photography</span>
                </label>
                <label className="flex items-center space-x-3">
                  <input 
                    type="checkbox" 
                    checked={bookingData.music}
                    onChange={(e) => setBookingData({...bookingData, music: e.target.checked})}
                    className="w-4 h-4 text-primary focus:ring-primary border-gray-300 rounded"
                  />
                  <span className="body-regular">Music & Entertainment</span>
                </label>
              </div>
            </div>

            <div className="mt-6">
              <label className="block body-regular font-semibold mb-2">Special Requirements</label>
              <textarea 
                value={bookingData.specialRequirements}
                onChange={(e) => setBookingData({...bookingData, specialRequirements: e.target.value})}
                rows={4}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="Any special requirements or notes..."
              />
            </div>

            <div className="flex space-x-3 mt-8">
              <button 
                type="submit"
                className="btn-primary"
              >
                Create Booking
              </button>
              <button 
                type="button"
                onClick={handleBackToBookings}
                className="btn-outline"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
} 