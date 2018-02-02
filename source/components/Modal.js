import React, { Component } from 'react';
import { bool, func, object } from 'prop-types';

// Modal's theme API
import { MODAL_THEME_API } from '../themes/API';

// internal utiltity functions
import composeTheme from '../utils/composeTheme';
import { StringOrElement } from '../utils/props';

class Modal extends Component {
  static propTypes = {
    isActive: bool,
    contentLabel: StringOrElement,
    onClose: func,
    triggerCloseOnOverlayClick: bool,
    skin: func.isRequired,
    theme: object,
    themeOverrides: object,
    themeAPI: object
  };

  static defaultProps = {
    isActive: false,
    contentLabel: 'Modal Dialog',
    triggerCloseOnOverlayClick: true,
    theme: {},
    themeOverrides: {},
    themeAPI: { ...MODAL_THEME_API }
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
