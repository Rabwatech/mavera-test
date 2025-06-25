export default function BookingPage() {
  console.log('mavera-hall-booking-page', new Date().toISOString(), 'Booking page rendered')

  return (
    <div className="py-24">
      <div className="container-custom">
        <h1 className="section-title text-center mb-16 text-primary">
          Book Your Event
        </h1>
        <div className="max-w-2xl mx-auto">
          <form className="space-y-8">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="form-label">First Name</label>
                <input type="text" className="form-input" placeholder="First name" />
              </div>
              <div>
                <label className="form-label">Last Name</label>
                <input type="text" className="form-input" placeholder="Last name" />
              </div>
            </div>
            <div>
              <label className="form-label">Email</label>
              <input type="email" className="form-input" placeholder="your@email.com" />
            </div>
            <div>
              <label className="form-label">Phone</label>
              <input type="tel" className="form-input" placeholder="Phone number" />
            </div>
            <div>
              <label className="form-label">Event Type</label>
              <select className="form-input">
                <option>Wedding</option>
                <option>Corporate Event</option>
                <option>Private Party</option>
                <option>Other</option>
              </select>
            </div>
            <div>
              <label className="form-label">Event Date</label>
              <input type="date" className="form-input" />
            </div>
            <div>
              <label className="form-label">Number of Guests</label>
              <input type="number" className="form-input" placeholder="Expected guest count" />
            </div>
            <div>
              <label className="form-label">Special Requests</label>
              <textarea className="form-input form-textarea" placeholder="Any special requirements or requests"></textarea>
            </div>
            <button type="submit" className="btn-primary w-full">
              Submit Booking Request
            </button>
          </form>
        </div>
      </div>
    </div>
  )
} 