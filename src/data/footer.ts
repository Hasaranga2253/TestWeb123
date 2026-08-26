import type { ComponentType } from 'react';
import { Clock3, Mail, MapPin, MessageCircle, Phone } from 'lucide-react';

/* =========================================================
   TYPES
========================================================= */

export interface FooterLink {
  label: string;
  href: string;
  external?: boolean;
}

export interface FooterLinkGroup {
  title: string;
  links: FooterLink[];
}

export type FooterContactIcon = 'phone' | 'mail' | 'map' | 'whatsapp' | 'clock';

export interface FooterContactItem {
  icon: FooterContactIcon;
  label: string;
  value: string;
  href?: string;
}

export interface FooterSocialLink {
  platform: 'facebook' | 'instagram' | 'linkedin' | 'tiktok';
  label: string;
  href: string;
}

/* =========================================================
   ICON MAP (kept here so the component stays declarative)
========================================================= */

export const footerContactIconMap: Record<FooterContactIcon, ComponentType<{ size?: number; 'aria-hidden'?: boolean }>> = {
  phone: Phone,
  mail: Mail,
  map: MapPin,
  whatsapp: MessageCircle,
  clock: Clock3,
};

/* =========================================================
   BRAND
========================================================= */

export const footerBrand = {
  name: 'AIMS Campus',
  affiliation: 'In partnership with the University of East London',
  description:
    'Quality education, practical experience, and a clear path toward your future — from foundation to postgraduate study.',
};

/* =========================================================
   LINK GROUPS
========================================================= */

export const footerLinkGroups: FooterLinkGroup[] = [
  {
    title: 'Explore',
    links: [
      { label: 'About AIMS', href: '/about' },
      { label: 'Programmes', href: '/programmes' },
      { label: 'Contact admissions', href: '/contact' },
      { label: 'Student Portal', href: 'https://lms.aimscampus.online/login/index.php', external: true },
    ],
  },
  {
    title: 'Partners',
    links: [
      { label: 'University of East London', href: 'https://www.uel.ac.uk/', external: true },
      { label: 'National Computing Centre', href: 'https://www.nccedu.com/', external: true },
    ],
  },
];

/* =========================================================
   CONTACT
========================================================= */

export const footerContactItems: FooterContactItem[] = [
  {
    icon: 'map',
    label: 'Campus',
    value: 'Colombo 07, Sri Lanka',
    href: 'https://maps.google.com/?q=AIMS+Campus+Colombo+07',
  },
  {
    icon: 'phone',
    label: 'Admissions hotline',
    value: '011 755 4500',
    href: 'tel:0117554500',
  },
  {
    icon: 'whatsapp',
    label: 'WhatsApp',
    value: '077 799 9177',
    href: 'https://wa.me/94777999177',
  },
  {
    icon: 'mail',
    label: 'Email',
    value: 'info@aimscampus.lk',
    href: 'mailto:info@aimscampus.lk',
  },
];

export const footerHours = '8:30 AM – 5:30 PM, every working day';

/* =========================================================
   SOCIAL
========================================================= */

export const footerSocialLinks: FooterSocialLink[] = [
  { platform: 'facebook', label: 'Facebook', href: 'https://facebook.com' },
  { platform: 'instagram', label: 'Instagram', href: 'https://instagram.com' },
  { platform: 'linkedin', label: 'LinkedIn', href: 'https://linkedin.com' },
  { platform: 'tiktok', label: 'TikTok', href: 'https://tiktok.com' },
];
