import React from 'react';

// external libraries
import classnames from 'classnames';

export default props => (
  <div
    className={classnames([
      props.className,
      props.theme.root,
      props.disabled ? props.theme.disabled : null,
      props.error ? props.theme.errored : null
    ])}
  >
    {props.error && <div className={props.theme.error}>{props.error}</div>}
    {props.label && (
      <label className={props.theme.label} onClick={props.focusChild}>
        {props.label}
      </label>
    )}
    <div className={props.theme.inputWrapper}>{props.render(props)}</div>
  </div>
);
