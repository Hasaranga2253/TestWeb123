import { type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';

import { Container } from '../common/Container';
import CmpsLogo from '../../assets/logos/CmpsLogo-cropped.png';
import UelLogo from '../../assets/logos/University of East London Crest Logo-cropped.png';
import {
  footerBrand,
  footerContactIconMap,
  footerContactItems,
  footerHours,
  footerLinkGroups,
  footerSocialLinks,
  type FooterSocialLink,
} from '../../data/footer';

/* =========================================================
   LOGO PLATE
========================================================= */

function FooterLogoPlate({ children }: { children: ReactNode }) {
  return (
    <span className="flex h-14 items-center overflow-hidden rounded-xl bg-white px-4 py-2 shadow-sm ring-1 ring-white/15 transition group-hover:bg-white/95">
      {children}
    </span>
  );
}

/* =========================================================
   SOCIAL ICON
========================================================= */

function FooterSocialIcon({ platform }: { platform: FooterSocialLink['platform'] }) {
  if (platform === 'instagram') {
    return (
      <svg aria-hidden="true" viewBox="0 0 32 32" className="h-5 w-5">
        <defs>
          <radialGradient id="footer-instagram-gradient" cx="30%" cy="107%" r="150%">
            <stop offset="0" stopColor="#fdf497" />
            <stop offset="0.05" stopColor="#fdf497" />
            <stop offset="0.45" stopColor="#fd5949" />
            <stop offset="0.6" stopColor="#d6249f" />
            <stop offset="0.9" stopColor="#285aeb" />
          </radialGradient>
        </defs>
        <rect width="32" height="32" rx="8" fill="url(#footer-instagram-gradient)" />
        <path
          fill="#fff"
          d="M21.7 8.4h-11.4a1.9 1.9 0 0 0-1.9 1.9v11.4c0 1 .9 1.9 1.9 1.9h11.4c1 0 1.9-.9 1.9-1.9v-11.4c0-1-.9-1.9-1.9-1.9Zm.3 13.3c0 .2-.1.3-.3.3h-11.4a.3.3 0 0 1-.3-.3v-11.4c0-.2.1-.3.3-.3h11.4c.2 0 .3.1.3.3v11.4Z"
        />
        <path
          fill="#fff"
          d="M16 12.2a3.8 3.8 0 1 0 0 7.6 3.8 3.8 0 0 0 0-7.6Zm0 6a2.2 2.2 0 1 1 0-4.4 2.2 2.2 0 0 1 0 4.4Z"
        />
        <circle cx="20.5" cy="11.5" r="1.1" fill="#fff" />
      </svg>
    );
  }

  if (platform === 'tiktok') {
    return (
      <svg aria-hidden="true" viewBox="0 0 32 32" className="h-5 w-5">
        <path
          fill="#25f4ee"
          d="M19.3 6.2h3.3c.2 1.7 1.1 3.1 2.5 4v3.6a8.4 8.4 0 0 1-5.5-2v8.7a6.7 6.7 0 1 1-6.7-6.7h1v3.6h-1a3.1 3.1 0 1 0 3.1 3.1V6.2h3.3Z"
        />
        <path
          fill="#fe2c55"
          d="M21.1 6.2h1.5c.2 1.7 1.1 3.1 2.5 4v3.6a8.3 8.3 0 0 1-3.7-1.1v7.8a6.7 6.7 0 0 1-10.1 5.8 6.7 6.7 0 0 0 8.3-6.5v-8.8a8.4 8.4 0 0 0 5.5 2v-1.4a8.4 8.4 0 0 1-4-5.4ZM13 17.4a3.1 3.1 0 0 0-1.6 5.8 3.1 3.1 0 0 1 3-4.4h1v-1.4H13Z"
        />
        <path
          fill="#000"
          d="M17.8 6.2h3.3c.2 1.7 1.1 3.1 2.5 4v3.6a8.4 8.4 0 0 1-5.5-2v8.7a6.7 6.7 0 1 1-6.7-6.7h1v3.6h-1a3.1 3.1 0 1 0 3.1 3.1V6.2h3.3Z"
        />
      </svg>
    );
  }

  if (platform === 'linkedin') {
    return (
      <svg aria-hidden="true" viewBox="0 0 32 32" className="h-5 w-5">
        <rect width="32" height="32" rx="4" fill="#0a66c2" />
        <path
          fill="#fff"
          d="M9.4 13h4.1v12.1H9.4V13Zm2.1-6a2.4 2.4 0 1 1 0 4.8 2.4 2.4 0 0 1 0-4.8Zm4.4 6h3.9v1.7h.1c.5-1 1.9-2.1 3.9-2.1 4.2 0 4.9 2.7 4.9 6.3v6.2h-4.1v-5.5c0-1.3 0-3-1.8-3s-2.1 1.4-2.1 2.9v5.6h-4.1V13Z"
        />
      </svg>
    );
  }

  return (
    <svg aria-hidden="true" viewBox="0 0 32 32" className="h-5 w-5">
      <circle cx="16" cy="16" r="15" fill="#1877f2" />
      <path
        fill="#fff"
        d="M18 30.8V19.1h3.9l.7-4.8H18v-3.1c0-1.3.6-2.6 2.7-2.6h2.1V4.5s-1.9-.3-3.7-.3c-3.8 0-6.3 2.3-6.3 6.5v3.6H8.6v4.8h4.2v11.7a15.4 15.4 0 0 0 5.2 0Z"
      />
    </svg>
  );
}

/* =========================================================
   FOOTER
========================================================= */

export function Footer() {
  return (
    <footer className="relative isolate overflow-hidden bg-aims-navy text-blue-100">
      {/* top accent line, echoes the gold thread used on section headings */}
      <div className="h-[3px] w-full bg-gradient-to-r from-aims-gold via-aims-gold/40 to-transparent" aria-hidden="true" />

      {/* decorative texture, matches Hero / CTA sections */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.05] [background-image:radial-gradient(circle,rgba(255,255,255,0.8)_1px,transparent_1px)] [background-size:26px_26px]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -left-24 top-0 h-72 w-72 rounded-full bg-aims-blue/20 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-[#123f91]/30 blur-3xl"
        aria-hidden="true"
      />

      <Container className="relative py-16 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr_0.8fr_1fr] lg:gap-10">
          {/* =================================================
              BRAND
          ================================================== */}
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <Link
                to="/"
                aria-label="AIMS Campus home"
                className="group block"
              >
                <FooterLogoPlate>
                <img
                  src={CmpsLogo}
                  alt="AIMS Campus logo"
                  className="h-full max-h-10 w-auto object-contain"
                />
                </FooterLogoPlate>
              </Link>

              <span className="hidden h-10 w-px bg-white/15 sm:block" aria-hidden="true" />

              <a
                href="https://www.uel.ac.uk/"
                target="_blank"
                rel="noreferrer"
                aria-label="Visit University of East London website"
                className="group block"
              >
                <FooterLogoPlate>
                <img
                  src={UelLogo}
                  alt="University of East London logo"
                  className="h-full max-h-10 w-auto object-contain"
                />
                </FooterLogoPlate>
              </a>
            </div>

            <p className="mt-3 text-xs font-semibold uppercase tracking-[0.16em] text-aims-gold/80">
              {footerBrand.affiliation}
            </p>

            <p className="mt-5 max-w-sm text-sm leading-7 text-blue-100/80">
              {footerBrand.description}
            </p>

            <div className="mt-7 flex items-center gap-3">
              {footerSocialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={social.label}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-aims-dark/55 shadow-sm ring-1 ring-white/5 transition duration-300 hover:-translate-y-0.5 hover:border-aims-gold/40 hover:bg-aims-blue/35"
                >
                  <FooterSocialIcon platform={social.platform} />
                </a>
              ))}
            </div>
          </div>

          {/* =================================================
              LINK GROUPS
          ================================================== */}
          {footerLinkGroups.map((group) => (
            <nav key={group.title} aria-label={group.title}>
              <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-white">
                {group.title}
              </h3>

              <ul className="mt-5 space-y-3 text-sm">
                {group.links.map((link) => (
                  <li key={link.label}>
                    {link.external ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noreferrer"
                        className="group inline-flex items-center gap-1.5 text-blue-100/80 transition-colors hover:text-aims-gold"
                      >
                        {link.label}
                        <ArrowUpRight
                          aria-hidden="true"
                          size={13}
                          className="opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100"
                        />
                      </a>
                    ) : (
                      <Link
                        to={link.href}
                        className="inline-flex items-center gap-1.5 text-blue-100/80 transition-colors hover:text-aims-gold"
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          {/* =================================================
              CONTACT + NEWSLETTER
          ================================================== */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-white">Contact</h3>

            <ul className="mt-5 space-y-4 text-sm">
              {footerContactItems.map((item) => {
                const Icon = footerContactIconMap[item.icon];
                const content = (
                  <>
                    <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/8 text-aims-gold">
                      <Icon aria-hidden size={15} />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-[11px] font-medium uppercase tracking-wide text-blue-100/50">
                        {item.label}
                      </span>
                      <span className="block break-words font-medium text-blue-100">{item.value}</span>
                    </span>
                  </>
                );

                return (
                  <li key={item.label}>
                    {item.href ? (
                      <a
                        href={item.href}
                        target={item.href.startsWith('http') ? '_blank' : undefined}
                        rel={item.href.startsWith('http') ? 'noreferrer' : undefined}
                        className="group flex items-start gap-3 transition-colors hover:text-white"
                      >
                        {content}
                      </a>
                    ) : (
                      <div className="flex items-start gap-3">{content}</div>
                    )}
                  </li>
                );
              })}
            </ul>

            <p className="mt-5 text-xs text-blue-100/50">{footerHours}</p>

          </div>
        </div>
      </Container>

      {/* =====================================================
          BOTTOM BAR
      ====================================================== */}
      <div className="relative border-t border-white/10">
        <Container className="flex flex-col items-center justify-center gap-4 py-6 text-center text-xs text-blue-100/60">
          <p>© {new Date().getFullYear()} AIMS Campus. All rights reserved.</p>
        </Container>

      </div>
    </footer>
  );
}
