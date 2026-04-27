import { createClient } from '@sanity/client'

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production',
  apiVersion: '2025-01-01',
  token: process.env.SANITY_API_TOKEN!,
  useCdn: false,
})

const testimonials = [
  {
    name: 'Priya & Arjun Mehta',
    location: 'The Meridian Penthouse, Orchard',
    quote: 'The apartment no longer feels like a place we come home to — it feels like where we have always belonged. Every morning we notice something new. That is not something we expected from an interior designer.',
  },
  {
    name: 'Celeste Tan',
    location: 'Residential, Bukit Timah',
    quote: 'Working with Zelf Collective was the most considered design process I have ever been part of. They listened to things I did not even know I was saying. The result is a home that is entirely, quietly, mine.',
  },
  {
    name: 'Marcus Loh',
    location: 'Blanc Studio, Tanjong Pagar',
    quote: 'Our clients walk into the studio and immediately understand who we are. The space closes deals before we say a word. That is exactly what we asked for, and exactly what was delivered.',
  },
]

async function seed() {
  console.log('\n💬 Seeding 3 testimonials...\n')
  for (const t of testimonials) {
    await client.create({ _type: 'testimonial', ...t })
    console.log(`✅ ${t.name}`)
  }
  console.log('\n🎉 Testimonials seeded!\n')
}

seed().catch((err) => {
  console.error('❌ Failed:', err.message)
  process.exit(1)
})
