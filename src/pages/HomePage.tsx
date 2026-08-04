import { useEffect, useState, useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { AnimatePresence, motion } from 'motion/react';
import { Link } from 'react-router-dom';
import type { LucideIcon } from 'lucide-react';
import {
  ArrowRight,
  BarChart3,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  Cog,
  GraduationCap,
  LaptopMinimal,
  X,
} from 'lucide-react';
import UEL from '../assets/logos/UELlogo.jpeg';
import nccLogo from '../assets/logos/NCClogo.webp';
import bachelorsProgrammeImage from '../assets/images/BACHELORS.png';
import diplomaProgrammeImage from '../assets/images/DIPLOMA.png';
import doctoralProgrammeImage from '../assets/images/DOCTORAL.png';
import englishProgrammeImage from '../assets/images/ENGLISH.png';
import foundationProgrammeImage from '../assets/images/FOUNDATION.png';
import Hslider1 from '../assets/images/Hslider1.jpeg';
import Hslider2 from '../assets/images/Hslider2.jpeg';
import Hslider3 from '../assets/images/Hslider3.jpeg';
import mastersProgrammeImage from '../assets/images/MASTERS.png';
import professionalProgrammeImage from '../assets/images/PROFESSIONAL.png';
import WhyCaims from '../assets/images/WhyCaims.png';



/**
 * NOTE ON THE INTAKE POPUP IMAGE
 * -----------------------------------------------------------------
 * Danata mama `campusImage` ekama placeholder widiyata dala thiyenne,
 * mokada project eke ithuru image ekak nathi nisa.
 * Ithale poster/flyer image (e.g. "New Intake 2026.png") ekak
 * `../assets/images/` folder ekata dala, mehe import karala
 * pahala `intakePopupImage` variable ekata gahanna. Anith ekak
 * monawath wenas karanna one na, popup eka automatic run wenawa.
 * -----------------------------------------------------------------
 */
import intakePopupImage from '../assets/images/d9137cae-bb2f-4b7a-b543-5f9b612e3ac9.png';

/**
 * NOTE ON SLIDER IMAGES
 * -----------------------------------------------------------------
 * Mata pennana project eke thibba image ekak witharai (campusImage).
 * Aluth image tika add karanna one nam:
 *   1. Ape `../assets/images/` folder ekata image files copy karanna.
 *   2. Import karala mema `slides` array eke object ekakata
 *      `image: yourImportedImage` widiyata gahanna.
 * Slider eka dan thiyena widiyatama 3 slides ekka work karanawa,
 * heta monawa unath (1 image witharath, 5ak unath) crash wenne na.
 * -----------------------------------------------------------------
 */
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
    highlights: ['Recognised pathways', 'Modern learning spaces', 'Career-ready study'],
  },
  {
    image: Hslider2,
    eyebrow: 'UK Recognised Degrees',
    title: 'Study in Sri Lanka, graduate globally',
    subtitle:
      'Earn internationally accredited qualifications without leaving home, taught by experienced local and visiting lecturers.',
    highlights: ['Global progression', 'Experienced lecturers', 'Flexible study routes'],
  },
  {
    image: Hslider3,
    eyebrow: 'Admissions Open',
    title: 'Your career starts with the right degree',
    subtitle:
      'Explore Computing, Business, Engineering and Professional programmes designed around real industry needs.',
    highlights: ['Admissions support', 'Industry-focused learning', 'Future-ready outcomes'],
    details: [
      { label: '2026 intake', value: 'Applications now open' },
      { label: 'Study focus', value: 'Computing, Business and Engineering' },
      { label: 'Student support', value: 'Guidance from enquiry to enrolment' },
    ],
  },
];

type ProgrammeCard = {
  title: string;
  description: string;
  icon: LucideIcon;
  glow: string;
  accent: string;
};

