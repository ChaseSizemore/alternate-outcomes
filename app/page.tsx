'use client';
import Image from 'next/image';
import { Button } from '@/components/Button';
import { useEffect, useState } from 'react';
import Latest from '@/components/Latest';

export default function Home() {
  const [latest, setLatest] = useState({
    bootcamp: '',
    company: '',
    position: '',
    salary: '',
    location: '',
    date: '',
  });
  const getLatest = async () => {
    await fetch('/api/latestOutcome')
    .then((res) => {
      if (!res.ok) {
        throw new Error('Network response was not ok');
      }
      return res.json();
    })
    .then((data) => {
      setLatest(data);
    })
    .catch(error => {
      console.error("There was a problem with the fetch operation:", error.message);
    });
  

  useEffect(() => {
    getLatest();
    console.log('grabbing latest outcome')
  }, []);

  return (
    <div className="pb-16 pt-20 lg:pt-32">
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
          bootcamp for you! Navigate to the "Outcomes" page to see more. NOTE:
          This site is not affiliated with any bootcamps listed.
        </p>
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
    </div>
  );
}
