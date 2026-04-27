import Navbar from '@/components/Navbar'
import HeroVideo from '@/components/HeroVideo'
import ProjectList from '@/components/ProjectList'
import Footer from '@/components/Footer'
import AnimatedSection from '@/components/AnimatedSection'
import Link from 'next/link'
import { getFeaturedProjects, getTestimonials } from '@/lib/queries'
import { urlFor } from '@/lib/sanity'

export default async function HomePage() {
  const [rawProjects, testimonials] = await Promise.all([
    getFeaturedProjects(6),
    getTestimonials(),
  ])

  // Transform server-side so no Sanity client ends up in the browser bundle
  const projects = rawProjects.map((p: any) => ({
    _id: p._id,
    title: p.title,
    slug: p.slug,
    imageUrl: p.coverImage ? urlFor(p.coverImage).width(760).height(520).url() : undefined,
    location: p.location,
    year: p.year,
    tags: p.tags,
  }))

  return (
    <>
      <Navbar />
      <HeroVideo />

      {/* Editorial quote */}
      <AnimatedSection className="py-32 px-6 text-center">
        <p className="font-display text-3xl md:text-5xl text-charcoal leading-tight max-w-4xl mx-auto italic font-light">
          "We design spaces that become the backdrop of your most meaningful moments."
        </p>
      </AnimatedSection>

      {/* Featured projects — numbered editorial list */}
      <section className="px-6 md:px-12 pb-32">
        <AnimatedSection className="flex items-end justify-between mb-16">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-warm-stone mb-3">Selected Work</p>
            <h2 className="font-display font-light" style={{ fontSize: 'clamp(3rem, 7vw, 7rem)' }}>
              Projects
            </h2>
          </div>
          <Link
            href="/portfolio"
            className="hidden md:flex items-center gap-3 text-xs uppercase tracking-widest text-mid-gray hover:text-charcoal transition-colors"
          >
            View All <span>→</span>
          </Link>
        </AnimatedSection>

        <ProjectList projects={projects} />

        <div className="mt-10 flex md:hidden">
          <Link href="/portfolio" className="text-xs uppercase tracking-widest border-b border-charcoal pb-1">
            View All Projects
          </Link>
        </div>
      </section>

      {/* Philosophy — dark band */}
      <AnimatedSection className="bg-charcoal text-off-white py-32 px-6 md:px-12">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-gold mb-6">Our Approach</p>
            <h2 className="font-display text-4xl md:text-6xl font-light leading-tight">
              Where craft meets intention
            </h2>
          </div>
          <div>
            <p className="text-mid-gray leading-relaxed mb-6">
              Every project begins with listening. We immerse ourselves in your world — your routines, aesthetics, aspirations — before a single line is drawn.
            </p>
            <p className="text-mid-gray leading-relaxed mb-10">
              The result is always singular: a space that is unmistakably yours.
            </p>
            <Link
              href="/about"
              className="inline-flex items-center gap-3 text-xs uppercase tracking-widest text-gold border-b border-gold pb-1 hover:opacity-60 transition-opacity"
            >
              Our Studio <span>→</span>
            </Link>
          </div>
        </div>
      </AnimatedSection>

      {/* Testimonials */}
      {testimonials.length > 0 && (
        <AnimatedSection className="py-32 px-6 md:px-12">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-xs uppercase tracking-[0.25em] text-warm-stone mb-20">Client Stories</p>
            <div className="space-y-20">
              {testimonials.slice(0, 2).map((t: any) => (
                <div key={t._id}>
                  <p className="font-display text-2xl md:text-4xl font-light italic leading-relaxed text-charcoal mb-8">
                    "{t.quote}"
                  </p>
                  <p className="text-xs uppercase tracking-widest text-mid-gray">
                    — {t.name}{t.location ? `, ${t.location}` : ''}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>
      )}

      {/* CTA */}
      <AnimatedSection className="py-20 md:py-32 px-6 text-center bg-cream">
        <p className="text-xs uppercase tracking-[0.25em] text-warm-stone mb-5 md:mb-6">Begin Your Journey</p>
        <h2
          className="font-display font-light mb-10 md:mb-12"
          style={{ fontSize: 'clamp(2rem, 8vw, 8rem)', lineHeight: 0.95 }}
        >
          Let's design something<br />
          <em>extraordinary</em>
        </h2>
        <Link
          href="/contact"
          className="inline-flex items-center gap-4 bg-charcoal text-off-white px-10 py-4 text-xs uppercase tracking-widest hover:bg-warm-stone transition-colors duration-500"
        >
          Book a Consultation
        </Link>
      </AnimatedSection>

      <Footer />
    </>
  )
}
