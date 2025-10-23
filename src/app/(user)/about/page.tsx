// src/app/about/page.tsx
import AboutPage from "./about";

export const metadata = {
  title: 'About SaiNivas Beach View Rest House – Your Beachside Retreat',
  description:
    'Discover SaiNivas Beach View Rest House: our story, hospitality values, and what makes us special near RK Beach, Visakhapatnam. A peaceful seaside retreat awaits.',
  keywords: [
    'SaiNivas Beach View Rest House',
    'About Rest House Visakhapatnam',
    'Beach Stay Vizag',
    'RK Beach Rest House',
  ],
  authors: [{ name: 'SaiNivas Beach View Rest House' }],
  alternates: {
    canonical: 'https://sainivas.co.in/about',
  },
  openGraph: {
    title: 'About SaiNivas Beach View Rest House – Your Beachside Retreat',
    description:
      'Discover SaiNivas Beach View Rest House: our story, hospitality values, and what makes us special near RK Beach, Visakhapatnam.',
    url: 'https://sainivas.co.in/about',
    siteName: 'SaiNivas Beach View Rest House',
    images: [
      {
        url: 'https://sainivas.co.in/og-image.png',
        width: 1200,
        height: 630,
        alt: 'SaiNivas Beach View Rest House – About',
      },
    ],
    locale: 'en_IN',
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About SaiNivas Beach View Rest House – Your Beachside Retreat',
    description:
      'Discover SaiNivas Beach View Rest House near RK Beach, Visakhapatnam. Learn our story and values for a peaceful stay.',
    images: ['https://sainivas.co.in/og-image.png'],
  },
};

export default function About() {
  return <AboutPage />;
}
