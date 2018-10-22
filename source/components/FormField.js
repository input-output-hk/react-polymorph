// @flow
import React, { Component } from 'react';
import type { ComponentType, Element } from 'react';

// internal components
import { withTheme } from './HOC/withTheme';

// internal utility functions
import { composeTheme, addThemeId, didThemePropsChange } from '../utils/themes';

// import constants
import { IDENTIFIERS } from '../themes/API';

type Props = {
  className: string,
  context: {
    theme: Object,
    ROOT_THEME_API: Object
  },
  disabled: boolean,
  error: string,
  inputRef: Object,
  label: string | Element<any>,
  render: Function,
  skin: ComponentType<any>,
  theme: Object, // will take precedence over theme in context if passed
  themeId: string,
  themeOverrides: Object
};

type State = {
  error: string,
  composedTheme: Object
};

class FormFieldBase extends Component<Props, State> {
  // define static properties
  static displayName = 'FormField';
  static defaultProps = {
    disabled: false,
    theme: null,
    themeId: IDENTIFIERS.FORM_FIELD,
    themeOverrides: {}
  };

  constructor(props: Props) {
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

  componentWillReceiveProps(nextProps: Props) {
    didThemePropsChange(this.props, nextProps, this.setState.bind(this));
  }

  setError = (error: string) => this.setState({ error });

  focusChild = () => {
    const { inputRef } = this.props;
    if (!inputRef.current) return;
    inputRef.current.focus();
  };

  render() {
    // destructuring props ensures only the "...rest" get passed down
    const {
      skin: FormFieldSkin,
      theme,
      themeOverrides,
      error,
      context,
      inputRef,
      ...rest
    } = this.props;

    return (
      <FormFieldSkin
        error={error || this.state.error}
        setError={this.setError}
        theme={this.state.composedTheme}
        focusChild={this.focusChild}
        {...rest}
      />
    );
  }
}

export const FormField = withTheme(FormFieldBase);
