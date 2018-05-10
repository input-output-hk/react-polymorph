// @flow
import React, { Component } from 'react';
import type { Node } from 'react';

// external libraries
import _ from 'lodash';

// contains default theme and context provider
import { ThemeContext } from '../themes/ThemeContext';

// imports the Root Theme API object which specifies the shape
// of a complete theme for every component in this library, used in this.composeLibraryTheme
import ROOT_THEME_API from '../themes/API';

// internal utility functions
import { composeTheme } from '../utils';

type Props = {
  children: Node,
  theme: Object,
  themeOverrides: Object // custom css/scss from user that adheres to shape of ROOT_THEME_API
};

type State = {
  theme: Object
};

class ThemeProvider extends Component<Props, State> {
  static defaultProps = {
    themeOverrides: {}
  };

  constructor(props: Props) {
    super(props);

    const { theme, themeOverrides } = props;

    this.state = {
      theme: this.composeLibraryTheme(theme, themeOverrides)
    };
  }

  // checks if theme and/or themeOverrides props have changed
  // in order to update state before rendering
  componentWillReceiveProps(nextProps: Props) {
    const { theme, themeOverrides } = nextProps;

    const changedProps = _.pickBy(
      { theme, themeOverrides },
      (value, key) => this.props[key] !== value
    );

    if (Object.keys(changedProps).length > 0) {
      this.setState({
        theme: this.composeLibraryTheme(theme, themeOverrides)
      });
    }
  }

  // composeLibraryTheme returns a single obj containing theme definitions
  // for every component in the library. Every key on the returned obj is named
  // in conjunction with a component in the library and each key's value is structured
  // to contain the css definitions for each element in that component.
  // Which is just a string via CSS-Modules. Looks like this:
  // {
  //   button: { root: '', disabled: '' },
  //   input: { input: '', disabled: '', error: '' },
  //   formField: { root: '', label: '', error: '' },
  //   ... and so on, creating a complete theme for the library,
  //  }
  composeLibraryTheme = (theme: Object, themeOverrides: Object) => {
    // if themeOverrides is empty, no need for composition
    if (_.isEmpty(themeOverrides)) {
      return theme;
    }
    // obj to be returned
    const composedTheme = {};

    for (const componentName in ROOT_THEME_API) {
      // check if ROOT_THEME_API contains the key of componentName
      if ({}.hasOwnProperty.call(ROOT_THEME_API, componentName)) {

        // check if theme contains a key of componentName
        if ({}.hasOwnProperty.call(theme, componentName)) {
          // add componentName as a key to final return obj
          composedTheme[componentName] = theme[componentName];
        }

        // also check if themeOverrides contains the key componentName
        if ({}.hasOwnProperty.call(themeOverrides, componentName)) {
          // compose theme styles with user's themeOverrides
          composedTheme[componentName] = composeTheme(
            theme[componentName],
            themeOverrides[componentName],
            ROOT_THEME_API[componentName]
          );
        }
      }
    }

    return composedTheme;
  };

  render() {
    const { theme } = this.state;
    const providerState = { theme, ROOT_THEME_API };
    return (
      <ThemeContext.Provider value={providerState}>
        {this.props.children}
      </ThemeContext.Provider>
    );
  }
}

export default ThemeProvider;
