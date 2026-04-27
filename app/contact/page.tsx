import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import AnimatedSection from '@/components/AnimatedSection'
import ContactForm from '@/components/ContactForm'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Book a consultation with Zelf Collective.',
}

export default function ContactPage() {
  return (
    <>
      <Navbar />

      <section className="pt-32 md:pt-40 pb-12 md:pb-16 px-6 md:px-12">
        <AnimatedSection>
          <p className="text-xs uppercase tracking-[0.25em] text-warm-stone mb-4 md:mb-6">Begin the Conversation</p>
          <h1 className="font-display text-6xl md:text-9xl font-light leading-[0.9]">Contact</h1>
        </AnimatedSection>
      </section>

      <section className="px-6 md:px-12 pb-20 md:pb-32">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-12 md:gap-24">

          <AnimatedSection className="md:col-span-2">
            <div className="space-y-10 md:space-y-12">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-gold mb-3 md:mb-4">Studio</p>
                <p className="text-sm text-mid-gray leading-relaxed max-w-xs">
                  We take on a limited number of projects each year to ensure every client receives our full attention and care.
                </p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-gold mb-3 md:mb-4">Contact</p>
                <p className="text-sm text-mid-gray">hello@zelfcollective.com</p>
                <p className="text-sm text-mid-gray mt-1">+65 9000 0000</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-gold mb-3 md:mb-4">Location</p>
                <p className="text-sm text-mid-gray">Singapore</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-gold mb-3 md:mb-4">Response Time</p>
                <p className="text-sm text-mid-gray">Within 48 hours</p>
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection className="md:col-span-3" delay={0.15}>
            <ContactForm />
          </AnimatedSection>

        </div>
      </section>

      <Footer />
    </>
  )
}
