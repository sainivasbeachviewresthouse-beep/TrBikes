'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { navigationLinks } from './Navigation';

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="d-flex flex-column p-3" >
      <h5 className="mb-4 text-center fw-bold text-primary">Admin Menu</h5>

      <ul className="nav flex-column">
        {navigationLinks.map((link) => (
          <li className="nav-item mb-2" key={link.href}>
            <Link
              href={link.href}
              className={`nav-link ${
                pathname === link.href ? 'active text-primary fw-semibold' : 'text-dark'
              }`}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
