'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function StaffUsersPage() {
  const router = useRouter()
  const [showNewForm, setShowNewForm] = useState(false)

  const [users] = useState([
    {
      id: 1,
      name: 'Ahmed Hassan',
      email: 'ahmed.hassan@maverahall.com',
      role: 'admin',
      status: 'active',
      lastLogin: '2024-12-01T14:30:00',
      permissions: ['manage_bookings', 'manage_users', 'view_reports'],
      department: 'Management'
    },
    {
      id: 2,
      name: 'Fatima Ali',
      email: 'fatima.ali@maverahall.com',
      role: 'support',
      status: 'active',
      lastLogin: '2024-12-01T12:15:00',
      permissions: ['manage_bookings', 'view_reports'],
      department: 'Customer Service'
    },
    {
      id: 3,
      name: 'Omar Khalil',
      email: 'omar.khalil@maverahall.com',
      role: 'content',
      status: 'active',
      lastLogin: '2024-11-30T16:45:00',
      permissions: ['manage_content', 'view_reports'],
      department: 'Marketing'
    },
    {
      id: 4,
      name: 'Sarah Johnson',
      email: 'sarah.johnson@maverahall.com',
      role: 'staff',
      status: 'inactive',
      lastLogin: '2024-11-25T09:20:00',
      permissions: ['view_bookings'],
      department: 'Operations'
    }
  ])

  console.log('mavera-hall-staff-users', new Date().toISOString(), 'Staff users page rendered')

  const handleBackToDashboard = () => {
    console.log('mavera-hall-staff-users-dashboard', new Date().toISOString(), 'Back to dashboard clicked')
    router.push('/staff')
  }

  const handleAddUser = () => {
    console.log('mavera-hall-staff-users-add', new Date().toISOString(), 'Adding new user')
    setShowNewForm(false)
    // Here you would typically save to backend
  }

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin': return 'bg-red-100 text-red-800'
      case 'support': return 'bg-blue-100 text-blue-800'
      case 'content': return 'bg-green-100 text-green-800'
      case 'staff': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800'
      case 'inactive': return 'bg-gray-100 text-gray-800'
      case 'suspended': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="py-24">
      <div className="container-custom">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="section-title text-primary">User Management</h1>
            <p className="body-regular text-text-secondary">
              Manage staff users and their permissions
            </p>
          </div>
          <div className="space-x-3">
            <button 
              onClick={() => setShowNewForm(true)}
              className="btn-primary"
            >
              Add User
            </button>
            <button 
              onClick={handleBackToDashboard}
              className="btn-outline"
            >
              Back to Dashboard
            </button>
          </div>
        </div>

        {/* User Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="service-card p-6 text-center">
            <h3 className="subsection-title text-primary mb-2">{users.length}</h3>
            <p className="body-regular">Total Users</p>
          </div>
          <div className="service-card p-6 text-center">
            <h3 className="subsection-title text-green-600 mb-2">
              {users.filter(u => u.status === 'active').length}
            </h3>
            <p className="body-regular">Active Users</p>
          </div>
          <div className="service-card p-6 text-center">
            <h3 className="subsection-title text-blue-600 mb-2">
              {users.filter(u => u.role === 'admin').length}
            </h3>
            <p className="body-regular">Administrators</p>
          </div>
          <div className="service-card p-6 text-center">
            <h3 className="subsection-title text-purple-600 mb-2">
              {users.filter(u => u.role === 'support').length}
            </h3>
            <p className="body-regular">Support Staff</p>
          </div>
        </div>

        {/* Add User Form */}
        {showNewForm && (
          <div className="service-card p-6 mb-8">
            <h3 className="subsection-title mb-4 text-primary">Add New User</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block body-regular font-semibold mb-2">Full Name *</label>
                <input 
                  type="text" 
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Enter full name"
                />
              </div>
              <div>
                <label className="block body-regular font-semibold mb-2">Email *</label>
                <input 
                  type="email" 
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Enter email address"
                />
              </div>
              <div>
                <label className="block body-regular font-semibold mb-2">Role *</label>
                <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent">
                  <option value="">Select role</option>
                  <option value="admin">Administrator</option>
                  <option value="support">Support Staff</option>
                  <option value="content">Content Manager</option>
                  <option value="staff">General Staff</option>
                </select>
              </div>
              <div>
                <label className="block body-regular font-semibold mb-2">Department</label>
                <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent">
                  <option value="">Select department</option>
                  <option value="Management">Management</option>
                  <option value="Customer Service">Customer Service</option>
                  <option value="Marketing">Marketing</option>
                  <option value="Operations">Operations</option>
                </select>
              </div>
            </div>
            <div className="flex space-x-3 mt-6">
              <button 
                onClick={handleAddUser}
                className="btn-primary"
              >
                Add User
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
                <option>All Roles</option>
                <option>Administrator</option>
                <option>Support Staff</option>
                <option>Content Manager</option>
                <option>General Staff</option>
              </select>
              <select className="p-2 border border-gray-300 rounded-lg">
                <option>All Status</option>
                <option>Active</option>
                <option>Inactive</option>
                <option>Suspended</option>
              </select>
              <input 
                type="text" 
                className="p-2 border border-gray-300 rounded-lg"
                placeholder="Search users..."
              />
            </div>
            <div className="flex space-x-3">
              <button className="btn-secondary">Export</button>
              <button className="btn-outline">Bulk Actions</button>
            </div>
          </div>
        </div>

        {/* Users List */}
        <div className="space-y-4">
          {users.map((user) => (
            <div key={user.id} className="service-card p-6">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="subsection-title">{user.name}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getRoleColor(user.role)}`}>
                      {user.role}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(user.status)}`}>
                      {user.status}
                    </span>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="body-regular"><strong>Email:</strong> {user.email}</p>
                      <p className="body-regular"><strong>Department:</strong> {user.department}</p>
                    </div>
                    <div>
                      <p className="body-regular"><strong>Last Login:</strong> {new Date(user.lastLogin).toLocaleString()}</p>
                      <p className="body-regular"><strong>Permissions:</strong> {user.permissions.length}</p>
                    </div>
                  </div>
                  <div className="mb-4">
                    <p className="body-regular"><strong>Permissions:</strong></p>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {user.permissions.map((permission, index) => (
                        <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                          {permission.replace('_', ' ')}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex space-x-2 ml-4">
                  <button 
                    onClick={() => console.log('Edit user', user.id)}
                    className="btn-secondary text-sm"
                  >
                    Edit
                  </button>
                  <button 
                    onClick={() => console.log('Reset password', user.id)}
                    className="btn-primary text-sm"
                  >
                    Reset Password
                  </button>
                  <button 
                    onClick={() => console.log('Suspend user', user.id)}
                    className="btn-outline text-sm text-red-600 border-red-600 hover:bg-red-50"
                  >
                    Suspend
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {users.length === 0 && (
          <div className="service-card p-12 text-center">
            <h3 className="subsection-title mb-4 text-primary">No Users Found</h3>
            <p className="body-regular text-text-secondary">
              No users found matching your current filters.
            </p>
          </div>
        )}

        {/* Role Permissions */}
        <div className="service-card p-6 mt-8">
          <h3 className="subsection-title mb-4 text-primary">Role Permissions</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="body-regular font-semibold mb-3">Administrator</h4>
              <ul className="space-y-1 text-sm text-text-secondary">
                <li>• Manage all bookings and users</li>
                <li>• Access all reports and analytics</li>
                <li>• System settings and configuration</li>
                <li>• Full content management</li>
              </ul>
            </div>
            <div>
              <h4 className="body-regular font-semibold mb-3">Support Staff</h4>
              <ul className="space-y-1 text-sm text-text-secondary">
                <li>• Manage bookings and customer support</li>
                <li>• View reports and analytics</li>
                <li>• Basic content management</li>
                <li>• Customer communication</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 