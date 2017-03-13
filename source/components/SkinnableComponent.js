import React, { Component, PropTypes } from 'react';
import { omit } from 'lodash';

const registerSkinElementError = `You have to register the skin form
element by calling the props.registerSkinElement(element)`;

export default class SkinnableComponent extends Component {

  static propTypes = {
    skin: PropTypes.element.isRequired,
  };

  skinElement = null;

  registerSkinElement = (input) => this.skinElement = input;

  focus = () => {
    if (!this.skinElement) throw new Error(registerSkinElementError);
    this.skinElement && this.skinElement.focus();
  };

  blur = () => {
    if (!this.skinElement) throw new Error(registerSkinElementError);
    this.skinElement && this.skinElement.blur();
  };

  render() {
    return React.cloneElement(this.props.skin, Object.assign({
      registerSkinElement: this.registerSkinElement,
    }, this.props));
  }

}
