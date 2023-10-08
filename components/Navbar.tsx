'use client';

import Link from 'next/link';
import Image from 'next/image';
import hat from '@/public/hat.jpg';

import MobileNavigation from './MobileNavigation';
import { Button } from './Button';

export default function Header() {
  return (
    <header className="py-5 border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <nav className="relative z-50 flex justify-between">
          <div className="flex items-center md:gap-x-12">
            <Image src={hat} alt="Hat" width={40} />
            <div className="hidden md:flex md:gap-x-6">
            <Link
                href="/"
                className="inline-block rounded-lg px-2 py-1 text-sm text-slate-700 hover:bg-slate-100 hover:text-slate-900"
              >
                Home
              </Link>
              <Link
                href="/outcomes"
                className="inline-block rounded-lg px-2 py-1 text-sm text-slate-700 hover:bg-slate-100 hover:text-slate-900"
              >
                Outcomes
              </Link>
              <Link
                href="/bootcamps"
                className="inline-block rounded-lg px-2 py-1 text-sm text-slate-700 hover:bg-slate-100 hover:text-slate-900"
              >
                Bootcamp Directory
              </Link>
            </div>
          </div>
          <div className="flex items-center gap-x-5 md:gap-x-8">
            <div className="hidden md:block">
              {/* <Link
                href="/login"
                className="inline-block rounded-lg px-2 py-1 text-sm text-slate-700 hover:bg-slate-100 hover:text-slate-900"
              >
                Sign in
              </Link> */}
            </div>
            <Button href="/contribute" color="blue">
              <span>
                Contribute!
              </span>
            </Button>
            <div className="-mr-1 md:hidden">
              <MobileNavigation />
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}
