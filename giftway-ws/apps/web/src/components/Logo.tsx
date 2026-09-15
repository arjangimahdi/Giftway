import Image from 'next/image';
import type { HTMLAttributes } from 'react';
import { tv, type VariantProps } from 'tailwind-variants';

const assets = {
  logo: { width: 144, height: 61 },
  mark: { width: 39, height: 53 },
} as const;

export const logoVariants = tv({
  base: 'inline-block w-auto select-none',
  variants: {
    size: {
      sm: 'h-5',
      md: 'h-8',
      lg: 'h-12',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

export type LogoProps = Omit<HTMLAttributes<HTMLSpanElement>, 'children'> &
  VariantProps<typeof logoVariants> & {
    type?: keyof typeof assets;
  };

// The light and dark files differ in ink and accent, so the theme scope
// (`data-theme="dark"`) picks the file rather than recoloring one SVG.
export function Logo({ type = 'logo', size, className, ...props }: LogoProps) {
  const { width, height } = assets[type];
  const imgClass = logoVariants({ size, className });

  return (
    <span {...props}>
      <Image
        src={`/brand/${type}-light.svg`}
        alt="Giftway"
        width={width}
        height={height}
        className={`${imgClass} dark:hidden`}
      />
      <Image
        src={`/brand/${type}-dark.svg`}
        alt="Giftway"
        width={width}
        height={height}
        className={`${imgClass} hidden dark:inline-block`}
      />
    </span>
  );
}

export default Logo;
