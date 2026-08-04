import { ArrowUpRight, Mail, Phone, Search } from 'lucide-react';
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaTiktok } from 'react-icons/fa';
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
] as const;

export function AnnouncementBar() {
  return (
    <div className="bg-aims-navy text-white">
      <Container className="py-2.5">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-3">
            {socialLinks.map(({ label, href, icon: Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                className="inline-flex h-8 w-8 items-center justify-center rounded-full text-white/90 transition hover:bg-white/10 hover:text-aims-gold"
              >
                <Icon aria-hidden="true" size={16} />
              </a>
            ))}
            <span
              className="inline-flex h-8 w-8 items-center justify-center rounded-full text-white/90"
              aria-label="TikTok"
            >
              <FaTiktok aria-hidden="true" size={14} />
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-blue-100">
            <a
              href="mailto:info@aimscampus.lk"
              className="inline-flex items-center gap-2 transition hover:text-white"
            >
              <Mail aria-hidden="true" size={15} className="text-aims-gold" />
              <span>info@aimscampus.lk</span>
            </a>
            <a
              href="tel:+94117574500"
              className="inline-flex items-center gap-2 transition hover:text-white"
            >
              <Phone aria-hidden="true" size={15} className="text-aims-gold" />
              <span>+94 11 757 4500</span>
            </a>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <label className="relative">
              <Search
                aria-hidden="true"
                size={16}
                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-aims-gold"
              />
              <input
                type="search"
                aria-label="Search"
                placeholder="Search"
                className="h-10 w-full rounded-full border border-white/10 bg-white/10 pl-10 pr-4 text-sm text-white placeholder:text-white/65 outline-none transition focus:border-aims-gold sm:w-52"
              />
            </label>
            <Link
              to="/contact"
              className="inline-flex h-10 items-center justify-center gap-2 rounded-full bg-aims-gold px-5 text-sm font-semibold text-aims-dark transition hover:-translate-y-0.5 hover:shadow-lg"
            >
              Student Portal
              <ArrowUpRight aria-hidden="true" size={15} />
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
}
