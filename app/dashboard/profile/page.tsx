export default function ProfilePage() {
  console.log('mavera-hall-profile-page', new Date().toISOString(), 'Profile page rendered')

  return (
    <div className="py-24">
      <div className="container-custom">
        <h1 className="section-title mb-16 text-primary">
          My Profile
        </h1>
        <div className="max-w-2xl mx-auto">
          <form className="space-y-8">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="form-label">First Name</label>
                <input type="text" className="form-input" defaultValue="John" />
              </div>
              <div>
                <label className="form-label">Last Name</label>
                <input type="text" className="form-input" defaultValue="Doe" />
              </div>
            </div>
            <div>
              <label className="form-label">Email</label>
              <input type="email" className="form-input" defaultValue="john@example.com" />
            </div>
            <div>
              <label className="form-label">Phone</label>
              <input type="tel" className="form-input" defaultValue="+1 (555) 123-4567" />
            </div>
            <div>
              <label className="form-label">Address</label>
              <textarea className="form-input form-textarea" defaultValue="123 Main Street, City, State 12345"></textarea>
            </div>
            <div>
              <label className="form-label">Preferences</label>
              <textarea className="form-input form-textarea" placeholder="Any special preferences or requirements"></textarea>
            </div>
            <button type="submit" className="btn-primary">
              Save Changes
            </button>
          </form>
        </div>
      </div>
    </div>
  )
} 