import React from 'react';
import PropTypes from 'prop-types';
import SkinnableComponent from './SkinnableComponent';

export default class Bubble extends SkinnableComponent {

  static SKIN_PARTS = {
    ROOT: 'root',
    BUBBLE: 'bubble',
  };

  static propTypes = Object.assign({}, SkinnableComponent.propTypes, {
    isOpeningUpwards: PropTypes.bool,
    isTransparent: PropTypes.bool,
  });

  static defaultProps = {
    isTransparent: true,
  };

}
