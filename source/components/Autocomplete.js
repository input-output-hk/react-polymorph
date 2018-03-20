import React, { Component } from 'react';
import {
  bool,
  func,
  object,
  number,
  array,
  string,
  instanceOf
} from 'prop-types';

// external libraries
import _ from 'lodash';

// Autocomplete theme API
import THEME_API, { IDENTIFIERS } from '../themes/API';

// internal utility functions
import { StringOrElement, composeTheme, pickTheme } from '../utils';

class Autocomplete extends Component {
  static propTypes = {
    error: StringOrElement,
    invalidCharsRegex: instanceOf(RegExp),
    isOpeningUpward: bool,
    label: StringOrElement,
    maxSelections: number,
    maxVisibleOptions: number,
    multipleSameSelections: bool,
    onChange: func,
    options: array,
    selectedOptions: array,
    placeholder: string,
    skin: func.isRequired,
    sortAlphabetically: bool,
    theme: object,
    themeId: string,
    themeOverrides: object
  };

  static defaultProps = {
    error: null,
    invalidCharsRegex: /[^a-zA-Z0-9]/g, // only allow letters and numbers by default
    isOpeningUpward: false,
    maxVisibleOptions: 10, // max number of visible options
    multipleSameSelections: true, // if true then same word can be selected multiple times
    options: [],
    sortAlphabetically: true, // options are sorted alphabetically by default
    theme: null,
    themeId: IDENTIFIERS.AUTOCOMPLETE,
    themeOverrides: {}
  };

  static contextTypes = {
    theme: object
  };

  constructor(props, context) {
    super(props);
    const { themeOverrides, sortAlphabetically, options, selectedOptions } = props;
    const theme = props.theme || context.theme;
    this.state = {
      inputValue: '',
      error: '',
      selectedOptions: selectedOptions || [],
      filteredOptions: sortAlphabetically && options ? options.sort() : options || [],
      isOpen: false,
      composedTheme: composeTheme(theme, themeOverrides, THEME_API)
    };
  }

  clear = () => this._removeOptions();

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

  // checks for backspace in order to delete the last selected option
  onKeyDown = event => {
    if (
      event.keyCode === 8 &&
      !event.target.value &&
      this.state.selectedOptions.length
    ) {
      // Remove last selected option
      this.removeOption(this.state.selectedOptions.length - 1, event);
    }
  };

  // onChange handler for input element in AutocompleteSkin
  handleInputChange = event => {
    const value = event.target.value;

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
  };

  // passed to Options onChange handler in AutocompleteSkin
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
    // destructuring props ensures only the "...rest" get passed down
    const {
      skin: AutocompleteSkin,
      theme,
      themeOverrides,
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
        error={error || this.state.error}
        rootRef={el => (this.rootElement = el)}
        inputRef={el => (this.inputElement = el)}
        suggestionsRef={el => (this.suggestionsElement = el)}
        handleChange={this.handleChange}
        closeOptions={this.closeOptions}
        handleAutocompleteClick={this.handleAutocompleteClick}
        removeOption={this.removeOption}
        onKeyDown={this.onKeyDown}
        {...rest}
      />
    );
  }

  // ======== PRIVATE METHOD ==========

  _removeOptions = () => {
    this.selectionChanged([]);
    this.setState({ selectedOptions: [], inputValue: '' });
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

  _filterInvalidChars = value => {
    let filteredValue = '';

    if (this.props.invalidCharsRegex.test(value)) {
      filteredValue = value.replace(this.props.invalidCharsRegex, '');
    } else {
      filteredValue = value;
    }

    return filteredValue;
  };
}

export default Autocomplete;
