import React from 'react';
import { ThemeProvider } from 'react-css-themr';
import { FORM_FIELD, INPUT, TEXT_AREA, BUTTON } from '../../lib/skins/simple/identifiers';
import SimpleFormField from '../../lib/themes/simple/SimpleFormField.scss';
import SimpleInput from '../../lib/themes/simple/SimpleInput.scss';
import SimpleTextArea from '../../lib/themes/simple/SimpleTextArea.scss';
import SimpleButton from '../../lib/themes/simple/SimpleButton.scss';

const theme = {
  [FORM_FIELD]: SimpleFormField,
  [INPUT]: SimpleInput,
  [TEXT_AREA]: SimpleTextArea,
  [BUTTON]: SimpleButton,
};

export default (props) => (
  <ThemeProvider theme={theme}>
    {props.children}
  </ThemeProvider>
);
