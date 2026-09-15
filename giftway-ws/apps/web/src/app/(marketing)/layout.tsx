import type { ReactNode } from 'react';
import { Header } from '../../components/Header';

// The marketing pages are designed dark; the wizard and results routes keep the
// light-first default, so the dark palette is scoped here rather than on <body>.
export default function MarketingLayout({ children }: { children: ReactNode }) {
  return (
    <div data-theme="dark" className="min-h-dvh bg-surface text-foreground">
      <Header />
      <main>{children}</main>
    </div>
  );
}
