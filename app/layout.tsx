import './globals.css'
import type { Metadata } from 'next'
import { Inter, Lexend } from 'next/font/google'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import clsx from 'clsx'
import { Analytics } from '@vercel/analytics/react';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

const lexend = Lexend({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-lexend',
})

export const metadata: Metadata = {
  title: 'Bootcamp Outcomes',
  description: 'View outcomes of bootcamp graduates before deciding on a bootcamp yourself!',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={clsx(
        'h-full scroll-smooth bg-white antialiased',
        inter.variable,
        lexend.variable,
      )}
    >
      <body className={inter.className}>
        <Navbar />
        {children}
        {/* <Footer /> */}
        <Analytics />
      </body>
    </html>
  )
}
