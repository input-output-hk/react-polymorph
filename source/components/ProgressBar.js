// @flow
import React, { Component } from 'react';
import type { ComponentType } from 'react';

// internal components
import { withTheme } from './HOC/withTheme';

// internal utility functions
import { composeTheme, addThemeId } from '../utils/themes';

// import constants
import { IDENTIFIERS } from '../themes/API';

type Props = {
  className: string,
  context: {
    theme: Object,
    ROOT_THEME_API: Object
  },
  progress: number,
  skin: ComponentType<any>,
  theme: Object, // will take precedence over theme in context if passed
  themeId: string,
  themeOverrides: Object // custom css/scss from user that adheres to component's theme API
};

type State = {
  composedTheme: Object
};

class ProgressBarBase extends Component<Props, State> {
  static defaultProps = {
    progress: 0,
    theme: null,
    themeId: IDENTIFIERS.PROGRESS_BAR,
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
    const {
      skin: ProgressBarSkin,
      theme,
      themeOverrides,
      context,
      ...rest
    } = this.props;

    return <ProgressBarSkin theme={this.state.composedTheme} {...rest} />;
  }
}

export const ProgressBar = withTheme(ProgressBarBase);
