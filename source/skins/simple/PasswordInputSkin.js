// @flow
import classnames from 'classnames';
import React, { useState } from 'react';

import { Input } from '../../components/Input';
import { PasswordInput } from '../../components/PasswordInput';
import { Tooltip } from '../../components/Tooltip';
import type { PasswordInputProps } from '../../components/PasswordInput';
import useDebouncedValueChangeIndicator from '../../utils/hooks';

type Props = PasswordInputProps & {
  score: number,
  theme: Object,
};

export const PasswordInputSkin = (props: Props) => {
  const [hasInputFocus, setHasInputFocus] = useState(false);
  const {
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
    <div className={classnames([theme[themeId].root, theme[themeId][state]])}>
      <Tooltip
        arrowRelativeToTip
        isCentered
        isOpeningUpward={false}
        isShowingOnHover={hasTooltip && isShowingTooltipOnHover}
        isVisible={
          hasTooltip &&
          (isTooltipOpen || (isShowingTooltipOnFocus && hasInputFocus))
        }
        tip={tooltip}
        theme={props.theme}
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
      </Tooltip>
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
