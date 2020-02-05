import React from 'react';

import { Bubble } from '../source/components/Bubble';
import { renderInSimpleTheme } from './helpers/theming';

test('Bubble renders correctly', () => {
  expect(renderInSimpleTheme(<Bubble />)).toMatchSnapshot();
});

test('Bubble renders isOpeningUpward={true}', () => {
  expect(renderInSimpleTheme(
    <Bubble isOpeningUpward />
  )).toMatchSnapshot();
});

test('Bubble renders isTransparent={false}', () => {
  expect(renderInSimpleTheme(
    <Bubble isTransparent={false} />
  )).toMatchSnapshot();
});

test('Bubble renders isHidden={true}', () => {
  expect(renderInSimpleTheme(
    <Bubble isHidden />
  )).toMatchSnapshot();
});

test('Bubble renders isFloating={true}', () => {
  expect(renderInSimpleTheme(
    <Bubble isFloating />
  )).toMatchSnapshot();
});
