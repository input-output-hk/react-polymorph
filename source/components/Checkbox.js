import React, { Component } from 'react';
import { bool, func, object } from 'prop-types';

// Checkbox theme API
import THEME_APIS, { IDENTIFIERS } from '../themes/API';

// import utility functions
import { StringOrElement, composeTheme, pickTheme } from '../utils';

class Checkbox extends Component {
  static propTypes = {
    checked: bool,
    label: StringOrElement,
    onChange: func,
    onBlur: func,
    onFocus: func,
    skin: func.isRequired,
    theme: object,
    themeIdentifier: String,
    themeOverrides: object // custom css/scss from user that adheres to component's theme API
  };

  static defaultProps = {
    checked: false,
    disabled: false,
    theme: null,
    themeIdentifier: IDENTIFIERS.CHECKBOX,
    themeOverrides: {}
  };

  static contextTypes = {
    theme: object
  };

  constructor(props, context) {
    super(props);
    const { themeOverrides, themeIdentifier } = props;
    const theme = pickTheme(themeIdentifier, props, context);
    this.state = {
      composedTheme: composeTheme(theme, themeOverrides, THEME_APIS[themeIdentifier])
    };
  }

  render() {
    // destructuring props ensures only the "...rest" get passed down
    const {
      skin: CheckboxSkin,
      theme,
      themeOverrides,
      themeAPI,
      ...rest
    } = this.props;

    return <CheckboxSkin theme={this.state.composedTheme} {...rest} />;
  }
}

export default Checkbox;
