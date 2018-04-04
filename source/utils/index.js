import propsUtils from './props';
import themeUtils from './themes';
import eventUtils from './events';

// named exports for props utility functions
export const { pickDOMProps, StringOrElement, callAll } = propsUtils;

// named exports for theme utility functions
export const { composeTheme } = themeUtils;

// named exports for event utility functions
export const {
  getMousePosition,
  getTouchPosition,
  pauseEvent,
  addEventsToDocument,
  removeEventsFromDocument,
  targetIsDescendant,
  addEventListenerOnTransitionEnded,
  removeEventListenerOnTransitionEnded
} = eventUtils;

// exports default object containing all utility functions
// in the instance of wanting all of them imported at once
export default {
  pickDOMProps,
  StringOrElement,
  composeTheme,
  getMousePosition,
  getTouchPosition,
  pauseEvent,
  addEventsToDocument,
  removeEventsFromDocument,
  targetIsDescendant,
  addEventListenerOnTransitionEnded,
  removeEventListenerOnTransitionEnded,
  callAll
};
