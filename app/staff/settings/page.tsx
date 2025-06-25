'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function StaffSettingsPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState('general')

  const [settings] = useState({
    general: {
      hallName: 'Mavera Hall',
      contactEmail: 'info@maverahall.com',
      contactPhone: '+966 11 234 5678',
      address: 'Riyadh, Saudi Arabia',
      timezone: 'Asia/Riyadh',
      currency: 'SAR'
    },
    booking: {
      maxCapacity: 300,
      minNoticeDays: 7,
      maxAdvanceBooking: 365,
      depositPercentage: 25,
      cancellationPolicy: '30 days full refund'
    },
    notifications: {
      emailNotifications: true,
      smsNotifications: true,
      bookingConfirmations: true,
      reminderNotifications: true
    }
  })

  console.log('mavera-hall-staff-settings', new Date().toISOString(), 'Staff settings page rendered')

  const handleBackToDashboard = () => {
    console.log('mavera-hall-staff-settings-dashboard', new Date().toISOString(), 'Back to dashboard clicked')
    router.push('/staff')
  }

  const handleSaveSettings = () => {
    console.log('mavera-hall-staff-settings-save', new Date().toISOString(), 'Saving settings')
    // Here you would typically save settings to backend
  }

  return (
    <div className="py-24">
      <div className="container-custom">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="section-title text-primary">System Settings</h1>
            <p className="body-regular text-text-secondary">
              Manage hall settings and system configurations
            </p>
          </div>
          <button 
            onClick={handleBackToDashboard}
            className="btn-outline"
          >
            Back to Dashboard
          </button>
        </div>

        {/* Settings Tabs */}
        <div className="service-card p-6 mb-8">
          <div className="flex space-x-4 border-b border-gray-200">
            <button 
              onClick={() => setActiveTab('general')}
              className={`pb-2 px-4 ${activeTab === 'general' ? 'border-b-2 border-primary text-primary' : 'text-text-secondary'}`}
            >
              General Settings
            </button>
            <button 
              onClick={() => setActiveTab('booking')}
              className={`pb-2 px-4 ${activeTab === 'booking' ? 'border-b-2 border-primary text-primary' : 'text-text-secondary'}`}
            >
              Booking Settings
            </button>
            <button 
              onClick={() => setActiveTab('notifications')}
              className={`pb-2 px-4 ${activeTab === 'notifications' ? 'border-b-2 border-primary text-primary' : 'text-text-secondary'}`}
            >
              Notifications
            </button>
            <button 
              onClick={() => setActiveTab('security')}
              className={`pb-2 px-4 ${activeTab === 'security' ? 'border-b-2 border-primary text-primary' : 'text-text-secondary'}`}
            >
              Security
            </button>
          </div>
        </div>

        {/* General Settings */}
        {activeTab === 'general' && (
          <div className="service-card p-6">
            <h3 className="subsection-title mb-6 text-primary">General Settings</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block body-regular font-semibold mb-2">Hall Name</label>
                <input 
                  type="text" 
                  defaultValue={settings.general.hallName}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
              <div>
                <label className="block body-regular font-semibold mb-2">Contact Email</label>
                <input 
                  type="email" 
                  defaultValue={settings.general.contactEmail}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
              <div>
                <label className="block body-regular font-semibold mb-2">Contact Phone</label>
                <input 
                  type="tel" 
                  defaultValue={settings.general.contactPhone}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
              <div>
                <label className="block body-regular font-semibold mb-2">Address</label>
                <input 
                  type="text" 
                  defaultValue={settings.general.address}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
              <div>
                <label className="block body-regular font-semibold mb-2">Timezone</label>
                <select 
                  defaultValue={settings.general.timezone}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option value="Asia/Riyadh">Asia/Riyadh</option>
                  <option value="Asia/Dubai">Asia/Dubai</option>
                  <option value="UTC">UTC</option>
                </select>
              </div>
              <div>
                <label className="block body-regular font-semibold mb-2">Currency</label>
                <select 
                  defaultValue={settings.general.currency}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option value="SAR">SAR (Saudi Riyal)</option>
                  <option value="USD">USD (US Dollar)</option>
                  <option value="EUR">EUR (Euro)</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Booking Settings */}
        {activeTab === 'booking' && (
          <div className="service-card p-6">
            <h3 className="subsection-title mb-6 text-primary">Booking Settings</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block body-regular font-semibold mb-2">Maximum Capacity</label>
                <input 
                  type="number" 
                  defaultValue={settings.booking.maxCapacity}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
              <div>
                <label className="block body-regular font-semibold mb-2">Minimum Notice (Days)</label>
                <input 
                  type="number" 
                  defaultValue={settings.booking.minNoticeDays}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
              <div>
                <label className="block body-regular font-semibold mb-2">Maximum Advance Booking (Days)</label>
                <input 
                  type="number" 
                  defaultValue={settings.booking.maxAdvanceBooking}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
              <div>
                <label className="block body-regular font-semibold mb-2">Deposit Percentage</label>
                <input 
                  type="number" 
                  defaultValue={settings.booking.depositPercentage}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block body-regular font-semibold mb-2">Cancellation Policy</label>
                <textarea 
                  defaultValue={settings.booking.cancellationPolicy}
                  rows={4}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
            </div>
          </div>
        )}

        {/* Notification Settings */}
        {activeTab === 'notifications' && (
          <div className="service-card p-6">
            <h3 className="subsection-title mb-6 text-primary">Notification Settings</h3>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="body-regular font-semibold">Email Notifications</h4>
                  <p className="text-sm text-text-secondary">Send notifications via email</p>
                </div>
                <label className="flex items-center">
                  <input 
                    type="checkbox" 
                    defaultChecked={settings.notifications.emailNotifications}
                    className="w-4 h-4 text-primary focus:ring-primary border-gray-300 rounded"
                  />
                </label>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="body-regular font-semibold">SMS Notifications</h4>
                  <p className="text-sm text-text-secondary">Send notifications via SMS</p>
                </div>
                <label className="flex items-center">
                  <input 
                    type="checkbox" 
                    defaultChecked={settings.notifications.smsNotifications}
                    className="w-4 h-4 text-primary focus:ring-primary border-gray-300 rounded"
                  />
                </label>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="body-regular font-semibold">Booking Confirmations</h4>
                  <p className="text-sm text-text-secondary">Send booking confirmation emails</p>
                </div>
                <label className="flex items-center">
                  <input 
                    type="checkbox" 
                    defaultChecked={settings.notifications.bookingConfirmations}
                    className="w-4 h-4 text-primary focus:ring-primary border-gray-300 rounded"
                  />
                </label>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="body-regular font-semibold">Reminder Notifications</h4>
                  <p className="text-sm text-text-secondary">Send event reminders</p>
                </div>
                <label className="flex items-center">
                  <input 
                    type="checkbox" 
                    defaultChecked={settings.notifications.reminderNotifications}
                    className="w-4 h-4 text-primary focus:ring-primary border-gray-300 rounded"
                  />
                </label>
              </div>
            </div>
          </div>
        )}

        {/* Security Settings */}
        {activeTab === 'security' && (
          <div className="service-card p-6">
            <h3 className="subsection-title mb-6 text-primary">Security Settings</h3>
            <div className="space-y-6">
              <div>
                <h4 className="body-regular font-semibold mb-4">Password Policy</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block body-regular font-semibold mb-2">Minimum Password Length</label>
                    <input 
                      type="number" 
                      defaultValue={8}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block body-regular font-semibold mb-2">Password Expiry (Days)</label>
                    <input 
                      type="number" 
                      defaultValue={90}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                </div>
              </div>
              <div>
                <h4 className="body-regular font-semibold mb-4">Session Management</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block body-regular font-semibold mb-2">Session Timeout (Minutes)</label>
                    <input 
                      type="number" 
                      defaultValue={30}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block body-regular font-semibold mb-2">Max Login Attempts</label>
                    <input 
                      type="number" 
                      defaultValue={5}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Save Button */}
        <div className="flex justify-end mt-8">
          <button 
            onClick={handleSaveSettings}
            className="btn-primary"
          >
            Save Settings
          </button>
        </div>
      </div>
    </div>
  )
} 