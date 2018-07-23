// @flow
import React from 'react';

// components
import { Base } from './Base';

// styles
import gutterStyles from '../../themes/helpers/Gutter.scss';

// utilities
import { numberToPx } from '../../utils/props';

type Props = {
  className: string,
  padding: string | number
};

export const Gutter = (props: Props) => {
  const { children, className } = props;
  const padding = props.padding ? numberToPx(props.padding) : null;

  return (
    <Base
      activeClasses={['gutter']}
      className={className}
      inlineStyles={{ padding }}
      stylesToAdd={gutterStyles}
    >
      {children}
    </Base>
  );
};
