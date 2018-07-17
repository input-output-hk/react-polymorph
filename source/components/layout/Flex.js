// @flow
import React from 'react';
import { pickBy } from 'lodash';

// components
import { Base } from './Base';
// styles
import flexStyles from '../../themes/layout/Flex.scss';
// utilities
import { formatFlexProps } from '../../utils/themes';

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
  const { children, className, ...flexProps } = props;

  const activeProps = pickBy(({ flex: true, ...flexProps }));
  const activeClasses = Object.keys(formatFlexProps(activeProps));
  console.log(activeClasses);
  return (
    <Base
      className={className}
      stylesToAdd={flexStyles}
      activeClasses={activeClasses}
    >
      {children}
    </Base>
  );
};
