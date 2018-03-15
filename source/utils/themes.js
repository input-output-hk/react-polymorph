import _ from 'lodash';

const pickTheme = (props, context) => {
  const hasContextTheme = context && context.theme && context.theme.select;
  const hasPropsTheme = props.theme != null;
  if (!hasPropsTheme && !hasContextTheme) {
    throw 'Theme is missing';
  }
  return hasPropsTheme ? props.theme : context.theme.select;
};

// Every component has a Theme API which is a plain object exposing
// the correct shape of a theme for its corresponding skin.
// composeTheme is a reusable utility function for composing custom styles passed
// via themeOverrides with a predefined theme in the library such as Simple Theme.

const composeTheme = (theme = {}, themeOverrides = {}, themeAPI = {}) => {
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

export default {
  pickTheme,
  composeTheme
};
