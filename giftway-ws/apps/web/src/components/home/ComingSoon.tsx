import type { CSSProperties } from 'react';
import { features } from './coming-soon.const';
import { Eyebrow, Section, SectionTitle } from './Section';

export function ComingSoon() {
  return (
    <Section id="soon" className="pt-32">
      <div className="flex items-center gap-3 pb-5">
        <span
          aria-hidden
          className="animate-pulse-dot size-2 rounded-full bg-primary-500"
          style={{ '--pulse-duration': '2.2s' } as CSSProperties}
        />
        <Eyebrow>Coming after launch</Eyebrow>
      </div>
      <div className="max-w-lg pb-12">
        <SectionTitle>
          Next: remembering the dates, splitting the cost, writing the card
        </SectionTitle>
      </div>

      <ul className="flex flex-col border-b border-border">
        {features.map(({ title, body, Icon }) => (
          <li
            key={title}
            className="flex flex-wrap items-center gap-6 border-t border-border py-6"
          >
            <div className="flex grow shrink basis-64 items-center gap-4">
              <Icon />
              <h3 className="text-xl font-medium tracking-tight">{title}</h3>
            </div>
            <p className="grow-2 shrink basis-80 text-md leading-relaxed text-neutral-300">
              {body}
            </p>
          </li>
        ))}
      </ul>
    </Section>
  );
}
