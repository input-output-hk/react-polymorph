// @flow
import React from 'react';

// storybook
import { storiesOf } from '@storybook/react';

// components
import { Stepper } from '../source/components/Stepper';

// themes
import CustomStepperTheme from './theme-customizations/Stepper.custom.scss';

// custom styles & theme overrides
import themeOverrides from './theme-overrides/customStepper.scss';
import { IDENTIFIERS } from '../source/components';

// helpers
import { decorateWithSimpleTheme } from './helpers/theming';

const STEPS = ['Wallet', 'Stake pool', 'Delegation', 'Activation'];

storiesOf('Stepper', module)

  .addDecorator(decorateWithSimpleTheme)

  // ====== Stories ======

  .add('plain', () => (
    <Stepper
      steps={STEPS}
      activeStep={2}
    />
  ))

  .add('with custom label text', () => (
    <Stepper
      label="Setup progress"
      steps={STEPS}
      activeStep={2}
    />
  ))

  .add('without label', () => (
    <Stepper
      labelDisabled
      steps={STEPS}
      activeStep={2}
    />
  ))

  .add('theme overrides', () => (
    <Stepper
      themeOverrides={themeOverrides}
      themeId={IDENTIFIERS.STEPPER}
      label="Setup progress"
      steps={STEPS}
      activeStep={2}
    />
  ))

  .add('custom theme', () => (
    <Stepper
      themeId={IDENTIFIERS.STEPPER}
      theme={CustomStepperTheme}
      steps={STEPS}
      activeStep={2}
    />
  ));
