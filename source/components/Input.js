import React, { Component } from 'react';
import { bool, func, object, number, string } from 'prop-types';

// external libraries
import { isString, flow } from 'lodash';

// Input's theme API
import { INPUT_THEME_API } from '../themes/API';

// internal utility functions
import composeTheme from '../utils/composeTheme.js';
import { StringOrElement } from '../utils/props';

class Input extends Component {
  static propTypes = {
    onRef: func,
    autoFocus: bool,
    error: StringOrElement,
    onChange: func,
    onFocus: func,
    onBlur: func,
    value: string,
    placeholder: string,
    maxLength: number,
    minLength: number,
    onKeyPress: func,
    readOnly: bool,
    skin: func.isRequired,
    theme: object,
    themeOverrides: object,
    themeAPI: object
  };

  static defaultProps = {
    onRef: () => {},
    autoFocus: false,
    error: '',
    readOnly: false,
    value: '',
    theme: {},
    themeOverrides: {}, // custom css/scss from user that adheres to React Polymorph theme API
    themeAPI: { ...INPUT_THEME_API }
  };

  static contextTypes = {
    theme: object
  };

  constructor(props, context) {
    super(props);

    const { themeOverrides, themeAPI } = props;

    const theme =
      context && context.theme && context.theme.input
        ? context.theme.input
        : props.theme;

    // if themeOverrides isn't provided, composeTheme returns theme immediately
    this.state = {
      error: '',
      composedTheme: composeTheme(theme, themeOverrides, themeAPI)
    };
  }

  componentDidMount() {
    const { onRef, autoFocus } = this.props;

    if (autoFocus) this.focus();

    // if Input is rendered by FormField, onRef allows FormField to call
    // Input's focus method when someone clicks on FormField's label
    onRef(this);
  }

  onChange = event => {
    const { onChange, disabled } = this.props;
    if (disabled) return;

    if (onChange) onChange(this._processValue(event.target.value), event);
  };

  _setError = error => {
    const { setError } = this.props;

    // checks for setError func from FormField component
    // if this Input instance is being used within the render function
    // of a FormField instance, the error field within FormField's local state
    // will be set
    if (setError) setError(error);
    this.setState({ error });
  };

  focus = () => this.inputElement.focus();

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

  render() {
    // destructuring the props here ensures that variable names
    // do not overwrite each other, only pass on the "...rest" of the props

    const {
      skin: InputSkin,
      theme,
      themeOverrides,
      themeAPI,
      onChange,
      error,
      ...rest
    } = this.props;

    return (
      <InputSkin
        error={error || this.state.error}
        onChange={this.onChange}
        inputRef={el => (this.inputElement = el)}
        theme={this.state.composedTheme}
        {...rest}
      />
    );
  }
}

export default Input;
