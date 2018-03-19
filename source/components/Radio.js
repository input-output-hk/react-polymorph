import React, { Component } from 'react';
import { bool, func, object } from 'prop-types';

// import the Radio component's theme API
import { IDENTIFIERS, RADIO_THEME_API } from '../themes/API';

// import utility functions
import { StringOrElement, composeTheme, pickTheme } from '../utils';

class Radio extends Component {
  static propTypes = {
    disabled: bool,
    label: StringOrElement,
    onBlur: func,
    onChange: func,
    onFocus: func,
    selected: bool,
    skin: func.isRequired,
    theme: object,
    themeAPI: object,
    themeOverrides: object // custom css/scss from user that adheres to component's theme API
  };

  static defaultProps = {
    disabled: false,
    selected: false,
    theme: null,
    themeAPI: { ...RADIO_THEME_API },
    themeOverrides: {}
  };

  static contextTypes = {
    theme: object
  };

  constructor(props, context) {
    super(props);
    const { themeOverrides, themeAPI } = props;
    const theme = pickTheme(IDENTIFIERS.RADIO, props, context);
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
