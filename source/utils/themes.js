// @flow
import { isEmpty, cloneDeep } from 'lodash';
import { hasProperty } from './props';

export const appendToProperty = (dest: {}, name: string, value: string) => {
  dest[name] === '' ? (dest[name] = value) : (dest[name] += ' ' + value);
};

export const composeComponentStyles = (componentStyles: {}, componentTheme: {}) => {
  if (!componentTheme) return;
  for (const property in componentStyles) {
    if (hasProperty(componentStyles, property)) {
      if (hasProperty(componentTheme, property)) {
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
    const themeIdExists = hasProperty(theme, themeId);
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

  // final object to be returned
  const composedTheme = cloneDeep(themeAPI);

  for (const componentId in themeAPI) {
    if (hasProperty(composedTheme, componentId)) {
      const componentStyles = composedTheme[componentId];
      composeComponentStyles(componentStyles, theme[componentId]);
      composeComponentStyles(componentStyles, themeOverrides[componentId]);
    }
  }
  return composedTheme;
};
