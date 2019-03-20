// @flow
import { IDENTIFIERS } from '../../components';
import { AutocompleteSkin } from './AutocompleteSkin';
import { BubbleSkin } from './BubbleSkin';
import { ButtonSkin } from './ButtonSkin';
import { CheckboxSkin } from './CheckboxSkin';
import { FormFieldSkin } from './FormFieldSkin';
import { HeaderSkin } from './HeaderSkin';
import { InfiniteScrollSkin } from './InfiniteScrollSkin';
import { InputSkin } from './InputSkin';
import { LoadingSpinnerSkin } from './LoadingSpinnerSkin';
import { ModalSkin } from './ModalSkin';
import { OptionsSkin } from './OptionsSkin';
import { ProgressBarSkin } from './ProgressBarSkin';
import { RadioSkin } from './RadioSkin';
import { SelectSkin } from './SelectSkin';
import { SwitchSkin } from './SwitchSkin';
import { TextAreaSkin } from './TextAreaSkin';
import { TogglerSkin } from './TogglerSkin';
import { TooltipSkin } from './TooltipSkin';

export const SimpleSkins = {
  [IDENTIFIERS.AUTOCOMPLETE]: AutocompleteSkin,
  [IDENTIFIERS.BUBBLE]: BubbleSkin,
  [IDENTIFIERS.BUTTON]: ButtonSkin,
  [IDENTIFIERS.CHECKBOX]: CheckboxSkin,
  [IDENTIFIERS.FORM_FIELD]: FormFieldSkin,
  [IDENTIFIERS.HEADER]: HeaderSkin,
  [IDENTIFIERS.INFINITE_SCROLL]: InfiniteScrollSkin,
  [IDENTIFIERS.INPUT]: InputSkin,
  [IDENTIFIERS.LOADING_SPINNER]: LoadingSpinnerSkin,
  [IDENTIFIERS.MODAL]: ModalSkin,
  [IDENTIFIERS.OPTIONS]: OptionsSkin,
  [IDENTIFIERS.PROGRESS_BAR]: ProgressBarSkin,
  [IDENTIFIERS.RADIO]: RadioSkin,
  [IDENTIFIERS.SELECT]: SelectSkin,
  [IDENTIFIERS.SWITCH]: SwitchSkin,
  [IDENTIFIERS.TEXT_AREA]: TextAreaSkin,
  [IDENTIFIERS.TOGGLER]: TogglerSkin,
  [IDENTIFIERS.TOOLTIP]: TooltipSkin
};
