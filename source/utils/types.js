// @flow
import type { ElementRef } from 'react';

export type ReactElementRef<ElementType = HTMLElement> = {
  current: null | ElementRef<ElementType>
}
