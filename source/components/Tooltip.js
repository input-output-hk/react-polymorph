import React, { Component } from 'react';
import PropTypes from 'prop-types';

// import utility functions
import { StringOrElement } from '../utils/props';
import composeTheme from '../utils/composeTheme';

// import the Tooltip component's theme API
import { TOOLTIP_THEME_API } from '../themes/API';

class Tooltip extends Component {
  static propTypes = {
    isAligningRight: PropTypes.bool,
    isOpeningUpwards: PropTypes.bool,
    isBounded: PropTypes.bool,
    tip: StringOrElement,
    skin: PropTypes.func.isRequired,
    theme: PropTypes.object,
    themeOverrides: PropTypes.object,
    themeAPI: PropTypes.object
  };

  static defaultProps = {
    isOpeningUpward: true,
    theme: { button: {} },
    themeOverrides: {}, // custom css/scss from user that adheres to React Polymorph theme API
    themeAPI: { ...TOOLTIP_THEME_API }
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

Tooltip.contextTypes = {
  theme: PropTypes.object
};

export default Tooltip;
