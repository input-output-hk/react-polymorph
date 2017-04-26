import React, { Component, PropTypes } from 'react';

export default class SkinnableComponent extends Component {

  static propTypes = {
    skin: PropTypes.element.isRequired,
  };

  skinElement = null;

  registerSkinElement = (element) => this.skinElement = element;

  prepareSkinProps(props) {
    return Object.assign({}, props, { registerSkinElement: this.registerSkinElement });
  }

  render() {
    return React.cloneElement(this.props.skin, this.prepareSkinProps(this.props));
  }

}
