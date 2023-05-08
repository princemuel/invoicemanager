import { useEffect, useReducer } from 'react';

const usePersist = () => {
  const [persist, setPersist] = useReducer(
    (previous: boolean) => !previous,
    JSON.parse(localStorage.getItem('persist') || 'false') || false
  );

  useEffect(() => {
    localStorage.setItem('persist', JSON.stringify(persist));
  }, [persist]);

  return [persist, setPersist] as const;
};
export { usePersist };
