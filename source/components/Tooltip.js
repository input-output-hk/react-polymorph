import React from 'react';
import PropTypes from 'prop-types';
import SkinnableComponent from './SkinnableComponent';
import {StringOrElement} from '../utils/props';

export default class Tooltip extends SkinnableComponent {

  static propTypes = Object.assign({}, SkinnableComponent.propTypes, {
    isAligningRight: PropTypes.bool,
    isOpeningUpwards: PropTypes.bool,
    isBounded: PropTypes.bool,
    tip: StringOrElement,
  });

  static defaultProps = {
    isOpeningUpward: true,
  };

}
