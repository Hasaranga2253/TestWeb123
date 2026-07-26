import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="bg-aims-dark py-10 text-slate-300">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 md:grid-cols-3 lg:px-8">
        <div>
          <h2 className="text-xl font-bold text-white">AIMS Campus</h2>
          <p className="mt-3 max-w-sm text-sm leading-7">Quality education, practical experience, and a clear path toward your future.</p>
        </div>
        <div>
          <h2 className="font-semibold text-white">Explore</h2>
          <ul className="mt-3 space-y-2 text-sm">
            <li><Link className="hover:text-aims-gold" to="/about">About AIMS</Link></li>
            <li><Link className="hover:text-aims-gold" to="/programmes">Programmes</Link></li>
            <li><Link className="hover:text-aims-gold" to="/contact">Contact admissions</Link></li>
          </ul>
        </div>
        <div>
          <h2 className="font-semibold text-white">Contact</h2>
          <address className="mt-3 space-y-2 text-sm not-italic leading-6">
            <p>Colombo, Sri Lanka</p>
            <a className="block hover:text-aims-gold" href="tel:+94112223344">+94 11 222 3344</a>
            <a className="block hover:text-aims-gold" href="mailto:hello@aimscampus.edu.lk">hello@aimscampus.edu.lk</a>
          </address>
        </div>
      </div>
      <div className="mx-auto mt-8 max-w-7xl border-t border-white/10 px-4 pt-6 text-xs text-slate-500 sm:px-6 lg:px-8">
        © {new Date().getFullYear()} AIMS Campus. All rights reserved.
      </div>
    </footer>
  );
}
