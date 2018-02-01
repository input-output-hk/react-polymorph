import React from 'react';
import { themr } from 'react-css-themr';
import { AUTOCOMPLETE } from './identifiers';
import DefaultAutocompleteTheme from '../../themes/simple/SimpleAutocomplete.scss';
import { autocompleteSkinFactory } from './raw/AutocompleteSkin';
import FormFieldSkin from './FormFieldSkin';
import SimpleOptionsSkin from './OptionsSkin';

export default themr(AUTOCOMPLETE, DefaultAutocompleteTheme)(
  autocompleteSkinFactory(FormFieldSkin, SimpleOptionsSkin),
);
