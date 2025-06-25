'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface SidebarProps {
  navbarHeight?: number
}

const sections = [
  {
    label: 'Hall Management',
    links: [
      { label: 'View Hall Details', href: '/staff/hall' },
      { label: 'Update Availability', href: '/staff/availability' },
      { label: 'Manage Gallery', href: '/staff/gallery' },
    ],
  },
  {
    label: 'Bookings',
    links: [
      { label: 'View All Bookings', href: '/staff/bookings' },
      { label: 'Calendar View', href: '/staff/bookings/calendar' },
      { label: 'New Booking', href: '/staff/bookings/new' },
    ],
  },
  {
    label: 'Customer Support',
    links: [
      { label: 'Support Tickets', href: '/staff/support' },
      { label: 'Customer List', href: '/staff/customers' },
      { label: 'Manage FAQs', href: '/staff/faqs' },
    ],
  },
  {
    label: 'Content Management',
    links: [
      { label: 'Manage Content', href: '/staff/announcements' },
      { label: 'Post Announcements', href: '/staff/announcements' },
      { label: 'Edit Pages', href: '/staff/pages' },
    ],
  },
  {
    label: 'Reports & Analytics',
    links: [
      { label: 'View Reports', href: '/staff/reports' },
      { label: 'Analytics Dashboard', href: '/staff/analytics' },
      { label: 'Export Data', href: '/staff/reports' },
    ],
  },
  {
    label: 'System Settings',
    links: [
      { label: 'System Settings', href: '/staff/settings' },
      { label: 'Activity Logs', href: '/staff/logs' },
      { label: 'User Management', href: '/staff/users' },
    ],
  },
]

export default function Sidebar({ navbarHeight = 64 }: SidebarProps) {
  const pathname = usePathname()
  // Placeholder for collapse/expand state
  // const [collapsed, setCollapsed] = useState(false)

  return (
    <nav
      aria-label="Sidebar"
      style={{
        position: 'fixed',
        left: 0,
        top: navbarHeight,
        height: `calc(100vh - ${navbarHeight}px)`,
        width: 260,
        overflowY: 'auto',
        background: 'none',
        borderRight: 'none',
        zIndex: 50,
      }}
    >
      {/* Collapse/Expand button placeholder */}
      {/* <button onClick={() => setCollapsed(!collapsed)}>Toggle</button> */}
      <div style={{ padding: 24 }}>
        <h2 style={{ fontWeight: 700, fontSize: 20, marginBottom: 32 }}>Employee Dashboard</h2>
        {sections.map((section) => (
          <div key={section.label} style={{ marginBottom: 32 }}>
            <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 8 }}>{section.label}</div>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {section.links.map((link) => (
                <li key={link.href} style={{ marginBottom: 6 }}>
                  <Link href={link.href} legacyBehavior>
                    <a
                      aria-current={pathname === link.href ? 'page' : undefined}
                      style={{
                        display: 'block',
                        fontWeight: pathname === link.href ? 700 : 400,
                        textDecoration: 'none',
                        color: pathname === link.href ? '#000' : '#444',
                        background: pathname === link.href ? '#eee' : 'none',
                        borderRadius: 4,
                        padding: '8px 12px',
                      }}
                    >
                      {link.label}
                    </a>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </nav>
  )
} 