'use client';

import { use, useEffect, useState } from 'react';
import Table from '@/components/Table';
import LinearProgress from '@mui/material/LinearProgress';
import dummyData from '@/utils/dummyOutcomes';

import { useOutcomes } from '@/hooks/getOutcomes';

export default function Outcomes() {
  const outcomes = useOutcomes();

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
        <div className="md:mx-20">
          {/* <Table outcomes={outcomes} /> */}
          <Table outcomes={dummyData} />
        </div>
      </>
    );
  }
}
