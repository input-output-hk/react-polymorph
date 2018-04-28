import React from 'react';

// storybook
import { storiesOf } from '@storybook/react';

// components
import { Button } from '../source/components';

// skins
import { ButtonSkin } from '../source/skins/simple';

// themes
import CustomButtonTheme from './theme-customizations/Button.custom.scss';

// theme overrides and identifiers
import themeOverrides from './theme-overrides/customButton.scss';

storiesOf('Button', module)
  // ====== Stories ======

  .add('plain', () => <Button label="Button label" skin={ButtonSkin} />)

  .add('disabled', () => (
    <Button disabled label="Button label" skin={ButtonSkin} />
  ))

  .add('theme overrides', () => (
    <Button
      label="theme overrides"
      themeOverrides={themeOverrides}
      skin={ButtonSkin}
    />
  ))

  .add('custom theme', () => (
    <Button label="Custom theme" theme={CustomButtonTheme} skin={ButtonSkin} />
  ));
