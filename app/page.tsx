import Navbar from '@/components/Navbar'
import HeroVideo from '@/components/HeroVideo'
import ProjectGrid from '@/components/ProjectGrid'
import Footer from '@/components/Footer'
import AnimatedSection from '@/components/AnimatedSection'
import Link from 'next/link'
import { getFeaturedProjects, getTestimonials } from '@/lib/queries'

export default async function HomePage() {
  const [projects, testimonials] = await Promise.all([
    getFeaturedProjects(6),
    getTestimonials(),
  ])

  return (
    <>
      <Navbar />
      <HeroVideo />

      {/* Editorial Quote */}
      <AnimatedSection className="py-28 px-6 text-center">
        <p className="font-display text-3xl md:text-5xl text-charcoal leading-tight max-w-4xl mx-auto italic font-light">
          "We design spaces that become the backdrop of your most meaningful moments."
        </p>
      </AnimatedSection>

      {/* Featured Projects */}
      <section className="px-6 md:px-12 pb-32">
        <AnimatedSection className="flex items-end justify-between mb-16">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-warm-stone mb-3">Selected Work</p>
            <h2 className="font-display text-5xl md:text-7xl font-light">Projects</h2>
          </div>
          <Link
            href="/portfolio"
            className="hidden md:flex items-center gap-3 text-xs uppercase tracking-widest text-mid-gray hover:text-charcoal transition-colors"
          >
            View All <span>→</span>
          </Link>
        </AnimatedSection>
        <ProjectGrid projects={projects} />
        <div className="mt-12 flex md:hidden">
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
                  <p className="text-xs uppercase tracking-widest text-mid-gray">— {t.name}{t.location ? `, ${t.location}` : ''}</p>
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>
      )}

      {/* CTA */}
      <AnimatedSection className="py-32 px-6 text-center bg-cream">
        <p className="text-xs uppercase tracking-[0.25em] text-warm-stone mb-6">Begin Your Journey</p>
        <h2 className="font-display text-5xl md:text-7xl font-light mb-12">
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
