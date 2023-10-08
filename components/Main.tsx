import Image from 'next/image';
import { Button } from '@/components/Button';

export default function Home() {
  return (
    <div className="pb-16 pt-20 text-center lg:pt-32">
      <h1 className="mx-auto max-w-4xl font-display text-5xl font-medium tracking-tight text-slate-900 sm:text-7xl">
        Bootcamp Outcomes{' '}
        <span className="relative whitespace-nowrap text-blue-600">
          <span className="relative">made simple</span>
        </span>{' '}
        for future Software Engineers.
      </h1>
      <p className="mx-auto mt-6 max-w-2xl text-lg tracking-tight text-slate-700">
        Bootcamps are a great choice for those who don't have the time to go
        back to school for a CS degree. However, it can be difficult to find the
        right. Bootcamp Outcomes is here to help you find the
        right bootcamp for you! Navigate to the "Outcomes" page to see more.
        NOTE: This site is not affiliated with any bootcamps.
      </p>
      <div className="mt-10 flex justify-center gap-x-6">
        <Button href="/outcomes">Outcomes</Button>
        <Button
          href="/contribute"
          variant="outline"
        >
          Contribute
        </Button>
      </div>
    </div>
  );
}
