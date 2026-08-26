import { useMemo, useState } from 'react';
import {
  ArrowRight,
  Briefcase,
  BookOpen,
  CheckCircle,
  ChevronLeft,
  ClipboardList,
  Clock3,
  Cloud,
  Code2,
  Compass,
  Globe,
  GraduationCap,
  Layers3,
  type LucideIcon,
  TrendingUp,
  Wallet,
} from 'lucide-react';
import { motion, type Variants } from 'motion/react';
import { Link, useParams } from 'react-router-dom';

import { Container } from '../components/common/Container';
import { getProgrammeBySlug } from '../data/programmes';

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, delay: i * 0.06, ease: 'easeOut' as const },
  }),
};

// Same quiet-icon language used on the programme overview page, so a
// programme keeps its identity as you move from the listing to its details.
const programmeIcons: Record<string, LucideIcon> = {
  foundation: Compass,
  'applied-computing': Code2,
  education: GraduationCap,
  'international-business-management': Briefcase,
};

// Two small satellite icons per programme, used to build the hero motif
// entirely out of shapes and icons instead of a stock photo.
const decorativeIcons: Record<string, [LucideIcon, LucideIcon]> = {
  foundation: [ClipboardList, BookOpen],
  'applied-computing': [Code2, Cloud],
  education: [BookOpen, ClipboardList],
  'international-business-management': [TrendingUp, Globe],
};

