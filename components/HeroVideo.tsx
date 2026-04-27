'use client'
import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'

export default function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    videoRef.current?.play().catch(() => {})
    const t = setTimeout(() => setVisible(true), 400)
    return () => clearTimeout(t)
  }, [])

  const fadeStyle = (extraDelay = 0): React.CSSProperties => ({
    opacity: visible ? 1 : 0,
    transform: `translateY(${visible ? 0 : 32}px)`,
    transition: `opacity 1.2s cubic-bezier(0.22,1,0.36,1) ${0.4 + extraDelay}s, transform 1.2s cubic-bezier(0.22,1,0.36,1) ${0.4 + extraDelay}s`,
  })

  return (
    <section className="relative h-screen w-full overflow-hidden">
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        src="/videos/hero.mp4"
        autoPlay
        loop
        muted
        playsInline
        poster="/images/hero-poster.jpg"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-charcoal/40 via-charcoal/10 to-charcoal/65" />

      {/* Main content */}
      <div
        className="relative h-full flex flex-col justify-end px-6 md:px-12 pb-24 md:pb-32"
        style={fadeStyle(0)}
      >
        <p className="text-gold text-xs uppercase tracking-[0.3em] mb-6">Zelf Collective</p>
        <h1 className="font-display text-6xl md:text-8xl lg:text-[10rem] text-off-white font-light leading-[0.88] mb-12 max-w-4xl">
          Spaces That<br />
          <em>Speak</em>
        </h1>
        <Link
          href="/portfolio"
          className="inline-flex items-center gap-4 text-off-white text-xs uppercase tracking-[0.25em] border-b border-off-white/40 pb-1 hover:border-gold hover:text-gold transition-all duration-500 w-fit"
        >
          View Our Work <span>→</span>
        </Link>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-10 right-8 md:right-12 hidden md:flex flex-col items-center gap-3"
        style={fadeStyle(0.8)}
      >
        <span className="text-off-white/40 text-[10px] uppercase tracking-[0.25em]">Scroll</span>
        <div className="w-px h-14 bg-off-white/20 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-gold origin-top animate-scroll-bar" />
        </div>
      </div>
    </section>
  )
}
