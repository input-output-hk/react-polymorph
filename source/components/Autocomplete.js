import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import FormField from './FormField';

export default class Autocomplete extends FormField {

  static SKIN_PARTS = {
    ROOT: 'root',
    INPUT: 'input',
  };

  static propTypes = Object.assign({}, FormField.propTypes, {
    error: PropTypes.string,
    maxSelections: PropTypes.number,
    placeholder: PropTypes.string,
    options: PropTypes.array,
    sortAlphabetically: PropTypes.bool,
    multipleSameSelections: PropTypes.bool,
    maxVisibleOptions: PropTypes.number,
    invalidCharsRegex: PropTypes.instanceOf(RegExp),
  });

  static defaultProps = {
    maxVisibleOptions: 10, // max number of visible options
    multipleSameSelections: true, // if true then same word can be selected multiple times
    sortAlphabetically: true, // options are sorted alphabetically by default
    invalidCharsRegex: /[^a-zA-Z0-9]/g, // only allow letters and numbers by default
  };

  state = {
    selectedOptions: [],
    filteredOptions: (this.props.sortAlphabetically && this.props.options) ? this.props.options.sort() : (this.props.options || []),
    isOpen: false,
  };

  prepareSkinProps (props) {
    const { selectedOptions, filteredOptions, isOpen } = this.state;
    return Object.assign({}, super.prepareSkinProps(props), {
      selectedOptions,
      filteredOptions,
      isOpen
    });
  }

  focus = () => this.handleAutocompleteClick();

  openOptions = () => {
    this.setState({ isOpen: true });
  };

  closeOptions = () => {
    this.setState({ isOpen: false });
  };

  handleAutocompleteClick = () => {
    this._getInputSkinPart().focus();
    if (!this.state.isOpen) {
      this.openOptions();
    } else {
      this.closeOptions();
    }
  };

  onKeyDown = (event) => {
    const { selectedOptions } = this.state;

    //Delte on backspace
    if (event.keyCode === 8 && !event.target.value && selectedOptions.length) {
      // remove last selected option
      this.removeOption(selectedOptions.length - 1, event);
    } else {
      this.openOptions();
    }
  };

  // onKeyUp handler
  clearInvalidChars = (event) => {
    let value = event.target.value;

    if (this.props.invalidCharsRegex.test(value)) {
      event.target.value = value.replace(this.props.invalidCharsRegex, '');
      return;
    }

    const filteredOptions = [];
    _.some(this.props.options, function (option) {
      if (_.startsWith(option, value)) {
        filteredOptions.push(option);
      }
    });

    this.setState({ filteredOptions: (value !== '') ? filteredOptions : this.props.options });
  };

  handleChange = (option, event) => {
    this.updateSelectedOptions(event, option);
  }

  updateSelectedOptions = (event, selectedOption = null) => {
    const canMoreOptionsBeSelected = this.state.selectedOptions.length < this.props.maxSelections;
    const areFilteredOptionsAvailable = this.state.filteredOptions && this.state.filteredOptions.length > 0;

    if (!this.props.maxSelections || (canMoreOptionsBeSelected && areFilteredOptionsAvailable)) {
      let value = selectedOption;

      if (!selectedOption) {
        return;
      }

      let option = selectedOption.trim();
      const optionCanBeSelected = this.state.selectedOptions.indexOf(option) < 0 && !this.props.multipleSameSelections || this.props.multipleSameSelections;

      if (option && optionCanBeSelected && this.state.isOpen) {
        const selectedOptions = _.concat(this.state.selectedOptions, option)

        this.selectionChanged(selectedOptions, event);
        this.setState({ selectedOptions, isOpen: false });
      }
    }

    const input = this._getInputSkinPart();
    input.value = '';
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

  _getInputSkinPart () {
    return this.skinParts[Autocomplete.SKIN_PARTS.INPUT];
  }
}
