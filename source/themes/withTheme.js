import React from "react";
import { ThemeContext } from "./ThemeContext";

// withTheme is a HOC that takes a Component as a parameter
// and returns that Component wrapped within ThemeContext.Consumer.
// Any additional props and refs are forwarded to the returned Component.
export const withTheme = Component => {
  const ThemedComponent = ({ forwardedRef, ...rest }) => (
    <ThemeContext.Consumer>
      {context => <Component {...rest} ref={forwardedRef} context={context} />}
    </ThemeContext.Consumer>
  );

  return React.forwardRef((props, ref) => (
    <ThemedComponent {...props} forwardedRef={ref} />
  ));
};
