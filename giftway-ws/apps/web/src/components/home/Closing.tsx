import { buttonVariants } from '@giftway-ws/ui';
import Link from 'next/link';
import { Section, SectionTitle } from './Section';

export function Closing() {
  return (
    <Section className="pt-32">
      <div className="flex max-w-xl flex-col gap-6">
        <SectionTitle>
          Someone has a birthday this month. You already know enough.
        </SectionTitle>
        <div className="flex flex-wrap items-center gap-5">
          <Link href="/wizard/1" className={buttonVariants({ size: 'lg' })}>
            Start the wizard
          </Link>
          <Link
            href="/about"
            className="text-md text-neutral-300 transition-colors hover:text-primary-300"
          >
            Become a partner
          </Link>
        </div>
      </div>
    </Section>
  );
}
