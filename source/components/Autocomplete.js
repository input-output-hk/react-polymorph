import React, { Component } from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { StringOrElement } from '../utils/props';

// import the composeTheme utility function
import composeTheme from '../utils/composeTheme';

// import the Autocomplete component's theme API
import { AUTOCOMPLETE_THEME_API } from '../themes/API';

class Autocomplete extends Component {
  static propTypes = {
    label: StringOrElement,
    error: StringOrElement,
    onChange: PropTypes.func,
    maxSelections: PropTypes.number,
    placeholder: PropTypes.string,
    options: PropTypes.array,
    isOpeningUpward: PropTypes.bool,
    sortAlphabetically: PropTypes.bool,
    multipleSameSelections: PropTypes.bool,
    maxVisibleOptions: PropTypes.number,
    invalidCharsRegex: PropTypes.instanceOf(RegExp),
    skin: PropTypes.func.isRequired,
    theme: PropTypes.object,
    themeOverrides: PropTypes.object,
    themeAPI: PropTypes.object
  };

  static defaultProps = {
    error: null,
    options: [],
    theme: {},
    themeOverrides: {}, // custom css/scss from user that adheres to React Polymorph theme API
    themeAPI: { ...AUTOCOMPLETE_THEME_API },
    maxVisibleOptions: 10, // max number of visible options
    multipleSameSelections: true, // if true then same word can be selected multiple times
    sortAlphabetically: true, // options are sorted alphabetically by default
    invalidCharsRegex: /[^a-zA-Z0-9]/g, // only allow letters and numbers by default
    isOpeningUpward: false
  };

  constructor(props, context) {
    super(props);

    const { themeOverrides, themeAPI } = props;

    const theme =
      context && context.theme && context.theme.autocomplete
        ? context.theme.autocomplete
        : props.theme;

    this.state = {
      inputValue: '',
      error: '',
      selectedOptions: [],
      filteredOptions:
        this.props.sortAlphabetically && this.props.options
          ? this.props.options.sort()
          : this.props.options || [],
      isOpen: false,
      composedTheme: composeTheme(theme, themeOverrides, themeAPI)
    };
  }

  _setError = error => this.setState({ error });

  focus = () => this.handleAutocompleteClick();

  openOptions = () => {
    this.setState({ isOpen: true });
  };

  closeOptions = () => {
    this.setState({ isOpen: false });
  };

  handleAutocompleteClick = () => {
    this.inputElement.focus();
    if (!this.state.isOpen) {
      this.openOptions();
    } else {
      this.closeOptions();
    }
  };

  _filterOptions = value => {
    let filteredOptions = [];

    if (value !== '') {
      _.some(this.props.options, function(option) {
        if (_.startsWith(option, value)) {
          filteredOptions.push(option);
        }
      });
    } else {
      filteredOptions = this.props.options;
    }

    return filteredOptions;
  };

  _handleBackspace = event => {
    const { selectedOptions } = this.state;

    // Remove last selected option
    this.removeOption(selectedOptions.length - 1, event);
  };

  _filterInvalidChars = value => {
    let filteredValue = '';

    if (this.props.invalidCharsRegex.test(value)) {
      filteredValue = value.replace(this.props.invalidCharsRegex, '');
    } else {
      filteredValue = value;
    }

    return filteredValue;
  };

  handleInputChange = event => {
    const { keyCode } = event;
    const value = event.target.value;
    const { selectedOptions } = this.state;

    // check for backspace to delete selected option
    if (keyCode === 8 && !value && selectedOptions.length) {
      return this._handleBackspace(event);
    } else {
      // filter out invalid characters
      const filteredValue = this._filterInvalidChars(event.target.value);

      // filter options
      const filteredOptions = this._filterOptions(filteredValue);

      // open options, update filteredOptions, and update inputValue
      this.setState({
        isOpen: true,
        inputValue: filteredValue,
        filteredOptions
      });
    }
  };

  handleChange = (option, event) => {
    this.updateSelectedOptions(event, option);
  };

  updateSelectedOptions = (event, selectedOption = null) => {
    const canMoreOptionsBeSelected =
      this.state.selectedOptions.length < this.props.maxSelections;
    const areFilteredOptionsAvailable =
      this.state.filteredOptions && this.state.filteredOptions.length > 0;

    if (
      !this.props.maxSelections ||
      (canMoreOptionsBeSelected && areFilteredOptionsAvailable)
    ) {
      if (!selectedOption) return;
      let option = selectedOption.trim();
      const optionCanBeSelected =
        (this.state.selectedOptions.indexOf(option) < 0 &&
          !this.props.multipleSameSelections) ||
        this.props.multipleSameSelections;

      if (option && optionCanBeSelected && this.state.isOpen) {
        const selectedOptions = _.concat(this.state.selectedOptions, option);
        this.selectionChanged(selectedOptions, event);
        this.setState({ selectedOptions, isOpen: false });
      }
    }

    this.setState({ inputValue: '' });
  };

  removeOption = (index, event) => {
    const selectedOptions = this.state.selectedOptions;
    _.pullAt(selectedOptions, index);
    this.selectionChanged(selectedOptions, event);
    this.setState({ selectedOptions });
  };

  selectionChanged = (selectedOptions, event) => {
    if (this.props.onChange) this.props.onChange(selectedOptions, event);
  };

  render() {
    // destructuring the props here ensures that variable names
    // do not overwrite each other, only pass on the "...rest" of the props

    const {
      skin: AutocompleteSkin,
      theme,
      themeOverrides,
      themeAPI,
      onChange,
      error,
      ...rest
    } = this.props;

    return (
      <AutocompleteSkin
        inputValue={this.state.inputValue}
        selectedOptions={this.state.selectedOptions}
        filteredOptions={this.state.filteredOptions}
        isOpen={this.state.isOpen}
        theme={this.state.composedTheme}
        handleInputChange={this.handleInputChange}
        error={error || this.state.error} //may need to add set error handler in the skin
        rootRef={el => (this.rootElement = el)}
        inputRef={el => (this.inputElement = el)}
        suggestionsRef={el => (this.suggestionsElement = el)}
        handleChange={this.handleChange}
        closeOptions={this.closeOptions}
        handleAutocompleteClick={this.handleAutocompleteClick}
        removeOption={this.removeOption}
        {...rest}
      />
    );
  }
}

Autocomplete.contextTypes = {
  theme: PropTypes.object
};

export default Autocomplete;
