// @flow
import React, { Component } from 'react';
import type { Node } from 'react';

// external libraries
import { isEmpty, isEqual, cloneDeep } from 'lodash';

// contains default theme and context provider
import { ThemeContext } from './HOC/ThemeContext';

// imports the Root Theme API object which specifies the shape
// of a complete theme for every component in this library, used in this.composeLibraryTheme
import { ROOT_THEME_API } from '../themes/API';

// internal utility functions
import { appendToProperty } from '../utils/themes';
import { hasProperty } from '../utils/props';

type Props = {
  children?: ?Node,
  skins: Object,
  theme: Object,
  themeOverrides: Object // custom css/scss from user that adheres to shape of ROOT_THEME_API
};

type State = {
  theme: Object,
};

export class ThemeProvider extends Component<Props, State> {
  // define static properties
  static displayName = 'ThemeProvider';
  static defaultProps = {
    skins: {},
    theme: {},
    themeOverrides: {}
  };

  constructor(props: Props) {
    super(props);

    const { theme, themeOverrides } = props;

    this.state = {
      theme: this._composeLibraryTheme(theme, themeOverrides)
    };
  }

  componentWillReceiveProps(nextProps: Props) {
    const { theme, themeOverrides } = this.props;
    const { theme: nextTheme, themeOverrides: nextOverrides } = nextProps;

    if (!isEqual(theme, nextTheme) || !isEqual(themeOverrides, nextOverrides)) {
      this.setState(() => ({
        theme: this._composeLibraryTheme(nextTheme, nextOverrides)
      }));
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
  _composeLibraryTheme = (theme: Object, themeOverrides: Object) => {
    // if themeOverrides is empty, no need for composition
    if (isEmpty(themeOverrides)) { return theme; }

    // final object to be returned
    const composedTheme = {};

    for (const componentName in ROOT_THEME_API) {
      // check if ROOT_THEME_API contains the key of componentName
      if (hasProperty(ROOT_THEME_API, componentName)) {

        // check if theme contains a key of componentName
        if (hasProperty(theme, componentName)) {
          // add componentName as a key to final return obj
          composedTheme[componentName] = theme[componentName];
        }

        // also check if themeOverrides contains the key componentName
        if (hasProperty(themeOverrides, componentName)) {
          // compose theme styles with user's themeOverrides
          composedTheme[componentName] = this._applyThemeOverrides(
            theme[componentName],
            themeOverrides[componentName],
            ROOT_THEME_API[componentName]
          );
        }
      }
    }
    return composedTheme;
  };

  _applyThemeOverrides = (
    componentTheme: Object,
    componentThemeOverrides: Object,
    componentThemeAPI: Object
  ) => {
    // Return componentTheme if there are no overrides provided
    if (isEmpty(componentThemeOverrides)) { return componentTheme; }

    // final composed theme obj to be returned at end
    const composedComponentTheme = cloneDeep(componentThemeAPI);

    for (const className in componentThemeAPI) {
      if (hasProperty(componentThemeAPI, className)) {
        if (hasProperty(componentTheme, className)) {
          appendToProperty(composedComponentTheme, className, componentTheme[className]);
        }

        if (hasProperty(componentThemeOverrides, className)) {
          appendToProperty(composedComponentTheme, className, componentThemeOverrides[className]);
        }
      }
    }
    return composedComponentTheme;
  }

  render() {
    const { theme } = this.state;
    const { skins } = this.props;
    const providerState = { skins, theme, ROOT_THEME_API };

    return (
      <ThemeContext.Provider value={providerState}>
        {this.props.children}
      </ThemeContext.Provider>
    );
  }
}
