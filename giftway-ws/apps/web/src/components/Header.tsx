import { Button } from '@giftway-ws/ui';
import Logo from './Logo';

export function Header() {
  return (
    <header className="bg-transparent lg:p-8 p-4">
      <div className="max-w-5xl flex flex-row justify-between items-center mx-auto">
        <Logo size="md" type="logo" />

        <div className="flex flex-row gap-x-2">
          <Button variant="ghost-secondary">What's Next</Button>
          <Button variant="primary">Find a gift</Button>
        </div>
      </div>
    </header>
  );
}
