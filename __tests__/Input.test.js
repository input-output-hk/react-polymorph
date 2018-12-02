import React from 'react';

import { Input } from '../source/components/Input';
import { renderInSimpleTheme } from './helpers/theming';

test('Input renders correctly', () => {
  const component = renderInSimpleTheme(
    <Input />
  );

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Input renders with placeholder', () => {
  const component = renderInSimpleTheme(
    <Input placeholder="0.0000" />
  );

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Input renders with a value', () => {
  const component = renderInSimpleTheme(
    <Input value="there is value" />
  );

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Input is readOnly', () => {
  const component = renderInSimpleTheme(
    <Input readOnly />
  );

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
