import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import ProjectGrid from '@/components/ProjectGrid'
import AnimatedSection from '@/components/AnimatedSection'
import { getAllProjects } from '@/lib/queries'

export const metadata: Metadata = {
  title: 'Portfolio',
  description: 'A curated selection of our interior design work.',
}

export default async function PortfolioPage() {
  const projects = await getAllProjects()

  return (
    <>
      <Navbar />

      <section className="pt-40 pb-24 px-6 md:px-12">
        <AnimatedSection>
          <p className="text-xs uppercase tracking-[0.25em] text-warm-stone mb-6">Selected Work</p>
          <h1 className="font-display text-6xl md:text-9xl font-light leading-[0.9]">Portfolio</h1>
        </AnimatedSection>
      </section>

      <section className="px-6 md:px-12 pb-32">
        <ProjectGrid projects={projects} />
      </section>

      <Footer />
    </>
  )
}
