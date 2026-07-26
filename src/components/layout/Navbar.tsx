import { Link, NavLink } from 'react-router-dom';
import { GraduationCap } from 'lucide-react';

const navigation = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Programmes', to: '/programmes' },
  { label: 'Contact', to: '/contact' },
];

export function Navbar() {
  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-4 py-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-3 text-aims-navy" aria-label="AIMS Campus home">
          <span className="rounded-xl bg-aims-sky p-2 text-aims-blue">
            <GraduationCap size={24} aria-hidden="true" />
          </span>
          <span>
            <span className="block text-lg font-extrabold leading-none">AIMS Campus</span>
            <span className="mt-1 block text-xs font-medium uppercase tracking-[0.16em] text-slate-500">Learn. Grow. Achieve.</span>
          </span>
        </Link>
        <nav aria-label="Main navigation">
          <ul className="flex items-center gap-4 text-sm font-semibold text-slate-600 sm:gap-7">
            {navigation.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  className={({ isActive }) =>
                    `transition hover:text-aims-blue ${isActive ? 'text-aims-blue' : ''}`
                  }
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
