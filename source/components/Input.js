import React, { Component } from 'react';
import { bool, func, object, number, string } from 'prop-types';

// external libraries
import { isString, flow } from 'lodash';

// Input's theme API
import { IDENTIFIERS, INPUT_THEME_API } from '../themes/API';

// internal utility functions
import { StringOrElement, composeTheme, pickTheme } from '../utils';

class Input extends Component {
  static propTypes = {
    autoFocus: bool,
    error: StringOrElement,
    onBlur: func,
    onChange: func,
    onFocus: func,
    onRef: func,
    maxLength: number,
    minLength: number,
    onKeyPress: func,
    placeholder: string,
    readOnly: bool,
    skin: func.isRequired,
    theme: object,
    themeAPI: object,
    themeOverrides: object, // custom css/scss from user that adheres to component's theme API
    value: string
  };

  static defaultProps = {
    autoFocus: false,
    error: '',
    onRef: () => {},
    readOnly: false,
    theme: null,
    themeAPI: { ...INPUT_THEME_API },
    themeOverrides: {},
    value: ''
  };

  static contextTypes = {
    theme: object
  };

  constructor(props, context) {
    super(props);
    const { themeOverrides, themeAPI } = props;
    const theme = pickTheme(IDENTIFIERS.INPUT, props, context);
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
    // destructuring props ensures only the "...rest" get passed down
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
