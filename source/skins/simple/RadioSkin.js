import React from 'react';

// external libraries
import classnames from 'classnames';

// internal utility functions
import { pickDOMProps } from '../../utils/props';

export default props => (
  <div
    className={classnames([
      props.className,
      props.theme.root,
      props.disabled ? props.theme.disabled : null,
      props.selected ? props.theme.selected : null
    ])}
    onClick={event => {
      if (!props.disabled && props.onChange) {
        props.onChange(!props.selected, event);
      }
    }}
  >
    <input
      {...pickDOMProps(props)}
      className={props.theme.input}
      type="radio"
    />
    <div
      className={classnames([
        props.theme.circle,
        props.selected ? props.theme.selected : null
      ])}
    />
    {props.label ? (
      <label className={props.theme.label}>{props.label}</label>
    ) : null}
  </div>
);
