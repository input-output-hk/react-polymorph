// @flow
import React from 'react';
import type { Element } from 'react';

// utility functions
import { assembleInlineGridItem } from '../../utils/layout';

// components
import { Base } from './Base';

type Props = {
  alignSelf: string,
  className: string,
  children: Element<*>,
  column: string | number,
  columnStart: string | number,
  columnEnd: string | number,
  gridArea: string,
  justifySelf: string,
  placeSelf: string,
  row: string | number,
  rowEnd: string | number,
  rowStart: string | number,
  theme: Object
};

export const GridItem = (props: Props) => {
  const { children, className, theme, ...gridItemProps } = props;
  const inlineGridItem = assembleInlineGridItem({ ...gridItemProps });

  return (
    <Base
      activeClasses={['item']}
      className={className}
      inlineStyles={inlineGridItem}
      stylesToAdd={theme}
    >
      {children}
    </Base>
  );
};

GridItem.displayName = 'GridItem';
