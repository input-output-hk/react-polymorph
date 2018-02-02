// css modules will turn all of these imports into objects
import Autocomplete from './SimpleAutocomplete.scss';
import Bubble from './SimpleBubble.scss';
import Button from './SimpleButton.scss';
import Checkbox from './SimpleCheckbox.scss';
import FormField from './SimpleFormField.scss';
import Input from './SimpleInput.scss';
import Modal from './SimpleModal.scss';
import Options from './SimpleOptions.scss';
import Radio from './SimpleRadio.scss';
import Select from './SimpleSelect.scss';
import Switch from './SimpleSwitch.scss';
import TextArea from './SimpleTextArea.scss';
import Toggler from './SimpleToggler.scss';
import Tooltip from './SimpleTooltip.scss';

// this pattern allows users to import the entire default SimpleTheme object
// or individual component theme objects as a named export

export const SimpleAutocompleteTheme = Autocomplete;
export const SimpleBubbleTheme = Bubble;
export const SimpleButtonTheme = Button;
export const SimpleCheckboxTheme = Checkbox;
export const SimpleFormFieldTheme = FormField;
export const SimpleInputTheme = Input;
export const SimpleModalTheme = Modal;
export const SimpleOptionsTheme = Options;
export const SimpleRadioTheme = Radio;
export const SimpleSelectTheme = Select;
export const SimpleSwitchTheme = Switch;
export const SimpleTextAreaTheme = TextArea;
export const SimpleTogglerTheme = Toggler;
export const SimpleTooltipTheme = Tooltip;

// the entire SimpleTheme is exported as one composed object
// great for ThemeProvider
export default {
  autocomplete: { ...SimpleAutocompleteTheme },
  bubble: { ...SimpleBubbleTheme },
  button: { ...SimpleButtonTheme },
  checkbox: { ...SimpleCheckboxTheme },
  formfield: { ...SimpleFormFieldTheme },
  input: { ...SimpleInputTheme },
  modal: { ...SimpleModalTheme },
  options: { ...SimpleOptionsTheme },
  radio: { ...SimpleRadioTheme },
  select: { ...SimpleSelectTheme },
  switch: { ...SimpleSwitchTheme },
  textarea: { ...SimpleTextAreaTheme },
  toggler: { ...SimpleTogglerTheme },
  tooltip: { ...SimpleTooltipTheme }
};
