import { useCallback, useEffect, useRef } from "react";

type VoidFunction = () => void;

export function useInterval(callback: VoidFunction, delay: number) {
  const savedCallback = useRef<VoidFunction>();

  const memoizedCallback = useCallback(() => callback, [callback]);

  useEffect(() => {
    savedCallback.current = memoizedCallback;
  }, [memoizedCallback]);

  useEffect(() => {
    function tick() {
      savedCallback?.current?.();
    }

    let id = setInterval(tick, delay);
    return () => {
      clearInterval(id);
    };
  }, [delay]);
}
