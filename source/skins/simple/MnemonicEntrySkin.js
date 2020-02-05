// @flow
import React from 'react';
import type { Element } from 'react';

// external libraries
import classnames from 'classnames';

type Props = {
  className: string,
  label: string | Element<any>,
  theme: Object,
  themeId: string
};

export const MnemonicEntrySkin = (props: Props) => (
  <div
    className={classnames([
      props.className,
      props.theme[props.themeId].root,
    ])}
  >
    {props.label}
  </div>
);
