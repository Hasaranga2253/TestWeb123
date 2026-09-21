import { useState, type FormEvent, type ReactNode } from 'react';

import { motion } from 'motion/react';
import {
  ArrowRight,
  Building2,
  CheckCircle2,
  Clock3,
  GraduationCap,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Send,
  User,
} from 'lucide-react';
import { Link } from 'react-router-dom';

import { Container } from '../components/common/Container';
import { backendUrl } from '../utils/api';

import {
  campusLocations,
  campusOptions,
  colomboMapEmbedUrl,
  contactMethods,
  contactPageContent,
  negomboMapEmbedUrl,
  programmeOptions,
  socialLinks,
  usefulContactDetails,
  type CampusLocation,
  type ContactMethod,
  type SelectOption,
  type SocialLink,
} from '../data/contact';

const enquirySubmitErrorMessage =
  'We could not submit your enquiry right now. Please call 011 755 4500 or email info@aimscampus.lk, or try again later.';

/* =========================================================
   ANIMATION
========================================================= */

const sectionReveal = {
  initial: {
    opacity: 0,
    y: 30,
  },

  whileInView: {
    opacity: 1,
    y: 0,
  },

  viewport: {
    once: true,
    amount: 0.15,
  },

  transition: {
    duration: 0.55,
    ease: 'easeOut',
  },
} as const;

const campusMapEmbedUrls: Record<string, string> = {
  'Colombo 07': colomboMapEmbedUrl,
  Negombo: negomboMapEmbedUrl,
};


function generalSupportIcon(label: string) {
  const normalized = label.toLowerCase();
  if (normalized.includes('whatsapp')) return MessageCircle;
  if (normalized.includes('email') || normalized.includes('mail')) return Mail;
  return Phone;
}

/* =========================================================
   REUSABLE SECTION
========================================================= */

function AnimatedSection({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.section {...sectionReveal} className={className}>
      {children}
    </motion.section>
  );
}

/* =========================================================
   SECTION HEADING
========================================================= */

