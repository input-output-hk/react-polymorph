// @flow
import React from 'react';
import type { ElementRef, Element } from 'react';

// external libraries
import classnames from 'classnames';

// components
import { FormField } from '../../components/FormField';

// skins
import { FormFieldSkin } from './FormFieldSkin';

// internal utility functions
import { pickDOMProps } from '../../utils/props';

type Props = {
  className?: ?string,
  disabled?: boolean,
  error?: string,
  label?: string | Element<any>,
  inputRef: ElementRef<'input'>,
  onBlur?: Function,
  onChange?: Function,
  onFocus?: Function,
  onKeyPress?: Function,
  placeholder?: string,
  readOnly?: boolean,
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
    inputRef={props.inputRef}
    skin={FormFieldSkin}
    theme={props.theme}
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
