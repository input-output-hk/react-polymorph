// @flow
import React from 'react';
import type { ComponentType, Ref } from 'react';
import { ThemeContext } from './ThemeContext';

// withTheme is a HOC that takes a Component as a parameter
// and returns that Component wrapped within ThemeContext.Consumer.
// Any additional props and refs are forwarded to the returned Component.
export const withTheme = (Component: ComponentType<any>) =>
  // $FlowFixMe
  React.forwardRef((props: {}, ref: Ref<any>) => (
    <ThemeContext.Consumer>
      {context => <Component context={context} ref={ref} {...props} />}
    </ThemeContext.Consumer>
  ));
