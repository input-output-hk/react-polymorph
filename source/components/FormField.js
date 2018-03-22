import React, { Component } from 'react';
import { string, bool, func, object } from 'prop-types';

// FormField's theme API
import THEME_API, { IDENTIFIERS } from '../themes/API';

// import utility functions
import { StringOrElement, composeTheme } from '../utils';

class FormField extends Component {
  static propTypes = {
    disabled: bool,
    error: StringOrElement,
    label: StringOrElement,
    render: func.isRequired,
    skin: func.isRequired,
    theme: object,
    themeId: string,
    themeOverrides: object // custom css/scss from user that adheres to component's theme API
  };

  static defaultProps = {
    disabled: false,
    theme: null,
    themeId: IDENTIFIERS.FORM_FIELD,
    themeOverrides: {}
  };

  static contextTypes = {
    theme: object
  };

  constructor(props, context) {
    super(props);

    const theme = props.theme && props.theme[props.themeId] ? props.theme : null;

    this.state = {
      error: '',
      composedTheme: composeTheme(theme || context.theme, props.themeOverrides, THEME_API),
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
    // destructuring props ensures only the "...rest" get passed down
    const {
      skin: FormFieldSkin,
      theme,
      themeOverrides,
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

export default FormField;
