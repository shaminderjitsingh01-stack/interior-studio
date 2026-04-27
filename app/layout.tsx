import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: {
    default: 'Studio Interior | Luxury Interior Design',
    template: '%s | Studio Interior',
  },
  description: 'An award-winning interior design studio crafting bespoke spaces that tell your story.',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'Studio Interior',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
