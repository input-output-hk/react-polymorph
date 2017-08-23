import React from 'react';
import PropTypes from 'prop-types';
import SkinnableComponent from './SkinnableComponent';

export default class Toggler extends SkinnableComponent {
  static propTypes = Object.assign({}, SkinnableComponent.propTypes, {
    checked: PropTypes.bool,
    labelLeft: PropTypes.string,
    labelRight: PropTypes.string,
    onChange: PropTypes.func,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
  });

  static defaultProps = {
    checked: false,
    disabled: false,
  };
}
