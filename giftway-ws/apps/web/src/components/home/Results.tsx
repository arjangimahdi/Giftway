import { buttonVariants } from '@giftway-ws/ui';
import { examples } from './results.const';
import { Section, SectionLead, SectionTitle } from './Section';

export function Results() {
  return (
    <Section className="pt-32">
      <div className="flex max-w-xl flex-col gap-4 pb-12">
        <SectionTitle>
          Real products, current prices, and a reason for each one
        </SectionTitle>
        <SectionLead>
          Every card says why it was chosen and where it came from. If the
          shortlist misses, one tap takes you back with your answers intact.
        </SectionLead>
      </div>

      <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {examples.map((item) => (
          <li
            key={item.title}
            className="flex flex-col overflow-hidden rounded-lg border border-neutral-700 bg-surface-raised"
          >
            <div aria-hidden className="h-48 bg-surface/60" />
            <div className="flex flex-1 flex-col gap-3 p-5">
              <h3 className="text-lg font-medium tracking-tight">
                {item.title}
              </h3>
              <p className="text-sm leading-relaxed text-neutral-300">
                {item.rationale}
              </p>
              <div className="mt-auto flex items-center justify-between gap-3 pt-3">
                <span className="font-mono text-lg font-medium">
                  {item.price}
                </span>
                <span className={buttonVariants({ size: 'sm' })}>
                  View on {item.partner}
                </span>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </Section>
  );
}
