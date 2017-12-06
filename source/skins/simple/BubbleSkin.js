import React from 'react';
import { themr } from 'react-css-themr';
import { BUBBLE } from './identifiers';
import DefaultBubbleTheme from '../../themes/simple/SimpleBubble.scss';
import BubbleSkin from './raw/BubbleSkin';

export default themr(BUBBLE, DefaultBubbleTheme)(BubbleSkin);
