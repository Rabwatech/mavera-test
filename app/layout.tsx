import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { RootLayoutClient } from './RootLayoutClient'

const inter = Inter({ subsets: ['latin'] })

/**
 * Root layout component for the entire application
 * Handles metadata and provides the basic HTML structure
 */

export const metadata: Metadata = {
  title: 'قاعة مافيرا - Mavera Hall | Premium Event Venue',
  description: 'استمتع بالأناقة والرقي في قاعة مافيرا. المكان المثالي لحفلات الزفاف والمناسبات الشركات والاحتفالات الخاصة.',
  keywords: 'قاعة أفراح, قاعة مناسبات, حفلات زفاف, مؤتمرات, قاعة مافيرا, event venue, wedding hall, corporate events, celebrations, Mavera Hall',
  authors: [{ name: 'Mavera Hall' }],
  openGraph: {
    title: 'قاعة مافيرا - Mavera Hall | Premium Event Venue',
    description: 'استمتع بالأناقة والرقي في قاعة مافيرا - Experience elegance and sophistication at Mavera Hall.',
    type: 'website',
    locale: 'ar_SA',
    alternateLocale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'قاعة مافيرا - Mavera Hall',
    description: 'المكان المثالي للمناسبات الخاصة والاحتفالات الراقية',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ar" dir="rtl" className="scroll-smooth">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#1e40af" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className={`${inter.className} antialiased`}>
        <RootLayoutClient>{children}</RootLayoutClient>
      </body>
    </html>
  )
}