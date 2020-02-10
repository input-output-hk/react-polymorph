// @flow
import React, { Component } from 'react';
// $FlowFixMe
import type { ComponentType, SyntheticInputEvent, Element } from 'react';

// internal utility functions
import { createEmptyContext, withTheme } from './HOC/withTheme';
import { composeTheme, addThemeId } from '../utils/themes';

// import constants
import { IDENTIFIERS } from '.';
import type { ThemeContextProp } from './HOC/withTheme';

export type PasswordInputProps = {
  autoFocus?: boolean,
  className?: string,
  context: ThemeContextProp,
  disabled?: boolean,
  error?: string,
  label?: string | Element<any>,
  isTooltipOpen: boolean,
  onBlur?: Function,
  onChange?: Function,
  onFocus?: Function,
  placeholder?: string,
  readOnly?: boolean,
  skin?: ComponentType<any>,
  theme: ?Object,
  themeId: string,
  themeOverrides: Object,
  value: ?string,
  tooltip?: string,
  score?: number,
  state?: $Values<typeof PasswordInputBase.STATE>,
};

type State = {
  composedTheme: Object,
};

class PasswordInputBase extends Component<PasswordInputProps, State> {

  static displayName = 'PasswordInput';
  static STATE = {
    DEFAULT: 'default',
    ERROR: 'error',
    WARNING: 'warning',
    SUCCESS: 'success',
  };

  static defaultProps = {
    context: createEmptyContext(),
    isTooltipOpen: false,
    readOnly: false,
    theme: null,
    themeId: IDENTIFIERS.PASSWORD_INPUT,
    themeOverrides: {},
    value: null,
    score: 0,
    state: PasswordInputBase.STATE.DEFAULT,
  };

  constructor(props: PasswordInputProps) {
    super(props);
    const { context, themeId, theme, themeOverrides } = props;
    this.state = {
      composedTheme: composeTheme(
        addThemeId(theme || context.theme, themeId),
        addThemeId(themeOverrides, themeId),
        context.ROOT_THEME_API
      ),
    };
  }

  render() {
    // destructuring props ensures only the "...rest" get passed down
    const {
      context,
      skin,
      theme,
      themeOverrides,
      ...rest
    } = this.props;

    const PasswordInputSkin = skin || context.skins[IDENTIFIERS.PASSWORD_INPUT];

    return (
      <PasswordInputSkin
        theme={this.state.composedTheme}
        {...rest}
      />
    );
  }
}

export const PasswordInput = withTheme(PasswordInputBase);

PasswordInput.STATE = PasswordInputBase.STATE;
