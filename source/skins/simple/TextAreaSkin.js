import React from 'react';
import classnames from 'classnames';
import { pickDOMProps } from '../../utils/props';

export default props => (
  <textarea
    ref={props.textareaRef}
    {...pickDOMProps(props)}
    className={classnames([
      props.theme.textarea,
      props.disabled ? props.theme.disabled : null,
      props.error ? props.theme.errored : null
    ])}
  />
);
