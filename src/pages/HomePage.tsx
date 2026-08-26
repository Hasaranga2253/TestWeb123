import { useCallback, useEffect, useState } from 'react';
import type { ReactNode } from 'react';

import useEmblaCarousel from 'embla-carousel-react';
import { AnimatePresence, motion } from 'motion/react';
import { Link } from 'react-router-dom';

import {
  ArrowRight,
  Award,
  Brain,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  Languages,
  Laptop2,
  X,
} from 'lucide-react';

import UEL from '../assets/logos/UELlogo.jpeg';
import nccLogo from '../assets/logos/NCClogo.webp';

import Hslider1 from '../assets/images/Hslider1.jpeg';
import Hslider2 from '../assets/images/Hslider2.jpeg';
import Hslider3 from '../assets/images/Hslider3.jpeg';

import WhyCaims from '../assets/images/WhyCaims.png';
import AppliedComputing from '../assets/images/AppliedComputing.jpeg';
import IBM from '../assets/images/IBM.jpeg';
import foundationProgrammeImage from '../assets/images/FOUNDATION.png';
import EduStudy from '../assets/images/EduStudy.jpeg';
import schoolBusinessItImage from '../assets/images/sclB&I.png';
import schoolEducationPsychologyImage from '../assets/images/sclEdu&Psy.png';
import schoolLanguageProfessionalImage from '../assets/images/sclLng&Pro.png';
import schoolDoctoralStudiesImage from '../assets/images/schlDocS.png';

import intakePopupImage from '../assets/images/d9137cae-bb2f-4b7a-b543-5f9b612e3ac9.png';

/* =========================================================
   HERO SLIDER
   ========================================================= */

type HeroSlideDetail = {
  label: string;
  value: string;
};

type HeroSlide = {
  image: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  highlights: string[];
  details?: HeroSlideDetail[];
};

const heroDetailPlaceholders: HeroSlideDetail[] = [
  { label: '', value: '' },
  { label: '', value: '' },
  { label: '', value: '' },
];

const slides: HeroSlide[] = [
  {
    image: Hslider1,
    eyebrow: 'AIMS Campus',
    title: 'Shape your future with quality education',
    subtitle:
      'A modern learning environment providing internationally recognised programmes, industry partnerships and career-focused education.',
    highlights: [
      'Recognised pathways',
      'Modern learning spaces',
      'Career-ready study',
    ],
  },
  {
    image: Hslider2,
    eyebrow: 'UK Recognised Degrees',
    title: 'Study in Sri Lanka, graduate globally',
    subtitle:
      'Earn internationally accredited qualifications without leaving home, taught by experienced local and visiting lecturers.',
    highlights: [
      'Global progression',
      'Experienced lecturers',
      'Flexible study routes',
    ],
  },
  {
    image: Hslider3,
    eyebrow: 'Admissions Open',
    title: 'Your career starts with the right degree',
    subtitle:
      'Explore Computing, Business, Engineering and Professional programmes designed around real industry needs.',
    highlights: [
      'Admissions support',
      'Industry-focused learning',
      'Future-ready outcomes',
    ],
    details: [
      {
        label: '2026 intake',
        value: 'Applications now open',
      },
      {
        label: 'Study focus',
        value: 'Computing, Business and Engineering',
      },
      {
        label: 'Student support',
        value: 'Guidance from enquiry to enrolment',
      },
    ],
  },
];

/* =========================================================
   FEATURED PROGRAMMES
   ========================================================= */

type FeaturedProgramme = {
  tag: string;
  title: string;
  description: string;
  focus: string;
  image: string;
  to: string;
};

const featuredProgrammes: FeaturedProgramme[] = [
  {
    tag: 'Foundation route',
    title: '',
    description:
      'Build study, presentation and foundation mathematics skills for progression into higher education.',
    focus: 'Entry pathway',
    image: foundationProgrammeImage,
    to: '/programmes/foundation',
  },
  {
    tag: 'Undergraduate route',
    title: '',
    description:
      'Build software, web, mobile, cloud and cybersecurity capabilities for modern computing careers.',
    focus: 'Computing degree',
    image: AppliedComputing,
    to: '/programmes/applied-computing',
  },
  {
    tag: 'Undergraduate route',
    title: '',
    description:
      'Develop teaching, learning, assessment and curriculum skills for education and training roles.',
    focus: 'Education degree',
    image: EduStudy,
    to: '/programmes/education',
  },
  {
    tag: 'Undergraduate route',
    title: '',
    description:
      'Strengthen leadership, entrepreneurship, finance and global business knowledge for management careers.',
    focus: 'Business degree',
    image: IBM,
    to: '/programmes/international-business-management',
  },
];

