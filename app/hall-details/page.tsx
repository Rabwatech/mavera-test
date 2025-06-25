export default function HallDetailsPage() {
  console.log('mavera-hall-details-page', new Date().toISOString(), 'Hall details page rendered')

  return (
    <div className="py-24">
      <div className="container-custom">
        <h1 className="section-title text-center mb-16 text-primary">
          Hall Details
        </h1>
        <div className="grid lg:grid-cols-2 gap-16">
          <div>
            <h2 className="subsection-title mb-8 text-primary">Main Hall</h2>
            <p className="body-large mb-6">
              Our main hall features elegant architecture with modern amenities, perfect for weddings and large events.
            </p>
            <div className="space-y-4">
              <div>
                <h3 className="body-regular font-semibold">Capacity</h3>
                <p className="body-regular">Up to 300 guests</p>
              </div>
              <div>
                <h3 className="body-regular font-semibold">Amenities</h3>
                <p className="body-regular">Sound system, lighting, catering kitchen, bridal suite</p>
              </div>
              <div>
                <h3 className="body-regular font-semibold">Pricing</h3>
                <p className="body-regular">Starting from $5,000</p>
              </div>
            </div>
          </div>
          <div className="aspect-square bg-primary/10 rounded-lg"></div>
        </div>
      </div>
    </div>
  )
} 