// @flow
// import theme IDENTIFIERS constants
import { IDENTIFIERS } from '../API';

// css modules plugin converts all imports below into plain objects
import SimpleAutocomplete from './SimpleAutocomplete.scss';
import SimpleBubble from './SimpleBubble.scss';
import SimpleButton from './SimpleButton.scss';
import SimpleCheckbox from './SimpleCheckbox.scss';
import SimpleFormField from './SimpleFormField.scss';
import SimpleInput from './SimpleInput.scss';
import SimpleModal from './SimpleModal.scss';
import SimpleOptions from './SimpleOptions.scss';
import SimpleRadio from './SimpleRadio.scss';
import SimpleSelect from './SimpleSelect.scss';
import SimpleSwitch from './SimpleSwitch.scss';
import SimpleTextArea from './SimpleTextArea.scss';
import SimpleToggler from './SimpleToggler.scss';
import SimpleTooltip from './SimpleTooltip.scss';

// SimpleTheme is a plain object serving as the default export.
// Each key is named after a component and each key's value
// is the component's corresponding theme. The user can
// pass this entire obj directly to ThemeProvider via the "theme" prop
export const SimpleTheme = {
  [IDENTIFIERS.AUTOCOMPLETE]: SimpleAutocomplete,
  [IDENTIFIERS.BUBBLE]: SimpleBubble,
  [IDENTIFIERS.BUTTON]: SimpleButton,
  [IDENTIFIERS.CHECKBOX]: SimpleCheckbox,
  [IDENTIFIERS.FORM_FIELD]: SimpleFormField,
  [IDENTIFIERS.INPUT]: SimpleInput,
  [IDENTIFIERS.MODAL]: SimpleModal,
  [IDENTIFIERS.OPTIONS]: SimpleOptions,
  [IDENTIFIERS.RADIO]: SimpleRadio,
  [IDENTIFIERS.SELECT]: SimpleSelect,
  [IDENTIFIERS.SWITCH]: SimpleSwitch,
  [IDENTIFIERS.TEXT_AREA]: SimpleTextArea,
  [IDENTIFIERS.TOGGLER]: SimpleToggler,
  [IDENTIFIERS.TOOLTIP]: SimpleTooltip
};
