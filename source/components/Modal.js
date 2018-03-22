import React, { Component } from 'react';
import { string, bool, func, object } from 'prop-types';

// Modal's theme API
import THEME_API, { IDENTIFIERS } from '../themes/API';

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
    themeId: string,
    themeOverrides: object // custom css/scss from user that adheres to component's theme API
  };

  static defaultProps = {
    contentLabel: 'Modal Dialog',
    isActive: false,
    triggerCloseOnOverlayClick: true,
    theme: null,
    themeId: IDENTIFIERS.MODAL,
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
      skin: ModalSkin,
      theme,
      themeOverrides,
      ...rest
    } = this.props;

    return <ModalSkin theme={this.state.composedTheme} {...rest} />;
  }
}

export default Modal;
