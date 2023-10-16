'use client';
import {
  AcademicCapIcon,
  BuildingLibraryIcon,
  BuildingOffice2Icon,
  BuildingOfficeIcon,
  BuildingStorefrontIcon,
  HomeModernIcon,
} from '@heroicons/react/24/outline';

import { useEffect, useState } from 'react';
import axios from 'axios';
import LinearProgress from '@mui/material/LinearProgress';

const icons = [
  <AcademicCapIcon className="h-6 w-6" aria-hidden="true" />,
  <BuildingLibraryIcon className="h-6 w-6" aria-hidden="true" />,
  <BuildingOffice2Icon className="h-6 w-6" aria-hidden="true" />,
  <BuildingOfficeIcon className="h-6 w-6" aria-hidden="true" />,
  <BuildingStorefrontIcon className="h-6 w-6" aria-hidden="true" />,
  <HomeModernIcon className="h-6 w-6" aria-hidden="true" />,
];

export default function Bootcamps() {
  const [bootcamps, setBootcamps] = useState<{ [key: string]: any[] }>();

  const getBootcamps = async () => {
    axios
      .get('/api/outcomes')
      .then((res) => {
        const store: { [key: string]: any[] } = {};
        const bootcamps = res.data;
        bootcamps.forEach((bootcamp: any) => {
          if (!store[bootcamp.bootcamp]) {
            store[bootcamp.bootcamp] = [];
          }
          store[bootcamp.bootcamp].push(bootcamp);
        });
        setBootcamps(store);
        console.log(store);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getBootcamps();
  }, []);

  if (!bootcamps) {
    return <LinearProgress />;
  } else {
    return (
      <div className="divide-y m-20 divide-gray-200 overflow-hidden rounded-lg bg-gray-200 shadow sm:grid sm:grid-cols-2 sm:gap-px sm:divide-y-0">
        {Object.values(bootcamps).map((bootcamp, key) => (
          <div
            onClick={() => {window.location.href = `/bootcamps/${bootcamp[0].bootcamp.toLowerCase().replace(/ /g, '-')}`}}
            key={key} 
            className="group relative bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500"
          >
            <div>
              <span className="inline-flex rounded-lg p-3 ring-4 ring-white bg-teal-50 text-teal-700">
                {icons[key % icons.length]}
              </span>
            </div>
            <div className="mt-8">
              <h3 className="text-base font-semibold leading-6 text-gray-900">
                <a  className="focus:outline-none">
                  <span className="absolute inset-0" aria-hidden="true" />
                  {bootcamp[0].bootcamp}
                </a>
              </h3>
              <p className="mt-2 text-sm text-gray-500">
                Entries: {bootcamp.length}
              </p>
            </div>
            <span
              className="pointer-events-none absolute right-6 top-6 text-gray-300 group-hover:text-gray-400"
              aria-hidden="true"
            >
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20 4h1a1 1 0 00-1-1v1zm-1 12a1 1 0 102 0h-2zM8 3a1 1 0 000 2V3zM3.293 19.293a1 1 0 101.414 1.414l-1.414-1.414zM19 4v12h2V4h-2zm1-1H8v2h12V3zm-.707.293l-16 16 1.414 1.414 16-16-1.414-1.414z" />
              </svg>
            </span>
          </div>
        ))}
      </div>
    );
  }
}
