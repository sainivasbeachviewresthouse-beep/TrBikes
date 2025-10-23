import ContactPage from './contact';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact SaiNivas Beach View Rest House – RK Beach, Visakhapatnam',
  description:
    'Get in touch with SaiNivas Beach View Rest House. Contact via WhatsApp, phone, or email, and visit us near RK Beach, Visakhapatnam.',
  keywords: [
    'SaiNivas Beach View Rest House',
    'Contact Rest House Vizag',
    'RK Beach Rest House',
    'Beach Stay Vizag',
    'Rest House Contact',
  ],
  authors: [{ name: 'SaiNivas Beach View Rest House' }],
  alternates: {
    canonical: 'https://sainivas.co.in/contact',
  },
  openGraph: {
    title: 'Contact SaiNivas Beach View Rest House – RK Beach, Visakhapatnam',
    description:
      'Reach out to SaiNivas Beach View Rest House for bookings or inquiries. Contact via WhatsApp, phone, or email near RK Beach, Visakhapatnam.',
    url: 'https://sainivas.co.in/contact',
    siteName: 'SaiNivas Beach View Rest House',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Contact SaiNivas Beach View Rest House',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact SaiNivas Beach View Rest House – RK Beach, Visakhapatnam',
    description:
      'Contact SaiNivas Beach View Rest House near RK Beach, Visakhapatnam. Reach out via WhatsApp, phone, or email.',
    images: ['/og-image.png'],
  },
};

export default function Page() {
  return <ContactPage />;
}
