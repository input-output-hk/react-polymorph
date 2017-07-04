import React from 'react';
import PropTypes from 'prop-types';
import SkinnableComponent from './SkinnableComponent';

export default class Checkbox extends SkinnableComponent {
  static propTypes = Object.assign({}, SkinnableComponent.propTypes, {
    checked: PropTypes.bool,
    label: PropTypes.string,
    onChange: PropTypes.func,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
  });

  static defaultProps = {
    checked: false,
    disabled: false,
  };
}
