import React, { Component } from 'react';
import { bool, func, object } from 'prop-types';

// import the Radio component's theme API
import { RADIO_THEME_API } from '../themes/API';

// import utility functions
import { StringOrElement, composeTheme } from '../utils';

class Radio extends Component {
  static propTypes = {
    selected: bool,
    label: StringOrElement,
    onChange: func,
    onFocus: func,
    onBlur: func,
    skin: func.isRequired,
    theme: object,
    themeOverrides: object,
    themeAPI: object
  };

  static defaultProps = {
    checked: false,
    disabled: false,
    theme: {},
    themeOverrides: {},
    themeAPI: { ...RADIO_THEME_API }
  };

  static contextTypes = {
    theme: object
  };

  constructor(props, context) {
    super(props);

    const { themeOverrides, themeAPI } = props;

    const theme =
      context && context.theme && context.theme.radio
        ? context.theme.radio
        : props.theme;

    // if themeOverrides isn't provided, composeTheme returns theme obj immediately
    this.state = {
      composedTheme: composeTheme(theme, themeOverrides, themeAPI)
    };
  }

  render() {
    // destructuring props ensures only the "...rest" get passed down
    const {
      skin: RadioSkin,
      theme,
      themeOverrides,
      themeAPI,
      ...rest
    } = this.props;

    return <RadioSkin theme={this.state.composedTheme} {...rest} />;
  }
}

export default Radio;
