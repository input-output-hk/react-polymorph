import React, { Component } from 'react';
import PropTypes from 'prop-types';

// import utility functions
import { StringOrElement } from '../utils/props.js';
import composeTheme from '../utils/composeTheme.js';

// import the FormField component's theme API
import { formFieldThemeAPI } from '../themes/API/formField.js';

export default class FormField extends Component {
  state = { error: '' };

  static propTypes = {
    render: PropTypes.func.isRequired,
    skin: PropTypes.func.isRequired,
    label: StringOrElement,
    disabled: PropTypes.bool,
    error: StringOrElement,
    theme: PropTypes.object,
    themeOverrides: PropTypes.object,
    themeAPI: PropTypes.object
  };

  static defaultProps = {
    disabled: false,
    theme: {},
    themeOverrides: {}, // custom css/scss from user that adheres to React Polymorph theme API
    themeAPI: { ...formFieldThemeAPI }
  };

  _setError = error => this.setState({ error });

  render() {
    // destructuring the props here ensures that variable names
    // do not overwrite each other, only pass on the "...rest" of the props

    const {
      skin: FormFieldSkin,
      theme,
      themeOverrides,
      themeAPI,
      error,
      ...rest
    } = this.props;

    const composedTheme = composeTheme(theme, themeOverrides, themeAPI);

    return (
      <FormFieldSkin
        error={error || this.state.error}
        setError={this._setError}
        theme={composedTheme}
        {...rest}
      />
    );
  }
}
