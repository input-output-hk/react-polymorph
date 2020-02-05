import React from 'react';

import { TextArea } from '../source/components/TextArea';
import { renderInSimpleTheme } from './helpers/theming';

test('TextArea renders correctly', () => {
  expect(renderInSimpleTheme(
    <TextArea />
  )).toMatchSnapshot();
});

test('TextArea renders with placeholder', () => {
  expect(renderInSimpleTheme(
    <TextArea placeholder="0.0000" />
  )).toMatchSnapshot();
});

test('TextArea renders with an error', () => {
  expect(renderInSimpleTheme(
    <TextArea error="Please enter valid input" />
  )).toMatchSnapshot();
});

test('TextArea renders with a value', () => {
  expect(renderInSimpleTheme(
    <TextArea value="this one has a value" />
  )).toMatchSnapshot();
});

test('TextArea renders with 5 rows', () => {
  expect(renderInSimpleTheme(
    <TextArea rows={5} />
  )).toMatchSnapshot();
});
