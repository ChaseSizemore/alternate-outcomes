'use client';
import Image from 'next/image';
import { Button } from '@/components/Button';
import { useEffect, useState } from 'react';
import Latest from '@/components/Latest';
import { InformationCircleIcon } from '@heroicons/react/20/solid';
import { useLatest } from '@/hooks/getLatest';

export default function Home() {
  const latest = useLatest();

  return (
    <main className="pb-16 pt-20 lg:pt-32">
      <div className="text-center">
        <h1 className="mx-auto max-w-4xl font-display text-5xl font-medium tracking-tight text-slate-900 sm:text-7xl">
          Bootcamp Outcomes{' '}
          <span className="relative whitespace-nowrap text-blue-600">
            <span className="relative">made simple</span>
          </span>{' '}
          for future Software Engineers.
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg tracking-tight text-slate-700">
          Bootcamps are a great choice for those who don't have the time to go
          back to school for a CS degree. However, it can be difficult to find
          the right. Bootcamp Outcomes is here to help you find the right
          bootcamp for you!
        </p>
        <div
          className="flex items-center mx-auto max-w-2xl p-4 mb-2 mt-2 text-sm text-blue-800 borde rounded-lg bg-blue-50 dark:text-blue-400 dark:border-blue-800"
          role="alert"
        >
          <svg
            className="flex-shrink-0 inline w-4 h-4 mr-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
          </svg>
          <span className="sr-only">Info</span>
          <div className="text-left">
            This site is not affiliated with any bootcamps listed. All data is
            user submitted. Please do your own research before enrolling or
            applying in a bootcamp.
          </div>
        </div>
        <div className="mt-10 flex justify-center gap-x-6">
          <Button href="/outcomes">Outcomes</Button>
          <Button href="/contribute" variant="outline">
            Contribute
          </Button>
        </div>
      </div>
      <div>
        <div className="mt-20 text-center">
          <h1 className="text-3xl font-semibold leading-7 text-gray-900">
            Latest Outcome!
          </h1>
        </div>
        <Latest latest={latest} />
      </div>
    </main>
  );
}
