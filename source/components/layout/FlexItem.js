// @flow
import React from 'react';

// components
import { Base } from './Base';

type Props = {
  alignSelf: string,
  className: string,
  flex: number,
  order: number
};

export const FlexItem = (props: Props) => {
  const { children, className, alignSelf, flex, order } = props;

  return (
    <Base className={className} inlineStyles={{ order, alignSelf, flex }}>
      {children}
    </Base>
  );
};
