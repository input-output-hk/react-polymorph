import ROOT_THEME_API from '../../source/themes/API';

import SimpleAutocomplete from '../../source/themes/simple/SimpleAutocomplete.scss';
import SimpleBubble from '../../source/themes/simple/SimpleBubble.scss';
import SimpleButton from '../../source/themes/simple/SimpleButton.scss';
import SimpleCheckbox from '../../source/themes/simple/SimpleCheckbox.scss';
import SimpleFormField from '../../source/themes/simple/SimpleFormField.scss';
import SimpleInput from '../../source/themes/simple/SimpleInput.scss';
import SimpleModal from '../../source/themes/simple/SimpleModal.scss';
import SimpleOptions from '../../source/themes/simple/SimpleOptions.scss';
import SimpleRadio from '../../source/themes/simple/SimpleRadio.scss';
import SimpleSelect from '../../source/themes/simple/SimpleSelect.scss';
import SimpleSwitch from '../../source/themes/simple/SimpleSwitch.scss';
import SimpleTextArea from '../../source/themes/simple/SimpleTextArea.scss';
import SimpleToggler from '../../source/themes/simple/SimpleToggler.scss';
import SimpleTooltip from '../../source/themes/simple/SimpleTooltip.scss';

const SimpleTheme = {
  autocomplete: SimpleAutocomplete,
  bubble: SimpleBubble,
  button: SimpleButton,
  checkbox: SimpleCheckbox,
  formfield: SimpleFormField,
  input: SimpleInput,
  modal: SimpleModal,
  options: SimpleOptions,
  radio: SimpleRadio,
  select: SimpleSelect,
  switch: SimpleSwitch,
  textarea: SimpleTextArea,
  toggler: SimpleToggler,
  tooltip: SimpleTooltip
};

export const CONTEXT = {
  theme: SimpleTheme,
  ROOT_THEME_API
};
