import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-charcoal text-off-white overflow-hidden">

      <div className="px-6 md:px-10 pt-16 md:pt-20 pb-6">
        <p className="text-xs uppercase tracking-[0.3em] text-gold mb-6 md:mb-8">
          Luxury Interior Design · Singapore
        </p>
        <h2
          className="font-display font-light text-off-white leading-[0.88] italic"
          style={{ fontSize: 'clamp(2rem, 10.5vw, 13rem)' }}
        >
          Zelf Collective
        </h2>
      </div>

      <div className="mx-6 md:mx-10 border-t border-white/10 mt-6 md:mt-8" />

      <div className="px-6 md:px-10 py-8 md:py-10 flex flex-col gap-8 md:flex-row md:justify-between md:items-center md:gap-6">

        {/* Nav */}
        <nav className="flex flex-wrap gap-6 md:gap-10">
          {[
            { href: '/portfolio', label: 'Portfolio' },
            { href: '/about', label: 'About' },
            { href: '/journal', label: 'Journal' },
            { href: '/contact', label: 'Contact' },
          ].map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-xs uppercase tracking-[0.2em] text-mid-gray hover:text-off-white transition-colors duration-300"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        {/* Contact */}
        <div className="flex flex-col gap-2 md:flex-row md:gap-10 md:items-center">
          <a
            href="mailto:hello@zelfcollective.com"
            className="text-xs text-mid-gray hover:text-off-white transition-colors duration-300 tracking-wide"
          >
            hello@zelfcollective.com
          </a>
          <a
            href="tel:+6590000000"
            className="text-xs text-mid-gray hover:text-off-white transition-colors duration-300 tracking-wide"
          >
            +65 9000 0000
          </a>
        </div>

        {/* Copyright */}
        <p className="text-xs text-mid-gray/50">
          © {new Date().getFullYear()} Zelf Collective
        </p>

      </div>
    </footer>
  )
}
