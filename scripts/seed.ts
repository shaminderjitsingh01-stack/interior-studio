import { createClient } from '@sanity/client'

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production',
  apiVersion: '2025-01-01',
  token: process.env.SANITY_API_TOKEN!,
  useCdn: false,
})

async function uploadImageFromUrl(url: string, filename: string) {
  console.log(`  ↑ Uploading ${filename}...`)
  const res = await fetch(url, {
    headers: { 'User-Agent': 'Mozilla/5.0 (compatible; seed-script/1.0)' },
  })
  if (!res.ok) throw new Error(`Failed to fetch image: ${url} (${res.status})`)
  const buffer = Buffer.from(await res.arrayBuffer())
  const asset = await client.assets.upload('image', buffer, {
    filename,
    contentType: 'image/jpeg',
  })
  return {
    _type: 'image' as const,
    asset: { _type: 'reference' as const, _ref: asset._id },
  }
}

function block(key: string, text: string) {
  return {
    _type: 'block' as const,
    _key: key,
    style: 'normal' as const,
    children: [{ _type: 'span' as const, _key: `${key}s`, text, marks: [] }],
    markDefs: [],
  }
}

async function seed() {
  console.log('\n🌱 Seeding Zelf Collective with 3 mock projects...\n')

  // ── Upload all images ──────────────────────────────────────────────────────
  console.log('📸 Uploading images (this takes ~30s)...')
  const [
    penthouseCover,
    penthouseBedroom,
    penthouseKitchen,
    penthouseDining,
    blancCover,
    blancDetail,
    greenCover,
    greenDetail,
  ] = await Promise.all([
    uploadImageFromUrl(
      'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1600',
      'meridian-living.jpg'
    ),
    uploadImageFromUrl(
      'https://images.pexels.com/photos/271618/pexels-photo-271618.jpeg?auto=compress&cs=tinysrgb&w=1600',
      'meridian-bedroom.jpg'
    ),
    uploadImageFromUrl(
      'https://images.pexels.com/photos/1599791/pexels-photo-1599791.jpeg?auto=compress&cs=tinysrgb&w=1600',
      'meridian-kitchen.jpg'
    ),
    uploadImageFromUrl(
      'https://images.pexels.com/photos/1395967/pexels-photo-1395967.jpeg?auto=compress&cs=tinysrgb&w=1600',
      'meridian-dining.jpg'
    ),
    uploadImageFromUrl(
      'https://images.pexels.com/photos/1170412/pexels-photo-1170412.jpeg?auto=compress&cs=tinysrgb&w=1600',
      'blanc-office.jpg'
    ),
    uploadImageFromUrl(
      'https://images.pexels.com/photos/3182759/pexels-photo-3182759.jpeg?auto=compress&cs=tinysrgb&w=1600',
      'blanc-detail.jpg'
    ),
    uploadImageFromUrl(
      'https://images.pexels.com/photos/2988860/pexels-photo-2988860.jpeg?auto=compress&cs=tinysrgb&w=1600',
      'greenhouse-garden.jpg'
    ),
    uploadImageFromUrl(
      'https://images.pexels.com/photos/1454806/pexels-photo-1454806.jpeg?auto=compress&cs=tinysrgb&w=1600',
      'greenhouse-interior.jpg'
    ),
  ])
  console.log('✅ All images uploaded\n')

  // ── Project 1: The Meridian Penthouse ─────────────────────────────────────
  console.log('🏙  Creating Project 1: The Meridian Penthouse...')
  await client.create({
    _type: 'project',
    title: 'The Meridian Penthouse',
    slug: { _type: 'slug', current: 'the-meridian-penthouse' },
    coverImage: penthouseCover,
    excerpt: 'A 4,200 sq ft sky residence where restraint meets luxury.',
    location: 'Orchard, Singapore',
    year: '2024',
    tags: ['Residential'],
    sections: [
      {
        _key: 'p1s1',
        heading: 'The Brief',
        body: [
          block('p1b1', 'The clients — a couple returning from a decade abroad — wanted a penthouse that felt nothing like a penthouse. No dramatic gestures. No statement pieces. Instead, they asked for something rare: a home that would simply let them exhale.'),
          block('p1b2', 'Our mandate was to design a 4,200 sq ft residence that felt intimate at every scale — a place where mornings feel slow and evenings feel earned.'),
        ],
        layout: 'text-only',
      },
      {
        _key: 'p1s2',
        heading: 'The Concept',
        body: [
          block('p1b3', 'We drew from the Japanese philosophy of ma — the beauty of negative space — and the Scandinavian principle of hygge, the art of creating warmth through simplicity. The result is a home that breathes.'),
          block('p1b4', 'Every material was chosen for how it ages: pale French oak that softens with time, honed travertine that tells the story of its origins, aged brass that deepens with each passing year.'),
        ],
        image: penthouseBedroom,
        layout: 'image-right',
      },
      {
        _key: 'p1s3',
        heading: 'The Living Spaces',
        body: [
          block('p1b5', 'The main living area flows seamlessly into a dining space and open kitchen — unified by a continuous ceiling treatment and a material palette that never breaks its own rules. Floor-to-ceiling glazing frames the city skyline as a living artwork.'),
        ],
        image: penthouseKitchen,
        layout: 'image-full',
      },
      {
        _key: 'p1s4',
        heading: 'Materials & Palette',
        body: [
          block('p1b6', 'The palette revolves around four anchors: warm travertine, pale linen, aged brass, and a deep forest green used in punctuation — a reading chair, a side table, a vase. Nothing competes. Everything converses.'),
        ],
        image: penthouseDining,
        layout: 'image-left',
      },
    ],
    gallery: [penthouseBedroom, penthouseKitchen, penthouseDining],
    clientQuote: {
      quote: "The apartment no longer feels like a place we come home to — it feels like where we have always belonged.",
      name: 'The Lim Family, Orchard',
    },
  })
  console.log('✅ Project 1 created\n')

  // ── Project 2: Blanc Studio ───────────────────────────────────────────────
  console.log('🏢  Creating Project 2: Blanc Studio...')
  await client.create({
    _type: 'project',
    title: 'Blanc Studio',
    slug: { _type: 'slug', current: 'blanc-studio' },
    coverImage: blancCover,
    excerpt: 'A creative studio for a branding agency — designed around focus, flow, and the quiet dignity of work.',
    location: 'Tanjong Pagar, Singapore',
    year: '2023',
    tags: ['Commercial'],
    sections: [
      {
        _key: 'p2s1',
        heading: 'The Brief',
        body: [
          block('p2b1', 'A boutique branding agency needed a studio that would attract clients before a single word was spoken. The space had to embody their own design philosophy: clean, considered, and quietly confident.'),
          block('p2b2', 'The brief was deceptively simple — create 1,800 sq ft that functions as both a productive workplace and an immersive brand experience. Every corner of the office would become part of the agency\'s pitch.'),
        ],
        layout: 'text-only',
      },
      {
        _key: 'p2s2',
        heading: 'Zones & Flow',
        body: [
          block('p2b3', 'We divided the space into three distinct zones: a reception and client lounge at the front, an open studio in the core, and a private conference and breakout room at the rear. Each zone has its own acoustic identity — from the soft hum of the reception to the concentrated quiet of the studio.'),
          block('p2b4', 'The transition between zones is marked not by walls but by changes in ceiling height, flooring material, and light quality. Movement through the space feels deliberate and theatrical without being overwrought.'),
        ],
        image: blancDetail,
        layout: 'image-right',
      },
      {
        _key: 'p2s3',
        heading: 'Light & Material',
        body: [
          block('p2b5', 'We stripped the space back to its bones — exposed concrete ceiling, polished screed floors — and then layered in warmth through white oak joinery, soft woven textiles, and carefully positioned task lighting. The result feels both industrial and intimate.'),
        ],
        image: blancCover,
        layout: 'image-full',
      },
    ],
    gallery: [blancCover, blancDetail],
    clientQuote: {
      quote: "Clients walk in and immediately understand who we are. The space does the work before we say a word.",
      name: 'Creative Director, Blanc Agency',
    },
  })
  console.log('✅ Project 2 created\n')

  // ── Project 3: The Green House ────────────────────────────────────────────
  console.log('🌿  Creating Project 3: The Green House...')
  await client.create({
    _type: 'project',
    title: 'The Green House',
    slug: { _type: 'slug', current: 'the-green-house' },
    coverImage: greenCover,
    excerpt: 'A landed property renovation centred on biophilic design and the quiet luxury of natural light.',
    location: 'Bukit Timah, Singapore',
    year: '2024',
    tags: ['Residential', 'Renovation'],
    sections: [
      {
        _key: 'p3s1',
        heading: 'The Brief',
        body: [
          block('p3b1', 'A family of four purchased a 1970s landed property with good bones but decades of uninspired renovation layered on top. They wanted to return the house to something honest — connected to the land, flooded with light, and gentle on the senses.'),
          block('p3b2', 'The brief centred on one word: green. Not as a colour, but as a philosophy. They wanted a home that felt alive.'),
        ],
        layout: 'text-only',
      },
      {
        _key: 'p3s2',
        heading: 'Biophilic Design',
        body: [
          block('p3b3', 'We introduced a central courtyard that brings a vertical garden into the heart of the home, visible from the kitchen, dining room, and master bedroom. Living walls of tropical ferns and monstera filter light throughout the day, creating a sense of the house breathing alongside its occupants.'),
          block('p3b4', 'Materials were chosen to blur the boundary between inside and out: rough limestone floors that continue onto the terrace, teak screens that filter the afternoon sun, and rattan ceiling panels that recall the texture of a tropical canopy.'),
        ],
        image: greenCover,
        layout: 'image-right',
      },
      {
        _key: 'p3s3',
        heading: 'The Garden Room',
        body: [
          block('p3b5', 'The centrepiece of the renovation is the garden room — a glass-roofed extension that functions as a third living space. By day it is flooded with filtered light; by evening it becomes the most beautiful room in the house, framed by the illuminated courtyard garden and the sound of water.'),
        ],
        image: greenDetail,
        layout: 'image-full',
      },
    ],
    gallery: [greenCover, greenDetail],
    clientQuote: {
      quote: "We have lived here for three years and we still notice something new every morning. The light especially — it never does the same thing twice.",
      name: 'The Tan Family, Bukit Timah',
    },
  })
  console.log('✅ Project 3 created\n')

  console.log('🎉 All 3 mock projects seeded into Sanity!')
  console.log('   Visit /portfolio to see them live.\n')
}

seed().catch((err) => {
  console.error('❌ Seed failed:', err.message)
  process.exit(1)
})
