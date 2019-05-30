// @flow
import React, { Component } from 'react';
import type {
  ComponentType,
  // $FlowFixMe
  SyntheticKeyboardEvent,
  // $FlowFixMe
  SyntheticMouseEvent,
  // $FlowFixMe
  SyntheticEvent,
  Element,
  ElementRef,
} from 'react';

// internal utility functions
import { createEmptyContext, withTheme } from './HOC/withTheme';
import { composeTheme, addThemeId, didThemePropsChange } from '../utils/themes';
import { composeFunctions } from '../utils/props';

// import constants
import { IDENTIFIERS } from '.';
import type { ThemeContextProp } from './HOC/withTheme';

type Props = {
  className?: String,
  context: ThemeContextProp,
  isOpen: boolean,
  isOpeningUpward: boolean,
  noResults?: boolean,
  noResultsMessage: string | Element<any>,
  onBlur?: Function,
  onChange?: Function,
  onClose?: Function,
  options: Array<any>,
  optionRenderer?: Function,
  optionsRef?: ElementRef<any>,
  optionsMaxHeight?: number,
  render?: Function,
  resetOnClose: boolean,
  // TODO: Why do we have two separate props for selection?
  selectedOption?: any,
  selectedOptions?: Array<any>,
  skin?: ComponentType<any>,
  targetRef?: ElementRef<*>,
  theme: ?Object, // if passed by user, it will take precedence over this.props.context.theme
  themeId: string,
  themeOverrides: Object,
  toggleMouseLocation?: Function,
  toggleOpen?: Function
};

type State = {
  composedTheme: Object,
  highlightedOptionIndex: number
};

class OptionsBase extends Component<Props, State> {
  // declare ref types
  optionsElement: ?Element<any>; // TODO: Does this get used? Don't think so.

  // define static properties
  static displayName = 'Options';
  static defaultProps = {
    context: createEmptyContext(),
    isOpen: false,
    isOpeningUpward: false,
    noResultsMessage: 'No results',
    options: [],
    resetOnClose: false,
    theme: null,
    themeId: IDENTIFIERS.OPTIONS,
    themeOverrides: {},
    toggleOpen() {}
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
      highlightedOptionIndex: 0
    };
  }

  componentDidMount() {
    if (this.props.isOpen) {
      document.addEventListener('keydown', this._handleKeyDown, false);
    }
  }

  componentWillReceiveProps(nextProps: Props) {
    if (!this.props.isOpen && nextProps.isOpen) {
      document.addEventListener('keydown', this._handleKeyDown, false);
    } else if (this.props.isOpen && !nextProps.isOpen) {
      document.removeEventListener('keydown', this._handleKeyDown, false);
    }
    didThemePropsChange(this.props, nextProps, this.setState.bind(this));
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this._handleKeyDown, false);
  }

  close = () => {
    const { isOpen, onClose, resetOnClose, toggleOpen } = this.props;
    if (isOpen && toggleOpen) toggleOpen();
    this.setState({
      highlightedOptionIndex: resetOnClose ? 0 : this.state.highlightedOptionIndex
    });
    if (onClose) onClose();
  };

  getHighlightedOptionIndex = () => {
    // If nothing is higlighted, highlight selected option
    // In case nothing is selected, highlight first option
    const { options, isOpeningUpward } = this.props;
    const currentIndex = this.state.highlightedOptionIndex;
    let index = 0;

    if (currentIndex !== null) {
      index = currentIndex;
    }

    if (isOpeningUpward) return options.length - 1 - index;
    return index;
  };

  setHighlightedOptionIndex = (optionIndex: number) => {
    if (
      !this.isHighlightedOption(optionIndex) &&
      this.isDisabledOption(optionIndex)
    ) {
      this.setState({ highlightedOptionIndex: optionIndex });
    }
  };

  isSelectedOption = (optionIndex: number) => {
    const { options, isOpeningUpward } = this.props;
    const index = isOpeningUpward ? options.length - 1 - optionIndex : optionIndex;
    const option = options[index];
    return option && this.props.selectedOption === option;
  };

  isHighlightedOption = (optionIndex: number) => this.state.highlightedOptionIndex === optionIndex;

  isDisabledOption = (optionIndex: number) => {
    const { options } = this.props;
    const option = options[optionIndex];
    return option && !option.isDisabled;
  };

  handleClickOnOption = (option: ?Object, event: SyntheticEvent<>) => {
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
  getOptionProps = ({
    onClick,
    onMouseEnter,
    ...rest
  }: { onClick: Function, onMouseEnter: Function } = {}) => {
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
      onClick: (option: ?Object, event: SyntheticEvent<>) =>
        // the user's custom onClick event handler is composed with
        // the internal functionality of Options (this.handleClickOnOption)
        composeFunctions(onClick, handleClickOnOption)(option, event),
      onMouseEnter: (index: number, event: SyntheticMouseEvent<>) =>
        // user's custom onMouseEnter is composed with this.setHighlightedOptionIndex
        composeFunctions(onMouseEnter, setHighlightedOptionIndex)(index, event),
      ...rest
    };
  };

  // ========= PRIVATE HELPERS =========

  _handleSelectionOnKeyDown = (event: SyntheticKeyboardEvent<>) => {
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

  _handleHighlightMove = (currentIndex: number, direction: string) => {
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
    }
  };

  // this needs to get passed to OptionsSkin and attached to each Option Li
  _handleKeyDown = (event: SyntheticKeyboardEvent<>) => {
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

  render() {
    // destructuring props ensures only the "...rest" get passed down
    const {
      skin,
      targetRef,
      theme,
      themeOverrides,
      onChange,
      context,
      optionsRef,
      isOpen,
      ...rest
    } = this.props;

    const { composedTheme, highlightedOptionIndex } = this.state;

    const OptionsSkin = skin || context.skins[IDENTIFIERS.OPTIONS];

    return (
      <OptionsSkin
        getHighlightedOptionIndex={this.getHighlightedOptionIndex}
        getOptionProps={this.getOptionProps}
        handleClickOnOption={this.handleClickOnOption}
        highlightedOptionIndex={highlightedOptionIndex}
        isHighlightedOption={this.isHighlightedOption}
        isOpen={isOpen}
        isSelectedOption={this.isSelectedOption}
        optionsRef={optionsRef}
        setHighlightedOptionIndex={this.setHighlightedOptionIndex}
        targetRef={targetRef}
        theme={composedTheme}
        {...rest}
      />
    );
  }
}

export const Options = withTheme(OptionsBase);
