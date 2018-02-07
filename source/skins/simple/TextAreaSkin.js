import React from 'react';

// external libraries
import classnames from 'classnames';

// import utility functions
import { pickDOMProps } from '../../utils';

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
