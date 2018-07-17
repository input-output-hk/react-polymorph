// @flow
import { isEmpty, cloneDeep, pickBy } from 'lodash';

export const appendToProperty = (dest: {}, name: string, value: string) => {
  dest[name] === '' ? (dest[name] = value) : (dest[name] += ' ' + value);
};

export const formatFlexProps = (activeProps: Object) => {
  if (isEmpty(activeProps)) { return; }

  const { justifyContent, alignItems, center } = activeProps;

  // the "center" prop sets both "justify-content" and 'align-items' to center
  if (center === true) {
    // setting the values individually is uneccessary
    // only the "center" prop will be forwarded
    activeProps.justifyContent = false;
    activeProps.alignItems = false;
    // finished, return early
    return pickBy(activeProps);
  }

  if (justifyContent) {
    switch (justifyContent) {
      case 'flex-start':
        activeProps.justifyStart = true;
        break;
      case 'flex-end':
        activeProps.justifyEnd = true;
        break;
      case 'center':
        activeProps.justifyCenter = true;
        break;
      case 'space-between':
        activeProps.justifyBetween = true;
        break;
      case 'space-around':
        activeProps.justifyAround = true;
        break;
      default:
        break;
    }
    activeProps.justifyContent = false;
  }

  if (alignItems) {
    switch (alignItems) {
      case 'flex-start':
        activeProps.alignStart = true;
        break;
      case 'flex-end':
        activeProps.alignEnd = true;
        break;
      case 'center':
        activeProps.alignCenter = true;
        break;
      case 'baseline':
        activeProps.alignBaseline = true;
        break;
      default:
        break;
    }
    activeProps.alignItems = false;
  }

  return pickBy(activeProps);
};

export const composeBaseStyles = (
  baseStyles: Object,
  stylesToAdd: Object,
  activeClasses: Array) => {
  if (!activeClasses.length) { return baseStyles; }

  const composedBase = { ...baseStyles };

  activeClasses.forEach(className => {
    if (Object.hasOwnProperty.call(stylesToAdd, className) && stylesToAdd[className]) {
      composedBase.base += ` ${stylesToAdd[className]}`;
    }
  });

  return composedBase;
};

export const composeComponentStyles = (componentStyles: {}, componentTheme: {}) => {
  if (!componentTheme) return;
  for (const property in componentStyles) {
    if (Object.prototype.hasOwnProperty.call(componentStyles, property)) {
      if (Object.prototype.hasOwnProperty.call(componentTheme, property)) {
        appendToProperty(componentStyles, property, componentTheme[property]);
      }
    }
  }
};

// checks for the existence of a property on theme
// that matches the value of themeId (string)
// if the property exists, also checks the type of
// theme[themeId] to ensure it's an object
export const addThemeId = (theme: {}, themeId: string) => {
  if (!isEmpty(theme) && themeId) {
    const themeIdExists = Object.prototype.hasOwnProperty.call(theme, themeId);
    const themeIdIsObj = typeof theme[themeId] === 'object';

    return themeIdExists && themeIdIsObj ? theme : { [themeId]: theme };
  }

  return theme;
};

/**
 * Composes a base theme with the given overrides, which should
 * be provided in the same schema, defined by the theme API param.
 *
 * @param theme - The base theme to be composed with overrides
 * @param themeOverrides - The custom overrides for the base theme
 * @param themeAPI - The theme API schema that should be used for composition
 * @returns {{}} - The composed theme
 */

export const composeTheme = (
  theme: {} = {},
  themeOverrides: {} = {},
  themeAPI: {} = {}
) => {
  // Return theme if there are no overrides provided
  if (isEmpty(themeOverrides)) return theme;

  const composedTheme = cloneDeep(themeAPI);

  for (const componentId in themeAPI) {
    if (Object.prototype.hasOwnProperty.call(composedTheme, componentId)) {
      const componentStyles = composedTheme[componentId];
      composeComponentStyles(componentStyles, theme[componentId]);
      composeComponentStyles(componentStyles, themeOverrides[componentId]);
    }
  }
  return composedTheme;
};
