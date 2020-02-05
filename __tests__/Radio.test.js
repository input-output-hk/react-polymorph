import React from 'react';

import { Radio } from '../source/components/Radio';
import { renderInSimpleTheme } from './helpers/theming';

test('Radio renders correctly', () => {
  expect(renderInSimpleTheme(
    <Radio />
  )).toMatchSnapshot();
});

test('Radio renders with a label', () => {
  expect(renderInSimpleTheme(
    <Radio label="click here" />
  )).toMatchSnapshot();
});

test('Radio is disabled', () => {
  expect(renderInSimpleTheme(
    <Radio disabled />
  )).toMatchSnapshot();
});

test('Radio is selected', () => {
  expect(renderInSimpleTheme(
    <Radio selected />
  )).toMatchSnapshot();
});