const programmes: ProgrammeCard[] = [
  {
    title: 'Computing & IT',
    description: 'Industry-focused computing programmes designed for future technology careers.',
    icon: LaptopMinimal,
    glow: 'from-cyan-400/20 via-sky-500/10 to-blue-600/10',
    accent: 'text-cyan-400',
  },
  {
    title: 'Business Management',
    description: 'Develop leadership, entrepreneurship and professional skills.',
    icon: BarChart3,
    glow: 'from-fuchsia-400/20 via-violet-500/10 to-indigo-600/10',
    accent: 'text-fuchsia-400',
  },
  {
    title: 'Engineering',
    description: 'Build practical engineering knowledge with modern learning methods.',
    icon: Cog,
    glow: 'from-emerald-400/20 via-teal-500/10 to-cyan-600/10',
    accent: 'text-emerald-400',
  },
  {
    title: 'Professional Courses',
    description: 'Flexible courses designed for career advancement.',
    icon: GraduationCap,
    glow: 'from-amber-300/20 via-yellow-400/10 to-orange-500/10',
    accent: 'text-amber-300',
  },
];

type FeaturedProgramme = {
  tag: string;
  title: string;
  description: string;
  focus: string;
  image: string;
};

const featuredProgrammes: FeaturedProgramme[] = [
  {
    tag: 'Foundation route',
    title: 'Foundation',
    description: 'Build a strong academic base and move confidently into higher study.',
    focus: 'Entry pathway',
    image: foundationProgrammeImage,
  },
  {
    tag: 'Progression route',
    title: 'Diploma',
    description: 'Develop practical knowledge with a clear route into further qualifications.',
    focus: 'Career focused',
    image: diplomaProgrammeImage,
  },
  {
    tag: 'Undergraduate route',
    title: "Bachelor's Degrees",
    description: 'Study toward recognised degree outcomes across key academic areas.',
    focus: 'Degree study',
    image: bachelorsProgrammeImage,
  },
  {
    tag: 'Postgraduate route',
    title: "Master's Degrees",
    description: 'Advance your expertise with leadership-oriented postgraduate study.',
    focus: 'Advanced study',
    image: mastersProgrammeImage,
  },
  {
    tag: 'Research route',
    title: 'Doctoral Programmes',
    description: 'Pursue research-led study for scholarly contribution and professional growth.',
    focus: 'Research-led',
    image: doctoralProgrammeImage,
  },
  {
    tag: 'Professional route',
    title: 'Professional Qualifications',
    description: 'Strengthen your career with flexible qualifications built for progression.',
    focus: 'Industry ready',
    image: professionalProgrammeImage,
  },
  {
    tag: 'Language route',
    title: 'English Qualifications',
    description: 'Improve communication and progression readiness through language study.',
    focus: 'Academic readiness',
    image: englishProgrammeImage,
  },
];

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

const fadeUp = {
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.15 },
  transition: { duration: 0.55 },
};

function Section({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.section {...fadeUp} className={`relative overflow-hidden py-20 ${className}`}>
      <div className="relative z-10 mx-auto max-w-7xl px-6">{children}</div>
    </motion.section>
  );
}

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

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      return;
    }

    const timer = window.setInterval(() => {
      emblaApi.scrollNext();
    }, 5000);

    return () => window.clearInterval(timer);
  }, [emblaApi, isPaused]);

  return (
    <div className="mt-12" onMouseEnter={() => setIsPaused(true)} onMouseLeave={() => setIsPaused(false)}>
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <p className="max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
         
        </p>
        <div className="flex items-center gap-3 self-start sm:self-auto">
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

      <div className="overflow-hidden rounded-[2rem]" ref={emblaRef}>
        <div className="-ml-5 flex">
          {featuredProgrammes.map((item, index) => (
            <div
              key={item.title}
              className="min-w-0 flex-[0_0_88%] pl-5 sm:flex-[0_0_56%] lg:flex-[0_0_34%] xl:flex-[0_0_30%]"
            >
              <motion.article
                whileHover={{ y: -8, scale: 1.01 }}
                transition={{ duration: 0.22 }}
                className="group relative h-[30rem] overflow-hidden rounded-[2rem] shadow-2xl"
              >
                <div
                  className={`absolute inset-0 bg-linear-to-br ${
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
                  alt={`${item.title} programmes poster`}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover object-center opacity-75 transition duration-700 group-hover:scale-105"
                />
                <div
                  className="absolute inset-0 bg-linear-to-t from-[#04122d]/92 via-[#04122d]/42 to-transparent"
                  aria-hidden="true"
                />
                <div className="relative z-10 flex h-full flex-col justify-between p-6 sm:p-7">
                  <span className="w-fit rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/90 backdrop-blur-sm">
                    {item.tag}
                  </span>

                  <div className="max-w-md">
                    <p className="text-sm font-semibold uppercase tracking-[0.18em] text-aims-gold">
                      {item.focus}
                    </p>
                    <h3 className="mt-3 text-3xl font-bold leading-tight text-white">
                      {item.title}
                    </h3>
                    <p className="mt-4 text-sm leading-7 text-blue-100">
                      {item.description}
                    </p>

                    <Link
                      to="/programmes"
                      aria-label={`Explore ${item.title}`}
                      className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-aims-navy shadow-lg transition hover:-translate-y-0.5 hover:bg-aims-gold"
                    >
                      Explore programmes
                      <ArrowRight size={16} aria-hidden="true" />
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
              index === selectedIndex ? 'w-8 bg-aims-gold' : 'w-2.5 bg-slate-300 hover:bg-slate-400'
            }`}
          />
        ))}
      </div>
    </div>
  );
}

