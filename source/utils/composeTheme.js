import _ from 'lodash';

// Each component offered in the React-Polymorph library could have a Theme API
// which is an Object indicating the correct shape of a theme for its
// corresponding skin. This makes the composeTheme function reusable
// for composing a custom theme with a built in theme (such as the Simple theme)

// composeTheme utility function
export default (theme = {}, themeOverrides = {}, themeAPI = {}) => {
  // check to see if themeOverrides is an empty object
  // if it is, return the theme
  // if it is not, compose themeOverrides and theme

  if (_.isEmpty(themeOverrides)) {
    return theme;
  } else {
    let composedTheme = { ...themeAPI };

    for (const property in themeAPI) {
      if (theme.hasOwnProperty(property)) {
        composedTheme[property] += theme[property];
      }

      if (themeOverrides.hasOwnProperty(property)) {
        composedTheme[property] += ' ' + themeOverrides[property];
      }

      composedTheme[property].trim();
    }
    return composedTheme;
  }
};
