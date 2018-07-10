// @flow
import React from 'react';
import createReactContext, { type Context } from 'create-react-context';

import ROOT_THEME_API from '../../themes/API';
import SimpleAutocomplete from '../../themes/simple/SimpleAutocomplete.scss';
import SimpleBubble from '../../themes/simple/SimpleBubble.scss';
import SimpleButton from '../../themes/simple/SimpleButton.scss';
import SimpleCheckbox from '../../themes/simple/SimpleCheckbox.scss';
import SimpleFormField from '../../themes/simple/SimpleFormField.scss';
import SimpleInput from '../../themes/simple/SimpleInput.scss';
import SimpleLoadingSpinner from '../../themes/simple/SimpleLoadingSpinner.scss';
import SimpleModal from '../../themes/simple/SimpleModal.scss';
import SimpleOptions from '../../themes/simple/SimpleOptions.scss';
import SimpleRadio from '../../themes/simple/SimpleRadio.scss';
import SimpleSelect from '../../themes/simple/SimpleSelect.scss';
import SimpleSwitch from '../../themes/simple/SimpleSwitch.scss';
import SimpleTextArea from '../../themes/simple/SimpleTextArea.scss';
import SimpleToggler from '../../themes/simple/SimpleToggler.scss';
import SimpleTooltip from '../../themes/simple/SimpleTooltip.scss';

// components that are NOT directly nested within a ThemeProvider
// can access simple theme as "this.props.context.theme",
// same goes for "this.props.context.ROOT_THEME_API"
// if the user passes ThemeProvider a theme and/or ROOT_THEME_API,
// these default values are overwritten

// check to use context pollyfill or not
let createContext;
if (React.createContext) {
  // React module contains createContext method, no polyfill
  createContext = React.createContext;
} else {
  // use create-react-context polyfill
  createContext = createReactContext;
}

type Theme = {
  theme: Object,
  ROOT_THEME_API: Object
};

const SimpleTheme = {
  autocomplete: SimpleAutocomplete,
  bubble: SimpleBubble,
  button: SimpleButton,
  checkbox: SimpleCheckbox,
  formfield: SimpleFormField,
  loadingspinner: SimpleLoadingSpinner,
  input: SimpleInput,
  modal: SimpleModal,
  options: SimpleOptions,
  radio: SimpleRadio,
  select: SimpleSelect,
  switch: SimpleSwitch,
  textarea: SimpleTextArea,
  toggler: SimpleToggler,
  tooltip: SimpleTooltip
};

const defaultContext = { theme: SimpleTheme, ROOT_THEME_API };

export const ThemeContext: Context<Theme> = createContext(defaultContext);
