// @flow
import React, { Component } from 'react';
import type { ComponentType } from 'react';
import { withTheme } from '../themes/withTheme';

// import utility functions
import { composeTheme, addThemeId } from '../utils';

// import constants
import { IDENTIFIERS } from '../themes/API';

type Props = {
  context: {
    theme: Object,
    ROOT_THEME_API: Object
  },
  disabled: boolean,
  label: string | Element,
  onBlur: Function,
  onChange: Function,
  onFocus: Function,
  selected: boolean,
  skin: ComponentType<any>,
  theme: Object, // will take precedence over theme in context if passed
  themeId: string,
  themeOverrides: Object
};

type State = {
  composedTheme: Object
};

class Radio extends Component<Props, State> {
  static defaultProps = {
    disabled: false,
    selected: false,
    theme: null,
    themeId: IDENTIFIERS.RADIO,
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
    const { skin: RadioSkin, theme, themeOverrides, ...rest } = this.props;

    return <RadioSkin theme={this.state.composedTheme} {...rest} />;
  }
}

export default withTheme(Radio);
