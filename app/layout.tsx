import './globals.css';
import type { Metadata } from 'next';
import { Inter, Lexend } from 'next/font/google';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import clsx from 'clsx';
import { Analytics } from '@vercel/analytics/react';
import Script from 'next/script';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const lexend = Lexend({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-lexend',
});

export const metadata: Metadata = {
  title: 'Alternate Outcomes',
  description:
    'View outcomes of bootcamp graduates before deciding on a bootcamp yourself!',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={clsx(
        'h-full scroll-smooth bg-white antialiased',
        inter.variable,
        lexend.variable
      )}
    >
      <head>
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-MQ1QYM39CJ"
        ></Script>
        <Script>
          {`  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-MQ1QYM39CJ');`}
        </Script>
      </head>
      <body className={inter.className}>
        <Navbar />
        {children}
        {/* <Footer /> */}
        {/* <Analytics /> */}
      </body>
    </html>
  );
}
