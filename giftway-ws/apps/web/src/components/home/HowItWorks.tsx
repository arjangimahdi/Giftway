import { steps } from './how-it-works.const';
import { Section, SectionLead, SectionTitle } from './Section';

export function HowItWorks() {
  return (
    <Section id="how" className="pt-32">
      <div className="flex max-w-xl flex-col gap-4 pb-16">
        <SectionTitle>
          Chips lower the floor. Free text raises the ceiling.
        </SectionTitle>
        <SectionLead>
          Every step can be finished without typing a word, and every step has
          room for the detail only you know.
        </SectionLead>
      </div>

      <ol className="flex flex-col border-b border-border">
        {steps.map((step) => (
          <li
            key={step.number}
            className="flex flex-wrap gap-6 border-t border-border py-6"
          >
            <span
              className={`w-10 flex-none pt-1 font-mono text-xs ${
                step.highlight ? 'text-primary-500' : 'text-muted'
              }`}
            >
              {step.number}
            </span>
            <h3 className="grow shrink basis-48 text-xl font-medium tracking-tight">
              {step.title}
            </h3>
            <p
              className={`grow-2 shrink basis-80 text-md leading-relaxed ${
                step.highlight ? 'text-neutral-200' : 'text-neutral-300'
              }`}
            >
              {step.body}
            </p>
          </li>
        ))}
      </ol>
    </Section>
  );
}
