import BigNumber from 'bignumber.js';
import React from 'react';

import { NumericInput } from '../source/components/NumericInput';
import { renderInSimpleTheme } from './helpers/theming';

test('NumericInput renders correctly', () => {
  expect(renderInSimpleTheme(<NumericInput />)).toMatchSnapshot();
});

test('NumericInput renders with placeholder', () => {
  expect(
    renderInSimpleTheme(<NumericInput placeholder="0.0000" />)
  ).toMatchSnapshot();
});

test('NumericInput is disabled', () => {
  expect(renderInSimpleTheme(<NumericInput disabled />)).toMatchSnapshot();
});

test('NumericInput is readOnly', () => {
  expect(renderInSimpleTheme(<NumericInput readOnly />)).toMatchSnapshot();
});

test('NumericInput renders with an error', () => {
  expect(
    renderInSimpleTheme(<NumericInput error="Invalid Amount" />)
  ).toMatchSnapshot();
});

test('NumericInput renders with a value', () => {
  expect(
    renderInSimpleTheme(<NumericInput value={new BigNumber(555.333)} />)
  ).toMatchSnapshot();
});
