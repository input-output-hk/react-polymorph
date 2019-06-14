import React from 'react';
import renderer from 'react-test-renderer';

import { Stepper } from '../source/components/Stepper';
import { renderInSimpleTheme } from './helpers/theming';

const STEPS = ['Wallet', 'Stake pool', 'Delegation', 'Activation'];

test('Stepper renders correctly', () => {
  const component = renderInSimpleTheme(
    <Stepper
      options={STEPS}
      activeStep={3}
    />
  );

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Stepper renders with custom label', () => {
  const component = renderInSimpleTheme(
    <Stepper
      activeStep={3}
      label="Setup progress"
      options={STEPS}
    />
  );

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Stepper renders without label', () => {
  const component = renderInSimpleTheme(
    <Stepper
      activeStep={3}
      labelDisabled
      options={STEPS}
    />
  );

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