function SectionHeading({
  eyebrow,
  title,
  description,
  centered = false,
  dark = false,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  centered?: boolean;
  dark?: boolean;
}) {
  return (
    <div className={centered ? 'mx-auto max-w-3xl text-center' : 'max-w-3xl'}>
      <span
        className={`inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.22em] ${
          dark ? 'text-aims-gold' : 'text-aims-blue'
        }`}
      >
        <span
          className={`h-px w-6 ${dark ? 'bg-aims-gold' : 'bg-aims-blue'}`}
          aria-hidden="true"
        />
        {eyebrow}
      </span>

      <h2
        className={`mt-4 text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl ${
          dark ? 'text-white' : 'text-aims-navy'
        }`}
      >
        {title}
      </h2>

      {description ? (
        <p
          className={`mt-5 text-base leading-8 sm:text-lg ${
            dark ? 'text-blue-100' : 'text-slate-600'
          }`}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}

/* =========================================================
   SOCIAL ICON
========================================================= */

function SocialIcon({ platform }: { platform: string }) {
  if (platform === 'instagram') {
    return (
      <svg aria-hidden="true" viewBox="0 0 32 32" className="h-6 w-6">
        <defs>
          <radialGradient id="instagram-gradient-a" cx="30%" cy="107%" r="150%">
            <stop offset="0" stopColor="#fdf497" />
            <stop offset="0.05" stopColor="#fdf497" />
            <stop offset="0.45" stopColor="#fd5949" />
            <stop offset="0.6" stopColor="#d6249f" />
            <stop offset="0.9" stopColor="#285aeb" />
          </radialGradient>
        </defs>
        <rect width="32" height="32" rx="8" fill="url(#instagram-gradient-a)" />
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
      <svg aria-hidden="true" viewBox="0 0 32 32" className="h-6 w-6">
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

  if (platform === 'facebook') {
    return (
      <svg aria-hidden="true" viewBox="0 0 32 32" className="h-6 w-6">
        <circle cx="16" cy="16" r="15" fill="#1877f2" />
        <path
          fill="#fff"
          d="M18 30.8V19.1h3.9l.7-4.8H18v-3.1c0-1.3.6-2.6 2.7-2.6h2.1V4.5s-1.9-.3-3.7-.3c-3.8 0-6.3 2.3-6.3 6.5v3.6H8.6v4.8h4.2v11.7a15.4 15.4 0 0 0 5.2 0Z"
        />
      </svg>
    );
  }

  if (platform === 'linkedin') {
    return (
      <svg aria-hidden="true" viewBox="0 0 32 32" className="h-6 w-6">
        <rect width="32" height="32" rx="4" fill="#0a66c2" />
        <path
          fill="#fff"
          d="M9.4 13h4.1v12.1H9.4V13Zm2.1-6a2.4 2.4 0 1 1 0 4.8 2.4 2.4 0 0 1 0-4.8Zm4.4 6h3.9v1.7h.1c.5-1 1.9-2.1 3.9-2.1 4.2 0 4.9 2.7 4.9 6.3v6.2h-4.1v-5.5c0-1.3 0-3-1.8-3s-2.1 1.4-2.1 2.9v5.6h-4.1V13Z"
        />
      </svg>
    );
  }

  return <ArrowRight aria-hidden="true" size={20} />;
}

/* =========================================================
   FORM FIELD (icon + input, shared style)
========================================================= */

function FieldShell({
  label,
  htmlFor,
  children,
}: {
  label: string;
  htmlFor: string;
  children: ReactNode;
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className="mb-2 block text-sm font-semibold text-aims-navy">
        {label}
      </label>
      {children}
    </div>
  );
}

/* =========================================================
   CONTACT PAGE
========================================================= */

export function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] =
    useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] =
    useState(false);
  const [loadedMaps, setLoadedMaps] = useState<Record<string, boolean>>({});

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitError(null);
    setIsSubmitting(true);

    const form = event.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch(
        backendUrl('/backend/api/enquiry.php'),
        {
          method: 'POST',
          body: formData,
        },
      );

      const contentType = response.headers.get('content-type') ?? '';
      if (!contentType.includes('application/json')) {
        throw new Error(enquirySubmitErrorMessage);
      }

      const result = (await response.json()) as {
        ok?: boolean;
        message?: string;
      };

      if (!response.ok || !result.ok) {
        throw new Error(
          result.message ??
            enquirySubmitErrorMessage,
        );
      }

      form.reset();
      setSubmitted(true);
    } catch (error) {
      setSubmitError(
        error instanceof Error
          ? error.message
          : enquirySubmitErrorMessage,
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="overflow-x-hidden bg-white text-slate-800">
      {/* =====================================================
          HERO
      ====================================================== */}

      <section className="relative isolate flex min-h-[760px] items-center overflow-hidden bg-[#031437] text-white sm:min-h-[660px] lg:min-h-[720px]">
        <img
          src={contactPageContent.hero.image}
          alt={contactPageContent.hero.imageAlt}
          decoding="async"
          fetchPriority="high"
          className="absolute inset-0 !h-full w-full object-cover object-[82%_bottom] sm:object-center"
        />

<div
  className="pointer-events-none absolute inset-0 bg-linear-to-r from-[#031437]/45 via-[#031437]/15 to-transparent"
  aria-hidden="true"
/>

<div
  className="pointer-events-none absolute inset-0 bg-linear-to-b from-[#031437]/78 via-[#031437]/45 to-[#031437]/18 sm:bg-linear-to-r sm:from-[#031437]/88 sm:via-[#031437]/44 sm:to-transparent"
  aria-hidden="true"
/>

        {/* quiet dot-grid texture for depth */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.05] [background-image:radial-gradient(circle,rgba(255,255,255,0.8)_1px,transparent_1px)] [background-size:24px_24px] sm:opacity-[0.07]"
          aria-hidden="true"
        />

        {/* Decorative glow */}
        <div
          className="pointer-events-none absolute -right-32 top-10 h-[28rem] w-[28rem] rounded-full bg-aims-blue/12 blur-3xl sm:bg-aims-blue/20"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute -left-20 bottom-0 h-64 w-64 rounded-full bg-aims-gold/8 blur-3xl sm:bg-aims-gold/10"
          aria-hidden="true"
        />

        <Container className="relative z-10 w-full py-14 sm:py-24 lg:py-28">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: 'easeOut' }}
            className="max-w-4xl"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.22em] text-aims-gold backdrop-blur-sm">
              {contactPageContent.hero.eyebrow}
            </span>

            <h1 className="mt-6 max-w-4xl text-3xl font-bold leading-[1.08] sm:text-5xl lg:text-6xl xl:text-7xl">
              {contactPageContent.hero.title}
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-8 text-blue-100 sm:text-lg">
              {contactPageContent.hero.description}
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <a
                href="tel:01175574500"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-aims-gold px-7 py-3.5 font-semibold text-aims-dark transition hover:-translate-y-0.5 hover:shadow-xl"
              >
                <Phone aria-hidden="true" size={18} />
                Call admissions
              </a>

              <a
                href="https://wa.me/94777999177"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/35 bg-white/10 px-7 py-3.5 font-semibold text-white backdrop-blur-sm transition hover:bg-white/15"
              >
                <MessageCircle aria-hidden="true" size={18} />
                WhatsApp us
              </a>
            </div>
          </motion.div>

          {/* quick-glance strip, echoes the stat cards used elsewhere on the site */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.5, ease: 'easeOut' }}
            className="mt-14 grid gap-4 sm:grid-cols-3"
          >
            {contactMethods.slice(0, 3).map((method: ContactMethod) => {
              const Icon = method.icon;
              return (
                <div
                  key={method.label}
                  className="flex items-center gap-4 rounded-2xl border border-white/15 bg-white/8 p-4 backdrop-blur-sm sm:p-5"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/10 text-aims-gold">
                    <Icon aria-hidden="true" size={20} />
                  </span>
                  <div className="min-w-0">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-blue-100">
                      {method.label}
                    </p>
                    <p className="truncate text-sm font-semibold text-white">{method.value}</p>
                  </div>
                </div>
              );
            })}
          </motion.div>
        </Container>
      </section>

