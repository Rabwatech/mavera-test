export default function GalleryPage() {
  console.log('mavera-hall-gallery-page', new Date().toISOString(), 'Gallery page rendered')

  return (
    <div className="py-24">
      <div className="container-custom">
        <h1 className="section-title text-center mb-16 text-primary">
          Our Gallery
        </h1>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Array.from({ length: 12 }, (_, i) => (
            <div key={i} className="portfolio-card bg-primary/10 rounded-lg"></div>
          ))}
        </div>
      </div>
    </div>
  )
} 