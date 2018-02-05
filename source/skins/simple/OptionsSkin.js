import React from 'react';
import { themr } from 'react-css-themr';
import { OPTIONS } from './identifiers';
import DefaultOptionsTheme from '../../themes/simple/SimpleOptions.scss';
import BubbleSkin from './BubbleSkin';
import { optionsSkinFactory } from './raw/OptionsSkin';

export default themr(OPTIONS, DefaultOptionsTheme)(optionsSkinFactory(BubbleSkin));
