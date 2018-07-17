// @flow
import React from 'react';
import { pickBy } from 'lodash';

// components
import { Base } from './Base';

// styles
import itemStyles from '../../themes/simple/layout/FlexItem.scss';

// utilities
import { formatFlexItemProps } from '../../utils/layout';

type Props = {
  alignSelf: string,
  className: string,
  flex: number,
  order: number
};

export const FlexItem = (props: Props) => {
  const { children, className, order, ...flexItemProps } = props;

  const activeProps = pickBy(({ flexItem: true, ...flexItemProps }));
  const activeClasses = Object.keys(formatFlexItemProps(activeProps));
  return (
    <Base
      activeClasses={activeClasses}
      className={className}
      inlineStyles={{ order }}
      stylesToAdd={itemStyles}
    >
      {children}
    </Base>
  );
};
