import React from 'react';
import PropTypes from 'prop-types';
import { isFunction, isString, flow, pick } from 'lodash';
import FormField from './FormField';

export default class Input extends FormField {

  static SKIN_PARTS = {
    INPUT: 'input'
  };

  static propTypes = Object.assign({}, FormField.propTypes, {
    value: PropTypes.string,
    placeholder: PropTypes.string,
    maxLength: PropTypes.number,
    onKeyPress: PropTypes.func,
    readOnly: PropTypes.bool,
  });

  static defaultProps = Object.assign({}, FormField.defaultProps, {
    value: '',
  });

  static metaProps = FormField.metaProps;

  onChange = (event) => {
    const { onChange, disabled } = this.props;
    if (disabled) return;
    if(onChange) onChange(this._processValue(event.target.value), event);
  };

  prepareSkinProps(props) {
    return Object.assign({}, super.prepareSkinProps(props), {
      onChange: this.onChange,
    });
  }

  focus = () => this.skinParts[Input.SKIN_PARTS.INPUT].focus();

  blur = () => this.skinParts[Input.SKIN_PARTS.INPUT].blur();

  _processValue(value) {
    return flow([
      this._enforceStringValue,
      this._enforceMaxLength
    ]).call(this, value);
  }

  _enforceStringValue(value) {
    if (!isString(value)) throw "Values passed to Input::onChange must be strings";
    return value;
  }

  _enforceMaxLength(value) {
    const { maxLength } = this.props;
    const isTooLong = maxLength != null && value.length > maxLength;
    return isTooLong ? value.substring(0, maxLength) : value;
  }
}
