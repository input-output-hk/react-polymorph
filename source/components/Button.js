import React, { Component } from 'react';
import { bool, func, object } from 'prop-types';

// external libraries
import _ from 'lodash';

// Button theme API
import { BUTTON_THEME_API } from '../themes/API';

// internal utility functions
import { StringOrElement, composeTheme } from '../utils';

class Button extends Component {
  static propTypes = {
    disabled: bool,
    label: StringOrElement,
    onClick: func,
    skin: func.isRequired,
    theme: object,
    themeAPI: object,
    themeOverrides: object // custom css/scss from user that adheres to component's theme API
  };

  static defaultProps = {
    disabled: false,
    theme: {},
    themeAPI: { ...BUTTON_THEME_API },
    themeOverrides: {}
  };

  static contextTypes = {
    theme: object
  };

  constructor(props, context) {
    super(props);

    const { themeOverrides, themeAPI } = props;

    const theme =
      context && context.theme && context.theme.button
        ? context.theme.button
        : props.theme;

    // if themeOverrides isn't provided, composeTheme returns theme immediately
    this.state = {
      composedTheme: composeTheme(theme, themeOverrides, themeAPI)
    };
  }

  render() {
    // destructuring props ensures only the "...rest" get passed down
    const {
      skin: ButtonSkin,
      theme,
      themeOverrides,
      themeAPI,
      ...rest
    } = this.props;

    return <ButtonSkin theme={this.state.composedTheme} {...rest} />;
  }
}

export default Button;
