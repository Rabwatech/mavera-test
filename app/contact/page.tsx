export default function ContactPage() {
  console.log('mavera-hall-contact-page', new Date().toISOString(), 'Contact page rendered')

  return (
    <div className="py-24">
      <div className="container-custom">
        <h1 className="section-title text-center mb-16 text-primary">
          Contact Us
        </h1>
        <div className="grid lg:grid-cols-2 gap-16">
          <div>
            <h2 className="subsection-title mb-8 text-primary">Get In Touch</h2>
            <div className="space-y-6">
              <div>
                <h3 className="body-regular font-semibold mb-2">Address</h3>
                <p className="body-regular">123 Elegance Street, Luxury District, City</p>
              </div>
              <div>
                <h3 className="body-regular font-semibold mb-2">Phone</h3>
                <p className="body-regular">+1 (555) 123-4567</p>
              </div>
              <div>
                <h3 className="body-regular font-semibold mb-2">Email</h3>
                <p className="body-regular">info@maverahall.com</p>
              </div>
            </div>
          </div>
          <div>
            <h2 className="subsection-title mb-8 text-primary">Send us a Message</h2>
            <form className="space-y-6">
              <div>
                <label className="form-label">Name</label>
                <input type="text" className="form-input" placeholder="Your name" />
              </div>
              <div>
                <label className="form-label">Email</label>
                <input type="email" className="form-input" placeholder="your@email.com" />
              </div>
              <div>
                <label className="form-label">Message</label>
                <textarea className="form-input form-textarea" placeholder="Your message"></textarea>
              </div>
              <button type="submit" className="btn-primary">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
} 