function HeroSlider() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const goTo = useCallback((next: number) => {
    setDirection(next > index ? 1 : -1);
    setIndex((next + slides.length) % slides.length);
  }, [index]);

  const next = useCallback(() => goTo(index + 1), [goTo, index]);
  const prev = useCallback(() => goTo(index - 1), [goTo, index]);

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const slide = slides[index];
  const detailItems = slide.details ?? heroDetailPlaceholders;
  const hasDetails = Boolean(slide.details);

  return (
    <section className="relative flex h-[calc(100vh-104px)] items-center overflow-hidden bg-aims-navy">
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={index}
          custom={direction}
          initial={{ opacity: 0, scale: 1.06 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 0.9, ease: 'easeInOut' }}
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${slide.image})` }}
          aria-hidden="true"
        />
      </AnimatePresence>

      <div
        className="absolute inset-0 bg-linear-to-r from-[#04152f]/94 via-[#071d49]/78 to-[#071d49]/20"
        aria-hidden="true"
      />
      <div
        className="absolute inset-y-0 left-0 w-[62%] bg-[radial-gradient(circle_at_left_center,rgba(26,95,204,0.32),transparent_62%)]"
        aria-hidden="true"
      />
      <motion.div
        aria-hidden="true"
        animate={{ y: [0, -10, 0], opacity: [0.35, 0.5, 0.35] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute left-[10%] top-[18%] hidden h-44 w-44 rounded-full bg-cyan-400/14 blur-3xl lg:block"
      />
      <motion.div
        aria-hidden="true"
        animate={{ y: [0, 12, 0], x: [0, 8, 0], opacity: [0.28, 0.42, 0.28] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
        className="absolute bottom-[16%] left-[18%] hidden h-32 w-32 rounded-full bg-amber-300/12 blur-3xl lg:block"
      />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 py-16 sm:py-20 lg:py-24">
        <div className="max-w-2xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={`hero-copy-${index}`}
              initial={{ opacity: 0, x: -32, y: 14 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              exit={{ opacity: 0, x: 24, y: -10 }}
              transition={{ duration: 0.55, ease: 'easeOut' }}
              className="relative max-w-2xl"
            >
              <motion.div
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: '7rem', opacity: 1 }}
                transition={{ duration: 0.45, ease: 'easeOut', delay: 0.15 }}
                className="mb-6 h-1 rounded-full bg-linear-to-r from-aims-gold via-amber-300 to-transparent shadow-[0_0_22px_rgba(244,189,42,0.35)]"
              />

              <p className="inline-flex rounded-full border border-white/12 bg-white/7 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-white/90 backdrop-blur-sm">
                {slide.eyebrow}
              </p>

              <h1 className="mt-5 max-w-xl text-4xl font-bold leading-tight text-white drop-shadow-[0_14px_30px_rgba(4,21,47,0.34)] sm:text-5xl lg:text-6xl">
                {slide.title}
              </h1>

              <p className="mt-5 max-w-xl text-base leading-8 text-blue-100 drop-shadow-[0_10px_24px_rgba(4,21,47,0.26)] sm:text-lg">
                {slide.subtitle}
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                {slide.highlights.map((item, itemIndex) => (
                  <motion.span
                    key={`${slide.title}-${item}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, delay: 0.18 + itemIndex * 0.08, ease: 'easeOut' }}
                    className="rounded-full border border-white/12 bg-white/8 px-4 py-2 text-sm font-medium text-white/90 backdrop-blur-sm"
                  >
                    {item}
                  </motion.span>
                ))}
              </div>

              <div className="mt-8 grid gap-3 sm:grid-cols-3">
                {detailItems.map((detail, detailIndex) => (
                  <motion.div
                    key={`${slide.title}-detail-${detailIndex}`}
                    initial={{ opacity: hasDetails ? 0 : 1, y: hasDetails ? 12 : 0 }}
                    animate={{ opacity: hasDetails ? 1 : 0, y: 0 }}
                    transition={{ duration: 0.35, delay: hasDetails ? 0.22 + detailIndex * 0.08 : 0, ease: 'easeOut' }}
                    aria-hidden={!hasDetails}
                    className={`border-l-2 pl-4 ${
                      hasDetails ? 'border-aims-gold/70' : 'pointer-events-none border-transparent'
                    }`}
                  >
                    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-amber-200">
                      {detail.label}
                    </p>
                    <p className="mt-2 text-sm leading-6 text-white/88">
                      {detail.value}
                    </p>
                  </motion.div>
                ))}
              </div>

              <div className="mt-9 flex flex-wrap gap-4">
                <Link
                  to="/programmes"
                  className="inline-flex items-center gap-2 rounded-full bg-aims-gold px-6 py-3.5 font-semibold text-aims-dark shadow-[0_10px_28px_rgba(244,189,42,0.28)] transition hover:-translate-y-0.5 hover:shadow-xl"
                >
                  Explore programmes
                  <ArrowRight size={16} aria-hidden="true" />
                </Link>
                <Link
                  to="/contact"
                  className="inline-flex items-center rounded-full border border-white/28 bg-white/6 px-6 py-3.5 font-semibold text-white backdrop-blur-sm transition hover:bg-white/10"
                >
                  Contact admissions
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Prev / Next arrows */}
      <button
        type="button"
        onClick={prev}
        aria-label="Previous slide"
        className="absolute left-4 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/10 p-2 text-white backdrop-blur-md transition hover:bg-white/20 sm:left-6 sm:p-3"
      >
        <ChevronLeft size={22} aria-hidden="true" />
      </button>
      <button
        type="button"
        onClick={next}
        aria-label="Next slide"
        className="absolute right-4 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/10 p-2 text-white backdrop-blur-md transition hover:bg-white/20 sm:right-6 sm:p-3"
      >
        <ChevronRight size={22} aria-hidden="true" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => goTo(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`h-2.5 rounded-full transition-all ${
              i === index ? 'w-8 bg-yellow-400' : 'w-2.5 bg-white/40 hover:bg-white/60'
            }`}
          />
        ))}
      </div>
    </section>
  );
}

