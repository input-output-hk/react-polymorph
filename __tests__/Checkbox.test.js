import React from 'react';

import { Checkbox } from '../source/components/Checkbox';
import { renderInSimpleTheme } from './helpers/theming';

test('Checkbox renders correctly', () => {
  const component = renderInSimpleTheme(
    <Checkbox />
  );

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Checkbox renders with a label', () => {
  const component = renderInSimpleTheme(
    <Checkbox label="check here" />
  );

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Checkbox is disabled', () => {
  const component = renderInSimpleTheme(
    <Checkbox disabled />
  );

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Checkbox is checked', () => {
  const component = renderInSimpleTheme(
    <Checkbox checked />
  );

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
