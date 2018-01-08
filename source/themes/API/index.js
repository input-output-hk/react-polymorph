import { formFieldThemeAPI } from './formField';
import { inputThemeAPI } from './input';
import { checkboxThemeAPI } from './checkbox';
import { textAreaThemeAPI } from './textArea';
import { buttonThemeAPI } from './button';
import { toolTipThemeAPI } from './toolTip';
import { bubbleThemeAPI } from './bubble';

// the remaining theme api's will be filled in
// once all components have been ported over to this pattern
export const rootThemeAPI = {
  formField: { ...formFieldThemeAPI },
  input: { ...inputThemeAPI },
  checkbox: { ...checkboxThemeAPI },
  textArea: { ...textAreaThemeAPI },
  button: { ...buttonThemeAPI },
  toolTip: { ...toolTipThemeAPI },
  bubble: { ...bubbleThemeAPI },
  autoComplete: {},
  modal: {},
  numericInput: {},
  options: {},
  select: {}
};
