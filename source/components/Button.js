import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

// import utils
import { StringOrElement } from '../utils/props';

// import the composeTheme utility function
import composeTheme from '../utils/composeTheme';

// import the Button component's theme API
import { BUTTON_THEME_API } from '../themes/API';

class Button extends Component {
  static propTypes = {
    label: StringOrElement,
    disabled: PropTypes.bool,
    onClick: PropTypes.func,
    skin: PropTypes.func.isRequired,
    theme: PropTypes.object,
    themeOverrides: PropTypes.object,
    themeAPI: PropTypes.object
  };

  static defaultProps = {
    disabled: false,
    theme: { button: {} },
    themeOverrides: {}, // custom css/scss from user that adheres to React Polymorph theme API
    themeAPI: { ...BUTTON_THEME_API }
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

Button.contextTypes = {
  theme: PropTypes.object
};

export default Button;
