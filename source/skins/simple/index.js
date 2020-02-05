// @flow
import { IDENTIFIERS } from '../../components';
import { AutocompleteSkin } from './AutocompleteSkin';
import { BubbleSkin } from './BubbleSkin';
import { ButtonSkin } from './ButtonSkin';
import { CheckboxSkin } from './CheckboxSkin';
import { DropdownSkin } from './DropdownSkin';
import { FormFieldSkin } from './FormFieldSkin';
import { HeaderSkin } from './HeaderSkin';
import { InfiniteScrollSkin } from './InfiniteScrollSkin';
import { InputSkin } from './InputSkin';
import { LinkSkin } from './LinkSkin';
import { LoadingSpinnerSkin } from './LoadingSpinnerSkin';
import { MnemonicEntrySkin } from './MnemonicEntrySkin';
import { ModalSkin } from './ModalSkin';
import { OptionsSkin } from './OptionsSkin';
import { ProgressBarSkin } from './ProgressBarSkin';
import { RadioSkin } from './RadioSkin';
import { SelectSkin } from './SelectSkin';
import { StepperSkin } from './StepperSkin';
import { SwitchSkin } from './SwitchSkin';
import { TextAreaSkin } from './TextAreaSkin';
import { TogglerSkin } from './TogglerSkin';
import { TooltipSkin } from './TooltipSkin';

export const SimpleSkins = {
  [IDENTIFIERS.AUTOCOMPLETE]: AutocompleteSkin,
  [IDENTIFIERS.BUBBLE]: BubbleSkin,
  [IDENTIFIERS.BUTTON]: ButtonSkin,
  [IDENTIFIERS.CHECKBOX]: CheckboxSkin,
  [IDENTIFIERS.DROPDOWN]: DropdownSkin,
  [IDENTIFIERS.FORM_FIELD]: FormFieldSkin,
  [IDENTIFIERS.HEADER]: HeaderSkin,
  [IDENTIFIERS.INFINITE_SCROLL]: InfiniteScrollSkin,
  [IDENTIFIERS.INPUT]: InputSkin,
  [IDENTIFIERS.LINK]: LinkSkin,
  [IDENTIFIERS.LOADING_SPINNER]: LoadingSpinnerSkin,
  [IDENTIFIERS.MNEMONIC_ENTRY]: MnemonicEntrySkin,
  [IDENTIFIERS.MODAL]: ModalSkin,
  [IDENTIFIERS.OPTIONS]: OptionsSkin,
  [IDENTIFIERS.PROGRESS_BAR]: ProgressBarSkin,
  [IDENTIFIERS.RADIO]: RadioSkin,
  [IDENTIFIERS.SELECT]: SelectSkin,
  [IDENTIFIERS.STEPPER]: StepperSkin,
  [IDENTIFIERS.SWITCH]: SwitchSkin,
  [IDENTIFIERS.TEXT_AREA]: TextAreaSkin,
  [IDENTIFIERS.TOGGLER]: TogglerSkin,
  [IDENTIFIERS.TOOLTIP]: TooltipSkin
};
