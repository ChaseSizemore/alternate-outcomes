
import axios from 'axios';
import { useEffect, useState } from 'react';

interface Bootcamp {
  bootcamp: string;
  description: string;
  website: string;
  name: string;
}

export const useBootcamps = () => {
  const [bootcamps, setBootcamps] = useState<{ [key: string]: Bootcamp[] }>();

  useEffect(() => {
    const getBootcamps = async () => {
      axios
        .get('/api/outcomes')
        .then((res) => {
          const store: { [key: string]: Bootcamp[] } = {};
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
    getBootcamps();
  }, []);

  return bootcamps;
};
