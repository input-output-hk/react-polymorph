import React, { Component } from 'react';
import { bool, func, object } from 'prop-types';

// Modal's theme API
import { MODAL_THEME_API } from '../themes/API';

// internal utiltity functions
import { StringOrElement, composeTheme } from '../utils';

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
    theme: {},
    themeAPI: { ...MODAL_THEME_API },
    themeOverrides: {}
  };

  static contextTypes = {
    theme: object
  };

  constructor(props, context) {
    super(props);

    const { themeOverrides, themeAPI } = props;

    const theme =
      context && context.theme && context.theme.modal
        ? context.theme.modal
        : props.theme;

    // if themeOverrides isn't provided, composeTheme returns theme immediately
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
