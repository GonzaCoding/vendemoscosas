'use client';

import { ThemeToggle } from './ThemeToggle';
import { CartButton } from './CartButton';
import { StickyCategoryBadges } from './StickyCategoryBadges';

export function Header() {
  return (
    <header className='sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 p-3'>
      <div className='container flex h-8 items-center justify-between'>
        <h1 className='text-xl font-bold'>🛒 Vendemos Cosas</h1>
        <div className='flex items-center gap-4'>
          <ThemeToggle />
          <CartButton />
        </div>
      </div>
      <StickyCategoryBadges />
    </header>
  );
}
