// @flow
import React from 'react';
import type { Node } from 'react';

// external libraries
import classnames from 'classnames';

// internal utility functions
import { pickDOMProps } from '../../utils';

type Props = {
  checked: boolean,
  className: string,
  disabled: boolean,
  onChange: Function,
  label: string | Node,
  theme: Object,
  themeId: string
};

export default (props: Props) => {
  const { theme, themeId } = props;
  return (
    <div
      role="presentation"
      aria-hidden
      className={classnames([
        props.className,
        theme[themeId].root,
        props.disabled ? theme[themeId].disabled : null,
        props.checked ? theme[themeId].checked : null
      ])}
      onClick={event => {
        if (!props.disabled && props.onChange) {
          props.onChange(!props.checked, event);
        }
      }}
    >
      <input
        {...pickDOMProps(props)}
        className={theme[themeId].input}
        readOnly
        type="checkbox"
      />
      <div
        className={classnames([
          theme[themeId].switch,
          props.checked ? theme[themeId].checked : null
        ])}
      >
        <span className={theme[themeId].thumb} />
      </div>
      {props.label ? (
        <label className={theme[themeId].label}>{props.label}</label>
      ) : null}
    </div>
  );
};
