// @flow
import React, { Component } from 'react';
import type { ComponentType, Element } from 'react';

// internal utility functions
import { createEmptyContext, withTheme } from './HOC/withTheme';
import { composeTheme, addThemeId, didThemePropsChange } from '../utils/themes';

// import constants
import { IDENTIFIERS } from '.';
import type { ThemeContextProp } from './HOC/withTheme';

type Props = {
  className?: string,
  context: ThemeContextProp,
  isAligningRight?: boolean,
  isBounded?: boolean,
  isOpeningUpward: boolean,
  isTransparent: boolean,
  arrowRelativeToTip: boolean,
  skin?: ComponentType<any>,
  theme: ?Object, // will take precedence over theme in context if passed
  themeOverrides: Object, // custom css/scss from user that adheres to component's theme API
  themeId: string,
  tip?: string | Element<any>
};

type State = {
  composedTheme: Object
};

class TooltipBase extends Component<Props, State> {
  // define static properties
  static displayName = 'Tooltip';
  static defaultProps = {
    context: createEmptyContext(),
    isOpeningUpward: true,
    isTransparent: true,
    arrowRelativeToTip: false,
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
    const { skin, theme, themeOverrides, context, ...rest } = this.props;

    const TooltipSkin = skin || context.skins[IDENTIFIERS.TOOLTIP];

    return <TooltipSkin theme={this.state.composedTheme} {...rest} />;
  }
}

export const Tooltip = withTheme(TooltipBase);
