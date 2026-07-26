import { useEffect, useState, useCallback } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Award,
  BookOpen,
  Building2,
  CalendarDays,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  GraduationCap,
  Users,
  X,
} from 'lucide-react';
import campusImage from '../assets/images/d9137cae-bb2f-4b7a-b543-5f9b612e3ac9.png';

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
const slides = [
  {
    image: campusImage,
    eyebrow: 'AIMS Campus',
    title: 'Shape your future with quality education',
    subtitle:
      'A modern learning environment providing internationally recognised programmes, industry partnerships and career-focused education.',
  },
  {
    image: campusImage,
    eyebrow: 'UK Recognised Degrees',
    title: 'Study in Sri Lanka, graduate globally',
    subtitle:
      'Earn internationally accredited qualifications without leaving home, taught by experienced local and visiting lecturers.',
  },
  {
    image: campusImage,
    eyebrow: 'Admissions Open',
    title: 'Your career starts with the right degree',
    subtitle:
      'Explore Computing, Business, Engineering and Professional programmes designed around real industry needs.',
  },
];

const programmes = [
  { title: 'Computing & IT', description: 'Industry-focused computing programmes designed for future technology careers.', icon: '💻' },
  { title: 'Business Management', description: 'Develop leadership, entrepreneurship and professional skills.', icon: '📊' },
  { title: 'Engineering', description: 'Build practical engineering knowledge with modern learning methods.', icon: '⚙️' },
  { title: 'Professional Courses', description: 'Flexible courses designed for career advancement.', icon: '🎓' },
];

const statistics = [
  { value: '15+', label: 'Years of excellence', icon: Award },
  { value: '5,000+', label: 'Students', icon: Users },
  { value: '50+', label: 'Academic programmes', icon: BookOpen },
  { value: '20+', label: 'Industry partners', icon: Building2 },
];

const partners = ['Pearson', 'Microsoft', 'Cisco', 'AWS', 'Google', 'Oracle'];

const news = [
  { title: 'New Degree Programmes 2026', date: 'July 2026' },
  { title: 'Student Innovation Awards', date: 'June 2026' },
  { title: 'International Partnership Announcement', date: 'May 2026' },
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

  return (
    <section className="relative flex min-h-[calc(100vh-104px)] items-center overflow-hidden bg-aims-navy">
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

      {/* Consistent readable overlay on top of whichever slide is active */}
      <div className="absolute inset-0 bg-linear-to-br from-blue-950/95 via-blue-900/85 to-blue-700/70" aria-hidden="true" />
      <div className="absolute right-10 top-10 h-96 w-96 rounded-full bg-yellow-400/20 blur-3xl" aria-hidden="true" />
      <div className="absolute -left-16 bottom-0 h-72 w-72 rounded-full bg-sky-400/10 blur-3xl" aria-hidden="true" />

      <div className="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-12 px-6 py-20 lg:grid-cols-2 lg:py-28">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 30 }}
            transition={{ duration: 0.6 }}
          >
            <p className="mb-5 font-semibold uppercase tracking-[0.2em] text-yellow-300">{slide.eyebrow}</p>
            <h1 className="max-w-3xl text-5xl font-bold leading-tight text-white sm:text-6xl lg:text-7xl">
              {slide.title}
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-blue-100">{slide.subtitle}</p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-xl bg-yellow-400 px-7 py-4 font-semibold text-blue-950 transition hover:-translate-y-1 hover:shadow-xl"
              >
                Apply now <ArrowRight size={18} aria-hidden="true" />
              </Link>
              <Link
                to="/programmes"
                className="rounded-xl border border-white/40 px-7 py-4 text-white transition hover:bg-white/10"
              >
                Explore programmes
              </Link>
            </div>
          </motion.div>
        </AnimatePresence>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="rounded-3xl border border-white/20 bg-white/10 p-10 backdrop-blur-md"
        >
          <div className="text-center text-white">
            <GraduationCap size={96} className="mx-auto text-yellow-300" aria-hidden="true" />
            <h2 className="mt-6 text-3xl font-bold">Future-ready education</h2>
            <p className="mt-4 text-blue-100">Learn. Grow. Achieve.</p>
          </div>
        </motion.div>
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

      <Section className="bg-aims-navy">
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6">
          {statistics.map(({ value, label, icon: Icon }) => (
            <motion.div
              key={label}
              whileHover={{ y: -6 }}
              className="rounded-2xl border border-white/10 bg-white/5 p-5 text-center backdrop-blur-sm sm:p-8"
            >
              <Icon className="mx-auto text-yellow-300" aria-hidden="true" />
              <p className="mt-4 text-3xl font-bold text-white sm:text-4xl">{value}</p>
              <p className="mt-2 text-sm text-blue-100 sm:text-base">{label}</p>
            </motion.div>
          ))}
        </div>
      </Section>

      <Section className="bg-white">
        <header className="text-center">
          <p className="font-semibold uppercase tracking-[0.2em] text-aims-blue">What you can study</p>
          <h2 className="mt-3 text-4xl font-bold text-aims-navy">Our programmes</h2>
          <p className="mt-3 text-slate-500">Career-focused programmes designed for success.</p>
        </header>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {programmes.map((programme) => (
            <motion.article
              key={programme.title}
              whileHover={{ scale: 1.02, y: -6 }}
              className="rounded-3xl border border-slate-100 bg-slate-50 p-7 shadow-sm transition hover:border-aims-blue/30 hover:bg-white hover:shadow-xl"
            >
              <span className="text-4xl" aria-hidden="true">{programme.icon}</span>
              <h3 className="mt-5 text-xl font-bold text-aims-navy">{programme.title}</h3>
              <p className="mt-3 leading-7 text-slate-500">{programme.description}</p>
            </motion.article>
          ))}
        </div>
      </Section>

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
            src={campusImage}
            className="rounded-3xl shadow-xl"
            alt="AIMS Campus learning environment"
            loading="lazy"
          />
        </div>
      </Section>

      <Section className="bg-white">
        <h2 className="text-center text-4xl font-bold text-aims-navy">Our academic partners</h2>
        <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-6">
          {partners.map((partner) => (
            <div
              key={partner}
              className="flex h-20 items-center justify-center rounded-xl bg-slate-100 px-3 text-center font-semibold text-slate-600 transition hover:bg-aims-blue hover:text-white"
            >
              {partner}
            </div>
          ))}
        </div>
      </Section>

      <Section className="bg-aims-navy">
        <h2 className="text-4xl font-bold text-white">Latest news</h2>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {news.map((item) => (
            <article key={item.title} className="rounded-2xl bg-white/5 p-7 backdrop-blur-sm">
              <CalendarDays className="text-yellow-300" aria-hidden="true" />
              <h3 className="mt-5 text-xl font-bold text-white">{item.title}</h3>
              <p className="mt-3 text-blue-100">{item.date}</p>
            </article>
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