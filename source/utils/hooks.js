// @flow
import { useEffect, useState, Ref } from 'react';

export function useDebouncedValueChangedIndicator(value: any, delay: number) {
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

export function isRefFocused(ref: Ref<*>) {
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element || !element.addEventListener) {
      return;
    }
    const focusListener = () => setIsFocused(true);
    const blurListener = () => setIsFocused(false);
    element.addEventListener('focus', focusListener);
    element.addEventListener('blur', blurListener);
    return () => {
      element.removeEventListener('focus', focusListener);
      element.removeEventListener('blur', blurListener);
    };
  }, [ref.current]);

  return isFocused;
}
