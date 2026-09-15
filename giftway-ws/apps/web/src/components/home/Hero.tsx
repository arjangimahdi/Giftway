import { buttonVariants } from '@giftway-ws/ui';
import Image from 'next/image';
import Link from 'next/link';
import type { CSSProperties } from 'react';
import { occasions } from './hero.const';
import { Eyebrow, Section } from './Section';

export function Hero() {
  return (
    <Section className="relative pt-24">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 h-96 w-full max-w-3xl -translate-x-1/2 bg-radial from-primary-500/18 to-transparent to-70%"
      />

      <div className="relative flex flex-wrap items-start gap-12 lg:gap-16">
        <div className="flex max-w-xl grow shrink basis-96 flex-col gap-6">
          <Eyebrow>AI gift recommender</Eyebrow>
          <h1 className="text-balance text-3xl font-medium leading-display tracking-tighter sm:text-4xl">
            Never stare at a blank search bar wondering what to buy someone
            again
          </h1>
          <p className="max-w-md text-pretty text-lg leading-relaxed text-neutral-200">
            Five questions about the person. A shortlist of real, purchasable
            gifts in under fifteen seconds.
          </p>
          <div id="start" className="flex flex-wrap items-center gap-5 pt-1">
            <Link href="/wizard/1" className={buttonVariants({ size: 'lg' })}>
              Find their perfect gift
            </Link>
            <span className="font-mono text-xs text-muted">
              no account, no checkout
            </span>
          </div>
        </div>

        <ul
          aria-label="Occasions Giftway covers"
          className="grid flex-none basis-80 grid-cols-3 gap-x-4 gap-y-6 pt-2"
        >
          {occasions.map((o) => (
            <li
              key={o.id}
              className={`animate-float flex flex-col gap-3 ${o.cell}`}
              style={{ '--float-duration': o.duration } as CSSProperties}
            >
              <Image
                src={`/hero/${o.id}.svg`}
                alt=""
                width={40}
                height={40}
                className="size-10"
              />
              <span className="text-sm font-medium">{o.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
