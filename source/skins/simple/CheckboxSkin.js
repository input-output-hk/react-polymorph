import React from 'react';
import classnames from 'classnames';
import { pickDOMProps } from '../../utils/props';

export default props => (
  <div
    className={classnames([
      props.className,
      props.theme.root,
      props.disabled ? props.theme.disabled : null,
      props.checked ? props.theme.checked : null
    ])}
    onClick={event => {
      if (!props.disabled && props.onChange) {
        props.onChange(!props.checked, event);
      }
    }}
  >
    <input
      {...pickDOMProps(props)}
      className={props.theme.input}
      type="checkbox"
    />
    <div
      className={classnames([
        props.theme.check,
        props.checked ? props.theme.checked : null
      ])}
    />
    {props.label ? (
      <label className={props.theme.label}>{props.label}</label>
    ) : null}
  </div>
);
