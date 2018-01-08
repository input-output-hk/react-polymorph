import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { isString, flow } from 'lodash';

// import the composeTheme utility function
import composeTheme from '../utils/composeTheme.js';

// import the Input component's theme API
import { inputThemeAPI } from '../themes/API/input.js';

export default class Input extends Component {
  static propTypes = {
    autoFocus: PropTypes.bool,
    onChange: PropTypes.func,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
    value: PropTypes.string,
    placeholder: PropTypes.string,
    maxLength: PropTypes.number,
    onKeyPress: PropTypes.func,
    readOnly: PropTypes.bool,
    skin: PropTypes.func.isRequired,
    theme: PropTypes.object,
    themeOverrides: PropTypes.object,
    themeAPI: PropTypes.object
  };

  static defaultProps = {
    autoFocus: false,
    value: '',
    theme: {},
    themeOverrides: {}, // custom css/scss from user that adheres to React Polymorph theme API
    themeAPI: { ...inputThemeAPI }
  };

  componentDidMount() {
    if (this.props.autoFocus) {
      this._focus();
    }
  }

  onChange = event => {
    const { onChange, disabled } = this.props;
    if (disabled) return;
    if (onChange) onChange(this._processValue(event.target.value), event);
  };

  _focus = () => this.inputElement.focus();

  _processValue(value) {
    return flow([this._enforceStringValue, this._enforceMaxLength]).call(
      this,
      value
    );
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

  render() {
    // destructuring the props here ensures that variable names
    // do not overwrite each other, only pass on the "...rest" of the props

    const {
      skin: InputSkin,
      theme,
      themeOverrides,
      themeAPI,
      ...rest
    } = this.props;

    const composedTheme = composeTheme(theme, themeOverrides, themeAPI);

    return (
      <InputSkin
        inputRef={el => (this.inputElement = el)}
        theme={composedTheme}
        {...rest}
      />
    );
  }
}
