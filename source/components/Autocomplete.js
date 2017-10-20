import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import FormField from './FormField';
import ReactDOM from 'react-dom';
import events from '../utils/events';

export default class Autocomplete extends FormField {

  static SKIN_PARTS = {
    ROOT: 'root',
    INPUT: 'input',
    SUGGESTIONS: 'suggestions',
  };

  static propTypes = Object.assign({}, FormField.propTypes, {
    error: PropTypes.string,
    maxSelections: PropTypes.number,
    placeholder: PropTypes.string,
    suggestedWords: PropTypes.array,
    sortAlphabetically: PropTypes.bool,
    multipleSameSelections: PropTypes.bool,
    maxVisibleSuggestions: PropTypes.number,
    invalidCharsRegex: PropTypes.instanceOf(RegExp),
  });

  static defaultProps = {
    maxVisibleSuggestions: 10, // max number of visible suggested words
    multipleSameSelections: true, // if true then same word can be selected multiple times
    sortAlphabetically: true, // suggested words are sorted alphabetically by default
    invalidCharsRegex: /[^a-zA-Z0-9]/g, // only allow letters and numbers by default
  };

  state = {
    selectedWords: [],
    filteredWords: (this.props.sortAlphabetically && this.props.suggestedWords) ? this.props.suggestedWords.sort() : (this.props.suggestedWords || []),
    isSuggestionsOpened: false,
    highlightedOptionIndex: 0,
    dropdownParams: null,
  };

  componentDidMount() {
    const node = this._getRootSkinPart();
    const parentNode = node.parentNode;

    events.addEventsToDocument(this._getDocumentEvents());
    window.addEventListener('resize', this.closeSuggestions);

    // handle scroll e.g in modal - by default scroll handler is only on document
    parentNode.addEventListener('scroll', this.closeSuggestions);
  }

  componentWillUnmount () {
    const node = this._getRootSkinPart();
    const parentNode = node.parentNode;

    events.removeEventsFromDocument(this._getDocumentEvents());
    window.removeEventListener('resize', this.closeSuggestions);
    parentNode.removeEventListener('scroll', this.closeSuggestions);
  }

  prepareSkinProps (props) {
    return Object.assign({}, super.prepareSkinProps(props), {
      selectedWords: this.state.selectedWords,
      filteredWords: this.state.filteredWords,
      isSuggestionsOpened: this.state.isSuggestionsOpened,
      highlightedOptionIndex: this.state.highlightedOptionIndex,
      maxSelections: this.props.maxSelections,
      maxVisibleSuggestions: this.props.maxVisibleSuggestions,
      dropdownParams: this.state.dropdownParams,
    });
  }

  focus = () => this.handleAutocompleteClick();

  openSuggestions = () => {
    const root = this._getRootSkinPart();
    const rootElementParams = root.getBoundingClientRect();

    const dropdownParams = {
      width: rootElementParams.width,
      positionX: rootElementParams.left,
      positionY: rootElementParams.y + rootElementParams.height + 20,
    };

    this.setState({ isSuggestionsOpened: true, highlightedOptionIndex: 0, dropdownParams });
  };

  closeSuggestions = () => {
    this.setState({ isSuggestionsOpened: false, highlightedOptionIndex: 0, dropdownParams: null });
  };

  handleAutocompleteClick = () => {
    this._getInputSkinPart().focus();
    if (!this.state.isSuggestionsOpened) {
      this.openSuggestions();
    } else {
      this.closeSuggestions();
    }
  };

  _handleDocumentClick = (event) => {
    const root = this._getRootSkinPart();
    const isDescendant = events.targetIsDescendant(event, ReactDOM.findDOMNode(root));
    if (this.state.isSuggestionsOpened && !isDescendant) {
      this.closeSuggestions();
    }
  };

