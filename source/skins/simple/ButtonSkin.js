import React from 'react';
import classnames from 'classnames';
import { pickDOMProps } from '../../utils/props';

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
