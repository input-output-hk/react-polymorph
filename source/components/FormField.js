import React, { Component } from 'react';
import PropTypes from 'prop-types';

// import utility functions
import { StringOrElement } from '../utils/props.js';
import composeTheme from '../utils/composeTheme.js';

// import the FormField component's theme API
import { FORMFIELD_THEME_API } from '../themes/API';

class FormField extends Component {
  static propTypes = {
    label: StringOrElement,
    disabled: PropTypes.bool,
    error: StringOrElement,
    render: PropTypes.func.isRequired,
    skin: PropTypes.func.isRequired,
    theme: PropTypes.object,
    themeOverrides: PropTypes.object,
    themeAPI: PropTypes.object
  };

  static defaultProps = {
    disabled: false,
    theme: {},
    themeOverrides: {}, // custom css/scss from user that adheres to React Polymorph theme API
    themeAPI: { ...FORMFIELD_THEME_API }
  };

  constructor(props, context) {
    super(props);

    const { themeOverrides, themeAPI } = props;

    const theme =
      context && context.theme && context.theme.formfield
        ? context.theme.formfield
        : props.theme;

    // if themeOverrides isn't provided, composeTheme returns theme immediately
    this.state = {
      error: '',
      composedTheme: composeTheme(theme, themeOverrides, themeAPI)
    };
  }

  setError = error => this.setState({ error });

  focusChild = () => {
    if (this.child && this.child.focus !== undefined) {
      this.child.focus();
    }
  };

  onRef = ref => (this.child = ref);

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

    return (
      <FormFieldSkin
        error={error || this.state.error}
        setError={this.setError}
        theme={this.state.composedTheme}
        focusChild={this.focusChild}
        onRef={this.onRef}
        {...rest}
      />
    );
  }
}

FormField.contextTypes = {
  theme: PropTypes.object
};

export default FormField;
