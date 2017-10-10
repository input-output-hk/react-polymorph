import React from 'react';
import { themr } from 'react-css-themr';
import { SWITCH } from './identifiers';
import DefaultSwitchTheme from '../../themes/simple/SimpleSwitch.scss';
import SwitchSkin from "./raw/SwitchSkin";

export default themr(SWITCH, DefaultSwitchTheme)(SwitchSkin);
