// @flow
import type { ElementRef } from 'react';
import React, { useState } from 'react';
import classnames from 'classnames';
import type { FormFieldProps } from '../../components/FormField';
import { PopOver } from '../../components/PopOver';
import { SimpleFormFieldVariables } from '../../themes/simple/SimpleFormField';
import { handleRefFocusState } from '../../utils/hooks';

type Props = FormFieldProps & {
  formFieldRef: ElementRef<*>,
  focusChild: Function,
  setError: Function,
};

export function FormFieldSkin(props: Props) {
  const [isFormFieldFocused, setIsFormFieldFocused] = useState(false);
  const setFormFieldRef = handleRefFocusState(
    props.formFieldRef,
    setIsFormFieldFocused
  );
  const hasError = props.error != null;
  return (
    <div
      className={classnames([
        props.className,
        props.theme[props.themeId].root,
        props.disabled ? props.theme[props.themeId].disabled : null,
        props.error ? props.theme[props.themeId].errored : null,
      ])}
    >
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
      <PopOver
        visible={
          props.isErrorShown ||
          (hasError && isFormFieldFocused && !props.isErrorHidden)
        }
        content={props.error}
        themeVariables={{
          '--rp-pop-over-bg-color': `var(${SimpleFormFieldVariables.errorColor}`,
        }}
        placement="bottom"
        popperOptions={{ modifiers: [{ name: 'flip', enabled: false }] }}
        duration={[300, 0]}
      >
        <div className={props.theme[props.themeId].inputWrapper}>
          {props.render(setFormFieldRef)}
        </div>
      </PopOver>
    </div>
  );
}
