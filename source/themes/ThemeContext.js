import React from 'react';
import SimpleTheme from './simple';
import ROOT_THEME_API from './API';

// components that are NOT directly nested within a ThemeProvider
// can access simple theme as "this.props.context.theme",
// same goes for "this.props.context.ROOT_THEME_API"
// if the user passes ThemeProvider a theme and/or ROOT_THEME_API,
// these default values are overwritten
export const ThemeContext = React.createContext({
  theme: SimpleTheme,
  ROOT_THEME_API
});
