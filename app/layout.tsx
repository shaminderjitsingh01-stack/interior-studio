import type { Metadata } from 'next'
import './globals.css'
import WhatsAppButton from '@/components/WhatsAppButton'

export const metadata: Metadata = {
  title: {
    default: 'Zelf Collective | Luxury Interior Design',
    template: '%s | Zelf Collective',
  },
  description: 'Zelf Collective is a luxury interior design studio crafting bespoke spaces that tell your story.',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'Zelf Collective',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
        <WhatsAppButton />
      </body>
    </html>
  )
}
