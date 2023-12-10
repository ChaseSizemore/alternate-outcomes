import { useState, useEffect } from 'react';

interface Outcome {
  bootcamp: string;
  company: string;
  position: string;
  salary: string;
  location: string;
  createdAt: string;
  YOE: string;
}

export const useOutcomes = () => {
  const [outcomes, setOutcomes] = useState<Outcome[]>([]);

  useEffect(() => {
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
    getData();
  }, []);

  return outcomes;
};
