export default function FAQsPage() {
  console.log('mavera-hall-faqs-page', new Date().toISOString(), 'FAQs page rendered')

  return (
    <div className="py-24">
      <div className="container-custom">
        <h1 className="section-title text-center mb-16 text-primary">
          Frequently Asked Questions
        </h1>
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="testimonial-card">
            <h3 className="subsection-title mb-4 text-primary">What is included in the booking?</h3>
            <p className="body-regular">Our booking includes the venue, basic setup, and coordination services.</p>
          </div>
          <div className="testimonial-card">
            <h3 className="subsection-title mb-4 text-primary">How far in advance should I book?</h3>
            <p className="body-regular">We recommend booking at least 6-12 months in advance for weddings.</p>
          </div>
          <div className="testimonial-card">
            <h3 className="subsection-title mb-4 text-primary">Do you provide catering services?</h3>
            <p className="body-regular">We work with preferred caterers and can recommend options based on your needs.</p>
          </div>
        </div>
      </div>
    </div>
  )
} 