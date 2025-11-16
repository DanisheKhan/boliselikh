import { FOOTER_LINKS, SOCIAL_LINKS, FOOTER_BOTTOM_LINKS, FOOTER_BRAND } from '../constants/footerConfig'

// Social Icon Component
const SocialIcon = ({ type }) => {
  const iconMap = {
    twitter: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2s9 5 20 5a9.5 9.5 0 00-9-5.5c4.75-2.35 7-5 7-5s-1.54.03-2.75.03C19 11 21 8 21 8s.75 2 2 3v-1a4.5 4.5 0 00-.5-3z" />
      </svg>
    ),
    github: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
      </svg>
    ),
    linkedin: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
      </svg>
    ),
    discord: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.317 4.361a19.8 19.8 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.211.375-.445.865-.607 1.252a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.252.077.077 0 0 0-.079-.037A19.773 19.773 0 0 0 3.677 4.36a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.056 19.9 19.9 0 0 0 5.993 3.03.08.08 0 0 0 .087-.027c.461-.63.873-1.295 1.226-1.994a.076.076 0 0 0-.042-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.294.075.075 0 0 1 .078-.01c3.928 1.793 8.18 1.793 12.062 0a.075.075 0 0 1 .079.009c.12.098.246.198.373.294a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.076.076 0 0 0-.041.107c.36.699.769 1.364 1.226 1.994a.076.076 0 0 0 .084.028 19.86 19.86 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-4.718-.838-8.813-3.549-12.676a.06.06 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-.965-2.157-2.156 0-1.193.960-2.157 2.157-2.157 1.199 0 2.167.964 2.157 2.157 0 1.191-.958 2.156-2.157 2.156zm7.975 0c-1.183 0-2.157-.965-2.157-2.156 0-1.193.960-2.157 2.157-2.157 1.198 0 2.167.964 2.157 2.157 0 1.191-.959 2.156-2.157 2.156z" />
      </svg>
    )
  }
  return iconMap[type] || null
}

// Footer Column Component
const FooterColumn = ({ title, links }) => (
  <div>
    <h3 className="text-white font-semibold mb-4">{title}</h3>
    <ul className="space-y-2">
      {links.map((link, index) => (
        <li key={index}>
          <a
            href={link.href}
            className="text-white/70 hover:text-white/90 text-sm transition-colors duration-200"
          >
            {link.label}
          </a>
        </li>
      ))}
    </ul>
  </div>
)

function Footer({ hideOnMobile = false }) {
  const currentYear = new Date().getFullYear()

  return (
    <footer className={`relative z-20 bg-white/10 backdrop-blur-2xl border-t border-white/20 py-12 px-4 mt-8 w-full ${hideOnMobile ? 'hidden md:block' : ''}`}>
      <div className="max-w-6xl mx-auto">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-8">
          {/* Brand Section */}
          <div className="md:col-span-1">
            <h2 className="text-2xl font-bold text-white mb-2">
              {FOOTER_BRAND.emoji} {FOOTER_BRAND.name}
            </h2>
            <p className="text-white/70 text-sm mb-4">
              {FOOTER_BRAND.description}
            </p>
            {/* Social Links */}
            <div className="flex gap-4">
              {SOCIAL_LINKS.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/70 hover:text-white/90 transition-colors duration-200"
                  aria-label={social.name}
                >
                  <SocialIcon type={social.icon} />
                </a>
              ))}
            </div>
          </div>

          {/* Product Links */}
          <FooterColumn title="Product" links={FOOTER_LINKS.product} />

          {/* Company Links */}
          <FooterColumn title="Company" links={FOOTER_LINKS.company} />

          {/* Resources Links */}
          <FooterColumn title="Resources" links={FOOTER_LINKS.resources} />

          {/* Legal Links */}
          <FooterColumn title="Legal" links={FOOTER_LINKS.legal} />
        </div>

        {/* Bottom Section */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/70 text-sm">
            © {currentYear} {FOOTER_BRAND.name}. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {FOOTER_BOTTOM_LINKS.map((link, index) => (
              <div key={index} className="flex items-center gap-6">
                <a
                  href={link.href}
                  className="text-white/70 hover:text-white/90 text-sm transition-colors duration-200"
                >
                  {link.label}
                </a>
                {index < FOOTER_BOTTOM_LINKS.length - 1 && (
                  <span className="text-white/30">•</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
