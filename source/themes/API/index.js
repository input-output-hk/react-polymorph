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

export const IDENTIFIERS = {
  FORM_FIELD: 'formfield',
  INPUT: 'input',
  CHECKBOX: 'checkbox',
  TOGGLER: 'toggler',
  SWITCH: 'switch',
  TEXT_AREA: 'textarea',
  BUTTON: 'button',
  TOOLTIP: 'tooltip',
  BUBBLE: 'bubble',
  SELECT: 'select',
  AUTOCOMPLETE: 'autocomplete',
  OPTIONS: 'options',
  MODAL: 'modal',
  RADIO: 'radio'
};

export default {
  [IDENTIFIERS.FORM_FIELD]: { ...FORMFIELD_THEME_API },
  [IDENTIFIERS.INPUT]: { ...INPUT_THEME_API },
  [IDENTIFIERS.CHECKBOX]: { ...CHECKBOX_THEME_API },
  [IDENTIFIERS.TOGGLER]: { ...TOGGLER_THEME_API },
  [IDENTIFIERS.SWITCH]: { ...SWITCH_THEME_API },
  [IDENTIFIERS.TEXT_AREA]: { ...TEXTAREA_THEME_API },
  [IDENTIFIERS.BUTTON]: { ...BUTTON_THEME_API },
  [IDENTIFIERS.TOOLTIP]: { ...TOOLTIP_THEME_API },
  [IDENTIFIERS.BUBBLE]: { ...BUBBLE_THEME_API },
  [IDENTIFIERS.SELECT]: { ...SELECT_THEME_API },
  [IDENTIFIERS.AUTOCOMPLETE]: { ...AUTOCOMPLETE_THEME_API },
  [IDENTIFIERS.OPTIONS]: { ...OPTIONS_THEME_API },
  [IDENTIFIERS.MODAL]: { ...MODAL_THEME_API },
  [IDENTIFIERS.RADIO]: { ...RADIO_THEME_API }
};
