'use client';

import { use, useEffect, useState } from 'react';
import Table from '@/components/Table';
import LinearProgress from '@mui/material/LinearProgress';

export default function Outcomes() {
  const [outcomes, setOutcomes] = useState([]);

  const getData = async () => {
    await fetch('/api/outcomes')
      .then((res) => res.json())
      .then((data) => {
        const formattedData = data.map((item: any) => {
          return {
            ...item,
            salary: parseInt(item.salary, 10).toLocaleString('en-US', {
              style: 'currency',
              currency: 'USD',
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            }),
          };
        });
        setOutcomes(formattedData);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  if (!outcomes || outcomes.length === 0) {
    return <LinearProgress />;
  } else {
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
        <div className="mx-20">
          <Table outcomes={outcomes} />
        </div>
      </>
    );
  }
}
