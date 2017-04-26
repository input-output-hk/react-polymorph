import React, { PropTypes } from 'react';
import SkinnableComponent from './SkinnableComponent';

const registerSkinElementError = `You have to register the skin
element by calling the props.registerSkinElement(element)`;

export default class FormField extends SkinnableComponent {

  static propTypes = Object.assign({}, SkinnableComponent.propTypes, {
    skin: PropTypes.element.isRequired,
    label: PropTypes.string,
    onChange: PropTypes.func,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
    disabled: PropTypes.bool,
    error: PropTypes.string,
  });

  static defaultProps = {
    disabled: false,
  };

  focus = () => {
    if (!this.skinElement) throw new Error(registerSkinElementError);
    this.skinElement && this.skinElement.focus();
  };

  blur = () => {
    if (!this.skinElement) throw new Error(registerSkinElementError);
    this.skinElement && this.skinElement.blur();
  };

}
