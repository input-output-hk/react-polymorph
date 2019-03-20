import React from 'react';

import { Button } from '../source/components/Button';
import { renderInSimpleTheme } from './helpers/theming';

test('Button renders correctly', () => {
  const component = renderInSimpleTheme(<Button />);

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Button renders with a label', () => {
  const component = renderInSimpleTheme(
    <Button label="send" />
  );

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Button is disabled', () => {
  const component = renderInSimpleTheme(
    <Button disabled />
  );

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
