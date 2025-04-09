import Link from 'next/link';
import { CartButton } from './CartButton';

export function Header() {
  return (
    <header className='sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'>
      <div className='container flex h-16 items-center justify-between'>
        <Link href='/' className='flex items-center space-x-2'>
          <span className='text-xl font-bold'>🛒 Vendemos Cosas</span>
        </Link>

        <div className='flex items-center space-x-4'>
          <CartButton />
        </div>
      </div>
    </header>
  );
}