/* =========================================================
   OUR SCHOOLS
   IMPORTANT:
   Keep this OUTSIDE HomePage JSX.
   ========================================================= */

const schools = [
  {
    title: 'School of Business & IT',
    description:
      'Undergraduate and postgraduate programmes spanning computing, technology and business management.',
    icon: Laptop2,
    glow: 'from-sky-400/25 to-blue-500/10',
    accent: 'text-sky-600',
    to: '/Contact',
    image: schoolBusinessItImage,
  },
  {
    title: 'School of Education & Psychology',
    description:
      'Teaching, training and applied psychology programmes for educators and practitioners.',
    icon: Brain,
    glow: 'from-rose-400/25 to-pink-500/10',
    accent: 'text-rose-600',
    to: '/Contact',
    image: schoolEducationPsychologyImage,
  },
  {
    title: 'School of Language & Professional Studies',
    description:
      'Language, communication and professional development courses built for career growth.',
    icon: Languages,
    glow: 'from-emerald-400/25 to-teal-500/10',
    accent: 'text-emerald-600',
    to: '/Contact',
    image: schoolLanguageProfessionalImage,
  },
  {
    title: 'School of Doctoral Studies',
    description:
      'Advanced, research-led doctoral degrees for academics and senior professionals.',
    icon: Award,
    glow: 'from-amber-400/25 to-yellow-500/10',
    accent: 'text-amber-600',
    to: '/Contact',
    image: schoolDoctoralStudiesImage,
  },
];

/* =========================================================
   PARTNERS
   ========================================================= */

type PartnerLogo = {
  name: string;
  logo: string;
  alt: string;
};

const partners: PartnerLogo[] = [
  {
    name: 'University of East London',
    logo: UEL,
    alt: 'University of East London logo',
  },
  {
    name: 'NCC Education',
    logo: nccLogo,
    alt: 'NCC Education logo',
  },
];

/* =========================================================
   SHARED SECTION ANIMATION
   ========================================================= */

const fadeUp = {
  initial: {
    opacity: 0,
    y: 32,
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
  },
};

function Section({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.section
      {...fadeUp}
      className={`relative overflow-hidden py-14 sm:py-20 ${className}`}
    >
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6">
        {children}
      </div>
    </motion.section>
  );
}

/* =========================================================
   PROGRAMME CAROUSEL
   ========================================================= */

