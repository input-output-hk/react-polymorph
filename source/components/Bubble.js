import React, { Component } from 'react';
import PropTypes from 'prop-types';
import composeTheme from '../utils/composeTheme.js';

// import the Bubble component's theme API
import { bubbleThemeAPI } from '../themes/API/bubble.js';

class Bubble extends Component {
  static propTypes = {
    isOpeningUpwards: PropTypes.bool,
    isTransparent: PropTypes.bool,
    skin: PropTypes.func.isRequired,
    theme: PropTypes.object,
    themeOverrides: PropTypes.object,
    themeAPI: PropTypes.object
  };

  static defaultProps = {
    isTransparent: true,
    theme: {},
    themeOverrides: {},
    themeAPI: { ...bubbleThemeAPI }
  };

  constructor(props, context) {
    super(props);

    const { themeOverrides, themeAPI } = props;
    const theme = context && context.theme ? context.theme : props.theme;

    // if themeOverrides isn't provided, composeTheme returns theme immediately
    this.state = {
      composedTheme: composeTheme(theme.bubble, themeOverrides, themeAPI)
    };
  }

  render() {
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

Bubble.contextTypes = {
  theme: PropTypes.object
};

export default Bubble;
