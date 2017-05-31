import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class SkinnableComponent extends Component {

  static propTypes = {
    skin: PropTypes.element.isRequired,
  };

  skinParts = {};

  registerSkinPart = (id, element) => this.skinParts[id] = element;

  prepareSkinProps(props) {
    return Object.assign({}, props, { component: this });
  }

  render() {
    return React.cloneElement(this.props.skin, this.prepareSkinProps(this.props));
  }

}
