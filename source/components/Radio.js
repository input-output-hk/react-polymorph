import React from 'react';
import PropTypes from 'prop-types';
import SkinnableComponent from './SkinnableComponent';
import { StringOrElement } from '../utils/props';

export default class Radio extends SkinnableComponent {

  static propTypes = Object.assign({}, SkinnableComponent.propTypes, {
    selected: PropTypes.bool,
    label: StringOrElement,
    onChange: PropTypes.func,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
  });

  static defaultProps = {
    checked: false,
    disabled: false,
  };

}
