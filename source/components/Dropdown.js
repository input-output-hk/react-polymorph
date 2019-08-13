// @flow
import React, { Component } from 'react';
import type { ComponentType, Element } from 'react';
import createRef from 'create-react-ref/lib/createRef';

// internal utility functions
import { createEmptyContext, withTheme } from './HOC/withTheme';
import { composeTheme, addThemeId, didThemePropsChange } from '../utils/themes';

// import constants
import { IDENTIFIERS } from '.';
import type { ThemeContextProp } from './HOC/withTheme';

type Props = {
  activeItem: any,
  className?: string,
  context: ThemeContextProp,
  label: string | Element<any>,
  items: Array<any>,
  skin?: ComponentType<any>,
  theme: ?Object,
  themeId: string,
  themeOverrides: Object,
};

type State = {
  composedTheme: Object,
  isOpen: boolean,
};

class DropdownBase extends Component<Props, State> {
  // declare ref types
  rootElement: ?Element<*>;

  // define static properties
  static displayName = 'Dropdown';
  static defaultProps = {
    context: createEmptyContext(),
    theme: null,
    themeOverrides: {},
    themeId: IDENTIFIERS.DROPDOWN,
  };

  constructor(props: Props) {
    super(props);

    // define ref
    this.rootElement = createRef();

    const { context, themeId, theme, themeOverrides } = props;
    this.state = {
      composedTheme: composeTheme(
        addThemeId(theme || context.theme, themeId),
        addThemeId(themeOverrides, themeId),
        context.ROOT_THEME_API
      ),
      isOpen: false,
    };
  }

  componentWillReceiveProps(nextProps: Props) {
    didThemePropsChange(this.props, nextProps, this.setState.bind(this));
  }

  // ========= PUBLIC SKIN API =========

  toggleOpen = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  render() {
    const {
      skin,
      theme,
      themeOverrides,
      context,
      ...rest
    } = this.props;

    const DropdownSkin = skin || context.skins[IDENTIFIERS.DROPDOWN];

    return (
      <DropdownSkin
        isOpen={this.state.isOpen}
        rootRef={this.rootElement}
        theme={this.state.composedTheme}
        toggleOpen={this.toggleOpen}
        {...rest}
      />
    );
  }
}

export const Dropdown = withTheme(DropdownBase);
