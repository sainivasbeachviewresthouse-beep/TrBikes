// src/app/gallery/page.tsx
import GalleryPage from './gallery';
import { gallery } from '@/app/data/gallery';
import { Metadata } from 'next';

// Generate OpenGraph images from gallery items
const openGraphImages = gallery.map((item) => ({
  url: item.src,
  width: 1200,
  height: 630,
  alt: item.alt,
}));

export const metadata: Metadata = {
  title: 'Gallery – SaiNivas Beach View Rest House, RK Beach Vizag',
  description:
    'Explore the photo gallery of SaiNivas Beach View Rest House. See cozy rooms, lobby, pool, and beachside ambiance near RK Beach, Visakhapatnam.',
  keywords: [
    'SaiNivas Beach View Rest House',
    'Gallery Vizag',
    'Beach View Rest House Photos',
    'Rooms and Beach Views Vizag',
    'RK Beach Vizag',
  ],
  authors: [{ name: 'SaiNivas Beach View Rest House' }],
  alternates: {
    canonical: 'https://sainivas.co.in/gallery',
  },
  openGraph: {
    title: 'Gallery – SaiNivas Beach View Rest House, RK Beach Vizag',
    description:
      'Explore the photo gallery of SaiNivas Beach View Rest House. Cozy rooms, lobby, pool, and beachside ambiance near RK Beach, Visakhapatnam.',
    url: 'https://sainivas.co.in/gallery',
    siteName: 'SaiNivas Beach View Rest House',
    images: [
      { url: '/og-image.png', width: 1200, height: 630, alt: 'SaiNivas Beach View Rest House Gallery' },
      ...openGraphImages,
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Gallery – SaiNivas Beach View Rest House',
    description:
      'Browse the photo gallery of SaiNivas Beach View Rest House near RK Beach, Visakhapatnam. Rooms, lobby, pool, and beach views.',
    images: ['/og-image.png', ...gallery.map((item) => item.src)],
  },
};

export default function Page() {
  return <GalleryPage />;
}
