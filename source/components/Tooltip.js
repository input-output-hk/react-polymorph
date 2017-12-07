import React from 'react';
import PropTypes from 'prop-types';
import SkinnableComponent from './SkinnableComponent';

export default class Tooltip extends SkinnableComponent {

  static propTypes = Object.assign({}, SkinnableComponent.propTypes, {
    isAligningRight: PropTypes.bool,
    isOpeningUpwards: PropTypes.bool,
    isBounded: PropTypes.bool,
    tip: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.element,
    ]),
  });

  static defaultProps = {
    isOpeningUpward: true,
  };

}
