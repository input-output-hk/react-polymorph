import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { bool, func, object, array, string, any, shape } from 'prop-types';
import { withTheme } from '../themes/withTheme';

// external libraries
import classnames from 'classnames';

// internal utility functions
import {
  StringOrElement,
  composeTheme,
  addEventsToDocument,
  removeEventsFromDocument,
  targetIsDescendant,
  composeFunctions,
  addThemeId
} from '../utils';

// import constants
import { IDENTIFIERS } from '../themes/API';

class Options extends Component {
  static propTypes = {
    context: shape({
      theme: object,
      ROOT_THEME_API: object
    }),
    inputValue: string,
    isOpen: bool,
    isOpeningUpward: bool,
    noResults: bool,
    noResultsMessage: StringOrElement,
    onChange: func,
    onClose: func,
    options: array,
    optionRenderer: func,
    render: func,
    resetOnClose: bool, // reset highlighted option on options close (e.g. in autocomplete)
    selectedOption: any,
    skin: func.isRequired,
    selectedOptions: array,
    theme: object,
    themeId: string,
    themeOverrides: object // custom css/scss from user that adheres to component's theme API
  };

  static defaultProps = {
    isOpen: false,
    isOpeningUpward: false,
    noResultsMessage: 'No results',
    resetOnClose: false,
    theme: null,
    themeId: IDENTIFIERS.OPTIONS,
    themeOverrides: {}
  };

  constructor(props) {
    super(props);

    const { context, themeId, theme, themeOverrides, isOpen } = props;

    this.state = {
      composedTheme: composeTheme(
        addThemeId(theme || context.theme, themeId),
        addThemeId(themeOverrides, themeId),
        context.ROOT_THEME_API
      ),
      isOpen,
      highlightedOptionIndex: 0
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.isOpen !== nextProps.isOpen) {
      this.setState({ isOpen: nextProps.isOpen });
    }
  }

  componentWillUpdate(nextProps, nextState) {
    // update isOpen state when parent component force open / close options
    // (e.g. click on Input in Select component)
    if (!this.state.isOpen && nextState.isOpen) {
      window.addEventListener('resize', this._handleWindowResize);
      addEventsToDocument(this._getDocumentEvents());
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.isOpen && !this.state.isOpen) this._removeAllEventListeners();
  }

  componentWillUnmount() {
    this._removeAllEventListeners();
  }

  open = () => {
    this.setState({
      isOpen: true,
      highlightedOptionIndex: this.props.resetOnClose
        ? 0
        : this.state.highlightedOptionIndex
    });
  };

  close = () => {
    if (this.props.onClose) this.props.onClose();
    this.setState({
      highlightedOptionIndex: this.props.resetOnClose
        ? 0
        : this.state.highlightedOptionIndex
    });
  };

  getHighlightedOptionIndex = () => {
    // If nothing is higlighted, highlight selected option
    // In case nothing is selected, highlight first option
    const { options, isOpeningUpward } = this.props;
    const currentIndex = this.state.highlightedOptionIndex;
    let index = 0;
    if (currentIndex !== null) {
      index = currentIndex;
    } else if (this.props.selectedOptionValue) {
      index = options.findIndex(
        option => option.value === this.props.selectedOptionValue
      );
    }
    if (isOpeningUpward) return options.length - 1 - index;
    return index;
  };

  setHighlightedOptionIndex = optionIndex => {
    if (
      !this.isHighlightedOption(optionIndex) &&
      this.isDisabledOption(optionIndex)
    ) {
      this.setState({ highlightedOptionIndex: optionIndex });
    }
  };

  isSelectedOption = optionIndex => {
    const { options, isOpeningUpward } = this.props;
    const index = isOpeningUpward ? options.length - 1 - optionIndex : optionIndex;
    const option = options[index];
    return option && this.props.selectedOption === option;
  };

  isHighlightedOption = optionIndex => {
    return this.state.highlightedOptionIndex === optionIndex;
  };

  isDisabledOption = optionIndex => {
    const { options } = this.props;
    const option = options[optionIndex];
    return option && !option.isDisabled;
  };

  handleClickOnOption = (option, event) => {
    if (option) {
      if (option.isDisabled) return;
      if (this.props.onChange) this.props.onChange(option, event);
    }
    if (this.props.onBlur) this.props.onBlur(event);
    this.close();
  };

