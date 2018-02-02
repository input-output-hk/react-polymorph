import React, { Component } from 'react';
import PropTypes from 'prop-types';

// import utility functions
import composeTheme from '../utils/composeTheme.js';
import { StringOrElement } from '../utils/props';

// import the Radio component's theme API
import { RADIO_THEME_API } from '../themes/API';

class Radio extends Component {
  static propTypes = {
    selected: PropTypes.bool,
    label: StringOrElement,
    onChange: PropTypes.func,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
    skin: PropTypes.func.isRequired,
    theme: PropTypes.object,
    themeOverrides: PropTypes.object,
    themeAPI: PropTypes.object
  };

  static defaultProps = {
    checked: false,
    disabled: false,
    theme: {},
    themeOverrides: {},
    themeAPI: { ...RADIO_THEME_API }
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

Radio.contextTypes = {
  theme: PropTypes.object
};

export default Radio;
