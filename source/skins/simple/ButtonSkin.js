import React from 'react';
import { themr } from 'react-css-themr';
import { BUTTON } from './identifiers';
import DefaultButtonTheme from '../../themes/simple/SimpleButton.scss';
import ButtonSkin from "./raw/ButtonSkin";

export default themr(BUTTON, DefaultButtonTheme)(ButtonSkin);
