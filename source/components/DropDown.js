import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';
import FormField from './FormField';
import events from './utils/events';
import Input from './Input';

export default class DropDown extends FormField {

  static SKIN_PARTS = {
    ROOT: 'root',
    INPUT: Input.SKIN_PARTS.INPUT,
    OPTIONS: 'options',
  };

  static propTypes = Object.assign({}, FormField.propTypes, {
    options: PropTypes.array.isRequired,
    value: PropTypes.string,
    allowBlank: PropTypes.bool,
  });

  static defaultProps = {
    allowBlank: true,
  };

  static metaProps = FormField.metaProps.concat(['options', 'isOpen', 'allowBlank']);

  state = {
    isOpen: false,
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
    this.setState({ isOpen: !this.state.isOpen });
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

  close = () => {
    if (this.state.isOpen) {
      this.setState({ isOpen: false });
    }
  };

  handleSelect = (option, event) => {
    if (this.props.onBlur) this.props.onBlur(event);
    this.props.onChange(option, event);
    this.close();
  };

  // ========= PRIVATE HELPERS =========

  _handleDocumentClick = (event) => {
    const root = this._getRootSkinPart();
    const isDescendant = events.targetIsDescendant(event, ReactDOM.findDOMNode(root));
    if (this.state.isOpen && !isDescendant) {
      this.setState({ isOpen: false });
    }
  };

  _getDocumentEvents () {
    return {
      click: this._handleDocumentClick,
      touchend: this._handleDocumentClick,
    };
  }

  _getRootSkinPart () {
    return this.skinParts[DropDown.SKIN_PARTS.ROOT];
  };

  _getInputSkinPart () {
    return this.skinParts[DropDown.SKIN_PARTS.INPUT];
  }

}
