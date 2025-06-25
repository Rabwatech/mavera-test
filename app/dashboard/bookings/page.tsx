export default function BookingsPage() {
  console.log('mavera-hall-bookings-page', new Date().toISOString(), 'Bookings page rendered')

  return (
    <div className="py-24">
      <div className="container-custom">
        <h1 className="section-title mb-16 text-primary">
          My Bookings
        </h1>
        <div className="space-y-8">
          <div className="service-card p-8">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="subsection-title text-primary">Wedding - Sarah & Michael</h3>
                <p className="body-regular text-text-secondary">Booking ID: MH-2024-001</p>
              </div>
              <span className="px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm">
                Confirmed
              </span>
            </div>
            <div className="grid md:grid-cols-3 gap-4 mb-6">
              <div>
                <span className="font-semibold">Event Date:</span>
                <p className="body-regular">December 15, 2024</p>
              </div>
              <div>
                <span className="font-semibold">Guest Count:</span>
                <p className="body-regular">150</p>
              </div>
              <div>
                <span className="font-semibold">Total Price:</span>
                <p className="body-regular">$8,500</p>
              </div>
            </div>
            <div className="flex gap-4">
              <button className="btn-primary">View Details</button>
              <button className="btn-secondary">Contact Support</button>
            </div>
          </div>
          
          <div className="service-card p-8">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="subsection-title text-primary">Corporate Event - TechCorp</h3>
                <p className="body-regular text-text-secondary">Booking ID: MH-2024-002</p>
              </div>
              <span className="px-4 py-2 bg-yellow-100 text-yellow-800 rounded-full text-sm">
                Pending
              </span>
            </div>
            <div className="grid md:grid-cols-3 gap-4 mb-6">
              <div>
                <span className="font-semibold">Event Date:</span>
                <p className="body-regular">January 20, 2025</p>
              </div>
              <div>
                <span className="font-semibold">Guest Count:</span>
                <p className="body-regular">75</p>
              </div>
              <div>
                <span className="font-semibold">Total Price:</span>
                <p className="body-regular">$4,200</p>
              </div>
            </div>
            <div className="flex gap-4">
              <button className="btn-primary">View Details</button>
              <button className="btn-secondary">Contact Support</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 