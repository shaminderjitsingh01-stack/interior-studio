import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-charcoal text-off-white py-20 px-6 md:px-12">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
        {/* Brand */}
        <div>
          <p className="font-display text-2xl tracking-[0.2em] mb-5">ZELF COLLECTIVE</p>
          <p className="text-mid-gray text-sm leading-relaxed max-w-xs">
            Crafting bespoke interiors that elevate the way you live, work, and feel.
          </p>
        </div>

        {/* Navigation */}
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-gold mb-6">Navigate</p>
          <nav className="flex flex-col gap-3">
            {[
              { href: '/portfolio', label: 'Portfolio' },
              { href: '/about', label: 'About' },
              { href: '/journal', label: 'Journal' },
              { href: '/contact', label: 'Contact' },
            ].map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-sm text-mid-gray hover:text-off-white transition-colors duration-300"
              >
                {l.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Contact */}
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-gold mb-6">Get In Touch</p>
          <div className="space-y-2 text-sm text-mid-gray">
            <p>hello@yourstudio.com</p>
            <p>+65 9000 0000</p>
            <p className="mt-5">Singapore</p>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <p className="text-xs text-mid-gray">
          © {new Date().getFullYear()} Zelf Collective. All rights reserved.
        </p>
        <p className="text-xs text-mid-gray">Crafted with intention.</p>
      </div>
    </footer>
  )
}
