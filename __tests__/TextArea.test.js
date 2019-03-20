import React from 'react';
import renderer from 'react-test-renderer';

import { TextArea } from '../source/components/TextArea';
import { renderInSimpleTheme } from './helpers/theming';

test('TextArea renders correctly', () => {
  const component = renderInSimpleTheme(
    <TextArea />
  );

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('TextArea renders with placeholder', () => {
  const component = renderInSimpleTheme(
    <TextArea placeholder="0.0000" />
  );

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('TextArea renders with an error', () => {
  const component = renderInSimpleTheme(
    <TextArea error="Please enter valid input" />
  );

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('TextArea renders with a value', () => {
  const component = renderInSimpleTheme(
    <TextArea value="this one has a value" />
  );

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('TextArea renders with 5 rows', () => {
  const component = renderInSimpleTheme(
    <TextArea rows={5} />
  );

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
