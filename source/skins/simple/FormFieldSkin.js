// @flow
import React from 'react';
import type { Element } from 'react';
import classnames from 'classnames';
import { PopOver } from '../../components/PopOver';
import { SimpleFormFieldVariables } from '../../themes/simple/SimpleFormField';
import useDebouncedValueChangeIndicator from '../../utils/hooks';

type Props = {
  className: string,
  disabled: boolean,
  error: string | Element<any>,
  hasFocus?: boolean,
  focusChild: Function,
  label: string | Element<any>,
  onChange: Function,
  render: Function,
  setError: Function,
  theme: Object,
  themeId: string,
};

export function FormFieldSkin(props: Props) {
  const hasErrorChanged = useDebouncedValueChangeIndicator(
    props.error,
    props.errorDebounceDelay
  );
  const hasError = hasErrorChanged && props.error != null;
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
        isVisible={hasError && props.hasFocus}
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
