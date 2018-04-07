import React, { Component } from 'react';
import { bool, func, object, string } from 'prop-types';

// import the Radio component's theme API
import THEME_API, { IDENTIFIERS } from '../themes/API';

// import utility functions
import { StringOrElement, composeTheme } from '../utils';

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
    themeId: string,
    themeOverrides: object // custom css/scss from user that adheres to component's theme API
  };

  static defaultProps = {
    disabled: false,
    selected: false,
    theme: null,
    themeId: IDENTIFIERS.RADIO,
    themeOverrides: {}
  };

  static contextTypes = {
    theme: object
  };

  constructor(props, context) {
    super(props);
    this.state = {
      composedTheme: composeTheme(props.theme || context.theme, props.themeOverrides, THEME_API),
    };
  }

  render() {
    // destructuring props ensures only the "...rest" get passed down
    const {
      skin: RadioSkin,
      theme,
      themeOverrides,
      ...rest
    } = this.props;

    return <RadioSkin theme={this.state.composedTheme} {...rest} />;
  }
}

export default Radio;