  onKeyDown = (event) => {
    const { selectedWords } = this.state;

    switch (event.keyCode) {
      case 8: // Delte on backspace
        if (!event.target.value && selectedWords.length) {
          this.removeWord(selectedWords.length - 1, event); // remove last
        }
        break;
      case 9: // Select currently highlighted option on 'Tab' key
        event.preventDefault();
        this.updateSelectedWords(event);
        break;
      case 13: // Select currently highlighted option on 'Enter' key
        this.updateSelectedWords(event);
        break;
      case 27: // Close on 'Escape' key
        this.closeSuggestions();
        break;
      case 38: // Move selection higlight 'up' on Arrow Up key
        this._handleHighlightMove(event, 'up');
        break;
      case 40: // Move selection higlight 'down' on Arrow Down key
        this._handleHighlightMove(event, 'down');
        break;
      default:
        this.openSuggestions();
    }
  };

  _handleHighlightMove = (event, direction) => {
    event.preventDefault();

    const { maxVisibleSuggestions } = this.props;
    const { filteredWords, highlightedOptionIndex } = this.state;

    let position;
    if (direction === 'up') {
      position = highlightedOptionIndex - 1;
    } else if (direction === 'down') {
      position = highlightedOptionIndex + 1;
    }

    const maxPosition = (maxVisibleSuggestions < filteredWords.length) ? maxVisibleSuggestions : filteredWords.length;

    if (position >= 0 && position < maxPosition) {
      this.setState({ highlightedOptionIndex: position, isSuggestionsOpened: true });
    }
  };

  setHighlightedOptionIndex = (index) => {
    this.setState({ highlightedOptionIndex: index });
  };

  // onKeyUp handler
  clearInvalidChars = (event) => {
    let value = event.target.value;

    if (this.props.invalidCharsRegex.test(value)) {
      event.target.value = value.replace(this.props.invalidCharsRegex, '');
      return;
    }

    const filteredWords = [];
    _.some(this.props.suggestedWords, function (suggestedWord) {
      if (_.startsWith(suggestedWord, value)) {
        filteredWords.push(suggestedWord);
      }
    });

    this.setState({ filteredWords: (value !== '') ? filteredWords : this.props.suggestedWords });
  };

  updateSelectedWords = (event) => {
    const canMoreWordsBeSelected = this.state.selectedWords.length < this.props.maxSelections;
    const areFilteredWordsAvailable = this.state.filteredWords && this.state.filteredWords.length > 0;

    if (!this.props.maxSelections || (canMoreWordsBeSelected && areFilteredWordsAvailable)) {
      let value = this.state.filteredWords[this.state.highlightedOptionIndex];

      if (!value) {
        return;
      }

      let word = value.trim();
      const wordCanBeSelected = this.state.selectedWords.indexOf(word) < 0 && !this.props.multipleSameSelections || this.props.multipleSameSelections;

      if (word && wordCanBeSelected && this.state.isSuggestionsOpened) {
        const selectedWords = _.concat(this.state.selectedWords, word)

        this.selectionChanged(selectedWords, event);
        this.setState({
          selectedWords: selectedWords,
          highlightedOptionIndex: 0,
          isSuggestionsOpened: false
        });
      }
    }

    const input = this._getInputSkinPart();
    input.value = '';
  };

  removeWord = (index, event) => {
    const selectedWords = this.state.selectedWords;
    _.pullAt(selectedWords, index);
    this.selectionChanged(selectedWords, event);
    this.setState({ selectedWords });
  };

  selectionChanged = (selectedWords, event) => {
    if (this.props.onChange) this.props.onChange(selectedWords, event);
  };

  _getRootSkinPart () {
    return this.skinParts[Autocomplete.SKIN_PARTS.ROOT];
  }

  _getInputSkinPart () {
    return this.skinParts[Autocomplete.SKIN_PARTS.INPUT];
  }

  _getDocumentEvents () {
    return {
      click: this._handleDocumentClick,
      scroll: this.closeSuggestions,
    };
  }
}
