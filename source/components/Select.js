import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import FormField from './FormField';
import events from './utils/events';
import Input from './Input';

export default class Select extends FormField {

  static SKIN_PARTS = {
    ROOT: 'root',
    INPUT: Input.SKIN_PARTS.INPUT,
    OPTIONS: 'options',
  };

  static propTypes = Object.assign({}, FormField.propTypes, {
    options: PropTypes.array.isRequired,
    optionRenderer: PropTypes.func,
    value: PropTypes.string,
    allowBlank: PropTypes.bool,
    placeholder: PropTypes.string,
    isOpeningUpward: PropTypes.bool,
  });

  static defaultProps = {
    allowBlank: true,
    isOpeningUpward: false,
  };

  static metaProps = FormField.metaProps.concat(['options', 'allowBlank']);

  state = {
    isOpen: false,
    highlightedOptionIndex: null,
  };

  // ========= COMPONENT LIFE CYCLE =========

  componentWillUpdate (nextProps, nextState) {
    if (!this.state.isOpen && nextState.isOpen) {
      events.addEventsToDocument(this._getDocumentEvents());
    }
  }

  componentDidUpdate (prevProps, prevState) {
    if (prevState.isOpen && !this.state.isOpen) {
      events.removeEventsFromDocument(this._getDocumentEvents());
    }
  }

  componentWillUnmount () {
    if (this.state.isOpen) {
      events.removeEventsFromDocument(this._getDocumentEvents());
    }
  }

  prepareSkinProps (props) {
    return Object.assign({}, super.prepareSkinProps(props), {
      selectedOption: this.getSelectedOption(),
      isOpen: this.state.isOpen,
    });
  }

  // ========= PUBLIC SKIN API =========

  handleInputClick = (event) => {
    event.stopPropagation();
    event.preventDefault();
    this._getInputSkinPart().blur();
    this.setState({
      isOpen: !this.state.isOpen,
      highlightedOptionIndex: this.getHighlightedOptionIndex(),
    });
  };

  getSelectedOption = () => {
    const { options, value, allowBlank } = this.props;
    for (const option of options) {
      if (option.value === value) return option;
    }
    if (!allowBlank) return options[0];
  };

  isSelectedOption = (option) => {
    return option.value === this.props.value;
  };

  getHighlightedOptionIndex = () => {
    // If nothing is higlighted, highlight selected option
    // In case nothing is selected, highlight first option
    const { options, isOpeningUpward } = this.props;
    const currentIndex = this.state.highlightedOptionIndex;
    let index = 0;
    if (currentIndex !== null) {
      index = currentIndex;
    } else {
      const selectedOption = this.getSelectedOption();
      if (selectedOption) {
        index = options.findIndex(option => option.value === selectedOption.value);
      }
    }
    if (isOpeningUpward) {
      const reverseIndex = options.length - 1 - index;
      return reverseIndex;
    }
    return index;
  };

  setHighlightedOptionIndex = (optionIndex) => {
    if (!this.isHighlightedOption(optionIndex)) {
      this.setState({ highlightedOptionIndex: optionIndex });
    }
  };

  isHighlightedOption = (optionIndex) => {
    return this.state.highlightedOptionIndex === optionIndex;
  };

  focus = () => this.open();

  open = () => {
    if (!this.state.isOpen) {
      this.setState({
        isOpen: true,
        highlightedOptionIndex: this.getHighlightedOptionIndex(),
      });
    }
  };

  close = () => {
    if (this.state.isOpen) {
      this.setState({
        isOpen: false,
        highlightedOptionIndex: null,
      });
    }
  };

  handleClickOnOption = (option, event) => {
    if (this.props.onBlur) this.props.onBlur(event);
    if (this.props.onChange) this.props.onChange(option, event);
    this.close();
  };

  // ========= PRIVATE HELPERS =========

  _handleDocumentClick = (event) => {
    const root = this._getRootSkinPart();
    const isDescendant = events.targetIsDescendant(event, ReactDOM.findDOMNode(root));
    if (this.state.isOpen && !isDescendant) {
      this.setState({
        isOpen: false,
        highlightedOptionIndex: null,
      });
    }
  };

  _handleSelectionOnEnterKey = (event) => {
    const { options, isOpeningUpward } = this.props;
    const currentIndex = this.state.highlightedOptionIndex;
    const reverseIndex = options.length - 1 - currentIndex;
    const highlightedOption = options[isOpeningUpward ? reverseIndex : currentIndex].value;
    this.handleClickOnOption(highlightedOption, event);
  };

  _handleHighlightMove = (direction) => {
    const { options } = this.props;
    const currentIndex = this.state.highlightedOptionIndex;
    let newIndex = (direction === 'up') ? (currentIndex - 1) : (currentIndex + 1);
    // Make sure new index is within options bounds
    newIndex = Math.max(0, Math.min(newIndex, (options.length - 1)));
    this.setHighlightedOptionIndex(newIndex);
  };

  _handleKeyDown = (event) => {
    switch (event.keyCode) {
      case 13: // Select currently highlighted option on Enter key
        this._handleSelectionOnEnterKey(event);
        break;
      case 27: // Close on Escape key
        this.close();
        break;
      case 38: // Move selection higlight 'up' on Arrow Up key
        this._handleHighlightMove('up');
        break;
      case 40: // Move selection higlight 'down' on Arrow Down key
        this._handleHighlightMove('down');
        break;
    }
  };

  _getDocumentEvents () {
    return {
      click: this._handleDocumentClick,
      touchend: this._handleDocumentClick,
      keydown: this._handleKeyDown,
    };
  }

  _getRootSkinPart () {
    return this.skinParts[Select.SKIN_PARTS.ROOT];
  }

  _getInputSkinPart () {
    return this.skinParts[Select.SKIN_PARTS.INPUT];
  }

}
