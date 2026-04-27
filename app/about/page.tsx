import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import AnimatedSection from '@/components/AnimatedSection'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'About',
  description: 'Our philosophy, story, and services.',
}

export default function AboutPage() {
  return (
    <>
      <Navbar />

      {/* Header */}
      <section className="pt-40 pb-24 px-6 md:px-12">
        <AnimatedSection>
          <p className="text-xs uppercase tracking-[0.25em] text-warm-stone mb-6">Our Studio</p>
          <h1 className="font-display text-6xl md:text-9xl font-light leading-[0.9]">About</h1>
        </AnimatedSection>
      </section>

      {/* Full-width image placeholder */}
      <div className="h-[60vh] bg-cream" />

      {/* Philosophy */}
      <AnimatedSection className="py-32 px-6 md:px-12">
        <div className="max-w-5xl">
          <p className="text-xs uppercase tracking-[0.25em] text-warm-stone mb-8">Philosophy</p>
          <h2 className="font-display text-3xl md:text-5xl font-light leading-tight mb-10">
            We believe that great design is felt<br />before it is seen.
          </h2>
          <div className="grid md:grid-cols-2 gap-12 max-w-4xl">
            <p className="text-mid-gray leading-relaxed">
              Our process is one of discovery. Before pen meets paper, we spend time understanding not just the space — but the life that will unfold within it. Architecture speaks in volumes and materials. We listen closely.
            </p>
            <p className="text-mid-gray leading-relaxed">
              Every decision is intentional. Every material selected for how it ages, how it feels underhand, how it shapes the quality of light at dusk. This is the standard we hold ourselves to.
            </p>
          </div>
        </div>
      </AnimatedSection>

      {/* Services */}
      <AnimatedSection className="py-24 px-6 md:px-12 bg-cream">
        <div className="max-w-5xl mx-auto">
          <p className="text-xs uppercase tracking-[0.25em] text-warm-stone mb-16">What We Offer</p>
          <div className="grid md:grid-cols-3 gap-12">
            {[
              {
                title: 'Residential Design',
                description: 'Homes crafted to your rhythm — from concept to the final brushstroke. We design for the life you actually live.',
              },
              {
                title: 'Commercial Spaces',
                description: 'Workplaces and retail environments that express your brand with integrity and draw people in.',
              },
              {
                title: 'Hospitality',
                description: 'Hotels, restaurants, and lounges designed to create atmosphere, memory, and return visits.',
              },
            ].map((service) => (
              <div key={service.title}>
                <div className="w-10 h-px bg-gold mb-8" />
                <h3 className="font-display text-2xl font-light mb-4">{service.title}</h3>
                <p className="text-sm text-mid-gray leading-relaxed">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* Process */}
      <AnimatedSection className="py-32 px-6 md:px-12">
        <div className="max-w-5xl mx-auto">
          <p className="text-xs uppercase tracking-[0.25em] text-warm-stone mb-16">How We Work</p>
          <div className="space-y-16">
            {[
              { step: '01', title: 'Discovery', description: 'We begin with an in-depth consultation — understanding your lifestyle, aesthetic sensibility, and vision.' },
              { step: '02', title: 'Concept', description: 'Mood boards, spatial sketches, and material palettes brought together into a cohesive design direction.' },
              { step: '03', title: 'Design Development', description: 'Detailed drawings, 3D visualisations, and full material specifications.' },
              { step: '04', title: 'Realisation', description: 'We manage the entire construction process, ensuring every detail is executed to standard.' },
            ].map((phase) => (
              <div key={phase.step} className="grid md:grid-cols-4 gap-8 border-t border-border pt-8">
                <p className="font-display text-5xl font-light text-border">{phase.step}</p>
                <h3 className="font-display text-2xl font-light">{phase.title}</h3>
                <p className="text-sm text-mid-gray leading-relaxed md:col-span-2">{phase.description}</p>
              </div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* CTA */}
      <AnimatedSection className="py-24 px-6 md:px-12 bg-charcoal text-off-white">
        <div className="max-w-xl">
          <h2 className="font-display text-4xl md:text-6xl font-light mb-8">Ready to begin?</h2>
          <Link
            href="/contact"
            className="inline-flex items-center gap-4 text-xs uppercase tracking-widest text-gold border-b border-gold pb-1 hover:opacity-60 transition-opacity"
          >
            Book a Consultation <span>→</span>
          </Link>
        </div>
      </AnimatedSection>

      <Footer />
    </>
  )
}
