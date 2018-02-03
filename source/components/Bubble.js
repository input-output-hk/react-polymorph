import React, { Component } from 'react';
import { bool, func, object } from 'prop-types';

// Bubble theme API
import { BUBBLE_THEME_API } from '../themes/API';

// internal utility functions
import { StringOrElement, composeTheme } from '../utils';

class Bubble extends Component {
  static propTypes = {
    isOpeningUpwards: bool,
    isTransparent: bool,
    skin: func.isRequired,
    theme: object,
    themeOverrides: object,
    themeAPI: object
  };

  static defaultProps = {
    isTransparent: true,
    theme: {},
    themeOverrides: {},
    themeAPI: { ...BUBBLE_THEME_API }
  };

  static contextTypes = {
    theme: object
  };

  constructor(props, context) {
    super(props);

    const { themeOverrides, themeAPI } = props;

    const theme =
      context && context.theme && context.theme.bubble
        ? context.theme.bubble
        : props.theme;

    // if themeOverrides isn't provided, composeTheme returns theme immediately
    this.state = {
      composedTheme: composeTheme(theme, themeOverrides, themeAPI)
    };
  }

  render() {
    // destructuring props ensures only the "...rest" get passed down
    const {
      skin: BubbleSkin,
      theme,
      themeOverrides,
      themeAPI,
      ...rest
    } = this.props;

    return <BubbleSkin theme={this.state.composedTheme} {...rest} />;
  }
}

export default Bubble;
