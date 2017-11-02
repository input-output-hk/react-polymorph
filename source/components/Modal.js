import React from 'react';
import PropTypes from 'prop-types';
import SkinnableComponent from './SkinnableComponent';
import { StringOrElement } from '../utils/props';

export default class Modal extends SkinnableComponent {

  static propTypes = Object.assign({}, SkinnableComponent.propTypes, {
    isActive: PropTypes.bool,
    contentLabel: StringOrElement,
    onClose: PropTypes.func,
    triggerCloseOnOverlayClick: PropTypes.bool
  });

  static defaultProps = {
    isActive: false,
    contentLabel: 'Modal Dialog',
    triggerCloseOnOverlayClick: true,
  };

}
