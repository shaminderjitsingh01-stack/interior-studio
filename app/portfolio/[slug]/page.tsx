import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import AnimatedSection from '@/components/AnimatedSection'
import Image from 'next/image'
import Link from 'next/link'
import { PortableText } from '@portabletext/react'
import { getProjectBySlug, getAllProjectSlugs } from '@/lib/queries'
import { urlFor } from '@/lib/sanity'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const slugs = await getAllProjectSlugs()
  return slugs.map((s: any) => ({ slug: s.slug.current }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const project = await getProjectBySlug(slug)
  if (!project) return {}
  return {
    title: project.title,
    description: project.location ? `${project.title} — ${project.location}` : project.title,
    openGraph: {
      images: project.coverImage
        ? [urlFor(project.coverImage).width(1200).height(630).url()]
        : [],
    },
  }
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params
  const project = await getProjectBySlug(slug)
  if (!project) notFound()

  return (
    <>
      <Navbar />

      {/* Cinematic hero */}
      <section className="relative h-screen bg-cream overflow-hidden">
        {project.coverImage && (
          <Image
            src={urlFor(project.coverImage).width(1920).height(1080).url()}
            alt={project.title}
            fill
            className="object-cover"
            priority
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 via-transparent to-transparent" />
        <div className="absolute bottom-12 left-6 md:left-12 right-6 md:right-12">
          <h1 className="font-display text-5xl md:text-8xl text-off-white font-light leading-[0.95]">
            {project.title}
          </h1>
        </div>
      </section>

      {/* Meta strip */}
      <AnimatedSection className="py-12 px-6 md:px-12 border-b border-border">
        <div className="flex flex-wrap gap-12 md:gap-24">
          {project.location && (
            <div>
              <p className="text-xs uppercase tracking-widest text-warm-stone mb-2">Location</p>
              <p className="font-display text-lg">{project.location}</p>
            </div>
          )}
          {project.year && (
            <div>
              <p className="text-xs uppercase tracking-widest text-warm-stone mb-2">Year</p>
              <p className="font-display text-lg">{project.year}</p>
            </div>
          )}
          {project.tags?.length > 0 && (
            <div>
              <p className="text-xs uppercase tracking-widest text-warm-stone mb-2">Category</p>
              <div className="flex gap-3 flex-wrap">
                {project.tags.map((tag: string) => (
                  <span key={tag} className="font-display text-lg">{tag}</span>
                ))}
              </div>
            </div>
          )}
        </div>
      </AnimatedSection>

      {/* Description */}
      {project.description && (
        <AnimatedSection className="py-24 px-6 md:px-12">
          <div className="max-w-2xl font-display text-xl font-light leading-relaxed text-mid-gray prose prose-lg">
            <PortableText value={project.description} />
          </div>
        </AnimatedSection>
      )}

      {/* Gallery — alternating layout */}
      {project.gallery?.length > 0 && (
        <section className="px-6 md:px-12 pb-32 space-y-4 md:space-y-6">
          {project.gallery.map((img: any, i: number) => {
            const isWide = i % 3 === 0
            return (
              <AnimatedSection key={img._key || i} delay={Math.min(i * 0.05, 0.3)}>
                <div
                  className={`relative overflow-hidden bg-cream ${
                    isWide ? 'aspect-[16/9]' : i % 3 === 1 ? 'aspect-[4/3]' : 'aspect-[3/4] md:w-2/3'
                  }`}
                >
                  <Image
                    src={urlFor(img).width(1600).url()}
                    alt={img.alt || project.title}
                    fill
                    className="object-cover"
                    sizes="100vw"
                  />
                </div>
              </AnimatedSection>
            )
          })}
        </section>
      )}

      {/* Back to portfolio */}
      <div className="px-6 md:px-12 pb-24">
        <Link
          href="/portfolio"
          className="inline-flex items-center gap-3 text-xs uppercase tracking-widest text-mid-gray hover:text-charcoal transition-colors"
        >
          ← All Projects
        </Link>
      </div>

      <Footer />
    </>
  )
}
