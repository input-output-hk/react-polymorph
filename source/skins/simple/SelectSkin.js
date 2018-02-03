import React from 'react';
import { themr } from 'react-css-themr';
import { SELECT } from './identifiers';
import DefaultSelectTheme from '../../themes/simple/SimpleSelect.scss';
import { selectSkinFactory } from './raw/SelectSkin';
import InputSkin from './InputSkin';
import OptionsSkin from './OptionsSkin';

export default themr(SELECT, DefaultSelectTheme)(
  selectSkinFactory(InputSkin, OptionsSkin)
);
