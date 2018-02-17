// css modules will turn all of these imports into objects
import Autocomplete from "./SimpleAutocomplete.scss";
import Bubble from "./SimpleBubble.scss";
import Button from "./SimpleButton.scss";
import Checkbox from "./SimpleCheckbox.scss";
import FormField from "./SimpleFormField.scss";
import Input from "./SimpleInput.scss";
import Modal from "./SimpleModal.scss";
import Options from "./SimpleOptions.scss";
import Radio from "./SimpleRadio.scss";
import Select from "./SimpleSelect.scss";
import Switch from "./SimpleSwitch.scss";
import TextArea from "./SimpleTextArea.scss";
import Toggler from "./SimpleToggler.scss";
import Tooltip from "./SimpleTooltip.scss";

// this pattern allows users to import the entire default SimpleTheme object
// or individual component theme objects as a named export

export const AutocompleteTheme = Autocomplete;
export const BubbleTheme = Bubble;
export const ButtonTheme = Button;
export const CheckboxTheme = Checkbox;
export const FormFieldTheme = FormField;
export const InputTheme = Input;
export const ModalTheme = Modal;
export const OptionsTheme = Options;
export const RadioTheme = Radio;
export const SelectTheme = Select;
export const SwitchTheme = Switch;
export const TextAreaTheme = TextArea;
export const TogglerTheme = Toggler;
export const TooltipTheme = Tooltip;

// the entire SimpleTheme is exported as one composed object
// great for ThemeProvider
export default {
  autocomplete: { ...AutocompleteTheme },
  bubble: { ...BubbleTheme },
  button: { ...ButtonTheme },
  checkbox: { ...CheckboxTheme },
  formfield: { ...FormFieldTheme },
  input: { ...InputTheme },
  modal: { ...ModalTheme },
  options: { ...OptionsTheme },
  radio: { ...RadioTheme },
  select: { ...SelectTheme },
  switch: { ...SwitchTheme },
  textarea: { ...TextAreaTheme },
  toggler: { ...TogglerTheme },
  tooltip: { ...TooltipTheme }
};
