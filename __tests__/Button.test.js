import React from 'react';

import { Button } from '../source/components/Button';
import { renderInSimpleTheme } from './helpers/theming';

test('Button renders correctly', () => {
  expect(renderInSimpleTheme(<Button />)).toMatchSnapshot();
});

test('Button renders with a label', () => {
  expect(renderInSimpleTheme(
    <Button label="send" />
  )).toMatchSnapshot();
});

test('Button is disabled', () => {
  expect(renderInSimpleTheme(
    <Button disabled />
  )).toMatchSnapshot();
});
