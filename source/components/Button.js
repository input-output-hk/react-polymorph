import React, { Component } from 'react';
import { string, bool, func, object } from 'prop-types';

import THEME_API, { IDENTIFIERS } from '../themes/API';

// internal utility functions
import { StringOrElement, composeTheme } from '../utils';

class Button extends Component {
  static propTypes = {
    disabled: bool,
    label: StringOrElement,
    onClick: func,
    skin: func.isRequired,
    theme: object,
    themeId: string,
    themeOverrides: object // custom css/scss from user that adheres to component's theme API
  };

  static defaultProps = {
    disabled: false,
    theme: null,
    themeId: IDENTIFIERS.BUTTON,
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
      skin: ButtonSkin,
      theme,
      themeOverrides,
      ...rest
    } = this.props;

    return <ButtonSkin theme={this.state.composedTheme} {...rest} />;
  }
}

export default Button;
