import React from 'react';

import { Bubble } from '../source/components/Bubble';
import { renderInSimpleTheme } from './helpers/theming';

test('Bubble renders correctly', () => {
  const component = renderInSimpleTheme(<Bubble />);

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Bubble renders isOpeningUpward={true}', () => {
  const component = renderInSimpleTheme(
    <Bubble isOpeningUpward />
  );

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Bubble renders isTransparent={false}', () => {
  const component = renderInSimpleTheme(
    <Bubble isTransparent={false} />
  );

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Bubble renders isHidden={true}', () => {
  const component = renderInSimpleTheme(
    <Bubble isHidden />
  );

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Bubble renders isFloating={true}', () => {
  const component = renderInSimpleTheme(
    <Bubble isFloating />
  );

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
