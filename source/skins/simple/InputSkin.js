// @flow
import React from 'react';
import type { Ref } from 'react';

// external libraries
import classnames from 'classnames';

// components & skins
import { FormField } from '../../components';
import { FormFieldSkin } from './';

// internal utility functions
import { pickDOMProps } from '../../utils';

type Props = {
  className: string,
  disabled: boolean,
  error: string,
  label: string,
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

export const InputSkin = (props: Props) => (
  <FormField
    className={props.className}
    disabled={props.disabled}
    label={props.label}
    error={props.error}
    skin={FormFieldSkin}
    render={() => (
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
    )}
  />
);
