import React, { Component } from 'react';
import PropTypes from 'prop-types';

// import the Input component's constant theme API
import { textAreaThemeAPI } from '../themes/API/textArea.js';

// import the composeTheme utility function
import composeTheme from '../utils/composeTheme.js';

export default class TextArea extends Component {
  static propTypes = {
    value: PropTypes.string,
    placeholder: PropTypes.string,
    maxLength: PropTypes.number,
    autoResize: PropTypes.bool,
    autoFocus: PropTypes.bool,
    rows: PropTypes.number,
    onFocus: PropTypes.func,
    onChange: PropTypes.func,
    onBlur: PropTypes.func,
    skin: PropTypes.func.isRequired,
    theme: PropTypes.object,
    themeOverrides: PropTypes.object,
    themeAPI: PropTypes.object
  };

  static defaultProps = {
    value: '',
    autoFocus: false,
    autoResize: true,
    theme: {}, // theme will now be passed along via the ThemeProvider
    themeOverrides: {}, // custom css/scss from user that adheres to React Polymorph theme API
    themeAPI: { ...textAreaThemeAPI }
  };

  componentDidMount() {
    if (this.props.autoResize) {
      window.addEventListener('resize', this._handleAutoresize);
      this._handleAutoresize();
    }

    if (this.props.autoFocus) {
      this._focus();
    }
  }

  componentDidUpdate() {
    if (this.props.autoResize) this._handleAutoresize();
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.autoResize && nextProps.autoResize) {
      window.addEventListener('resize', this._handleAutoresize);
    } else if (this.props.autoResize && !nextProps.autoResize) {
      window.removeEventListener('resize', this._handleAutoresize);
    }
  }

  componentWillUnmount() {
    if (this.props.autoResize) {
      window.removeEventListener('resize', this._handleAutoresize);
    }
  }

  _focus = () => this.textareaElement.focus();

  _handleAutoresize = () => {
    const { textareaElement } = this;

    if (!textareaElement) return;

    // compute the height difference between inner height and outer height
    const style = getComputedStyle(textareaElement, null);
    const heightOffset =
      style.boxSizing === 'content-box'
        ? -(parseFloat(style.paddingTop) + parseFloat(style.paddingBottom))
        : parseFloat(style.borderTopWidth) +
          parseFloat(style.borderBottomWidth);

    // resize the input to its content size
    textareaElement.style.height = 'auto';
    textareaElement.style.height = `${textareaElement.scrollHeight +
      heightOffset}px`;
  };

  render() {
    // destructuring the props here ensures that variable names
    // do not overwrite each other, only pass on the "...rest" of the props

    const {
      skin: TextAreaSkin,
      theme,
      themeOverrides,
      themeAPI,
      ...rest
    } = this.props;

    const composedTheme = composeTheme(theme, themeOverrides, themeAPI);

    return (
      <TextAreaSkin
        textareaRef={el => (this.textareaElement = el)}
        theme={composedTheme}
        {...rest}
      />
    );
  }
}
