import { useEffect, useState } from 'react';

const usePersist = () => {
  const [persist, setPersist] = useState<boolean>(
    JSON.parse(localStorage.getItem('persist') || '') || false
  );

  useEffect(() => {
    localStorage.setItem('persist', JSON.stringify(persist));
  }, [persist]);

  return { persist, setPersist };
};
export { usePersist };
