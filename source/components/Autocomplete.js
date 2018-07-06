// @flow
import React, { Component } from 'react';
import type { ComponentType, Element } from 'react';


// external libraries
import createRef from 'create-react-ref/lib/createRef';
import _ from 'lodash';

// interal components
import { GlobalListeners } from './HOC/GlobalListeners';
import { withTheme } from './HOC/withTheme';

// internal utility functions
import { composeTheme, addThemeId } from '../utils/themes';
import { composeFunctions } from '../utils/props';

import { IDENTIFIERS } from '../themes/API';

type Props = {
  className: string,
  context: {
    theme: Object,
    ROOT_THEME_API: Object
  },
  error: string,
  invalidCharsRegex: RegExp,
  isOpeningUpward: boolean,
  label: string | Element<any>,
  maxSelections: number,
  maxVisibleOptions: number,
  multipleSameSelections: boolean,
  onChange: Function,
  options: Array<any>,
  preselectedOptions: Array<any>,
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

class AutocompleteBase extends Component<Props, State> {
  rootElement: ?Element<any>;
  inputElement: ?Element<'input'>;
  suggestionsElement: ?Element<any>;
  optionsElement: ?Element<any>;

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

    // define refs
    this.rootElement = createRef();
    this.inputElement = createRef();
    this.suggestionsElement = createRef();
    this.optionsElement = createRef();

    const {
      context,
      themeId,
      theme,
      themeOverrides,
      sortAlphabetically,
      options,
      preselectedOptions
    } = props;

    this.state = {
      inputValue: '',
      error: '',
      selectedOptions: preselectedOptions || [],
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

  open = () => this.setState({ isOpen: true });

  close = () => this.setState({ isOpen: false });

  toggleOpen = () => this.setState({ isOpen: !this.state.isOpen });

  handleAutocompleteClick = () => {
    const { inputElement } = this;
    if (inputElement && inputElement.current) {
      inputElement.current.focus();
    }
    // toggle options open/closed
    this.toggleOpen();
  };

  onKeyDown = (event: SyntheticKeyboardEvent<>) => {
    if (
      // Check for backspace in order to delete the last selected option
      event.keyCode === 8 &&
      !event.target.value &&
      this.state.selectedOptions.length
    ) {
      // Remove last selected option
      this.removeOption(this.state.selectedOptions.length - 1, event);
    } else if (event.keyCode === 13) { // Open suggestions on ENTER
      this.open();
    } else if (event.keyCode === 27) { // Close suggestions on ESC
      this.close();
    }
  };

  // onChange handler for input element in AutocompleteSkin
  handleInputChange = (event: SyntheticInputEvent<HTMLInputElement>) => {
    this._setInputValue(event.target.value);
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

    this._setInputValue('');
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
      context,
      invalidCharsRegex,
      multipleSameSelections,
      sortAlphabetically,
      skin: AutocompleteSkin,
      theme,
      themeOverrides,
      onChange,
      error,
      ...rest
    } = this.props;

    return (
      <GlobalListeners
        optionsIsOpen={this.state.isOpen}
        optionsRef={this.optionsElement}
        rootRef={this.rootElement}
        toggleOpen={this.toggleOpen}
      >
        {() => (
          <AutocompleteSkin
            error={error || this.state.error}
            filteredOptions={this.state.filteredOptions}
            getSelectionProps={this.getSelectionProps}
            handleAutocompleteClick={this.handleAutocompleteClick}
            handleChange={this.handleChange}
            handleInputChange={this.handleInputChange}
            inputRef={this.inputElement}
            inputValue={this.state.inputValue}
            isOpen={this.state.isOpen}
            onKeyDown={this.onKeyDown}
            optionsRef={this.optionsElement}
            removeOption={this.removeOption}
            rootRef={this.rootElement}
            selectedOptions={this.state.selectedOptions}
            suggestionsRef={this.suggestionsElement}
            theme={this.state.composedTheme}
            toggleOpen={this.toggleOpen}
            {...rest}
          />
        )}
      </GlobalListeners>
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

  _setInputValue = (value: string) => {
    const filteredValue = this._filterInvalidChars(value);
    const filteredOptions = this._filterOptions(filteredValue);
    this.setState({
      isOpen: true,
      inputValue: filteredValue,
      filteredOptions
    });
  }
}

export const Autocomplete = withTheme(AutocompleteBase);
