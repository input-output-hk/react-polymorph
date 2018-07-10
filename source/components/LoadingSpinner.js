// @flow
import React, { Component } from 'react';
import type { ComponentType, Element } from 'react';

// external libraries
import createRef from 'create-react-ref/lib/createRef';

// internal components
import { withTheme } from './HOC/withTheme';

// internal utility functions
import { composeTheme, addThemeId } from '../utils/themes';

// import constants
import { IDENTIFIERS } from '../themes/API';

type Props = {
  big?: boolean,
  className: string,
  context: {
    theme: Object,
    ROOT_THEME_API: Object
  },
  skin: ComponentType<any>,
  theme: Object, // will take precedence over theme in context if passed
  themeId: string,
  themeOverrides: Object
};

type State = {
  composedTheme: Object
};

class LoadingSpinnerBase extends Component<Props, State> {
  rootElement: ?Element<*>;

  static defaultProps = {
    big: false,
    theme: null,
    themeId: IDENTIFIERS.LOADING_SPINNER,
    themeOverrides: {}
  };

  constructor(props: Props) {
    super(props);

    // define refs
    this.rootElement = createRef();

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
    const {
      skin: LoadingSpinnerSkin,
      theme,
      themeOverrides,
      context,
      ...rest
    } = this.props;

    return (
      <LoadingSpinnerSkin
        rootRef={this.rootElement}
        theme={this.state.composedTheme}
        {...rest}
      />
    );
  }
}

export const LoadingSpinner = withTheme(LoadingSpinnerBase);
