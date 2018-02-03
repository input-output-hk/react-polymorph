import React, { Component } from 'react';
import { bool, func, object, arrayOf, shape, string } from 'prop-types';

// import the Select component's theme API
import { SELECT_THEME_API } from '../themes/API';

// import the composeTheme utility function
import { StringOrElement, composeTheme } from '../utils';

class Select extends Component {
  static propTypes = {
    value: string,
    allowBlank: bool,
    placeholder: string,
    autoFocus: bool,
    onChange: func,
    onFocus: func,
    onBlur: func,
    options: arrayOf(
      shape({
        value: string.isRequired,
        isDisabled: bool
      })
    ).isRequired,
    isOpeningUpward: bool,
    skin: func.isRequired,
    theme: object,
    themeOverrides: object,
    themeAPI: object
  };

  static defaultProps = {
    isOpeningUpward: false,
    autoFocus: false,
    allowBlank: true,
    theme: {},
    themeOverrides: {}, // custom css/scss from user that adheres to React Polymorph theme API
    themeAPI: { ...SELECT_THEME_API }
  };

  static contextTypes = {
    theme: object
  };

  constructor(props, context) {
    super(props);

    const { themeOverrides, themeAPI } = props;

    const theme =
      context && context.theme && context.theme.select
        ? context.theme.select
        : props.theme;

    // if themeOverrides isn't provided, composeTheme returns theme immediately
    this.state = {
      isOpen: false,
      composedTheme: composeTheme(theme, themeOverrides, themeAPI)
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

  handleInputClick = event => {
    event.stopPropagation();
    event.preventDefault();
    this.inputElement.blur();
    this.toggleOpen();
  };

  handleChange = (option, event) => {
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
    const {
      skin: SelectSkin,
      theme,
      themeOverrides,
      themeAPI,
      ...rest
    } = this.props;

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

export default Select;
