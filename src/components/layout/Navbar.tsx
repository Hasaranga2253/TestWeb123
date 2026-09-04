import { useEffect, useState } from 'react';

import { ChevronDown, Menu, X } from 'lucide-react';
import { Link, NavLink, useLocation } from 'react-router-dom';

import { Container } from '../common/Container';
import CmpsLogo from '../../assets/logos/CmpsLogo-cropped.png';
import UelLogo from '../../assets/logos/University of East London Crest Logo-cropped.png';
import { programmeNavLinks } from '../../data/programmes';

const navigation = [
  { label: 'Home', to: '/' },
];

const secondaryNavigation = [
  { label: 'News & Updates', to: '/news-updates' },
  { label: 'Contact', to: '/contact' },
  { label: 'About', to: '/about' },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isProgrammesOpen, setIsProgrammesOpen] = useState(false);

  const { pathname } = useLocation();

  const isProgrammesRoute = pathname.startsWith('/programmes');

  const logoHeight = 'clamp(1.9rem, 7vw, 2.75rem)';
  const dividerHeight = 'clamp(2rem, 3.5vw, 2.5rem)';

  useEffect(() => {
    setIsOpen(false);
    setIsProgrammesOpen(false);
  }, [pathname]);

  const closeMenus = () => {
    setIsOpen(false);
    setIsProgrammesOpen(false);
  };

  return (
    <>
      {/* =====================================================
          FIXED MAIN NAVBAR

          top-14 = exactly below the 56px AnnouncementBar
      ====================================================== */}

      <header className="fixed left-0 right-0 top-14 z-[100] w-full border-b border-slate-200 bg-white shadow-sm">
        <Container className="max-w-none py-3">
          <div className="flex items-center justify-between gap-6">
            {/* =================================================
                LOGOS
            ================================================== */}

            <div className="flex min-w-0 shrink-0 items-center gap-2 sm:gap-3 md:gap-4">
              {/* AIMS Logo */}

              <Link
                to="/"
                aria-label="AIMS Campus home"
                onClick={closeMenus}
                className="flex shrink-0 items-center"
              >
                <img
                  src={CmpsLogo}
                  alt="AIMS Campus logo"
                  width={120}
                  height={44}
                  decoding="async"
                  className="block shrink-0 object-contain"
                  style={{
                    height: logoHeight,
                    width: 'auto',
                    maxWidth: 'min(30vw, 120px)',
                  }}
                />
              </Link>

              {/* Divider */}

              <span
                className="w-px shrink-0 bg-slate-200"
                style={{
                  height: dividerHeight,
                }}
                aria-hidden="true"
              />

              {/* University of East London Logo */}

              <a
                href="https://www.uel.ac.uk/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit University of East London website"
                className="flex shrink-0 items-center transition-opacity hover:opacity-80"
              >
                <img
                  src={UelLogo}
                  alt="University of East London logo"
                  width={168}
                  height={44}
                  decoding="async"
                  className="block shrink-0 object-contain"
                  style={{
                    height: logoHeight,
                    width: 'auto',
                    maxWidth: 'min(38vw, 168px)',
                  }}
                />
              </a>
            </div>

            {/* =================================================
                DESKTOP NAVIGATION
            ================================================== */}

            <nav
              aria-label="Main navigation"
              className="hidden lg:flex lg:flex-1 lg:justify-end"
            >
              <ul className="flex items-center gap-8 text-base font-semibold text-slate-600">
                {navigation.map((item) => (
                  <li key={item.to}>
                    <NavLink
                      to={item.to}
                      className={({ isActive }) =>
                        `inline-flex items-center gap-1 transition hover:text-aims-blue ${
                          isActive
                            ? 'text-aims-blue'
                            : ''
                        }`
                      }
                    >
                      {item.label}
                    </NavLink>
                  </li>
                ))}

                {/* =================================================
                    PROGRAMMES
                ================================================== */}

                <li className="relative">
                  <button
                    type="button"
                    onClick={() =>
                      setIsProgrammesOpen(
                        (value) => !value,
                      )
                    }
                    onMouseEnter={() =>
                      setIsProgrammesOpen(true)
                    }
                    className={`inline-flex items-center gap-1 transition hover:text-aims-blue ${
                      isProgrammesRoute
                        ? 'text-aims-blue'
                        : ''
                    }`}
                    aria-expanded={isProgrammesOpen}
                    aria-haspopup="menu"
                  >
                    Programmes

                    <ChevronDown
                      size={14}
                      aria-hidden="true"
                      className={`transition ${
                        isProgrammesOpen
                          ? 'rotate-180'
                          : ''
                      }`}
                    />
                  </button>

                  {isProgrammesOpen ? (
                    <div
                      className="absolute right-0 top-full z-[120] mt-3 w-80 rounded-2xl border border-slate-200 bg-white p-3 shadow-xl"
                      onMouseLeave={() =>
                        setIsProgrammesOpen(false)
                      }
                      onMouseEnter={() =>
                        setIsProgrammesOpen(true)
                      }
                    >
                      <Link
                        to="/programmes"
                        onClick={closeMenus}
                        className="flex items-center justify-between rounded-xl px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 hover:text-aims-blue"
                      >
                        Programme overview

                        <ChevronDown
                          size={14}
                          aria-hidden="true"
                          className="rotate-[-90deg]"
                        />
                      </Link>

                      <div className="mt-2 space-y-2">
                        {programmeNavLinks.map((item) => (
                          <Link
                            key={item.slug}
                            to={item.to}
                            onClick={closeMenus}
                            className="flex items-start justify-between rounded-xl px-4 py-3 text-sm font-medium text-slate-600 transition hover:bg-slate-50 hover:text-aims-blue"
                          >
                            <span>{item.label}</span>

                            <span className="ml-4 text-xs uppercase tracking-[0.18em] text-slate-400">
                              Open
                            </span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  ) : null}
                </li>

                {secondaryNavigation.map((item) => (
                  <li key={item.to}>
                    <NavLink
                      to={item.to}
                      className={({ isActive }) =>
                        `inline-flex items-center gap-1 transition hover:text-aims-blue ${
                          isActive
                            ? 'text-aims-blue'
                            : ''
                        }`
                      }
                    >
                      {item.label}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </nav>

            {/* =================================================
                MOBILE BUTTON
            ================================================== */}

            <button
              type="button"
              onClick={() =>
                setIsOpen((value) => !value)
              }
              aria-expanded={isOpen}
              aria-controls="mobile-navigation"
              aria-label={
                isOpen
                  ? 'Close navigation menu'
                  : 'Open navigation menu'
              }
              className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-slate-200 text-slate-700 transition hover:border-aims-blue hover:text-aims-blue lg:hidden"
            >
              {isOpen ? (
                <X
                  size={20}
                  aria-hidden="true"
                />
              ) : (
                <Menu
                  size={20}
                  aria-hidden="true"
                />
              )}
            </button>
          </div>

          {/* =================================================
              MOBILE NAVIGATION
          ================================================== */}

          {isOpen ? (
            <nav
              id="mobile-navigation"
              aria-label="Mobile navigation"
              className="mt-4 lg:hidden"
            >
              <ul className="max-h-[65vh] space-y-2 overflow-y-auto rounded-2xl border border-slate-200 bg-slate-50 p-3 shadow-xl">
                {navigation.map((item) => (
                  <li key={item.to}>
                    <NavLink
                      to={item.to}
                      onClick={closeMenus}
                      className={({ isActive }) =>
                        `flex items-center justify-between rounded-xl px-4 py-3 text-sm font-semibold transition ${
                          isActive
                            ? 'bg-white text-aims-blue shadow-sm'
                            : 'text-slate-600 hover:bg-white hover:text-aims-blue'
                        }`
                      }
                    >
                      <span>
                        {item.label}
                      </span>
                    </NavLink>
                  </li>
                ))}

                {/* =================================================
                    MOBILE PROGRAMMES
                ================================================== */}

                <li>
                  <button
                    type="button"
                    onClick={() =>
                      setIsProgrammesOpen(
                        (value) => !value,
                      )
                    }
                    className={`flex w-full items-center justify-between rounded-xl px-4 py-3 text-sm font-semibold transition ${
                      isProgrammesRoute
                        ? 'bg-white text-aims-blue shadow-sm'
                        : 'text-slate-600 hover:bg-white hover:text-aims-blue'
                    }`}
                    aria-expanded={isProgrammesOpen}
                    aria-controls="mobile-programmes-menu"
                  >
                    <span>
                      Programmes
                    </span>

                    <ChevronDown
                      size={14}
                      aria-hidden="true"
                      className={`transition ${
                        isProgrammesOpen
                          ? 'rotate-180'
                          : ''
                      }`}
                    />
                  </button>

                  {isProgrammesOpen ? (
                    <div
                      id="mobile-programmes-menu"
                      className="mt-2 space-y-2 pl-3"
                    >
                      <Link
                        to="/programmes"
                        onClick={closeMenus}
                        className="block rounded-xl bg-white px-4 py-3 text-sm font-semibold text-slate-600 shadow-sm transition hover:text-aims-blue"
                      >
                        Programme overview
                      </Link>

                      {programmeNavLinks.map((item) => (
                        <Link
                          key={item.slug}
                          to={item.to}
                          onClick={closeMenus}
                          className="block rounded-xl bg-white px-4 py-3 text-sm font-medium text-slate-600 shadow-sm transition hover:text-aims-blue"
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  ) : null}
                </li>

                {secondaryNavigation.map((item) => (
                  <li key={item.to}>
                    <NavLink
                      to={item.to}
                      onClick={closeMenus}
                      className={({ isActive }) =>
                        `flex items-center justify-between rounded-xl px-4 py-3 text-sm font-semibold transition ${
                          isActive
                            ? 'bg-white text-aims-blue shadow-sm'
                            : 'text-slate-600 hover:bg-white hover:text-aims-blue'
                        }`
                      }
                    >
                      <span>
                        {item.label}
                      </span>
                    </NavLink>
                  </li>
                ))}
              </ul>
            </nav>
          ) : null}
        </Container>
      </header>



      <div
        className="h-[124px]"
        aria-hidden="true"
      />
    </>
  );
}
