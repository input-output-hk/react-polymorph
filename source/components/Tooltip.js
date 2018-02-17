import React, { Component } from 'react';
import { bool, func, object } from 'prop-types';

// import the Tooltip component's theme API
import { TOOLTIP_THEME_API } from '../themes/API';

// import utility functions
import { StringOrElement, composeTheme } from '../utils';

class Tooltip extends Component {
  static propTypes = {
    isAligningRight: bool,
    isBounded: bool,
    isOpeningUpward: bool,
    isTransparent: bool,
    skin: func.isRequired,
    theme: object,
    themeOverrides: object, // custom css/scss from user that adheres to component's theme API
    themeAPI: object,
    tip: StringOrElement
  };

  static defaultProps = {
    isOpeningUpward: true,
    isTransparent: true,
    theme: { button: {} },
    themeAPI: { ...TOOLTIP_THEME_API },
    themeOverrides: {}
  };

  static contextTypes = {
    theme: object
  };

  constructor(props, context) {
    super(props);

    const { themeOverrides, themeAPI } = props;

    const theme =
      context && context.theme && context.theme.tooltip
        ? context.theme.tooltip
        : props.theme;

    // if themeOverrides isn't provided, composeTheme returns theme immediately
    this.state = {
      composedTheme: composeTheme(theme, themeOverrides, themeAPI)
    };
  }

  render() {
    // destructuring props ensures only the "...rest" get passed down
    const {
      skin: TooltipSkin,
      theme,
      themeOverrides,
      themeAPI,
      ...rest
    } = this.props;

    return <TooltipSkin theme={this.state.composedTheme} {...rest} />;
  }
}

export default Tooltip;
