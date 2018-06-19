// @flow

// We need this as a separate file from source/skins/simple/InputSkin.js
// Enzyme doesn't yet support the context API from React 16.3
// Here we pass context as a prop to FormField which would normally be passed
// via the context Provider in ThemeContext.js. We also pass FormField the theme prop
// as it is not able to access it's default theme via context.

import React from 'react';
import type { Ref } from 'react';

// external libraries
import classnames from 'classnames';

// components & skins
import { FormField } from '../../source/components/FormField';
import { FormFieldSkin } from '../../source/skins/simple';
import { CONTEXT } from './context';

// internal utility functions
import { pickDOMProps } from '../../source/utils';

type Props = {
  context: Object,
  disabled: boolean,
  error: string,
  label: string,
  inputRef: Ref<'input'>,
  onBlur: Function,
  onChange: Function,
  onFocus: Function,
  onKeyPress: Function,
  placeholder: string,
  readOnly: boolean,
  theme: Object,
  themeId: string,
  value: string
};

export default (props: Props) => (
  <FormField
    context={CONTEXT}
    disabled={props.disabled}
    error={props.error}
    label={props.label}
    skin={FormFieldSkin}
    render={() => (
      <input
        ref={props.inputRef}
        {...pickDOMProps(props)}
        className={classnames([
          props.theme[props.themeId].input,
          props.disabled ? props.theme[props.themeId].disabled : null,
          props.error ? props.theme[props.themeId].errored : null
        ])}
        readOnly={props.readOnly}
      />
    )}
  />
);
