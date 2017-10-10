import React from 'react';
import classnames from 'classnames';
import { pickDOMProps } from '../../../utils/props';
import { themr } from 'react-css-themr';
import { TOGGLER } from '../identifiers';

export default themr(TOGGLER)((props) => (
  <div
    className={classnames([
      props.className,
      props.theme.root,
      props.disabled ? props.theme.disabled : null,
    ])}
    onClick={(event) => {
      if (!props.disabled && props.onChange) {
        props.onChange(!props.checked, event);
      }
    }}
  >
    <input
      {...pickDOMProps(props)}
      className={props.theme.input}
      readOnly
      type="checkbox"
    />
    <div className={props.theme.toggler}>
      <span className={classnames([
        props.theme.label,
        props.checked ? props.theme.checked : null,
      ])}>
        {props.labelLeft}
      </span>
      <span className={classnames([
        props.theme.label,
        props.checked ? null : props.theme.checked,
      ])}>
        {props.labelRight}
      </span>
    </div>
  </div>
));
