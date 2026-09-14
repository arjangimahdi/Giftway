import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';
import './globals.css';

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
    <html lang="en">
      <body>
        <main>{children}</main>
      </body>
    </html>
  );
}
