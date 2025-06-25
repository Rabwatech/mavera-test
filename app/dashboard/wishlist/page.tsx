export default function WishlistPage() {
  console.log('mavera-hall-wishlist-page', new Date().toISOString(), 'Wishlist page rendered')

  return (
    <div className="py-24">
      <div className="container-custom">
        <h1 className="section-title mb-16 text-primary">
          My Wishlist
        </h1>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="service-card p-6">
            <div className="aspect-square bg-primary/10 rounded-lg mb-4"></div>
            <h3 className="subsection-title mb-2 text-primary">Main Hall</h3>
            <p className="body-regular mb-4">
              Elegant main hall perfect for large weddings and events.
            </p>
            <div className="flex justify-between items-center">
              <span className="font-semibold">$5,000</span>
              <button className="btn-primary">Book Now</button>
            </div>
          </div>
          
          <div className="service-card p-6">
            <div className="aspect-square bg-primary/10 rounded-lg mb-4"></div>
            <h3 className="subsection-title mb-2 text-primary">Garden Terrace</h3>
            <p className="body-regular mb-4">
              Beautiful outdoor space for intimate gatherings and ceremonies.
            </p>
            <div className="flex justify-between items-center">
              <span className="font-semibold">$3,500</span>
              <button className="btn-primary">Book Now</button>
            </div>
          </div>
          
          <div className="service-card p-6">
            <div className="aspect-square bg-primary/10 rounded-lg mb-4"></div>
            <h3 className="subsection-title mb-2 text-primary">Executive Suite</h3>
            <p className="body-regular mb-4">
              Sophisticated space for corporate events and meetings.
            </p>
            <div className="flex justify-between items-center">
              <span className="font-semibold">$4,200</span>
              <button className="btn-primary">Book Now</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 