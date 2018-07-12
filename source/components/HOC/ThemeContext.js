// @flow
import React from 'react';
import createReactContext, { type Context } from 'create-react-context';

// import constants
import { IDENTIFIERS, ROOT_THEME_API } from '../../themes/API';

// import simple theme file for every component
import SimpleAutocomplete from '../../themes/simple/SimpleAutocomplete.scss';
import SimpleBubble from '../../themes/simple/SimpleBubble.scss';
import SimpleButton from '../../themes/simple/SimpleButton.scss';
import SimpleCheckbox from '../../themes/simple/SimpleCheckbox.scss';
import SimpleFormField from '../../themes/simple/SimpleFormField.scss';
import SimpleInput from '../../themes/simple/SimpleInput.scss';
import SimpleModal from '../../themes/simple/SimpleModal.scss';
import SimpleOptions from '../../themes/simple/SimpleOptions.scss';
import SimpleProgressBar from '../../themes/simple/SimpleProgressBar.scss';
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

// construct SimpleTheme object
const SimpleTheme = {
  [IDENTIFIERS.AUTOCOMPLETE]: SimpleAutocomplete,
  [IDENTIFIERS.BUBBLE]: SimpleBubble,
  [IDENTIFIERS.BUTTON]: SimpleButton,
  [IDENTIFIERS.CHECKBOX]: SimpleCheckbox,
  [IDENTIFIERS.FORM_FIELD]: SimpleFormField,
  [IDENTIFIERS.INPUT]: SimpleInput,
  [IDENTIFIERS.MODAL]: SimpleModal,
  [IDENTIFIERS.OPTIONS]: SimpleOptions,
  [IDENTIFIERS.PROGRESS_BAR]: SimpleProgressBar,
  [IDENTIFIERS.RADIO]: SimpleRadio,
  [IDENTIFIERS.SELECT]: SimpleSelect,
  [IDENTIFIERS.SWITCH]: SimpleSwitch,
  [IDENTIFIERS.TEXT_AREA]: SimpleTextArea,
  [IDENTIFIERS.TOGGLER]: SimpleToggler,
  [IDENTIFIERS.TOOLTIP]: SimpleTooltip
};

const defaultContext = { theme: SimpleTheme, ROOT_THEME_API };

export const ThemeContext: Context<Theme> = createContext(defaultContext);
