import React from 'react';

import { Bubble } from '../source/components/Bubble';
import { BubbleSkin } from '../source/skins/simple/BubbleSkin';
import { renderInSimpleTheme } from './helpers/theming';

test('Bubble renders correctly', () => {
  const component = renderInSimpleTheme(
    <Bubble skin={BubbleSkin} />
  );

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Bubble renders isOpeningUpward={true}', () => {
  const component = renderInSimpleTheme(
    <Bubble isOpeningUpward skin={BubbleSkin} />
  );

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Bubble renders isTransparent={false}', () => {
  const component = renderInSimpleTheme(
    <Bubble isTransparent={false} skin={BubbleSkin} />
  );

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Bubble renders isHidden={true}', () => {
  const component = renderInSimpleTheme(
    <Bubble isHidden skin={BubbleSkin} />
  );

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Bubble renders isFloating={true}', () => {
  const component = renderInSimpleTheme(
    <Bubble isFloating skin={BubbleSkin} />
  );

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
