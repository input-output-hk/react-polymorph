import React from 'react';
import classnames from 'classnames';
import { pickDOMProps } from '../../../utils/props';
import { themr } from 'react-css-themr';
import { SWITCH } from '../identifiers';

export default themr(SWITCH)((props) => (
  <div
    className={classnames([
      props.className,
      props.theme.root,
      props.disabled ? props.theme.disabled : null,
      props.checked ? props.theme.checked : null,
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
    <div className={classnames([
      props.theme.switch,
      props.checked ? props.theme.checked : null,
    ])}>
      <span className={props.theme.thumb} />
    </div>
    {props.label ? (<label className={props.theme.label}>{props.label}</label>) : null}
  </div>
));
