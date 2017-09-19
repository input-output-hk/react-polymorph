import React from 'react';
import PropTypes from 'prop-types';
import SkinnableComponent from './SkinnableComponent';
import { LabelProp } from "../utils/props";

export default class Checkbox extends SkinnableComponent {
  static propTypes = Object.assign({}, SkinnableComponent.propTypes, {
    checked: PropTypes.bool,
    label: LabelProp,
    onChange: PropTypes.func,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
  });

  static defaultProps = {
    checked: false,
    disabled: false,
  };
}
