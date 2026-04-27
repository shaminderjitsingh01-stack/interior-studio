'use client'
import Link from 'next/link'
import { useState, useEffect } from 'react'

const links = [
  { href: '/portfolio', label: 'Portfolio' },
  { href: '/about', label: 'About' },
  { href: '/journal', label: 'Journal' },
  { href: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
        scrolled || menuOpen
          ? 'bg-off-white/95 backdrop-blur-sm border-b border-border'
          : 'bg-transparent'
      }`}
    >
      <div className="flex items-center justify-between px-6 md:px-12 h-20">
        <Link
          href="/"
          className={`font-display text-xl tracking-[0.2em] transition-colors duration-700 ${
            scrolled || menuOpen ? 'text-charcoal' : 'text-off-white'
          }`}
        >
          STUDIO
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-10">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`text-xs uppercase tracking-[0.2em] transition-colors duration-700 hover:opacity-50 ${
                scrolled ? 'text-charcoal' : 'text-off-white'
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
          <span
            className={`block w-6 h-px bg-current transition-all duration-300 origin-center ${
              menuOpen ? 'rotate-45 translate-y-[6px]' : ''
            } ${scrolled || menuOpen ? 'bg-charcoal' : 'bg-off-white'}`}
          />
          <span
            className={`block w-6 h-px transition-all duration-300 ${
              menuOpen ? 'opacity-0' : ''
            } ${scrolled || menuOpen ? 'bg-charcoal' : 'bg-off-white'}`}
          />
          <span
            className={`block w-6 h-px bg-current transition-all duration-300 origin-center ${
              menuOpen ? '-rotate-45 -translate-y-[6px]' : ''
            } ${scrolled || menuOpen ? 'bg-charcoal' : 'bg-off-white'}`}
          />
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
