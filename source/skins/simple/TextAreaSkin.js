// @flow
import React from 'react';
import type { Ref } from 'react';

// external libraries
import classnames from 'classnames';

// import utility functions
import { pickDOMProps } from '../../utils';

type Props = {
  disabled: boolean,
  error: string | Node,
  onBlur: Function,
  onChange: Function,
  onFocus: Function,
  onRef: Function,
  placeholder: string,
  rows: number,
  textareaRef: Ref<*>,
  theme: Object,
  themeId: string,
  value: string
};

export const TextAreaSkin = (props: Props) => {
  const { theme, themeId } = props;
  return (
    <textarea
      ref={props.textareaRef}
      {...pickDOMProps(props)}
      className={classnames([
        theme[themeId].textarea,
        props.disabled ? theme[themeId].disabled : null,
        props.error ? theme[themeId].errored : null
      ])}
    />
  );
};
