// @flow
import React from 'react';
import type { ElementRef, Element } from 'react';

// external libraries
import classnames from 'classnames';
import { isFunction } from 'lodash';

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
  value: string,
  valueRenderer: Function,
  selectedOption: any,
};

export const InputSkin = (props: Props) => {
  const isValueRenderer = props.valueRenderer && isFunction(props.valueRenderer);

  const inputRenderer = () => (
    <input
      ref={props.inputRef}
      {...pickDOMProps(props)}
      className={classnames([
        props.theme[props.themeId].input,
        props.disabled ? props.theme[props.themeId].disabled : null,
        props.error ? props.theme[props.themeId].errored : null,
      ])}
      readOnly={props.readOnly}
    />
  );

  const valueRenderer = option => {
    // check if user has passed render prop "valueRenderer"
    if (isValueRenderer) {
      return (
        <div className={props.theme[props.themeId].customValueWrapper}>
          {inputRenderer()}
          <div className={props.theme[props.themeId].customValueBlock}>
            {option && props.valueRenderer(option)}
          </div>
        </div>
      );
    }
    return inputRenderer();
  };

  return (
    <FormField
      className={props.className}
      disabled={props.disabled}
      label={props.label}
      error={props.error}
      inputRef={props.inputRef}
      skin={FormFieldSkin}
      theme={props.theme}
      render={() => (
        valueRenderer(props.selectedOption)
      )}
    />
  );
};
