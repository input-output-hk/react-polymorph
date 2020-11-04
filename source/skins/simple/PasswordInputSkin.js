// @flow
import classnames from 'classnames';
import React, { useState } from 'react';

import { Input } from '../../components/Input';
import { PasswordInput } from '../../components/PasswordInput';
import { PopOver } from '../../components/PopOver';
import type { PasswordInputProps } from '../../components/PasswordInput';
import { SimplePasswordInputVariables } from '../../themes/simple/SimplePasswordInput';
import useDebouncedValueChangeIndicator from '../../utils/hooks';

type Props = PasswordInputProps & {
  score: number,
  theme: Object,
};

function getPopOverBgColorForState(state: PasswordInput.STATE): string {
  switch (state) {
    case PasswordInput.STATE.ERROR:
    case PasswordInput.STATE.INSECURE:
      return `var(${SimplePasswordInputVariables.errorColor})`;
    case PasswordInput.STATE.WEAK:
      return `var(${SimplePasswordInputVariables.warningColor})`;
    case PasswordInput.STATE.STRONG:
      return `var(${SimplePasswordInputVariables.successColor})`;
    case PasswordInput.STATE.DEFAULT:
    default:
      return 'var(--rp-pop-over-bg-color)';
  }
}

export const PasswordInputSkin = (props: Props) => {
  const [hasInputFocus, setHasInputFocus] = useState(false);
  const {
    className,
    error,
    debounceDelay,
    isShowingTooltipOnFocus,
    isShowingTooltipOnHover,
    isTooltipOpen,
    score,
    state,
    theme,
    themeId,
    tooltip,
    useDebounce,
    value,
    ...inputProps
  } = props;
  const hasInitialValueChanged = useDebounce
    ? useDebouncedValueChangeIndicator(value, debounceDelay)
    : true;
  const hasTooltip = hasInitialValueChanged && tooltip != null;
  return (
    <div
      className={classnames([
        theme[themeId].root,
        theme[themeId][state],
        className,
      ])}
    >
      <PopOver
        isShowingOnHover={hasTooltip && isShowingTooltipOnHover}
        isVisible={
          hasTooltip &&
          (isTooltipOpen || (isShowingTooltipOnFocus && hasInputFocus))
        }
        content={tooltip}
        themeVariables={{
          '--rp-pop-over-bg-color': getPopOverBgColorForState(state),
        }}
        placement="bottom"
        popperOptions={{ modifiers: [{ name: 'flip', enabled: false }] }}
        duration={[300, 0]}
      >
        <Input
          {...inputProps}
          showErrorState={
            hasInitialValueChanged && state === PasswordInput.STATE.ERROR
          }
          value={value}
          type="password"
          onBlur={() => setHasInputFocus(false)}
          onFocus={() => setHasInputFocus(true)}
        />
      </PopOver>
      <div className={theme[themeId].indicator}>
        <div
          className={theme[themeId].score}
          style={{ width: `${(score || 0) * 100}%` }}
        />
      </div>
    </div>
  );
};

// Static Properties

PasswordInputSkin.displayName = 'PasswordInputSkin';
