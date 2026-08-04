import { useCallback, useEffect, useState, type ReactNode } from 'react';

import useEmblaCarousel from 'embla-carousel-react';
import { motion } from 'motion/react';
import { ArrowLeft, ArrowRight, Award, CheckCircle2, Quote } from 'lucide-react';
import { Link } from 'react-router-dom';

import { Container } from '../components/common/Container';
import {
  academicLeadershipProfiles,
  aboutPageContent,
  aboutStats,
  academicPartners,
  academicPathways,
  campusLocations,
  excellencePillars,
  historyMilestones,
  institutionalHighlights,
  lifeAtAimsItems,
  researchGallery,
  studentLifeGallery,
} from '../data/about';
import type { AcademicLeaderProfile, SectionIntro } from '../types/about';

const sectionReveal = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.15 },
  transition: { duration: 0.55, ease: 'easeOut' },
} as const;

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

function SectionIntroBlock({
  content,
  centered = false,
}: {
  content: SectionIntro;
  centered?: boolean;
}) {
  return (
    <div className={centered ? 'mx-auto max-w-3xl text-center' : 'max-w-3xl'}>
      <p className="font-semibold uppercase tracking-[0.2em] text-aims-blue">
        {content.eyebrow}
      </p>
      <h2 className="mt-4 text-3xl font-bold leading-tight text-aims-navy sm:text-4xl lg:text-5xl">
        {content.title}
      </h2>
      {content.description ? (
        <p className="mt-5 text-base leading-8 text-slate-600 sm:text-lg">
          {content.description}
        </p>
      ) : null}
    </div>
  );
}

function getProfileInitials(name: string) {
  const cleanedName = name
    .replace('Prof. (Dr.)', '')
    .replace('Prof.', '')
    .replace('Dr.', '')
    .replace('Mr.', '')
    .replace('Ms.', '')
    .trim();
  const parts = cleanedName.split(/\s+/).filter(Boolean);

  if (parts.length === 0) {
    return 'AC';
  }

  if (parts.length === 1) {
    return parts[0].slice(0, 2).toUpperCase();
  }

  return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
}

