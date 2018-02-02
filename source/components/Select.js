import React, { Component } from 'react';
import PropTypes from 'prop-types';

// import the composeTheme utility function
import composeTheme from '../utils/composeTheme.js';

// import the Select component's theme API
import { SELECT_THEME_API } from '../themes/API';

class Select extends Component {
  static propTypes = {
    value: PropTypes.string,
    allowBlank: PropTypes.bool,
    placeholder: PropTypes.string,
    autoFocus: PropTypes.bool,
    onChange: PropTypes.func,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
    options: PropTypes.arrayOf(
      PropTypes.shape({
        value: PropTypes.string.isRequired,
        isDisabled: PropTypes.bool
      })
    ).isRequired,
    isOpeningUpward: PropTypes.bool,
    skin: PropTypes.func.isRequired,
    theme: PropTypes.object,
    themeOverrides: PropTypes.object,
    themeAPI: PropTypes.object
  };

  static defaultProps = {
    isOpeningUpward: false,
    autoFocus: false,
    allowBlank: true,
    theme: {},
    themeOverrides: {}, // custom css/scss from user that adheres to React Polymorph theme API
    themeAPI: { ...SELECT_THEME_API }
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
    // destructuring the props here ensures that variable names
    // do not overwrite each other, only pass on the "...rest" of the props

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

Select.contextTypes = {
  theme: PropTypes.object
};

export default Select;
