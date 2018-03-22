import React, { Component } from 'react';
import { string, bool, func, object } from 'prop-types';

// Checkbox theme API
import THEME_API, { IDENTIFIERS } from '../themes/API';

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
    themeId: string,
    themeOverrides: object // custom css/scss from user that adheres to component's theme API
  };

  static defaultProps = {
    checked: false,
    disabled: false,
    theme: null,
    themeId: IDENTIFIERS.CHECKBOX,
    themeOverrides: {}
  };

  static contextTypes = {
    theme: object
  };

  constructor(props, context) {
    super(props);
    this.state = {
      composedTheme: composeTheme(props.theme || context.theme, props.themeOverrides, THEME_API)
    };
  }

  render() {
    // destructuring props ensures only the "...rest" get passed down
    const {
      skin: CheckboxSkin,
      theme,
      themeOverrides,
      ...rest
    } = this.props;

    return <CheckboxSkin theme={this.state.composedTheme} {...rest} />;
  }
}

export default Checkbox;
