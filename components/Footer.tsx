import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-charcoal text-off-white overflow-hidden">

      {/* Large typographic brand statement */}
      <div className="px-6 md:px-10 pt-20 pb-6">
        <p className="text-xs uppercase tracking-[0.3em] text-gold mb-8">
          Luxury Interior Design · Singapore
        </p>
        <h2
          className="font-display font-light text-off-white leading-[0.88] italic"
          style={{ fontSize: 'clamp(3.2rem, 10.5vw, 13rem)' }}
        >
          Zelf Collective
        </h2>
      </div>

      {/* Divider */}
      <div className="mx-6 md:mx-10 border-t border-white/10 mt-8" />

      {/* Bottom row */}
      <div className="px-6 md:px-10 py-10 flex flex-col md:flex-row justify-between gap-10 md:gap-6">

        {/* Nav */}
        <nav className="flex gap-8 md:gap-10">
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
        <div className="flex gap-8 md:gap-10 items-center">
          <a
            href="mailto:hello@zelfcollective.com"
            className="text-xs text-mid-gray hover:text-off-white transition-colors duration-300 tracking-wide"
          >
            hello@zelfcollective.com
          </a>
          <span className="text-mid-gray/30 hidden md:block">·</span>
          <a
            href="tel:+6590000000"
            className="text-xs text-mid-gray hover:text-off-white transition-colors duration-300 tracking-wide"
          >
            +65 9000 0000
          </a>
        </div>

        {/* Copyright */}
        <p className="text-xs text-mid-gray/50 md:text-right">
          © {new Date().getFullYear()} Zelf Collective
        </p>

      </div>
    </footer>
  )
}
