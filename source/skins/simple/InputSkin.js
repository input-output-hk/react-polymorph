import React from 'react';
import classnames from 'classnames';
import { pickDOMProps } from '../../utils/props';

export default props => {
  return (
    <input
      ref={props.inputRef}
      {...pickDOMProps(props)}
      className={classnames([
        props.theme.input,
        props.disabled ? props.theme.disabled : null,
        props.error ? props.theme.errored : null
      ])}
    />
  );
};
