import React from 'react';

import { NumericInput } from '../source/components/NumericInput';
import { InputSkin } from '../source/skins/simple/InputSkin';
import { renderInSimpleTheme } from './helpers/theming';

test('NumericInput renders correctly', () => {
  const component = renderInSimpleTheme(
    <NumericInput
      skin={InputSkin}
    />
  );

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('NumericInput renders with placeholder', () => {
  const component = renderInSimpleTheme(
    <NumericInput
      placeholder="0.0000"
      skin={InputSkin}
    />
  );

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('NumericInput is disabled', () => {
  const component = renderInSimpleTheme(
    <NumericInput
      disabled
      skin={InputSkin}
    />
  );

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('NumericInput is readOnly', () => {
  const component = renderInSimpleTheme(
    <NumericInput
      readOnly
      skin={InputSkin}
    />
  );

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('NumericInput renders with an error', () => {
  const component = renderInSimpleTheme(
    <NumericInput
      error="Invalid Amount"
      skin={InputSkin}
    />
  );

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('NumericInput renders with a value', () => {
  const component = renderInSimpleTheme(
    <NumericInput
      value="555.333"
      skin={InputSkin}
    />
  );

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
