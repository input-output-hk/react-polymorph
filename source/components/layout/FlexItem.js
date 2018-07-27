// @flow
import React from 'react';

// components
import { Base } from './Base';

type Props = {
  alignSelf: string,
  className: string,
  flex: number,
  order: number,
  theme?: Object
};

export const FlexItem = (props: Props) => {
  const { children, className, alignSelf, flex, order, theme } = props;
  return (
    <Base
      activeClasses={['item']}
      className={className}
      inlineStyles={{ order, alignSelf, flex }}
      stylesToAdd={theme}
    >
      {children}
    </Base>
  );
};
// define static properties
FlexItem.displayName = 'FlexItem';
FlexItem.defaultProps = { theme: {} };
