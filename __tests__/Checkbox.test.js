import React from 'react';

import { Checkbox } from '../source/components/Checkbox';
import { renderInSimpleTheme } from './helpers/theming';

test('Checkbox renders correctly', () => {
  expect(renderInSimpleTheme(
    <Checkbox />
  )).toMatchSnapshot();
});

test('Checkbox renders with a label', () => {
  expect(renderInSimpleTheme(
    <Checkbox label="check here" />
  )).toMatchSnapshot();
});

test('Checkbox is disabled', () => {
  expect(renderInSimpleTheme(
    <Checkbox disabled />
  )).toMatchSnapshot();
});

test('Checkbox is checked', () => {
  expect(renderInSimpleTheme(
    <Checkbox checked />
  )).toMatchSnapshot();
});
