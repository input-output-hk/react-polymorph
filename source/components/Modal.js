import React from 'react';
import PropTypes from 'prop-types';
import SkinnableComponent from './SkinnableComponent';

export default class Modal extends SkinnableComponent {
  static propTypes = Object.assign({}, SkinnableComponent.propTypes, {
    isActive: PropTypes.bool,
    contentLabel: PropTypes.string,
    onClose: PropTypes.func,
    triggerCloseOnOverlayClick: PropTypes.bool
  });

  static defaultProps = {
    isActive: false,
    contentLabel: "Modal Dialog",
    triggerCloseOnOverlayClick: true,
  };
}
