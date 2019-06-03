// @flow
import React, { Component } from 'react';
import type { ComponentType, Element } from 'react';

// external libraries
import createRef from 'create-react-ref/lib/createRef';
import _ from 'lodash';

// interal components
import { GlobalListeners } from './HOC/GlobalListeners';

// internal utility functions
import { createEmptyContext, withTheme } from './HOC/withTheme';
import { composeTheme, addThemeId, didThemePropsChange } from '../utils/themes';
import { composeFunctions } from '../utils/props';

import { IDENTIFIERS } from '.';
import type { ThemeContextProp } from './HOC/withTheme';

type Props = {
  className?: string,
  context: ThemeContextProp,
  error: ?string,
  invalidCharsRegex: RegExp,
  isOpeningUpward: boolean,
  label?: string | Element<any>,
  maxSelections?: number,
  maxVisibleOptions: number,
  multipleSameSelections: boolean,
  onChange?: Function,
  options: Array<any>,
  preselectedOptions?: Array<any>,
  placeholder?: string,
  renderSelections?: Function,
  renderOptions?: Function,
  skin?: ComponentType<any>,
  sortAlphabetically: boolean,
  theme: ?Object, // will take precedence over theme in context if passed
  themeId: string,
  themeOverrides: Object
};

type State = {
  composedTheme: Object,
  error: string,
  filteredOptions: Array<any>,
  isOpen: boolean,
  inputValue: string,
  mouseIsOverOptions: boolean,
  selectedOptions: Array<any>,
};

class AutocompleteBase extends Component<Props, State> {
  // declare ref types
  rootElement: ?Element<any>;
  inputElement: ?Element<'input'>;
  suggestionsElement: ?Element<any>;
  optionsElement: ?Element<any>;

  // define static properties
  static displayName = 'Autocomplete';
  static defaultProps = {
    context: createEmptyContext(),
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
      mouseIsOverOptions: false,
      composedTheme: composeTheme(
        addThemeId(theme || context.theme, themeId),
        addThemeId(themeOverrides, themeId),
        context.ROOT_THEME_API
      )
    };
  }

  componentWillReceiveProps(nextProps: Props) {
    didThemePropsChange(this.props, nextProps, this.setState.bind(this));
  }

  clear = () => this._removeOptions();

  focus = () => this.handleAutocompleteClick();

  open = () => this.setState({ isOpen: true });

  close = () => this.setState({ isOpen: false });

  toggleOpen = () => {
    if (this.state.isOpen && this.optionsElement && this.optionsElement.current) {
      // set Options scroll position to top on close
      this.optionsElement.current.scrollTop = 0;
    }
    this.setState({ isOpen: !this.state.isOpen });
  }

  toggleMouseLocation = () => (
    this.setState({ mouseIsOverOptions: !this.state.mouseIsOverOptions })
  );

  handleAutocompleteClick = () => {
    const { inputElement } = this;
    if (inputElement && inputElement.current) {
      inputElement.current.focus();
    }
    // toggle options open/closed
    this.toggleOpen();
  };

  onKeyDown = (event: SyntheticKeyboardEvent<>) => {

    if ( // Check for backspace in order to delete the last selected option
      event.keyCode === 8 &&
      !event.target.value &&
      this.state.selectedOptions.length
    ) {
      // Remove last selected option
      this.removeOption(this.state.selectedOptions.length - 1, event);
    } else if (event.keyCode === 27) { // ESCAPE key: Stops propagation & modal closing
      event.stopPropagation();
    } else if (event.keyCode === 13) { // ENTER key: Opens suggestions
      this.open();
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
    const { maxSelections, multipleSameSelections } = this.props;
    const { selectedOptions, filteredOptions, isOpen } = this.state;
    const canMoreOptionsBeSelected = (
      maxSelections != null ? selectedOptions.length < maxSelections : true
    );
    const areFilteredOptionsAvailable = filteredOptions && filteredOptions.length > 0;

    if (!maxSelections || (canMoreOptionsBeSelected && areFilteredOptionsAvailable)) {
      if (!selectedOption) return;
      const option = selectedOption.trim();
      const optionCanBeSelected = (
        (selectedOptions.indexOf(option) < 0 && !multipleSameSelections) ||
        multipleSameSelections
      );

      if (option && optionCanBeSelected && isOpen) {
        const newSelectedOptions = _.concat(selectedOptions, option);
        this.selectionChanged(newSelectedOptions, event);
        this.setState({ selectedOptions: newSelectedOptions, isOpen: false });
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
      skin,
      theme,
      themeOverrides,
      onChange,
      error,
      ...rest
    } = this.props;

    const AutocompleteSkin = skin || context.skins[IDENTIFIERS.AUTOCOMPLETE];

    return (
      <GlobalListeners
        mouseIsOverOptions={this.state.mouseIsOverOptions}
        optionsIsOpen={this.state.isOpen}
        optionsIsOpeningUpward={this.props.isOpeningUpward}
        optionsRef={this.optionsElement}
        rootRef={this.rootElement}
        toggleOpen={this.toggleOpen}
      >
        {({ optionsMaxHeight }) => (
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
            optionsMaxHeight={optionsMaxHeight}
            optionsRef={this.optionsElement}
            removeOption={this.removeOption}
            rootRef={this.rootElement}
            selectedOptions={this.state.selectedOptions}
            suggestionsRef={this.suggestionsElement}
            theme={this.state.composedTheme}
            toggleMouseLocation={this.toggleMouseLocation}
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