  // returns an object containing props, theme, and method handlers
  // associated with rendering this.props.options, the user can call
  // this in the body of the renderOptions function
  getOptionProps = ({ onClick, onMouseEnter, ...rest } = {}) => {
    const { isOpen, themeId, options, selectedOptions } = this.props;
    const { composedTheme } = this.state;
    const {
      isHighlightedOption,
      isDisabledOption,
      handleClickOnOption,
      setHighlightedOptionIndex
    } = this;

    return {
      options,
      selectedOptions,
      isOpen,
      isHighlightedOption,
      isDisabledOption,
      theme: composedTheme[themeId],
      onClick: (option, event) =>
        // the user's custom onClick event handler is composed with
        // the internal functionality of Options (this.handleClickOnOption)
        composeFunctions(onClick, handleClickOnOption)(option, event),
      onMouseEnter: (index, event) =>
        // user's custom onMouseEnter is composed with this.setHighlightedOptionIndex
        composeFunctions(onMouseEnter, setHighlightedOptionIndex)(index, event),
      ...rest
    };
  };

  // ========= PRIVATE HELPERS =========

  _handleSelectionOnKeyDown = event => {
    const { options } = this.props;
    if (options.length) {
      const { isOpeningUpward } = this.props;
      const currentIndex = this.state.highlightedOptionIndex;
      const reverseIndex = options.length - 1 - currentIndex;
      const highlightedOption =
        options[isOpeningUpward ? reverseIndex : currentIndex];
      this.handleClickOnOption(highlightedOption, event);
    } else {
      event.preventDefault();
    }
  };

  _handleHighlightMove = (currentIndex, direction) => {
    const { options } = this.props;
    if (options.length) {
      const lowerIndexBound = 0;
      const upperIndexBound = options.length - 1;
      let newIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;

      // Make sure new index is within options bounds
      newIndex = Math.max(lowerIndexBound, Math.min(newIndex, upperIndexBound));

      if (options[newIndex].isDisabled) {
        // Try to jump over disabled options
        const canMoveUp = newIndex > lowerIndexBound;
        const canMoveDown = newIndex < upperIndexBound;
        if (
          (direction === 'up' && canMoveUp) ||
          (direction === 'down' && canMoveDown)
        ) {
          this._handleHighlightMove(newIndex, direction);
        }
      } else {
        this.setHighlightedOptionIndex(newIndex);
      }
    } else {
      event.preventDefault();
    }
  };

  _handleKeyDown = event => {
    const highlightOptionIndex = this.state.highlightedOptionIndex;
    switch (event.keyCode) {
      case 9: // Tab key: selects currently highlighted option
        event.preventDefault();
        this._handleSelectionOnKeyDown(event);
        break;
      case 13: // Enter key: selects currently highlighted option
        event.preventDefault();
        this._handleSelectionOnKeyDown(event);
        break;
      case 32: // Space key: selects currently highlighted option
        event.preventDefault();
        this._handleSelectionOnKeyDown(event);
        break;
      case 27: // Escape key: closes options if open
        this.close();
        break;
      case 38: // Up Arrow key: moves highlighted selection 'up' 1 index
        event.preventDefault(); // prevent caret move
        this._handleHighlightMove(highlightOptionIndex, 'up');
        break;
      case 40: // Down Arrow key: moves highlighted selection 'down' 1 index
        event.preventDefault(); // prevent caret move
        this._handleHighlightMove(highlightOptionIndex, 'down');
        break;
      default:
        this.props.resetOnClose && this.setHighlightedOptionIndex(0);
    }
  };

  _handleDocumentClick = event => {
    const root = this.optionsElement;
    const isDescendant = targetIsDescendant(event, ReactDOM.findDOMNode(root));

    if (this.state.isOpen && !isDescendant) {
      this.close();
    }
  };

  _handleWindowResize = () => this.state.isOpen && this.close();

  _handleScroll = () => this.state.isOpen && this.close();

  _getRootSkinPart() {
    return this.skinParts[Options.SKIN_PARTS.OPTIONS];
  }

  _removeAllEventListeners() {
    removeEventsFromDocument(this._getDocumentEvents());
    window.removeEventListener('resize', this._handleWindowResize);
  }

  _getDocumentEvents() {
    return {
      keydown: this._handleKeyDown,
      click: this._handleDocumentClick,
      touchend: this._handleDocumentClick,
      scroll: this._handleScroll
    };
  }

  render() {
    // destructuring props ensures only the "...rest" get passed down
    const {
      skin: OptionsSkin,
      theme,
      themeOverrides,
      onChange,
      ...rest
    } = this.props;

    const { composedTheme, isOpen, highlightedOptionIndex } = this.state;

    return (
      <OptionsSkin
        optionsRef={el => (this.optionsElement = el)}
        theme={composedTheme}
        isOpen={isOpen}
        highlightedOptionIndex={highlightedOptionIndex}
        getHighlightedOptionIndex={this.getHighlightedOptionIndex}
        isSelectedOption={this.isSelectedOption}
        isHighlightedOption={this.isHighlightedOption}
        handleClickOnOption={this.handleClickOnOption}
        setHighlightedOptionIndex={this.setHighlightedOptionIndex}
        getOptionProps={this.getOptionProps}
        {...rest}
      />
    );
  }
}

export default withTheme(Options);
