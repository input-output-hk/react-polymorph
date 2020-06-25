// @flow
import { useEffect, useState } from 'react';

export default function useDebouncedValueChangedIndicator(
  value: any,
  delay: number
) {
  const [isDirty, setIsDirty] = useState(false);
  useEffect(() => {
    if (value === '') {
      setIsDirty(false);
    }
    // Set debouncedValue to value (passed in) after the specified delay
    const handler = setTimeout(() => {
      if (value !== '') {
        setIsDirty(true);
      }
    }, delay);
    return () => {
      clearTimeout(handler);
    };
  }, [value]);

  return isDirty;
}
