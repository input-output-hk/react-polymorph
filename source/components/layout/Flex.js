// @flow
import React from 'react';
import { pickBy } from 'lodash';

// components
import { Base } from './Base';
import { FlexItem } from './FlexItem';

// styles
import flexStyles from '../../themes/helpers/Flex.scss';

type Props = {
  alignItems: string,
  className: string,
  center: boolean,
  column: boolean,
  columnReverse: boolean,
  justifyContent: string,
  row: boolean,
  rowReverse: boolean
};

export const Flex = (props: Props) => {
  const {
    alignItems,
    children,
    className,
    center,
    column,
    columnReverse,
    justifyContent,
    row,
    rowReverse
  } = props;

  const activeProps = pickBy(({ flex: true, center, column, columnReverse, row, rowReverse }));
  const activeClasses = Object.keys(activeProps);
  const positioning = { alignItems, justifyContent };

  return (
    <Base
      activeClasses={activeClasses}
      className={className}
      inlineStyles={positioning}
      stylesToAdd={flexStyles}
    >
      {children}
    </Base>
  );
};

Flex.Item = FlexItem;
