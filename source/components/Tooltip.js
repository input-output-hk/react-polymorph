// @flow
import React, { Component } from 'react';
import type { ComponentType } from 'react';
import { withTheme } from '../themes/withTheme';

// import utility functions
import { composeTheme, addThemeId } from '../utils';

// import constants
import { IDENTIFIERS } from '../themes/API';

type Props = {
  context: {
    theme: Object,
    ROOT_THEME_API: Object
  },
  isAligningRight: boolean,
  isBounded: boolean,
  isOpeningUpward: boolean,
  isTransparent: boolean,
  skin: ComponentType<any>,
  theme: Object, // will take precedence over theme in context if passed
  themeOverrides: Object, // custom css/scss from user that adheres to component's theme API
  themeId: string,
  tip: string | Element
};

type State = {
  composedTheme: Object
};

class Tooltip extends Component<Props, State> {
  static defaultProps = {
    isOpeningUpward: true,
    isTransparent: true,
    theme: null,
    themeId: IDENTIFIERS.TOOLTIP,
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
    const { skin: TooltipSkin, theme, themeOverrides, ...rest } = this.props;

    return <TooltipSkin theme={this.state.composedTheme} {...rest} />;
  }
}

export default withTheme(Tooltip);
