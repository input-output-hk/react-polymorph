import React from 'react';
import { themr } from 'react-css-themr';
import { RADIO } from './identifiers';
import DefaultRadioTheme from '../../themes/simple/SimpleRadio.scss';
import RadioSkin from './raw/RadioSkin';

export default themr(RADIO, DefaultRadioTheme)(RadioSkin);
