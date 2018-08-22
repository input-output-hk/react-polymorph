// @flow
import React, { Component } from 'react';
import type { ComponentType, Element } from 'react';
import { isEqual } from 'lodash';

// internal components
import { withTheme } from './HOC/withTheme';

// internal utility functions
import { composeTheme, addThemeId } from '../utils/themes';

// import constants
import { IDENTIFIERS } from '../themes/API';

type Props = {
  checked: boolean,
  className: string,
  context: {
    theme: Object,
    ROOT_THEME_API: Object
  },
  disabled: boolean,
  label: string | Element<any>,
  labelLeft: string | Element<any>,
  labelRight: string | Element<any>,
  onChange: Function,
  onBlur: Function,
  onFocus: Function,
  skin: ComponentType<any>,
  theme: Object, // will take precedence over theme in context if passed
  themeId: string,
  themeOverrides: Object
};

type State = {
  composedTheme: Object
};

class CheckboxBase extends Component<Props, State> {
  static defaultProps = {
    checked: false,
    disabled: false,
    theme: null,
    themeId: IDENTIFIERS.CHECKBOX,
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
    const { context, themeId, theme, themeOverrides } = this.props;
    const {
      context: nextContext,
      themeId: nextThemeId,
      theme: nextTheme,
      themeOverrides: nextOverrides
    } = nextProps;

    if (
      !isEqual(context, nextContext) ||
      !isEqual(themeId, nextThemeId) ||
      !isEqual(theme, nextTheme) ||
      !isEqual(themeOverrides, nextOverrides)
    ) {
      this.setState(() => ({
        composedTheme: composeTheme(
          addThemeId(nextTheme || nextContext.theme, nextThemeId),
          addThemeId(nextOverrides, nextThemeId),
          nextContext.ROOT_THEME_API
        )
      }));
    }
  }

  render() {
    // destructuring props ensures only the "...rest" get passed down
    const {
      skin: CheckboxSkin,
      theme,
      themeOverrides,
      context,
      ...rest
    } = this.props;

    return <CheckboxSkin theme={this.state.composedTheme} {...rest} />;
  }
}

export const Checkbox = withTheme(CheckboxBase);
