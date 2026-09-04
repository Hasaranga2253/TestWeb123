import { useEffect, useRef, useState, type ReactNode } from 'react';

import { motion } from 'motion/react';
import { ArrowRight, Award, CheckCircle2, Quote } from 'lucide-react';
import { Link } from 'react-router-dom';

import { Container } from '../components/common/Container';
import aboutHeroVideo from '../assets/videos/Sequence 02.mp4';
import historyVideo from '../assets/videos/AMIS_Campus_Video_v2.mp4';
import {
  aboutPageContent,
  aboutStats,
  boardGovernanceMembers,
  excellencePillars,
  senateMembers,
} from '../data/about';
import type { SectionIntro } from '../types/about';

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

function LazyDecorativeVideo({
  src,
  eager = false,
  className,
}: {
  src: string;
  eager?: boolean;
  className: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [shouldLoad, setShouldLoad] = useState(eager);
  const [allowMotion, setAllowMotion] = useState(true);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const syncMotionPreference = () => setAllowMotion(!mediaQuery.matches);

    syncMotionPreference();
    mediaQuery.addEventListener('change', syncMotionPreference);

    return () => {
      mediaQuery.removeEventListener('change', syncMotionPreference);
    };
  }, []);

  useEffect(() => {
    if (eager || shouldLoad) {
      return;
    }

    const target = containerRef.current;

    if (!target || !('IntersectionObserver' in window)) {
      setShouldLoad(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin: '360px 0px' },
    );

    observer.observe(target);

    return () => {
      observer.disconnect();
    };
  }, [eager, shouldLoad]);

  return (
    <div ref={containerRef} className={className}>
      {allowMotion && shouldLoad ? (
        <video
          aria-hidden="true"
          autoPlay
          loop
          muted
          playsInline
          disablePictureInPicture
          controls={false}
          preload={eager ? 'metadata' : 'none'}
          className="h-full w-full object-cover"
        >
          <source src={src} type="video/mp4" />
        </video>
      ) : null}
    </div>
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

function FloatingPillars({
  pillars,
}: {
  pillars: typeof excellencePillars;
}) {
  const accents = [
    { tile: 'from-sky-400/25 to-blue-500/10', icon: 'text-sky-600' },
    { tile: 'from-violet-400/25 to-purple-500/10', icon: 'text-violet-600' },
    { tile: 'from-emerald-400/25 to-teal-500/10', icon: 'text-emerald-600' },
    { tile: 'from-amber-400/25 to-orange-500/10', icon: 'text-amber-600' },
    { tile: 'from-rose-400/25 to-pink-500/10', icon: 'text-rose-600' },
  ];

  return (
    <div className="mt-20 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
      {pillars.map(({ title, description, icon: Icon }, index) => {
        const accent = accents[index % accents.length];
        const duration = 3.4 + index * 0.35;
        const delay = index * 0.25;

        return (
          <motion.div
            key={title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: index * 0.08, ease: 'easeOut' }}
            className="w-full"
          >
            <motion.article
              animate={{
                y: [0, -14, 0],
                rotate: [0, index % 2 === 1 ? -1.5 : 1.5, 0],
              }}
              transition={{
                duration,
                delay,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              whileHover={{ scale: 1.05 }}
              className="group relative flex flex-col items-center rounded-[2rem] border-2 border-aims-blue/20 bg-white p-7 text-center shadow-[0_20px_45px_rgba(7,29,73,0.09)] transition-all duration-300 hover:border-aims-blue/45 hover:shadow-[0_30px_60px_rgba(7,29,73,0.16)]"
            >

              <div
                className={`flex h-16 w-16 items-center justify-center rounded-full bg-linear-to-br ${accent.tile} shadow-inner ring-1 ring-white/70`}
              >
                <Icon aria-hidden="true" size={26} className={accent.icon} />
              </div>

              <h3 className="mt-5 text-lg font-bold leading-snug text-aims-navy">
                {title}
              </h3>
              <p className="mt-3 text-sm leading-6 text-slate-500">
                {description}
              </p>
            </motion.article>

            <motion.div
              aria-hidden="true"
              animate={{
                scaleX: [1, 0.55, 1],
                opacity: [0.4, 0.15, 0.4],
              }}
              transition={{
                duration,
                delay,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="mx-auto mt-4 h-3 w-2/3 rounded-full bg-slate-900/10 blur-md"
            />
          </motion.div>
        );
      })}
    </div>
  );
}

export function AboutPage() {
  return (
    <div className="bg-white text-slate-800">
      <section className="relative isolate flex min-h-[560px] items-center overflow-hidden text-white sm:min-h-[70vh]">
        <LazyDecorativeVideo
          src={aboutHeroVideo}
          eager
          className="pointer-events-none absolute inset-0 h-full w-full bg-aims-section"
        />

  {/* LIGHT BLUE / NAVY MASK */}
  <div
    className="pointer-events-none absolute inset-0 bg-[#06245a]/40"
    aria-hidden="true"
  />

  {/* Slightly stronger mask behind left-side text */}
  <div
    className="pointer-events-none absolute inset-0 bg-linear-to-r from-[#041a43]/35 via-[#0b3d82]/15 to-transparent"
    aria-hidden="true"
  />
         <Container className="relative z-10 py-16 sm:py-24 lg:py-28">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: 'easeOut' }}
            className="max-w-3xl"
          >
            <p className="font-semibold uppercase tracking-[0.24em] text-aims-gold">
              {aboutPageContent.hero.eyebrow}
            </p>
            <h1 className="mt-5 text-3xl font-bold leading-tight sm:text-5xl lg:text-6xl">
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
                className="rounded-[1.75rem] border border-white/15 bg-[#061d49]/35 p-5 shadow-lg backdrop-blur-sm sm:p-6"
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
              className="rounded-[2rem] bg-aims-navy p-6 text-white shadow-xl sm:p-10"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 text-aims-gold">
                <Award aria-hidden="true" size={28} />
              </div>
              <p className="mt-7 text-sm font-semibold uppercase tracking-[0.2em] text-aims-gold">
                {aboutPageContent.vision.title}
              </p>
              <p className="mt-5 text-xl font-semibold leading-8 sm:text-2xl sm:leading-10">
                {aboutPageContent.vision.description}
              </p>
            </motion.article>

            <motion.article
              whileHover={{ y: -4 }}
              transition={{ duration: 0.2 }}
              className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-lg sm:p-10"
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

      <AnimatedSection className="py-18 sm:py-20 lg:py-24">
        <Container>
          <div className="relative isolate grid overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white shadow-2xl sm:rounded-[2.5rem] lg:grid-cols-[1.1fr_0.9fr]">
            {/* message */}
            <div className="relative px-7 py-10 sm:px-10 sm:py-12 lg:p-14">
              <Quote
                aria-hidden="true"
                size={120}
                strokeWidth={1}
                className="pointer-events-none absolute -left-2 -top-4 text-aims-sky"
              />

              <div className="relative">
                <span className="inline-flex items-center gap-2 rounded-full bg-aims-sky px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-aims-blue">
                  {aboutPageContent.chairmanMessage.role} · {aboutPageContent.chairmanMessage.campus}
                </span>

                <p className="mt-6 text-xl font-semibold leading-relaxed text-aims-navy sm:text-2xl">
                  {aboutPageContent.chairmanMessage.paragraphs[0]}
                </p>

                <div className="mt-7 space-y-5">
                  {aboutPageContent.chairmanMessage.paragraphs.slice(1).map((paragraph) => (
                    <p
                      key={paragraph}
                      className="text-base leading-7 text-slate-600 sm:text-[1.05rem]"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>

                <div className="mt-9 flex items-center gap-4 border-t border-slate-100 pt-7">
                  <span className="h-px w-10 shrink-0 bg-aims-gold" aria-hidden="true" />
                  <div>
                    <p className="font-serif text-2xl italic text-aims-navy">
                      {aboutPageContent.chairmanMessage.name}
                    </p>
                    <p className="mt-1 text-sm uppercase tracking-[0.16em] text-slate-400">
                      {aboutPageContent.chairmanMessage.role} · {aboutPageContent.chairmanMessage.campus}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* portrait */}
            <div className="relative flex flex-col overflow-hidden bg-aims-navy px-7 pb-0 pt-10 text-white sm:px-10 lg:px-12">
              <div
                className="pointer-events-none absolute inset-0 opacity-[0.06] [background-image:radial-gradient(circle,rgba(255,255,255,0.8)_1px,transparent_1px)] [background-size:22px_22px]"
                aria-hidden="true"
              />
              <div
                className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full border border-white/10"
                aria-hidden="true"
              />

              <div className="relative z-10 max-w-xs">
                <p className="text-base font-bold uppercase tracking-[0.24em] text-aims-gold sm:text-lg">
                  {aboutPageContent.chairmanMessage.title}
                </p>
                <p className="mt-4 text-base font-medium leading-7 text-blue-100 sm:text-lg sm:leading-8">
                  A note to every student and graduate of {aboutPageContent.chairmanMessage.campus}.
                </p>
              </div>

              <div className="relative z-10 mt-8 flex min-h-[22rem] flex-1 items-end justify-center sm:min-h-[32rem] lg:justify-end">
                <img
                  src={aboutPageContent.chairmanMessage.image}
                  alt={aboutPageContent.chairmanMessage.imageAlt}
                  loading="lazy"
                  decoding="async"
                  className="h-[28rem] w-auto max-w-full object-contain object-bottom drop-shadow-2xl sm:h-[40rem] lg:-mr-10 lg:h-[46rem] lg:max-w-none xl:-mr-14 xl:h-[50rem]"
                />
              </div>
            </div>
          </div>
        </Container>
      </AnimatedSection>

       <AnimatedSection className="bg-aims-section py-18 text-white sm:py-20 lg:py-24">
        <Container>
          <div className="max-w-2xl">
            <p className="font-semibold uppercase tracking-[0.24em] text-aims-gold">
              Governance
            </p>

            <div className="relative mt-5 inline-block overflow-hidden rounded-2xl bg-black px-6 py-5 shadow-[0_20px_50px_rgba(0,0,0,0.35)] sm:px-8 sm:py-6">
              <span className="absolute inset-y-0 left-0 w-1.5 bg-aims-gold" aria-hidden="true" />
              <h2 className="pl-3 text-2xl font-bold uppercase leading-tight tracking-[0.04em] sm:text-4xl sm:tracking-[0.06em] lg:text-5xl">
                Board of Governance
                <span className="block text-aims-gold">of AIMS Campus</span>
              </h2>
            </div>

            <p className="mt-6 text-base leading-7 text-blue-100 sm:text-lg">
              The senior leadership guiding strategy, academic oversight and institutional direction at AIMS Campus.
            </p>
          </div>

          <div className="mt-16 grid grid-cols-2 gap-x-6 gap-y-14 sm:grid-cols-3 lg:grid-cols-4 lg:gap-x-10">
            {boardGovernanceMembers.map((member) => (
              <motion.figure
                key={member.name}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.2 }}
                className="group mx-auto w-full max-w-[11rem] text-center"
              >
                <div className="relative mx-auto h-28 w-28 overflow-hidden rounded-full border-4 border-white/10 shadow-xl transition duration-300 group-hover:border-aims-gold/70 sm:h-32 sm:w-32">
                  <img
                    src={member.image}
                    alt={member.imageAlt}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full scale-[1.7] object-cover object-top transition duration-300 group-hover:scale-[1.8]"
                  />
                  <div
                    className="absolute inset-0 rounded-full ring-1 ring-inset ring-white/15"
                    aria-hidden="true"
                  />
                </div>

                <figcaption className="mt-5">
                  <p className="text-base font-semibold leading-6 tracking-[0.04em] text-white">
                    {member.name}
                  </p>
                  <span className="mt-2 inline-block text-[11px] font-semibold uppercase tracking-[0.16em] text-aims-gold/80">
                    Board of Governance
                  </span>
                </figcaption>
              </motion.figure>
            ))}
          </div>
        </Container>
      </AnimatedSection>


      <AnimatedSection className="bg-aims-section py-18 text-white sm:py-20 lg:py-24">
        <Container>
          <div className="max-w-2xl">
            <p className="font-semibold uppercase tracking-[0.24em] text-aims-gold">
              {aboutPageContent.academicLeadership.eyebrow}
            </p>

            <div className="relative mt-5 inline-block overflow-hidden rounded-2xl bg-black px-6 py-5 shadow-[0_20px_50px_rgba(0,0,0,0.35)] sm:px-8 sm:py-6">
              <span className="absolute inset-y-0 left-0 w-1.5 bg-aims-gold" aria-hidden="true" />
              <h2 className="pl-3 text-2xl font-bold uppercase leading-tight tracking-[0.04em] sm:text-4xl sm:tracking-[0.06em] lg:text-5xl">
                Senate
                <span className="block text-aims-gold">of AIMS Campus</span>
              </h2>
            </div>

            <p className="mt-6 text-base leading-7 text-blue-100 sm:text-lg">
              {aboutPageContent.academicLeadership.description}
            </p>
          </div>

          <div className="mt-16 flex flex-wrap justify-center gap-x-6 gap-y-14 lg:gap-x-10">
            {senateMembers.map((member) => (
              <motion.figure
                key={member.name}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.2 }}
                className="group w-[calc(50%-0.75rem)] max-w-[14rem] text-center sm:w-[calc(33.333%-1.25rem)]"
              >
                <div className="relative mx-auto h-28 w-28 overflow-hidden rounded-full border-4 border-white/10 shadow-xl transition duration-300 group-hover:border-aims-gold/70 sm:h-32 sm:w-32">
                  <img
                    src={member.image}
                    alt={member.imageAlt}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full scale-[1.7] object-cover object-top transition duration-300 group-hover:scale-[1.8]"
                  />
                  <div
                    className="absolute inset-0 rounded-full ring-1 ring-inset ring-white/15"
                    aria-hidden="true"
                  />
                </div>

                <figcaption className="mt-5">
                  <p className="text-base font-semibold leading-6 tracking-[0.04em] text-white">
                    {member.name}
                  </p>
                  <span className="mt-2 inline-block text-[11px] font-semibold uppercase leading-5 tracking-[0.12em] text-aims-gold/80">
                    {member.title}
                  </span>
                </figcaption>
              </motion.figure>
            ))}
          </div>
        </Container>
      </AnimatedSection>


      <AnimatedSection className="py-18 sm:py-20 lg:py-24">
        <Container>
          <SectionIntroBlock content={aboutPageContent.pillars} centered />
          <FloatingPillars pillars={excellencePillars} />
        </Container>
      </AnimatedSection>

<section className="bg-white">
  {/* HISTORY TEXT - ABOVE THE VIDEO */}
  <div className="relative py-14 sm:py-16 lg:py-20">
    <Container>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{
          duration: 0.6,
          ease: 'easeOut',
        }}
        className="mx-auto max-w-5xl text-center"
      >
        <p className="font-semibold uppercase tracking-[0.24em] text-aims-gold">
          {aboutPageContent.history.eyebrow}
        </p>

        <h2 className="mx-auto mt-5 max-w-4xl text-3xl font-bold leading-[1.08] text-aims-navy sm:text-5xl lg:text-6xl">
          {aboutPageContent.history.title}
        </h2>

        <p className="mx-auto mt-6 max-w-3xl text-base leading-8 text-slate-600 sm:text-lg lg:text-xl">
          {aboutPageContent.history.description}
        </p>
      </motion.div>
    </Container>
  </div>

  {/* VIDEO - BELOW THE TEXT */}
  <div className="relative h-[320px] overflow-hidden sm:h-[520px] lg:h-[620px]">
    <LazyDecorativeVideo
      src={historyVideo}
      className="pointer-events-none absolute inset-0 h-full w-full bg-aims-section"
    />
  </div>
</section>



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
          <motion.div
            {...sectionReveal}
            className="mx-auto max-w-3xl px-2 text-center sm:px-4 lg:px-0"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-aims-gold sm:text-sm sm:tracking-[0.2em]">
              Ready for what comes next
            </p>

            <h2 className="mx-auto mt-4 max-w-2xl text-3xl font-bold leading-[1.12] sm:text-4xl lg:text-5xl">
              {aboutPageContent.cta.title}
            </h2>

            <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-blue-100 sm:text-base sm:leading-8 lg:text-lg">
              {aboutPageContent.cta.description}
            </p>

            <div className="mx-auto mt-8 flex w-full max-w-sm flex-col gap-3 sm:max-w-none sm:flex-row sm:flex-wrap sm:justify-center sm:gap-4">
              <Link
                to={aboutPageContent.cta.primaryHref}
                className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-aims-gold px-6 py-3 text-sm font-semibold text-aims-dark transition hover:-translate-y-0.5 hover:shadow-xl sm:w-auto sm:px-7 sm:py-3.5 sm:text-base"
              >
                {aboutPageContent.cta.primaryLabel}
                <ArrowRight aria-hidden="true" size={18} />
              </Link>

              <Link
                to={aboutPageContent.cta.secondaryHref}
                className="inline-flex min-h-12 w-full items-center justify-center rounded-full border border-white/40 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10 sm:w-auto sm:px-7 sm:py-3.5 sm:text-base"
              >
                {aboutPageContent.cta.secondaryLabel}
              </Link>
            </div>
          </motion.div>

      </section>
    </div>
  );
}
