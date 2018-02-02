import React, { Component } from 'react';
import _ from 'lodash';
import { object, string, element } from 'prop-types';

// utility function for composing a component's theme object
// with any themeOverrides
import composeTheme from '../utils/composeTheme.js';

// import the Root Theme API object which specifies the shape
// of a theme for every component in this library, used in composeLibraryTheme
// this is the default export from /themes/API/index.js
import ROOT_THEME_API from '../themes/API';

class ThemeProvider extends Component {
  static propTypes = {
    theme: object,
    themeOverrides: object,
    children: element
  };

  static defaultProps = {
    theme: { ...ROOT_THEME_API },
    themeOverrides: {}
  };

  static childContextTypes = {
    theme: object
  };

  constructor(props) {
    super(props);

    const { theme, themeOverrides } = props;

    this.state = {
      composedTheme: this.composeLibraryTheme(
        theme,
        themeOverrides,
        ROOT_THEME_API
      )
    };
  }

  getChildContext() {
    const { composedTheme } = this.state;

    return {
      theme: { ...composedTheme }
    };
  }

  // prevents performance issues associated with frequently rerendering all
  // children of ThemeProvider by checking to see if the passed theme and/or
  // themeOverrides props have changed before a rerender

  componentWillReceiveProps(nextProps) {
    const { theme, themeOverrides } = nextProps;

    const changedProps = _.pickBy(
      { theme, themeOverrides },
      (value, key) => this.props[key] !== value
    );

    if (Object.keys(changedProps).length > 0) {
      this.setState({
        composedTheme: this.composeLibraryTheme(
          theme,
          themeOverrides,
          ROOT_THEME_API
        )
      });
    }
  }

  // composeLibraryTheme returns a single obj containing theme definitions
  // for every component in the library.
  // Every key on the returned obj is named in conjunction with a component
  // in the library and each key's value is structured to contain the css
  // definitions for each element in that component. Which is just a string via CSS-Modules.

  // {
  //   button: { root: '', disabled: '' },
  //   input: { input: '', disabled: '', error: '' },
  //   formField: { root: '', label: '', error: '' },
  //   ... and so on, creating a complete theme for the library,
  //  }

  composeLibraryTheme = (theme, themeOverrides, rootThemeAPI) => {
    if (_.isEmpty(themeOverrides)) {
      return theme;
    } else {
      let composedTheme = { ...rootThemeAPI };

      for (const componentName in rootThemeAPI) {
        if (theme.hasOwnProperty(componentName)) {
          composedTheme[componentName] = theme[componentName];
        } else {
          // delete property from composedTheme because it will remain empty
          // only the non-empty props that this.props.theme contains should be returned

          delete composedTheme[componentName];
        }

        if (themeOverrides.hasOwnProperty(componentName)) {
          composedTheme[componentName] = composeTheme(
            theme[componentName],
            themeOverrides[componentName],
            rootThemeAPI[componentName]
          );
        }
      }

      return composedTheme;
    }
  };

  // all children of ThemeProvider HOC are passed the theme object
  // composed with any custom config via this.props.themeOverrides
  render() {
    return <div>{this.props.children}</div>;
  }
}

export default ThemeProvider;