{/* =====================================================
    USEFUL CONTACT DETAILS
====================================================== */}

<AnimatedSection className="py-16 sm:py-20 lg:py-24">
  <Container>
    <SectionHeading eyebrow="Contact information" title="Useful contact details" centered />

    <div className="mt-14 grid gap-8 lg:grid-cols-2 lg:gap-10">
      {/* =================================================
          GENERAL SUPPORT
      ================================================== */}
      <div className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-[0_20px_60px_rgba(7,29,73,0.06)] sm:p-9">
        <div className="flex items-center gap-3">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-aims-sky text-aims-blue">
            <Phone aria-hidden="true" size={20} />
          </span>
          <h3 className="text-xl font-bold text-aims-navy sm:text-2xl">General support</h3>
        </div>

        <div className="mt-6 divide-y divide-slate-100">
          {usefulContactDetails.generalSupport.map((contact, index) => {
            const Icon = generalSupportIcon(contact.label);

            return (
              <motion.a
                key={contact.label}
                href={contact.href}
                target={contact.href?.startsWith('http') ? '_blank' : undefined}
                rel={contact.href?.startsWith('http') ? 'noopener noreferrer' : undefined}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.4, delay: index * 0.08, ease: 'easeOut' }}
                className="group -mx-3 flex items-center gap-4 rounded-xl px-3 py-5 transition-colors duration-300 hover:bg-slate-50"
              >
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-aims-navy transition-colors duration-300 group-hover:bg-aims-navy group-hover:text-white">
                  <Icon aria-hidden="true" size={19} />
                </span>

                <div className="min-w-0 flex-1">
                  <p className="text-base font-semibold text-aims-navy transition-colors group-hover:text-aims-blue sm:text-lg">
                    {contact.label}
                  </p>
                  <p className="mt-0.5 text-base font-medium text-slate-600">{contact.value}</p>
                  {contact.description ? (
                    <p className="mt-0.5 text-sm text-slate-500">{contact.description}</p>
                  ) : null}
                </div>

                <ArrowRight
                  aria-hidden="true"
                  size={18}
                  className="shrink-0 text-slate-300 transition-all duration-300 group-hover:translate-x-1 group-hover:text-aims-blue"
                />
              </motion.a>
            );
          })}
        </div>
      </div>

      {/* =================================================
          STUDENT SUPPORT
      ================================================== */}
      <div className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-[0_20px_60px_rgba(7,29,73,0.06)] sm:p-9">
        <div className="flex items-center gap-3">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-aims-sky text-aims-blue">
            <GraduationCap aria-hidden="true" size={22} />
          </span>
          <h3 className="text-xl font-bold text-aims-navy sm:text-2xl">Student support</h3>
        </div>

        <div className="mt-6 divide-y divide-slate-100">
          {usefulContactDetails.studentSupport.map((contact, index) => (
            <motion.a
              key={contact.school}
              href={contact.href}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.4, delay: index * 0.08, ease: 'easeOut' }}
              className="group -mx-3 flex items-center gap-4 rounded-xl px-3 py-5 transition-colors duration-300 hover:bg-slate-50"
            >
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-aims-navy transition-colors duration-300 group-hover:bg-aims-navy group-hover:text-white">
                <Phone aria-hidden="true" size={18} />
              </span>

              <div className="min-w-0 flex-1">
                <p className="text-base font-semibold leading-6 text-aims-navy transition-colors group-hover:text-aims-blue sm:text-lg">
                  {contact.school}
                </p>
                <p className="mt-0.5 text-sm font-medium text-slate-400">{contact.coordinator}</p>
                <p className="mt-0.5 text-base font-medium text-slate-600">{contact.phone}</p>
              </div>

              <ArrowRight
                aria-hidden="true"
                size={18}
                className="shrink-0 text-slate-300 transition-all duration-300 group-hover:translate-x-1 group-hover:text-aims-blue"
              />
            </motion.a>
          ))}
        </div>
      </div>
    </div>
  </Container>
