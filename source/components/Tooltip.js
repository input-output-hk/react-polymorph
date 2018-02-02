import React, { Component } from 'react';
import { bool, func, object } from 'prop-types';

// import utility functions
import { StringOrElement } from '../utils/props';
import composeTheme from '../utils/composeTheme';

// import the Tooltip component's theme API
import { TOOLTIP_THEME_API } from '../themes/API';

class Tooltip extends Component {
  static propTypes = {
    isAligningRight: bool,
    isOpeningUpwards: bool,
    isBounded: bool,
    tip: StringOrElement,
    skin: func.isRequired,
    theme: object,
    themeOverrides: object,
    themeAPI: object
  };

  static defaultProps = {
    isOpeningUpward: true,
    theme: { button: {} },
    themeOverrides: {}, // custom css/scss from user that adheres to React Polymorph theme API
    themeAPI: { ...TOOLTIP_THEME_API }
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
