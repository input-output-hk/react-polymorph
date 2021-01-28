// @flow
import type { ElementRef } from 'react';
import { useEffect, useState, Ref, useCallback } from 'react';

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

// Inspired by https://medium.com/@teh_builder/ref-objects-inside-useeffect-hooks-eb7c15198780
export function handleRefFocusState(
  ref: ElementRef<*>,
  setIsFocused: React.SetStateAction
) {
  const focusListener = () => setIsFocused(true);
  const blurListener = () => setIsFocused(false);

  return useCallback((node) => {
    if (ref.current) {
      const { current } = ref;
      current.removeEventListener('focus', focusListener);
      current.removeEventListener('blur', blurListener);
    }
    if (node) {
      node.addEventListener('focus', focusListener);
      node.addEventListener('blur', blurListener);
    }
    ref.current = node;
  }, []);
}
