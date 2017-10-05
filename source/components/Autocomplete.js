import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import FormField from './FormField';
import ReactDOM from 'react-dom';
import events from '../utils/events';

const INVALID_CHARS = /[^a-zA-Z0-9]/g; // only allow letters and numbers

export default class Autocomplete extends FormField {

  static SKIN_PARTS = {
    ROOT: 'root',
    INPUT: 'input',
    AUTOCOMPLETE: 'autocomplete',
  };

  static propTypes = Object.assign({}, FormField.propTypes, {
    error: PropTypes.string,
    maxSelections: PropTypes.number,
    placeholder: PropTypes.string,
    suggestedWords: PropTypes.array,
    sortAlphabetically: PropTypes.bool,
    multipleSameSelections: PropTypes.bool,
    maxVisibleSuggestions: PropTypes.number,
  });

  static defaultProps = {
    maxVisibleSuggestions: 10, // max number of visible suggested words
    multipleSameSelections: true, // if true then same word can be selected multiple times
    sortAlphabetically: true, // suggested words are sorted alphabetically by default
  }

  state = {
    selectedWords: [],
    filteredWords: (this.props.sortAlphabetically && this.props.suggestedWords) ? this.props.suggestedWords.sort() : (this.props.suggestedWords || []),
    isSuggestionsOpened: false,
    highlightedOptionIndex: 0,
  };


  componentDidMount() {
    events.addEventsToDocument(this._getDocumentEvents());
  }

  componentWillUnmount () {
    events.removeEventsFromDocument(this._getDocumentEvents());
  }

  prepareSkinProps (props) {
    return Object.assign({}, super.prepareSkinProps(props), {
      selectedWords: this.state.selectedWords,
      filteredWords: this.state.filteredWords,
      isSuggestionsOpened: this.state.isSuggestionsOpened,
      highlightedOptionIndex: this.state.highlightedOptionIndex,
      maxSelections: this.props.maxSelections,
      maxVisibleSuggestions: this.props.maxVisibleSuggestions,
    });
  }

  focus = () => this.handleAutocompleteClick();

  openSuggestions = () => {
    this.setState({ isSuggestionsOpened: true, highlightedOptionIndex: 0 });
  };

  closeSuggestions = () => {
    this.setState({ isSuggestionsOpened: false, highlightedOptionIndex: 0 });
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
    let keyPressed = event.which;

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
        this._handleHighlightMove('up');
        break;
      case 40: // Move selection higlight 'down' on Arrow Down key
        this._handleHighlightMove('down');
        break;
      default:
        this.openSuggestions();
    }
  };

  _handleHighlightMove = (direction) => {
    let position;
    if (direction === 'up') {
      position = this.state.highlightedOptionIndex - 1;
    } else if (direction === 'down') {
      position = this.state.highlightedOptionIndex + 1;
    }
    if (position >= 0 && position < this.state.filteredWords.length) {
      this.setState({ highlightedOptionIndex: position, isSuggestionsOpened: true });
    }
  };

  setHighlightedOptionIndex = (index) => {
    this.setState({ highlightedOptionIndex: index });
  };

  // onKeyUp handler
  clearInvalidChars = (event) => {
    let value = event.target.value;

    if (INVALID_CHARS.test(value)) {
      event.target.value = value.replace(INVALID_CHARS, '');
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

    if (!this.props.maxSelections || (canMoreWordsBeSelected && this.state.filteredWords && this.state.filteredWords.length > 0)) {
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
  }

  _getRootSkinPart () {
    return this.skinParts[Autocomplete.SKIN_PARTS.ROOT];
  }

  _getInputSkinPart () {
    return this.skinParts[Autocomplete.SKIN_PARTS.INPUT];
  }

  _getDocumentEvents () {
    return {
      click: this._handleDocumentClick
    };
  }

}
