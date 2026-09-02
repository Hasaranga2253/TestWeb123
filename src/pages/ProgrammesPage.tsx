import {
  ArrowRight,
  Briefcase,
  CheckCircle2,
  Code2,
  Compass,
  GraduationCap,
  Layers3,
  type LucideIcon,
  MapPin,
  PlaneTakeoff,
} from 'lucide-react';
import { motion, type Variants } from 'motion/react';
import { Link } from 'react-router-dom';

import { Container } from '../components/common/Container';
import { programmes, programmeNavLinks } from '../data/programmes';

const journeyStages = [
  {
    icon: MapPin,
    eyebrow: 'Start here',
    label: 'O/L or A/L results',
    caption: 'Direct entry to a degree after A/L, or via Foundation after O/L.',
  },
  {
    icon: Compass,
    eyebrow: 'Stage 1',
    label: 'Foundation (if needed)',
    caption: 'Study skills, maths and subject grounding before Year 1.',
  },
  {
    icon: Layers3,
    eyebrow: 'Stage 2',
    label: 'Level 4 & 5 diplomas',
    caption: 'Two years on campus in Colombo, taught to NCC UK / AIMS standard.',
  },
  {
    icon: PlaneTakeoff,
    eyebrow: 'Stage 3',
    label: 'Final year, UEL London',
    caption: 'Optional transfer to complete your Honours year with UEL.',
  },
];

// One quiet, oversized icon per programme instead of a photo — keeps the
// preview cards on-brand and legible without depending on stock imagery.
const programmeIcons: Record<string, LucideIcon> = {
  foundation: Compass,
  'applied-computing': Code2,
  education: GraduationCap,
  'international-business-management': Briefcase,
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, delay: i * 0.08, ease: 'easeOut' as const },
  }),
};

