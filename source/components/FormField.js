import React, { Component, PropTypes } from 'react';
import { omit } from 'lodash';

const registerSkinFormElementError = `You have to register the skin form 
element by calling the props.registerSkinFormElement(element)`;

export default class FormField extends Component {

  static propTypes = {
    skin: PropTypes.element.isRequired,
    label: PropTypes.string,
    onChange: PropTypes.func,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
    disabled: PropTypes.bool,
    error: PropTypes.string,
  };

  static defaultProps = {
    disabled: false,
  };

  skinFormElement = null;

  registerSkinFormElement = (input) => this.skinFormElement = input;

  focus = () => {
    if (!this.skinFormElement) throw new Error(registerSkinFormElementError);
    this.skinFormElement && this.skinFormElement.focus();
  };

  blur = () => {
    if (!this.skinFormElement) throw new Error(registerSkinFormElementError);
    this.skinFormElement && this.skinFormElement.blur();
  };

  render() {
    return React.cloneElement(this.props.skin, Object.assign({
      registerSkinFormElement: this.registerSkinFormElement,
    }, this.props));
  }

}
