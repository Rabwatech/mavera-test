'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function StaffLogsPage() {
  const router = useRouter()
  const [selectedLogType, setSelectedLogType] = useState('all')

  const [logs] = useState([
    {
      id: 1,
      user: 'Ahmed Hassan',
      action: 'booking_created',
      description: 'Created new booking for Sarah Johnson - Wedding on Dec 15, 2024',
      timestamp: '2024-12-01T14:30:00',
      ipAddress: '192.168.1.100',
      userAgent: 'Chrome/120.0.0.0',
      severity: 'info'
    },
    {
      id: 2,
      user: 'Fatima Ali',
      action: 'booking_updated',
      description: 'Updated booking status to confirmed for TechCorp event',
      timestamp: '2024-12-01T12:15:00',
      ipAddress: '192.168.1.101',
      userAgent: 'Firefox/119.0.0.0',
      severity: 'info'
    },
    {
      id: 3,
      user: 'Omar Khalil',
      action: 'content_published',
      description: 'Published new announcement: Holiday Schedule Update',
      timestamp: '2024-12-01T10:45:00',
      ipAddress: '192.168.1.102',
      userAgent: 'Safari/17.0.0.0',
      severity: 'info'
    },
    {
      id: 4,
      user: 'System',
      action: 'system_error',
      description: 'Database connection timeout - resolved automatically',
      timestamp: '2024-12-01T09:20:00',
      ipAddress: '127.0.0.1',
      userAgent: 'System/1.0.0.0',
      severity: 'warning'
    },
    {
      id: 5,
      user: 'Ahmed Hassan',
      action: 'user_login',
      description: 'User logged in successfully',
      timestamp: '2024-12-01T08:30:00',
      ipAddress: '192.168.1.100',
      userAgent: 'Chrome/120.0.0.0',
      severity: 'info'
    },
    {
      id: 6,
      user: 'Unknown',
      action: 'failed_login',
      description: 'Failed login attempt for user: admin@test.com',
      timestamp: '2024-12-01T07:15:00',
      ipAddress: '203.0.113.45',
      userAgent: 'Unknown/0.0.0.0',
      severity: 'error'
    }
  ])

  console.log('mavera-hall-staff-logs', new Date().toISOString(), 'Staff logs page rendered')

  const handleBackToDashboard = () => {
    console.log('mavera-hall-staff-logs-dashboard', new Date().toISOString(), 'Back to dashboard clicked')
    router.push('/staff')
  }

  const handleExportLogs = () => {
    console.log('mavera-hall-staff-logs-export', new Date().toISOString(), 'Exporting logs')
    // Here you would typically export logs
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'error': return 'bg-red-100 text-red-800'
      case 'warning': return 'bg-yellow-100 text-yellow-800'
      case 'info': return 'bg-blue-100 text-blue-800'
      case 'success': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getActionColor = (action: string) => {
    switch (action) {
      case 'booking_created': return 'bg-green-100 text-green-800'
      case 'booking_updated': return 'bg-blue-100 text-blue-800'
      case 'content_published': return 'bg-purple-100 text-purple-800'
      case 'user_login': return 'bg-gray-100 text-gray-800'
      case 'failed_login': return 'bg-red-100 text-red-800'
      case 'system_error': return 'bg-yellow-100 text-yellow-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="py-24">
      <div className="container-custom">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="section-title text-primary">Activity Logs</h1>
            <p className="body-regular text-text-secondary">
              View system activity and audit trails
            </p>
          </div>
          <div className="space-x-3">
            <button 
              onClick={handleExportLogs}
              className="btn-secondary"
            >
              Export Logs
            </button>
            <button 
              onClick={handleBackToDashboard}
              className="btn-outline"
            >
              Back to Dashboard
            </button>
          </div>
        </div>

        {/* Log Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="service-card p-6 text-center">
            <h3 className="subsection-title text-primary mb-2">{logs.length}</h3>
            <p className="body-regular">Total Logs</p>
          </div>
          <div className="service-card p-6 text-center">
            <h3 className="subsection-title text-blue-600 mb-2">
              {logs.filter(l => l.severity === 'info').length}
            </h3>
            <p className="body-regular">Info</p>
          </div>
          <div className="service-card p-6 text-center">
            <h3 className="subsection-title text-yellow-600 mb-2">
              {logs.filter(l => l.severity === 'warning').length}
            </h3>
            <p className="body-regular">Warnings</p>
          </div>
          <div className="service-card p-6 text-center">
            <h3 className="subsection-title text-red-600 mb-2">
              {logs.filter(l => l.severity === 'error').length}
            </h3>
            <p className="body-regular">Errors</p>
          </div>
        </div>

        {/* Filters */}
        <div className="service-card p-6 mb-8">
          <div className="flex justify-between items-center">
            <div className="flex space-x-4">
              <select 
                value={selectedLogType}
                onChange={(e) => setSelectedLogType(e.target.value)}
                className="p-2 border border-gray-300 rounded-lg"
              >
                <option value="all">All Actions</option>
                <option value="booking">Booking Actions</option>
                <option value="content">Content Actions</option>
                <option value="user">User Actions</option>
                <option value="system">System Actions</option>
              </select>
              <select className="p-2 border border-gray-300 rounded-lg">
                <option>All Severity</option>
                <option>Info</option>
                <option>Warning</option>
                <option>Error</option>
              </select>
              <input 
                type="date" 
                className="p-2 border border-gray-300 rounded-lg"
                placeholder="Filter by date"
              />
              <input 
                type="text" 
                className="p-2 border border-gray-300 rounded-lg"
                placeholder="Search logs..."
              />
            </div>
            <div className="flex space-x-3">
              <button className="btn-primary">Refresh</button>
              <button className="btn-outline">Clear Filters</button>
            </div>
          </div>
        </div>

        {/* Logs List */}
        <div className="space-y-4">
          {logs.map((log) => (
            <div key={log.id} className="service-card p-6">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="subsection-title">{log.user}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getActionColor(log.action)}`}>
                      {log.action.replace('_', ' ')}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getSeverityColor(log.severity)}`}>
                      {log.severity}
                    </span>
                  </div>
                  <p className="body-regular text-text-secondary mb-3">{log.description}</p>
                  <div className="grid md:grid-cols-3 gap-4 text-sm text-text-secondary">
                    <div>
                      <span className="font-semibold">Time:</span> {new Date(log.timestamp).toLocaleString()}
                    </div>
                    <div>
                      <span className="font-semibold">IP:</span> {log.ipAddress}
                    </div>
                    <div>
                      <span className="font-semibold">Browser:</span> {log.userAgent}
                    </div>
                  </div>
                </div>
                <div className="flex space-x-2 ml-4">
                  <button 
                    onClick={() => console.log('View log details', log.id)}
                    className="btn-secondary text-sm"
                  >
                    Details
                  </button>
                  <button 
                    onClick={() => console.log('Export log', log.id)}
                    className="btn-outline text-sm"
                  >
                    Export
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {logs.length === 0 && (
          <div className="service-card p-12 text-center">
            <h3 className="subsection-title mb-4 text-primary">No Logs Found</h3>
            <p className="body-regular text-text-secondary">
              No activity logs found matching your current filters.
            </p>
          </div>
        )}

        {/* Log Summary */}
        <div className="grid md:grid-cols-2 gap-6 mt-8">
          <div className="service-card p-6">
            <h3 className="subsection-title mb-4 text-primary">Recent Activity Summary</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="body-regular">Booking Actions</span>
                <span className="subsection-title text-green-600">
                  {logs.filter(l => l.action.includes('booking')).length}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="body-regular">Content Actions</span>
                <span className="subsection-title text-blue-600">
                  {logs.filter(l => l.action.includes('content')).length}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="body-regular">User Actions</span>
                <span className="subsection-title text-purple-600">
                  {logs.filter(l => l.action.includes('user') || l.action.includes('login')).length}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="body-regular">System Actions</span>
                <span className="subsection-title text-yellow-600">
                  {logs.filter(l => l.action.includes('system')).length}
                </span>
              </div>
            </div>
          </div>
          <div className="service-card p-6">
            <h3 className="subsection-title mb-4 text-primary">Security Alerts</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 p-3 bg-red-50 rounded-lg">
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                <span className="body-regular">Failed login attempt detected</span>
                <span className="text-sm text-text-secondary ml-auto">2 hours ago</span>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-yellow-50 rounded-lg">
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <span className="body-regular">System error resolved</span>
                <span className="text-sm text-text-secondary ml-auto">5 hours ago</span>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="body-regular">All systems operational</span>
                <span className="text-sm text-text-secondary ml-auto">1 day ago</span>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="service-card p-6 mt-8">
          <h3 className="subsection-title mb-4 text-primary">Quick Actions</h3>
          <div className="grid md:grid-cols-4 gap-4">
            <button 
              onClick={handleExportLogs}
              className="btn-primary"
            >
              Export All Logs
            </button>
            <button 
              onClick={() => console.log('Clear old logs')}
              className="btn-secondary"
            >
              Clear Old Logs
            </button>
            <button 
              onClick={() => console.log('Log settings')}
              className="btn-outline"
            >
              Log Settings
            </button>
            <button 
              onClick={() => console.log('Security audit')}
              className="btn-outline"
            >
              Security Audit
            </button>
          </div>
        </div>
      </div>
    </div>
  )
} 