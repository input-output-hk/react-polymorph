import React from 'react';
import PropTypes from 'prop-types';
import FormField from './FormField';
import Input from './Input';

export default class Select extends FormField {

  static SKIN_PARTS = {
    ROOT: 'root',
    INPUT: Input.SKIN_PARTS.INPUT,
  };

  // Handle props used strictly for Select parent element which is in this case Input.
  // Other props (Options props) are same for different parent elements and must be handled on one place - Options
  static propTypes = Object.assign({}, FormField.propTypes, {
    options: PropTypes.arrayOf(PropTypes.shape({
      value: PropTypes.string.isRequired,
      isDisabled: PropTypes.bool,
    })).isRequired,
    value: PropTypes.string,
    allowBlank: PropTypes.bool,
    placeholder: PropTypes.string,
  });

  static defaultProps = {
    allowBlank: true,
  };

  state = {
    isOpen: false,
  };

  prepareSkinProps (props) {
    return Object.assign({}, super.prepareSkinProps(props), {
      isOpen: this.state.isOpen,
    });
  }

  // ========= PUBLIC SKIN API =========

  // Focus the component - toggle dropdown
  focus = () => this.toggleOptions();

  onCloseOptions = () => {
    this.setState({ isOpen: false });
  };

  handleInputClick = (event) => {
    event.stopPropagation();
    event.preventDefault();
    this._getInputSkinPart().blur();
    this.toggleOptions();
  };

  handleChange = (option, event) => {
    if (this.props.onChange) this.props.onChange(option.value, event);
    this.toggleOptions();
  };

  getSelectedOption = () => {
    const { options, value, allowBlank } = this.props;
    for (const option of options) {
      if (option.value === value) return option;
    }
    if (!allowBlank) return options[0];
  };

  toggleOptions = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  // ========= PRIVATE HELPERS =========

  _getInputSkinPart () {
    return this.skinParts[Select.SKIN_PARTS.INPUT];
  }

}
