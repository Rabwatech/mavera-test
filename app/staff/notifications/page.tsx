'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function StaffNotificationsPage() {
  const router = useRouter()
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'booking',
      title: 'New Booking Request',
      message: 'Sarah Johnson has requested a booking for December 15, 2024',
      time: '2 hours ago',
      read: false,
      priority: 'high'
    },
    {
      id: 2,
      type: 'support',
      title: 'Support Ticket Assigned',
      message: 'Ticket #ST-2024-045 has been assigned to you',
      time: '4 hours ago',
      read: false,
      priority: 'medium'
    },
    {
      id: 3,
      type: 'system',
      title: 'System Maintenance',
      message: 'Scheduled maintenance on December 10, 2024 at 2:00 AM',
      time: '1 day ago',
      read: true,
      priority: 'low'
    },
    {
      id: 4,
      type: 'booking',
      title: 'Booking Confirmed',
      message: 'Booking #BK-2024-123 has been confirmed by the client',
      time: '2 days ago',
      read: true,
      priority: 'medium'
    }
  ])

  console.log('mavera-hall-staff-notifications', new Date().toISOString(), 'Staff notifications page rendered')

  const handleMarkAsRead = (id: number) => {
    console.log('mavera-hall-staff-notifications-read', new Date().toISOString(), `Marked notification ${id} as read`)
    setNotifications(notifications.map(notif => 
      notif.id === id ? { ...notif, read: true } : notif
    ))
  }

  const handleMarkAllAsRead = () => {
    console.log('mavera-hall-staff-notifications-read-all', new Date().toISOString(), 'Marked all notifications as read')
    setNotifications(notifications.map(notif => ({ ...notif, read: true })))
  }

  const handleDeleteNotification = (id: number) => {
    console.log('mavera-hall-staff-notifications-delete', new Date().toISOString(), `Deleted notification ${id}`)
    setNotifications(notifications.filter(notif => notif.id !== id))
  }

  const handleViewBooking = (id: number) => {
    console.log('mavera-hall-staff-notifications-booking', new Date().toISOString(), `View booking for notification ${id}`)
    router.push('/staff/bookings')
  }

  const handleViewSupportTicket = (id: number) => {
    console.log('mavera-hall-staff-notifications-support', new Date().toISOString(), `View support ticket for notification ${id}`)
    router.push('/staff/support/tickets')
  }

  const handleBackToDashboard = () => {
    console.log('mavera-hall-staff-notifications-dashboard', new Date().toISOString(), 'Back to dashboard clicked')
    router.push('/staff')
  }

  const handleSettings = () => {
    console.log('mavera-hall-staff-notifications-settings', new Date().toISOString(), 'Notification settings clicked')
    router.push('/staff/settings/notifications')
  }

  const unreadCount = notifications.filter(n => !n.read).length

  return (
    <div className="py-24">
      <div className="container-custom">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="section-title text-primary">Notifications</h1>
            <p className="body-regular text-text-secondary">
              {unreadCount} unread notification{unreadCount !== 1 ? 's' : ''}
            </p>
          </div>
          <div className="space-x-3">
            <button 
              onClick={handleSettings}
              className="btn-secondary"
            >
              Settings
            </button>
            <button 
              onClick={handleBackToDashboard}
              className="btn-outline"
            >
              Back to Dashboard
            </button>
          </div>
        </div>

        {/* Actions */}
        <div className="service-card p-6 mb-8">
          <div className="flex justify-between items-center">
            <div className="flex space-x-4">
              <button 
                onClick={handleMarkAllAsRead}
                className="btn-secondary"
                disabled={unreadCount === 0}
              >
                Mark All as Read
              </button>
              <button 
                onClick={() => router.push('/staff/notifications/archive')}
                className="btn-outline"
              >
                View Archive
              </button>
            </div>
            <div className="flex space-x-3">
              <select className="p-2 border border-gray-300 rounded-lg">
                <option>All Types</option>
                <option>Bookings</option>
                <option>Support</option>
                <option>System</option>
              </select>
              <select className="p-2 border border-gray-300 rounded-lg">
                <option>All Priorities</option>
                <option>High</option>
                <option>Medium</option>
                <option>Low</option>
              </select>
            </div>
          </div>
        </div>

        {/* Notifications List */}
        <div className="space-y-4">
          {notifications.map((notification) => (
            <div 
              key={notification.id}
              className={`service-card p-6 ${!notification.read ? 'border-l-4 border-l-primary' : ''}`}
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      notification.priority === 'high' ? 'bg-red-100 text-red-800' :
                      notification.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {notification.priority}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      notification.type === 'booking' ? 'bg-blue-100 text-blue-800' :
                      notification.type === 'support' ? 'bg-purple-100 text-purple-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {notification.type}
                    </span>
                    {!notification.read && (
                      <span className="w-2 h-2 bg-primary rounded-full"></span>
                    )}
                  </div>
                  <h3 className="subsection-title mb-2">{notification.title}</h3>
                  <p className="body-regular text-text-secondary mb-3">{notification.message}</p>
                  <p className="body-small text-text-secondary">{notification.time}</p>
                </div>
                <div className="flex space-x-2 ml-4">
                  {!notification.read && (
                    <button 
                      onClick={() => handleMarkAsRead(notification.id)}
                      className="btn-secondary text-sm"
                    >
                      Mark Read
                    </button>
                  )}
                  {notification.type === 'booking' && (
                    <button 
                      onClick={() => handleViewBooking(notification.id)}
                      className="btn-primary text-sm"
                    >
                      View Booking
                    </button>
                  )}
                  {notification.type === 'support' && (
                    <button 
                      onClick={() => handleViewSupportTicket(notification.id)}
                      className="btn-primary text-sm"
                    >
                      View Ticket
                    </button>
                  )}
                  <button 
                    onClick={() => handleDeleteNotification(notification.id)}
                    className="btn-outline text-sm text-red-600 border-red-600 hover:bg-red-50"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {notifications.length === 0 && (
          <div className="service-card p-12 text-center">
            <h3 className="subsection-title mb-4 text-primary">No Notifications</h3>
            <p className="body-regular text-text-secondary">
              You're all caught up! No new notifications at the moment.
            </p>
          </div>
        )}
      </div>
    </div>
  )
} 