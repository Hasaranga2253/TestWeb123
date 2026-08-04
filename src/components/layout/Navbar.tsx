import { useState } from 'react';

import { ChevronDown, Menu, X } from 'lucide-react';
import { Link, NavLink } from 'react-router-dom';

import { Container } from '../common/Container';
import CmpsLogo from '../../assets/logos/CmpsLogo.png';

const navigation = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Programmes', to: '/programmes' },
  { label: 'Contact', to: '/contact' },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="border-b border-slate-200 bg-white shadow-sm">
      <Container className="py-3">
        <div className="flex items-center justify-between gap-4">
          <Link
            to="/"
            className="flex items-center"
            aria-label="AIMS Campus home"
            onClick={() => setIsOpen(false)}
          >
            <img
              src={CmpsLogo}
              alt="AIMS Campus logo"
              width={140}
              height={36}
              className="block h-9 w-[8.75rem] object-contain object-left"
            />
          </Link>

          <nav aria-label="Main navigation" className="hidden lg:block">
            <ul className="flex items-center gap-8 text-[15px] font-semibold text-slate-600">
              {navigation.map((item) => (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    className={({ isActive }) =>
                      `inline-flex items-center gap-1 transition hover:text-aims-blue ${
                        isActive ? 'text-aims-blue' : ''
                      }`
                    }
                  >
                    {item.label}

                    {item.label === 'Programmes' ? (
                      <ChevronDown size={14} aria-hidden="true" />
                    ) : null}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          <button
            type="button"
            onClick={() => setIsOpen((value) => !value)}
            aria-expanded={isOpen}
            aria-controls="mobile-navigation"
            aria-label={
              isOpen ? 'Close navigation menu' : 'Open navigation menu'
            }
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 text-slate-700 transition hover:border-aims-blue hover:text-aims-blue lg:hidden"
          >
            {isOpen ? (
              <X size={20} aria-hidden="true" />
            ) : (
              <Menu size={20} aria-hidden="true" />
            )}
          </button>
        </div>

        {isOpen ? (
          <nav
            id="mobile-navigation"
            aria-label="Mobile navigation"
            className="mt-4 lg:hidden"
          >
            <ul className="space-y-2 rounded-2xl border border-slate-200 bg-slate-50 p-3">
              {navigation.map((item) => (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    onClick={() => setIsOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center justify-between rounded-xl px-4 py-3 text-sm font-semibold transition ${
                        isActive
                          ? 'bg-white text-aims-blue shadow-sm'
                          : 'text-slate-600 hover:bg-white hover:text-aims-blue'
                      }`
                    }
                  >
                    <span>{item.label}</span>

                    {item.label === 'Programmes' ? (
                      <ChevronDown size={14} aria-hidden="true" />
                    ) : null}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
        ) : null}
      </Container>
    </header>
  );
}
