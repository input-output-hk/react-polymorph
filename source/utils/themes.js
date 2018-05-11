// @flow
import { isEmpty, cloneDeep } from 'lodash';

const appendToProperty = (dest: {}, name: string, value: string) => {
  dest[name] === '' ? (dest[name] = value) : (dest[name] += ' ' + value);
};

const composeComponentStyles = (componentStyles: {}, componentTheme: {}) => {
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
const addThemeId = (theme: {}, themeId: string) => {
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

const composeTheme = (
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

export default {
  composeTheme,
  addThemeId
};
