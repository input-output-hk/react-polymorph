import React from 'react';
import { themr } from 'react-css-themr';
import { CHECKBOX } from './identifiers';
import DefaultCheckboxTheme from '../../themes/simple/SimpleCheckbox.scss';
import CheckboxSkin from './raw/CheckboxSkin';

export default themr(CHECKBOX, DefaultCheckboxTheme)(CheckboxSkin);