/**
 * Popup that shows once when the landing page opens, announcing the
 * new intake. Uses sessionStorage so it doesn't nag the visitor again
 * if they navigate around the site and come back to "/" in the same tab
 * session — but it WILL show again on a fresh visit / new tab.
 *
 * Want it to show every single time, no memory at all?
 *   -> delete the two `sessionStorage` lines below.
 * Want it to show only once per day instead of once per session?
 *   -> swap sessionStorage for localStorage and store a timestamp,
 *      then compare Date.now() against it before opening.
 */
function IntakePopup() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const alreadySeen = sessionStorage.getItem('aims-intake-popup-seen');
    if (alreadySeen) return;

    const timer = setTimeout(() => {
      setOpen(true);
      sessionStorage.setItem('aims-intake-popup-seen', 'true');
    }, 600);

    return () => clearTimeout(timer);
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

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open, close]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-blue-950/70 p-4 backdrop-blur-sm"
          onClick={close}
          role="dialog"
          aria-modal="true"
          aria-label="New intake announcement"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 10 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-lg overflow-hidden rounded-3xl bg-white shadow-2xl"
          >
            <button
              type="button"
              onClick={close}
              aria-label="Close popup"
              className="absolute right-3 top-3 z-10 rounded-full bg-black/40 p-2 text-white transition hover:bg-black/60"
            >
              <X size={18} aria-hidden="true" />
            </button>

            <img
              src={intakePopupImage}
              alt="New intake now open at AIMS Campus"
              className="w-full object-cover"
            />

            <div className="p-6 text-center">
              <p className="font-semibold uppercase tracking-[0.2em] text-aims-blue">Admissions</p>
              <h3 className="mt-2 text-2xl font-bold text-aims-navy">New intake now open!</h3>
              <p className="mt-2 text-slate-500">
                Limited seats available for this intake. Apply now to secure your place.
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <Link
                  to="/contact"
                  onClick={close}
                  className="inline-flex items-center gap-2 rounded-xl bg-yellow-400 px-6 py-3 font-semibold text-blue-950 transition hover:-translate-y-0.5 hover:shadow-lg"
                >
                  Apply now <ArrowRight size={16} aria-hidden="true" />
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
      )}
    </AnimatePresence>
  );
}

