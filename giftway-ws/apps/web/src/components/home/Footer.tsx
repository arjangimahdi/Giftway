import Logo from '../Logo';

export function Footer() {
  return (
    <footer className="mx-auto flex w-full max-w-5xl flex-wrap items-end justify-between gap-6 px-6 pb-12 pt-32 lg:px-8">
      <Logo size="sm" />
      <p className="max-w-xs text-xs leading-relaxed text-muted">
        Giftway recommends and refers. Purchases happen on the partner&apos;s
        site.
      </p>
    </footer>
  );
}
