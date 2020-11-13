// @flow
import React, { Component } from 'react';
import type { ElementRef, ComponentType, Element } from 'react';

// internal utility functions
import { createEmptyContext, withTheme } from './HOC/withTheme';
import { composeTheme, addThemeId, didThemePropsChange } from '../utils/themes';

// import constants
import { IDENTIFIERS } from '.';
import type { ThemeContextProp } from './HOC/withTheme';

export type FormFieldProps = {
  className?: ?string,
  context: ThemeContextProp,
  disabled?: boolean,
  error?: string | Element<any>,
  errorDebounceDelay?: number,
  isErrorHidden?: boolean,
  inputRef?: ElementRef<*>,
  label?: string | Element<any>,
  onChange: Function,
  render: Function,
  skin?: ComponentType<any>,
  theme: ?Object, // will take precedence over theme in context if passed
  themeId: string,
  themeOverrides: Object,
};

type State = {
  error: string,
  composedTheme: Object,
};

class FormFieldBase extends Component<FormFieldProps, State> {
  // define static properties
  static displayName = 'FormField';

  static defaultProps = {
    context: createEmptyContext(),
    errorDebounceDelay: 1000,
    theme: null,
    themeId: IDENTIFIERS.FORM_FIELD,
    themeOverrides: {},
  };

  constructor(props: FormFieldProps) {
    super(props);

    const { context, themeId, theme, themeOverrides } = props;

    this.state = {
      error: '',
      composedTheme: composeTheme(
        addThemeId(theme || context.theme, themeId),
        addThemeId(themeOverrides, themeId),
        context.ROOT_THEME_API
      ),
    };
  }

  componentDidUpdate(prevProps: FormFieldProps) {
    if (prevProps !== this.props) {
      didThemePropsChange(prevProps, this.props, this.setState.bind(this));
    }
  }

  setError = (error: string) => this.setState({ error });

  focusChild = () => {
    const { inputRef } = this.props;
    if (inputRef && inputRef.current) {
      if (typeof inputRef.current.focus === 'function') {
        inputRef.current.focus();
      }
    }
  };

  render() {
    // destructuring props ensures only the "...rest" get passed down
    const { skin, theme, themeOverrides, error, context, ...rest } = this.props;

    const FormFieldSkin = skin || context.skins[IDENTIFIERS.FORM_FIELD];

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
