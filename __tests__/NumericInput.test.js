import React from 'react';

import { NumericInput } from '../source/components/NumericInput';
import { renderInSimpleTheme } from './helpers/theming';

test('NumericInput renders correctly', () => {
  const component = renderInSimpleTheme(
    <NumericInput />
  );

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('NumericInput renders with placeholder', () => {
  const component = renderInSimpleTheme(
    <NumericInput placeholder="0.0000" />
  );

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('NumericInput is disabled', () => {
  const component = renderInSimpleTheme(
    <NumericInput disabled />
  );

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('NumericInput is readOnly', () => {
  const component = renderInSimpleTheme(
    <NumericInput readOnly />
  );

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('NumericInput renders with an error', () => {
  const component = renderInSimpleTheme(
    <NumericInput error="Invalid Amount" />
  );

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('NumericInput renders with a value', () => {
  const component = renderInSimpleTheme(
    <NumericInput value="555.333" />
  );

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
