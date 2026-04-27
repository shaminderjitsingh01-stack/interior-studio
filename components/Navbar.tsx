'use client'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'

const links = [
  { href: '/portfolio', label: 'Portfolio' },
  { href: '/about', label: 'About' },
  { href: '/journal', label: 'Journal' },
  { href: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()

  const isHome = pathname === '/'

  // Transparent only on home page before scrolling
  const isTransparent = isHome && !scrolled && !menuOpen

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
        isTransparent
          ? 'bg-transparent'
          : 'bg-off-white/95 backdrop-blur-sm border-b border-border'
      }`}
    >
      <div className="flex items-center justify-between px-6 md:px-12 h-20">
        <Link
          href="/"
          className={`font-display text-xl tracking-[0.2em] transition-colors duration-700 ${
            isTransparent ? 'text-off-white' : 'text-charcoal'
          }`}
        >
          ZELF COLLECTIVE
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-10">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`text-xs uppercase tracking-[0.2em] transition-colors duration-700 hover:opacity-50 ${
                isTransparent ? 'text-off-white' : 'text-charcoal'
              }`}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden flex flex-col justify-center gap-[5px] w-6 h-6"
          aria-label="Toggle menu"
        >
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className={`block w-6 h-px transition-all duration-300 ${
                isTransparent ? 'bg-off-white' : 'bg-charcoal'
              } ${i === 0 && menuOpen ? 'rotate-45 translate-y-[6px]' : ''}
                ${i === 1 && menuOpen ? 'opacity-0' : ''}
                ${i === 2 && menuOpen ? '-rotate-45 -translate-y-[6px]' : ''}`}
            />
          ))}
        </button>
      </div>

      {/* Mobile drawer */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-500 ${
          menuOpen ? 'max-h-80' : 'max-h-0'
        }`}
      >
        <nav className="flex flex-col gap-6 px-6 pb-10 pt-2 bg-off-white/95">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setMenuOpen(false)}
              className="font-display text-3xl font-light text-charcoal"
            >
              {l.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  )
}
