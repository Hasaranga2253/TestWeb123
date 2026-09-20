import { useCallback, useEffect, useState, type ReactNode } from 'react';

import { AnimatePresence, motion } from 'motion/react';
import {
  ArrowRight,
  CalendarDays,
  Camera,
  ChevronLeft,
  ChevronRight,
  Newspaper,
  X,
} from 'lucide-react';
import { Link } from 'react-router-dom';

import { Container } from '../components/common/Container';
import { backendUrl } from '../utils/api';
import {
  newsUpdates,
  type GalleryImage,
  type NewsUpdate,
} from '../data/newsUpdates';

const sectionReveal = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.14 },
  transition: { duration: 0.55, ease: 'easeOut' },
} as const;

type LightboxImage = GalleryImage & {
  albumTitle: string;
  category: string;
};

function AnimatedSection({
  children,
  className = '',
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <motion.section {...sectionReveal} id={id} className={className}>
      {children}
    </motion.section>
  );
}

export function NewsUpdatesPage() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [updates, setUpdates] =
    useState<NewsUpdate[]>(newsUpdates);

  useEffect(() => {
    const controller = new AbortController();

    async function loadAdminNewsImages() {
      try {
        const response = await fetch(
          backendUrl('/backend/api/news-images.php'),
          {
            cache: 'no-store',
            signal: controller.signal,
          },
        );

        if (!response.ok) {
          return;
        }

        const data = (await response.json()) as {
          albums?: Record<string, GalleryImage[]>;
          customAlbums?: Record<
            string,
            Omit<NewsUpdate, 'images'>
          >;
        };

        if (!data.albums && !data.customAlbums) {
          return;
        }

        const customUpdates = Object.values(
          data.customAlbums ?? {},
        )
          .map((album) => ({
            ...album,
            images: data.albums?.[album.id] ?? [],
          }))
          .filter(
            (album): album is NewsUpdate =>
              Boolean(album.id) &&
              Boolean(album.title) &&
              album.images.length > 0,
          );

        setUpdates(
          [
            ...customUpdates,
            ...newsUpdates.map((update) => {
              const adminImages =
                data.albums?.[update.id] ?? [];

              if (adminImages.length === 0) {
                return update;
              }

              return {
                ...update,
                images: [
                  ...adminImages,
                  ...update.images,
                ],
              };
            }),
          ],
        );
      } catch {
        setUpdates(newsUpdates);
      }
    }

    void loadAdminNewsImages();

    return () => controller.abort();
  }, []);

  const featuredUpdate = updates.find((update) => update.id === 'graduation') ?? updates[0];
  const heroUpdates = updates.filter((update) => update.images.length > 0).slice(0, 4);
  const visibleImages: LightboxImage[] = updates.flatMap((update) =>
    update.images.map((image) => ({
      ...image,
      albumTitle: update.title,
      category: update.category,
    })),
  );

  const openImage = (targetImage: GalleryImage, albumTitle: string) => {
    const targetIndex = visibleImages.findIndex(
      (image) => image.src === targetImage.src && image.albumTitle === albumTitle,
    );

    setLightboxIndex(targetIndex >= 0 ? targetIndex : 0);
  };

  const closeLightbox = useCallback(() => {
    setLightboxIndex(null);
  }, []);

  const showPrevious = useCallback(() => {
    setLightboxIndex((currentIndex) => {
      if (currentIndex === null || visibleImages.length === 0) {
        return currentIndex;
      }

      return (currentIndex - 1 + visibleImages.length) % visibleImages.length;
    });
  }, [visibleImages.length]);

  const showNext = useCallback(() => {
    setLightboxIndex((currentIndex) => {
      if (currentIndex === null || visibleImages.length === 0) {
        return currentIndex;
      }

      return (currentIndex + 1) % visibleImages.length;
    });
  }, [visibleImages.length]);

  useEffect(() => {
    if (lightboxIndex === null) {
      document.body.style.overflow = '';
      return;
    }

    document.body.style.overflow = 'hidden';

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeLightbox();
      }

      if (event.key === 'ArrowLeft') {
        showPrevious();
      }

      if (event.key === 'ArrowRight') {
        showNext();
      }
    };

    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [closeLightbox, lightboxIndex, showNext, showPrevious]);

  const currentLightboxImage = lightboxIndex === null ? null : visibleImages[lightboxIndex];

  return (
    <div className="overflow-x-hidden bg-white text-slate-800">
      <section className="relative isolate overflow-hidden bg-aims-dark text-white">
        <img
          src={featuredUpdate.images[0]?.src}
          alt=""
          aria-hidden="true"
          decoding="async"
          fetchPriority="high"
          className="absolute inset-0 !h-full w-full object-cover opacity-28"
        />
        <div
          className="absolute inset-0 bg-linear-to-r from-[#06142f] via-[#071d49]/88 to-[#071d49]/42"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.07] [background-image:linear-gradient(rgba(255,255,255,0.28)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.22)_1px,transparent_1px)] [background-size:44px_44px]"
          aria-hidden="true"
        />

        <Container className="relative z-10 py-16 sm:py-20 lg:py-24">
          <div className="grid items-center gap-12 lg:grid-cols-[0.95fr_1.05fr]">
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, ease: 'easeOut' }}
              className="max-w-3xl"
            >
              <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-aims-gold backdrop-blur-sm">
                <Newspaper aria-hidden="true" size={15} />
                Campus stories
              </span>

              <h1 className="mt-6 text-4xl font-bold leading-[1.05] tracking-normal sm:text-5xl lg:text-6xl">
                News & Updates
              </h1>

              <p className="mt-6 max-w-2xl text-base leading-8 text-blue-100 sm:text-lg">
                Follow AIMS Campus events, academic milestones, student activities and
                community celebrations through curated photo galleries.
              </p>

              <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <a
                  href="#gallery"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-aims-gold px-7 py-3.5 font-semibold text-aims-dark transition hover:-translate-y-0.5 hover:shadow-xl"
                >
                  Browse galleries
                  <ArrowRight aria-hidden="true" size={17} />
                </a>

                <Link
                  to="/contact"
                  className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/35 bg-white/8 px-7 py-3.5 font-semibold text-white backdrop-blur-sm transition hover:bg-white/14"
                >
                  Share an update
                </Link>
              </div>

            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, ease: 'easeOut', delay: 0.12 }}
              className="grid min-h-[28rem] grid-cols-6 grid-rows-6 gap-3"
              aria-label="Featured campus gallery images"
            >
              {heroUpdates.map((update, index) => (
                <figure
                  key={update.id}
                  className={`group relative overflow-hidden rounded-2xl border border-white/12 bg-white/8 shadow-2xl ${
                    index === 0
                      ? 'col-span-4 row-span-4'
                      : index === 1
                        ? 'col-span-2 row-span-3'
                        : index === 2
                          ? 'col-span-3 row-span-2'
                          : 'col-span-3 row-span-3'
                  }`}
                >
                  <img
                    src={update.images[0]?.src}
                    alt={update.images[0]?.alt ?? update.title}
                    decoding="async"
                    className="!h-full w-full object-cover transition duration-700 group-hover:scale-105"
                  />
                  <figcaption className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/78 via-black/36 to-transparent p-4">
                    <span className="text-xs font-semibold uppercase tracking-[0.14em] text-aims-gold">
                      {update.category}
                    </span>
                    <span className="mt-1 block text-sm font-semibold leading-5 text-white">
                      {update.title}
                    </span>
                  </figcaption>
                </figure>
              ))}
            </motion.div>
          </div>
        </Container>
      </section>

      <AnimatedSection className="bg-white py-14 sm:py-16 lg:py-20">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-end">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-aims-blue">
                Latest collections
              </p>
              <h2 className="mt-4 text-3xl font-bold leading-tight tracking-normal text-aims-navy sm:text-4xl lg:text-5xl">
                Campus life in focus
              </h2>
            </div>
            <p className="max-w-3xl text-base leading-8 text-slate-600 sm:text-lg">
              Each collection is grouped by event type so new albums can be added
              cleanly as the campus photo archive grows.
            </p>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {updates.map((update, index) => (
              <motion.article
                key={update.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.45, delay: index * 0.06, ease: 'easeOut' }}
                whileHover={{ y: -5 }}
                className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_18px_48px_rgba(7,29,73,0.08)] transition hover:border-aims-blue/24"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                  <img
                    src={update.images[0]?.src}
                    alt={update.images[0]?.alt ?? update.title}
                    loading="lazy"
                    decoding="async"
                    className="!h-full w-full object-cover transition duration-700 group-hover:scale-105"
                  />
                  <span className="absolute left-4 top-4 rounded-full bg-white/92 px-3 py-1 text-xs font-bold uppercase tracking-[0.12em] text-aims-blue shadow-sm">
                    {update.category}
                  </span>
                </div>

                <div className="p-5 sm:p-6">
                  <div className="flex flex-wrap gap-3 text-xs font-semibold uppercase tracking-[0.12em] text-slate-400">
                    <span className="inline-flex items-center gap-1.5">
                      <CalendarDays aria-hidden="true" size={14} />
                      {update.dateLabel}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <Camera aria-hidden="true" size={14} />
                      {update.images.length} photos
                    </span>
                  </div>

                  <h3 className="mt-4 text-xl font-bold leading-snug tracking-normal text-aims-navy">
                    {update.title}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-slate-600">
                    {update.summary}
                  </p>

                  <a
                    href={`#${update.id}`}
                    className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-aims-blue transition group-hover:gap-3"
                  >
                    Open collection
                    <ArrowRight aria-hidden="true" size={16} />
                  </a>
                </div>
              </motion.article>
            ))}
          </div>
        </Container>
      </AnimatedSection>

      <AnimatedSection id="gallery" className="bg-slate-50 py-14 sm:py-16 lg:py-20">
        <Container>
          <div className="flex flex-col gap-7 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-aims-blue">
                Photo galleries
              </p>
              <h2 className="mt-4 text-3xl font-bold leading-tight tracking-normal text-aims-navy sm:text-4xl lg:text-5xl">
                Browse by event category
              </h2>
              <p className="mt-5 text-base leading-8 text-slate-600 sm:text-lg">
                UEL, orientation, graduation, PhD events, EDEX Edu and AIMS New
                Year Festival albums are ready for future updates.
              </p>
            </div>

          </div>

          <div className="mt-12 space-y-14">
            {updates.map((update) => (
              <section key={update.id} id={update.id} className="scroll-mt-36">
                <div className="mb-6 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
                  <div className="max-w-3xl">
                    <span className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] text-aims-blue shadow-sm ring-1 ring-slate-200">
                      {update.tag}
                    </span>
                    <h3 className="mt-4 text-2xl font-bold leading-tight tracking-normal text-aims-navy sm:text-3xl">
                      {update.title}
                    </h3>
                    <p className="mt-3 text-base leading-7 text-slate-600">
                      {update.summary}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                  {update.images.map((image, index) => (
                    <motion.button
                      key={`${update.id}-${image.fileName}`}
                      type="button"
                      onClick={() => openImage(image, update.title)}
                      initial={{ opacity: 0, y: 18 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.2 }}
                      transition={{ duration: 0.36, delay: Math.min(index * 0.025, 0.22) }}
                      className={`group relative overflow-hidden rounded-xl bg-slate-200 text-left shadow-sm ring-1 ring-slate-200 transition hover:-translate-y-1 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-aims-blue ${
                        index === 0 ? 'col-span-2 row-span-2' : ''
                      }`}
                    >
                      <img
                        src={image.src}
                        alt={image.alt}
                        loading="lazy"
                        decoding="async"
                        className={`w-full object-cover transition duration-700 group-hover:scale-105 ${
                          index === 0 ? '!h-full min-h-[18rem]' : 'aspect-square !h-auto'
                        }`}
                      />
                      <span className="absolute inset-0 bg-black/0 transition group-hover:bg-black/18" />
                      <span className="absolute bottom-3 left-3 rounded-full bg-white/92 px-3 py-1 text-xs font-bold text-aims-navy opacity-0 shadow-sm transition group-hover:opacity-100">
                        View photo
                      </span>
                    </motion.button>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </Container>
      </AnimatedSection>

      <section className="relative overflow-hidden bg-aims-section py-16 text-white sm:py-20 lg:py-24">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-aims-gold">
              Stay connected
            </p>
            <h2 className="mt-4 text-3xl font-bold leading-tight tracking-normal text-white sm:text-4xl lg:text-5xl">
              See what is happening at AIMS Campus
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-blue-100 sm:text-lg">
              For admissions events, programme briefings and student activities,
              contact the campus team directly.
            </p>
            <Link
              to="/contact"
              className="mt-8 inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-aims-gold px-7 py-3.5 font-semibold text-aims-dark transition hover:-translate-y-0.5 hover:shadow-xl"
            >
              Contact AIMS Campus
              <ArrowRight aria-hidden="true" size={17} />
            </Link>
          </div>
        </Container>
      </section>

      <AnimatePresence>
        {currentLightboxImage ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[180] flex items-center justify-center bg-slate-950/92 p-4 text-white backdrop-blur-sm"
            role="dialog"
            aria-modal="true"
            aria-label={`${currentLightboxImage.albumTitle} image preview`}
            onClick={closeLightbox}
          >
            <button
              type="button"
              onClick={closeLightbox}
              aria-label="Close image preview"
              className="absolute right-4 top-4 z-20 inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/18"
            >
              <X aria-hidden="true" size={21} />
            </button>

            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                showPrevious();
              }}
              aria-label="Previous image"
              className="absolute left-4 top-1/2 z-20 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/18"
            >
              <ChevronLeft aria-hidden="true" size={24} />
            </button>

            <motion.figure
              key={currentLightboxImage.src}
              initial={{ opacity: 0, scale: 0.96, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.22 }}
              className="w-full max-w-6xl"
              onClick={(event) => event.stopPropagation()}
            >
              <img
                src={currentLightboxImage.src}
                alt={currentLightboxImage.alt}
                decoding="async"
                className="mx-auto max-h-[78vh] w-auto rounded-2xl object-contain shadow-2xl"
              />
              <figcaption className="mx-auto mt-5 max-w-3xl text-center">
                <span className="text-xs font-semibold uppercase tracking-[0.16em] text-aims-gold">
                  {currentLightboxImage.category}
                </span>
                <p className="mt-2 text-lg font-semibold text-white">
                  {currentLightboxImage.albumTitle}
                </p>
              </figcaption>
            </motion.figure>

            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                showNext();
              }}
              aria-label="Next image"
              className="absolute right-4 top-1/2 z-20 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/18"
            >
              <ChevronRight aria-hidden="true" size={24} />
            </button>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
