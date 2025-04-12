import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { CartProvider } from '@/contexts/CartContext';
import { ThemeProvider } from 'next-themes';
import { AnalyticsProvider } from '@/components/providers/analytics-provider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: '🛒 Vendemos Cosas',
  description:
    '❤️ Maru y Gonza - Una paginita para vender cosas que no usamos.',
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
          <AnalyticsProvider
            measurementId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || ''}
          >
            <CartProvider>
              <div className='min-h-screen flex flex-col'>{children}</div>
            </CartProvider>
          </AnalyticsProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
