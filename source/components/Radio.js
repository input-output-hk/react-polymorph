// @flow
import React, { Component } from 'react';
import type { ComponentType, Element } from 'react';

// internal utility functions
import { createEmptyContext, withTheme } from './HOC/withTheme';
import { composeTheme, addThemeId, didThemePropsChange } from '../utils/themes';

// import constants
import { IDENTIFIERS } from '../themes/API';
import type { ThemeContextProp } from './HOC/withTheme';

type Props = {
  context: ThemeContextProp,
  disabled?: boolean,
  label?: string | Element<any>,
  onBlur?: Function,
  onChange?: Function,
  onFocus?: Function,
  selected: boolean,
  skin: ComponentType<any>,
  theme: ?Object, // will take precedence over theme in context if passed
  themeId: string,
  themeOverrides: Object
};

type State = {
  composedTheme: Object
};

class RadioBase extends Component<Props, State> {
  // define static properties
  static displayName = 'Radio';
  static defaultProps = {
    context: createEmptyContext(),
    selected: false,
    theme: null,
    themeId: IDENTIFIERS.RADIO,
    themeOverrides: {}
  };

  constructor(props: Props) {
    super(props);

    const { context, themeId, theme, themeOverrides } = props;

    this.state = {
      composedTheme: composeTheme(
        addThemeId(theme || context.theme, themeId),
        addThemeId(themeOverrides, themeId),
        context.ROOT_THEME_API
      )
    };
  }

  componentWillReceiveProps(nextProps: Props) {
    didThemePropsChange(this.props, nextProps, this.setState.bind(this));
  }

  render() {
    // destructuring props ensures only the "...rest" get passed down
    const {
      skin: RadioSkin,
      theme,
      themeOverrides,
      context,
      ...rest
    } = this.props;

    return <RadioSkin theme={this.state.composedTheme} {...rest} />;
  }
}

export const Radio = withTheme(RadioBase);
