import React from 'react';

import { Stepper } from '../source/components/Stepper';
import { renderInSimpleTheme } from './helpers/theming';

const STEPS = ['Wallet', 'Stake pool', 'Delegation', 'Activation'];

test('Stepper renders correctly', () => {
  expect(renderInSimpleTheme(
    <Stepper
      options={STEPS}
      activeStep={3}
    />
  )).toMatchSnapshot();
});

test('Stepper renders with custom label', () => {
  expect(renderInSimpleTheme(
    <Stepper
      activeStep={3}
      label="Setup progress"
      options={STEPS}
    />
  )).toMatchSnapshot();
});

test('Stepper renders without label', () => {
  expect(renderInSimpleTheme(
    <Stepper
      activeStep={3}
      labelDisabled
      options={STEPS}
    />
  )).toMatchSnapshot();
});
