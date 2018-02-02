import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StringOrElement } from '../utils/props';

import composeTheme from '../utils/composeTheme';

// import the Modal component's theme API
import { MODAL_THEME_API } from '../themes/API';

class Modal extends Component {
  static propTypes = {
    isActive: PropTypes.bool,
    contentLabel: StringOrElement,
    onClose: PropTypes.func,
    triggerCloseOnOverlayClick: PropTypes.bool,
    skin: PropTypes.func.isRequired,
    theme: PropTypes.object,
    themeOverrides: PropTypes.object,
    themeAPI: PropTypes.object
  };

  static defaultProps = {
    isActive: false,
    contentLabel: 'Modal Dialog',
    triggerCloseOnOverlayClick: true,
    theme: {},
    themeOverrides: {},
    themeAPI: { ...MODAL_THEME_API }
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

Modal.contextTypes = {
  theme: PropTypes.object
};

export default Modal;
