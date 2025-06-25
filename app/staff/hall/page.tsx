'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function StaffHallPage() {
  const router = useRouter()
  const [isEditing, setIsEditing] = useState(false)
  const [hallData, setHallData] = useState({
    name: 'Mavera Hall',
    capacity: 500,
    description: 'A luxurious and modern event hall perfect for weddings, corporate events, and special celebrations.',
    address: '123 King Fahd Road, Riyadh, Saudi Arabia',
    phone: '+966 11 234 5678',
    email: 'info@maverahall.com',
    amenities: [
      'Professional sound system',
      'LED lighting',
      'Catering kitchen',
      'Parking for 200 cars',
      'WiFi throughout',
      'Air conditioning',
      'Stage and podium',
      'Bridal suite'
    ],
    pricing: {
      weekday: 5000,
      weekend: 8000,
      holiday: 12000
    },
    images: [
      '/api/placeholder/400/300',
      '/api/placeholder/400/300',
      '/api/placeholder/400/300'
    ]
  })

  console.log('mavera-hall-staff-hall', new Date().toISOString(), 'Staff hall page rendered')

  const handleSave = () => {
    console.log('mavera-hall-staff-hall-save', new Date().toISOString(), 'Hall details saved')
    setIsEditing(false)
    // Here you would typically save to backend
  }

  const handleCancel = () => {
    console.log('mavera-hall-staff-hall-cancel', new Date().toISOString(), 'Hall edit cancelled')
    setIsEditing(false)
  }

  const handleBackToDashboard = () => {
    console.log('mavera-hall-staff-hall-dashboard', new Date().toISOString(), 'Back to dashboard clicked')
    router.push('/staff')
  }

  const handleViewGallery = () => {
    console.log('mavera-hall-staff-hall-gallery', new Date().toISOString(), 'View gallery clicked')
    router.push('/staff/gallery')
  }

  const handleManageAvailability = () => {
    console.log('mavera-hall-staff-hall-availability', new Date().toISOString(), 'Manage availability clicked')
    router.push('/staff/availability')
  }

  const handleViewBookings = () => {
    console.log('mavera-hall-staff-hall-bookings', new Date().toISOString(), 'View bookings clicked')
    router.push('/staff/bookings')
  }

  const handleViewCalendar = () => {
    console.log('mavera-hall-staff-hall-calendar', new Date().toISOString(), 'View calendar clicked')
    router.push('/staff/calendar')
  }

  const handleExportData = () => {
    console.log('mavera-hall-staff-hall-export', new Date().toISOString(), 'Export data clicked')
    // Here you would typically export hall data
  }

  const handleAddAmenity = () => {
    console.log('mavera-hall-staff-hall-amenity', new Date().toISOString(), 'Add amenity clicked')
    const newAmenity = prompt('Enter new amenity:')
    if (newAmenity) {
      setHallData({
        ...hallData,
        amenities: [...hallData.amenities, newAmenity]
      })
    }
  }

  const handleRemoveAmenity = (index: number) => {
    console.log('mavera-hall-staff-hall-remove-amenity', new Date().toISOString(), `Remove amenity at index ${index}`)
    setHallData({
      ...hallData,
      amenities: hallData.amenities.filter((_, i) => i !== index)
    })
  }

  return (
    <div className="py-24">
      <div className="container-custom">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="section-title text-primary">Hall Management</h1>
            <p className="body-regular text-text-secondary">
              Manage hall details, amenities, and pricing
            </p>
          </div>
          <div className="space-x-3">
            <button 
              onClick={handleViewGallery}
              className="btn-secondary"
            >
              Manage Gallery
            </button>
            <button 
              onClick={handleBackToDashboard}
              className="btn-outline"
            >
              Back to Dashboard
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Hall Images */}
          <div className="lg:col-span-1">
            <div className="service-card p-6">
              <h3 className="subsection-title mb-4 text-primary">Hall Images</h3>
              <div className="space-y-4">
                {hallData.images.map((image, index) => (
                  <div key={index} className="relative">
                    <img 
                      src={image} 
                      alt={`Hall image ${index + 1}`}
                      className="w-full h-48 object-cover rounded-lg"
                    />
                    {isEditing && (
                      <button 
                        onClick={() => console.log('Remove image', index)}
                        className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm"
                      >
                        ×
                      </button>
                    )}
                  </div>
                ))}
                {isEditing && (
                  <button 
                    onClick={() => console.log('Add image')}
                    className="w-full h-48 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center text-gray-500 hover:border-primary"
                  >
                    + Add Image
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Hall Details */}
          <div className="lg:col-span-2">
            <div className="service-card p-8">
              <div className="flex justify-between items-center mb-6">
                <h3 className="subsection-title text-primary">Hall Information</h3>
                {!isEditing ? (
                  <button 
                    onClick={() => setIsEditing(true)}
                    className="btn-primary"
                  >
                    Edit Details
                  </button>
                ) : (
                  <div className="space-x-3">
                    <button 
                      onClick={handleSave}
                      className="btn-primary"
                    >
                      Save Changes
                    </button>
                    <button 
                      onClick={handleCancel}
                      className="btn-outline"
                    >
                      Cancel
                    </button>
                  </div>
                )}
              </div>

              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block body-regular font-semibold mb-2">Hall Name</label>
                    {isEditing ? (
                      <input 
                        type="text" 
                        value={hallData.name}
                        onChange={(e) => setHallData({...hallData, name: e.target.value})}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      />
                    ) : (
                      <p className="body-regular">{hallData.name}</p>
                    )}
                  </div>
                  <div>
                    <label className="block body-regular font-semibold mb-2">Capacity</label>
                    {isEditing ? (
                      <input 
                        type="number" 
                        value={hallData.capacity}
                        onChange={(e) => setHallData({...hallData, capacity: parseInt(e.target.value)})}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      />
                    ) : (
                      <p className="body-regular">{hallData.capacity} people</p>
                    )}
                  </div>
                  <div>
                    <label className="block body-regular font-semibold mb-2">Phone</label>
                    {isEditing ? (
                      <input 
                        type="tel" 
                        value={hallData.phone}
                        onChange={(e) => setHallData({...hallData, phone: e.target.value})}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      />
                    ) : (
                      <p className="body-regular">{hallData.phone}</p>
                    )}
                  </div>
                  <div>
                    <label className="block body-regular font-semibold mb-2">Email</label>
                    {isEditing ? (
                      <input 
                        type="email" 
                        value={hallData.email}
                        onChange={(e) => setHallData({...hallData, email: e.target.value})}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      />
                    ) : (
                      <p className="body-regular">{hallData.email}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block body-regular font-semibold mb-2">Address</label>
                  {isEditing ? (
                    <input 
                      type="text" 
                      value={hallData.address}
                      onChange={(e) => setHallData({...hallData, address: e.target.value})}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  ) : (
                    <p className="body-regular">{hallData.address}</p>
                  )}
                </div>

                <div>
                  <label className="block body-regular font-semibold mb-2">Description</label>
                  {isEditing ? (
                    <textarea 
                      value={hallData.description}
                      onChange={(e) => setHallData({...hallData, description: e.target.value})}
                      rows={4}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  ) : (
                    <p className="body-regular">{hallData.description}</p>
                  )}
                </div>

                <div>
                  <div className="flex justify-between items-center mb-4">
                    <label className="block body-regular font-semibold">Amenities</label>
                    {isEditing && (
                      <button 
                        onClick={handleAddAmenity}
                        className="btn-secondary text-sm"
                      >
                        Add Amenity
                      </button>
                    )}
                  </div>
                  <div className="grid md:grid-cols-2 gap-3">
                    {hallData.amenities.map((amenity, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <span className="body-regular">{amenity}</span>
                        {isEditing && (
                          <button 
                            onClick={() => handleRemoveAmenity(index)}
                            className="text-red-500 hover:text-red-700"
                          >
                            ×
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block body-regular font-semibold mb-4">Pricing (SAR)</label>
                  <div className="grid md:grid-cols-3 gap-6">
                    <div>
                      <label className="block body-small mb-2">Weekday Rate</label>
                      {isEditing ? (
                        <input 
                          type="number" 
                          value={hallData.pricing.weekday}
                          onChange={(e) => setHallData({
                            ...hallData, 
                            pricing: {...hallData.pricing, weekday: parseInt(e.target.value)}
                          })}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                        />
                      ) : (
                        <p className="body-regular">SAR {hallData.pricing.weekday}</p>
                      )}
                    </div>
                    <div>
                      <label className="block body-small mb-2">Weekend Rate</label>
                      {isEditing ? (
                        <input 
                          type="number" 
                          value={hallData.pricing.weekend}
                          onChange={(e) => setHallData({
                            ...hallData, 
                            pricing: {...hallData.pricing, weekend: parseInt(e.target.value)}
                          })}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                        />
                      ) : (
                        <p className="body-regular">SAR {hallData.pricing.weekend}</p>
                      )}
                    </div>
                    <div>
                      <label className="block body-small mb-2">Holiday Rate</label>
                      {isEditing ? (
                        <input 
                          type="number" 
                          value={hallData.pricing.holiday}
                          onChange={(e) => setHallData({
                            ...hallData, 
                            pricing: {...hallData.pricing, holiday: parseInt(e.target.value)}
                          })}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                        />
                      ) : (
                        <p className="body-regular">SAR {hallData.pricing.holiday}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-4 gap-6 mt-8">
          <div className="service-card p-6 text-center">
            <button 
              onClick={handleManageAvailability}
              className="btn-primary w-full mb-3"
            >
              Manage Availability
            </button>
            <p className="body-small text-text-secondary">Update available dates and times</p>
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
              onClick={handleViewCalendar}
              className="btn-secondary w-full mb-3"
            >
              Calendar View
            </button>
            <p className="body-small text-text-secondary">View hall schedule in calendar format</p>
          </div>
          <div className="service-card p-6 text-center">
            <button 
              onClick={handleExportData}
              className="btn-outline w-full mb-3"
            >
              Export Data
            </button>
            <p className="body-small text-text-secondary">Export hall information and statistics</p>
          </div>
        </div>
      </div>
    </div>
  )
} 