// @flow
import React from 'react';
import type { Ref } from 'react';
// external libraries
import classnames from 'classnames';

// internal utility functions
import { pickDOMProps } from '../../utils';

type Props = {
  disabled: boolean,
  error: string,
  inputRef: Ref<'input'>,
  onBlur: Function,
  onChange: Function,
  onFocus: Function,
  onKeyPress: Function,
  placeholder: string,
  readOnly: boolean,
  theme: Object,
  themeId: string,
  value: string
};

export default (props: Props) => (
  <input
    ref={props.inputRef}
    {...pickDOMProps(props)}
    className={classnames([
      props.theme[props.themeId].input,
      props.disabled ? props.theme[props.themeId].disabled : null,
      props.error ? props.theme[props.themeId].errored : null
    ])}
    readOnly={props.readOnly}
  />
);
