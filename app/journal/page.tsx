import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import AnimatedSection from '@/components/AnimatedSection'
import Link from 'next/link'
import Image from 'next/image'
import { getAllPosts } from '@/lib/queries'
import { urlFor } from '@/lib/sanity'

export const metadata: Metadata = {
  title: 'Journal',
  description: 'Thoughts on design, materials, and the art of living well.',
}

export default async function JournalPage() {
  const posts = await getAllPosts()

  return (
    <>
      <Navbar />

      <section className="pt-40 pb-24 px-6 md:px-12">
        <AnimatedSection>
          <p className="text-xs uppercase tracking-[0.25em] text-warm-stone mb-6">Thoughts & Perspectives</p>
          <h1 className="font-display text-6xl md:text-9xl font-light leading-[0.9]">Journal</h1>
        </AnimatedSection>
      </section>

      <section className="px-6 md:px-12 pb-32">
        {posts.length === 0 ? (
          <p className="font-display text-3xl italic text-mid-gray font-light">Essays coming soon.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
            {posts.map((post: any, i: number) => (
              <AnimatedSection key={post._id} delay={i * 0.1}>
                <Link href={`/journal/${post.slug.current}`} className="group block">
                  {post.coverImage && (
                    <div className="relative aspect-[16/9] overflow-hidden bg-cream mb-6">
                      <Image
                        src={urlFor(post.coverImage).width(800).url()}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    </div>
                  )}
                  <p className="text-xs uppercase tracking-widest text-warm-stone mb-3">
                    {post.publishedAt
                      ? new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
                      : ''}
                  </p>
                  <h2 className="font-display text-3xl font-light mb-3 group-hover:text-warm-stone transition-colors duration-300">
                    {post.title}
                  </h2>
                  {post.excerpt && (
                    <p className="text-sm text-mid-gray leading-relaxed">{post.excerpt}</p>
                  )}
                </Link>
              </AnimatedSection>
            ))}
          </div>
        )}
      </section>

      <Footer />
    </>
  )
}