</AnimatedSection>
      {/* =====================================================
          FORM
      ====================================================== */}

      <AnimatedSection className="bg-slate-50 py-16 sm:py-20 lg:py-24">
        <Container>
          <div className="grid items-start gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
            {/* Left information */}
            <div className="lg:sticky lg:top-28">
              <SectionHeading
                eyebrow={contactPageContent.form.eyebrow}
                title={contactPageContent.form.title}
                description={contactPageContent.form.description}
              />

              <div className="relative mt-8 overflow-hidden rounded-[2rem] bg-aims-navy p-7 text-white shadow-xl sm:p-8">
                <div
                  className="pointer-events-none absolute -right-14 -top-14 h-48 w-48 rounded-full border border-white/10"
                  aria-hidden="true"
                />

                <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 text-aims-gold">
                  <MessageCircle aria-hidden="true" size={27} />
                </div>

                <h3 className="relative mt-6 text-2xl font-bold">Prefer a quick conversation?</h3>

                <p className="relative mt-3 text-base leading-7 text-blue-100">
                  Contact our admissions team directly through WhatsApp for quick assistance.
                </p>

                <a
                  href="https://wa.me/94777999177"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative mt-7 inline-flex items-center gap-2 rounded-full bg-aims-gold px-6 py-3 font-semibold text-aims-dark transition hover:-translate-y-0.5 hover:shadow-lg"
                >
                  Chat on WhatsApp
                  <ArrowRight aria-hidden="true" size={17} />
                </a>
              </div>

              <div className="mt-6 flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-5">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-aims-sky text-aims-blue">
                  <Clock3 aria-hidden="true" size={20} />
                </span>
                <div>
                  <p className="text-sm font-semibold text-aims-navy">Admissions hours</p>
                  <p className="text-sm text-slate-500">8:30 AM – 5:30 PM, every working day</p>
                </div>
              </div>
            </div>

            {/* Contact form */}
            <div className="rounded-[2.25rem] border border-slate-200 bg-white p-6 shadow-[0_20px_60px_rgba(7,29,73,0.08)] sm:p-8 lg:p-10">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex min-h-[480px] flex-col items-center justify-center text-center"
                >
                  <div className="flex h-20 w-20 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                    <CheckCircle2 aria-hidden="true" size={38} />
                  </div>

                  <h3 className="mt-7 text-3xl font-bold text-aims-navy">Enquiry captured</h3>

                  <p className="mt-4 max-w-md text-base leading-7 text-slate-600">
                    Thank you. Your enquiry has been saved and our admissions team can review it from the admin dashboard.
                  </p>

                  <button
                    type="button"
                    onClick={() => setSubmitted(false)}
                    className="mt-7 rounded-full bg-aims-navy px-7 py-3 font-semibold text-white transition hover:bg-aims-blue"
                  >
                    Send another enquiry
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {submitError ? (
                    <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
                      {submitError}
                    </div>
                  ) : null}

                  <div className="grid gap-6 sm:grid-cols-2">
                    {/* Name */}
                    <FieldShell label="Full name" htmlFor="fullName">
                      <div className="relative">
                        <User
                          aria-hidden="true"
                          size={18}
                          className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                        />
                        <input
                          id="fullName"
                          name="fullName"
                          type="text"
                          required
                          autoComplete="name"
                          placeholder="Enter your full name"
                          className="h-13 w-full rounded-xl border border-slate-200 bg-white pl-11 pr-4 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-aims-blue focus:ring-4 focus:ring-aims-blue/10"
                        />
                      </div>
                    </FieldShell>

                    {/* Phone */}
                    <FieldShell label="Phone number" htmlFor="phone">
                      <div className="relative">
                        <Phone
                          aria-hidden="true"
                          size={18}
                          className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                        />
                        <input
                          id="phone"
                          name="phone"
                          type="tel"
                          required
                          autoComplete="tel"
                          placeholder="07X XXX XXXX"
                          className="h-13 w-full rounded-xl border border-slate-200 bg-white pl-11 pr-4 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-aims-blue focus:ring-4 focus:ring-aims-blue/10"
                        />
                      </div>
                    </FieldShell>
                  </div>

                  {/* Email */}
                  <FieldShell label="Email address" htmlFor="email">
                    <div className="relative">
                      <Mail
                        aria-hidden="true"
                        size={18}
                        className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                      />
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        autoComplete="email"
                        placeholder="example@email.com"
                        className="h-13 w-full rounded-xl border border-slate-200 bg-white pl-11 pr-4 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-aims-blue focus:ring-4 focus:ring-aims-blue/10"
                      />
                    </div>
                  </FieldShell>

                  <div className="grid gap-6 sm:grid-cols-2">
                    {/* Campus */}
                    <FieldShell label="Preferred campus" htmlFor="campus">
                      <select
                        id="campus"
                        name="campus"
                        required
                        defaultValue=""
                        className="h-13 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-700 outline-none transition focus:border-aims-blue focus:ring-4 focus:ring-aims-blue/10"
                      >
                        {campusOptions.map((option: SelectOption) => (
                          <option key={option.label} value={option.value} disabled={option.value === ''}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </FieldShell>

                    {/* Programme */}
                    <FieldShell label="Programme interest" htmlFor="programme">
                      <select
                        id="programme"
                        name="programme"
                        required
                        defaultValue=""
                        className="h-13 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-700 outline-none transition focus:border-aims-blue focus:ring-4 focus:ring-aims-blue/10"
                      >
                        {programmeOptions.map((option: SelectOption) => (
                          <option key={option.label} value={option.value} disabled={option.value === ''}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </FieldShell>
                  </div>

                  {/* Subject */}
                  <FieldShell label="Subject" htmlFor="subject">
                    <input
                      id="subject"
                      name="subject"
                      type="text"
                      required
                      placeholder="How can we help?"
                      className="h-13 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-aims-blue focus:ring-4 focus:ring-aims-blue/10"
                    />
                  </FieldShell>

                  {/* Message */}
                  <FieldShell label="Message" htmlFor="message">
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={6}
                      placeholder="Tell us more about your enquiry..."
                      className="w-full resize-none rounded-xl border border-slate-200 bg-white p-4 text-sm leading-7 text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-aims-blue focus:ring-4 focus:ring-aims-blue/10"
                    />
                  </FieldShell>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex min-h-13 w-full items-center justify-center gap-2 rounded-full bg-aims-navy px-7 py-3.5 font-semibold text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-aims-blue hover:shadow-xl sm:w-auto"
                  >
                    {isSubmitting ? 'Sending...' : 'Send enquiry'}
                    <Send aria-hidden="true" size={18} />
                  </button>
                </form>
              )}
            </div>
          </div>
        </Container>
      </AnimatedSection>

      {/* =====================================================
          CAMPUS LOCATIONS
      ====================================================== */}

      <AnimatedSection className="py-16 sm:py-20 lg:py-24">
        <Container>
          <SectionHeading
            eyebrow={contactPageContent.campuses.eyebrow}
            title={contactPageContent.campuses.title}
            description={contactPageContent.campuses.description}
            centered
          />

          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            {campusLocations.map((campus: CampusLocation, index: number) => (
              <motion.article
                key={campus.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className={`relative overflow-hidden rounded-[2.25rem] border p-5 shadow-lg transition sm:p-9 ${
                  campus.featured
                    ? 'border-aims-blue/20 bg-aims-navy text-white'
                    : 'border-slate-200 bg-white text-slate-800'
                }`}
              >
                {campus.featured ? (
                  <>
                    <div
                      className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full border border-white/10"
                      aria-hidden="true"
                    />
                    <div
                      className="pointer-events-none absolute inset-0 opacity-[0.06] [background-image:radial-gradient(circle,rgba(255,255,255,0.8)_1px,transparent_1px)] [background-size:22px_22px]"
                      aria-hidden="true"
                    />
                    <span className="absolute right-7 top-7 rounded-full bg-aims-gold px-3 py-1 text-[11px] font-bold uppercase tracking-[0.14em] text-aims-dark">
                      Main campus
                    </span>
                  </>
                ) : null}

                <div
                  className={`relative flex h-14 w-14 items-center justify-center rounded-2xl ${
                    campus.featured ? 'bg-white/10 text-aims-gold' : 'bg-aims-sky text-aims-blue'
                  }`}
                >
                  <Building2 aria-hidden="true" size={27} />
                </div>

                <div className="relative">
                  <p
                    className={`mt-7 text-xs font-semibold uppercase tracking-[0.2em] ${
                      campus.featured ? 'text-aims-gold' : 'text-aims-blue'
                    }`}
                  >
                    AIMS Campus
                  </p>

                  <h3
                    className={`mt-3 text-2xl font-bold sm:text-3xl ${
                      campus.featured ? 'text-white' : 'text-aims-navy'
                    }`}
                  >
                    {campus.shortName}
                  </h3>

                  <div
                    className={`mt-5 flex items-start gap-3 ${
                      campus.featured ? 'text-blue-100' : 'text-slate-600'
                    }`}
                  >
                    <MapPin aria-hidden="true" size={20} className="mt-1 shrink-0" />
                    <span className="leading-7">{campus.location}</span>
                  </div>

                  <p className={`mt-5 leading-7 ${campus.featured ? 'text-blue-100' : 'text-slate-600'}`}>
                    {campus.description}
                  </p>

                  <div
                    className={`mt-7 space-y-3 border-t pt-6 ${
                      campus.featured ? 'border-white/10' : 'border-slate-100'
                    }`}
                  >
                    <a href="tel:01175574500" className="flex items-center gap-3 font-medium">
                      <Phone
                        aria-hidden="true"
                        size={18}
                        className={campus.featured ? 'text-aims-gold' : 'text-aims-blue'}
                      />
                      {campus.phone}
                    </a>

                    <a href={`mailto:${campus.email}`} className="flex items-center gap-3 break-all font-medium">
                      <Mail
                        aria-hidden="true"
                        size={18}
                        className={campus.featured ? 'text-aims-gold' : 'text-aims-blue'}
                      />
                      {campus.email}
                    </a>

                    <div className="flex items-center gap-3">
                      <Clock3
                        aria-hidden="true"
                        size={18}
                        className={campus.featured ? 'text-aims-gold' : 'text-aims-blue'}
                      />
                      8:30 AM – 5:30 PM
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </Container>
      </AnimatedSection>

      {/* =====================================================
          GOOGLE MAPS
      ====================================================== */}

      <AnimatedSection className="relative overflow-hidden bg-aims-section py-16 text-white sm:py-20 lg:py-24">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.05] [background-image:radial-gradient(circle,rgba(255,255,255,0.8)_1px,transparent_1px)] [background-size:26px_26px]"
          aria-hidden="true"
        />

        <Container className="relative">
          <SectionHeading
            eyebrow={contactPageContent.map.eyebrow}
            title={contactPageContent.map.title}
            description={contactPageContent.map.description}
            centered
            dark
          />

          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            {campusLocations.map((campus: CampusLocation, index: number) => {
              const mapUrl = campusMapEmbedUrls[campus.shortName];
              const isMapLoaded = Boolean(loadedMaps[campus.shortName]);
              const mapsSearchUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                campus.location,
              )}`;

              return (
                <motion.article
                  key={`${campus.name}-map`}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 p-4 shadow-2xl backdrop-blur-sm sm:p-5"
                >
                  <div className="mb-5 grid gap-4 sm:grid-cols-[1fr_auto] sm:items-start lg:min-h-[5.75rem]">
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/10 text-aims-gold">
                        <MapPin aria-hidden="true" size={19} />
                      </div>

                      <div>
                        <p className="font-semibold text-white">{campus.shortName}</p>
                        <p className="mt-1 text-sm leading-6 text-blue-100">{campus.location}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 sm:justify-end">
                      <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/10 text-aims-gold">
                        <Phone aria-hidden="true" size={18} />
                      </div>

                      <div className="sm:text-right">
                        <p className="font-semibold text-white">Admissions hotline</p>
                        <a href={`tel:${campus.phone.replace(/\D/g, '')}`} className="mt-1 block text-sm text-blue-100">
                          {campus.phone}
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="relative h-[300px] overflow-hidden rounded-[1.5rem] bg-[#06142f] sm:h-[380px]">
                    {isMapLoaded ? (
                      <iframe
                        src={mapUrl}
                        title={`AIMS Campus ${campus.shortName} location`}
                        loading="lazy"
                        referrerPolicy="no-referrer"
                        className="absolute inset-0 h-full w-full border-0"
                        allowFullScreen
                      />
                    ) : (
                      <div className="flex h-full flex-col items-center justify-center px-6 text-center">
                        <MapPin aria-hidden="true" size={36} className="text-aims-gold" />
                        <p className="mt-4 text-lg font-semibold text-white">{campus.shortName}</p>
                        <p className="mt-2 max-w-md text-sm leading-6 text-blue-100">
                          Load the Google map only when you need it.
                        </p>
                        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                          <button
                            type="button"
                            onClick={() =>
                              setLoadedMaps((current) => ({
                                ...current,
                                [campus.shortName]: true,
                              }))
                            }
                            className="inline-flex min-h-11 items-center justify-center rounded-full bg-aims-gold px-5 py-2.5 text-sm font-semibold text-aims-dark transition hover:-translate-y-0.5"
                          >
                            Load map
                          </button>
                          <a
                            href={mapsSearchUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex min-h-11 items-center justify-center rounded-full border border-white/25 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10"
                          >
                            Open in Google Maps
                          </a>
                        </div>
                      </div>
                    )}
                  </div>
                </motion.article>
              );
            })}
          </div>
        </Container>
      </AnimatedSection>

      {/* =====================================================
          SOCIAL MEDIA
      ====================================================== */}

      <AnimatedSection className="py-16 sm:py-20 lg:py-24">
        <Container>
          <SectionHeading
            eyebrow={contactPageContent.social.eyebrow}
            title={contactPageContent.social.title}
            description={contactPageContent.social.description}
            centered
          />

          <div className="mx-auto mt-10 flex max-w-3xl flex-wrap justify-center gap-4">
            {socialLinks.map((social: SocialLink) => (
              <motion.a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -4, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="group inline-flex min-w-[140px] items-center justify-center gap-3 rounded-2xl border border-slate-200 bg-white px-5 py-4 font-semibold text-aims-navy shadow-sm transition hover:border-aims-blue/25 hover:shadow-lg sm:min-w-[160px] sm:px-6"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white shadow-sm ring-1 ring-slate-200/80 transition group-hover:scale-105">
                  <SocialIcon platform={social.platform} />
                </span>
                {social.label}
              </motion.a>
            ))}
          </div>
        </Container>
      </AnimatedSection>

      {/* =====================================================
          FINAL CTA
      ====================================================== */}

      <section className="relative isolate overflow-hidden bg-aims-section py-16 text-white sm:py-20 lg:py-24">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.06] [background-image:radial-gradient(circle,rgba(255,255,255,0.8)_1px,transparent_1px)] [background-size:24px_24px]"
          aria-hidden="true"
        />

        <div
          className="pointer-events-none absolute -left-28 -top-28 h-80 w-80 rounded-full bg-aims-blue/20 blur-3xl"
          aria-hidden="true"
        />

        <div
          className="pointer-events-none absolute -bottom-32 -right-24 h-96 w-96 rounded-full bg-[#123f91]/45 blur-3xl"
          aria-hidden="true"
        />

        <Container className="relative z-10">
          <motion.div {...sectionReveal} className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-aims-gold">
              {contactPageContent.cta.eyebrow}
            </p>

            <h2 className="mt-4 text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
              {contactPageContent.cta.title}
            </h2>

            <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-blue-100 sm:text-lg">
              {contactPageContent.cta.description}
            </p>

            <div className="mx-auto mt-8 flex max-w-sm flex-col gap-3 sm:max-w-none sm:flex-row sm:flex-wrap sm:justify-center sm:gap-4">
              <Link
                to={contactPageContent.cta.primaryHref}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-aims-gold px-7 py-3.5 font-semibold text-aims-dark transition hover:-translate-y-0.5 hover:shadow-xl"
              >
                {contactPageContent.cta.primaryLabel}
                <ArrowRight aria-hidden="true" size={18} />
              </Link>

              <a
                href={contactPageContent.cta.secondaryHref}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/35 px-7 py-3.5 font-semibold text-white transition hover:bg-white/10"
              >
                <Phone aria-hidden="true" size={18} />
                {contactPageContent.cta.secondaryLabel}
              </a>
            </div>
          </motion.div>
        </Container>
      </section>
    </div>
  );
}
