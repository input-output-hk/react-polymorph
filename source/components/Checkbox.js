import React, { Component } from 'react';
import PropTypes from 'prop-types';

// import utility functions
import { StringOrElement } from '../utils/props.js';
import composeTheme from '../utils/composeTheme.js';

// import the Checkbox component's theme API
import { checkboxThemeAPI } from '../themes/API/checkbox.js';

export default class Checkbox extends Component {
  static propTypes = {
    checked: PropTypes.bool,
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
    themeAPI: { ...checkboxThemeAPI }
  };

  render() {
    const {
      skin: CheckboxSkin,
      theme,
      themeOverrides,
      themeAPI,
      ...rest
    } = this.props;

    const composedTheme = composeTheme(theme, themeOverrides, themeAPI);

    return <CheckboxSkin theme={composedTheme} {...rest} />;
  }
}
