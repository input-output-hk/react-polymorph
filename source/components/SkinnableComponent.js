import React, { Component, PropTypes } from 'react';

export default class SkinnableComponent extends Component {

  static propTypes = {
    skin: PropTypes.element.isRequired,
  };

  static metaProps = ['skin', 'theme', 'component'];

  skinParts = {};

  registerSkinPart = (id, element) => this.skinParts[id] = element;

  prepareSkinProps(props) {
    return Object.assign({}, props, { component: this });
  }

  render() {
    return React.cloneElement(this.props.skin, this.prepareSkinProps(this.props));
  }

}
