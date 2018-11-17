# Changelog

## vNext

## 0.8.0

### Chores

- Adds --rp prefixed css variables to all component themes allowing comprehensive custom configuration. Renames existing scss variables using a uniform convention that matches the names of the new --rp css variables. [PR 92](https://github.com/input-output-hk/react-polymorph/pull/92)

- Fixes the implementation of withTheme helper to represent the wrapped components instead of a generic React component. This fix ensures the entire library is type checked correctly and resolves all resulting flow errors. [PR 93](https://github.com/input-output-hk/react-polymorph/pull/93)

### Fixes

- Fixes NumericInput's value processing logic to only return integer numbers before the decimal when maxAfterDot is 0. Adds a behavior test and a story for this functionality. [PR 91](https://github.com/input-output-hk/react-polymorph/pull/91)

- Fixes a bug where ThemeProvider failed to compose its theme prop with the user's custom styles passed as the themeOverrides prop. Adds a check to all components using context for when themeOverrides or theme changes in context. If there is a change, the component's theme and themeOverrides will be composed again and local state will update. Adds a themeOverrides story to ThemeProvider's stories to show intended functionality of theme composition and dynamic theme switching. [PR 90](https://github.com/input-output-hk/react-polymorph/pull/90)

### Features

- Adds displayName static property to all components
  [PR 89](https://github.com/input-output-hk/react-polymorph/pull/89)

- Adds InfiniteScroll component, InfiniteScrollSkin to simple skins, and SimpleInfiniteScroll to SimpleTheme.
  [PR 88](https://github.com/input-output-hk/react-polymorph/pull/88)

- Adds Grid and GridItem components to layout components.
  [PR 87](https://github.com/input-output-hk/react-polymorph/pull/87)

- Adds Gutter component to layout components and SimpleGutter to SimpleTheme.
  [PR 86](https://github.com/input-output-hk/react-polymorph/pull/86)

- Adds Flex and FlexItem components to layout components.
  [PR 85](https://github.com/input-output-hk/react-polymorph/pull/85)

- Adds Header component, Header skin, and adds SimpleHeader to SimpleTheme.
  [PR 84](https://github.com/input-output-hk/react-polymorph/pull/84)

- Adds Base component to layout components [PR 83](https://github.com/input-output-hk/react-polymorph/pull/83)

- Adds ProgressBar component to library with stories.
  [PR 78](https://github.com/input-output-hk/react-polymorph/pull/78)

- Adds LoadingSpinner component, LoadingSpinnerSkin, and SimpleLoadingSpinner theme. Adds reusable
  loading-spinner mixin to themes. Adds 5 LoadingSpinner stories.
  [PR 75](https://github.com/input-output-hk/react-polymorph/pull/75)

- Adds ButtonSpinnerSkin to simple skins to show LoadingSpinner within the Button component when
  page data is loading. Adds new button story to exemplify this skin and functionality.
  [PR 76](https://github.com/input-output-hk/react-polymorph/pull/76)

## 0.7.2

### Fixes

- Fixed two minor issues in the NumericInput component where the carrot didn't move right to the decimal spaces when the entered value contained 4 digits and a comma, and also fixed an issue where integers were displayed in the wrong order after a value is selected and deleted. [PR 94](https://github.com/input-output-hk/react-polymorph/pull/94)

## 0.7.1

### Fixes

- Fixed wrong border color for errored & focused textareas
  [PR 73](https://github.com/input-output-hk/react-polymorph/pull/73)

- De-nests the class definitions in SimpleInput.scss. Ensures the border color of both Input and
  NumericInput remain the correct color when in an errored state. Improves composability when theme
  overrides is used with both Input components. Updates stories to reflect fixes.
  [PR 71](https://github.com/input-output-hk/react-polymorph/pull/71)

- Adds a new HOC GlobalListeners which is used in Select and Autocomplete that attaches document and
  window listeners for closing the window. Fixes bubble and arrow positioning when Bubble is rendered
  via Select and Autocomplete. NumericInput does not execute the user's onChange prop unless the value
  changes internally after being processed. Removes index.js in components and skins directories to
  reduce size of library. [PR 69](https://github.com/input-output-hk/react-polymorph/pull/69)

- Wraps TextAreaSkin's render method in FormField so labels and errors are rendered the same as in Input
  and NumericInput. Fixes Input, NumericInput, and TextArea components so they pass a prop called inputRef
  or textareaRef to FormField in their skins. This properly makes use of React v16.3.1+'s ref API instead
  of using the onRef callback. Adds autoFocus, onBlur, and onFocus props to NumericInput and TextArea.
  [PR 67](https://github.com/input-output-hk/react-polymorph/pull/67)

- Fixed wrong positioning of select options when opening upward
  [PR 68](https://github.com/input-output-hk/react-polymorph/pull/68)

- Fixed vertical positioning of select arrow when opened
  [PR 68](https://github.com/input-output-hk/react-polymorph/pull/68)

### Chores

- Replaces all default exports in the theme directory with constants and exports them. Additionally,
  all import statements previously importing a default export are replaced with an appropriate named
  import. Defines all properties of the SimpleTheme and ROOT_THEME_API objects using IDENTIFIERS and
  arranges their properties in ABC order for better readability.
  [77](https://github.com/input-output-hk/react-polymorph/pull/77)

- Adds support for React v15 - v16.4.1. Upgrades devDependencies to latest versions of react, jest, and
  enzyme related libraries. Adds Autocomplete simulation test for deleting a selected option via backspace key.
  [PR 65](https://github.com/input-output-hk/react-polymorph/pull/65)

- Refactor npm scripts to colon style [PR 66](https://github.com/input-output-hk/react-polymorph/pull/66)

### Features

- Bubble takes an optional `targetRef` for positioning now
  [PR 68](https://github.com/input-output-hk/react-polymorph/pull/68)

## 0.7.0

### Fixes

- Fixed broken right-to-left positiong of selected option checkmark
  [PR 62](https://github.com/input-output-hk/react-polymorph/pull/62)

### Chores

- Adds keydown and click simulation tests for Autocomplete using jest and enzyme. Removes helper skins from
  test directory and refactors the way in which components are wrapped in a ThemeContext Consumer HOC before
  they're exported in order to handle a test environment.
  [PR 63](https://github.com/input-output-hk/react-polymorph/pull/63)

- Adds polyfills for React's new context API and ref API released in v16.3.0. Drops support for React versions
  less than v16.[PR 61](https://github.com/input-output-hk/react-polymorph/pull/61)

- Add snapshot test coverage from using jest and enzyme. Add event simulation tests for NumericInput. Adds
story for ThemeProvider. [PR 60](https://github.com/input-output-hk/react-polymorph/pull/60)

### Features

- Add checkmark for selected option [PR 54](https://github.com/input-output-hk/react-polymorph/pull/54)

## 0.6.5

Major breaking changes due to large refactoring of component architecture:
[PR 47](https://github.com/input-output-hk/react-polymorph/pull/47)

### Features

- Add Autocomplete clear feature [PR 49](https://github.com/input-output-hk/react-polymorph/pull/49)

### Chores

- Refactors library to use render prop architecture
  [PR 58](https://github.com/input-output-hk/react-polymorph/pull/58)
  - Removes source/skins/simple/raw directory and the raw pattern from the library
  - Removes skin parts
  - Manages refs by passing them from parent to child
  - Removes inheritance architecture
  - Adds ESLint config from Daedalus and integrates flow library & static type declarations. Refactors
  - components to declare refs using createRef from React v16.3^. Removes propTypes from all components
  and removes prop-types lib from dependencies.

## Features

- React 16 Context API with various improvements
  [PR 53](https://github.com/input-output-hk/react-polymorph/pull/53)
  * Implements React's new context API available in react & react*dom v16.3.0^
  * Implements new ref forwarding API for use with Autocomplete's clear feature.
  * New context API allows for setting the default theme of every component to SimpleTheme (see withTheme.js)
  * Adds renderSelections & renderOptions (render prop architecture) to Autocomplete for delegating custom
    rendering to the user while still giving the user access to the the component's logic and styles.
    (think "writing a custom skin on the fly", see Autocomplete stories).
  * Adds render prop to Options component

- Add checkmark for selected option [PR 54](https://github.com/input-output-hk/react-polymorph/pull/54)

- Add Autocomplete clear feature [PR 49](https://github.com/input-output-hk/react-polymorph/pull/49)

- Implements a theme API for each component. This is a plain object which exposes the shape of a component's theme.
  Each property on the theme API object corresponds with a class name assigned to an element within the component's
  skin and a class definition within the component's theme.

- Adds ThemeProvider HOC for applying a theme to all its nested react-polymorph children. ThemeProvider
  exonerates the user from explicitly declaring theme as a prop on every instantiated component. A complete
  theme, an object containing full theme definitions for every component in the library, may also be passed
  to ThemeProvider. The complete theme object may be deconstructed to contain only the necessary theme
  definitions used by the components nested within a particular instance of ThemeProvider, yet deconstruction
  is not required.

- Adds themeOverrides as an optional prop on ThemeProvider and on all components within the library.
  themeOverrides composes the user's custom css/scss with the component's base theme. This automatic
  composition saves the user from the tedium of manually piecing together custom styles with those of
  the component's theme that the user wishes to retain, yet themeOverrides is flexible enough to restyle
  a component's theme in a nontrivial way. themeOverrides may be passed directly to one instance of
  a component or passed to all instances nested within ThemeProvider via context. This composition of
  styles relies on css-modules.

- Adds a composed theme story to most component stories to exemplify the relationship between ThemeProvider
  and themeOverrides.

- Adds autofocus prop to all applicable input based components.

- Adds index file to source/utils, source/themes/API, source/themes/simple, source/skins/simple, and
  source/components for the use of named and default exports. Makes it easier for the user to import a
  full theme object for ThemeProvider, or simply one component's theme. Also makes it easier to import
  multiple skins and components on one line.

## 0.6.4

### Fixes

- Add `border-radius` CSS property to Autocomplete component [PR 45](https://github.com/input-output-hk/react-polymorph/pull/45)

## 0.6.3

### Fixes

- Fix Options component window resize event handling, Add `border-radius` CSS property to Textarea component [PR 44](https://github.com/input-output-hk/react-polymorph/pull/44)

## 0.6.2

### Fixes

- Fixes dependencies to be React 16 compatible [PR 41](https://github.com/input-output-hk/react-polymorph/pull/41)
- Fixes broken options positioning logic that was accidentally removed when bubble was introduced
  [PR 42](https://github.com/input-output-hk/react-polymorph/pull/42)

## 0.6.1

### Features

- Add Radio component [PR 34](https://github.com/input-output-hk/react-polymorph/pull/34)

### Fixes

- Fix broken theming setup for `InputSkin`, `BubbleSkin` and `SelectSkin` [PR 36](https://github.com/input-output-hk/react-polymorph/pull/36)

## 0.6.0

### Features

- Add Bubble component [PR 31](https://github.com/input-output-hk/react-polymorph/pull/31)
- Use Bubble component in Options component [PR 31](https://github.com/input-output-hk/react-polymorph/pull/31)
- Add Tooltip component [PR 32](https://github.com/input-output-hk/react-polymorph/pull/32)

### Fixes

- Fix bug causing crash when hitting backspace in an Autocomplete component [PR 31](https://github.com/input-output-hk/react-polymorph/pull/31)

## 0.5.5

### Fixes

- Allow string or element props for `FormField` errors [PR 25](https://github.com/input-output-hk/react-polymorph/pull/25)

## 0.5.4

### Fixes

- Fix `isOpeningUpwards` feature on Select and Autocomplete Options component ([PR 24](https://github.com/input-output-hk/react-polymorph/pull/24))

## 0.5.3

### Chores

- Add noResultsMessage property to Options component, Code cleanup and standardization ([PR 23](https://github.com/input-output-hk/react-polymorph/pull/23))

## 0.5.2

### Features

- Extract Options component ([PR 22](https://github.com/input-output-hk/react-polymorph/pull/22))

## 0.5.1

### Fixes

- Fix autocomplete input issues ([PR 21](https://github.com/input-output-hk/react-polymorph/pull/21))

## 0.5.0

### Features

- Update storybook to latest version ([PR 20](https://github.com/input-output-hk/react-polymorph/pull/20))
- Also support React 16 ([PR 20](https://github.com/input-output-hk/react-polymorph/pull/20))

## 0.4.1

### Fixes

- Expose raw component skins ([PR 19](https://github.com/input-output-hk/react-polymorph/pull/19))

## 0.4.0

### Features

- Autocomplete input control ([PR 18](https://github.com/input-output-hk/react-polymorph/pull/18))

## 0.3.5

### Features

- Allow React element as `label` for checkboxes and form fields ([PR 17](https://github.com/input-output-hk/react-polymorph/pull/17))

## 0.3.4

### Fixes

- Updated simple theme styled for SimpleSelect ([PR 16](https://github.com/input-output-hk/react-polymorph/pull/16))

### 0.3.3

- Toggle dropdown on label clicks ([PR 15](https://github.com/input-output-hk/react-polymorph/pull/15))

## 0.3.2

### Fixes

- Toggle dropdown on label clicks ([PR 15](https://github.com/input-output-hk/react-polymorph/pull/15))

## 0.3.2

### Features

- Add toggler component ([PR 14](https://github.com/input-output-hk/react-polymorph/pull/14))

## 0.3.1

### Fixes

- Updated simple theme styles
- Prevent CSS-classes inheritance on TextAreaSkin textarea element
- Fixed caret positioning bug on NumericInput component re-render

### Features

- Add checkbox component
- Add switch component

## 0.2.7

### Fixes

- fixed storybook webpack config
- fixed caret position logic in numeric input
- fixed selection stealing bug found in Daedalus

## 0.2.6

### Fixes

- Fixed a bug in `NumericInput` when illegal chars have been entered but the
  old valid value was still `null`.

## 0.2.5

### Fixes

- Fixed a bug in NumericInput where caret was reset on every re-render of the component.

### Improvements

- Added `.npmignore` file to remove source and dev files and folders from npm repo.

## 0.2.4

### Fixes

- Fixed broken build step that was missing the new `utils` folder.

## 0.2.3

### Fixes

- Fixed bug with `NumericInput` that passed unknown DOM properties to
  the underlying `<input>` component.

### Improvements

- Removed the need to manage `metaProps` that should be omitted when
  passing on props to standard DOM elements. You can now use `pickDOMProps`
  which filters the props down to the one that are allowed by React.

- Updated readme with better example for the idea of react-polymorph.

## 0.2.2

### Chores

- add new package-lock.json file generated by npm 5

## 0.2.1

### Chores

- Reuse the normal `InputSkin` and `SimpleInput` theme for the `NumericInput` component.

## 0.2.0

### Features

- Allow to render disabled options in select component
- New `NumericInput` component for floating point numbers.

## 0.1.0

Initial release with basic features.
