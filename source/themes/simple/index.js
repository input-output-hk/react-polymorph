// @flow
// import theme IDENTIFIERS constants
import { IDENTIFIERS } from '../../components';

// css modules plugin converts all imports below into plain objects
import SimpleAutocomplete from './SimpleAutocomplete.scss';
import SimpleBubble from './SimpleBubble.scss';
import SimpleButton from './SimpleButton.scss';
import SimpleCheckbox from './SimpleCheckbox.scss';
import SimpleFlex from './SimpleFlex.scss';
import SimpleFormField from './SimpleFormField.scss';
import SimpleGrid from './SimpleGrid.scss';
import SimpleGutter from './SimpleGutter.scss';
import SimpleHeader from './SimpleHeader.scss';
import SimpleInfiniteScroll from './SimpleInfiniteScroll.scss';
import SimpleInput from './SimpleInput.scss';
import SimpleLoadingSpinner from './SimpleLoadingSpinner.scss';
import SimpleModal from './SimpleModal.scss';
import SimpleOptions from './SimpleOptions.scss';
import SimpleProgressBar from './SimpleProgressBar.scss';
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
  [IDENTIFIERS.FLEX]: SimpleFlex,
  [IDENTIFIERS.FORM_FIELD]: SimpleFormField,
  [IDENTIFIERS.GRID]: SimpleGrid,
  [IDENTIFIERS.GUTTER]: SimpleGutter,
  [IDENTIFIERS.HEADER]: SimpleHeader,
  [IDENTIFIERS.INFINITE_SCROLL]: SimpleInfiniteScroll,
  [IDENTIFIERS.INPUT]: SimpleInput,
  [IDENTIFIERS.LOADING_SPINNER]: SimpleLoadingSpinner,
  [IDENTIFIERS.MODAL]: SimpleModal,
  [IDENTIFIERS.OPTIONS]: SimpleOptions,
  [IDENTIFIERS.PROGRESS_BAR]: SimpleProgressBar,
  [IDENTIFIERS.RADIO]: SimpleRadio,
  [IDENTIFIERS.SELECT]: SimpleSelect,
  [IDENTIFIERS.SWITCH]: SimpleSwitch,
  [IDENTIFIERS.TEXT_AREA]: SimpleTextArea,
  [IDENTIFIERS.TOGGLER]: SimpleToggler,
  [IDENTIFIERS.TOOLTIP]: SimpleTooltip
};