export default function HomePage() {
  return (
    <div className="bg-white text-slate-800">
      <IntakePopup />
      <HeroSlider />

       <Section className="bg-aims-sky">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <p className="font-semibold uppercase tracking-[0.2em] text-aims-blue">Why AIMS</p>
            <h2 className="mt-3 text-4xl font-bold text-aims-navy">Why choose AIMS?</h2>
            <p className="mt-5 leading-8 text-slate-600">
              We combine academic excellence, modern facilities and industry exposure to help students move
              confidently into their future.
            </p>
            <ul className="mt-8 space-y-4">
              {['International curriculum', 'Experienced lecturers', 'Modern campus facilities', 'Career guidance'].map(
                (item) => (
                  <li key={item} className="flex items-center gap-3 text-slate-700">
                    <CheckCircle className="shrink-0 text-aims-blue" aria-hidden="true" />
                    {item}
                  </li>
                ),
              )}
            </ul>
          </div>
          <img
            src={WhyCaims}
            className="rounded-3xl shadow-xl"
            alt="AIMS Campus learning environment"
            loading="lazy"
          />
        </div>
      </Section>

      <Section className="bg-white">
        <header className="text-center">
          <p className="font-semibold uppercase tracking-[0.2em] text-aims-blue">What you can study</p>
          <h2 className="mt-3 text-4xl font-bold text-aims-navy">Our programmes</h2>
          <p className="mt-3 text-slate-500">Career-focused programmes designed for success.</p>
        </header>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {programmes.map(({ title, description, icon: Icon, glow, accent }) => (
            <motion.article
              key={title}
              whileHover={{ scale: 1.02, y: -6 }}
              className="rounded-3xl border border-slate-100 bg-slate-50 p-7 shadow-sm transition hover:border-aims-blue/30 hover:bg-white hover:shadow-xl"
            >
              <div
                className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-linear-to-br ${glow} ring-1 ring-white/70 shadow-[0_0_24px_rgba(56,189,248,0.18)]`}
              >
                <Icon
                  aria-hidden="true"
                  size={28}
                  className={`${accent} drop-shadow-[0_0_10px_rgba(255,255,255,0.22)]`}
                />
              </div>
              <h3 className="mt-5 text-xl font-bold text-aims-navy">{title}</h3>
              <p className="mt-3 leading-7 text-slate-500">{description}</p>
            </motion.article>
          ))}
        </div>
      </Section>

      <Section className="bg-white pt-0">
        <header className="max-w-3xl">
          <p className="font-semibold uppercase tracking-[0.2em] text-aims-blue">Explore pathways</p>
          <h2 className="mt-3 text-4xl font-bold text-aims-navy">Explore programmes</h2>
          <p className="mt-3 text-slate-600">
            Browse the main pathways and study routes available through AIMS Campus.
          </p>
        </header>
        <ProgrammeShowcase />
      </Section>

      <Section className="bg-white">
  <header className="mx-auto max-w-2xl text-center">
    <p className="font-semibold uppercase tracking-[0.2em] text-aims-blue">
      Trusted collaborations
    </p>

    <h2 className="mt-3 text-4xl font-bold text-aims-navy">
      Our academic partners
    </h2>

    <p className="mt-4 leading-7 text-slate-500">
      Working with recognised academic organisations to create quality
      education and progression opportunities.
    </p>
  </header>

  <div className="mx-auto mt-12 flex max-w-3xl flex-wrap items-center justify-center gap-8 sm:gap-10">
    {partners.map((partner) => (
      <motion.article
        key={partner.name}
        whileHover={{ y: -6, scale: 1.03 }}
        transition={{ duration: 0.22 }}
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

      <section className="bg-aims-blue py-20 text-center text-white">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="text-4xl font-bold">Ready to start your journey?</h2>
          <p className="mt-5 text-blue-100">Join AIMS Campus and build your future today.</p>
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
