import React from 'react';
import { ThemeProvider } from 'react-css-themr';
import {
  FORM_FIELD, INPUT, TEXT_AREA, BUTTON, DROP_DOWN
} from '../../source/skins/simple/identifiers';
import SimpleFormField from '../../source/themes/simple/SimpleFormField.scss';
import SimpleInput from '../../source/themes/simple/SimpleInput.scss';
import SimpleTextArea from '../../source/themes/simple/SimpleTextArea.scss';
import SimpleButton from '../../source/themes/simple/SimpleButton.scss';
import SimpleDropDown from '../../source/themes/simple/SimpleDropDown.scss';

const theme = {
  [FORM_FIELD]: SimpleFormField,
  [INPUT]: SimpleInput,
  [TEXT_AREA]: SimpleTextArea,
  [BUTTON]: SimpleButton,
  [DROP_DOWN]: SimpleDropDown,
};

export default (props) => (
  <ThemeProvider theme={theme}>
    {props.children}
  </ThemeProvider>
);
