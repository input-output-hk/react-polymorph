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
  activeItem: any,
  items: Array<any>,
  noArrow?: boolean,
  onItemSelected?: Function,
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
    noArrow: false,
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

  _setMouseOverItems = (isMouseOverItems: boolean) => {
    this.setState({ isMouseOverItems });
  };

  _setMouseOverRoot = (isMouseOverRoot: boolean) => {
    this.setState({ isMouseOverRoot });
  };

  _onItemSelected = (item) => {
    const { onItemSelected } = this.props;
    this._setMouseOverRoot(false);
    this._setMouseOverItems(false);
    if (onItemSelected) {
      onItemSelected(item);
    }
  };

  render() {
    const {
      context,
      onItemSelected,
      skin,
      theme,
      themeOverrides,
      ...rest
    } = this.props;

    const DropdownSkin = skin || context.skins[IDENTIFIERS.DROPDOWN];
    const { isMouseOverItems, isMouseOverRoot, isOpen } = this.state;

    return (
      <DropdownSkin
        isOpen={isOpen || isMouseOverItems || isMouseOverRoot}
        onItemSelected={this._onItemSelected}
        rootRef={this.rootElement}
        theme={this.state.composedTheme}
        setMouseOverRoot={this._setMouseOverRoot}
        setMouseOverItems={this._setMouseOverItems}
        {...rest}
      />
    );
  }
}

export const Dropdown = withTheme(DropdownBase);
