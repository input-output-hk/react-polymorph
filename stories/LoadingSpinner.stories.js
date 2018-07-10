// @flow
import React from 'react';

// storybook
import { storiesOf } from '@storybook/react';

// components
import { LoadingSpinner } from '../source/components/LoadingSpinner';

// skins
import { LoadingSpinnerSkin } from '../source/skins/simple/LoadingSpinnerSkin';

// // themes
// import CustomInputTheme from './theme-customizations/Input.custom.scss';
//
// // theme overrides and identifiers
// import themeOverrides from './theme-overrides/customInput.scss';

storiesOf('LoadingSpinner', module)
  // ====== LoadingSpinner Stories ======

  .add('big', () => (
    <LoadingSpinner
      big
      skin={LoadingSpinnerSkin}
    />
  ))

  .add('small', () => (
    <LoadingSpinner
      skin={LoadingSpinnerSkin}
    />
  ));
