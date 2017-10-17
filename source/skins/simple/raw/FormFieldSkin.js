import React from 'react';
import classnames from 'classnames';
import { themr } from 'react-css-themr';
import { FORM_FIELD } from '../identifiers';

export default themr(FORM_FIELD)((props) => (
  <div
    className={classnames([
      props.className,
      props.theme.root,
      props.disabled ? props.theme.disabled : null,
      props.error ? props.theme.errored : null,
    ])}
  >
    {props.error && <div className={props.theme.error}>{props.error}</div>}
    {props.label && (
      <label
        className={props.theme.label}
        onClick={props.component.focus ? props.component.focus : null}
      >
        {props.label}
      </label>
    )}
    {props.input}
  </div>
));
