# Changelog

## vNext

Major breaking changes due to large refactoring of component architecture:
[PR 47](https://github.com/input-output-hk/react-polymorph/pull/47)

### Chores

* Refactors library to use render prop architecture.
* Removes source/skins/simple/raw directory and the raw pattern from the library
* Removes skin parts
* Manages refs by passing them from parent to child
* Removes inheritance architecture
* Adds ESLint config from Daedalus and integrates flow library & static type declarations. Removes propTypes from all components and removes prop-types lib from dependencies. [PR 58](https://github.com/input-output-hk/react-polymorph/pull/58)

## Features

* [PR 53](https://github.com/input-output-hk/react-polymorph/pull/53)

* Implements React's new context API available in react & react-dom v16.3.0^

* Implements new ref forwarding API for use with Autocomplete's clear feature.

* New context API allows for setting the default theme of every component to SimpleTheme (see withTheme.js)

* Adds renderSelections & renderOptions (render prop architecture) to Autocomplete for delegating custom rendering to the user while still giving the user access to the the component's logic and styles. (think "writing a custom skin on the fly", see Autocomplete stories).

* Adds render prop to Options component

* Add checkmark for selected option [PR 54](https://github.com/input-output-hk/react-polymorph/pull/54)

* Add Autocomplete clear feature [PR 49](https://github.com/input-output-hk/react-polymorph/pull/49)

* Implements a theme API for each component. This is a plain object which exposes the shape of a component's theme. Each property on the theme API object corresponds with a class name assigned to an element within the component's skin and a class definition within the component's theme.

* Adds ThemeProvider HOC for applying a theme to all its nested react-polymorph children. ThemeProvider exonerates the user from explicitly declaring theme as a prop on every instantiated component. A complete theme, an object containing full theme definitions for every component in the library, may also be passed to ThemeProvider. The complete theme object may be deconstructed to contain only the necessary theme definitions used by the components nested within a particular instance of ThemeProvider, yet deconstruction is not required.

* Adds themeOverrides as an optional prop on ThemeProvider and on all components within the library. themeOverrides composes the user's custom css/scss with the component's base theme. This automatic composition saves the user from the tedium of manually piecing together custom styles with those of the component's theme that the user wishes to retain, yet themeOverrides is flexible enough to restyle a component's theme in a nontrivial way. themeOverrides may be passed directly to one instance of a component or passed to all instances nested within ThemeProvider via context. This composition of styles relies on css-modules.

* Adds a composed theme story to most component stories to exemplify the relationship between ThemeProvider and themeOverrides.

* Adds autofocus prop to all applicable input based components.

* Adds index file to source/utils, source/themes/API, source/themes/simple, source/skins/simple, and source/components for the use of named and default exports. Makes it easier for the user to import a full theme object for ThemeProvider, or simply one component's theme. Also makes it easier to import multiple skins and components on one line.

## 0.6.4

### Fixes

* Add `border-radius` CSS property to Autocomplete component [PR 45](https://github.com/input-output-hk/react-polymorph/pull/45)

## 0.6.3

### Fixes

* Fix Options component window resize event handling, Add `border-radius` CSS property to Textarea component [PR 44](https://github.com/input-output-hk/react-polymorph/pull/44)

## 0.6.2

### Fixes

* Fixes dependencies to be React 16 compatible [PR 41](https://github.com/input-output-hk/react-polymorph/pull/41)
* Fixes broken options positioning logic that was accidentally removed when bubble was introduced
  [PR 42](https://github.com/input-output-hk/react-polymorph/pull/42)

## 0.6.1

### Features

* Add Radio component [PR 34](https://github.com/input-output-hk/react-polymorph/pull/34)

### Fixes

* Fix broken theming setup for `InputSkin`, `BubbleSkin` and `SelectSkin` [PR 36](https://github.com/input-output-hk/react-polymorph/pull/36)

## 0.6.0

### Features

* Add Bubble component [PR 31](https://github.com/input-output-hk/react-polymorph/pull/31)
* Use Bubble component in Options component [PR 31](https://github.com/input-output-hk/react-polymorph/pull/31)
* Add Tooltip component [PR 32](https://github.com/input-output-hk/react-polymorph/pull/32)

### Fixes

* Fix bug causing crash when hitting backspace in an Autocomplete component [PR 31](https://github.com/input-output-hk/react-polymorph/pull/31)

## 0.5.5

### Fixes

* Allow string or element props for `FormField` errors [PR 25](https://github.com/input-output-hk/react-polymorph/pull/25)

## 0.5.4

### Fixes

* Fix `isOpeningUpwards` feature on Select and Autocomplete Options component ([PR 24](https://github.com/input-output-hk/react-polymorph/pull/24))

## 0.5.3

### Chores

* Add noResultsMessage property to Options component, Code cleanup and standardization ([PR 23](https://github.com/input-output-hk/react-polymorph/pull/23))

## 0.5.2

### Features

* Extract Options component ([PR 22](https://github.com/input-output-hk/react-polymorph/pull/22))

## 0.5.1

### Fixes

* Fix autocomplete input issues ([PR 21](https://github.com/input-output-hk/react-polymorph/pull/21))

## 0.5.0

### Features

* Update storybook to latest version ([PR 20](https://github.com/input-output-hk/react-polymorph/pull/20))
* Also support React 16 ([PR 20](https://github.com/input-output-hk/react-polymorph/pull/20))

## 0.4.1

### Fixes

* Expose raw component skins ([PR 19](https://github.com/input-output-hk/react-polymorph/pull/19))

## 0.4.0

### Features

* Autocomplete input control ([PR 18](https://github.com/input-output-hk/react-polymorph/pull/18))

## 0.3.5

### Features

* Allow React element as `label` for checkboxes and form fields ([PR 17](https://github.com/input-output-hk/react-polymorph/pull/17))

## 0.3.4

### Fixes

* Updated simple theme styled for SimpleSelect ([PR 16](https://github.com/input-output-hk/react-polymorph/pull/16))

### 0.3.3

* Toggle dropdown on label clicks ([PR 15](https://github.com/input-output-hk/react-polymorph/pull/15))

## 0.3.2

### Fixes

* Toggle dropdown on label clicks ([PR 15](https://github.com/input-output-hk/react-polymorph/pull/15))

## 0.3.2

### Features

* Add toggler component ([PR 14](https://github.com/input-output-hk/react-polymorph/pull/14))

## 0.3.1

### Fixes

* Updated simple theme styles
* Prevent CSS-classes inheritance on TextAreaSkin textarea element
* Fixed caret positioning bug on NumericInput component re-render

### Features

* Add checkbox component
* Add switch component

## 0.2.7

### Fixes

* fixed storybook webpack config
* fixed caret position logic in numeric input
* fixed selection stealing bug found in Daedalus

## 0.2.6

### Fixes

* Fixed a bug in `NumericInput` when illegal chars have been entered but the
  old valid value was still `null`.

## 0.2.5

### Fixes

* Fixed a bug in NumericInput where caret was reset on every re-render of the component.

### Improvements

* Added `.npmignore` file to remove source and dev files and folders from npm repo.

## 0.2.4

### Fixes

* Fixed broken build step that was missing the new `utils` folder.

## 0.2.3

### Fixes

* Fixed bug with `NumericInput` that passed unknown DOM properties to
  the underlying `<input>` component.

### Improvements

* Removed the need to manage `metaProps` that should be omitted when
  passing on props to standard DOM elements. You can now use `pickDOMProps`
  which filters the props down to the one that are allowed by React.

* Updated readme with better example for the idea of react-polymorph.

## 0.2.2

### Chores

* add new package-lock.json file generated by npm 5

## 0.2.1

### Chores

* Reuse the normal `InputSkin` and `SimpleInput` theme for the `NumericInput` component.

## 0.2.0

### Features

* Allow to render disabled options in select component
* New `NumericInput` component for floating point numbers.

## 0.1.0

Initial release with basic features.
