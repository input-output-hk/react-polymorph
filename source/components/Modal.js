// @flow
import React, { Component } from 'react';
import type { ComponentType } from 'react';
import { withTheme } from '../themes/withTheme';

// internal utiltity functions
import { composeTheme, addThemeId } from '../utils';

// import constants
import { IDENTIFIERS } from '../themes/API';

type Props = {
  contentLabel: string | Element,
  context: {
    theme: Object,
    ROOT_THEME_API: Object
  },
  isActive: boolean,
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

class Modal extends Component<Props, State> {
  static defaultProps = {
    contentLabel: 'Modal Dialog',
    isActive: false,
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

  render() {
    // destructuring props ensures only the "...rest" get passed down
    const { skin: ModalSkin, theme, themeOverrides, ...rest } = this.props;

    return <ModalSkin theme={this.state.composedTheme} {...rest} />;
  }
}

export default withTheme(Modal);
