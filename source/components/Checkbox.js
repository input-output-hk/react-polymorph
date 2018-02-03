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
    themeAPI: { ...CHECKBOX_THEME_API }
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
