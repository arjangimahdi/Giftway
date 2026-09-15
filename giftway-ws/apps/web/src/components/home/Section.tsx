import type { HTMLAttributes, ReactNode } from 'react';
import { tv } from 'tailwind-variants';

const sectionVariants = tv({
  base: 'mx-auto w-full max-w-5xl px-6 lg:px-8',
});

export type SectionProps = HTMLAttributes<HTMLElement>;

export function Section({ className, ...props }: SectionProps) {
  return <section className={sectionVariants({ className })} {...props} />;
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="font-mono text-xs uppercase tracking-widest text-primary-500">
      {children}
    </p>
  );
}

export function SectionTitle({ children }: { children: ReactNode }) {
  return (
    <h2 className="text-balance text-3xl font-medium leading-display tracking-tight">
      {children}
    </h2>
  );
}

export function SectionLead({ children }: { children: ReactNode }) {
  return (
    <p className="text-pretty text-lg leading-relaxed text-neutral-200">
      {children}
    </p>
  );
}