function ProgrammeShowcase() {
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

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;

    if (prefersReducedMotion) {
      return;
    }

    const timer = window.setInterval(() => {
      emblaApi.scrollNext();
    }, 5000);

    return () => {
      window.clearInterval(timer);
    };
  }, [emblaApi, isPaused]);

  return (
    <div
      className="mt-12"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="mb-6 flex items-center justify-end">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={scrollPrev}
            aria-label="Previous programme"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-aims-navy text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-aims-blue"
          >
            <ChevronLeft size={18} aria-hidden="true" />
          </button>

          <button
            type="button"
            onClick={scrollNext}
            aria-label="Next programme"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-aims-navy text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-aims-blue"
          >
            <ChevronRight size={18} aria-hidden="true" />
          </button>
        </div>
      </div>

      <div
        className="overflow-hidden rounded-[2rem]"
        ref={emblaRef}
      >
        <div className="-ml-5 flex">
          {featuredProgrammes.map((item, index) => (
            <div
              key={`${item.focus}-${index}`}
              className="min-w-0 flex-[0_0_88%] pl-5 sm:flex-[0_0_56%] lg:flex-[0_0_34%] xl:flex-[0_0_30%]"
            >
              <motion.article
                whileHover={{
                  y: -8,
                  scale: 1.01,
                }}
                transition={{
                  duration: 0.22,
                }}
                className="group relative overflow-hidden rounded-3xl bg-[#04122d] shadow-2xl sm:h-[30rem] sm:rounded-[2rem]"
              >
                <div
                  className={`absolute inset-0 hidden bg-linear-to-br sm:block ${
                    index % 3 === 0
                      ? 'from-blue-950/95 via-blue-900/75 to-sky-700/30'
                      : index % 3 === 1
                        ? 'from-blue-950/95 via-indigo-950/70 to-aims-blue/30'
                        : 'from-blue-950/95 via-slate-900/70 to-aims-navy/25'
                  }`}
                  aria-hidden="true"
                />

                <img
                  src={item.image}
                  alt={`${item.focus} programme`}
                  loading="lazy"
                  className="h-56 w-full object-cover object-center opacity-100 transition duration-700 group-hover:scale-105 sm:absolute sm:inset-0 sm:h-full sm:opacity-75"
                />

                <div
                  className="absolute inset-0 hidden bg-linear-to-t from-[#04122d]/92 via-[#04122d]/42 to-transparent sm:block"
                  aria-hidden="true"
                />

                <div className="relative z-10 flex flex-col gap-5 p-5 sm:h-full sm:justify-between sm:gap-0 sm:p-7">
                  <span className="w-fit rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-white/90 backdrop-blur-sm sm:text-[11px] sm:tracking-[0.2em]">
                    {item.tag}
                  </span>

                  <div className="max-w-md">
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-aims-gold sm:text-sm sm:tracking-[0.18em]">
                      {item.focus}
                    </p>

                    {item.title ? (
                      <h3 className="mt-3 text-2xl font-bold leading-tight text-white sm:text-3xl">
                        {item.title}
                      </h3>
                    ) : null}

                    <p className="mt-3 text-sm leading-6 text-blue-100 sm:mt-4 sm:leading-7">
                      {item.description}
                    </p>

                    <Link
                      to={item.to}
                      aria-label={`Explore ${item.focus}`}
                      className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-aims-navy shadow-lg transition hover:-translate-y-0.5 hover:bg-aims-gold sm:mt-6 sm:w-auto"
                    >
                      Explore programmes
                      <ArrowRight
                        size={16}
                        aria-hidden="true"
                      />
                    </Link>
                  </div>
                </div>
              </motion.article>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 flex items-center gap-2">
        {scrollSnaps.map((_, index) => (
          <button
            key={index}
            type="button"
            onClick={() => emblaApi?.scrollTo(index)}
            aria-label={`Go to programme ${index + 1}`}
            className={`h-2.5 rounded-full transition-all ${
              index === selectedIndex
                ? 'w-8 bg-aims-gold'
                : 'w-2.5 bg-slate-300 hover:bg-slate-400'
            }`}
          />
        ))}
      </div>
    </div>
  );
}

/* =========================================================
   HERO
   ========================================================= */

function HeroSlider() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const goTo = useCallback(
    (nextIndex: number) => {
      setDirection(nextIndex > index ? 1 : -1);
      setIndex(
        (nextIndex + slides.length) % slides.length,
      );
    },
    [index],
  );

  const next = useCallback(() => {
    goTo(index + 1);
  }, [goTo, index]);

  const prev = useCallback(() => {
    goTo(index - 1);
  }, [goTo, index]);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setDirection(1);

      setIndex(
        (previousIndex) =>
          (previousIndex + 1) % slides.length,
      );
    }, 6000);

    return () => {
      window.clearInterval(timer);
    };
  }, []);

  const slide = slides[index];

  const detailItems =
    slide.details ?? heroDetailPlaceholders;

  const hasDetails = Boolean(slide.details);

  return (
    <section className="relative flex min-h-[calc(100vh-104px)] items-center overflow-hidden bg-aims-section py-12 sm:py-0">
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={index}
          custom={direction}
          initial={{
            opacity: 0,
            scale: 1.06,
          }}
          animate={{
            opacity: 1,
            scale: 1,
          }}
          exit={{
            opacity: 0,
            scale: 1.02,
          }}
          transition={{
            duration: 0.9,
            ease: 'easeInOut',
          }}
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${slide.image})`,
          }}
          aria-hidden="true"
        />
      </AnimatePresence>

      <div
        className="absolute inset-0 bg-linear-to-r from-[#04152f]/42 via-[#04152f]/10 to-transparent"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:py-24">
        <div className="max-w-2xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={`hero-copy-${index}`}
              initial={{
                opacity: 0,
                x: -32,
                y: 14,
              }}
              animate={{
                opacity: 1,
                x: 0,
                y: 0,
              }}
              exit={{
                opacity: 0,
                x: 24,
                y: -10,
              }}
              transition={{
                duration: 0.55,
                ease: 'easeOut',
              }}
              className="relative max-w-2xl"
            >
              <motion.div
                initial={{
                  width: 0,
                  opacity: 0,
                }}
                animate={{
                  width: '7rem',
                  opacity: 1,
                }}
                transition={{
                  duration: 0.45,
                  ease: 'easeOut',
                  delay: 0.15,
                }}
                className="mb-6 h-1 rounded-full bg-linear-to-r from-aims-gold via-amber-300 to-transparent shadow-[0_0_22px_rgba(244,189,42,0.35)]"
              />

              <p className="inline-flex rounded-full border border-white/12 bg-white/7 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-white/90 backdrop-blur-sm">
                {slide.eyebrow}
              </p>

              <h1 className="mt-5 max-w-xl text-3xl font-bold leading-tight text-white drop-shadow-[0_14px_30px_rgba(4,21,47,0.34)] sm:text-5xl lg:text-6xl">
                {slide.title}
              </h1>

              <p className="mt-5 max-w-xl text-base leading-8 text-blue-100 drop-shadow-[0_10px_24px_rgba(4,21,47,0.26)] sm:text-lg">
                {slide.subtitle}
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                {slide.highlights.map(
                  (item, itemIndex) => (
                    <motion.span
                      key={`${slide.title}-${item}`}
                      initial={{
                        opacity: 0,
                        y: 10,
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                      }}
                      transition={{
                        duration: 0.35,
                        delay:
                          0.18 + itemIndex * 0.08,
                        ease: 'easeOut',
                      }}
                      className="rounded-full border border-white/12 bg-white/8 px-4 py-2 text-sm font-medium text-white/90 backdrop-blur-sm"
                    >
                      {item}
                    </motion.span>
                  ),
                )}
              </div>

              <div className="mt-8 grid gap-3 sm:grid-cols-3">
                {detailItems.map(
                  (detail, detailIndex) => (
                    <motion.div
                      key={`${slide.title}-detail-${detailIndex}`}
                      initial={{
                        opacity: hasDetails ? 0 : 1,
                        y: hasDetails ? 12 : 0,
                      }}
                      animate={{
                        opacity: hasDetails ? 1 : 0,
                        y: 0,
                      }}
                      transition={{
                        duration: 0.35,
                        delay: hasDetails
                          ? 0.22 +
                            detailIndex * 0.08
                          : 0,
                        ease: 'easeOut',
                      }}
                      aria-hidden={!hasDetails}
                      className={`border-l-2 pl-4 ${
                        hasDetails
                          ? 'border-aims-gold/70'
                          : 'pointer-events-none border-transparent'
                      }`}
                    >
                      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-amber-200">
                        {detail.label}
                      </p>

                      <p className="mt-2 text-sm leading-6 text-white/88">
                        {detail.value}
                      </p>
                    </motion.div>
                  ),
                )}
              </div>

              <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4">
                <Link
                  to="/programmes"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-aims-gold px-6 py-3.5 font-semibold text-aims-dark shadow-[0_10px_28px_rgba(244,189,42,0.28)] transition hover:-translate-y-0.5 hover:shadow-xl"
                >
                  Explore programmes

                  <ArrowRight
                    size={16}
                    aria-hidden="true"
                  />
                </Link>

                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center rounded-full border border-white/28 bg-white/6 px-6 py-3.5 font-semibold text-white backdrop-blur-sm transition hover:bg-white/10"
                >
                  Contact admissions
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <button
        type="button"
        onClick={prev}
        aria-label="Previous slide"
        className="absolute left-4 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/10 p-2 text-white backdrop-blur-md transition hover:bg-white/20 sm:left-6 sm:p-3"
      >
        <ChevronLeft
          size={22}
          aria-hidden="true"
        />
      </button>

      <button
        type="button"
        onClick={next}
        aria-label="Next slide"
        className="absolute right-4 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/10 p-2 text-white backdrop-blur-md transition hover:bg-white/20 sm:right-6 sm:p-3"
      >
        <ChevronRight
          size={22}
          aria-hidden="true"
        />
      </button>

      <div className="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 gap-2">
        {slides.map((_, slideIndex) => (
          <button
            key={slideIndex}
            type="button"
            onClick={() => goTo(slideIndex)}
            aria-label={`Go to slide ${slideIndex + 1}`}
            className={`h-2.5 rounded-full transition-all ${
              slideIndex === index
                ? 'w-8 bg-yellow-400'
                : 'w-2.5 bg-white/40 hover:bg-white/60'
            }`}
          />
        ))}
      </div>
    </section>
  );
}

/* =========================================================
   INTAKE POPUP
   ========================================================= */

function IntakePopup() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const alreadySeen = sessionStorage.getItem(
      'aims-intake-popup-seen',
    );

    if (alreadySeen) {
      return;
    }

    const timer = window.setTimeout(() => {
      setOpen(true);

      sessionStorage.setItem(
        'aims-intake-popup-seen',
        'true',
      );
    }, 600);

    return () => {
      window.clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const close = useCallback(() => {
    setOpen(false);
  }, []);

  useEffect(() => {
    if (!open) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        close();
      }
    };

    window.addEventListener(
      'keydown',
      onKeyDown,
    );

    return () => {
      window.removeEventListener(
        'keydown',
        onKeyDown,
      );
    };
  }, [open, close]);

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            duration: 0.25,
          }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-blue-950/70 p-4 backdrop-blur-sm"
          onClick={close}
          role="dialog"
          aria-modal="true"
          aria-label="New intake announcement"
        >
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.9,
              y: 20,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              scale: 0.92,
              y: 10,
            }}
            transition={{
              duration: 0.35,
              ease: 'easeOut',
            }}
            onClick={(event) =>
              event.stopPropagation()
            }
            className="relative w-full max-w-lg overflow-hidden rounded-3xl bg-white shadow-2xl"
          >
            <button
              type="button"
              onClick={close}
              aria-label="Close popup"
              className="absolute right-3 top-3 z-10 rounded-full bg-black/40 p-2 text-white transition hover:bg-black/60"
            >
              <X
                size={18}
                aria-hidden="true"
              />
            </button>

            <img
              src={intakePopupImage}
              alt="New intake now open at AIMS Campus"
              className="w-full object-cover"
            />

            <div className="p-6 text-center">
              <p className="font-semibold uppercase tracking-[0.2em] text-aims-blue">
                Admissions
              </p>

              <h3 className="mt-2 text-2xl font-bold text-aims-navy">
                New intake now open!
              </h3>

              <p className="mt-2 text-slate-500">
                Limited seats available for this
                intake. Apply now to secure your
                place.
              </p>

              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <Link
                  to="/contact"
                  onClick={close}
                  className="inline-flex items-center gap-2 rounded-xl bg-yellow-400 px-6 py-3 font-semibold text-blue-950 transition hover:-translate-y-0.5 hover:shadow-lg"
                >
                  Apply now

                  <ArrowRight
                    size={16}
                    aria-hidden="true"
                  />
                </Link>

                <button
                  type="button"
                  onClick={close}
                  className="rounded-xl border border-slate-200 px-6 py-3 font-semibold text-slate-500 transition hover:bg-slate-50"
                >
                  Maybe later
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

/* =========================================================
   HOME PAGE
   ========================================================= */

export default function HomePage() {
  return (
    <div className="bg-white text-slate-800">
      <IntakePopup />

      <HeroSlider />

      {/* =====================================================
          WHY AIMS
          ===================================================== */}

      <Section className="bg-aims-sky">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <p className="font-semibold uppercase tracking-[0.2em] text-aims-blue">
              Why AIMS
            </p>

            <h2 className="mt-3 text-3xl font-bold text-aims-navy sm:text-4xl">
              Why choose AIMS?
            </h2>

            <p className="mt-5 leading-8 text-slate-600">
              We combine academic excellence,
              modern facilities and industry
              exposure to help students move
              confidently into their future.
            </p>

            <ul className="mt-8 space-y-4">
              {[
                'International curriculum',
                'Experienced lecturers',
                'Modern campus facilities',
                'Career guidance',
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-3 text-slate-700"
                >
                  <CheckCircle
                    className="shrink-0 text-aims-blue"
                    aria-hidden="true"
                  />

                  {item}
                </li>
              ))}
            </ul>
          </div>

          <img
            src={WhyCaims}
            className="aspect-[4/3] w-full rounded-3xl object-cover shadow-xl lg:aspect-auto"
            alt="AIMS Campus learning environment"
            loading="lazy"
          />
        </div>
      </Section>

      {/* =====================================================
          FEATURED PROGRAMMES
          ===================================================== */}

      <Section className="bg-white pt-0">
        <header className="max-w-3xl">
          <p className="font-semibold uppercase tracking-[0.2em] text-aims-blue">
            Explore pathways
          </p>

          <h2 className="mt-3 text-3xl font-bold text-aims-navy sm:text-4xl">
            Explore highlight programmes
          </h2>

          <p className="mt-3 text-slate-600">
            Browse the main pathways and study
            routes available through AIMS Campus.
          </p>
        </header>

        <ProgrammeShowcase />
      </Section>

{/* =====================================================
          OUR SCHOOLS
          ===================================================== */}

      <Section className="bg-white">
        <header className="mx-auto max-w-3xl text-center">
          <h2 className="mt-3 text-3xl font-bold text-aims-navy sm:text-4xl">
            Our Schools
          </h2>
        </header>

<div className="mt-14 flex flex-wrap items-start justify-center gap-x-10 gap-y-12 sm:gap-x-14">
          {schools.map(({ title, description, icon: Icon, glow, accent, to, image }) => (
            <Link
              key={title}
              to={to}
              aria-label={`View ${title}`}
              className="group flex w-40 flex-col items-center text-center sm:w-48"
            >
              <motion.div
                whileHover={{
                  y: [0, -22, 0, -10, 0],
                }}
                whileTap={{ scale: 0.94 }}
                transition={{
                  duration: 0.9,
                  ease: 'easeInOut',
                  repeat: Infinity,
                }}
                className={`flex h-24 w-24 shrink-0 cursor-pointer items-center justify-center rounded-full bg-linear-to-br ${glow} shadow-[0_16px_40px_rgba(7,29,73,0.12)] ring-1 ring-white/70 transition-shadow duration-300 group-hover:shadow-[0_20px_46px_rgba(18,63,145,0.2)] sm:h-28 sm:w-28`}
              >
                {image ? (
                  <img
                    src={image}
                    alt=""
                    aria-hidden="true"
                    loading="lazy"
                    className="h-full w-full rounded-full object-cover"
                  />
                ) : (
                  <Icon
                    aria-hidden="true"
                    size={32}
                    strokeWidth={2}
                    className={accent}
                  />
                )}
              </motion.div>

              <h3 className="mt-5 text-base font-bold text-aims-navy transition-colors group-hover:text-aims-blue sm:text-lg">
                {title}
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                {description}
              </p>
            </Link>
          ))}
        </div>
      </Section>

      {/* =====================================================
          ACADEMIC PARTNERS
          ===================================================== */}

      <Section className="bg-white">
        <header className="mx-auto max-w-2xl text-center">
          <p className="font-semibold uppercase tracking-[0.2em] text-aims-blue">
            Trusted collaborations
          </p>

          <h2 className="mt-3 text-3xl font-bold text-aims-navy sm:text-4xl">
            Our academic partners
          </h2>

          <p className="mt-4 leading-7 text-slate-500">
            Working with recognised academic
            organisations to create quality
            education and progression
            opportunities.
          </p>
        </header>

        <div className="mx-auto mt-12 flex max-w-3xl flex-wrap items-center justify-center gap-8 sm:gap-10">
          {partners.map((partner) => (
            <motion.article
              key={partner.name}
              whileHover={{
                y: -6,
                scale: 1.03,
              }}
              transition={{
                duration: 0.22,
              }}
              className="group flex w-full max-w-[280px] flex-col items-center text-center"
            >
              <div className="relative flex h-52 w-52 items-center justify-center rounded-full border border-slate-200 bg-white p-9 shadow-[0_16px_45px_rgba(7,29,73,0.10)] transition duration-300 group-hover:border-aims-blue/30 group-hover:shadow-[0_22px_60px_rgba(18,63,145,0.18)]">
                <div
                  className="absolute inset-3 rounded-full bg-linear-to-br from-aims-sky via-white to-slate-50"
                  aria-hidden="true"
                />

                <div
                  className="absolute inset-0 rounded-full ring-1 ring-inset ring-white/70"
                  aria-hidden="true"
                />

                <img
                  src={partner.logo}
                  alt={partner.alt}
                  loading="lazy"
                  className="relative z-10 max-h-28 max-w-[135px] object-contain transition duration-300 group-hover:scale-105"
                />
              </div>

              <h3 className="mt-5 text-lg font-bold text-aims-navy">
                {partner.name}
              </h3>
            </motion.article>
          ))}
        </div>
      </Section>

      {/* =====================================================
          FINAL CTA
          ===================================================== */}

      <section className="bg-aims-blue py-20 text-center text-white">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="text-4xl font-bold">
            Ready to start your journey?
          </h2>

          <p className="mt-5 text-blue-100">
            Join AIMS Campus and build your future
            today.
          </p>

          <Link
            to="/contact"
            className="mt-8 inline-flex rounded-xl bg-yellow-400 px-10 py-4 font-bold text-blue-900 transition hover:-translate-y-1 hover:shadow-xl"
          >
            Apply now
          </Link>
        </div>
      </section>
    </div>
  );
}
