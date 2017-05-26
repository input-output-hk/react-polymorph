import React from 'react';
import PropTypes from 'prop-types';
import { isFunction, isString, flow, pick } from 'lodash';
import Input from './Input';
import FormField from './FormField';

export default class NumericInput extends FormField {

  constructor(props) {
    super(props);
    this.state = {
      caretPosition: 0,
      separatorsCounter: 0,
      error: null,
      oldValue: null,
    }
  }

  static SKIN_PARTS = {
    INPUT: Input.SKIN_PARTS.INPUT,
  };

  static propTypes = Object.assign({}, FormField.propTypes, {
    error: PropTypes.string,
    value: PropTypes.string,
    placeholder: PropTypes.string,
    maxLength: PropTypes.number,
    maxBeforeDot: PropTypes.number,
    maxAfterDot: PropTypes.number,
    maxValue: PropTypes.number,
    rightLabel: PropTypes.string,
  });

  static defaultProps = {
    value: '',
    error: '',
    rightLabel: '',
  };

  static metaProps = FormField.metaProps.concat(['rightLabel', 'maxBeforeDot', 'maxAfterDot', 'maxValue']);

  // ========= COMPONENT LIFE CYCLE =========

  componentDidUpdate (prevProps, prevState) {
    const input = this.skinParts[NumericInput.SKIN_PARTS.INPUT];

    let caretPosition;
    if (this.state.separatorsCounter != prevState.separatorsCounter
      && (this.state.separatorsCounter - prevState.separatorsCounter) <= 1
      && (this.state.separatorsCounter - prevState.separatorsCounter) >= -1) {
      caretPosition = this.state.caretPosition + (this.state.separatorsCounter - prevState.separatorsCounter);
    } else {
      caretPosition = this.state.caretPosition;
    }

    input.selectionEnd = caretPosition;
    input.selectionStart = caretPosition;
  }

  onChange = (event) => {
    const { onChange, disabled } = this.props;
    if (disabled) return;
    if (onChange) onChange(this._processValue(event.target.value, event.target.selectionStart, {}), event);
  };

  prepareSkinProps(props) {
    return Object.assign({}, super.prepareSkinProps(props), {
      onChange: this.onChange,
      error: this.props.error || this.state.error,
    });
  }

  focus = () => this.skinParts[NumericInput.SKIN_PARTS.INPUT].focus();

  blur = () => this.skinParts[NumericInput.SKIN_PARTS.INPUT].blur();

  _processValue(value, position) {
    return flow([
      this._enforceNumericValue,
      this._parseToParts,
      this._enforceMaxLengths,
      this._separate
    ]).call(this, value, position);
  }

  _enforceNumericValue(value, position) {
    const regex = /^[0-9.,]+$/;
    let isValueRegular = regex.test(value);
    let handledValue;

    if (!isValueRegular && value !== '') {
      // input contains invalid value
      // e.g. 1,00AAbasdasd.asdasd123123
      // - reject it and show last valid value
      handledValue = this.state.oldValue;
      position = position - 1;
    } else if (!this._isNumeric(value)) {
      // input contains comma separated number
      // e.g. 1,000,000.123456
      // - make sure commas and caret are at correct position
      const splitedValue = value.split('.');
      if (splitedValue.length === 3) {
        // input value contains more than one dot
        handledValue = splitedValue[0] + '.' + splitedValue[1] + splitedValue[2];
      } else if (splitedValue.length === 2 && splitedValue[0] === '' && splitedValue[1] === '') {
        // special case when dot is inserted in an empty input
        // - return 0.|00000
        handledValue = '0.000000';
        position = 2; // position caret after the dot
      } else if (value !== '') {
        // special case when user selects part of an input value and hits ',' key
        // - reject it and show last valid value
        handledValue = this.state.oldValue;
      }
    }

    const lastInsertedCharacter = value.substring(position - 1, position);
    if (lastInsertedCharacter === ',') {
      // prevent comma within the decimal part
      value = this.state.oldValue;
      position = position - 1;
    }

    return !this._isNumeric(value) ? {value: handledValue, position} : {value, position: position};
  }

  _parseToParts(data) {
    const value = data.value;
    let position = data.position;

    // show placeholder on select all and delete/backspace key action
    if (!value) return;

    let beforeDot, afterDot;
    if (data.value.length > 1 && value.split('.').length < 2) {
      // handle numbers deletion from both integer and decimal parts at once
      beforeDot = value.substring(0, position) || '0';
      afterDot =  value.substring(position, value.length);
    } else {
      // split float number to integer and decimal part - regular way
      const splitedValue = value.split('.');
      beforeDot = splitedValue[0] ? splitedValue[0] : '0';
      afterDot = splitedValue[1] ? splitedValue[1] : '000000';
    }

    // remove leading zero and update caret position
    if (value.charAt(0) === '0' && beforeDot > 0) {
      beforeDot = beforeDot.replace(/^0+/, '');
      if (position !== 2) {
        position = 0;
      } else {
        position = 1;
      }
    }

    return {value, position, parts: {beforeDot, afterDot}}
  }

  _enforceMaxLengths(data) {
    if (!data) return;

    const {maxBeforeDot, maxAfterDot, maxValue} = this.props;
    const value = data.value;
    let position = data.position;
    let beforeDot = data.parts.beforeDot;
    let afterDot = data.parts.afterDot;

    // preventing numbers with more than maxBeforeDot units
    // - return first maxBeforeDot numbers (with comma separators)
    if (maxBeforeDot && beforeDot && beforeDot.length > maxBeforeDot) {
      beforeDot = beforeDot.substring(0, maxBeforeDot);
    }

    // remove commas from decimal part (e.g. 123,23,2.002000 -> dot after 2.character reproduce 12.3,23,2)
    afterDot = afterDot.replace(/,/g, '');
    // preventing numbers with more than maxAfterDot units - return first maxAfterDot numbers
    if (maxAfterDot && afterDot && afterDot.length > maxAfterDot) {
      afterDot = afterDot.substring(0, maxAfterDot);
    }

    // if decimal number has less than maxAfterDot numbers add trailing zeros
    let afterDotLength = afterDot ? afterDot.length : 0;
    if (maxAfterDot && afterDotLength < maxAfterDot) {
      let i;
      for (afterDotLength; afterDotLength < maxAfterDot; afterDotLength++) {
        afterDot = afterDot + '0';
      }
    }

    const result = beforeDot + '.' + afterDot;

    // check max value
    const flatNumber = result.replace(/,/g, '').replace('.', '');
    if (maxValue && flatNumber > maxValue || flatNumber < 1) {
      this.setState({error: 'Please enter a valid amount'});
    } else if (this.state.error !== '') {
      this.setState({error: null});
    }

    this.setState({caretPosition: position});
    return result;
  }

  _separate(value, position) {
    this.setState({oldValue: value});
    if (value) {
      const splitedValue = value.split('.');
      const separatedValue = splitedValue[0].replace(/,/g, '').split('').reverse().join('')
                    .replace(/(\d{3}\B)/g, '$1,')
                    .split('').reverse().join('');
      this.setState({separatorsCounter: (separatedValue.match(/,/g) || []).length});
      return separatedValue + '.' + splitedValue[1];
    }
  }

  _isNumeric(value) {
    const replacedValue = value.replace(/,/g, '');
    return !isNaN(parseFloat(replacedValue)) && isFinite(replacedValue);
  }
}
