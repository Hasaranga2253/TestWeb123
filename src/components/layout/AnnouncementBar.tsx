import { Link } from 'react-router-dom';

export function AnnouncementBar() {
  return (
    <div className="bg-aims-navy px-4 py-2 text-center text-sm text-white">
      <p>
        Applications for the 2026 intake are open.{' '}
        <Link className="font-semibold text-aims-gold underline underline-offset-4" to="/contact">
          Talk to admissions
        </Link>
      </p>
    </div>
  );
}
