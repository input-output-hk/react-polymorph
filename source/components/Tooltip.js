import React, { Component } from 'react';
import { bool, func, object, string } from 'prop-types';

// import the Tooltip component's theme API
import THEME_API, { IDENTIFIERS } from '../themes/API';

// import utility functions
import { StringOrElement, composeTheme, pickTheme } from '../utils';

class Tooltip extends Component {
  static propTypes = {
    isAligningRight: bool,
    isBounded: bool,
    isOpeningUpward: bool,
    isTransparent: bool,
    skin: func.isRequired,
    theme: object,
    themeOverrides: object, // custom css/scss from user that adheres to component's theme API
    themeId: string,
    tip: StringOrElement
  };

  static defaultProps = {
    isOpeningUpward: true,
    isTransparent: true,
    theme: null,
    themeId: IDENTIFIERS.TOOLTIP,
    themeOverrides: {}
  };

  static contextTypes = {
    theme: object
  };

  constructor(props, context) {
    super(props);
    this.state = {
      composedTheme: composeTheme(props.theme || context.theme, props.themeOverrides, THEME_API)
    };
  }

  render() {
    // destructuring props ensures only the "...rest" get passed down
    const {
      skin: TooltipSkin,
      theme,
      themeOverrides,
      ...rest
    } = this.props;

    return <TooltipSkin theme={this.state.composedTheme} {...rest} />;
  }
}

export default Tooltip;
