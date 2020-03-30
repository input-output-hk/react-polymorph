// @flow
import classnames from 'classnames';
import React from 'react';
import type { ElementRef } from 'react';

import { Input } from '../../components/Input';
import { Tooltip } from '../../components/Tooltip';
import type { PasswordInputProps } from '../../components/PasswordInput';
import { PasswordInput } from '../../components/PasswordInput';

type Props = PasswordInputProps & {
  inputRef: ElementRef<'input'>,
  theme: Object,
};

export const PasswordInputSkin = (props: Props) => {
  const { isTooltipOpen, theme, themeId, tooltip, score, state, ...inputProps } = props;
  const input = (
    <Input
      {...inputProps}
      type="password"
    />
  );
  const stateClass = state ? theme[themeId][state] : theme[themeId][PasswordInput.STATE.DEFAULT];
  return (
    <div className={classnames([theme[themeId].root, stateClass])}>
      {tooltip ? (
        <Tooltip
          arrowRelativeToTip
          isCentered
          isOpeningUpward={false}
          isVisible={isTooltipOpen}
          tip={tooltip}
          theme={props.theme}
        >
          {input}
        </Tooltip>
      ) : input}
      <div className={theme[themeId].indicator}>
        <div className={theme[themeId].score} style={{ width: `${(score || 0) * 100}%` }} />
      </div>
    </div>
  );
};
