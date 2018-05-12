import ROOT_THEME_API from '../../source/themes/API';

import Autocomplete from '../../source/themes/simple/SimpleAutocomplete.scss';
import Bubble from '../../source/themes/simple/SimpleBubble.scss';
import Button from '../../source/themes/simple/SimpleButton.scss';
import Checkbox from '../../source/themes/simple/SimpleCheckbox.scss';
import FormField from '../../source/themes/simple/SimpleFormField.scss';
import Input from '../../source/themes/simple/SimpleInput.scss';
import Modal from '../../source/themes/simple/SimpleModal.scss';
import Options from '../../source/themes/simple/SimpleOptions.scss';
import Radio from '../../source/themes/simple/SimpleRadio.scss';
import Select from '../../source/themes/simple/SimpleSelect.scss';
import Switch from '../../source/themes/simple/SimpleSwitch.scss';
import TextArea from '../../source/themes/simple/SimpleTextArea.scss';
import Toggler from '../../source/themes/simple/SimpleToggler.scss';
import Tooltip from '../../source/themes/simple/SimpleTooltip.scss';

const SimpleTheme = {
  autocomplete: { ...Autocomplete },
  bubble: { ...Bubble },
  button: { ...Button },
  checkbox: { ...Checkbox },
  formfield: { ...FormField },
  input: { ...Input },
  modal: { ...Modal },
  options: { ...Options },
  radio: { ...Radio },
  select: { ...Select },
  switch: { ...Switch },
  textarea: { ...TextArea },
  toggler: { ...Toggler },
  tooltip: { ...Tooltip }
};

export const context = {
  theme: SimpleTheme,
  ROOT_THEME_API
};
