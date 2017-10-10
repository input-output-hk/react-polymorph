import React from 'react';
import { themr } from 'react-css-themr';
import { TOGGLER } from './identifiers';
import DefaultTogglerTheme from '../../themes/simple/SimpleToggler.scss';
import TogglerSkin from "./raw/TogglerSkin";

export default themr(TOGGLER, DefaultTogglerTheme)(TogglerSkin);
