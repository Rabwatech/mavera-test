'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function StaffAnalyticsPage() {
  const router = useRouter()
  const [selectedPeriod, setSelectedPeriod] = useState('month')

  const [analytics] = useState({
    overview: {
      totalBookings: 45,
      totalRevenue: 125000,
      averageRating: 4.8,
      customerSatisfaction: 95
    },
    trends: {
      bookingsGrowth: 12.5,
      revenueGrowth: 15.2,
      customerGrowth: 8.7
    },
    topEvents: [
      { type: 'Wedding', count: 25, revenue: 75000 },
      { type: 'Corporate', count: 12, revenue: 35000 },
      { type: 'Birthday', count: 8, revenue: 15000 }
    ],
    customerInsights: {
      newCustomers: 32,
      returningCustomers: 13,
      averageBookingValue: 2778,
      peakBookingDay: 'Saturday'
    }
  })

  console.log('mavera-hall-staff-analytics', new Date().toISOString(), 'Staff analytics page rendered')

  const handleBackToDashboard = () => {
    console.log('mavera-hall-staff-analytics-dashboard', new Date().toISOString(), 'Back to dashboard clicked')
    router.push('/staff')
  }

  const handleExportData = () => {
    console.log('mavera-hall-staff-analytics-export', new Date().toISOString(), 'Exporting analytics data')
    // Here you would typically export analytics data
  }

  return (
    <div className="py-24">
      <div className="container-custom">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="section-title text-primary">Analytics Dashboard</h1>
            <p className="body-regular text-text-secondary">
              Comprehensive analytics and business insights
            </p>
          </div>
          <div className="space-x-3">
            <button 
              onClick={handleExportData}
              className="btn-secondary"
            >
              Export Data
            </button>
            <button 
              onClick={handleBackToDashboard}
              className="btn-outline"
            >
              Back to Dashboard
            </button>
          </div>
        </div>

        {/* Period Selector */}
        <div className="service-card p-6 mb-8">
          <div className="flex justify-between items-center">
            <div className="flex space-x-4">
              <button 
                onClick={() => setSelectedPeriod('week')}
                className={`px-4 py-2 rounded-lg ${selectedPeriod === 'week' ? 'bg-primary text-white' : 'bg-gray-200'}`}
              >
                This Week
              </button>
              <button 
                onClick={() => setSelectedPeriod('month')}
                className={`px-4 py-2 rounded-lg ${selectedPeriod === 'month' ? 'bg-primary text-white' : 'bg-gray-200'}`}
              >
                This Month
              </button>
              <button 
                onClick={() => setSelectedPeriod('quarter')}
                className={`px-4 py-2 rounded-lg ${selectedPeriod === 'quarter' ? 'bg-primary text-white' : 'bg-gray-200'}`}
              >
                This Quarter
              </button>
              <button 
                onClick={() => setSelectedPeriod('year')}
                className={`px-4 py-2 rounded-lg ${selectedPeriod === 'year' ? 'bg-primary text-white' : 'bg-gray-200'}`}
              >
                This Year
              </button>
            </div>
            <div className="text-sm text-text-secondary">
              Last updated: {new Date().toLocaleString()}
            </div>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="service-card p-6 text-center">
            <h3 className="subsection-title text-primary mb-2">{analytics.overview.totalBookings}</h3>
            <p className="body-regular">Total Bookings</p>
            <div className="flex items-center justify-center mt-2">
              <span className="text-green-600 text-sm">+{analytics.trends.bookingsGrowth}%</span>
              <span className="text-text-secondary text-xs ml-1">vs last period</span>
            </div>
          </div>
          <div className="service-card p-6 text-center">
            <h3 className="subsection-title text-green-600 mb-2">SAR {analytics.overview.totalRevenue.toLocaleString()}</h3>
            <p className="body-regular">Total Revenue</p>
            <div className="flex items-center justify-center mt-2">
              <span className="text-green-600 text-sm">+{analytics.trends.revenueGrowth}%</span>
              <span className="text-text-secondary text-xs ml-1">vs last period</span>
            </div>
          </div>
          <div className="service-card p-6 text-center">
            <h3 className="subsection-title text-blue-600 mb-2">{analytics.overview.averageRating}/5</h3>
            <p className="body-regular">Average Rating</p>
            <div className="flex items-center justify-center mt-2">
              <span className="text-green-600 text-sm">+0.2</span>
              <span className="text-text-secondary text-xs ml-1">vs last period</span>
            </div>
          </div>
          <div className="service-card p-6 text-center">
            <h3 className="subsection-title text-purple-600 mb-2">{analytics.overview.customerSatisfaction}%</h3>
            <p className="body-regular">Customer Satisfaction</p>
            <div className="flex items-center justify-center mt-2">
              <span className="text-green-600 text-sm">+2%</span>
              <span className="text-text-secondary text-xs ml-1">vs last period</span>
            </div>
          </div>
        </div>

        {/* Charts and Insights */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {/* Revenue by Event Type */}
          <div className="service-card p-6">
            <h3 className="subsection-title mb-4 text-primary">Revenue by Event Type</h3>
            <div className="space-y-4">
              {analytics.topEvents.map((event, index) => (
                <div key={index} className="flex justify-between items-center">
                  <div className="flex items-center space-x-3">
                    <div className={`w-4 h-4 rounded-full ${
                      index === 0 ? 'bg-primary' : 
                      index === 1 ? 'bg-blue-500' : 'bg-green-500'
                    }`}></div>
                    <span className="body-regular">{event.type}</span>
                  </div>
                  <div className="text-right">
                    <div className="subsection-title">SAR {event.revenue.toLocaleString()}</div>
                    <div className="text-sm text-text-secondary">{event.count} bookings</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Customer Insights */}
          <div className="service-card p-6">
            <h3 className="subsection-title mb-4 text-primary">Customer Insights</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="body-regular">New Customers</span>
                <span className="subsection-title text-green-600">{analytics.customerInsights.newCustomers}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="body-regular">Returning Customers</span>
                <span className="subsection-title text-blue-600">{analytics.customerInsights.returningCustomers}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="body-regular">Average Booking Value</span>
                <span className="subsection-title text-purple-600">SAR {analytics.customerInsights.averageBookingValue.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="body-regular">Peak Booking Day</span>
                <span className="subsection-title text-yellow-600">{analytics.customerInsights.peakBookingDay}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Analytics */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {/* Booking Trends */}
          <div className="service-card p-6">
            <h3 className="subsection-title mb-4 text-primary">Booking Trends</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="body-regular">Weekly Average</span>
                <span className="subsection-title">8.5</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="body-regular">Monthly Average</span>
                <span className="subsection-title">34.2</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="body-regular">Peak Month</span>
                <span className="subsection-title">December</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="body-regular">Low Season</span>
                <span className="subsection-title">January</span>
              </div>
            </div>
          </div>

          {/* Performance Metrics */}
          <div className="service-card p-6">
            <h3 className="subsection-title mb-4 text-primary">Performance Metrics</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="body-regular">Hall Utilization</span>
                <span className="subsection-title text-green-600">95%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="body-regular">Response Time</span>
                <span className="subsection-title text-blue-600">2.3 hrs</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="body-regular">Booking Conversion</span>
                <span className="subsection-title text-purple-600">84.4%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="body-regular">Customer Retention</span>
                <span className="subsection-title text-yellow-600">28.9%</span>
              </div>
            </div>
          </div>

          {/* Financial Metrics */}
          <div className="service-card p-6">
            <h3 className="subsection-title mb-4 text-primary">Financial Metrics</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="body-regular">Profit Margin</span>
                <span className="subsection-title text-green-600">88%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="body-regular">Operating Costs</span>
                <span className="subsection-title text-red-600">SAR 15,000</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="body-regular">Net Profit</span>
                <span className="subsection-title text-purple-600">SAR 110,000</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="body-regular">ROI</span>
                <span className="subsection-title text-blue-600">733%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Real-time Activity */}
        <div className="service-card p-6">
          <h3 className="subsection-title mb-4 text-primary">Real-time Activity</h3>
          <div className="space-y-3">
            <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="body-regular">New booking received from Sarah Johnson</span>
              <span className="text-sm text-text-secondary ml-auto">2 min ago</span>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span className="body-regular">Payment received for TechCorp event</span>
              <span className="text-sm text-text-secondary ml-auto">15 min ago</span>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-yellow-50 rounded-lg">
              <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
              <span className="body-regular">Customer review submitted - 5 stars</span>
              <span className="text-sm text-text-secondary ml-auto">1 hour ago</span>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-purple-50 rounded-lg">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <span className="body-regular">New customer registered - Ahmed Al-Rashid</span>
              <span className="text-sm text-text-secondary ml-auto">2 hours ago</span>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="service-card p-6 mt-8">
          <h3 className="subsection-title mb-4 text-primary">Quick Actions</h3>
          <div className="grid md:grid-cols-4 gap-4">
            <button 
              onClick={() => router.push('/staff/reports')}
              className="btn-primary"
            >
              View Reports
            </button>
            <button 
              onClick={() => router.push('/staff/bookings')}
              className="btn-secondary"
            >
              Manage Bookings
            </button>
            <button 
              onClick={() => router.push('/staff/announcements')}
              className="btn-outline"
            >
              Post Announcement
            </button>
            <button 
              onClick={() => console.log('Schedule meeting')}
              className="btn-outline"
            >
              Schedule Meeting
            </button>
          </div>
        </div>
      </div>
    </div>
  )
} 