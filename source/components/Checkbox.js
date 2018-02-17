import React, { Component } from 'react';
import { bool, func, object } from 'prop-types';

// Checkbox theme API
import { CHECKBOX_THEME_API } from '../themes/API';

// import utility functions
import { StringOrElement, composeTheme } from '../utils';

class Checkbox extends Component {
  static propTypes = {
    checked: bool,
    label: StringOrElement,
    onChange: func,
    onBlur: func,
    onFocus: func,
    skin: func.isRequired,
    theme: object,
    themeAPI: object,
    themeOverrides: object // custom css/scss from user that adheres to component's theme API
  };

  static defaultProps = {
    checked: false,
    disabled: false,
    theme: {},
    themeAPI: { ...CHECKBOX_THEME_API },
    themeOverrides: {}
  };

  static contextTypes = {
    theme: object
  };

  constructor(props, context) {
    super(props);

    const { themeOverrides, themeAPI } = props;

    const theme =
      context && context.theme && context.theme.checkbox
        ? context.theme.checkbox
        : props.theme;

    // if themeOverrides isn't provided, composeTheme returns theme immediately
    this.state = {
      composedTheme: composeTheme(theme, themeOverrides, themeAPI)
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
