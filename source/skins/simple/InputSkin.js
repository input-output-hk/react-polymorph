// @flow
import React, { useState } from 'react';
import type { ElementRef } from 'react';

// external libraries
import classnames from 'classnames';
import { isFunction } from 'lodash';

// components
import { FormField } from '../../components/FormField';
import type { InputProps } from '../../components/Input';

// internal utility functions
import { pickDOMProps } from '../../utils/props';

type Props = InputProps & {
  inputRef: ElementRef<'input'>,
  theme: Object,
  themeId: string,
};

export const InputSkin = (props: Props) => {
  const renderInput = () => (
    <input
      ref={props.inputRef}
      {...pickDOMProps(props)}
      className={classnames([
        props.theme[props.themeId].input,
        props.disabled ? props.theme[props.themeId].disabled : null,
        props.error || props.showErrorState
          ? props.theme[props.themeId].errored
          : null,
      ])}
      readOnly={props.readOnly}
    />
  );

  const useSelectionRenderer = (option) => (
    <div className={props.theme[props.themeId].customValueWrapper}>
      {renderInput()}
      <div className={props.theme[props.themeId].customValueBlock}>
        {option && props.selectionRenderer && props.selectionRenderer(option)}
      </div>
    </div>
  );

  const render = () => {
    // check if user has passed render prop "selectionRenderer"
    const hasSelectionRenderer =
      props.selectionRenderer && isFunction(props.selectionRenderer);
    if (hasSelectionRenderer) {
      return useSelectionRenderer(props.selectedOption);
    }
    return renderInput();
  };

  return (
    <FormField
      className={props.className}
      disabled={props.disabled}
      label={props.label}
      error={props.error}
      inputRef={props.inputRef}
      theme={props.theme}
      render={render}
    />
  );
};
