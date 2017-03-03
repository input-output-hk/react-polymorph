import React, { PropTypes } from 'react';
import { isFunction, isString, flow, pick } from 'lodash';
import Input from './Input';

export default class TextArea extends Input {

  static propTypes = Object.assign({}, Input.propTypes, {
    autoResize: PropTypes.bool,
    rows: PropTypes.number,
  });

  static defaultProps = Object.assign({}, Input.defaultProps, {
    autoResize: true,
  });

  componentDidMount () {
    if (this.props.autoResize) {
      window.addEventListener('resize', this._handleAutoresize);
      this._handleAutoresize();
    }
  }

  componentDidUpdate () {
    if (this.props.autoResize) this._handleAutoresize();
  }

  componentWillReceiveProps (nextProps) {
    if (!this.props.autoResize && nextProps.autoResize) {
      window.addEventListener('resize', this._handleAutoresize);
    } else if (this.props.autoResize && !nextProps.autoResize) {
      window.removeEventListener('resize', this._handleAutoresize);
    }
  }

  componentWillUnmount () {
    if (this.props.autoResize) {
      window.removeEventListener('resize', this._handleAutoresize);
    }
  }

  registerSkinInputElement(element) {
    super.registerSkinInputElement(element);
    this._handleAutoresize();
  }

  _handleAutoresize = () => {
    const element = this.skinInputElement;
    if (!element) return;

    // compute the height difference between inner height and outer height
    const style = getComputedStyle(element, null);
    const heightOffset = style.boxSizing === 'content-box'
      ? -(parseFloat(style.paddingTop) + parseFloat(style.paddingBottom))
      : parseFloat(style.borderTopWidth) + parseFloat(style.borderBottomWidth);

    // resize the input to its content size
    element.style.height = 'auto';
    element.style.height = `${element.scrollHeight + heightOffset}px`;
  };

}
