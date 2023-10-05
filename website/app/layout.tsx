import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Analytics } from '@vercel/analytics/react';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  openGraph: {
    title: 'Front Mirror - One click camera check',
    description: 'A one-click camera check, right from the chrome toolbar.',
    url: 'https://frontmirror.ritiksharma.me/',
    siteName: 'Front Mirror - One click camera check',
    images: [
      {
        url: 'https://frontmirror.ritiksharma.me/og.png',
        width: 1600,
        height: 840,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
