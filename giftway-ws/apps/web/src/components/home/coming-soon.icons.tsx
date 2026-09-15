import type { ReactNode } from 'react';

// 26×26 marks in the same three accent tints as the hero occasions.
function Icon({ children }: { children: ReactNode }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 26 26"
      className="size-6 flex-none text-primary-500"
    >
      {children}
    </svg>
  );
}

export function CalendarIcon() {
  return (
    <Icon>
      <rect
        x="2"
        y="6"
        width="22"
        height="19"
        rx="3"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      />
      <rect x="1" y="10" width="24" height="2" fill="currentColor" />
      <rect className="fill-primary-300" x="6" y="1" width="2" height="6" />
      <rect className="fill-primary-300" x="18" y="1" width="2" height="6" />
      <circle className="fill-primary-300" cx="13.5" cy="18.5" r="2.5" />
    </Icon>
  );
}

export function GroupIcon() {
  return (
    <Icon>
      <circle
        cx="5.5"
        cy="8.5"
        r="4.5"
        fill="none"
        className="stroke-primary-300"
        strokeWidth="2"
      />
      <circle
        cx="20.5"
        cy="8.5"
        r="4.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      />
      <circle
        cx="13.5"
        cy="20.5"
        r="4.5"
        fill="none"
        className="stroke-primary-200"
        strokeWidth="2"
      />
    </Icon>
  );
}

export function CardIcon() {
  return (
    <Icon>
      <rect
        x="1"
        y="5"
        width="24"
        height="17"
        rx="3"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      />
      <rect className="fill-primary-300" x="5" y="10" width="14" height="2" />
      <rect className="fill-primary-300" x="5" y="15" width="9" height="2" />
    </Icon>
  );
}

export function PriceDropIcon() {
  return (
    <Icon>
      <rect x="2" y="2" width="2" height="22" fill="currentColor" />
      <rect x="2" y="22" width="23" height="2" fill="currentColor" />
      <circle className="fill-primary-200" cx="9.5" cy="6.5" r="2.5" />
      <circle className="fill-primary-300" cx="15.5" cy="12.5" r="2.5" />
      <circle cx="22.5" cy="17.5" r="2.5" fill="currentColor" />
    </Icon>
  );
}

export function CorporateIcon() {
  return (
    <Icon>
      <rect
        x="2"
        y="2"
        width="9"
        height="22"
        rx="2"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      />
      <rect
        x="14"
        y="11"
        width="10"
        height="13"
        rx="2"
        fill="none"
        className="stroke-primary-300"
        strokeWidth="2"
      />
    </Icon>
  );
}
