export default function PrivacyPage() {
  console.log('mavera-hall-privacy-page', new Date().toISOString(), 'Privacy page rendered')

  return (
    <div className="py-24">
      <div className="container-custom">
        <h1 className="section-title text-center mb-16 text-primary">
          Privacy Policy
        </h1>
        <div className="max-w-4xl mx-auto">
          <div className="space-y-8">
            <section>
              <h2 className="subsection-title mb-4 text-primary">Information We Collect</h2>
              <p className="body-regular">
                We collect information you provide directly to us, such as when you create an account, 
                make a booking, or contact us for support.
              </p>
            </section>
            <section>
              <h2 className="subsection-title mb-4 text-primary">How We Use Your Information</h2>
              <p className="body-regular">
                We use the information we collect to provide, maintain, and improve our services, 
                process bookings, and communicate with you.
              </p>
            </section>
            <section>
              <h2 className="subsection-title mb-4 text-primary">Information Sharing</h2>
              <p className="body-regular">
                We do not sell, trade, or otherwise transfer your personal information to third parties 
                without your consent, except as described in this policy.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
} 