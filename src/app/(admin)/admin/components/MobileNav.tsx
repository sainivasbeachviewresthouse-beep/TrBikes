'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { navigationLinks } from './Navigation';
import { IconType } from 'react-icons';

type MobileNavProps = {};

export default function MobileNav({}: MobileNavProps) {
  const pathname = usePathname();

  return (
    <nav className="d-md-none fixed-bottom bg-white border-top shadow-sm">
      <ul className="nav nav-justified">
        {navigationLinks.map((link) => (
          <li className="nav-item" key={link.href}>
            <Link href={link.href} className="nav-link text-center py-2">
              {link.icon && <link.icon size={24} className="d-block mx-auto mb-1" />}
              <span
                className={`small ${
                  pathname === link.href ? 'text-primary fw-bold' : 'text-muted'
                }`}
              >
                {link.label}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
