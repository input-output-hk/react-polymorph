// @flow
import React, { Component } from 'react';
import type { ComponentType, Element } from 'react';
import { withTheme } from '../themes/withTheme';

// import utility functions
import { composeTheme, addThemeId } from '../utils';

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

class FormField extends Component<Props, State> {
  child: Element<'input'>;

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

  setError = (error: string) => this.setState({ error });

  focusChild = () => {
    if (this.child && this.child.focus !== undefined) {
      this.child.focus();
    }
  };

  // onRef is passed to Input/NumericInput components rendered
  // via this.props.render, which makes this.focusChild possible
  onRef = (ref: Element<'input'>) => (this.child = ref);

  render() {
    // destructuring props ensures only the "...rest" get passed down
    const {
      skin: FormFieldSkin,
      theme,
      themeOverrides,
      error,
      context,
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
