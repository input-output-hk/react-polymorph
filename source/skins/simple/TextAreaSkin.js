import React from 'react';
import { themr } from 'react-css-themr';
import { TEXT_AREA } from './identifiers';
import DefaultTextAreaTheme from '../../themes/simple/SimpleTextArea.scss';
import { textAreaSkinFactory } from "./raw/TextAreaSkin";
import FormFieldSkin from "./FormFieldSkin";

export default themr(TEXT_AREA, DefaultTextAreaTheme)(textAreaSkinFactory(FormFieldSkin));
