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
  if (!res.ok) throw new Error(`Failed to fetch: ${url} (${res.status})`)
  const buffer = Buffer.from(await res.arrayBuffer())
  const asset = await client.assets.upload('image', buffer, {
    filename,
    contentType: 'image/jpeg',
  })
  return { _type: 'image' as const, asset: { _type: 'reference' as const, _ref: asset._id } }
}

function block(key: string, text: string) {
  return {
    _type: 'block' as const,
    _key: key,
    style: 'normal' as const,
    markDefs: [],
    children: [{ _type: 'span' as const, _key: `${key}s`, text, marks: [] }],
  }
}

function heading(key: string, text: string) {
  return {
    _type: 'block' as const,
    _key: key,
    style: 'h3' as const,
    markDefs: [],
    children: [{ _type: 'span' as const, _key: `${key}s`, text, marks: [] }],
  }
}

async function seed() {
  console.log('\n📖 Seeding 5 journal posts...\n')

  console.log('📸 Uploading cover images...')
  const [img1, img2, img3, img4, img5] = await Promise.all([
    uploadImageFromUrl(
      'https://images.pexels.com/photos/2062426/pexels-photo-2062426.jpeg?auto=compress&cs=tinysrgb&w=1600',
      'journal-negative-space.jpg'
    ),
    uploadImageFromUrl(
      'https://images.pexels.com/photos/3935333/pexels-photo-3935333.jpeg?auto=compress&cs=tinysrgb&w=1600',
      'journal-travertine.jpg'
    ),
    uploadImageFromUrl(
      'https://images.pexels.com/photos/1350789/pexels-photo-1350789.jpeg?auto=compress&cs=tinysrgb&w=1600',
      'journal-how-you-live.jpg'
    ),
    uploadImageFromUrl(
      'https://images.pexels.com/photos/2251247/pexels-photo-2251247.jpeg?auto=compress&cs=tinysrgb&w=1600',
      'journal-light.jpg'
    ),
    uploadImageFromUrl(
      'https://images.pexels.com/photos/1668860/pexels-photo-1668860.jpeg?auto=compress&cs=tinysrgb&w=1600',
      'journal-slow-design.jpg'
    ),
  ])
  console.log('✅ Images uploaded\n')

  // ── Post 1 ─────────────────────────────────────────────────────────────────
  await client.create({
    _type: 'post',
    title: 'The Art of Negative Space',
    slug: { _type: 'slug', current: 'the-art-of-negative-space' },
    coverImage: img1,
    excerpt: 'In a world saturated with more, the most powerful design statement a room can make is restraint.',
    publishedAt: '2024-11-10T09:00:00Z',
    body: [
      block('b1', 'There is a moment in every great interior when you stop noticing the things in a room and begin to feel the room itself. The air between objects. The pause before the eye lands somewhere. The silence between notes in a piece of music.'),
      block('b2', 'This is the art of negative space — and it is perhaps the hardest discipline in interior design, because it requires the courage to do less.'),
      heading('h1', 'Why More Is Almost Always Less'),
      block('b3', 'We are conditioned to equate fullness with richness. A room stacked with books, objects, textures, and colour feels generous, lived-in, curated. But there is a ceiling to this generosity. At some point, the eye has nowhere to rest. The mind, overstimulated, cannot settle. The room works against the very thing a home is supposed to provide: peace.'),
      block('b4', 'The Japanese have a word for this: ma. It translates roughly as "gap" or "pause" — the meaningful emptiness between things. A doorway before you enter a room. The breath between sentences. The bare wall beside a single painting that makes the painting sing.'),
      heading('h2', 'How We Apply It'),
      block('b5', 'In practice, negative space is not about removing things arbitrarily. It is about understanding the weight of every object in a room and asking whether its presence earns its place. A side table that does nothing — that simply occupies space — is a burden on the room. A single sculptural chair in a corner, with nothing around it, is a statement.'),
      block('b6', 'We often ask clients to live with an empty room for a week before we furnish it. The experience is almost always revelatory. They begin to notice the light at different hours. The way the ceiling meets the wall. The quality of the silence. They discover what the room already is — before we impose anything onto it.'),
      block('b7', 'The best interiors we have designed did not require more. They required the clarity to know when to stop.'),
    ],
  })
  console.log('✅ Post 1: The Art of Negative Space')

  // ── Post 2 ─────────────────────────────────────────────────────────────────
  await client.create({
    _type: 'post',
    title: 'Why We Keep Choosing Travertine',
    slug: { _type: 'slug', current: 'why-we-keep-choosing-travertine' },
    coverImage: img2,
    excerpt: 'Every material tells a story. Travertine tells one about time — and that is exactly why we cannot stop using it.',
    publishedAt: '2024-10-03T09:00:00Z',
    body: [
      block('b1', 'If you have noticed that travertine appears in almost everything we design, you are not imagining it. It appears on floors, walls, kitchen islands, bathroom surfaces, and occasionally as a sculptural object in its own right. We return to it again and again — not out of habit, but out of genuine conviction.'),
      block('b2', 'Travertine is limestone formed in hot springs over thousands of years. The holes and striations in its surface are not imperfections. They are the record of that formation — tiny air bubbles, mineral deposits, the slow accumulation of geological time. When you run your hand across a honed travertine surface, you are touching something that took longer to form than the entire span of recorded human history.'),
      heading('h1', 'It Ages Beautifully'),
      block('b3', 'The materials we love most in design are the ones that become more beautiful with use. Leather that develops a patina. Linen that softens with each wash. Oak that deepens in colour as the years pass. Travertine belongs to this category.'),
      block('b4', 'In high-traffic areas — a kitchen floor, an entrance hall — travertine acquires a subtle polish where feet have walked. The surface becomes smoother, warmer, more intimate. The stone begins to feel like it belongs to the house, not just in it.'),
      heading('h2', 'It Works in Any Light'),
      block('b5', 'One of the reasons we specify travertine so often is its extraordinary relationship with light. In morning light, a pale Roman travertine floor reads almost white — clean, cool, and expansive. By late afternoon, the same floor turns gold. At dusk, in the warm glow of lamps, it becomes amber, almost amber.'),
      block('b6', 'Few materials have this range. Most surfaces look more or less the same at any hour. Travertine participates in the life of a room, changing with the light, never static.'),
      block('b7', 'We will keep choosing it. Not because it is fashionable — though it is, again, deservedly so — but because it is honest, generous, and enduring. In design, those qualities are rare.'),
    ],
  })
  console.log('✅ Post 2: Why We Keep Choosing Travertine')

  // ── Post 3 ─────────────────────────────────────────────────────────────────
  await client.create({
    _type: 'post',
    title: 'Design for the Life You Actually Live',
    slug: { _type: 'slug', current: 'design-for-the-life-you-actually-live' },
    coverImage: img3,
    excerpt: 'The most common mistake in interior design is designing for an idealised version of yourself rather than the real one.',
    publishedAt: '2024-09-18T09:00:00Z',
    body: [
      block('b1', 'We have a conversation with every new client that goes something like this. We ask how they use their home. They describe a life of dinner parties, morning yoga, children doing homework at a beautifully organised desk, and evenings spent reading by the fire. Then we ask about a typical Tuesday. The answers are different.'),
      block('b2', 'Most people, when asked to describe their ideal life, describe someone else — a more organised, more social, more intentional version of themselves. This is not a character flaw. It is human nature. But it is also the most common and most expensive mistake in interior design.'),
      heading('h1', 'The Homework Table That Never Gets Used'),
      block('b3', 'We once designed a home for a family who were convinced they needed a formal dining room. They envisioned Sunday lunches, Christmas dinners, the table set with proper crockery. We built it — a beautiful room, properly proportioned, with the right light and the right chairs.'),
      block('b4', 'Two years later, we returned for a follow-up project. The dining room had become a homework room, a wrapping station at Christmas, and a repository for things that had nowhere else to go. The family ate every meal at the kitchen island. They always had.'),
      block('b5', 'We do not tell this story to be unkind to our clients. We tell it because we should have asked harder questions at the start.'),
      heading('h2', 'What We Ask Instead'),
      block('b6', 'Our process now begins with what we call a life audit. We ask clients to keep a simple log for one week — where they actually sit, eat, work, and rest. Where their keys end up every evening. Which rooms feel good and which feel wrong. Where the children actually do their homework.'),
      block('b7', 'The results are always illuminating. Almost always, the life that emerges from this exercise is richer, more specific, and more interesting than the idealised version. The challenge — and the privilege — of our work is to design for that life. The real one.'),
    ],
  })
  console.log('✅ Post 3: Design for the Life You Actually Live')

  // ── Post 4 ─────────────────────────────────────────────────────────────────
  await client.create({
    _type: 'post',
    title: 'Light Is a Material',
    slug: { _type: 'slug', current: 'light-is-a-material' },
    coverImage: img4,
    excerpt: 'We specify stone, wood, linen, and brass. But the material we think about most — the one that changes everything — is one that cannot be touched.',
    publishedAt: '2024-08-05T09:00:00Z',
    body: [
      block('b1', 'When we begin a new project, one of the first things we do is visit the space at different times of day. Early morning. Midday. Late afternoon. Evening. We are not looking at the architecture — we are watching the light.'),
      block('b2', 'Light is not a feature of a room. It is not something you add with a fitting or control with a dimmer switch, though both of those things matter enormously. Natural light — the light that enters through windows, falls across floors, catches the edge of a surface — is the invisible architecture of every space. It determines how a room feels more than almost anything else.'),
      heading('h1', 'North Light and South Light'),
      block('b3', 'A north-facing room receives cool, consistent light throughout the day — the light that artists have historically preferred for studios, because it does not shift. It is reliable and clear, but it can also feel cold if not handled carefully. In north-facing rooms, we lean into warm materials: honey-toned oak, aged brass, terracotta, linen in sand or ochre. The materials do the work that the sun cannot.'),
      block('b4', 'South-facing rooms are the opposite problem. They are flooded with direct light for much of the day — glorious in winter, overwhelming in summer. Here we specify materials that reflect without glare: matte plaster, honed stone, washed linen. We think carefully about window treatments that diffuse rather than block.'),
      heading('h2', 'Designing the Evening'),
      block('b5', 'Natural light is only half the conversation. The other half is what happens after dark — and this is where most residential interiors fail. A single overhead light source, however beautiful the fitting, flattens a room. It removes shadow, and shadow is what gives a space depth and warmth.'),
      block('b6', 'In every project we design, we specify a minimum of three layers of artificial light: ambient light that sets the overall level, task light for reading, cooking, and working, and accent light that picks out objects, textures, and architectural details. The result is a room that can be composed like a painting — differently for every occasion, every mood, every hour of the evening.'),
      block('b7', 'Good lighting design costs relatively little compared to the overall budget of a project. The difference it makes to how a space feels is disproportionate. It is, we believe, the most underestimated decision in interior design.'),
    ],
  })
  console.log('✅ Post 4: Light Is a Material')

  // ── Post 5 ─────────────────────────────────────────────────────────────────
  await client.create({
    _type: 'post',
    title: 'The Case for Slow Design',
    slug: { _type: 'slug', current: 'the-case-for-slow-design' },
    coverImage: img5,
    excerpt: 'In an industry increasingly driven by speed and trends, we believe the best interiors are the ones that take their time.',
    publishedAt: '2024-07-22T09:00:00Z',
    body: [
      block('b1', 'We once turned down a project because the client needed it completed in six weeks. The space was beautiful — a shophouse in the conservation area, generous ceiling heights, original timber floors. We would have loved to work on it. But six weeks is not enough time to design anything worth living in.'),
      block('b2', 'This is not a capacity issue. We turned it down on principle. Because we believe, fundamentally, that the pace at which a space is designed determines the quality of the thinking that goes into it. Rush the thinking, and you rush the result. You end up with an interior that looks finished but does not feel resolved.'),
      heading('h1', 'What Slowness Actually Means'),
      block('b3', 'Slow design is not about being inefficient. Our process is rigorous and well-organised. What it is about is giving ideas time to develop, be questioned, and be improved before they are committed to.'),
      block('b4', 'In practice, this means presenting a concept direction and then sitting with it for a week before presenting it to the client. It means ordering material samples and living with them in the space — watching how they behave in morning light and evening light — before specifying them. It means visiting a joinery workshop three times during production rather than once, because the third visit always reveals something the first two did not.'),
      heading('h2', 'Against Trends'),
      block('b5', 'Slow design is also, necessarily, an argument against trends. Trends move fast by definition. They are visible on social media today, in showrooms tomorrow, and in homes the following month. By the time a trend reaches completion in a built interior, it is already beginning to recede.'),
      block('b6', 'We do not design for trends. We design for people — for the specific textures of their lives, their histories, their aesthetics. A home designed this way does not look dated in five years because it was never trying to look current. It looks like itself. It looks like the people who live in it.'),
      block('b7', 'The homes we are most proud of are the ones where clients tell us, years later, that the space still feels right. That they still discover things in it. That it has aged with them rather than against them. That kind of design cannot be rushed.'),
    ],
  })
  console.log('✅ Post 5: The Case for Slow Design')

  console.log('\n🎉 All 5 journal posts seeded successfully!\n')
}

seed().catch((err) => {
  console.error('❌ Seed failed:', err.message)
  process.exit(1)
})
