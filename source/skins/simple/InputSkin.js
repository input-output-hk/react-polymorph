// @flow
import React from 'react';

// external libraries
import classnames from 'classnames';
import { isFunction } from 'lodash';

// components
import { FormField } from '../../components/FormField';
import type { InputProps } from '../../components/Input';

// internal utility functions
import { pickDOMProps } from '../../utils/props';

type Props = InputProps & {
  theme: Object,
  themeId: string,
};

export const InputSkin = (props: Props) => {
  const renderInput = (setFormFieldRef) => {
    const {
      theme,
      themeId,
      disabled,
      hasSearch,
      showErrorState,
      hideErrorState,
      error,
    } = props;

    const input = (
      <input
        ref={setFormFieldRef}
        {...pickDOMProps(props)}
        className={classnames([
          theme[themeId].input,
          disabled ? theme[themeId].disabled : null,
          !hideErrorState && (error || showErrorState)
            ? theme[themeId].errored
            : null,
        ])}
        disabled={disabled}
      />
    );

    return hasSearch ? (
      <div className={classnames([theme[themeId].search])}>{input}</div>
    ) : (
      input
    );
  };

  const useSelectionRenderer = (setFormFieldRef, option) => (
    <div className={props.theme[props.themeId].customValueWrapper}>
      {renderInput(setFormFieldRef)}
      <div className={props.theme[props.themeId].customValueBlock}>
        {option && props.selectionRenderer && props.selectionRenderer(option)}
      </div>
    </div>
  );

  const render = (setFormFieldRef) => {
    // check if user has passed render prop "selectionRenderer"
    const hasSelectionRenderer =
      props.selectionRenderer && isFunction(props.selectionRenderer);
    if (hasSelectionRenderer) {
      return useSelectionRenderer(setFormFieldRef, props.selectedOption);
    }
    return renderInput(setFormFieldRef);
  };

  return (
    <FormField
      className={props.className}
      disabled={props.disabled}
      label={props.label}
      error={props.error}
      id={props.id}
      isShowingErrorOnHover={props.isShowingErrorOnHover}
      isShowingErrorOnFocus={props.isShowingErrorOnFocus}
      formFieldRef={props.inputRef}
      theme={props.theme}
      render={render}
      themeVariables={props.themeVariables}
    />
  );
};
