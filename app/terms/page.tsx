export default function TermsPage() {
  console.log('mavera-hall-terms-page', new Date().toISOString(), 'Terms page rendered')

  return (
    <div className="py-24">
      <div className="container-custom">
        <h1 className="section-title text-center mb-16 text-primary">
          Terms of Service
        </h1>
        <div className="max-w-4xl mx-auto">
          <div className="space-y-8">
            <section>
              <h2 className="subsection-title mb-4 text-primary">Acceptance of Terms</h2>
              <p className="body-regular">
                By accessing and using Mavera Hall's services, you accept and agree to be bound by the terms 
                and provision of this agreement.
              </p>
            </section>
            <section>
              <h2 className="subsection-title mb-4 text-primary">Booking and Cancellation</h2>
              <p className="body-regular">
                All bookings require a deposit to confirm. Cancellations must be made at least 30 days 
                in advance for a full refund, minus processing fees.
              </p>
            </section>
            <section>
              <h2 className="subsection-title mb-4 text-primary">Venue Rules</h2>
              <p className="body-regular">
                Guests must follow all venue rules and regulations. Smoking is prohibited indoors. 
                All decorations must be approved in advance.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
} 