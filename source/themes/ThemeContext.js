// @flow
import React from 'react';
import createReactContext, { type Context } from 'create-react-context';
import SimpleTheme from './simple';
import ROOT_THEME_API from './API';

// components that are NOT directly nested within a ThemeProvider
// can access simple theme as "this.props.context.theme",
// same goes for "this.props.context.ROOT_THEME_API"
// if the user passes ThemeProvider a theme and/or ROOT_THEME_API,
// these default values are overwritten

type Theme = {
  theme: Object,
  ROOT_THEME_API: Object
};

// check for createContext method on React
let createContext;
if (React.createContext) {
  // use React.createContext
  createContext = React.createContext;
} else {
  // use create-react-context polyfill
  createContext = createReactContext;
}

export const ThemeContext: Context<Theme> = createContext({
  theme: SimpleTheme,
  ROOT_THEME_API
});
