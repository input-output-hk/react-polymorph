import React, { Component } from 'react';
import { bool, func, object, arrayOf, shape, string } from 'prop-types';

// import the Select component's theme API
import { SELECT_THEME_API } from '../themes/API';

// import the composeTheme utility function
import { pickTheme, composeTheme } from '../utils';

class Select extends Component {
  static propTypes = {
    allowBlank: bool,
    autoFocus: bool,
    isOpeningUpward: bool,
    onBlur: func,
    onChange: func,
    onFocus: func,
    options: arrayOf(
      shape({
        isDisabled: bool,
        value: string.isRequired,
      })
    ).isRequired,
    placeholder: string,
    skin: func.isRequired,
    theme: object,
    themeAPI: object,
    themeOverrides: object, // custom css/scss from user that adheres to component's theme API
    value: string
  };

  static defaultProps = {
    allowBlank: true,
    autoFocus: false,
    isOpeningUpward: false,
    theme: null,
    themeOverrides: {},
    themeAPI: { ...SELECT_THEME_API },
    value: ''
  };

  static contextTypes = {
    theme: object
  };

  constructor(props, context) {
    super(props);
    const { themeOverrides, themeAPI } = props;
    const theme = pickTheme(props, context);
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
