import React from 'react';
import renderer from 'react-test-renderer';

import { Bubble } from '../source/components';
import { BubbleSkin } from '../source/skins/simple';
import BubbleTheme from '../source/themes/simple/SimpleBubble.scss';

const SimpleTheme = { bubble: BubbleTheme };

test('Bubble renders correctly', () => {
  const component = renderer.create(
    <Bubble theme={SimpleTheme} skin={BubbleSkin} />
  );

  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Bubble renders isOpeningUpward', () => {
  const component = renderer.create(
    <Bubble isOpeningUpward theme={SimpleTheme} skin={BubbleSkin} />
  );

  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Bubble renders isTransparent={false}', () => {
  const component = renderer.create(
    <Bubble isTransparent={false} theme={SimpleTheme} skin={BubbleSkin} />
  );

  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Bubble renders isHidden', () => {
  const component = renderer.create(
    <Bubble isHidden theme={SimpleTheme} skin={BubbleSkin} />
  );

  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Bubble renders isFloating', () => {
  const component = renderer.create(
    <Bubble isFloating theme={SimpleTheme} skin={BubbleSkin} />
  );

  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
