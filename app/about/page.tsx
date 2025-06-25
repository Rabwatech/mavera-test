export default function AboutPage() {
  console.log('mavera-hall-about-page', new Date().toISOString(), 'About page rendered')

  return (
    <div className="py-24">
      <div className="container-custom">
        <h1 className="section-title text-center mb-16 text-primary">
          About Mavera Hall
        </h1>
        <div className="max-w-4xl mx-auto">
          <p className="body-large mb-8">
            Mavera Hall has been the premier destination for elegant events and celebrations for over a decade. 
            Our commitment to excellence and attention to detail has made us the trusted choice for couples, 
            families, and businesses seeking a sophisticated venue for their special occasions.
          </p>
          <p className="body-regular mb-8">
            Our team of experienced professionals works tirelessly to ensure every event is executed flawlessly, 
            from intimate gatherings to grand celebrations. We believe that every moment deserves to be extraordinary.
          </p>
        </div>
      </div>
    </div>
  )
} 