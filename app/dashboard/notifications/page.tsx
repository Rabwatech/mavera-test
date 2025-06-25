export default function NotificationsPage() {
  console.log('mavera-hall-notifications-page', new Date().toISOString(), 'Notifications page rendered')

  return (
    <div className="py-24">
      <div className="container-custom">
        <h1 className="section-title mb-16 text-primary">
          Notifications
        </h1>
        <div className="space-y-6">
          <div className="service-card p-6">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="body-regular font-semibold mb-2">Booking Confirmed</h3>
                <p className="body-small text-text-secondary">
                  Your wedding booking for December 15, 2024 has been confirmed. We'll contact you soon with next steps.
                </p>
                <p className="body-small text-text-secondary mt-2">2 hours ago</p>
              </div>
              <span className="w-3 h-3 bg-primary rounded-full"></span>
            </div>
          </div>
          
          <div className="service-card p-6">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="body-regular font-semibold mb-2">Payment Received</h3>
                <p className="body-small text-text-secondary">
                  We've received your deposit payment of $2,000 for booking MH-2024-001.
                </p>
                <p className="body-small text-text-secondary mt-2">1 day ago</p>
              </div>
            </div>
          </div>
          
          <div className="service-card p-6">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="body-regular font-semibold mb-2">Venue Tour Scheduled</h3>
                <p className="body-small text-text-secondary">
                  Your venue tour has been scheduled for November 10, 2024 at 2:00 PM.
                </p>
                <p className="body-small text-text-secondary mt-2">3 days ago</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 