export function ProgrammesPage() {
  return (
    <div className="bg-white text-slate-800">
      {/* HERO */}
      <section className="overflow-hidden border-b border-slate-200 bg-[radial-gradient(circle_at_top_left,rgba(18,63,145,0.08),transparent_34%),linear-gradient(180deg,rgba(248,250,252,1),rgba(255,255,255,1))] py-14 sm:py-20">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-aims-blue">
                Programmes
              </p>
              <h1 className="mt-4 max-w-2xl text-3xl font-bold tracking-tight text-aims-navy sm:text-5xl">
                From your O/Levels or A/Levels to a UK degree, mapped stage by stage
              </h1>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">
                One foundation pathway and three undergraduate programmes, each following the same
                route: study on campus in Colombo, then finish, if you choose, with a final year at
                the University of East London. Choose a course below to see its modules and careers.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <a
                  href="#courses"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-aims-navy px-6 py-3 font-semibold text-white transition hover:-translate-y-0.5 hover:bg-aims-blue"
                >
                  Browse courses
                  <ArrowRight size={16} aria-hidden="true" />
                </a>
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-200 bg-white px-6 py-3 font-semibold text-aims-navy transition hover:-translate-y-0.5 hover:border-aims-blue/30 hover:text-aims-blue"
                >
                  Contact admissions
                </Link>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {programmes.map((programme, index) => {
                const ProgrammeIcon = programmeIcons[programme.slug] ?? Compass;

                return (
                  <motion.div
                    key={programme.slug}
                    initial="hidden"
                    animate="show"
                    custom={index}
                    variants={fadeUp}
                    whileHover={{ y: -6 }}
                    className={`relative overflow-hidden rounded-3xl bg-linear-to-br ${programme.accentClass} shadow-[0_18px_50px_rgba(7,29,73,0.16)] ${
                      index === 0 ? 'sm:col-span-2' : ''
                    }`}
                  >
                    {/* quiet watermark icon, replaces the photo */}
                    <ProgrammeIcon
                      className="pointer-events-none absolute -right-5 -top-5 h-32 w-32 text-white/15"
                      strokeWidth={1.25}
                      aria-hidden="true"
                    />
                    {/* darken the lower half a touch so white text stays legible on lighter gradients */}
                    <div className="absolute inset-0 bg-linear-to-b from-black/5 via-black/10 to-black/45" />

                    <div className="relative z-10 flex h-full min-h-[13rem] flex-col justify-between p-5 text-white">
                      <span className="w-fit rounded-full border border-white/25 bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] backdrop-blur-sm">
                        {programme.eyebrow}
                      </span>
                      <div>
                        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-aims-gold">
                          {programme.focus}
                        </p>
                        <h2 className="mt-2 text-2xl font-bold leading-tight">{programme.title}</h2>
                        <p className="mt-2 max-w-md text-sm leading-6 text-blue-50/90">
                          {programme.routeSteps[0]}
                        </p>
                        <div className="mt-4 flex flex-wrap gap-2">
                          {programme.highlights.slice(0, 2).map((item) => (
                            <span
                              key={item}
                              className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium text-white/90"
                            >
                              {item}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* JOURNEY LINE — the real, shared progression every programme follows */}
          <div className="relative mt-16">
            <div className="absolute left-6 right-6 top-6 hidden h-px bg-gradient-to-r from-transparent via-aims-gold/70 to-transparent md:block" />
            <ol className="relative grid gap-8 md:grid-cols-4">
              {journeyStages.map((stage, index) => (
                <motion.li
                  key={stage.label}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, margin: '-60px' }}
                  custom={index}
                  variants={fadeUp}
                  className="relative flex gap-4 md:flex-col md:items-center md:gap-3 md:text-center"
                >
                  {index !== journeyStages.length - 1 && (
                    <span
                      aria-hidden="true"
                      className="absolute left-6 top-14 h-[calc(100%-1rem)] w-px bg-slate-200 md:hidden"
                    />
                  )}
                  <span className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 border-aims-gold bg-white text-aims-navy shadow-sm">
                    <stage.icon size={20} aria-hidden="true" />
                  </span>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-aims-blue">
                      {stage.eyebrow}
                    </p>
                    <p className="mt-1 font-semibold text-aims-navy">{stage.label}</p>
                    <p className="mt-1 text-sm text-slate-500">{stage.caption}</p>
                  </div>
                </motion.li>
              ))}
            </ol>
          </div>
        </Container>
      </section>

      {/* COURSES */}
      <section id="courses" className="py-14 sm:py-20">
        <Container>
          <header className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-aims-blue">
              Browse courses
            </p>
            <h2 className="mt-3 text-3xl font-bold text-aims-navy sm:text-4xl">
              Open each programme separately
            </h2>
            <p className="mt-4 text-slate-600">
              Each card links to a dedicated page with the modules and careers from the brochure.
            </p>
          </header>

          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            {programmes.map((programme, index) => {
              const totalModules = programme.moduleGroups.reduce(
                (sum, group) => sum + group.items.length,
                0,
              );

              return (
                <motion.article
                  key={programme.slug}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, margin: '-80px' }}
                  custom={index}
                  variants={fadeUp}
                  whileHover={{ y: -6 }}
                  className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_14px_40px_rgba(7,29,73,0.08)]"
                >
                  <div className="flex h-full flex-col lg:grid lg:grid-cols-[0.9fr_1.1fr]">
                    <div className="relative shrink-0 overflow-hidden bg-slate-100 lg:h-full lg:min-h-[18rem]">
                      <img
                        src={programme.image}
                        alt={programme.title}
                        className="h-60 w-full object-cover object-top sm:h-72 lg:absolute lg:inset-0 lg:h-full"
                        loading="lazy"
                      />
                      <div
                        className={`absolute inset-0 bg-linear-to-br ${programme.accentClass} opacity-35`}
                      />
                      <div className="absolute inset-0 bg-linear-to-t from-[#04122d]/85 via-transparent to-transparent" />
                      <div className="absolute left-5 top-5 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-white backdrop-blur-sm">
                        {programme.eyebrow}
                      </div>
                    </div>

                    <div className="flex min-h-0 flex-col bg-white p-5 sm:p-7">
                      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-aims-gold sm:text-sm sm:tracking-[0.18em]">
                        {programme.focus}
                      </p>
                      <h3 className="mt-2 text-xl font-bold leading-tight text-aims-navy sm:text-2xl">
                        {programme.title}
                      </h3>
                      <p className="mt-3 text-sm leading-6 text-slate-600 sm:mt-4 sm:text-base sm:leading-7">
                        {programme.summary}
                      </p>

                      <div className="mt-4 flex flex-col gap-2 text-sm text-slate-500 sm:mt-5 sm:flex-row sm:flex-wrap sm:gap-4">
                        <span className="inline-flex items-center gap-1.5">
                          <Layers3 size={14} className="text-aims-blue" aria-hidden="true" />
                          {totalModules} modules · {programme.moduleGroups.length} stages
                        </span>
                      </div>

                      <div className="mt-5 flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-2 sm:gap-y-3">
                        {programme.routeSteps.slice(0, 3).map((step, stepIndex, steps) => (
                          <div key={step} className="flex min-w-0 items-center gap-2">
                            <span className="inline-flex w-full min-w-0 items-start gap-1.5 rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-medium leading-5 text-slate-600 sm:w-auto sm:items-center sm:rounded-full sm:py-1.5">
                              <CheckCircle2 size={12} className="text-aims-blue" aria-hidden="true" />
                              {step}
                            </span>
                            {stepIndex < steps.length - 1 && (
                              <ArrowRight
                                size={12}
                                className="hidden shrink-0 text-slate-300 sm:block"
                                aria-hidden="true"
                              />
                            )}
                          </div>
                        ))}
                      </div>

                      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                        <Link
                          to={
                            programmeNavLinks.find((item) => item.slug === programme.slug)?.to ??
                            '/programmes'
                          }
                          className="inline-flex items-center justify-center gap-2 rounded-full bg-aims-navy px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-aims-blue"
                        >
                          View details
                          <ArrowRight size={16} aria-hidden="true" />
                        </Link>
                        <Link
                          to="/contact"
                          className="inline-flex items-center justify-center rounded-full border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-600 transition hover:border-aims-blue/30 hover:text-aims-blue"
                        >
                          Apply / enquire
                        </Link>
                      </div>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </Container>
      </section>
    </div>
  );
}
