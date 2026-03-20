import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin', 'latin-ext'] });

export const metadata: Metadata = {
  title: 'FyzioTT – Barbora Bayerová | Odborná Fyzioterapia',
  description: 'Diagnostika, liečba a prevencia porúch pohybového systému. Odborná rehabilitačná a fyzioterapeutická prax v Trnave.',
  keywords: ['fyzioterapia', 'Trnava', 'Barbora Bayerová', 'rehabilitácia', 'SM systém', 'rázová vlna', 'podológia'],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="sk" className="scroll-smooth">
      <body className={`${inter.className} antialiased`}>
        {children}
      </body>
    </html>
  );
}
