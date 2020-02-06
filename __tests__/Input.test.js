import React from 'react';

import { Input } from '../source/components/Input';
import { renderInSimpleTheme } from './helpers/theming';

test('Input renders correctly', () => {
  expect(renderInSimpleTheme(
    <Input />
  )).toMatchSnapshot();
});

test('Input renders with placeholder', () => {
  expect(renderInSimpleTheme(
    <Input placeholder="0.0000" />
  )).toMatchSnapshot();
});

test('Input renders with a value', () => {
  expect(renderInSimpleTheme(
    <Input value="there is value" />
  )).toMatchSnapshot();
});

test('Input is readOnly', () => {
  expect(renderInSimpleTheme(
    <Input readOnly />
  )).toMatchSnapshot();
});
