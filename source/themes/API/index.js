// @flow
import { IDENTIFIERS } from '../../components';
import { AUTOCOMPLETE_THEME_API } from './autocomplete';
import { BUBBLE_THEME_API } from './bubble';
import { BUTTON_THEME_API } from './button';
import { CHECKBOX_THEME_API } from './checkbox';
import { DROPDOWN_THEME_API } from './dropdown';
import { FLEX_THEME_API } from './flex';
import { FORM_FIELD_THEME_API } from './formfield';
import { GRID_THEME_API } from './grid';
import { GUTTER_THEME_API } from './gutter';
import { HEADER_THEME_API } from './header';
import { INFINITE_SCROLL_THEME_API } from './infinitescroll';
import { INPUT_THEME_API } from './input';
import { LINK_THEME_API } from './link';
import { LOADING_SPINNER_API } from './loadingspinner';
import { MODAL_THEME_API } from './modal';
import { OPTIONS_THEME_API } from './options';
import { PROGRESS_BAR_THEME_API } from './progressbar';
import { RADIO_THEME_API } from './radio';
import { SCROLLBAR_THEME_API } from './scrollbar';
import { SELECT_THEME_API } from './select';
import { STEPPER_THEME_API } from './stepper';
import { SWITCH_THEME_API } from './switch';
import { TEXT_AREA_THEME_API } from './textarea';
import { TOGGLER_THEME_API } from './toggler';
import { TOOLTIP_THEME_API } from './tooltip';

export const ROOT_THEME_API = {
  [IDENTIFIERS.AUTOCOMPLETE]: AUTOCOMPLETE_THEME_API,
  [IDENTIFIERS.BUBBLE]: BUBBLE_THEME_API,
  [IDENTIFIERS.BUTTON]: BUTTON_THEME_API,
  [IDENTIFIERS.CHECKBOX]: CHECKBOX_THEME_API,
  [IDENTIFIERS.DROPDOWN]: DROPDOWN_THEME_API,
  [IDENTIFIERS.FLEX]: FLEX_THEME_API,
  [IDENTIFIERS.FORM_FIELD]: FORM_FIELD_THEME_API,
  [IDENTIFIERS.GRID]: GRID_THEME_API,
  [IDENTIFIERS.GUTTER]: GUTTER_THEME_API,
  [IDENTIFIERS.HEADER]: HEADER_THEME_API,
  [IDENTIFIERS.INFINITE_SCROLL]: INFINITE_SCROLL_THEME_API,
  [IDENTIFIERS.INPUT]: INPUT_THEME_API,
  [IDENTIFIERS.LINK]: LINK_THEME_API,
  [IDENTIFIERS.LOADING_SPINNER]: LOADING_SPINNER_API,
  [IDENTIFIERS.MODAL]: MODAL_THEME_API,
  [IDENTIFIERS.OPTIONS]: OPTIONS_THEME_API,
  [IDENTIFIERS.PROGRESS_BAR]: PROGRESS_BAR_THEME_API,
  [IDENTIFIERS.RADIO]: RADIO_THEME_API,
  [IDENTIFIERS.SCROLLBAR]: SCROLLBAR_THEME_API,
  [IDENTIFIERS.SELECT]: SELECT_THEME_API,
  [IDENTIFIERS.STEPPER]: STEPPER_THEME_API,
  [IDENTIFIERS.SWITCH]: SWITCH_THEME_API,
  [IDENTIFIERS.TEXT_AREA]: TEXT_AREA_THEME_API,
  [IDENTIFIERS.TOGGLER]: TOGGLER_THEME_API,
  [IDENTIFIERS.TOOLTIP]: TOOLTIP_THEME_API
};

export { IDENTIFIERS };
