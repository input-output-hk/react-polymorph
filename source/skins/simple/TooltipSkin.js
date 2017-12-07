import React from 'react';
import { themr } from 'react-css-themr';
import { TOOLTIP } from './identifiers';
import DefaultTooltipTheme from '../../themes/simple/SimpleTooltip.scss';
import TooltipSkin from './raw/TooltipSkin';

export default themr(TOOLTIP, DefaultTooltipTheme)(TooltipSkin);
