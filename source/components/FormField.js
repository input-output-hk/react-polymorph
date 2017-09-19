import React from 'react';
import PropTypes from 'prop-types';
import SkinnableComponent from './SkinnableComponent';
import { LabelProp } from "../utils/props";

export default class FormField extends SkinnableComponent {

  static propTypes = Object.assign({}, SkinnableComponent.propTypes, {
    skin: PropTypes.element.isRequired,
    label: LabelProp,
    onChange: PropTypes.func,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
    disabled: PropTypes.bool,
    error: PropTypes.string,
  });

  static defaultProps = {
    disabled: false,
  };

}
