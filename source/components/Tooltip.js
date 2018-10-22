// @flow
import React, { Component } from 'react';
import type { ComponentType, Element } from 'react';

// internal components
import { withTheme } from './HOC/withTheme';

// internal utility functions
import { composeTheme, addThemeId, didThemePropsChange } from '../utils/themes';

// import constants
import { IDENTIFIERS } from '../themes/API';

type Props = {
  className: string,
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
  tip: string | Element<any>
};

type State = {
  composedTheme: Object
};

class TooltipBase extends Component<Props, State> {
  // define static properties
  static displayName = 'Tooltip';
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

  componentWillReceiveProps(nextProps: Props) {
    didThemePropsChange(this.props, nextProps, this.setState.bind(this));
  }

  render() {
    // destructuring props ensures only the "...rest" get passed down
    const { skin: TooltipSkin, theme, themeOverrides, context, ...rest } = this.props;

    return <TooltipSkin theme={this.state.composedTheme} {...rest} />;
  }
}

export const Tooltip = withTheme(TooltipBase);
