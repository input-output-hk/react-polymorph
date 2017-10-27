import React from 'react';
import { themr } from 'react-css-themr';
import { INPUT } from './identifiers';
import DefaultInputTheme from '../../themes/simple/SimpleInput.scss';
import { inputSkinFactory } from './raw/InputSkin';
import FormFieldSkin from './FormFieldSkin';

export default themr(INPUT, DefaultInputTheme)(inputSkinFactory(FormFieldSkin));
