export default function BookingConfirmationPage() {
  console.log('mavera-hall-booking-confirmation-page', new Date().toISOString(), 'Booking confirmation page rendered')

  return (
    <div className="py-24">
      <div className="container-custom">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="section-title mb-8 text-primary">
            Booking Confirmed!
          </h1>
          <div className="bg-background-secondary p-8 rounded-lg mb-8">
            <h2 className="subsection-title mb-6 text-primary">Booking Details</h2>
            <div className="space-y-4 text-left">
              <div>
                <span className="font-semibold">Booking ID:</span> MH-2024-001
              </div>
              <div>
                <span className="font-semibold">Event Date:</span> December 15, 2024
              </div>
              <div>
                <span className="font-semibold">Event Type:</span> Wedding
              </div>
              <div>
                <span className="font-semibold">Guest Count:</span> 150
              </div>
            </div>
          </div>
          <p className="body-regular mb-8">
            Thank you for choosing Mavera Hall! We've received your booking request and will contact you 
            within 24 hours to confirm all details and discuss next steps.
          </p>
          <div className="space-y-4">
            <button className="btn-primary">
              View My Bookings
            </button>
            <button className="btn-secondary">
              Return to Home
            </button>
          </div>
        </div>
      </div>
    </div>
  )
} 