import React from 'react';

// external libraries
import classnames from 'classnames';

// internal utility functions
import { pickDOMProps } from '../../utils';

export default props => (
  <button
    {...pickDOMProps(props)}
    className={classnames([
      props.className,
      props.theme.root,
      props.disabled ? props.theme.disabled : null
    ])}
  >
    {props.label}
  </button>
);
