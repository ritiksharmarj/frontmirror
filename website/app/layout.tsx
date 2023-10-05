import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Analytics } from '@vercel/analytics/react';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Front Mirror - One click camera check',
  description: 'A one-click camera check, right from the chrome toolbar.',
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
  icons: {
    shortcut: '/favicons/favicon.ico',
    icon: [
      {
        url: '/favicons/favicon-16x16.png',
        sizes: '16x16',
        type: 'image/png',
      },
      {
        url: '/favicons/favicon-32x32.png',
        sizes: '32x32',
        type: 'image/png',
      },
    ],
    apple: [
      {
        url: '/favicons/apple-touch-icon.png',
        sizes: '180x180',
        type: 'image/png',
      },
    ],
  },
  themeColor: '#1c1c1c',
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
