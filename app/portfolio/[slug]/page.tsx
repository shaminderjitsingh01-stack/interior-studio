import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { PortableText } from '@portabletext/react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import AnimatedSection from '@/components/AnimatedSection'
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
    description: project.excerpt ?? project.title,
    openGraph: {
      images: project.coverImage
        ? [urlFor(project.coverImage).width(1200).height(630).url()]
        : [],
    },
  }
}

const ptComponents = {
  block: {
    normal: ({ children }: any) => (
      <p className="text-mid-gray leading-relaxed mb-6 font-light">{children}</p>
    ),
    h3: ({ children }: any) => (
      <h3 className="font-display text-2xl font-light text-charcoal mb-4 mt-8">{children}</h3>
    ),
  },
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
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-charcoal/20 to-charcoal/30" />

        {/* Title anchored bottom-left */}
        <div className="absolute bottom-12 left-6 md:left-12 right-6 md:right-12">
          <AnimatedSection>
            <div className="flex flex-wrap items-end justify-between gap-6">
              <div>
                {project.tags?.length > 0 && (
                  <p className="text-gold text-xs uppercase tracking-[0.3em] mb-4">
                    {project.tags[0]}
                  </p>
                )}
                <h1 className="font-display text-5xl md:text-7xl lg:text-9xl text-off-white font-light leading-[0.9]">
                  {project.title}
                </h1>
              </div>
              <div className="flex gap-8 md:gap-12 pb-2">
                {project.location && (
                  <div>
                    <p className="text-off-white/50 text-[10px] uppercase tracking-widest mb-1">Location</p>
                    <p className="text-off-white text-sm font-light">{project.location}</p>
                  </div>
                )}
                {project.year && (
                  <div>
                    <p className="text-off-white/50 text-[10px] uppercase tracking-widest mb-1">Year</p>
                    <p className="text-off-white text-sm font-light">{project.year}</p>
                  </div>
                )}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Excerpt / intro */}
      {project.excerpt && (
        <AnimatedSection className="py-20 px-6 md:px-12 border-b border-border">
          <p className="font-display text-2xl md:text-4xl font-light italic text-charcoal max-w-3xl leading-tight">
            {project.excerpt}
          </p>
        </AnimatedSection>
      )}

      {/* Sections — the editorial narrative */}
      {project.sections?.length > 0 && (
        <div>
          {project.sections.map((section: any, i: number) => {
            const hasImage = !!section.image
            const layout = section.layout ?? 'image-right'

            if (!hasImage || layout === 'text-only') {
              return (
                <AnimatedSection
                  key={i}
                  className="py-20 px-6 md:px-12 max-w-3xl"
                  delay={0.1}
                >
                  {section.heading && (
                    <p className="text-xs uppercase tracking-[0.25em] text-gold mb-6">
                      {section.heading}
                    </p>
                  )}
                  {section.body && (
                    <div className="font-display text-lg">
                      <PortableText value={section.body} components={ptComponents} />
                    </div>
                  )}
                </AnimatedSection>
              )
            }

            if (layout === 'image-full') {
              return (
                <div key={i}>
                  <AnimatedSection className="relative aspect-[16/9] bg-cream overflow-hidden">
                    <Image
                      src={urlFor(section.image).width(1600).url()}
                      alt={section.image?.caption ?? section.heading ?? ''}
                      fill
                      className="object-cover"
                      sizes="100vw"
                    />
                  </AnimatedSection>
                  {(section.heading || section.body || section.image?.caption) && (
                    <AnimatedSection className="py-12 px-6 md:px-12 max-w-2xl" delay={0.1}>
                      {section.heading && (
                        <p className="text-xs uppercase tracking-[0.25em] text-gold mb-4">
                          {section.heading}
                        </p>
                      )}
                      {section.image?.caption && (
                        <p className="text-sm text-mid-gray italic mb-4">{section.image.caption}</p>
                      )}
                      {section.body && (
                        <div className="font-display text-lg">
                          <PortableText value={section.body} components={ptComponents} />
                        </div>
                      )}
                    </AnimatedSection>
                  )}
                </div>
              )
            }

            // image-left or image-right — 50/50 split
            const imageFirst = layout === 'image-left'
            return (
              <AnimatedSection
                key={i}
                className={`grid md:grid-cols-2 min-h-[60vh] ${i % 2 === 0 ? 'bg-off-white' : 'bg-cream'}`}
                delay={0.05}
              >
                {/* Image */}
                <div className={`relative min-h-[40vh] md:min-h-full ${imageFirst ? 'md:order-first' : 'md:order-last'}`}>
                  <Image
                    src={urlFor(section.image).width(900).url()}
                    alt={section.image?.caption ?? section.heading ?? ''}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>

                {/* Text */}
                <div className={`flex flex-col justify-center px-8 md:px-16 py-16 ${imageFirst ? 'md:order-last' : 'md:order-first'}`}>
                  {section.heading && (
                    <p className="text-xs uppercase tracking-[0.25em] text-gold mb-6">
                      {section.heading}
                    </p>
                  )}
                  {section.body && (
                    <div className="font-display text-lg">
                      <PortableText value={section.body} components={ptComponents} />
                    </div>
                  )}
                  {section.image?.caption && (
                    <p className="text-xs text-mid-gray uppercase tracking-widest mt-6">
                      {section.image.caption}
                    </p>
                  )}
                </div>
              </AnimatedSection>
            )
          })}
        </div>
      )}

      {/* Client quote */}
      {project.clientQuote?.quote && (
        <AnimatedSection className="py-28 px-6 md:px-12 bg-charcoal">
          <div className="max-w-3xl mx-auto text-center">
            <p className="font-display text-2xl md:text-4xl text-off-white font-light italic leading-relaxed mb-8">
              "{project.clientQuote.quote}"
            </p>
            {project.clientQuote.name && (
              <p className="text-xs uppercase tracking-widest text-gold">
                — {project.clientQuote.name}
              </p>
            )}
          </div>
        </AnimatedSection>
      )}

      {/* Final gallery */}
      {project.gallery?.length > 0 && (
        <section className="px-6 md:px-12 py-20">
          <AnimatedSection>
            <p className="text-xs uppercase tracking-[0.25em] text-warm-stone mb-12">Gallery</p>
          </AnimatedSection>
          <div className="columns-1 md:columns-2 gap-4 space-y-4">
            {project.gallery.map((img: any, i: number) => (
              <AnimatedSection key={img._key ?? i} delay={i * 0.05} className="break-inside-avoid">
                <div className="relative overflow-hidden bg-cream">
                  <Image
                    src={urlFor(img).width(900).url()}
                    alt={img.alt ?? project.title}
                    width={900}
                    height={600}
                    className="w-full h-auto object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
              </AnimatedSection>
            ))}
          </div>
        </section>
      )}

      {/* Back to portfolio */}
      <AnimatedSection className="px-6 md:px-12 pb-24 pt-8 border-t border-border">
        <Link
          href="/portfolio"
          className="inline-flex items-center gap-3 text-xs uppercase tracking-widest text-mid-gray hover:text-charcoal transition-colors"
        >
          ← All Projects
        </Link>
      </AnimatedSection>

      <Footer />
    </>
  )
}
