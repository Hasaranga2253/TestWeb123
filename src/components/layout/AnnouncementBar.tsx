import { ArrowUpRight, Mail, Phone } from 'lucide-react';
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTiktok,
} from 'react-icons/fa';
import { Link } from 'react-router-dom';

import { Container } from '../common/Container';
import { campusData } from '../../data/campus';

const socialLinks = [
  {
    label: 'Facebook',
    href: campusData.socialLinks[0].url,
    icon: FaFacebookF,
  },
  {
    label: 'Instagram',
    href: campusData.socialLinks[1].url,
    icon: FaInstagram,
  },
  {
    label: 'LinkedIn',
    href: campusData.socialLinks[2].url,
    icon: FaLinkedinIn,
  },
  {
    label: 'TikTok',
    href: 'https://www.tiktok.com/@uel_srilanka',
    icon: FaTiktok,
  },
] as const;

export function AnnouncementBar() {
  return (
    <div className="fixed left-0 right-0 top-0 z-[110] h-14 w-full bg-aims-navy text-white">
      <Container className="!mx-0 !h-full !max-w-none">
        <div className="grid h-full grid-cols-[1fr_auto] items-center gap-3 md:grid-cols-[1fr_auto_1fr]">
          {/* =================================================
              SOCIAL MEDIA
          ================================================== */}

          <div className="flex min-w-0 items-center gap-1 sm:gap-2 md:justify-self-start">
            {socialLinks.map(({ label, href, icon: Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Visit AIMS Campus ${label}`}
                className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-white/90 transition hover:bg-white/10 hover:text-aims-gold"
              >
                <Icon
                  aria-hidden="true"
                  size={label === 'TikTok' ? 14 : 16}
                />
              </a>
            ))}
          </div>

          {/* =================================================
              EMAIL + PHONE
              Hidden on smaller screens to keep the bar fixed
              at one clean height.
          ================================================== */}

          <div className="hidden items-center justify-center gap-5 text-sm text-blue-100 md:flex md:justify-self-center">
            <a
              href="mailto:info@aimscampus.lk"
              className="inline-flex items-center gap-2 whitespace-nowrap transition hover:text-white"
            >
              <Mail
                aria-hidden="true"
                size={15}
                className="shrink-0 text-aims-gold"
              />

              <span>info@aimscampus.lk</span>
            </a>

            <a
              href="tel:+94117574500"
              className="inline-flex items-center gap-2 whitespace-nowrap transition hover:text-white"
            >
              <Phone
                aria-hidden="true"
                size={15}
                className="shrink-0 text-aims-gold"
              />

              <span>+94 11 757 4500</span>
            </a>
          </div>

          {/* =================================================
              STUDENT PORTAL
          ================================================== */}

          <div className="justify-self-end">
            <Link
              to="/contact"
              className="inline-flex h-9 items-center justify-center gap-1.5 whitespace-nowrap rounded-full bg-aims-gold px-3 text-[11px] font-semibold text-aims-dark transition hover:-translate-y-0.5 hover:shadow-lg sm:h-10 sm:gap-2 sm:px-5 sm:text-sm"
            >
              <span>Student Portal</span>

              <ArrowUpRight
                aria-hidden="true"
                size={15}
              />
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
}