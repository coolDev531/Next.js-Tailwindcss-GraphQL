import { useEffect, useRef } from 'react';

export default function useInterval(
  callback: () => void,
  delay: number | null,
  shouldClear: boolean = false
) {
  const savedCallback = useRef(callback);

  // Remember the latest callback if it changes.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    // Don't schedule if no delay is specified.
    // Note: 0 is a valid value for delay.
    if (!delay && delay !== 0) {
      return;
    }

    const id = setInterval(() => savedCallback.current(), delay);

    if (shouldClear) {
      clearInterval(id);
    }

    return () => clearInterval(id);
  }, [delay, shouldClear]);
}
