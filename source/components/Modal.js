import React, { Component } from "react";
import { string, bool, func, object, shape } from "prop-types";
import { withTheme } from "../themes/withTheme";

// internal utiltity functions
import { StringOrElement, composeTheme, addThemeId } from "../utils";

// import constants
import { IDENTIFIERS } from "../themes/API";

class Modal extends Component {
  static propTypes = {
    contentLabel: StringOrElement,
    context: shape({
      theme: object,
      ROOT_THEME_API: object
    }),
    isActive: bool,
    onClose: func,
    skin: func.isRequired,
    triggerCloseOnOverlayClick: bool,
    theme: object,
    themeId: string,
    themeOverrides: object // custom css/scss from user that adheres to component's theme API
  };

  static defaultProps = {
    contentLabel: "Modal Dialog",
    isActive: false,
    triggerCloseOnOverlayClick: true,
    theme: null,
    themeId: IDENTIFIERS.MODAL,
    themeOverrides: {}
  };

  constructor(props) {
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
