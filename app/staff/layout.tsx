import Navbar from '../../components/layout/Navbar'
import Sidebar from '../../components/layout/Sidebar'

const NAVBAR_HEIGHT = 64

export default function StaffLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Navbar />
      <div style={{ display: 'flex' }}>
        <Sidebar navbarHeight={NAVBAR_HEIGHT} />
        <main style={{ marginLeft: 260, marginTop: NAVBAR_HEIGHT, width: '100%' }}>
          {children}
        </main>
      </div>
    </div>
  )
}