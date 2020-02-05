// @flow
import React, { Component } from 'react';
import type { ComponentType, Element } from 'react';

// internal utility functions
import { createEmptyContext, withTheme } from './HOC/withTheme';
import { composeTheme, addThemeId, didThemePropsChange } from '../utils/themes';

// import constants
import { IDENTIFIERS } from '.';
import type { ThemeContextProp } from './HOC/withTheme';

type Props = {
  className?: string,
  context: ThemeContextProp,
  label?: string | Element<any>,
  mnemonicWords: Array<string>,
  skin?: ComponentType<any>,
  theme: ?Object, // will take precedence over theme in context if passed
  themeId: string,
  themeOverrides: Object, // custom css/scss from user that adheres to component's theme API
  totalColumns: number,
  totalWords: number,
};

type State = {
  activeColumn: number | null,
  composedTheme: Object,
  totalWordsEntered: number,
};

class MnemonicEntryBase extends Component<Props, State> {
  // define static properties
  static displayName = 'MnemonicEntry';
  static defaultProps = {
    context: createEmptyContext(),
    loading: false,
    theme: null,
    themeId: IDENTIFIERS.MNEMONIC_ENTRY,
    themeOverrides: {}
  };

  constructor(props: Props) {
    super(props);

    const { context, themeId, theme, themeOverrides } = props;

    this.state = {
      activeColumn: null,
      composedTheme: composeTheme(
        addThemeId(theme || context.theme, themeId),
        addThemeId(themeOverrides, themeId),
        context.ROOT_THEME_API
      ),
      totalWordsEntered: 0,
    };
  }

  componentWillReceiveProps(nextProps: Props) {
    didThemePropsChange(this.props, nextProps, this.setState.bind(this));
  }

  render() {
    // destructuring props ensures only the "...rest" get passed down
    const {
      skin,
      theme,
      themeOverrides,
      context,
      ...rest
    } = this.props;

    const {
     activeColumn,
     composedTheme,
     totalWordsEntered,
    } = this.state;

    const MnemonicEntrySkin = skin || context.skins[IDENTIFIERS.MNEMONIC_ENTRY];

    return (
      <MnemonicEntrySkin
        activeColumn={activeColumn}
        theme={composedTheme}
        totalWordsEntered={totalWordsEntered}
        {...rest}
      />
    );
  }
}

export const MnemonicEntry = withTheme(MnemonicEntryBase);
