// @flow
import React, { Component } from 'react';
import type { Element } from 'react';
import { isEqual } from 'lodash';

// components
import { Base } from './Base';
import { withTheme } from '../HOC/withTheme';

// utility functions
import { composeTheme, addThemeId } from '../../utils/themes';
import { numberToPx } from '../../utils/props';

// constants
import { IDENTIFIERS } from '../../themes/API';

type Props = {
  className: string,
  children: Element<*>,
  context: {
    theme: Object,
    ROOT_THEME_API: Object
  },
  padding: string | number,
  theme: Object,
  themeId: string,
  themeOverrides: Object
};

type State = { composedTheme: Object };

class GutterBase extends Component<Props, State> {
  // define static properties
  static displayName = 'Gutter';
  static defaultProps = {
    theme: null,
    themeId: IDENTIFIERS.GUTTER,
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
    const { children, className, themeId, padding: inlinePadding } = this.props;
    const padding = inlinePadding ? numberToPx(inlinePadding) : null;
    const theme = this.state.composedTheme[themeId];

    return (
      <Base
        activeClasses={['gutter']}
        className={className}
        inlineStyles={{ padding }}
        stylesToAdd={theme}
      >
        {children}
      </Base>
    );
  }
}

export const Gutter = withTheme(GutterBase);
