import { useEffect, useRef, useState } from "react";

export const useThrottledValue = <T>(value: T, intervalMs: number): T => {
  const [throttledValue, setThrottledValue] = useState(value);
  const lastUpdateRef = useRef(0);

  useEffect(() => {
    if (Object.is(value, throttledValue)) {
      return;
    }

    const applyValue = () => {
      lastUpdateRef.current = Date.now();
      setThrottledValue(value);
    };

    const elapsed = Date.now() - lastUpdateRef.current;
    if (elapsed >= intervalMs) {
      applyValue();
      return;
    }

    const timeout = setTimeout(applyValue, intervalMs - elapsed);
    return () => clearTimeout(timeout);
  }, [value, throttledValue, intervalMs]);

  return throttledValue;
};
