// @flow
import React from 'react';
import classnames from 'classnames';
import type { FormFieldProps } from '../../components/FormField';
import { PopOver } from '../../components/PopOver';
import { SimpleFormFieldVariables } from '../../themes/simple/SimpleFormField';
import {
  isRefFocused,
  useDebouncedValueChangedIndicator,
} from '../../utils/hooks';

type Props = FormFieldProps & {
  focusChild: Function,
  setError: Function,
};

export function FormFieldSkin(props: Props) {
  const hasErrorChanged = useDebouncedValueChangedIndicator(
    props.error,
    props.errorDebounceDelay
  );
  const hasError = hasErrorChanged && props.error != null;
  const isInputFocused = isRefFocused(props.inputRef);
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
        isShowingOnHover={hasError}
        isVisible={hasError && isInputFocused}
        content={props.error}
        themeVariables={{
          '--rp-pop-over-bg-color': `var(${SimpleFormFieldVariables.errorColor}`,
        }}
        placement="bottom"
        popperOptions={{ modifiers: [{ name: 'flip', enabled: false }] }}
        duration={[300, 0]}
      >
        <div className={props.theme[props.themeId].inputWrapper}>
          {props.render()}
        </div>
      </PopOver>
    </div>
  );
}
