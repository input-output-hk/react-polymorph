// @flow
import React, { Component } from 'react';
import type { ComponentType } from 'react';
import { withTheme } from '../themes/withTheme';

// import internal utility functions
import { composeTheme, addThemeId } from '../utils';

// import constants
import { IDENTIFIERS } from '../themes/API';

type Props = {
  allowBlank: boolean,
  autoFocus: boolean,
  context: {
    theme: Object,
    ROOT_THEME_API: Object
  },
  isOpeningUpward: boolean,
  onBlur: Function,
  onChange: Function,
  onFocus: Function,
  options: Array<{
    isDisabled: boolean,
    value: any
  }>,
  placeholder: string,
  skin: ComponentType<any>,
  theme: Object, // will take precedence over theme in context if passed
  themeId: string,
  themeOverrides: Object,
  value: string
};

type State = {
  composedTheme: Object,
  isOpen: boolean
};

class Select extends Component<Props, State> {
  inputElement: HTMLInputElement;

  static defaultProps = {
    allowBlank: true,
    autoFocus: false,
    isOpeningUpward: false,
    theme: null,
    themeOverrides: {},
    themeId: IDENTIFIERS.SELECT,
    value: ''
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
      isOpen: false
    };
  }

  componentDidMount() {
    if (this.props.autoFocus) {
      return this.focus();
    }
  }

  // ========= PUBLIC SKIN API =========

  // Focus the component - toggle dropdown
  focus = () => this.toggleOpen();

  toggleOpen = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  handleInputClick = (event: SyntheticMouseEvent<>) => {
    event.stopPropagation();
    event.preventDefault();
    this.inputElement.blur();
    this.toggleOpen();
  };

  handleChange = (option: Object, event: SyntheticEvent<>) => {
    if (this.props.onChange) this.props.onChange(option.value, event);
    this.toggleOpen();
  };

  getSelectedOption = () => {
    const { options, value, allowBlank } = this.props;
    for (const option of options) {
      if (option.value === value) return option;
    }
    if (!allowBlank) return options[0];
  };

  render() {
    // destructuring props ensures only the "...rest" get passed down
    const { skin: SelectSkin, theme, themeOverrides, ...rest } = this.props;

    return (
      <SelectSkin
        isOpen={this.state.isOpen}
        inputRef={el => (this.inputElement = el)}
        theme={this.state.composedTheme}
        getSelectedOption={this.getSelectedOption}
        handleInputClick={this.handleInputClick}
        handleChange={this.handleChange}
        toggleOpen={this.toggleOpen}
        {...rest}
      />
    );
  }
}

export default withTheme(Select);
