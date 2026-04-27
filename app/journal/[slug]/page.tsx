import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import AnimatedSection from '@/components/AnimatedSection'
import Image from 'next/image'
import Link from 'next/link'
import { PortableText } from '@portabletext/react'
import { getPostBySlug, getAllPostSlugs } from '@/lib/queries'
import { urlFor } from '@/lib/sanity'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const slugs = await getAllPostSlugs()
  return slugs.map((s: any) => ({ slug: s.slug.current }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  if (!post) return {}
  return {
    title: post.title,
    description: post.excerpt ?? post.title,
  }
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  if (!post) notFound()

  return (
    <>
      <Navbar />

      <article>
        {/* Hero */}
        {post.coverImage && (
          <div className="relative h-[60vh] bg-cream">
            <Image
              src={urlFor(post.coverImage).width(1600).url()}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-charcoal/20" />
          </div>
        )}

        {/* Header */}
        <AnimatedSection className="pt-20 pb-12 px-6 md:px-12 max-w-3xl">
          <p className="text-xs uppercase tracking-widest text-warm-stone mb-6">
            {post.publishedAt
              ? new Date(post.publishedAt).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })
              : 'Journal'}
          </p>
          <h1 className="font-display text-5xl md:text-7xl font-light leading-tight">{post.title}</h1>
        </AnimatedSection>

        {/* Body */}
        {post.body && (
          <AnimatedSection className="px-6 md:px-12 pb-32 max-w-2xl prose prose-lg font-light leading-relaxed text-mid-gray font-display">
            <PortableText value={post.body} />
          </AnimatedSection>
        )}
      </article>

      <div className="px-6 md:px-12 pb-24 border-t border-border pt-12">
        <Link
          href="/journal"
          className="inline-flex items-center gap-3 text-xs uppercase tracking-widest text-mid-gray hover:text-charcoal transition-colors"
        >
          ← All Journal Posts
        </Link>
      </div>

      <Footer />
    </>
  )
}
