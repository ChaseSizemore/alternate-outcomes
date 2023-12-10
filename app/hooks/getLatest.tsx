import { useEffect, useState } from 'react';

interface Latest {
  bootcamp: string;
  company: string;
  position: string;
  salary: string;
  location: string;
  date: string;
}

export const useLatest = () => {
  const [latest, setLatest] = useState<Latest>({
    bootcamp: '',
    company: '',
    position: '',
    salary: '',
    location: '',
    date: '',
  });

  useEffect(() => {
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
        .catch((error) => {
          console.error(
            'There was a problem with the fetch operation:',
            error.message
          );
        });
    };
    getLatest();
  }, []);

  return latest;
};
