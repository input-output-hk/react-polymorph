import React, { Component, PropTypes } from 'react';
import { isFunction, isString, flow, pick } from 'lodash';

import SkinnableComponent from './SkinnableComponent';

export default class Button extends SkinnableComponent {

  static propTypes = Object.assign({}, SkinnableComponent.propTypes, {
    // disabled: PropTypes.bool,
    // onClick: PropTypes.func,
  });

  // static defaultProps = {
  //   disabled: false,
  // };

  // onClick = (event) => {
  //   const { onClick, disabled } = this.props;
  //
  //   if (onClick && !disabled) {
  //     onClick(event);
  //   }
  // }
}
