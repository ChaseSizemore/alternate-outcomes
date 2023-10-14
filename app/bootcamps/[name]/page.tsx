'use client';
import {
  LifebuoyIcon,
  BuildingOffice2Icon,
  MapIcon,
  CurrencyDollarIcon,
} from '@heroicons/react/20/solid';
import { useEffect, useState } from 'react';
import Table from '@/components/Table';
import axios from 'axios';

const cards = [
  {
    name: 'Average Salary',
    icon: CurrencyDollarIcon,
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

export default function Bootcamp({ params }: any) {
  const [outcomes, setOutcomes] = useState([]);
  const nameWithSpace = params.name.replace(/-/g, ' ');

  const getBootcamp = async () => {};

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
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getOutcomes();
  }, []);

  useEffect(() => {
    console.log(outcomes);
  }, [outcomes]);
  return (
    <div className="relative isolate overflow-hiddepy-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-4xl font-bold tracking-tigh sm:text-6xl">
            {nameWithSpace}
          </h2>
          <p className="mt-6 text-lg leading-">
            Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui
            lorem cupidatat commodo. Elit sunt amet fugiat veniam occaecat
            fugiat aliqua.
          </p>
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
