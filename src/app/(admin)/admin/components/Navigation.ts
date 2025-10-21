import { BsHouse, BsBicycle, BsPerson } from 'react-icons/bs';
import { IconType } from 'react-icons';

interface NavLink {
  label: string;
  href: string;
  icon?: IconType;
}

export const navigationLinks: NavLink[] = [
  { label: 'Dashboard', href: '/admin', icon: BsHouse },
  { label: 'Bikes', href: '/admin/bikes', icon: BsBicycle },
  { label: "Profile", href: "/admin/profile", icon: BsPerson },

  
];