export function ProgrammeDetailsPage() {
  const { programmeSlug } = useParams<{ programmeSlug: string }>();
  const programme = getProgrammeBySlug(programmeSlug);
  const [activeGroup, setActiveGroup] = useState(0);

  const ProgrammeIcon = programme ? programmeIcons[programme.slug] ?? Compass : Compass;
  const [DecorIconA, DecorIconB] = (programme && decorativeIcons[programme.slug]) || [Compass, Layers3];

  // Reset to the first study block whenever the visitor lands on a different
  // programme, so switching from the nav dropdown never leaves a stale tab open.
  const activeIndex = useMemo(
    () => (programme && activeGroup < programme.moduleGroups.length ? activeGroup : 0),
    [activeGroup, programme],
  );

  if (!programme) {
    return (
      <section className="py-20">
        <Container>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-aims-blue">Programme</p>
          <h1 className="mt-3 text-3xl font-bold text-aims-navy sm:text-4xl">Programme not found</h1>
          <p className="mt-4 max-w-2xl text-slate-600">
            The selected programme page does not exist.
          </p>
          <Link
            to="/programmes"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-aims-navy px-5 py-3 font-semibold text-white transition hover:-translate-y-0.5 hover:bg-aims-blue"
          >
            <ChevronLeft size={16} aria-hidden="true" />
            Back to programmes
          </Link>
        </Container>
      </section>
    );
  }

  const activeModuleGroup = programme.moduleGroups[activeIndex];

  return (
    <div className="bg-white text-slate-800">
      <section className="relative overflow-hidden bg-aims-section py-16 text-white">
        {/* quiet dot-grid texture, echoes the pattern already used on the programme's own hero image */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.07] [background-image:radial-gradient(circle,rgba(255,255,255,0.8)_1px,transparent_1px)] [background-size:22px_22px]"
          aria-hidden="true"
        />
        <div className="pointer-events-none absolute -left-24 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-aims-blue/30 blur-3xl" aria-hidden="true" />

        <Container>
        <div className="relative">
          <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div>
              <Link
                to="/programmes"
                className="inline-flex items-center gap-2 text-sm font-semibold text-blue-100 transition hover:text-white"
              >
                <ChevronLeft size={16} aria-hidden="true" />
                Back to programmes
              </Link>

              <div className="mt-6 flex items-center gap-3">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-white/15 bg-white/10 text-aims-gold backdrop-blur-sm">
                  <ProgrammeIcon size={20} aria-hidden="true" />
                </span>
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-aims-gold">
                  {programme.eyebrow}
                </p>
              </div>

              <h1 className="mt-5 max-w-3xl text-3xl font-bold tracking-tight sm:text-5xl">
                {programme.title}
              </h1>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-blue-100">
                {programme.summary}
              </p>

              <ul className="mt-8 flex flex-wrap gap-3">
                {programme.highlights.map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-medium text-white/90 backdrop-blur-sm"
                  >
                    <CheckCircle size={14} className="text-aims-gold" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>

              <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4">
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-aims-gold px-6 py-3.5 font-semibold text-aims-dark transition hover:-translate-y-0.5 hover:shadow-xl"
                >
                  Enquire now
                  <ArrowRight size={16} aria-hidden="true" />
                </Link>
                <a
                  href="#modules"
                  className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/8 px-6 py-3.5 font-semibold text-white transition hover:bg-white/12"
                >
                  View modules
                </a>
              </div>
            </div>

            <motion.div
              whileHover={{ y: -6 }}
              transition={{ duration: 0.25 }}
              className={`relative flex min-h-[24rem] flex-col overflow-hidden rounded-[2rem] bg-linear-to-br ${programme.accentClass} shadow-[0_24px_70px_rgba(0,0,0,0.28)] sm:min-h-[24rem] lg:min-h-[30rem]`}
            >
              {/* built entirely from shapes, rings and icons in the programme's own accent colour — no stock photography */}
              <div
                className="pointer-events-none absolute inset-0 opacity-30 [background-image:radial-gradient(circle,rgba(255,255,255,0.6)_1px,transparent_1px)] [background-size:26px_26px]"
                aria-hidden="true"
              />
              <div
                className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full border border-white/20"
                aria-hidden="true"
              />
              <div
                className="pointer-events-none absolute -right-20 -top-20 h-96 w-96 rounded-full border border-white/10"
                aria-hidden="true"
              />
              <div
                className="pointer-events-none absolute inset-0 bg-linear-to-t from-[#03122a]/80 via-transparent to-[#03122a]/10"
                aria-hidden="true"
              />

              <div className="relative z-10 flex flex-1 items-center justify-center px-10 pt-8">
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                  className="flex h-28 w-28 items-center justify-center rounded-[1.75rem] border border-white/25 bg-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.25)] backdrop-blur-md sm:h-36 sm:w-36"
                >
                  <ProgrammeIcon className="text-white" size={56} strokeWidth={1.25} aria-hidden="true" />
                </motion.div>

                <motion.div
                  animate={{ y: [0, 8, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
                  className="absolute left-8 top-6 flex h-11 w-11 items-center justify-center rounded-2xl border border-white/20 bg-white/10 backdrop-blur-sm sm:left-12 sm:top-10"
                >
                  <DecorIconA className="text-white/90" size={18} aria-hidden="true" />
                </motion.div>

                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 0.6 }}
                  className="absolute bottom-6 right-8 flex h-11 w-11 items-center justify-center rounded-2xl border border-white/20 bg-white/10 backdrop-blur-sm sm:bottom-10 sm:right-14"
                >
                  <DecorIconB className="text-white/90" size={18} aria-hidden="true" />
                </motion.div>
              </div>

              <p className="relative z-10 px-8 pb-4 text-center text-xs font-semibold uppercase tracking-[0.28em] text-white/70">
                {programme.eyebrow}
              </p>

              <div className="relative z-10 grid divide-y divide-white/10 border-t border-white/10 bg-[#03122a]/70 backdrop-blur-sm sm:grid-cols-3 sm:divide-x sm:divide-y-0">
                <div className="flex flex-1 items-center gap-3 p-4">
                  <Compass className="shrink-0 text-aims-gold" size={18} aria-hidden="true" />
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-aims-gold">Route</p>
                    <p className="mt-0.5 text-sm text-white/90">{programme.focus}</p>
                  </div>
                </div>
                <div className="flex flex-1 items-center gap-3 p-4">
                  <Layers3 className="shrink-0 text-aims-gold" size={18} aria-hidden="true" />
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-aims-gold">Modules</p>
                    <p className="mt-0.5 text-sm text-white/90">{programme.moduleGroups.length} study blocks</p>
                  </div>
                </div>
                <div className="flex flex-1 items-center gap-3 p-4">
                  <Wallet className="shrink-0 text-aims-gold" size={18} aria-hidden="true" />
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-aims-gold">Fees</p>
                    <p className="mt-0.5 text-sm text-white/90">{programme.fees[0]?.value ?? 'Available on request'}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
        </Container>
      </section>

      <section className="py-14 sm:py-20" id="modules">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr]">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-aims-blue">
                What you study
              </p>
              <h2 className="mt-3 text-3xl font-bold text-aims-navy sm:text-4xl">
                Course structure and progression
              </h2>
              <p className="mt-4 max-w-xl text-slate-600">
                {programme.moduleGroups.length > 1
                  ? 'Step through each study block to see exactly what it covers.'
                  : 'Here is what this study block covers.'}
              </p>

              <div className="mt-8 grid gap-6 md:grid-cols-[0.85fr_1.15fr]">
                {/* stepper: doubles as a table of contents and a progress marker through the programme */}
                <div className="flex gap-3 overflow-x-auto pb-2 md:flex-col md:overflow-visible md:border-l md:border-slate-200 md:pb-0 md:pl-0">
                  {programme.moduleGroups.map((group, index) => {
                    const isActive = index === activeIndex;
                    return (
                      <button
                        key={group.title}
                        type="button"
                        onClick={() => setActiveGroup(index)}
                        aria-current={isActive}
                        className={`group flex max-w-[17rem] shrink-0 items-start gap-3 rounded-2xl px-4 py-3 text-left transition md:max-w-none md:-ml-px md:shrink md:rounded-none md:border-l-2 md:px-5 md:py-4 ${
                          isActive
                            ? 'bg-aims-navy text-white md:border-l-aims-gold md:bg-aims-navy/[0.04] md:text-aims-navy'
                            : 'border border-slate-200 text-slate-600 hover:border-aims-blue/30 hover:text-aims-navy md:border-l-transparent md:border-y-0 md:border-r-0'
                        }`}
                      >
                        <span
                          className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                            isActive
                              ? 'bg-aims-gold text-aims-dark'
                              : 'bg-slate-100 text-slate-500 group-hover:bg-aims-blue/10 group-hover:text-aims-blue'
                          }`}
                        >
                          {index + 1}
                        </span>
                        <span>
                          <span className="block text-sm font-semibold leading-5">{group.title}</span>
                          <span className={`mt-0.5 block text-xs ${isActive ? 'text-blue-100 md:text-slate-500' : 'text-slate-400'}`}>
                            {group.items.length} modules
                          </span>
                        </span>
                      </button>
                    );
                  })}
                </div>

                <motion.div
                  key={activeModuleGroup.title}
                  initial="hidden"
                  animate="show"
                  variants={fadeUp}
                  className="rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_12px_35px_rgba(7,29,73,0.08)]"
                >
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="text-xl font-bold text-aims-navy">{activeModuleGroup.title}</h3>
                    <Layers3 className="shrink-0 text-aims-blue" size={18} aria-hidden="true" />
                  </div>
                  <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                    {activeModuleGroup.items.map((item) => (
                      <li key={item} className="flex items-start gap-3 text-sm leading-6 text-slate-600">
                        <CheckCircle className="mt-0.5 shrink-0 text-aims-blue" size={16} aria-hidden="true" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </div>
            </div>

            <aside className="space-y-6">
              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
                <div className="flex items-center gap-3">
                  <Clock3 className="text-aims-blue" size={18} aria-hidden="true" />
                  <h3 className="text-xl font-bold text-aims-navy">Study route</h3>
                </div>
                <ol className="mt-6 space-y-0">
                  {programme.routeSteps.map((step, index) => (
                    <li key={step} className="relative flex gap-4 pb-6 last:pb-0">
                      {index !== programme.routeSteps.length - 1 && (
                        <span
                          className="absolute left-[7px] top-4 h-[calc(100%-0.75rem)] w-px bg-slate-200"
                          aria-hidden="true"
                        />
                      )}
                      <span
                        className={`relative z-10 mt-1 h-4 w-4 shrink-0 rounded-full border-2 ${
                          index === 0 ? 'border-aims-gold bg-aims-gold' : 'border-aims-blue bg-white'
                        }`}
                        aria-hidden="true"
                      />
                      <p className="text-sm leading-6 text-slate-600">{step}</p>
                    </li>
                  ))}
                </ol>
              </div>

              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
                <div className="flex items-center gap-3">
                  <Wallet className="text-aims-blue" size={18} aria-hidden="true" />
                  <h3 className="text-xl font-bold text-aims-navy">Fees snapshot</h3>
                </div>
                <ul className="mt-5 divide-y divide-dashed divide-slate-200 rounded-2xl bg-white px-4 shadow-sm">
                  {programme.fees.map((item) => (
                    <li key={item.label} className="flex items-start justify-between gap-4 py-3.5">
                      <span className="text-sm font-medium text-slate-600">{item.label}</span>
                      <span className="shrink-0 text-right">
                        <span className="block font-mono text-sm font-semibold text-aims-navy">
                          {item.value}
                        </span>
                        {item.note && (
                          <span className="mt-0.5 block text-xs text-slate-400">{item.note}</span>
                        )}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-aims-blue">
                  {programme.slug === 'foundation' ? 'Progression routes' : 'Career paths'}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {programme.careers.map((career) => (
                    <span
                      key={career}
                      className="rounded-full border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-600 shadow-sm transition hover:-translate-y-0.5 hover:border-aims-blue/30 hover:text-aims-blue"
                    >
                      {career}
                    </span>
                  ))}
                </div>
              </div>

              <Link
                to="/contact"
                className="flex flex-col items-start justify-between gap-3 rounded-3xl bg-aims-navy p-6 text-white transition hover:bg-aims-blue sm:flex-row sm:items-center"
              >
                <span>
                  <span className="block text-sm font-semibold uppercase tracking-[0.18em] text-aims-gold">
                    Ready to apply?
                  </span>
                  <span className="mt-1 block text-sm text-blue-100">Talk to admissions about this programme</span>
                </span>
                <ArrowRight size={18} className="shrink-0" aria-hidden="true" />
              </Link>
            </aside>
          </div>
        </Container>
      </section>
    </div>
  );
}
