import React, { Component } from 'react';
import { bool, func, object } from 'prop-types';

// external libraries
import _ from 'lodash';

// Button theme API
import { BUTTON_THEME_API } from '../themes/API';

// internal utility functions
import composeTheme from '../utils/composeTheme';
import { StringOrElement } from '../utils/props';

class Button extends Component {
  static propTypes = {
    label: StringOrElement,
    disabled: bool,
    onClick: func,
    skin: func.isRequired,
    theme: object,
    themeOverrides: object,
    themeAPI: object
  };

  static defaultProps = {
    disabled: false,
    theme: {},
    themeOverrides: {}, // custom css/scss from user that adheres to React Polymorph theme API
    themeAPI: { ...BUTTON_THEME_API }
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
