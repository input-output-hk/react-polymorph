import React from 'react';
import { themr } from 'react-css-themr';
import { FORM_FIELD } from './identifiers';
import DefaultFormFieldTheme from '../../themes/simple/SimpleFormField.scss';
import FormFieldSkin from "./raw/FormFieldSkin";

export default themr(FORM_FIELD, DefaultFormFieldTheme)(FormFieldSkin);
