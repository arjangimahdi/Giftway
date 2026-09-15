import type { Metadata, Viewport } from 'next';
import { IBM_Plex_Mono, Inter } from 'next/font/google';
import type { ReactNode } from 'react';
import './globals.css';

// Self-hosted by next/font; the variables are what the `font.family` tokens
// reference, so the token stacks resolve without naming Next anywhere else.
const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-inter',
  display: 'swap',
});

const plexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-plex-mono',
  display: 'swap',
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:4200';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Giftway',
    template: '%s | Giftway',
  },
  description:
    'Answer five quick questions and get gift ideas picked for the person, the occasion, and your budget.',
  openGraph: {
    type: 'website',
    siteName: 'Giftway',
    locale: 'en_US',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${plexMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
