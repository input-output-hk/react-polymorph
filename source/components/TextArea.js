import React, { Component } from 'react';
import { bool, func, object, string, number } from 'prop-types';

// external libraries
import { isString, flow } from 'lodash';

// import the Input component's constant theme API
import { TEXTAREA_THEME_API } from '../themes/API';

// import utility functions
import { StringOrElement, composeTheme } from '../utils';

class TextArea extends Component {
  static propTypes = {
    onRef: func,
    autoFocus: bool,
    value: string,
    error: StringOrElement,
    placeholder: string,
    maxLength: number,
    minLength: number,
    autoResize: bool,
    rows: number,
    onFocus: func,
    onChange: func,
    onBlur: func,
    skin: func.isRequired,
    theme: object,
    themeOverrides: object,
    themeAPI: object
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

  static contextTypes = {
    theme: object
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
    // destructuring props ensures only the "...rest" get passed down
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

export default TextArea;
