import React, { Component } from 'react';
import * as pickBy from 'lodash.pickby';
import PropTypes from 'prop-types';

import composeTheme from '../utils/composeTheme.js';

// import the Root Theme API object which specifies the shape
// of a theme for every component in this library
import { rootThemeAPI } from '../themes/API';

export class ThemeProvider extends Component {
  static propTypes = {
    theme: PropTypes.obj,
    themeOverrides: PropTypes.obj,
    children: PropTypes.element
  };

  static defaultProps = { theme: {}, themeOverrides: {} };

  constructor(props) {
    super(props);
    const { children, theme, themeOverrides } = props;
    this.state = {
      composedTheme: this.composeFinalTheme(theme, themeOverrides, rootThemeAPI)
    };
  }

  componentWillReceiveProps(nextProps) {
    const { children, theme, themeOverrides } = nextProps;

    const changedProps = pickBy(
      { theme, themeOverrides },
      (value, key) => this.props[key] !== value
    );

    if (Object.keys(changedProps).length > 0) {
      this.setState({
        composedTheme: this.composeFinalTheme(
          theme,
          themeOverrides,
          rootThemeAPI
        )
      });
    }
  }

  composeFinalTheme = (theme, themeOverrides, rootThemeAPI) => {
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

  render() {
    const { composedTheme } = this.state;
    return React.cloneElement(this.props.children, { theme: composedTheme });
  }
}
