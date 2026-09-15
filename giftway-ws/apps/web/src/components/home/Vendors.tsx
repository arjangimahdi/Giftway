import { Section } from './Section';
import { vendors } from './vendors.const';

export function Vendors() {
  return (
    <Section>
      <div className="mt-16 flex flex-wrap items-center gap-9 border-y border-border py-5">
        <p className="font-mono text-xs uppercase tracking-widest text-muted">
          Live prices from
        </p>
        <ul className="flex grow flex-wrap items-center gap-6">
          {vendors.map((name) => (
            <li key={name} className="flex items-center gap-2">
              <span
                aria-hidden
                className="flex size-6 flex-none items-center justify-center rounded-md border border-neutral-700 bg-surface-raised text-xs font-medium tracking-tight text-primary-300"
              >
                {name[0]}
              </span>
              <span className="text-lg font-medium tracking-tight text-neutral-200">
                {name}
              </span>
            </li>
          ))}
          <li className="font-mono text-xs text-muted">+ more joining</li>
        </ul>
      </div>
    </Section>
  );
}
