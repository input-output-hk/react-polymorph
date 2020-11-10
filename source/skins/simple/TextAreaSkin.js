// @flow
import React, { useState } from 'react';
import type { ElementRef, Element } from 'react';

// external libraries
import classnames from 'classnames';

// components
import { FormField } from '../../components/FormField';

// skins
import { FormFieldSkin } from './FormFieldSkin';

// import utility functions
import { pickDOMProps } from '../../utils/props';

type Props = {
  className?: string,
  disabled: boolean,
  error?: string | Element<any>,
  label?: string | Element<any>,
  onBlur?: Function,
  onChange?: Function,
  onFocus?: Function,
  placeholder?: string,
  rows: number,
  textareaRef?: ElementRef<'textarea'>,
  theme: Object,
  themeId: string,
  value: string,
};

export const TextAreaSkin = (props: Props) => {
  const { theme, themeId } = props;
  const [hasFocus, setHasFocus] = useState(false);
  return (
    <FormField
      className={props.className}
      disabled={props.disabled}
      label={props.label}
      hasFocus={hasFocus}
      error={props.error}
      inputRef={props.textareaRef}
      skin={FormFieldSkin}
      render={() => (
        <textarea
          ref={props.textareaRef}
          {...pickDOMProps(props)}
          onBlur={(event) => {
            setHasFocus(false);
            props.onBlur?.(event);
          }}
          onFocus={(event) => {
            setHasFocus(true);
            props.onFocus?.(event);
          }}
          className={classnames([
            theme[themeId].textarea,
            props.disabled ? theme[themeId].disabled : null,
            props.error ? theme[themeId].errored : null,
          ])}
        />
      )}
    />
  );
};
