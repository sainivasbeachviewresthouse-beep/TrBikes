'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
// Assuming the navigationLinks file is named 'Navigation.ts' or 'Navigation.tsx'
import { navigationLinks } from './Navigation'; 


// 🌟 FIX: Use Record<string, never> to explicitly define a type with NO properties,
// or just omit the type if no props are used, as shown below.
// type MobileNavProps = Record<string, never>;
// OR simply remove the type definition if it's not needed:

export default function MobileNav() { // ⬅️ Removed the explicit empty props type
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