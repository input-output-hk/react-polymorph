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
  className?: string,
  context: ThemeContextProp,
  label: string | Element<any>,
  items: Array<{ }>,
  skin?: ComponentType<any>,
  theme: ?Object,
  themeId: string,
  themeOverrides: Object,
};

type State = {
  composedTheme: Object,
  isOpen: boolean,
  isMouseOverItems: boolean,
  isMouseOverRoot: boolean,
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
      isMouseOverItems: false,
      isMouseOverRoot: false,
    };
  }

  componentWillReceiveProps(nextProps: Props) {
    didThemePropsChange(this.props, nextProps, this.setState.bind(this));
  }

  // ========= PUBLIC SKIN API =========

  toggleOpen = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  // ========= PRIVATE SKIN API =========

  _toggleMouseOverItems = () => {
    this.setState({ isMouseOverItems: !this.state.isMouseOverItems });
  };

  _toggleMouseOverRoot = () => {
    this.setState({ isMouseOverRoot: !this.state.isMouseOverRoot });
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
    const { isMouseOverItems, isMouseOverRoot, isOpen } = this.state;

    return (
      <DropdownSkin
        isOpen={isOpen || isMouseOverItems || isMouseOverRoot}
        rootRef={this.rootElement}
        theme={this.state.composedTheme}
        toggleMouseOverItems={this._toggleMouseOverItems}
        toggleMouseOverRoot={this._toggleMouseOverRoot}
        {...rest}
      />
    );
  }
}

export const Dropdown = withTheme(DropdownBase);