function AcademicLeadershipCarousel({
  profiles,
}: {
  profiles: AcademicLeaderProfile[];
}) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'start',
    loop: true,
  });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);
  const [isPaused, setIsPaused] = useState(false);

  const scrollPrev = useCallback(() => {
    emblaApi?.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    emblaApi?.scrollNext();
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) {
      return;
    }

    const onSelect = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
      setScrollSnaps(emblaApi.scrollSnapList());
    };

    onSelect();
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);

    return () => {
      emblaApi.off('select', onSelect);
      emblaApi.off('reInit', onSelect);
    };
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi || isPaused) {
      return;
    }

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const autoplayId = window.setInterval(() => {
      emblaApi.scrollNext();
    }, 4800);

    return () => window.clearInterval(autoplayId);
  }, [emblaApi, isPaused]);

  return (
    <div
      className="mt-12"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <p className="max-w-2xl text-sm leading-7 text-blue-100 sm:text-base">
          Names and role details are arranged from the governance and senate information visible in the materials you shared.
        </p>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={scrollPrev}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white transition hover:bg-white/18"
            aria-label="Show previous academic leadership profile"
          >
            <ArrowLeft aria-hidden="true" size={18} />
          </button>
          <button
            type="button"
            onClick={scrollNext}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white transition hover:bg-white/18"
            aria-label="Show next academic leadership profile"
          >
            <ArrowRight aria-hidden="true" size={18} />
          </button>
        </div>
      </div>

      <div className="overflow-hidden" ref={emblaRef}>
        <div className="-ml-4 flex">
          {profiles.map((profile) => (
            <div
              key={profile.name}
              className="min-w-0 flex-[0_0_100%] pl-4 sm:flex-[0_0_50%] xl:flex-[0_0_33.333%]"
            >
              <motion.article
                whileHover={{ y: -5 }}
                transition={{ duration: 0.2 }}
                className="flex h-full flex-col rounded-[1.75rem] border border-white/10 bg-white p-7 text-slate-800 shadow-xl"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-aims-sky text-lg font-bold text-aims-blue">
                    {getProfileInitials(profile.name)}
                  </div>

                  <div className="flex flex-wrap justify-end gap-2">
                    {profile.groups.map((group) => (
                      <span
                        key={`${profile.name}-${group}`}
                        className="rounded-full bg-aims-sky px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-aims-blue"
                      >
                        {group}
                      </span>
                    ))}
                  </div>
                </div>

                <h3 className="mt-6 text-2xl font-bold leading-tight text-aims-navy">
                  {profile.name}
                </h3>
                <p className="mt-4 text-base leading-7 text-slate-600">
                  {profile.title}
                </p>
              </motion.article>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-2">
        {scrollSnaps.map((_, index) => (
          <button
            key={index}
            type="button"
            onClick={() => emblaApi?.scrollTo(index)}
            aria-label={`Go to academic leadership slide ${index + 1}`}
            className={`h-2.5 rounded-full transition-all ${
              index === selectedIndex
                ? 'w-8 bg-aims-gold'
                : 'w-2.5 bg-white/35 hover:bg-white/55'
            }`}
          />
        ))}
      </div>
    </div>
  );
}

export function AboutPage() {
  return (
    <div className="bg-white text-slate-800">
      <section className="relative isolate flex min-h-[70vh] items-center overflow-hidden bg-aims-navy text-white">
        <img
          src={aboutPageContent.hero.image}
          alt={aboutPageContent.hero.imageAlt}
          aria-hidden={aboutPageContent.hero.imageAlt === '' ? 'true' : undefined}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div
          className="absolute inset-0 bg-linear-to-r from-[#04122d]/95 via-[#071d49]/88 to-[#123f91]/76"
          aria-hidden="true"
        />
        <div
          className="absolute inset-x-0 bottom-0 h-40 bg-linear-to-t from-[#04122d]/80 to-transparent"
          aria-hidden="true"
        />

        <Container className="relative z-10 py-20 sm:py-24 lg:py-28">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: 'easeOut' }}
            className="max-w-3xl"
          >
            <p className="font-semibold uppercase tracking-[0.24em] text-aims-gold">
              {aboutPageContent.hero.eyebrow}
            </p>
            <h1 className="mt-5 text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
              {aboutPageContent.hero.title}
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-blue-100 sm:text-lg">
              {aboutPageContent.hero.description}
            </p>
          </motion.div>

          <dl className="mt-12 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {aboutStats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.12 * index, duration: 0.45, ease: 'easeOut' }}
                className="rounded-[1.75rem] border border-white/15 bg-white/10 p-5 shadow-lg backdrop-blur-sm sm:p-6"
              >
                <dt className="text-sm uppercase tracking-[0.16em] text-blue-100">
                  {stat.label}
                </dt>
                <dd className="mt-4 text-3xl font-bold text-white sm:text-4xl">
                  {stat.value}
                </dd>
              </motion.div>
            ))}
          </dl>
        </Container>
      </section>

      <AnimatedSection className="py-18 sm:py-20 lg:py-24">
        <Container>
          <div className="grid gap-6 lg:grid-cols-2">
            <motion.article
              whileHover={{ y: -4 }}
              transition={{ duration: 0.2 }}
              className="rounded-[2rem] bg-aims-navy p-8 text-white shadow-xl sm:p-10"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 text-aims-gold">
                <Award aria-hidden="true" size={28} />
              </div>
              <p className="mt-7 text-sm font-semibold uppercase tracking-[0.2em] text-aims-gold">
                {aboutPageContent.vision.title}
              </p>
              <p className="mt-5 text-2xl font-semibold leading-10">
                {aboutPageContent.vision.description}
              </p>
            </motion.article>

            <motion.article
              whileHover={{ y: -4 }}
              transition={{ duration: 0.2 }}
              className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-lg sm:p-10"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-aims-sky text-aims-blue">
                <CheckCircle2 aria-hidden="true" size={28} />
              </div>
              <p className="mt-7 text-sm font-semibold uppercase tracking-[0.2em] text-aims-blue">
                {aboutPageContent.mission.title}
              </p>
              <p className="mt-5 text-base leading-8 text-slate-600 sm:text-lg">
                {aboutPageContent.mission.description}
              </p>
            </motion.article>
          </div>
        </Container>
      </AnimatedSection>

      <AnimatedSection className="bg-aims-surface py-18 sm:py-20 lg:py-24">
        <Container>
          <div className="grid items-center gap-10 lg:grid-cols-[1fr_1.05fr] lg:gap-14">
            <div className="relative overflow-hidden rounded-[2rem] shadow-xl">
              <img
                src={aboutPageContent.introduction.image}
                alt={aboutPageContent.introduction.imageAlt}
                loading="lazy"
                className="h-full min-h-80 w-full object-cover"
              />
              <div
                className="absolute inset-x-0 bottom-0 h-32 bg-linear-to-t from-[#04122d]/70 to-transparent"
                aria-hidden="true"
              />
              <div className="absolute left-5 top-5 rounded-full bg-white/92 px-5 py-3 text-sm font-semibold text-aims-navy shadow-lg">
                {aboutPageContent.introduction.imageBadge}
              </div>
            </div>

            <div>
              <SectionIntroBlock content={aboutPageContent.introduction} />
              <div className="mt-8 space-y-5">
                {aboutPageContent.introduction.paragraphs.map((paragraph) => (
                  <p
                    key={paragraph}
                    className="text-base leading-8 text-slate-600 sm:text-lg"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </AnimatedSection>

      <AnimatedSection className="py-18 sm:py-20 lg:py-24">
        <Container>
          <SectionIntroBlock content={aboutPageContent.pillars} centered />
          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-5">
            {excellencePillars.map(({ title, description, icon: Icon }) => (
              <motion.article
                key={title}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.2 }}
                className="rounded-[1.75rem] border border-slate-100 bg-white p-7 shadow-sm hover:border-aims-blue/15 hover:shadow-xl"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-aims-sky text-aims-blue">
                  <Icon aria-hidden="true" size={28} />
                </div>
                <h3 className="mt-6 text-xl font-bold text-aims-navy">{title}</h3>
                <p className="mt-3 text-base leading-7 text-slate-600">{description}</p>
              </motion.article>
            ))}
          </div>
        </Container>
      </AnimatedSection>

      <AnimatedSection className="bg-aims-navy py-18 text-white sm:py-20 lg:py-24">
        <Container>
          <div className="grid items-center gap-10 lg:grid-cols-[0.92fr_1.08fr]">
            <div className="relative overflow-hidden rounded-[2rem]">
              <img
                src={aboutPageContent.history.image}
                alt={aboutPageContent.history.imageAlt}
                loading="lazy"
                className="h-full min-h-80 w-full object-cover"
              />
              <div
                className="absolute inset-0 bg-linear-to-t from-[#04122d]/75 via-[#071d49]/20 to-transparent"
                aria-hidden="true"
              />
            </div>

            <div>
              <div className="max-w-3xl">
                <p className="font-semibold uppercase tracking-[0.2em] text-aims-gold">
                  {aboutPageContent.history.eyebrow}
                </p>
                <h2 className="mt-4 text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
                  {aboutPageContent.history.title}
                </h2>
                <p className="mt-5 text-base leading-8 text-blue-100 sm:text-lg">
                  {aboutPageContent.history.description}
                </p>
              </div>

              <div className="mt-10 grid gap-5 sm:grid-cols-2">
                {historyMilestones.map((milestone) => (
                  <article
                    key={`${milestone.year}-${milestone.title}`}
                    className="rounded-[1.75rem] border border-white/10 bg-white/6 p-6 shadow-lg backdrop-blur-sm"
                  >
                    <p className="text-sm font-semibold uppercase tracking-[0.18em] text-aims-gold">
                      {milestone.year}
                    </p>
                    <h3 className="mt-4 text-xl font-bold text-white">
                      {milestone.title}
                    </h3>
                    <p className="mt-3 text-base leading-7 text-blue-100">
                      {milestone.description}
                    </p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </AnimatedSection>

      <AnimatedSection className="py-18 sm:py-20 lg:py-24">
        <Container>
          <SectionIntroBlock content={aboutPageContent.partners} centered />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {academicPartners.map((partner) => (
              <motion.article
                key={partner.name}
                whileHover={{ y: -5 }}
                transition={{ duration: 0.2 }}
                className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm hover:shadow-lg"
              >
                <div className="flex h-24 items-center justify-center rounded-2xl bg-slate-50 p-4">
                  <img
                    src={partner.logo}
                    alt={partner.logoAlt}
                    loading="lazy"
                    className="max-h-full w-full object-contain"
                  />
                </div>
                <h3 className="mt-6 text-xl font-bold text-aims-navy">{partner.name}</h3>
                <p className="mt-2 font-medium text-aims-blue">{partner.country}</p>
                <p className="mt-3 text-base leading-7 text-slate-600">
                  {partner.relationship}
                </p>
              </motion.article>
            ))}
          </div>
        </Container>
      </AnimatedSection>

      <AnimatedSection className="bg-aims-sky py-18 sm:py-20 lg:py-24">
        <Container>
          <SectionIntroBlock content={aboutPageContent.pathways} />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {academicPathways.map((pathway) => (
              <motion.article
                key={pathway.title}
                whileHover={{ y: -5 }}
                transition={{ duration: 0.2 }}
                className="rounded-[1.75rem] bg-white p-7 shadow-sm hover:shadow-lg"
              >
                <h3 className="text-xl font-bold text-aims-navy">{pathway.title}</h3>
                <p className="mt-4 text-base leading-7 text-slate-600">
                  {pathway.description}
                </p>
              </motion.article>
            ))}
          </div>
        </Container>
      </AnimatedSection>

      <AnimatedSection className="py-18 sm:py-20 lg:py-24">
        <Container>
          <SectionIntroBlock content={aboutPageContent.campuses} />
          <div className="mt-12 grid gap-8 xl:grid-cols-3">
            {campusLocations.map((campus) => (
              <motion.article
                key={campus.name}
                whileHover={{ y: -5 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white shadow-sm hover:shadow-lg"
              >
                <img
                  src={campus.image}
                  alt={campus.imageAlt}
                  loading="lazy"
                  className="h-56 w-full object-cover"
                />
                <div className="p-7">
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-aims-blue">
                    {campus.type}
                  </p>
                  <h3 className="mt-3 text-2xl font-bold text-aims-navy">{campus.name}</h3>
                  <address className="mt-5 not-italic text-base leading-7 text-slate-600">
                    {campus.address.map((line) => (
                      <span key={`${campus.name}-${line}`} className="block">
                        {line}
                      </span>
                    ))}
                  </address>
                  <p className="mt-5 text-base leading-7 text-slate-600">
                    {campus.description}
                  </p>
                </div>
              </motion.article>
            ))}
          </div>
        </Container>
      </AnimatedSection>

      <AnimatedSection className="bg-aims-surface py-18 sm:py-20 lg:py-24">
        <Container>
          <SectionIntroBlock content={aboutPageContent.lifeAtAims} centered />
          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {lifeAtAimsItems.map(({ title, description, icon: Icon }) => (
              <motion.article
                key={title}
                whileHover={{ y: -5 }}
                transition={{ duration: 0.2 }}
                className="rounded-[1.75rem] bg-white p-7 shadow-sm hover:shadow-lg"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-aims-sky text-aims-blue">
                  <Icon aria-hidden="true" size={28} />
                </div>
                <h3 className="mt-6 text-xl font-bold text-aims-navy">{title}</h3>
                <p className="mt-3 text-base leading-7 text-slate-600">{description}</p>
              </motion.article>
            ))}
          </div>

          <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-12 lg:grid-rows-2">
            {studentLifeGallery.map((image, index) => {
              const layoutClassName =
                index === 0
                  ? 'lg:col-span-5 lg:row-span-2'
                  : index === 1
                    ? 'lg:col-span-7'
                    : index === 2
                      ? 'lg:col-span-4'
                      : 'lg:col-span-3';

              return (
                <motion.figure
                  key={image.title}
                  whileHover={{ scale: 1.01 }}
                  transition={{ duration: 0.2 }}
                  className={`overflow-hidden rounded-[1.75rem] shadow-md ${layoutClassName}`}
                >
                  <img
                    src={image.image}
                    alt={image.alt}
                    loading="lazy"
                    className={`w-full object-cover ${
                      index === 0 ? 'h-80 sm:h-96 lg:h-full' : 'h-60 sm:h-72 lg:h-full'
                    }`}
                  />
                </motion.figure>
              );
            })}
          </div>
        </Container>
      </AnimatedSection>

      <AnimatedSection className="py-18 sm:py-20 lg:py-24">
        <Container>
          <SectionIntroBlock content={aboutPageContent.governance} />
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {institutionalHighlights.map(({ title, description, icon: Icon }) => (
              <motion.article
                key={title}
                whileHover={{ y: -5 }}
                transition={{ duration: 0.2 }}
                className="rounded-[1.75rem] border border-slate-200 bg-white p-8 shadow-sm hover:shadow-lg"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-aims-sky text-aims-blue">
                  <Icon aria-hidden="true" size={28} />
                </div>
                <h3 className="mt-6 text-2xl font-bold text-aims-navy">{title}</h3>
                <p className="mt-4 text-base leading-8 text-slate-600">{description}</p>
              </motion.article>
            ))}
          </div>
        </Container>
      </AnimatedSection>

      <AnimatedSection className="bg-aims-navy py-18 text-white sm:py-20 lg:py-24">
        <Container>
          <div className="max-w-3xl">
            <p className="font-semibold uppercase tracking-[0.2em] text-aims-gold">
              {aboutPageContent.academicLeadership.eyebrow}
            </p>
            <h2 className="mt-4 text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
              {aboutPageContent.academicLeadership.title}
            </h2>
            <p className="mt-5 text-base leading-8 text-blue-100 sm:text-lg">
              {aboutPageContent.academicLeadership.description}
            </p>
          </div>

          <AcademicLeadershipCarousel profiles={academicLeadershipProfiles} />
        </Container>
      </AnimatedSection>

      <AnimatedSection className="bg-aims-sky py-18 sm:py-20 lg:py-24">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-end">
            <SectionIntroBlock content={aboutPageContent.research} />
            <div className="rounded-[1.75rem] border border-aims-blue/10 bg-white p-6 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-aims-sky text-aims-blue">
                  <Quote aria-hidden="true" size={22} />
                </div>
                <p className="text-base leading-7 text-slate-600">
                  Research-focused events at AIMS Campus are designed to strengthen academic dialogue, professional exchange and doctoral community building.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-12 grid gap-4 lg:grid-cols-3 lg:grid-rows-2">
            {researchGallery.map((image, index) => (
              <motion.figure
                key={image.title}
                whileHover={{ scale: 1.01 }}
                transition={{ duration: 0.2 }}
                className={`overflow-hidden rounded-[1.75rem] shadow-md ${
                  index === 0 ? 'lg:col-span-2 lg:row-span-2' : ''
                }`}
              >
                <img
                  src={image.image}
                  alt={image.alt}
                  loading="lazy"
                  className={`w-full object-cover ${
                    index === 0 ? 'h-80 sm:h-[28rem] lg:h-full' : 'h-64 sm:h-72 lg:h-full'
                  }`}
                />
              </motion.figure>
            ))}
          </div>
        </Container>
      </AnimatedSection>

      <section className="relative isolate overflow-hidden py-20 text-white sm:py-24">
        <img
          src={aboutPageContent.cta.image}
          alt={aboutPageContent.cta.imageAlt}
          aria-hidden={aboutPageContent.cta.imageAlt === '' ? 'true' : undefined}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div
          className="absolute inset-0 bg-linear-to-r from-[#04122d]/95 via-[#071d49]/88 to-[#123f91]/78"
          aria-hidden="true"
        />

        <Container className="relative z-10">
          <motion.div
            {...sectionReveal}
            className="mx-auto max-w-3xl text-center"
          >
            <p className="font-semibold uppercase tracking-[0.2em] text-aims-gold">
              Ready for what comes next
            </p>
            <h2 className="mt-4 text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
              {aboutPageContent.cta.title}
            </h2>
            <p className="mt-5 text-base leading-8 text-blue-100 sm:text-lg">
              {aboutPageContent.cta.description}
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link
                to={aboutPageContent.cta.primaryHref}
                className="inline-flex items-center gap-2 rounded-full bg-aims-gold px-7 py-3.5 font-semibold text-aims-dark transition hover:-translate-y-0.5 hover:shadow-xl"
              >
                {aboutPageContent.cta.primaryLabel}
                <ArrowRight aria-hidden="true" size={18} />
              </Link>
              <Link
                to={aboutPageContent.cta.secondaryHref}
                className="inline-flex items-center rounded-full border border-white/40 px-7 py-3.5 font-semibold text-white transition hover:bg-white/10"
              >
                {aboutPageContent.cta.secondaryLabel}
              </Link>
            </div>
          </motion.div>
        </Container>
      </section>
    </div>
  );
}
