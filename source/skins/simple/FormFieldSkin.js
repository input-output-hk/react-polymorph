// @flow
import React from 'react';
import type { Node } from 'react';
import { omit } from 'lodash';
import classnames from 'classnames';

type Props = {
  className: string,
  disabled: boolean,
  error: string | Node,
  focusChild: Function,
  label: string | Node,
  onChange: Function,
  onRef: Function,
  render: Function,
  setError: Function,
  theme: Object,
  themeId: string
};

export default (props: Props) => (
  <div
    className={classnames([
      props.className,
      props.theme[props.themeId].root,
      props.disabled ? props.theme[props.themeId].disabled : null,
      props.error ? props.theme[props.themeId].errored : null
    ])}
  >
    {props.error && (
      <div className={props.theme[props.themeId].error}>{props.error}</div>
    )}
    {props.label && (
      <label
        role="presentation"
        aria-hidden
        className={props.theme[props.themeId].label}
        onClick={props.focusChild}
      >
        {props.label}
      </label>
    )}
    <div className={props.theme[props.themeId].inputWrapper}>
      {props.render(omit(props, ['themeId']))}
    </div>
  </div>
);
