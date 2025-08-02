import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';
import Navigation from '@/components/layout/Navigation';
import { CartProvider } from '@/lib/cart-context';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair' });

export const metadata: Metadata = {
  title: 'Holiday Flowers NYC - Premium Plants & Arrangements',
  description: 'Discover our beautiful collection of plants, succulents, ficus trees, and seasonal arrangements. Perfect for your home or office.',
  keywords: 'plants, flowers, succulents, ficus, holiday arrangements, NYC, interior plants',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentYear = new Date().getFullYear();

  return (
    <html lang="en">
      <body className={`${inter.variable} ${playfair.variable}`}>
        <CartProvider>
          <div className="min-h-screen bg-gradient-to-br from-green-50 to-earth-50">
            <Navigation />
            <main className="pb-8">
              {children}
            </main>
            <footer className="bg-primary-700 text-white py-8 mt-16">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center">
                  <p className="text-white">© {currentYear} Holiday Flowers Inc. All rights reserved.</p>
                  <p className="text-green-100 text-sm mt-2">Bringing nature into your space with beautiful plants and arrangements.</p>
                </div>
              </div>
            </footer>
          </div>
        </CartProvider>
      </body>
    </html>
  );
} 