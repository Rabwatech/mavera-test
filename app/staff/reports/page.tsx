'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function StaffReportsPage() {
  const router = useRouter()
  const [selectedReport, setSelectedReport] = useState('bookings')
  const [dateRange, setDateRange] = useState('month')

  const [reports] = useState({
    bookings: {
      total: 45,
      confirmed: 38,
      pending: 5,
      cancelled: 2,
      revenue: 125000,
      averageBooking: 2778
    },
    events: {
      weddings: 25,
      corporate: 12,
      birthdays: 8,
      totalRevenue: 125000
    },
    customers: {
      new: 32,
      returning: 13,
      total: 45,
      averageRating: 4.8
    }
  })

  console.log('mavera-hall-staff-reports', new Date().toISOString(), 'Staff reports page rendered')

  const handleBackToDashboard = () => {
    console.log('mavera-hall-staff-reports-dashboard', new Date().toISOString(), 'Back to dashboard clicked')
    router.push('/staff')
  }

  const handleExportReport = () => {
    console.log('mavera-hall-staff-reports-export', new Date().toISOString(), 'Exporting report', selectedReport)
    // Here you would typically generate and download the report
  }

  const handlePrintReport = () => {
    console.log('mavera-hall-staff-reports-print', new Date().toISOString(), 'Printing report', selectedReport)
    window.print()
  }

  return (
    <div className="py-24">
      <div className="container-custom">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="section-title text-primary">Reports & Analytics</h1>
            <p className="body-regular text-text-secondary">
              View detailed reports and analytics
            </p>
          </div>
          <div className="space-x-3">
            <button 
              onClick={handleExportReport}
              className="btn-secondary"
            >
              Export Report
            </button>
            <button 
              onClick={handlePrintReport}
              className="btn-outline"
            >
              Print Report
            </button>
            <button 
              onClick={handleBackToDashboard}
              className="btn-outline"
            >
              Back to Dashboard
            </button>
          </div>
        </div>

        {/* Report Controls */}
        <div className="service-card p-6 mb-8">
          <div className="flex justify-between items-center">
            <div className="flex space-x-4">
              <select 
                value={selectedReport}
                onChange={(e) => setSelectedReport(e.target.value)}
                className="p-2 border border-gray-300 rounded-lg"
              >
                <option value="bookings">Booking Reports</option>
                <option value="financial">Financial Reports</option>
                <option value="events">Event Reports</option>
                <option value="customers">Customer Reports</option>
                <option value="performance">Performance Reports</option>
              </select>
              <select 
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="p-2 border border-gray-300 rounded-lg"
              >
                <option value="week">This Week</option>
                <option value="month">This Month</option>
                <option value="quarter">This Quarter</option>
                <option value="year">This Year</option>
                <option value="custom">Custom Range</option>
              </select>
            </div>
            <div className="flex space-x-3">
              <button className="btn-primary">Generate Report</button>
              <button className="btn-secondary">Schedule Report</button>
            </div>
          </div>
        </div>

        {/* Booking Reports */}
        {selectedReport === 'bookings' && (
          <div className="space-y-8">
            {/* Summary Stats */}
            <div className="grid md:grid-cols-4 gap-6">
              <div className="service-card p-6 text-center">
                <h3 className="subsection-title text-primary mb-2">{reports.bookings.total}</h3>
                <p className="body-regular">Total Bookings</p>
              </div>
              <div className="service-card p-6 text-center">
                <h3 className="subsection-title text-green-600 mb-2">{reports.bookings.confirmed}</h3>
                <p className="body-regular">Confirmed</p>
              </div>
              <div className="service-card p-6 text-center">
                <h3 className="subsection-title text-yellow-600 mb-2">{reports.bookings.pending}</h3>
                <p className="body-regular">Pending</p>
              </div>
              <div className="service-card p-6 text-center">
                <h3 className="subsection-title text-red-600 mb-2">{reports.bookings.cancelled}</h3>
                <p className="body-regular">Cancelled</p>
              </div>
            </div>

            {/* Financial Summary */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="service-card p-6">
                <h3 className="subsection-title mb-4 text-primary">Revenue Summary</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="body-regular">Total Revenue:</span>
                    <span className="subsection-title text-green-600">SAR {reports.bookings.revenue.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="body-regular">Average Booking Value:</span>
                    <span className="subsection-title text-blue-600">SAR {reports.bookings.averageBooking.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="body-regular">Conversion Rate:</span>
                    <span className="subsection-title text-purple-600">84.4%</span>
                  </div>
                </div>
              </div>
              <div className="service-card p-6">
                <h3 className="subsection-title mb-4 text-primary">Booking Trends</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="body-regular">Monthly Growth:</span>
                    <span className="subsection-title text-green-600">+12.5%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="body-regular">Peak Booking Day:</span>
                    <span className="subsection-title text-blue-600">Saturday</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="body-regular">Most Popular Event:</span>
                    <span className="subsection-title text-purple-600">Weddings</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Detailed Booking Table */}
            <div className="service-card p-6">
              <h3 className="subsection-title mb-4 text-primary">Recent Bookings</h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left p-3 font-semibold">Client</th>
                      <th className="text-left p-3 font-semibold">Event Type</th>
                      <th className="text-left p-3 font-semibold">Date</th>
                      <th className="text-left p-3 font-semibold">Status</th>
                      <th className="text-left p-3 font-semibold">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-100">
                      <td className="p-3">Sarah Johnson</td>
                      <td className="p-3">Wedding</td>
                      <td className="p-3">Dec 15, 2024</td>
                      <td className="p-3"><span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">Confirmed</span></td>
                      <td className="p-3">SAR 8,000</td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="p-3">TechCorp</td>
                      <td className="p-3">Corporate</td>
                      <td className="p-3">Dec 20, 2024</td>
                      <td className="p-3"><span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs">Pending</span></td>
                      <td className="p-3">SAR 5,000</td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="p-3">Ahmed Al-Rashid</td>
                      <td className="p-3">Birthday</td>
                      <td className="p-3">Dec 25, 2024</td>
                      <td className="p-3"><span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">Confirmed</span></td>
                      <td className="p-3">SAR 3,000</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Financial Reports */}
        {selectedReport === 'financial' && (
          <div className="space-y-8">
            <div className="grid md:grid-cols-3 gap-6">
              <div className="service-card p-6 text-center">
                <h3 className="subsection-title text-green-600 mb-2">SAR {reports.bookings.revenue.toLocaleString()}</h3>
                <p className="body-regular">Total Revenue</p>
              </div>
              <div className="service-card p-6 text-center">
                <h3 className="subsection-title text-blue-600 mb-2">SAR 15,000</h3>
                <p className="body-regular">Expenses</p>
              </div>
              <div className="service-card p-6 text-center">
                <h3 className="subsection-title text-purple-600 mb-2">SAR 110,000</h3>
                <p className="body-regular">Net Profit</p>
              </div>
            </div>
            <div className="service-card p-6">
              <h3 className="subsection-title mb-4 text-primary">Financial Summary</h3>
              <p className="body-regular text-text-secondary">
                Detailed financial reports and profit analysis will be displayed here.
              </p>
            </div>
          </div>
        )}

        {/* Event Reports */}
        {selectedReport === 'events' && (
          <div className="space-y-8">
            <div className="grid md:grid-cols-3 gap-6">
              <div className="service-card p-6 text-center">
                <h3 className="subsection-title text-primary mb-2">{reports.events.weddings}</h3>
                <p className="body-regular">Weddings</p>
              </div>
              <div className="service-card p-6 text-center">
                <h3 className="subsection-title text-blue-600 mb-2">{reports.events.corporate}</h3>
                <p className="body-regular">Corporate Events</p>
              </div>
              <div className="service-card p-6 text-center">
                <h3 className="subsection-title text-green-600 mb-2">{reports.events.birthdays}</h3>
                <p className="body-regular">Birthday Parties</p>
              </div>
            </div>
            <div className="service-card p-6">
              <h3 className="subsection-title mb-4 text-primary">Event Analysis</h3>
              <p className="body-regular text-text-secondary">
                Detailed event type analysis and trends will be displayed here.
              </p>
            </div>
          </div>
        )}

        {/* Customer Reports */}
        {selectedReport === 'customers' && (
          <div className="space-y-8">
            <div className="grid md:grid-cols-4 gap-6">
              <div className="service-card p-6 text-center">
                <h3 className="subsection-title text-primary mb-2">{reports.customers.total}</h3>
                <p className="body-regular">Total Customers</p>
              </div>
              <div className="service-card p-6 text-center">
                <h3 className="subsection-title text-green-600 mb-2">{reports.customers.new}</h3>
                <p className="body-regular">New Customers</p>
              </div>
              <div className="service-card p-6 text-center">
                <h3 className="subsection-title text-blue-600 mb-2">{reports.customers.returning}</h3>
                <p className="body-regular">Returning Customers</p>
              </div>
              <div className="service-card p-6 text-center">
                <h3 className="subsection-title text-yellow-600 mb-2">{reports.customers.averageRating}</h3>
                <p className="body-regular">Average Rating</p>
              </div>
            </div>
            <div className="service-card p-6">
              <h3 className="subsection-title mb-4 text-primary">Customer Analysis</h3>
              <p className="body-regular text-text-secondary">
                Customer satisfaction and retention analysis will be displayed here.
              </p>
            </div>
          </div>
        )}

        {/* Performance Reports */}
        {selectedReport === 'performance' && (
          <div className="space-y-8">
            <div className="grid md:grid-cols-3 gap-6">
              <div className="service-card p-6 text-center">
                <h3 className="subsection-title text-green-600 mb-2">95%</h3>
                <p className="body-regular">Hall Utilization</p>
              </div>
              <div className="service-card p-6 text-center">
                <h3 className="subsection-title text-blue-600 mb-2">4.8/5</h3>
                <p className="body-regular">Customer Satisfaction</p>
              </div>
              <div className="service-card p-6 text-center">
                <h3 className="subsection-title text-purple-600 mb-2">+15%</h3>
                <p className="body-regular">Revenue Growth</p>
              </div>
            </div>
            <div className="service-card p-6">
              <h3 className="subsection-title mb-4 text-primary">Performance Metrics</h3>
              <p className="body-regular text-text-secondary">
                Detailed performance metrics and KPIs will be displayed here.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
} 