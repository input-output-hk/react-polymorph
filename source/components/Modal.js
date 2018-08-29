// @flow
import React, { Component } from 'react';
import type { ComponentType, Element } from 'react';

// internal components
import { withTheme } from './HOC/withTheme';

// internal utility functions
import { composeTheme, addThemeId, didThemePropsChange } from '../utils/themes';

// import constants
import { IDENTIFIERS } from '../themes/API';

type Props = {
  contentLabel: string | Element<any>,
  context: {
    theme: Object,
    ROOT_THEME_API: Object
  },
  isOpen: boolean,
  onClose: Function,
  skin: ComponentType<any>,
  triggerCloseOnOverlayClick: boolean,
  theme: Object, // will take precedence over theme in context if passed
  themeId: string,
  themeOverrides: Object
};

type State = {
  composedTheme: Object
};

class ModalBase extends Component<Props, State> {
  static defaultProps = {
    contentLabel: 'Modal Dialog',
    isOpen: false,
    triggerCloseOnOverlayClick: true,
    theme: null,
    themeId: IDENTIFIERS.MODAL,
    themeOverrides: {}
  };

  constructor(props: Props) {
    super(props);

    const { context, themeId, theme, themeOverrides } = props;

    this.state = {
      composedTheme: composeTheme(
        addThemeId(theme || context.theme, themeId),
        addThemeId(themeOverrides, themeId),
        context.ROOT_THEME_API
      )
    };
  }

  componentWillReceiveProps(nextProps: Props) {
    didThemePropsChange(this.props, nextProps, this.setState.bind(this));
  }

  render() {
    // destructuring props ensures only the "...rest" get passed down
    const {
      skin: ModalSkin,
      theme,
      themeOverrides,
      context,
      ...rest
    } = this.props;

    return <ModalSkin theme={this.state.composedTheme} {...rest} />;
  }
}

export const Modal = withTheme(ModalBase);
