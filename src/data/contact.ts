import {
  Clock3,
  Mail,
  MessageCircle,
  Phone,
  type LucideIcon,
} from 'lucide-react';

import contactHeroImage from '../assets/optimized/contact-bg.jpg';
/* =========================================================
   TYPES
========================================================= */

export type ContactMethod = {
  label: string;
  value: string;
  description: string;
  href?: string;
  icon: LucideIcon;
};

export type CampusLocation = {
  name: string;
  shortName: string;
  location: string;
  description: string;
  phone: string;
  email: string;
  featured?: boolean;
};

export type SocialPlatform =
  | 'instagram'
  | 'tiktok'
  | 'facebook'
  | 'linkedin';

export type SocialLink = {
  label: string;
  href: string;
  platform: SocialPlatform;
};

export type SelectOption = {
  label: string;
  value: string;
};

/* =========================================================
   MAIN CONTACT PAGE CONTENT
========================================================= */

export const contactPageContent = {
  hero: {
    eyebrow: 'Contact AIMS Campus',

    title: 'Start a conversation about your future',

    description:
      'Whether you are exploring programmes, planning your next academic step or looking for admissions guidance, the AIMS Campus team is ready to help you move forward with confidence.',

    image: contactHeroImage,
    imageAlt:
      'AIMS Campus students and academic community.',
  },

  contactIntro: {
    eyebrow: 'Get in touch',

    title: 'We are here to help',

    description:
      'Connect with our admissions team by phone, WhatsApp or email. We are here to answer your questions about programmes, admissions and studying at AIMS Campus.',
  },

  form: {
    eyebrow: 'Send an enquiry',

    title: 'Tell us how we can help',

    description:
      'Share a few details about yourself and what you are interested in. Our admissions team can use this information to provide the guidance you need.',
  },

  campuses: {
    eyebrow: 'Our locations',

    title: 'Visit AIMS Campus',

    description:
      'Meet our team at our Colombo 07 or Negombo locations for admissions guidance, programme information and student support.',
  },

  map: {
    eyebrow: 'Find us',

    title: 'Campus locations',

    description:
      'Find our Colombo 07 and Negombo locations using the interactive maps and plan your visit to speak with our admissions team.',
  },

  social: {
    eyebrow: 'Stay connected',

    title: 'Follow the AIMS community',

    description:
      'Stay connected with AIMS Campus for programme updates, campus activities, student experiences and the latest announcements.',
  },

  cta: {
    eyebrow: 'Your next step',

    title: 'Ready to begin your AIMS journey?',

    description:
      'Discover the academic pathway that matches your ambitions or contact our admissions team for personalised guidance.',

    primaryLabel: 'Explore programmes',
    primaryHref: '/programmes',

    secondaryLabel: 'Call admissions',
    secondaryHref: 'tel:01175574500',
  },
};

/* =========================================================
   CONTACT METHODS
========================================================= */

export const contactMethods: ContactMethod[] = [
  {
    label: 'Fixed Line',

    value: '011 755 74500',

    description:
      'Speak directly with our admissions team for programme information, application guidance and general enquiries.',

    href: 'tel:01175574500',

    icon: Phone,
  },

  {
    label: 'WhatsApp',

    value: '077 799 9177',

    description:
      'Send us a WhatsApp message for quick assistance with programmes, admissions and your study options.',

    href: 'https://wa.me/94777999177',

    icon: MessageCircle,
  },

  {
    label: 'Email',

    value: 'info@aimscollege.lk',

    description:
      'Email your enquiry to our team and provide any additional details about the programme you are interested in.',

    href: 'mailto:info@aimscollege.lk',

    icon: Mail,
  },

  {
    label: 'Opening hours',

    value: '8:30 AM – 5:30 PM',

    description:
      'Visit or contact our admissions team during regular working hours for assistance and guidance.',

    icon: Clock3,
  },
];

/* =========================================================
   USEFUL CONTACT DETAILS
========================================================= */

export type SupportContact = {
  label: string;
  value: string;
  description?: string;
  href?: string;
};

export type StudentSupportContact = {
  school: string;
  coordinator: string;
  phone: string;
  href: string;
};

export type UsefulContactDetails = {
  generalSupport: SupportContact[];
  studentSupport: StudentSupportContact[];
};

