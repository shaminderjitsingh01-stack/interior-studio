'use client'
import { NextStudio } from 'next-sanity/studio'
import config from '@/sanity.config'

// Disable Next.js static generation for the studio
export const dynamic = 'force-dynamic'

export default function StudioPage() {
  return <NextStudio config={config} />
}
