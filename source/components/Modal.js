import React, { Component } from 'react';
import { bool, func, object } from 'prop-types';

// Modal's theme API
import { IDENTIFIERS, MODAL_THEME_API } from '../themes/API';

// internal utiltity functions
import { StringOrElement, composeTheme, pickTheme } from '../utils';

class Modal extends Component {
  static propTypes = {
    contentLabel: StringOrElement,
    isActive: bool,
    onClose: func,
    skin: func.isRequired,
    triggerCloseOnOverlayClick: bool,
    theme: object,
    themeAPI: object,
    themeOverrides: object // custom css/scss from user that adheres to component's theme API
  };

  static defaultProps = {
    contentLabel: 'Modal Dialog',
    isActive: false,
    triggerCloseOnOverlayClick: true,
    theme: null,
    themeAPI: { ...MODAL_THEME_API },
    themeOverrides: {}
  };

  static contextTypes = {
    theme: object
  };

  constructor(props, context) {
    super(props);
    const { themeOverrides, themeAPI } = props;
    const theme = pickTheme(IDENTIFIERS.MODAL, props, context);
    this.state = {
      composedTheme: composeTheme(theme, themeOverrides, themeAPI)
    };
  }

  render() {
    // destructuring props ensures only the "...rest" get passed down
    const {
      skin: ModalSkin,
      theme,
      themeOverrides,
      themeAPI,
      ...rest
    } = this.props;

    return <ModalSkin theme={this.state.composedTheme} {...rest} />;
  }
}

export default Modal;