/* =========================================================
   USEFUL CONTACT DETAILS
========================================================= */

export const usefulContactDetails: UsefulContactDetails = {
  generalSupport: [
    {
      label: 'Fixed Line',
      value: '011 755 74500',
      description: 'General enquiries and assistance',
      href: 'tel:01175574500',
    },

    {
      label: 'Hotline',
      value: '077 799 9177',
      description: 'Direct support through our hotline',
      href: 'tel:0777999177',
    },
  ],

  studentSupport: [
    {
      school: 'School of Computing & IT',
      coordinator: 'Amalmee',
      phone: '076 148 7772',
      href: 'tel:0761487772',
    },

    {
      school: 'School of Business',
      coordinator: 'Shirani',
      phone: '076 148 7711',
      href: 'tel:0761487711',
    },

    {
      school: 'School of Education',
      coordinator: 'Ishini',
      phone: '077 677 1681',
      href: 'tel:0776771681',
    },
  ],
};

/* =========================================================
   CAMPUS LOCATIONS
========================================================= */

export const campusLocations: CampusLocation[] = [
  {
    name: 'AIMS Campus – Colombo 07',

    shortName: 'Colombo 07',

    location: '07 Rajakeeya Mawatha, Colombo 07, Sri Lanka',

    description:
      'Our Colombo 07 campus provides convenient access to admissions guidance, academic information and student support in the heart of Colombo.',

    phone: '011 755 74500',

    email: 'info@aimscollege.lk',

    /*
     * featured=true gives this campus the navy card style
     * and displays the "Main campus" badge in ContactPage.tsx.
     */
    featured: true,
  },

  {
    name: 'AIMS Campus – Negombo',

    shortName: 'Negombo',

    location: '349/2, Main Street, Negombo, Sri Lanka',

    description:
      'Our Negombo location provides students with access to programme information, admissions assistance and academic guidance closer to home.',

    phone: '011 755 74500',

    email: 'info@aimscollege.lk',

    featured: false,
  },
];

/* =========================================================
   GOOGLE MAPS
========================================================= */

export const colomboMapEmbedUrl =
  'https://www.google.com/maps?q=07%20Rajakeeya%20Mawatha%20Colombo%2007%20Sri%20Lanka&output=embed';

export const negomboMapEmbedUrl =
  'https://www.google.com/maps?q=349%2F2%20Main%20Street%20Negombo%20Sri%20Lanka&output=embed';

/* =========================================================
   SOCIAL MEDIA LINKS
========================================================= */

export const socialLinks: SocialLink[] = [
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/aims_campus/',
    platform: 'instagram',
  },

  {
    label: 'TikTok',
    href: 'https://www.tiktok.com/@uel_srilanka',
    platform: 'tiktok',
  },

  {
    label: 'Facebook',
    href: 'https://www.facebook.com/AIMSCOfficial/',
    platform: 'facebook',
  },

  {
    label: 'LinkedIn',
    href: 'https://lk.linkedin.com/company/aimscampus',
    platform: 'linkedin',
  },
];

/* =========================================================
   CAMPUS OPTIONS
   Used by the enquiry form
========================================================= */

export const campusOptions: SelectOption[] = [
  {
    label: 'Select a campus',
    value: '',
  },

  {
    label: 'Colombo 07',
    value: 'colombo-07',
  },

  {
    label: 'Negombo',
    value: 'negombo',
  },

  {
    label: 'Not sure yet',
    value: 'not-sure',
  },
];

/* =========================================================
   PROGRAMME OPTIONS
   Used by the enquiry form
========================================================= */

export const programmeOptions: SelectOption[] = [
  {
    label: 'Select an area of interest',
    value: '',
  },

  {
    label: 'Foundation programmes',
    value: 'foundation',
  },

  {
    label: 'Diploma programmes',
    value: 'diploma',
  },

  {
    label: "Bachelor's programmes",
    value: 'bachelors',
  },

  {
    label: "Master's programmes",
    value: 'masters',
  },

  {
    label: 'Doctoral programmes',
    value: 'doctoral',
  },

  {
    label: 'Professional programmes',
    value: 'professional',
  },

  {
    label: 'Not sure yet',
    value: 'not-sure',
  },
];
