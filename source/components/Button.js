// @flow
import React, { Component } from 'react';
import type { ComponentType } from 'react';
import { withTheme } from '../themes/withTheme';

// internal utility functions
import { composeTheme, addThemeId } from '../utils';

// import constants
import { IDENTIFIERS } from '../themes/API';

type Props = {
  context: {
    theme: Object,
    ROOT_THEME_API: Object
  },
  disabled: boolean,
  label: string | Element,
  onClick: Function,
  skin: ComponentType<any>,
  theme: Object, // will take precedence over theme in context if passed
  themeId: string,
  themeOverrides: Object // custom css/scss from user that adheres to component's theme API
};

type State = {
  composedTheme: Object
};

class Button extends Component<Props, State> {
  static defaultProps = {
    disabled: false,
    theme: null,
    themeId: IDENTIFIERS.BUTTON,
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

  render() {
    // destructuring props ensures only the "...rest" get passed down
    const { skin: ButtonSkin, theme, themeOverrides, ...rest } = this.props;

    return <ButtonSkin theme={this.state.composedTheme} {...rest} />;
  }
}

export default withTheme(Button);
