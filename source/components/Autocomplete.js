// @flow
import React, { Component } from 'react';
import type { ComponentType } from 'react';

// external libraries
import _ from 'lodash';

// internal utility functions
import { withTheme } from '../themes/withTheme';
import { composeTheme, composeFunctions, addThemeId } from '../utils';

import { IDENTIFIERS } from '../themes/API';

type Props = {
  context: {
    theme: Object,
    ROOT_THEME_API: Object
  },
  error: string,
  invalidCharsRegex: RegExp,
  isOpeningUpward: boolean,
  label: string | Element,
  maxSelections: number,
  maxVisibleOptions: number,
  multipleSameSelections: boolean,
  onChange: Function,
  options: Array<any>,
  selectedOptions: Array<any>,
  placeholder: string,
  renderSelections: Function,
  renderOptions: Function,
  skin: ComponentType<any>,
  sortAlphabetically: boolean,
  theme: Object, // will take precedence over theme in context if passed
  themeId: string,
  themeOverrides: Object
};

type State = {
  inputValue: string,
  error: string,
  selectedOptions: Array<any>,
  filteredOptions: Array<any>,
  isOpen: boolean,
  composedTheme: Object
};

class Autocomplete extends Component<Props, State> {
  rootElement: ?Element;
  inputElement: HTMLInputElement;
  suggestionsElement: ?Element;

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

  constructor(props: Props) {
    super(props);

    const {
      context,
      themeId,
      theme,
      themeOverrides,
      sortAlphabetically,
      options,
      selectedOptions
    } = props;

    this.state = {
      inputValue: '',
      error: '',
      selectedOptions: selectedOptions || [],
      filteredOptions:
        sortAlphabetically && options ? options.sort() : options || [],
      isOpen: false,
      composedTheme: composeTheme(
        addThemeId(theme || context.theme, themeId),
        addThemeId(themeOverrides, themeId),
        context.ROOT_THEME_API
      )
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
  onKeyDown = (event: SyntheticKeyboardEvent<>) => {
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
  handleInputChange = (event: SyntheticInputEvent<HTMLInputElement>) => {
    const value = event.target.value;

    // filter out invalid characters
    const filteredValue = this._filterInvalidChars(value);

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
  handleChange = (option: any, event: SyntheticEvent<>) => {
    this.updateSelectedOptions(event, option);
  };

  updateSelectedOptions = (
    event: SyntheticEvent<>,
    selectedOption: any = null
  ) => {
    const canMoreOptionsBeSelected =
      this.state.selectedOptions.length < this.props.maxSelections;
    const areFilteredOptionsAvailable =
      this.state.filteredOptions && this.state.filteredOptions.length > 0;

    if (
      !this.props.maxSelections ||
      (canMoreOptionsBeSelected && areFilteredOptionsAvailable)
    ) {
      if (!selectedOption) return;
      const option = selectedOption.trim();
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

  removeOption = (index: number, event: SyntheticEvent<>) => {
    const selectedOptions = this.state.selectedOptions;
    _.pullAt(selectedOptions, index);
    this.selectionChanged(selectedOptions, event);
    this.setState({ selectedOptions });
  };

  selectionChanged = (
    selectedOptions: Array<any>,
    event: SyntheticEvent<any>
  ) => {
    if (this.props.onChange) this.props.onChange(selectedOptions, event);
  };

  // returns an object containing props, theme, and method handlers
  // associated with rendering this.state.selectedOptions, the user can call
  // this in the body of the renderSelections function
  getSelectionProps = ({
    removeSelection
  }: { removeSelection: Function } = {}) => {
    const { themeId } = this.props;
    const { inputValue, isOpen, selectedOptions, composedTheme } = this.state;
    return {
      inputValue,
      isOpen,
      selectedOptions,
      theme: composedTheme[themeId],
      removeSelection: (index: number, event: SyntheticEvent<>) =>
        // the user's custom removeSelection event handler is composed with
        // the internal functionality of Autocomplete (this.removeOption)
        composeFunctions(removeSelection, this.removeOption)(index, event)
    };
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
        getSelectionProps={this.getSelectionProps}
        {...rest}
      />
    );
  }

  // ======== PRIVATE METHOD ==========

  _removeOptions = () => {
    const { onChange } = this.props;
    onChange ? onChange([]) : null;
    this.setState({ selectedOptions: [], inputValue: '' });
  };

  _filterOptions = (value: string) => {
    let filteredOptions = [];

    if (value !== '') {
      _.some(this.props.options, (option) => {
        if (_.startsWith(option, value)) {
          filteredOptions.push(option);
        }
      });
    } else {
      filteredOptions = this.props.options;
    }

    return filteredOptions;
  };

  _filterInvalidChars = (value: string) => {
    let filteredValue = '';

    if (this.props.invalidCharsRegex.test(value)) {
      filteredValue = value.replace(this.props.invalidCharsRegex, '');
    } else {
      filteredValue = value;
    }

    return filteredValue;
  };
}

export default withTheme(Autocomplete);
