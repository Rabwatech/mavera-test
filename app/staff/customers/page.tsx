'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function StaffCustomersPage() {
  const router = useRouter()
  const [selectedCustomer, setSelectedCustomer] = useState<number | null>(null)

  const [customers] = useState([
    {
      id: 1,
      name: 'Sarah Johnson',
      email: 'sarah.johnson@email.com',
      phone: '+966 50 123 4567',
      status: 'active',
      totalBookings: 3,
      totalSpent: 15000,
      lastBooking: '2024-12-15',
      registrationDate: '2024-01-15',
      preferences: ['Wedding', 'Catering', 'Decoration'],
      notes: 'Prefers weekend bookings, vegetarian catering options'
    },
    {
      id: 2,
      name: 'TechCorp Events',
      email: 'events@techcorp.com',
      phone: '+966 11 234 5678',
      status: 'active',
      totalBookings: 5,
      totalSpent: 25000,
      lastBooking: '2024-12-20',
      registrationDate: '2023-08-10',
      preferences: ['Corporate', 'AV Equipment', 'Catering'],
      notes: 'Regular corporate client, prefers weekday events'
    },
    {
      id: 3,
      name: 'Ahmed Al-Rashid',
      email: 'ahmed.rashid@email.com',
      phone: '+966 55 987 6543',
      status: 'active',
      totalBookings: 2,
      totalSpent: 6000,
      lastBooking: '2024-12-25',
      registrationDate: '2024-06-20',
      preferences: ['Birthday', 'Music', 'Catering'],
      notes: 'New customer, interested in birthday packages'
    },
    {
      id: 4,
      name: 'Fatima Al-Zahra',
      email: 'fatima.zahra@email.com',
      phone: '+966 54 321 0987',
      status: 'inactive',
      totalBookings: 1,
      totalSpent: 4000,
      lastBooking: '2024-08-15',
      registrationDate: '2024-03-12',
      preferences: ['Wedding', 'Photography'],
      notes: 'Wedding completed, no recent activity'
    }
  ])

  console.log('mavera-hall-staff-customers', new Date().toISOString(), 'Staff customers page rendered')

  const handleBackToDashboard = () => {
    console.log('mavera-hall-staff-customers-dashboard', new Date().toISOString(), 'Back to dashboard clicked')
    router.push('/staff')
  }

  const handleContactCustomer = (customer: any) => {
    console.log('mavera-hall-staff-customers-contact', new Date().toISOString(), 'Contacting customer', customer.id)
    // Here you would typically open contact options
  }

  const handleViewBookings = (customerId: number) => {
    console.log('mavera-hall-staff-customers-bookings', new Date().toISOString(), 'Viewing bookings for customer', customerId)
    router.push(`/staff/bookings?customer=${customerId}`)
  }

  const handleAddNote = (customerId: number) => {
    console.log('mavera-hall-staff-customers-note', new Date().toISOString(), 'Adding note for customer', customerId)
    // Here you would typically open a note form
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800'
      case 'inactive': return 'bg-gray-100 text-gray-800'
      case 'vip': return 'bg-purple-100 text-purple-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="py-24">
      <div className="container-custom">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="section-title text-primary">Customer Management</h1>
            <p className="body-regular text-text-secondary">
              View and manage customer information and relationships
            </p>
          </div>
          <button 
            onClick={handleBackToDashboard}
            className="btn-outline"
          >
            Back to Dashboard
          </button>
        </div>

        {/* Customer Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="service-card p-6 text-center">
            <h3 className="subsection-title text-primary mb-2">{customers.length}</h3>
            <p className="body-regular">Total Customers</p>
          </div>
          <div className="service-card p-6 text-center">
            <h3 className="subsection-title text-green-600 mb-2">
              {customers.filter(c => c.status === 'active').length}
            </h3>
            <p className="body-regular">Active Customers</p>
          </div>
          <div className="service-card p-6 text-center">
            <h3 className="subsection-title text-blue-600 mb-2">
              {customers.reduce((sum, c) => sum + c.totalBookings, 0)}
            </h3>
            <p className="body-regular">Total Bookings</p>
          </div>
          <div className="service-card p-6 text-center">
            <h3 className="subsection-title text-purple-600 mb-2">
              SAR {customers.reduce((sum, c) => sum + c.totalSpent, 0).toLocaleString()}
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
                <option>Active</option>
                <option>Inactive</option>
                <option>VIP</option>
              </select>
              <select className="p-2 border border-gray-300 rounded-lg">
                <option>All Customers</option>
                <option>New (Last 30 days)</option>
                <option>Returning</option>
                <option>High Value</option>
              </select>
              <input 
                type="text" 
                className="p-2 border border-gray-300 rounded-lg"
                placeholder="Search customers..."
              />
            </div>
            <div className="flex space-x-3">
              <button className="btn-secondary">Export</button>
              <button className="btn-outline">Bulk Actions</button>
            </div>
          </div>
        </div>

        {/* Customers List */}
        <div className="space-y-4">
          {customers.map((customer) => (
            <div key={customer.id} className="service-card p-6">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="subsection-title">{customer.name}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(customer.status)}`}>
                      {customer.status}
                    </span>
                    {customer.totalSpent > 10000 && (
                      <span className="px-2 py-1 rounded-full text-xs font-semibold bg-purple-100 text-purple-800">
                        VIP
                      </span>
                    )}
                  </div>
                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="body-regular"><strong>Email:</strong> {customer.email}</p>
                      <p className="body-regular"><strong>Phone:</strong> {customer.phone}</p>
                      <p className="body-regular"><strong>Registration:</strong> {new Date(customer.registrationDate).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <p className="body-regular"><strong>Total Bookings:</strong> {customer.totalBookings}</p>
                      <p className="body-regular"><strong>Total Spent:</strong> SAR {customer.totalSpent.toLocaleString()}</p>
                      <p className="body-regular"><strong>Last Booking:</strong> {new Date(customer.lastBooking).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <div className="mb-4">
                    <p className="body-regular"><strong>Preferences:</strong></p>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {customer.preferences.map((pref, index) => (
                        <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                          {pref}
                        </span>
                      ))}
                    </div>
                  </div>
                  {customer.notes && (
                    <div className="mb-4">
                      <p className="body-regular"><strong>Notes:</strong> {customer.notes}</p>
                    </div>
                  )}
                </div>
                <div className="flex space-x-2 ml-4">
                  <button 
                    onClick={() => handleContactCustomer(customer)}
                    className="btn-primary text-sm"
                  >
                    Contact
                  </button>
                  <button 
                    onClick={() => handleViewBookings(customer.id)}
                    className="btn-secondary text-sm"
                  >
                    View Bookings
                  </button>
                  <button 
                    onClick={() => handleAddNote(customer.id)}
                    className="btn-outline text-sm"
                  >
                    Add Note
                  </button>
                  <button 
                    onClick={() => console.log('View customer details', customer.id)}
                    className="btn-outline text-sm"
                  >
                    Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {customers.length === 0 && (
          <div className="service-card p-12 text-center">
            <h3 className="subsection-title mb-4 text-primary">No Customers Found</h3>
            <p className="body-regular text-text-secondary">
              No customers found matching your current filters.
            </p>
          </div>
        )}

        {/* Customer Insights */}
        <div className="grid md:grid-cols-2 gap-6 mt-8">
          <div className="service-card p-6">
            <h3 className="subsection-title mb-4 text-primary">Top Customers</h3>
            <div className="space-y-3">
              {customers
                .sort((a, b) => b.totalSpent - a.totalSpent)
                .slice(0, 5)
                .map((customer, index) => (
                  <div key={customer.id} className="flex justify-between items-center">
                    <div className="flex items-center space-x-3">
                      <span className="text-sm font-semibold text-gray-500">#{index + 1}</span>
                      <span className="body-regular">{customer.name}</span>
                    </div>
                    <span className="subsection-title text-green-600">SAR {customer.totalSpent.toLocaleString()}</span>
                  </div>
                ))}
            </div>
          </div>
          <div className="service-card p-6">
            <h3 className="subsection-title mb-4 text-primary">Recent Activity</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="body-regular">New booking from Sarah Johnson</span>
                <span className="text-sm text-text-secondary ml-auto">2 days ago</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="body-regular">Payment received from TechCorp</span>
                <span className="text-sm text-text-secondary ml-auto">3 days ago</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <span className="body-regular">New customer registered - Ahmed Al-Rashid</span>
                <span className="text-sm text-text-secondary ml-auto">1 week ago</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span className="body-regular">VIP status granted to TechCorp</span>
                <span className="text-sm text-text-secondary ml-auto">2 weeks ago</span>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="service-card p-6 mt-8">
          <h3 className="subsection-title mb-4 text-primary">Quick Actions</h3>
          <div className="grid md:grid-cols-4 gap-4">
            <button 
              onClick={() => console.log('Add new customer')}
              className="btn-primary"
            >
              Add Customer
            </button>
            <button 
              onClick={() => console.log('Send newsletter')}
              className="btn-secondary"
            >
              Send Newsletter
            </button>
            <button 
              onClick={() => console.log('Export customers')}
              className="btn-outline"
            >
              Export Data
            </button>
            <button 
              onClick={() => console.log('Customer analytics')}
              className="btn-outline"
            >
              Analytics
            </button>
          </div>
        </div>
      </div>
    </div>
  )
} 