import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { isString, flow } from 'lodash';

// import utility functions
import composeTheme from '../utils/composeTheme.js';
import { StringOrElement } from '../utils/props';

// import the Input component's constant theme API
import { TEXTAREA_THEME_API } from '../themes/API';

class TextArea extends Component {
  static propTypes = {
    onRef: PropTypes.func,
    autoFocus: PropTypes.bool,
    value: PropTypes.string,
    error: StringOrElement,
    placeholder: PropTypes.string,
    maxLength: PropTypes.number,
    minLength: PropTypes.number,
    autoResize: PropTypes.bool,
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
    onRef: () => {},
    value: '',
    autoFocus: false,
    autoResize: true,
    theme: {}, // theme will now be passed along via the ThemeProvider
    themeOverrides: {}, // custom css/scss from user that adheres to React Polymorph theme API
    themeAPI: { ...TEXTAREA_THEME_API }
  };

  constructor(props, context) {
    super(props);

    const { themeOverrides, themeAPI } = props;

    const theme =
      context && context.theme && context.theme.textarea
        ? context.theme.textarea
        : props.theme;

    // if themeOverrides isn't provided, composeTheme returns theme immediately
    this.state = {
      error: '',
      composedTheme: composeTheme(theme, themeOverrides, themeAPI)
    };
  }

  componentDidMount() {
    const { autoResize, autoFocus, onRef } = this.props;

    if (autoResize) {
      window.addEventListener('resize', this._handleAutoresize);
      this._handleAutoresize();
    }

    if (autoFocus) {
      this.focus();
    }

    // if TextArea is rendered by FormField, onRef allows FormField to call
    // TextArea's focus method when someone clicks on FormField's label
    onRef(this);
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.autoResize && nextProps.autoResize) {
      window.addEventListener('resize', this._handleAutoresize);
    } else if (this.props.autoResize && !nextProps.autoResize) {
      window.removeEventListener('resize', this._handleAutoresize);
    }
  }

  componentDidUpdate() {
    if (this.props.autoResize) this._handleAutoresize();
  }

  componentWillUnmount() {
    if (this.props.autoResize) {
      window.removeEventListener('resize', this._handleAutoresize);
    }
  }

  focus = () => this.textareaElement.focus();

  onChange = event => {
    const { onChange, disabled } = this.props;
    if (disabled) return;

    if (onChange) onChange(this._processValue(event.target.value), event);
  };

  _setError = error => this.setState({ error });

  _processValue(value) {
    return flow([
      this._enforceStringValue,
      this._enforceMaxLength,
      this._enforceMinLength
    ]).call(this, value);
  }

  _enforceStringValue(value) {
    if (!isString(value))
      throw 'Values passed to Input::onChange must be strings';
    return value;
  }

  _enforceMaxLength(value) {
    const { maxLength } = this.props;
    const isTooLong = maxLength != null && value.length > maxLength;
    return isTooLong ? value.substring(0, maxLength) : value;
  }

  _enforceMinLength = value => {
    const { minLength } = this.props;
    const isTooShort = minLength != null && value.length < minLength;

    if (isTooShort) {
      this._setError(`Please enter a valid input`);
    } else if (this.state.error !== '') {
      this._setError(null);
    }

    return value;
  };

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
      onChange,
      error,
      ...rest
    } = this.props;

    return (
      <TextAreaSkin
        error={error || this.state.error}
        onChange={this.onChange}
        textareaRef={el => (this.textareaElement = el)}
        theme={this.state.composedTheme}
        {...rest}
      />
    );
  }
}

TextArea.contextTypes = {
  theme: PropTypes.object
};

export default TextArea;
