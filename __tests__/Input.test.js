import React from 'react';

import { Input } from '../source/components/Input';
import { renderInSimpleTheme } from './helpers/theming';

test('Input renders correctly', () => {
  expect(renderInSimpleTheme(<Input />)).toMatchSnapshot();
});

test('Input renders with placeholder', () => {
  expect(renderInSimpleTheme(<Input placeholder="0.0000" />)).toMatchSnapshot();
});

test('Input renders with a value', () => {
  expect(
    renderInSimpleTheme(<Input value="there is value" />)
  ).toMatchSnapshot();
});

test('Input is readOnly', () => {
  expect(renderInSimpleTheme(<Input readOnly />)).toMatchSnapshot();
});

test('Input renders with data-* attributes', () => {
  const wrapper = renderInSimpleTheme(<Input data-testid="testId" />);
  expect(wrapper.find('input').prop('data-testid')).toEqual('testId');
});

test('Input renders label with htmlFor attribute', () => {
  const id = 'inputId';
  const wrapper = renderInSimpleTheme(<Input id={id} label="label" />);
  expect(wrapper.find('input').prop('id')).toEqual(id);
  expect(wrapper.find('label').prop('for')).toEqual(id);
});
