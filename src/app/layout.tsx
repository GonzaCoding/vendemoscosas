import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { CartProvider } from '@/contexts/CartContext';
import { ThemeProvider } from 'next-themes';

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
        <ThemeProvider attribute='class' defaultTheme='system' enableSystem>
          <CartProvider>
            <div className='min-h-screen flex flex-col'>{children}</div>
          </CartProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
