import React, { PropTypes } from 'react';
import { isFunction, isString, flow, pick } from 'lodash';
import FormField from './FormField';

export default class Input extends FormField {

  static propTypes = Object.assign({}, FormField.propTypes, {
    value: PropTypes.string,
    placeholder: PropTypes.string,
    maxLength: PropTypes.number,
    onKeyPress: PropTypes.func,
  });

  static defaultProps = {
    value: '',
  };

  onChange = (event) => {
    const { onChange, disabled } = this.props;
    if (disabled) return;
    if(onChange) onChange(this._processValue(event.target.value), event);
  };

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
