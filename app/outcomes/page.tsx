'use client';

import { useEffect, useState } from 'react';
import Table from '@/components/Table';

export default function Outcomes() {
  const [outcomes, setOutcomes] = useState([]);

  const getData = async () => {
    await fetch('/api/outcomes')
      .then((res) => res.json())
      .then((data) => {
        setOutcomes(data);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <div className="m-20">
        <div className="text-center">
          <h1 className="text-base font-semibold leading-7 text-gray-900">
            Bootcamp Outcomes
          </h1>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            Checkout Self Reported Bootcamp Outcomes!
          </p>
        </div>
      </div>
      <div className='mx-20'>
        <Table outcomes={outcomes} />
      </div>
    </>
  );
}
