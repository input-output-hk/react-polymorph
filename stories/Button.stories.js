// @flow
import React from 'react';

// storybook
import { storiesOf } from '@storybook/react';

// components
import { Button } from '../source/components/Button';

// skins
import { ButtonSpinnerSkin } from '../source/skins/simple/ButtonSpinnerSkin';

// themes
import CustomButtonTheme from './theme-customizations/Button.custom.scss';

// theme overrides and identifiers
import themeOverrides from './theme-overrides/customButton.scss';

// helpers
import { decorateWithSimpleTheme } from './helpers/theming';

storiesOf('Button', module)

  .addDecorator(decorateWithSimpleTheme)

  // ====== Stories ======

  .add('plain', () => <Button label="Button label" />)

  .add('disabled', () => (
    <Button disabled label="Button label" />
  ))

  .add('with LoadingSpinner', () => (
    <Button loading label="Done Loading" skin={ButtonSpinnerSkin} />
  ))

  .add('theme overrides', () => (
    <Button
      label="theme overrides"
      themeOverrides={themeOverrides}
    />
  ))

  .add('custom theme', () => (
    <Button label="Custom theme" theme={CustomButtonTheme} />
  ));
