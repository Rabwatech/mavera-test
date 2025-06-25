export default function DashboardPage() {
  console.log('mavera-hall-dashboard', new Date().toISOString(), 'Dashboard page rendered')

  return (
    <div className="py-24">
      <div className="container-custom">
        <h1 className="section-title mb-16 text-primary">
          Welcome to Your Dashboard
        </h1>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="service-card p-8">
            <h3 className="subsection-title mb-4 text-primary">My Bookings</h3>
            <p className="body-regular mb-6">
              View and manage your upcoming events and booking history.
            </p>
            <button className="btn-primary">
              View Bookings
            </button>
          </div>
          <div className="service-card p-8">
            <h3 className="subsection-title mb-4 text-primary">Profile</h3>
            <p className="body-regular mb-6">
              Update your personal information and preferences.
            </p>
            <button className="btn-primary">
              Edit Profile
            </button>
          </div>
          <div className="service-card p-8">
            <h3 className="subsection-title mb-4 text-primary">Notifications</h3>
            <p className="body-regular mb-6">
              Check your latest updates and important messages.
            </p>
            <button className="btn-primary">
              View Notifications
            </button>
          </div>
          <div className="service-card p-8">
            <h3 className="subsection-title mb-4 text-primary">Wishlist</h3>
            <p className="body-regular mb-6">
              Save your favorite halls and services for future reference.
            </p>
            <button className="btn-primary">
              View Wishlist
            </button>
          </div>
          <div className="service-card p-8">
            <h3 className="subsection-title mb-4 text-primary">Support</h3>
            <p className="body-regular mb-6">
              Get help with your bookings or contact our support team.
            </p>
            <button className="btn-primary">
              Contact Support
            </button>
          </div>
        </div>
      </div>
    </div>
  )
} 