import { useEffect, useState } from 'react';
import { isBrowser, off, on } from '../helpers';

export function useMedia(query: string, defaultState?: boolean) {
  const [state, setState] = useState(() =>
    getInitialState(query, defaultState)
  );

  useEffect(() => {
    let isMounted = true;
    // const mql = window.matchMedia(query);
    const handler = () => {
      if (!isMounted) return;
      // setState(!!mql.matches);
      setState(window?.matchMedia(query).matches);
    };

    on(window, 'resize', handler);

    // mql.addEventListener('change', handler);
    // setState(mql.matches);

    return () => {
      isMounted = false;
      off(window, `resize`, handler);
      // mql.removeEventListener('change', handler);
    };
  }, [query]);

  return state;
}

function getInitialState(query: string, defaultState?: boolean) {
  if (defaultState !== undefined) return defaultState;

  if (isBrowser) return window?.matchMedia(query).matches;

  // A default value has not been provided, and you are rendering on the server, warn of a possible hydration mismatch when defaulting to false.
  if (process.env.NODE_ENV !== 'production') {
    console.warn(
      '`useMedia` When server side rendering, defaultState should be defined to prevent a hydration mismatches.'
    );
  }

  return false;
}
