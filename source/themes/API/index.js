import FORMFIELD from './formfield';
import INPUT from './input';
import CHECKBOX from './checkbox';
import TOGGLER from './toggler';
import SWITCH from './switch';
import TEXTAREA from './textarea';
import BUTTON from './button';
import TOOLTIP from './tooltip';
import BUBBLE from './bubble';
import SELECT from './select';
import AUTOCOMPLETE from './autocomplete';
import OPTIONS from './options';
import MODAL from './modal';
import RADIO from './radio';

export const FORMFIELD_THEME_API = FORMFIELD;
export const INPUT_THEME_API = INPUT;
export const CHECKBOX_THEME_API = CHECKBOX;
export const TOGGLER_THEME_API = TOGGLER;
export const SWITCH_THEME_API = SWITCH;
export const TEXTAREA_THEME_API = TEXTAREA;
export const BUTTON_THEME_API = BUTTON;
export const TOOLTIP_THEME_API = TOOLTIP;
export const BUBBLE_THEME_API = BUBBLE;
export const SELECT_THEME_API = SELECT;
export const AUTOCOMPLETE_THEME_API = AUTOCOMPLETE;
export const OPTIONS_THEME_API = OPTIONS;
export const MODAL_THEME_API = MODAL;
export const RADIO_THEME_API = RADIO;

export default {
  formfield: { ...FORMFIELD_THEME_API },
  input: { ...INPUT_THEME_API },
  checkbox: { ...CHECKBOX_THEME_API },
  toggler: { ...TOGGLER_THEME_API },
  switch: { ...SWITCH_THEME_API },
  textarea: { ...TEXTAREA_THEME_API },
  button: { ...BUTTON_THEME_API },
  tooltip: { ...TOOLTIP_THEME_API },
  bubble: { ...BUBBLE_THEME_API },
  select: { ...SELECT_THEME_API },
  autocomplete: { ...AUTOCOMPLETE_THEME_API },
  options: { ...OPTIONS_THEME_API },
  modal: { ...MODAL_THEME_API },
  radio: { ...RADIO_THEME_API }
};
