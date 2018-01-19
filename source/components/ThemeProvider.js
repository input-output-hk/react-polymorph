import React, { Component } from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';

// utility function for composing a component's theme object
// with any themeOverrides
import composeTheme from '../utils/composeTheme.js';

// import the Root Theme API object which specifies the shape
// of a theme for every component in this library, used in composeLibraryTheme
import { rootThemeAPI } from '../themes/API';

class ThemeProvider extends Component {
  constructor(props) {
    super(props);
    const { children, theme, themeOverrides } = props;

    this.state = {
      composedTheme: this.composeLibraryTheme(
        theme,
        themeOverrides,
        rootThemeAPI
      )
    };
  }

  // prevents performance issues associated with frequently rerendering all
  // children of ThemeProvider by checking to see if the passed theme and/or
  // themeOverrides props have changed before a rerender

  componentWillReceiveProps(nextProps) {
    const { children, theme, themeOverrides } = nextProps;

    const changedProps = _.pickBy(
      { theme, themeOverrides },
      (value, key) => this.props[key] !== value
    );

    if (Object.keys(changedProps).length > 0) {
      this.setState({
        composedTheme: this.composeLibraryTheme(
          theme,
          themeOverrides,
          rootThemeAPI
        )
      });
    }
  }

  // composeLibraryTheme returns a single obj containing theme definitions
  // for every component in the React Polymorph library
  // every key on the returned obj is named after a component in the library
  // and each key's value are the specific css definitions for each element
  // in a component. The structure of a component's theme is defined in
  // themes/API -- Each component has its own file containing an obj
  // which demarcates its structure. This aids rapid development of themes in a
  // reuseable + composable manner

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
          // not every property on rootThemeAPI should be returned
          // only the non-empty props that this.props.theme contains

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

  // Set the share value
  getChildContext() {
    const { composedTheme } = this.state;

    return {
      theme: { ...composedTheme }
    };
  }

  // all children of ThemeProvider HOC are passed the high level theme object
  // composed with any custom config passed via this.props.themeOverrides

  render() {
    return <div>{this.props.children}</div>;
  }
}

ThemeProvider.childContextTypes = {
  theme: PropTypes.object
};

ThemeProvider.defaultProps = {
  theme: { ...rootThemeAPI },
  themeOverrides: {}
};

ThemeProvider.propTypes = {
  theme: PropTypes.object,
  themeOverrides: PropTypes.object,
  children: PropTypes.element
};

export default ThemeProvider;
