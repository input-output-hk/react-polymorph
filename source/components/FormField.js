<<<<<<< HEAD
import React, { Component } from 'react';
import { string, bool, func, object, shape } from 'prop-types';
import { withTheme } from '../themes/withTheme';
=======
// @flow
import React, { Component } from "react";
import { string, bool, func, object, shape } from "prop-types";
import { withTheme } from "../themes/withTheme";
>>>>>>> [DDW-112] Adds flow and eslint declarations for FormField.js. Fixes eslint errors.

// import utility functions
import { StringOrElement, composeTheme, addThemeId } from '../utils';

// import constants
import { IDENTIFIERS } from '../themes/API';

type Props = {
  context: {
    theme: Object,
    ROOT_THEME_API: Object
  },
  disabled: boolean,
  error: string | Element,
  label: string | Element,
  render: Function,
  skin: Function,
  theme: Object,
  themeId: string,
  themeOverrides: Object
};

type State = {
  error: string,
  composedTheme: Object
};

class FormField extends Component<Props, State> {
  child: HTMLInputElement;

  static propTypes = {
    context: shape({
      theme: object,
      ROOT_THEME_API: object
    }),
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

  constructor(props) {
    super(props);

    const { context, themeId, theme, themeOverrides } = props;

    this.state = {
      error: '',
      composedTheme: composeTheme(
        addThemeId(theme || context.theme, themeId),
        addThemeId(themeOverrides, themeId),
        context.ROOT_THEME_API
      )
    };
  }

  setError = (error: string) => this.setState({ error });

  focusChild = () => {
    if (this.child && this.child.focus !== undefined) {
      this.child.focus();
    }
  };

  onRef = (ref: HTMLInputElement) => (this.child = ref);

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

export default withTheme(FormField);
