'use client';
import {
  BuildingOffice2Icon,
  MapIcon,
  CurrencyDollarIcon,
} from '@heroicons/react/20/solid';
import { use, useEffect, useState } from 'react';
import Table from '@/components/Table';
import axios from 'axios';

export default function Bootcamp({ params }: any) {
  const [outcomes, setOutcomes] = useState([]);
  const [bootcamp, setBootcamp] = useState<any>({});
  const [averageSalary, setAverageSalary] = useState('');
  const [companies, setCompanies] = useState<any[]>([]);
  const [locations, setLocations] = useState<any[]>([]);
  const nameWithSpace = params.name.replace(/-/g, ' ');

  const cards = [
    {
      name: 'Average Salary',
      icon: CurrencyDollarIcon,
      description: `${averageSalary}`,
    },
    {
      name: 'Top Companies',
      description:
        'Quod possimus sit modi rerum exercitationem quaerat atque tenetur ullam.',
      icon: BuildingOffice2Icon,
    },
    {
      name: 'Locations ',
      description:
        'Ratione et porro eligendi est sed ratione rerum itaque. Placeat accusantium impedit eum odit.',
      icon: MapIcon,
    },
  ];

  /**
   * Fetches the bootcamp data from the server based on the name.
   * @returns {Promise<void>} A Promise that resolves when the bootcamp data is fetched successfully.
   */
  const getBootcamp = async () => {
    axios
      .get('/api/bootcamps', {
        params: {
          name: nameWithSpace,
        },
      })
      .then((res) => {
        setBootcamp(res.data[0]);
      });
  };

  useEffect(() => {
    console.log(bootcamp)
    
  }, [bootcamp])

  /**
   * Calculates the average salary from an array of objects containing a salary property.
   * @param array - The array of objects to calculate the average salary from.
   * @returns A formatted string representing the average salary in USD.
   */
  const getAverageSalary = (array: any[]) => {
    let total = 0;
    array.forEach((item: any) => {
      total += parseInt(item.salary, 10);
    });
    let result = Math.floor(total / array.length);
    let formatted = result.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
    return formatted;
  };

  /**
   * Fetches outcomes data from the server and sets the outcomes state and average salary state.
   * @returns {Promise<void>}
   */
  const getOutcomes = async () => {
    axios
      .get('/api/outcomes')
      .then((res) => {
        const bootcamp: any = [];
        res.data.forEach((item: any) => {
          if (item.bootcamp === nameWithSpace) {
            bootcamp.push(item);
          }
        });
        setOutcomes(bootcamp);
        setAverageSalary(getAverageSalary(bootcamp));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  /**
   * Opens the bootcamp website in a new tab when clicked.
   * @returns {void}
   */
  const handleWebsiteClick = () => {
    window.open(bootcamp.website, '_blank');
  };

  useEffect(() => {
    getOutcomes();
    getBootcamp();
  }, [nameWithSpace]);

  return (
    <div className="relative isolate overflow-hidden py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px- item flex flex-col justify-center items-center">
        <div className="mx-auto max-w-2xl lg:mx-0 flex flex-col justify-center items-center">
          <h2 className="text-4xl font-bold tracking-tigh sm:text-6xl">
            {nameWithSpace}
          </h2>
          <p className="mx-auto my-6 max-w-2xl text-md tracking-tight text-slate-700 text-center">
            {bootcamp.description}
          </p>
          <div
            className="flex items-center p-4 mb-2 mt-2 text-sm text-blue-800 borde rounded-lg bg-blue-50 dark:text-blue-400 dark:border-blue-800"
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
            <div>
              Description was generated by Google's Bard AI. Please double check
              information on the bootcamp's website{' '}
              <span
                onClick={handleWebsiteClick}
                className="underline cursor-pointer"
              >
                here
              </span>
            </div>
          </div>
          <div
            className="flex items-center  p-4 mb-2 mt-2 text-sm text-red-800 rounded-lg bg-red-100 dark:text-red-400"
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
            <div>
              {' '}
              If there is any incorrect information, submit a notice{' '}
              <span
                onClick={() => {window.location.href = '/feedbackForm'}}
                className="underline cursor-pointer"
              >
                here
              </span>
            </div>
          </div>
        </div>
        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-6 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3 lg:gap-8">
          {cards.map((card) => (
            <div
              key={card.name}
              className="flex gap-x-4 rounded-xl bg-white/5 p-6 ring-1 ring-inset ring-white/10"
            >
              <card.icon
                className="h-7 w-5 flex-none text-indigo-400"
                aria-hidden="true"
              />
              <div className="text-base leading-7">
                <h3 className="font-semibold">{card.name}</h3>
                <p className="mt-2">{card.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="m-20">
        <Table outcomes={outcomes} />
      </div>
    </div>
  );
}
