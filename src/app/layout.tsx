import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { CartProvider } from '@/contexts/CartContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Personal E-Commerce',
  description:
    'A simple, mobile-first e-commerce site for selling personal items',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body className={inter.className}>
        <CartProvider>
          <div className='min-h-screen flex flex-col'>{children}</div>
        </CartProvider>
      </body>
    </html>
  );
}
