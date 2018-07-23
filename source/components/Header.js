// @flow
import React, { Component } from 'react';
import type { ComponentType, Element } from 'react';
import { pickBy } from 'lodash';

// components
import { withTheme } from './HOC/withTheme';

// helper styles for boolean props
import headerStyles from '../themes/helpers/Header.scss';

// utility functions
import { composeTheme, addThemeId } from '../utils/themes';

// constants
import { IDENTIFIERS } from '../themes/API';

type Props = {
  bold: boolean,
  center: boolean,
  children: Element<*>,
  className: string,
  context: {
    theme: Object,
    ROOT_THEME_API: Object
  },
  h1: boolean,
  h2: boolean,
  h3: boolean,
  h4: boolean,
  light: boolean,
  lowerCase: boolean,
  medium: boolean,
  regular: boolean,
  right: boolean,
  left: boolean,
  skin: ComponentType<any>,
  theme: Object,
  themeId: string,
  themeOverrides: Object,
  thin: boolean,
  upperCase: boolean
};

type State = { composedTheme: Object, isThemed: boolean };

class HeaderBase extends Component <Props, State> {
  static defaultProps = {
    theme: null,
    themeId: IDENTIFIERS.HEADER,
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
      ),
      isThemed: false
    };
  }

  _assembleInlineStyles = ({ center, lowerCase, left, right, upperCase }) => {
    const textAlign = pickBy({ center, left, right });
    const textTransform = pickBy({ lowerCase, upperCase });
    return pickBy({ textAlign, textTransform });
  };

  _getActiveTheme = ({ h1, h2, h3, h4 }) => {
    const truthyProps = pickBy({ h1, h2, h3, h4 });
    const activeClasses = ['header', Object.keys(truthyProps)[0]];
    if (activeClasses.length > 1) { this.setState({ isThemed: true }); }
    return activeClasses;
  }

  render() {
    const { composedTheme, isThemed } = this.state;
    const { children, className, skin: HeaderSkin, ...styleProps } = this.props;

    // assemble props that will be passed to Base
    const activeClasses = this._getActiveTheme(styleProps);
    const inlineStyles = isThemed ? null : this._assembleInlineStyles(styleProps);
    const stylesToAdd = isThemed ? composedTheme : headerStyles;

    return (
      <HeaderSkin
        activeClasses={activeClasses}
        className={className}
        inlineStyles={inlineStyles}
        stylesToAdd={stylesToAdd}
      >
        {children}
      </HeaderSkin>
    );
  }
}

export const Header = withTheme(HeaderBase);
