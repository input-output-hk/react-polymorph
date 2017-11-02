import React from 'react';
import PropTypes from 'prop-types';
import SkinnableComponent from './SkinnableComponent';
import { StringOrElement } from '../utils/props';

export default class FormField extends SkinnableComponent {

  static propTypes = Object.assign({}, SkinnableComponent.propTypes, {
    skin: PropTypes.element.isRequired,
    label: StringOrElement,
    onChange: PropTypes.func,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
    disabled: PropTypes.bool,
    error: StringOrElement,
  });

  static defaultProps = {
    disabled: false,
  };

}
