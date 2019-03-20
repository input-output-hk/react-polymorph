import React from 'react';
import renderer from 'react-test-renderer';

import { Radio } from '../source/components/Radio';
import { renderInSimpleTheme } from './helpers/theming';

test('Radio renders correctly', () => {
  const component = renderInSimpleTheme(
    <Radio />
  );

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Radio renders with a label', () => {
  const component = renderInSimpleTheme(
    <Radio label="click here" />
  );

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Radio is disabled', () => {
  const component = renderInSimpleTheme(
    <Radio disabled />
  );

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Radio is selected', () => {
  const component = renderInSimpleTheme(
    <Radio selected />
  );

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
