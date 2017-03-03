import React, { PropTypes } from 'react';
import { isFunction, isString, flow, pick } from 'lodash';
import FormField from './FormField';

export default class Input extends FormField {

  static propTypes = Object.assign({}, FormField.propTypes, {
    maxLength: PropTypes.number,
    onKeyPress: PropTypes.func,
  });

  static defaultProps = {
    value: '',
  };

  _processValue(value) {
    return flow([
      this._enforceStringValue,
      this._enforceMaxLength
    ]).call(this, super._processValue(value));
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
