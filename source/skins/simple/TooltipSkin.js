import React from 'react';
import { themr } from 'react-css-themr';
import { TOOLTIP } from './identifiers';
import DefaultTooltipTheme from '../../themes/simple/SimpleTooltip.scss';
import { tooltipSkinFactory } from './raw/TooltipSkin';
import BubbleSkin from './BubbleSkin';

export default themr(TOOLTIP, DefaultTooltipTheme)(
  tooltipSkinFactory(BubbleSkin),
);
